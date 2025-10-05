import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { google } from 'googleapis';
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

export interface YouTubeVideoDetails {
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
  chapters: Array<{
    title: string;
    timeStamp: string;
  }>;
}

// --- Deterministic Chapter Extraction (regex based) ---
// Attempts to parse YouTube description lines for timestamped chapters before falling back to LLM.
function extractChaptersFromDescriptionRaw(description: string): Array<{ title: string; timeStamp: string }> {
  if (!description) return [];

  // Normalize newlines (sometimes CRLF etc.)
  const lines = description.replace(/\r/g, "").split(/\n+/).map(l => l.trim()).filter(Boolean);

  const chapters: Array<{ title: string; timeStamp: string }> = [];
  const seen = new Set<string>();

  // Unified regex pattern capturing optional bullet, brackets, parentheses, separators
  const pattern = /^(?:[-–—•*]\s*)?(?:\(?\[?)?(\d{1,2}:\d{2}(?::\d{2})?)(?:\)?\]?)\s*(?:[-–—]|:)?\s*(.+)$/i;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.length < 4) continue;
    // Quick include heuristic: must contain a colon with digits
    if (!/(\d{1,2}:\d{2})/.test(line)) continue;
    const m = line.match(pattern);
    if (!m) continue;
    let ts = m[1];
    let title = m[2]?.trim() || "";

    // Remove trailing links / hashtags / extraneous punctuation for cleaner titles
    title = title.replace(/https?:\/\/\S+/g, "")
                 .replace(/[#*_`]+/g, "")
                 .replace(/\s{2,}/g, " ")
                 .trim();

    if (!title || title.length < 2) continue;
    // Avoid duplicate timestamps
    if (seen.has(ts)) continue;
    seen.add(ts);
    chapters.push({ timeStamp: ts, title });
  }

  if (chapters.length === 0) return [];

  // Convert to seconds to sort & validate ordering
  const toSeconds = (t: string) => {
    const parts = t.split(":").map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return parts[0] * 60 + parts[1];
  };

  chapters.sort((a, b) => toSeconds(a.timeStamp) - toSeconds(b.timeStamp));

  // Heuristic validation: ensure at least 2 chapters and ascending order unique
  if (chapters.length < 2) return [];
  for (let i = 1; i < chapters.length; i++) {
    if (toSeconds(chapters[i].timeStamp) <= toSeconds(chapters[i - 1].timeStamp)) {
      return [];
    }
  }

  return chapters;
}

// Helper function to convert ISO 8601 duration to human readable format
function parseDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Extract chapters using LLM from video description
export async function extractChaptersWithLLM(description: string): Promise<Array<{title: string, timeStamp: string}>> {
  try {
    if (!description || description.trim().length === 0) return [];

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash-lite",
      temperature: 0,
      apiKey: process.env.GEMINI_API_KEY!,
    });

    // Minimal prompt: ONLY description + concise instruction
    const prompt = `You will extract chapter timestamps from the raw YouTube video description below.
Return ONLY a JSON array. Each element: {"title":"<text>","timeStamp":"mm:ss" or "hh:mm:ss"}.
If no valid timestamps -> return []
Description:\n${description}`;

    const response = await llm.invoke(prompt);

    let content: string = typeof response.content === 'string'
      ? response.content
      : (response.content as Array<{ type: string; text: string }> )
          .map(c => c.type === 'text' ? c.text : '')
          .join('\n');

    const cleaned = content.trim().replace(/```json\n?|```/g, '');
    try {
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(ch => 
        ch && typeof ch.title === 'string' && typeof ch.timeStamp === 'string' &&
        ch.title.trim().length > 0 && /^(\d{1,2}:\d{2})(:?\d{2})?$/.test(ch.timeStamp)
      );
    } catch (e) {
      console.error('LLM JSON parse fail (chapters)', e);
      return [];
    }
  } catch (err) {
    console.error('LLM chapter extraction error', err);
    return [];
  }
}

// Fetch video details using YouTube Data API v3 with unrestricted approach
export async function getVideoDetails(videoId: string): Promise<YouTubeVideoDetails> {
  console.log('Fetching video details for video:', videoId);

  const attemptDataApi = async (): Promise<YouTubeVideoDetails> => {
    if (!process.env.YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured');
    }
    try {
      return await getVideoDetailsFromAPI(videoId);
    } catch (err: any) {
      const msg = err?.message || '';
      if (/Requests from referer/i.test(msg)) {
        console.warn('YouTube Data API request blocked due to HTTP referrer restriction. Fix your API key restrictions in Google Cloud Console (set to None or add server IP). Falling back to oEmbed (no description).');
      } else {
        console.warn('Primary Data API fetch failed:', msg);
      }
      throw err;
    }
  };

  // 1. Try Data API first so we get description & duration when allowed.
  try {
    const apiDetails = await attemptDataApi();
    return apiDetails;
  } catch (_) {
    // Proceed to fallback
  }

  // 2. Fallback: oEmbed + attempt enhancement (still may lack description)
  try {
    const basic = await getVideoDetailsFromOEmbed(videoId);
    // If description is still empty, optionally (best effort) try Data API again in case transient
    if (!basic.description) {
      try {
        const retry = await attemptDataApi();
        return retry; // use richer details if succeeds on retry
      } catch { /* ignore */ }
    }
    return basic;
  } catch (oEmbedErr) {
    throw new Error(`Failed to fetch video details via all methods: ${oEmbedErr instanceof Error ? oEmbedErr.message : 'Unknown error'}`);
  }
}

// Get video details using YouTube oEmbed API (no auth required)
async function getVideoDetailsFromOEmbed(videoId: string): Promise<YouTubeVideoDetails> {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  
  const response = await fetch(oembedUrl);
  
  if (!response.ok) {
    throw new Error(`OEmbed API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // OEmbed doesn't provide description, so we'll get a basic structure
  const basicDetails: YouTubeVideoDetails = {
    title: data.title || 'No Title',
    thumbnail: data.thumbnail_url || '',
    duration: '0:00', // OEmbed doesn't provide duration
    description: '',
    chapters: []
  };
  
  // Try to enhance with additional data from a different approach
  try {
    const enhancedDetails = await enhanceVideoDetails(videoId, basicDetails);
    if (enhancedDetails.description) {
      console.log('VIDEO_DESCRIPTION_START');
      console.log(enhancedDetails.description);
      console.log('VIDEO_DESCRIPTION_END');
    }
    return enhancedDetails;
  } catch (enhanceError) {
    console.log('Enhancement failed, returning basic details');
    return basicDetails;
  }
}

// Enhance video details with additional API calls
async function enhanceVideoDetails(videoId: string, basicDetails: YouTubeVideoDetails): Promise<YouTubeVideoDetails> {
  // Try using a public YouTube API endpoint that might work
  const publicApiUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;
  
  try {
    const response = await fetch(publicApiUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.title) {
        basicDetails.title = data.title;
      }
      if (data.thumbnail_url) {
        basicDetails.thumbnail = data.thumbnail_url;
      }
    }
  } catch (error) {
    console.log('Public API enhancement failed');
  }
  
  return basicDetails;
}

// Get video details using direct YouTube API (with potential restrictions)
async function getVideoDetailsFromAPI(videoId: string): Promise<YouTubeVideoDetails> {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
  });

  const response = await youtube.videos.list({
    part: ['snippet', 'contentDetails'],
    id: [videoId]
  });

  if (!response.data.items || response.data.items.length === 0) {
    throw new Error(`Video not found: ${videoId}`);
  }

  const video = response.data.items[0];
  const snippet = video.snippet!;
  const contentDetails = video.contentDetails!;

  // Get the highest quality thumbnail
  const thumbnails = snippet.thumbnails!;
  const thumbnail = thumbnails.maxres?.url || 
                   thumbnails.high?.url || 
                   thumbnails.medium?.url || 
                   thumbnails.default?.url || '';

  const description = snippet.description || '';
  if (description) {
    console.log('VIDEO_DESCRIPTION_START');
    console.log(description);
    console.log('VIDEO_DESCRIPTION_END');
  }
  
  // 1. Try deterministic regex extraction first
  let chapters = extractChaptersFromDescriptionRaw(description);
  if (chapters.length > 0) {
    console.log(`Parsed ${chapters.length} chapters via regex pattern detection.`);
  } else {
    console.log('No chapters parsed via regex, falling back to LLM extraction...');
    chapters = await extractChaptersWithLLM(description);
    console.log(`LLM extracted ${chapters.length} chapters.`);
  }

  return {
    title: snippet.title || 'No Title',
    thumbnail,
    duration: parseDuration(contentDetails.duration || 'PT0S'),
    description,
    chapters
  };
}

// Fetch transcript using youtube-transcript package
export async function getVideoTranscript(videoId: string): Promise<string> {
  try {
    console.log('Fetching transcript via LangChain YoutubeLoader for video:', videoId);
    const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const loader = YoutubeLoader.createFromUrl(ytUrl, { language: 'en' });
    const docs = await loader.load();
    const transcript = docs.map(d => d.pageContent).join('\n');
    if(!transcript || transcript.trim().length === 0){
      throw new Error('No transcript available for this video');
    }
    return transcript;
  } catch (error) {
    console.error('Error fetching transcript with YoutubeLoader:', error);
    throw new Error(`Failed to fetch transcript: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { db } from "@/lib";
import { videoChapters } from "@/lib/db/schema";
import { Transcript } from "@/types/scrapeType";
import { getLLMInstance } from "../llm";

// Helper function to convert seconds to timestamp format
function secondsToTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// New function to generate highlights from transcript with timestamps
export async function generateHighlightsFromTranscript(
  transcript: Transcript[] | undefined,
  totalDuration: string | undefined,
  video_id: string
) {
  if (!transcript || transcript.length === 0) {
    console.warn("No transcript available for highlights generation");
    return [];
  }

  const llm = getLLMInstance();
  
  // Parse total duration to get video length in minutes
  const parseVideoDuration = (duration: string | undefined): number => {
    if (!duration) return 30; // Default fallback
    
    const parts = duration.split(':').map(Number);
    if (parts.length === 3) { // h:mm:ss
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 2) { // mm:ss
      return parts[0];
    }
    return 30; // Fallback
  };

  const videoDurationMinutes = parseVideoDuration(totalDuration);
  const totalSegments = transcript.length;
  
  // Dynamic highlight calculation based on video duration
  let targetHighlights: number;
  let minSegmentsPerChunk: number;
  
  if (videoDurationMinutes <= 8) {
    // Short videos (≤8 min): 2-4 highlights
    targetHighlights = Math.min(Math.max(Math.floor(videoDurationMinutes / 4), 2), 4);
    minSegmentsPerChunk = 20;
  } else if (videoDurationMinutes <= 30) {
    // Medium videos (9-30 min): 5-8 highlights
    targetHighlights = Math.min(Math.max(Math.floor(videoDurationMinutes / 7), 5), 8);
    minSegmentsPerChunk = 25;
  } else if (videoDurationMinutes <= 60) {
    // Long videos (30-60 min): 8-12 highlights
    targetHighlights = Math.min(Math.max(Math.floor(videoDurationMinutes / 8), 8), 12);
    minSegmentsPerChunk = 30;
  } else if (videoDurationMinutes <= 120) {
    // Very long videos (1-2 hours): 8-14 highlights
    targetHighlights = Math.min(Math.max(Math.floor(videoDurationMinutes / 12), 8), 14);
    minSegmentsPerChunk = 35;
  } else {
    // Extra long videos (2+ hours): 10-15 highlights
    targetHighlights = Math.min(Math.max(Math.floor(videoDurationMinutes / 15), 10), 15);
    minSegmentsPerChunk = 40;
  }
  
  // Ensure we don't create chunks larger than the total segments
  const segmentsPerChunk = Math.max(Math.floor(totalSegments / targetHighlights), minSegmentsPerChunk);
  
  console.log(`Video Duration: ${totalDuration} (${videoDurationMinutes} minutes)`);
  console.log(`Processing ${totalSegments} transcript segments into ${targetHighlights} potential highlights`);
  console.log(`Each highlight will analyze ~${segmentsPerChunk} transcript segments (min: ${minSegmentsPerChunk})`);

  const chunks: Transcript[][] = [];
  
  for (let i = 0; i < transcript.length; i += segmentsPerChunk) {
    const chunk = transcript.slice(i, i + segmentsPerChunk);
    // Ensure each chunk has at least the minimum segments for meaningful content analysis
    if (chunk.length >= minSegmentsPerChunk) {
      chunks.push(chunk);
    } else if (chunks.length > 0) {
      // Add remaining segments to the last chunk
      chunks[chunks.length - 1].push(...chunk);
    } else {
      // If it's the only chunk and it's smaller than minimum, still use it
      chunks.push(chunk);
    }
  }

  console.log(`Created ${chunks.length} chunks for analysis`);

  const highlights: Array<{
    title: string;
    description: string;
    timestamp: string;
    startTime: number;
  }> = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    // Convert start/end to numbers (they come as strings but represent numbers)
    const rawStart = chunk[0].start;
    const rawEnd = chunk[chunk.length - 1].end;
    
    const startTime: number = typeof rawStart === 'number' ? rawStart : parseFloat(rawStart as string);
    const endTime: number = typeof rawEnd === 'number' ? rawEnd : parseFloat(rawEnd as string);
    
    // Combine multiple transcript lines into meaningful context
    // For better analysis, we'll group every 4-5 lines together with some spacing
    const contextualText = chunk
      .map((seg, idx) => {
        // Add line breaks every 4-5 segments for better readability
        if (idx > 0 && idx % 5 === 0) {
          return `\n${seg.text}`;
        }
        return seg.text;
      })
      .join(' ')
      .replace(/\s+/g, ' ') // Clean up multiple spaces
      .trim();

    // Ensure we have valid numbers
    if (isNaN(startTime) || isNaN(endTime)) {
      console.error(`Invalid timestamp data for chunk ${i + 1}`);
      continue;
    }

    // Calculate segment duration for context
    const segmentDuration = Math.round(endTime - startTime);
    const segmentMinutes = Math.floor(segmentDuration / 60);
    const segmentSeconds = segmentDuration % 60;

    // Adjust content quality threshold based on video length
    let qualityThreshold: string;
    if (videoDurationMinutes <= 20) {
      qualityThreshold = "This segment must contain valuable, actionable content to be worth highlighting in a short video.";
    } else if (videoDurationMinutes <= 60) {
      qualityThreshold = "This segment must discuss a complete topic/concept with substantial information to be worth highlighting.";
    } else {
      qualityThreshold = "This segment must contain significant insights, detailed explanations, or important concepts to justify highlighting in a longer video.";
    }

    const prompt = `You are analyzing a ${segmentMinutes}:${segmentSeconds.toString().padStart(2, '0')} video segment to create a highlight.

Video Total Duration: ${totalDuration} (${videoDurationMinutes} minutes)
Segment Start: ${secondsToTimestamp(startTime)}
Segment End: ${secondsToTimestamp(endTime)}
Segment Contains: ${chunk.length} transcript lines

Rules:
1. Create ONE highlight for this segment ONLY if it contains substantial, meaningful content
2. ${qualityThreshold}
3. If the segment is transitional, repetitive, introductory filler, or lacks depth, return empty JSON: {}
4. Title should be specific and compelling (max 50 characters)
5. Description should be 2-3 sentences explaining the key concepts covered
6. Focus on educational value, key insights, demonstrations, or important information
7. Output MUST be valid JSON only (no markdown, no explanation)

Format (if content is substantial and worth highlighting):
{
  "title": "Specific compelling title about the main concept",
  "description": "2-3 sentences describing the key insights, concepts, or valuable information covered in this segment. Focus on what viewers will learn or understand.",
  "timestamp": "${secondsToTimestamp(startTime)}"
}

Format (if content is not substantial enough for highlighting):
{}

Transcript Segment (${chunk.length} lines):
${contextualText}

Return ONLY the JSON:`;

    try {
      const response = await llm.invoke(prompt);
      const content = typeof response.content === "string" 
        ? response.content 
        : (response.content as Array<{ type: string; text: string }>)
            .map(c => c.type === "text" ? c.text : "")
            .join("\n");

      const cleaned = content.trim().replace(/```json\n?|```/g, "");
      
      if (cleaned === "{}" || cleaned.trim() === "") {
        console.log(`Segment ${i + 1} (${secondsToTimestamp(startTime)}-${secondsToTimestamp(endTime)}) not substantial enough for highlighting`);
        continue;
      }

      const parsed = JSON.parse(cleaned);
      
      if (parsed.title && parsed.description && parsed.timestamp) {
        highlights.push({
          title: parsed.title,
          description: parsed.description,
          timestamp: parsed.timestamp,
          startTime: startTime
        });
        console.log(`Generated highlight ${highlights.length}: "${parsed.title}" at ${parsed.timestamp}`);
      }
    } catch (error) {
      console.error(`Error processing chunk ${i + 1} (${secondsToTimestamp(startTime)}):`, error);
      continue;
    }
  }

  // Sort highlights by start time
  highlights.sort((a, b) => a.startTime - b.startTime);

  // Insert highlights into database
  if (highlights.length > 0) {
    const inserted = await db.insert(videoChapters).values(
      highlights.map((highlight) => ({
        video_id,
        title: highlight.title,
        description: highlight.description,
        timestamp: highlight.timestamp,
      }))
    ).returning();

    console.log(`Successfully inserted ${inserted.length} highlights for video ${video_id} (${videoDurationMinutes} min video)`);
    return inserted;
  } else {
    console.log("No substantial highlights generated, falling back to basic summary");
    return await summarizeNoChapters(transcript, totalDuration, video_id);
  }
}

export async function summarizeNoChapters(
  transcript: Transcript[] | undefined,
  totalDuration: string | undefined,
  video_id: string
) {
  if (!transcript || transcript.length === 0) {
    console.warn("No transcript available for summarization");
    return [];
  }

  const llm = getLLMInstance();

  // Convert transcript array to text for splitting
  const transcriptText = transcript.map(seg => seg.text).join('\n');

  // Split transcript into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 3000,
    chunkOverlap: 500,
  });
  const chunks = await splitter.splitText(transcriptText);

  // Summarize each chunk
  const chunkSummaries: string[] = [];
  for (const chunk of chunks) {
    const res = await llm.invoke([
      {
        role: "system",
        content: "You are a helpful assistant that summarizes transcript chunks concisely.",
      },
      {
        role: "user",
        content: `Summarize this transcript chunk in 3-4 sentences:\n\n${chunk}`,
      },
    ]);
    chunkSummaries.push(res.content as string);
  }

  //  Combine summaries for final chapter generation
  const combinedSummary = chunkSummaries.join(" ");

  const prompt = `
You are an expert video analyst. Your task is to analyze the provided transcript and generate topical chapters.

Video total duration: ${totalDuration}

Instructions:
1. Divide the transcript into 5–8 logical chapters.
2. Each chapter must have a descriptive title.
3. Each chapter must have a 2–3 sentence summary.
4. Do NOT include timestamps .
5. Output must be ONLY a valid JSON array (no text or markdown).

Format:
[
  { "title": "Chapter 1 Title", "summary": "..." },
  { "title": "Chapter 2 Title", "summary": "..." }
]

Transcript:
${combinedSummary}
`;

  //  Generate chapters with LLM
  const chaptersRes = await llm.invoke([
    { role: "system", content: "You are a helpful assistant for summarizing YouTube transcripts." },
    { role: "user", content: prompt },
  ]);

  let chapters;
  try {
    const cleaned = (chaptersRes.content as string)
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    chapters = JSON.parse(cleaned);
  } catch (e) {
    console.warn("LLM did not return valid JSON. Falling back to one summary.");
    chapters = [{ title: "Video Summary", summary: combinedSummary.slice(0, 500) + "..." }];
  }

  // Insert into DB
  const inserted = await db.insert(videoChapters).values(
    chapters.map((ch: any) => ({
      video_id,
      title: ch.title,
      description: ch.summary,
      timestamp: null, 
    }))
  ).returning();

  console.log(" Inserted chapters:", inserted);

  return inserted;
}

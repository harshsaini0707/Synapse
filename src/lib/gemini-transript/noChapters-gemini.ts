import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { db } from "@/lib";
import { videoChapters } from "@/lib/db/schema";
import { Transcript } from "@/types/scrapeType";


export async function summarizeNoChapters(
  transcript: Transcript[] | undefined,
  totalDuration: string | undefined,
  video_id: string
) {
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    temperature: 0.3,
    apiKey: process.env.GEMINI_API_KEY!,
  });

  // Split transcript into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 3000,
    chunkOverlap: 500,
  });
  const chunks = await splitter.splitText(transcript);

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

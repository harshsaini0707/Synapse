import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function summarizeNoChapters(transcript : string, totalDuration: string) {

  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    temperature: 0.3,
    apiKey:process.env.GEMINI_API_KEY!
  });


  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 6100,   
    chunkOverlap: 500, 
  });
  const chunks = await splitter.splitText(transcript);

  
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

  // Combine chunk summaries and ask LLM to create chapters
  const combinedSummary = chunkSummaries.join(" ");

  const prompt = `
You are an intelligent assistant that summarizes YouTube transcripts.

Video duration: ${totalDuration}

Instructions:
1. Split the transcript summary into some chapters based on topics and considering the duration ${totalDuration}.
2. Assign a title to each chapter.
3. Estimate the starting timestamp (hh:mm:ss) for each chapter based on the video duration.
4. Write a concise number of  sentence summary for each chapter according to duration of viedo ${totalDuration}.
5. Output must be a valid JSON array in this format:
[
  { "timestamp": "00:00", "title": "Chapter 1 Title", "summary": "..." },
  { "timestamp": "02:05", "title": "Chapter 2 Title", "summary": "..." }
]

Transcript Summary:
${combinedSummary}
`;

  const chaptersRes = await llm.invoke([
    { role: "system", content: "You are a helpful assistant for summarizing YouTube transcripts." },
    { role: "user", content: prompt },
  ]);

  // 5️⃣ Parse LLM output as JSON
    // 5️⃣ Parse LLM output as JSON
  let chapters;
  try {
    // Clean LLM output to strip code fences and extra junk
    const cleaned = (chaptersRes.content as string)
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    chapters = JSON.parse(cleaned);
  } catch (e) {
    console.warn("LLM did not return valid JSON, fallback to a single chapter");
   
  }


  console.log(chapters);
   // array of objects { timestamp, title, summary }
}

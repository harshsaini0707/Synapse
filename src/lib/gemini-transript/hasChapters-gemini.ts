import {GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import {TaskType} from "@google/generative-ai"
import { db } from ".."
import { transcriptChunks, videoChapters } from "../db/schema"
import { sql } from "drizzle-orm"
import { getLLMInstance } from "../llm"

type chapters = {
title : string , 
timeStamp :  string
}

export async  function hasChapterEmbeddingAndHighlights(chapaters : chapters[] ,  viedoId : string){

   const embeddingModel =  new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: process.env.GEMINI_API_KEY!,
    taskType: TaskType.RETRIEVAL_QUERY,
   })

   for(const chpt of chapaters){

    const [insertChapter] = await db.insert(videoChapters).values({
        video_id : viedoId,
        title : chpt.title,
        timestamp : chpt.timeStamp,
        description:" "
    }).returning();

//console.log(insertChapter);

    const chapterId = insertChapter.id;

const chapterEmbedding: number[] = await embeddingModel.embedQuery(chpt.title);

// Create a quoted vector literal string and cast to ::vector (::vector tells Interpret this string as a vector type.)
const chapterEmbeddingLiteral = `'[${chapterEmbedding.join(",")}]'::vector`;

const topChunks = await db.select()
  .from(transcriptChunks)
  .where(sql`video_id = ${viedoId}`)  // Assuming 'videoId' is the correct variable name
  .orderBy(sql.raw(`embedding <=> ${chapterEmbeddingLiteral}`))
  .limit(3);







    const textSummarize =  topChunks.map((chunk) => chunk.content).join("\n");
    
    
    //create summary by LLM
    const summary  = await generateSummary(textSummarize , chpt.title);

    await db.update(videoChapters)
    .set({description : summary})
    .where(sql `id = ${chapterId}`)


   }


}


export async function generateSummary(textSumamrize : string , chapterTitle : string) :Promise<string>{

    const model = getLLMInstance();
   const prompt = `
Summarize the following text about "${chapterTitle}" in 3-4 concise sentences.
Only return the summary text itself. 
Do not add any introductions, bullet points, or special characters.

Text:
${textSumamrize}
`;

   const response = await model.invoke(prompt);

  let summary: string;

  if (typeof response.content === "string") {
    summary = response.content;
  } else {
    summary = (response.content as Array<{ type: string; text: string }>)
      .map((c) => (c.type === "text" ? c.text : ""))
      .join("\n");
  }

  return summary.trim();
}
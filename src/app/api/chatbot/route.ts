import { db } from "@/lib";
import { chatHistory, transcriptChunks } from "@/lib/db/schema";
import { TaskType } from "@google/generative-ai";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized User!!" },
        { status: 401 }
      );
    }

    const { query, videoId } = await req.json();

    if (!videoId) {
      return NextResponse.json(
        { message: "Unable to get Video Id!!" },
        { status: 404 }
      );
    }
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { message: "Query Required!!" },
        { status: 400 }
      );
    }

    //  Embed query
    const embeddingModel = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",
      apiKey: process.env.GEMINI_API_KEY!,
      taskType: TaskType.RETRIEVAL_QUERY,
    });

    const queryEmbedding: number[] = await embeddingModel.embedQuery(query);
    const queryEmbeddedLiteral = `'[${queryEmbedding.join(",")}]'::vector`;

    //  Retrieve top chunks
    const topChunks = await db
      .select()
      .from(transcriptChunks)
      .where(sql`video_id = ${videoId}`)
      .orderBy(sql.raw(`embedding <=> ${queryEmbeddedLiteral}`))
      .limit(8);

    const context = topChunks.map((ch) => ch.content).join("\n");

    //  LLM call
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash-lite",
      apiKey: process.env.GEMINI_API_KEY!,
      temperature: 0.2,
    });

const response = await llm.invoke([
  {
    role: "system",
    content: `
You are an advanced AI assistant developed by Harsh Saini at Synapse, designed to deeply analyze YouTube video transcripts.

Your entire knowledge comes ONLY from the provided "Context from video transcript."  
You must follow these strict rules:

1. **Strictly Adhere to Context**  
   - Answer the user's question using ONLY the given transcript context.  
   - Do not use outside knowledge or assumptions.  

2. **Handle Missing Information**  
   - If the answer is not found in the context, respond exactly with:  
     "That information is not covered in this video."  

3. **Be a Guide**  
   - Provide clear, helpful, and structured answers that guide the user through the video’s content.  

4. **Answer Only**  
   - Do not greet, introduce yourself, or add filler.  
   - Output must be the pure answer only.  

5. **Expand When Too Short**  
   - If the context provides only a very short or vague answer, expand it into a complete, meaningful response **under the guidance of the transcript only**. 

6. **Identity Rule**  
   - If the user asks what LLM or AI model you are, reply only with:  
     "I am created by Harsh Saini at Synapse." 

Remember: Never hallucinate. Never go beyond the transcript context. 
    `,
  },
  {
    role: "user",
    content: `Context from video transcript:
${context}

User Question: ${query}`,
  },
]);


    const answer =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    // Save to DB
    await db.insert(chatHistory).values({
      user_id: userId,
      video_id: videoId,
      question: query.trim(),
      answer,
    });

   
    return NextResponse.json({ answer :  answer } , {status :  200});
  } catch (error) {
    console.error("RAG Chatbot Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error !! RAG_Chatbot_Error!!" },
      { status: 500 }
    );
  }
}

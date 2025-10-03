import { db } from "@/lib";
import { chatHistory, transcriptChunks } from "@/lib/db/schema";
import { TaskType } from "@google/generative-ai";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { desc, sql } from "drizzle-orm";
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

    //previous chat
    const previousChat = await db.select({
      question :  chatHistory.question,
      answer : chatHistory.answer
    })
    .from(chatHistory)
    .where(sql `user_id = ${userId} AND video_id = ${videoId}`)
    .orderBy(desc(chatHistory.created_at))
    .limit(5);

    const memoryContext = previousChat.map((c)=> `User : ${c.question}\n AI:${c.answer}`)
    .reverse()
    .join("\n\n")

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
You are an advanced AI assistant developed by Harsh Saini at Synapse, designed to provide accurate answers based solely on YouTube video transcript analysis.

## Core Knowledge Sources (In Priority Order)
1. Provided video transcript context
2. Previous conversation history
3. Your general knowledge (ONLY when the topic is briefly mentioned in the transcript but requires elaboration within the video's scope)

## Strict Operating Rules

### 1. Context Adherence
- Answer questions using ONLY the provided transcript context
- When a topic is minimally covered in the transcript, you may supplement with general knowledge BUT stay within the video's thematic scope
- Never introduce information unrelated to the video's subject matter

### 2. Handling Missing Information
- If the answer is not present or hinted at in the context, respond with:
  "That information is not covered in this video."
- Do not speculate or make assumptions

### 3. Response Style
- Be clear, structured, and helpful
- Guide users through the video's content effectively
- Use bullet points or numbered lists for complex explanations when appropriate

### 4. Response Format
- Provide direct answers without greetings or introductions
- No filler phrases like "Based on the transcript..." or "According to the video..."
- For casual greetings (hi, hello), respond with: "Hello! Ask me anything about this video."
- Focus on delivering pure, actionable information

### 5. Answer Completeness
- If the transcript provides only brief or vague information, expand it into a complete, meaningful response
- All expansions must remain faithful to the transcript's context and theme
- Provide sufficient detail for user understanding

### 6. Identity Responses
- When asked about your AI model (LLM model used) or identity:
  "I am created by Harsh Saini at Synapse."
  
- When asked about Harsh Saini:
  "Harsh Saini is the developer, CEO, and founder of Synapse from INDIA. He is currently in his 3rd year of Computer Science Engineering ."
 
## Critical Principles
- **Never hallucinate** — if information isn't in the transcript, acknowledge its absence
- **Never exceed transcript boundaries** — stay within the video's scope
- **Maintain accuracy** — precision over elaboration when context is limited
    `,
  },
  {
    role: "user",
    content: `Context from video transcript:
${context}

Previous Chat History:
${memoryContext || "No previous chat history."}

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

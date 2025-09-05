import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NextResponse } from "next/server";
import {GoogleGenerativeAIEmbeddings} from "@langchain/google-genai"
import { TaskType } from "@google/generative-ai";
import { db } from "..";
import { transcriptChunks, videos } from "../db/schema";
import { eq } from "drizzle-orm";


export async function createEmbedding(transcript :  string , viedoId : string){
try {

    if(!transcript){
        return NextResponse.json(
            {message:"Transcript not found!!"},
            {status :  404}
        )
    }

    //chunking 
    const splitter  = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap : 100
    })

    const chunks  = await splitter.splitText(transcript);

    //console.log(chunks);


    //embedding
    const embeddingModel  = new GoogleGenerativeAIEmbeddings({
        model : "text-embedding-004",
        apiKey : process.env.GEMINI_API_KEY!,
        taskType : TaskType.RETRIEVAL_DOCUMENT,
        title:"Transcript"
    })

  const values = [];

for (let i = 0; i < chunks.length; i++) {
  const [embedding] = await embeddingModel.embedDocuments([chunks[i]]);
  values.push({
    video_id: viedoId,
    chunk_index: i,
    content: chunks[i],
    embedding
  });
}

await db.insert(transcriptChunks).values(values);

    
    await db.update(videos).set({embedding_done :  true}).where(eq(videos.video_id , viedoId))


    
    
} catch (error) {
     console.log(error);
            return NextResponse.json(
                {error:"Failed to fetch the youtube transcript try another url"},
                {status :  500}
            )
}
}


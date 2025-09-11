import { NextResponse } from "next/server";
import { db } from "..";
import { transcriptChunks } from "../db/schema";
import { eq } from "drizzle-orm";
import { createQuizViaLLM } from "./createQuizViaLLM";



export async function generateQuizFromTranscript(video_id : string  ,   difficulty : string ){
    try {

        if(!video_id || !difficulty){
            return NextResponse.json(
                {message :"Required field are not successfully pass to generate the quizs!!"},
                {status :  404}
            )
        }
        const chunks = await db
        .select({
            content : transcriptChunks.content
        })
        .from(transcriptChunks)
        .where(eq(transcriptChunks.video_id ,  video_id))
        
        //console.log(chunks);

        if(chunks.length === 0 || !chunks){
            return NextResponse.json(
                {message : "Unable to fetch chunks from Database!!"},
                {status :  404}
            )
        }

        const allQuestion : [] = [];
        const windowSize = 3;
        const step =2;

        for(let i = 0 ; i<chunks.length ; i++){
            const windowChunks = chunks.slice(i ,  i+windowSize);
            const combineText = windowChunks.map(c => c.content).join();

            const quiz = await createQuizViaLLM(combineText , difficulty);

           let paredQuestions : []  = [];
           try {
            paredQuestions  = JSON.parse(quiz as string)
           } catch (error) {
              console.error("Failed to parse LLM output:", quiz);
        continue;  // skip the window
           }
        allQuestion.push(...paredQuestions)
        }

        console.log(allQuestion);
        
        
        
    } catch (error) {
       return NextResponse.json(
        {message : "Internal Server Error while Creating the Quizs!!" + error},
        {status:  500}
       ) 
    }
}
generateQuizFromTranscript("1tRTWwZ5DIc" , "hard")
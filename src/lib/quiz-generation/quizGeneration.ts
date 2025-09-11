import { NextResponse } from "next/server";
import { db } from "..";
import { transcriptChunks } from "../db/schema";
import { eq } from "drizzle-orm";
import { createQuizViaLLM } from "./createQuizViaLLM";
import { saveToDB } from "./saveQuizsToDb";
import { log } from "node:console";

type QuizQuestionType = {
    question_text: string;
    type: string;
    options: string[];
    correct_option_index: number;
    explanation: string;
};



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

        const allQuestion : QuizQuestionType[] = [];
        const windowSize = 3;
        const step =2;

        for(let i = 0 ; i<chunks.length ; i+=step){
            const windowChunks = chunks.slice(i ,  i+windowSize);
            const combineText = windowChunks.map(c => c.content).join();

            const quiz = await createQuizViaLLM(combineText , difficulty);

           let paredQuestions : QuizQuestionType[]  = [];
           try {
              const cleanOutput = (quiz  as string) 
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
            paredQuestions  = JSON.parse(cleanOutput as string)
           } catch (error) {
              console.error("Failed to parse LLM output:", quiz);
        continue;  // skip the window
           }
        allQuestion.push(...paredQuestions)
        }

      //  console.log(allQuestion);


        console.log(allQuestion);
        
       await saveToDB(video_id ,  difficulty , allQuestion);
        
        
        
    } catch (error) {
       return NextResponse.json(
        {message : "Internal Server Error while Creating the Quizs!!" + error},
        {status:  500}
       ) 
    }
}
generateQuizFromTranscript("Gfr50f6ZBvo" , "easy")
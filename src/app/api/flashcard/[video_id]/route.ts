import { db } from "@/lib";
import { transcriptChunks } from "@/lib/db/schema";
import { createFlashCards } from "@/lib/flashcards/flashcardGeneration";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

interface flashCards{
question : string,
answer :  string , 
hint : string
}

export async function POST(req : NextRequest ,
    {params} : {params : Promise<{video_id :  string}>}
) {
    try {

        const {video_id}  = await params;
        const userId = req.headers.get("x-user-id");

        if(!video_id){
            return NextResponse.json(
                {message : "Video Id required for generating the flashcards"},
                {status : 404}
            )
        }
        if(!userId){
            return NextResponse.json(
                {message : "Unauthorized User!!"},
                {status :  401}
            )
        }

        const flashCardExists  =  await db.query.flashcards.findMany({
            where: (cards , {eq}) => eq(cards.video_id , video_id)
        })

        if(flashCardExists){
            return NextResponse.json(
              {  message : "Flashcard data" ,  data : flashCardExists} ,
              {status : 200}
            )
        }


            const transcriptChunkss =  await db
            .select({content :  transcriptChunks.content})
            .from(transcriptChunks)
            .where(eq(transcriptChunks.video_id ,  video_id))

            if(transcriptChunkss.length == 0 || !transcriptChunkss){
                return NextResponse.json(
                    {message : "The transcript chunks for this particular viedo doesn't exists"},
                    {status :  404}
                )
            }
        
           const flashCardsKit : flashCards[] = [];
           const windowSize = 12;
           const step = 4;
           
           for(let i = 0 ; i<transcriptChunkss.length ; i+=step){
            const combineText =  transcriptChunkss.slice(i ,  i+windowSize);
            const combineTextChunks = combineText.map((ele) =>ele.content).join(" ");

            const flashCards = await createFlashCards(video_id ,  combineTextChunks);
           }


        
        
    } catch (error) {
        return NextResponse.json(
            {message : "Enable to  create the flashcards!!" +error},
            {status : 500}
        )
    }
}
import { db } from "@/lib";
import { chatHistory } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


type  Params = {
    params :{
        videoId : string;
    };
};

export async function GET(req:  NextRequest ,
    {params} :  Params
){
    try {
        const userId = req.headers.get("x-user-id");

        if(!userId){
            return NextResponse.json(
                {message : "Unauthrized User !!"},
                {status :  401}
            )
        }
        const videoId = params.videoId;
        if(!videoId){
            return NextResponse.json(
                {message : "Video Id required!!"},
                {status :  404}
            )
        }

       const history =  await db.select({
        id : chatHistory.id,
        question :  chatHistory.question,
        answer : chatHistory.answer,
        created_at : chatHistory.created_at
       })
       .from(chatHistory)
       .where(and(eq(chatHistory.user_id , userId ) , eq(chatHistory.video_id , videoId)))
       .orderBy(chatHistory.created_at)

       return NextResponse.json(
        {chatHistory : history},
        {status :  200}
       )
        
    } catch (error) {
    console.error("Chat History Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error!!" },
      { status: 500 }
    );
    }
}
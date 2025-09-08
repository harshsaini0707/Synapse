import { db } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req :  NextRequest) {
    try {
        
        const id = req.headers.get("x-user-id");

        if(!id){
            return NextResponse.json(
                {message : "Unauthorized User!!"},
                {status :  401}
            )
        }
        const {video_id , difficulty } :{ video_id :  string ,  difficulty :  string} = await req.json();

        const quizExists =  await db.query.quiz.findFirst({
            where : (v , {eq , and}) =>(
                eq(v.video_id ,  video_id),
                eq(v.difficulty ,  difficulty)
            )
        })


    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {message : 'Internal Server error while making the quiz'} ,
            {status :  500}
        )   
    }
}
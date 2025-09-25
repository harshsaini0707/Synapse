import { db } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {

        const userId  = req.headers.get("x-user-id");

        if(!userId){
            return NextResponse.json(
                {message : "Unauthorized User!!"},
                {status :  401}
            )
        }

        const videoHistory = await db.query.videos.findMany({
            where: (video ,  {eq}) => eq(video.user_id , userId)
        })

        if(!videoHistory || videoHistory.length === 0){
            return NextResponse.json(
                {message : "Currenlty no learning has started till now"} ,
                {status :  404}
            )
        }

        return NextResponse.json(
            {data : videoHistory} , 
            {status :  200}
        )


        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {message :"Internal server error while fetching the video history"},
            {status :  500}
        )
    }
}
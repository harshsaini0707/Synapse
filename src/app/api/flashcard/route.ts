import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    try {

        const {videoId}  = await req.json();
        
    } catch (error) {
        return NextResponse.json(
            {message : "Enable to  create the flashcards!!" +error},
            {status : 500}
        )
    }
}
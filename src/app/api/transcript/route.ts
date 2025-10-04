import {  NextRequest, NextResponse } from "next/server";
import {YoutubeLoader}  from "@langchain/community/document_loaders/web/youtube"
import play from "play-dl";
import { db } from "@/lib";
import {  videoChapters, videos } from "@/lib/db/schema";
import { createEmbedding } from "@/lib/gemini-transript/embedding";
import { hasChapterEmbeddingAndHighlights } from "@/lib/gemini-transript/hasChapters-gemini";
import { summarizeNoChapters } from "@/lib/gemini-transript/noChapters-gemini";

export async function POST(req : NextRequest){
    try {
        const {videoId}  = await req.json();
        const userId = req.headers.get("x-user-id");
        
        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized User" },
                { status: 401 }
            );
        }

        if (!videoId) {
            return NextResponse.json(
                { message: "Video ID is required" },
                { status: 400 }
            );
        }

        const ytUrl = `https://www.youtube.com/watch?v=${videoId}` as string
        
        console.log(`Processing video: ${videoId}`);

        const user = await db.query.users.findFirst({
            where : (users , {eq} ) => eq(users.id , userId)
        })

        if(!user){
            return NextResponse.json(
                {message :"User not found!!"},
                {status :  404}
            )
        }

        // Check if video already exists
        const alreadyHaveVideo = await db.query.videos.findFirst({
            where : (videos , {eq , and}  ) =>
                and(
                    eq(videos.video_id ,  videoId) , 
                    eq(videos.embedding_done , true)
                ),
        })

        if(alreadyHaveVideo){
            console.log('Already have data for video:', videoId);

            const chapters = await db.query.videoChapters.findMany({
                where : (videoChapters , {eq}) =>(
                    eq(videoChapters.video_id , videoId)
                )
            })
            return NextResponse.json({
                data : alreadyHaveVideo ,
                chapters : chapters
            })
        }
       
        console.log('Fetching transcript for:', ytUrl);

        // Get Transcript
        const transcript = YoutubeLoader.createFromUrl(ytUrl , {
            language : "en"
        })
        const docs = await transcript.load();
        const transcriptText = docs.map(d => d.pageContent).join("\n");

        if (!transcriptText || transcriptText.trim().length === 0) {
            throw new Error("No transcript found for this video");
        }

        console.log('Transcript fetched, getting video details...');

        // Get video info using play-dl
        const info = await play.video_basic_info(ytUrl);
        const details = info.video_details;

        if (!details) {
            throw new Error("Could not fetch video details");
        }

        console.log('Video details fetched, inserting into database...');

        const enterDataInVideoTable = await db.insert(videos).values({
            user_id : userId ,
            video_id : videoId,
            title : details?.title ?? "No Title",
            thumbnail : details?.thumbnails?.at(-1)?.url ?? "",
            duration : details?.durationRaw ?? "",
            transcript : transcriptText,
        }).returning();

        console.log('Creating embeddings...');

        // Create embedding
        await createEmbedding(transcriptText , videoId);

        const chapters = details.chapters?.map((c)=> ({
            title: c.title,
            timeStamp: c.timestamp
        })) || [];

        console.log(`Found ${chapters.length} chapters`);

        if(chapters.length > 0) {
            await hasChapterEmbeddingAndHighlights(chapters , videoId);
        } else {
            await summarizeNoChapters(transcriptText , details?.durationRaw ,  videoId);
        }

        const finalChapters = await db.query.videoChapters.findMany({
            where : (videoChapters , {eq}) => eq(videoChapters.video_id ,  videoId)
        })

        console.log('Processing completed successfully');

        return NextResponse.json({
            videoInfo : enterDataInVideoTable ,
            chapters : finalChapters
        })
          
    } catch (error) {
        console.error('Transcript API Error:', error);
        
        // More specific error messages
        let errorMessage = "Failed to fetch the youtube transcript, Internal Server Error";
        
        if (error instanceof Error) {
            if (error.message.includes("No transcript found")) {
                errorMessage = "No transcript available for this video. Please try a video with captions enabled.";
            } else if (error.message.includes("video_basic_info")) {
                errorMessage = "Could not access video information. The video might be private or restricted.";
            } else if (error.message.includes("authentication") || error.message.includes("credentials")) {
                errorMessage = "Google authentication error. Please contact support.";
            }
        }
        
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
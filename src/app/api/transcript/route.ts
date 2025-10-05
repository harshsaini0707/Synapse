import {  NextRequest, NextResponse } from "next/server";
import { db } from "@/lib";
import {  videoChapters, videos } from "@/lib/db/schema";
import { createEmbedding } from "@/lib/gemini-transript/embedding";
import { hasChapterEmbeddingAndHighlights } from "@/lib/gemini-transript/hasChapters-gemini";
import { summarizeNoChapters } from "@/lib/gemini-transript/noChapters-gemini";
import { getVideoDetails, extractChaptersWithLLM } from "@/lib/youtube-api";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

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

    // Log only the video processing start if needed (can remove if truly only description is desired)
    // console.log(`Processing video: ${videoId}`);

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
            // Suppressed: existing video log

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
       
    // Suppressed: metadata + transcript fetch log

    // 1. Metadata (title, thumbnail, duration, description) via YouTube Data API
    const videoDetails = await getVideoDetails(videoId);
    // Suppressed: video title log

    // 2. Transcript strictly via LangChain YoutubeLoader
    const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const transcriptLoader = YoutubeLoader.createFromUrl(ytUrl, { language: "en" });
    const docs = await transcriptLoader.load();
    const transcriptText = docs.map(d => d.pageContent).join("\n");
    // Suppressed: transcript length log

        if (!transcriptText || transcriptText.trim().length === 0) {
            throw new Error("No transcript found for this video");
        }

    // Suppressed: DB insert log

        const enterDataInVideoTable = await db.insert(videos).values({
            user_id : userId ,
            video_id : videoId,
            title : videoDetails.title,
            thumbnail : videoDetails.thumbnail,
            duration : videoDetails.duration,
            transcript : transcriptText,
        }).returning();

    // Suppressed: embeddings log

        // Create embedding
        await createEmbedding(transcriptText , videoId);

                // Use chapters extracted from description via LLM (fresh extraction to ensure consistency)
                const chapters = videoDetails.chapters.length > 0
                    ? videoDetails.chapters
                    : await extractChaptersWithLLM(videoDetails.description);

    // Suppressed: chapters count log
    // Only log the description as requested
    console.log('VIDEO_DESCRIPTION_START');
    console.log(videoDetails.description || '');
    console.log('VIDEO_DESCRIPTION_END');

        if(chapters.length > 0) {
            // Suppressed: with chapters log
            await hasChapterEmbeddingAndHighlights(chapters , videoId);
        } else {
            // Suppressed: without chapters log
            await summarizeNoChapters(transcriptText , videoDetails.duration ,  videoId);
        }

        const finalChapters = await db.query.videoChapters.findMany({
            where : (videoChapters , {eq}) => eq(videoChapters.video_id ,  videoId)
        })

    // Suppressed: completion log

        return NextResponse.json({
            videoInfo : enterDataInVideoTable ,
            chapters : finalChapters
        })
          
    } catch (error) {
        console.error('Transcript API Error:', error);
        
        // More specific error messages
        let errorMessage = "Failed to fetch the youtube transcript, Internal Server Error";
        
        if (error instanceof Error) {
            if (error.message.includes("No transcript found") || 
                error.message.includes("No transcript available") ||
                error.message.includes("Transcript is disabled")) {
                errorMessage = "No transcript available for this video. Please try a video with captions enabled.";
            } else if (error.message.includes("Video not found") || 
                       error.message.includes("private/deleted")) {
                errorMessage = "Video not found. The video might be private, deleted, or the ID is incorrect.";
            } else if (error.message.includes("YouTube API access forbidden") || 
                       error.message.includes("quota") || 
                       error.message.includes("API key")) {
                errorMessage = "YouTube API quota exceeded or invalid API key. Please contact support.";
            } else if (error.message.includes("authentication") || 
                       error.message.includes("credentials")) {
                errorMessage = "YouTube API authentication error. Please contact support.";
            }
        }
        
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
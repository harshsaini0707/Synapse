import {  NextRequest, NextResponse } from "next/server";
import { db } from "@/lib";
import { videos } from "@/lib/db/schema";
import { createEmbedding } from "@/lib/gemini-transript/embedding";
import { hasChapterEmbeddingAndHighlights } from "@/lib/gemini-transript/hasChapters-gemini";
import { summarizeNoChapters, generateHighlightsFromTranscript } from "@/lib/gemini-transript/noChapters-gemini";
import { getInfoFromVideo } from "@/lib/scrapVideo/scrapVideo";
import { ScrapedVideoItem } from "@/types/scrapeType";
import { getChaptersFromDescription } from "@/lib/scrapVideo/getVideoChaptersFromDescription";
import { checkUserAccess, updateTrialUsage } from "@/lib/userAccess";

export async function POST(req : NextRequest){
    try {
        
        const {videoId} :{videoId : string}  = await req.json();
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

            // Fetch all chapters and highlights for this video
            const chaptersAndHighlights = await db.query.videoChapters.findMany({
                where : (videoChapters , {eq}) => eq(videoChapters.video_id , videoId)
            });
            return NextResponse.json({
                data: alreadyHaveVideo,
                chaptersAndHighlights: chaptersAndHighlights
            });
        }

  // Check user access before processing video
        const accessStatus = await checkUserAccess(userId);
        
        if (!accessStatus.canCreateVideo) {
            return NextResponse.json(
                { 
                    message: accessStatus.reason || "Premium subscription required",
                    requiresPremium: true,
                    isPremium: accessStatus.isPremium,
                    hasUsedTrial: accessStatus.hasUsedTrial,
                    isNewUser: accessStatus.isNewUser
                },
                { status: 403 }
            );
        }

 
       
        console.log('Fetching transcript for:', ytUrl);

        // // Get Transcript
        // const transcript = YoutubeLoader.createFromUrl(ytUrl , {
        //     language : "en"
        // })
        // const docs = await transcript.load();
        // const transcriptText = docs.map(d => d.pageContent).join("\n");

        // if (!transcriptText || transcriptText.trim().length === 0) {
        //     throw new Error("No transcript found for this video");
        // }

        // console.log('Transcript fetched, getting video details...');

        // // Get video info using play-dl
        // const info = await play.video_basic_info(ytUrl);
        // const details = info.video_details;

        // if (!details) {
        //     throw new Error("Could not fetch video details");
        // }

        // console.log('Video details fetched, inserting into database...');

        const scrapData : ScrapedVideoItem  = await getInfoFromVideo(ytUrl);
        console.log(scrapData);

        const transcriptText =  scrapData?.transcript?.map((ele) => ele.text).join('\n');

        

        const enterDataInVideoTable = await db.insert(videos).values({
            user_id : userId ,
            video_id : videoId,
            title : scrapData?.title ?? "No Title",
            thumbnail : scrapData?.thumbnail ?? "",
            duration : scrapData?.durationRaw ?? "",
            transcript : transcriptText || " ",
        }).returning();

        console.log('Creating embeddings...');

        // Create embedding
        await createEmbedding(transcriptText , videoId);


// Now from description try to fetch the timestamp and make chapter else use the {start, end, transcript} to create the highlight with timestamp

       const chapters = await getChaptersFromDescription(scrapData?.description ?? "");

        if(chapters.length > 0) {
            // We found chapters in description, use them with embeddings
            await hasChapterEmbeddingAndHighlights(chapters, videoId);
        } else {
            // No chapters found in description, generate highlights from transcript with timestamps
            const transcriptWithTimeStamp = scrapData.transcript;
            await generateHighlightsFromTranscript(transcriptWithTimeStamp, scrapData?.durationRaw, videoId);
        }

        const finalChapters = await db.query.videoChapters.findMany({
            where : (videoChapters , {eq}) => eq(videoChapters.video_id ,  videoId)
        })


         // Update trial usage if user is on trial (new user who just created first video)
        if (!accessStatus.isPremium && accessStatus.isNewUser && !accessStatus.hasUsedTrial) {
            await updateTrialUsage(userId);
            console.log('Trial usage updated for user:', userId);
        }

        console.log('Processing completed successfully');

        return NextResponse.json({
            videoInfo : enterDataInVideoTable ,
            chapters : finalChapters
        })
          
    } catch (error) {
        console.error('Transcript API Error:-', error);
        
        // // More specific error messages
        // let errorMessage = "Failed to fetch the youtube transcript, Internal Server Error";
        
        // if (error instanceof Error) {
        //     if (error.message.includes("No transcript found")) {
        //         errorMessage = "No transcript available for this video. Please try a video with captions enabled.";
        //     } else if (error.message.includes("video_basic_info")) {
        //         errorMessage = "Could not access video information. The video might be private or restricted.";
        //     } else if (error.message.includes("authentication") || error.message.includes("credentials")) {
        //         errorMessage = "Google authentication error. Please contact support.";
        //     }
        // }
        
        return NextResponse.json(
            { error: error },
            { status: 500 }
        )
    }
}
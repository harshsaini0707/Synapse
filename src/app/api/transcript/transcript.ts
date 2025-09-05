import {  NextResponse } from "next/server";
import {YoutubeLoader}  from "@langchain/community/document_loaders/web/youtube"
import play from "play-dl";
import { db } from "@/lib";
import {  videos } from "@/lib/db/schema";
import { createEmbedding } from "@/lib/gemini-transript/embedding";
import { hasChapterEmbeddingAndHighlights } from "@/lib/gemini-transript/hasChapters-gemini";

export async function fetchSingleTranscript(){
    try {
           const id = "70daf988-ae43-4ec0-9020-f2ae09da4ad6";

            const viedoId  = "Gfr50f6ZBvo"
           
       // const {ytUrl :  string} =  await  req.json();
       const ytUrl =  "https://www.youtube.com/watch?v=Gfr50f6ZBvo" as string
        
        if(!ytUrl){
            return NextResponse.json(
                {message : "Url not found!!"},
                {status :  404}
            )
        }
         

       if(!id){
        return NextResponse.json(
            {message :"Unauthorized User"},
            {status :  401}
        )
       }
       const user = await db.query.users.findFirst({
        where : (users , {eq} ) => eq(users.id , id)
       })

       if(!user){
        return NextResponse.json(
            {message :"User not found!!"},
            {status :  404}
        )
       }

       const alreadyHaveViedo = await db.query.videos.findFirst(
        {
            where : (videos , {eq , and}  ) =>
                and(
                    eq(videos.video_id ,  viedoId) , 
                    eq(videos.embedding_done , true)
                ),
        }
       )


       if(alreadyHaveViedo){
        console.log('Aleady have data');
        return;
       }
       

        //Get Transcript
        const transcript =  YoutubeLoader.createFromUrl(ytUrl , {
            language : "en"
        })
        const docs  = await transcript.load();
        const transcriptText = docs.map(d => d.pageContent).join("\n");

           // help to fetch -> thumbnail + topic timestamp(chapaters)+ viedoId + title
       const info = await play.video_basic_info(ytUrl);
       const details = info.video_details;

          const enterDataInVideoTable = await db.insert(videos).values({
                user_id : id ,
                video_id : viedoId,
                title : details?.title ?? "No Title",
                thumbnail : details?.thumbnails.at(-1)?.url ?? "",
                duration : details?.durationRaw ?? "",
                transcript : transcriptText,

            }
        ).returning();

        //embedding
       await  createEmbedding(transcriptText , viedoId);


   

  if (!details.title || !details.thumbnails.length) {
  throw new Error("Video details incomplete, cannot insert");
}

      

const chapaters = details.chapters?.map((c)=> ({
    title :c.title,
    timeStamp : c.timestamp
}))

//console.log(chapaters);


if(chapaters.length > 0){
    
await hasChapterEmbeddingAndHighlights(chapaters , viedoId);

}else{
    console.log("Nooooo chaptersssssss!!!");
    
}

       
  
          
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error:"Failed to fetch the youtube transcript try another url"},
            {status :  500}
        )
    }
}

fetchSingleTranscript();
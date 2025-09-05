import { NextRequest, NextResponse } from "next/server";
import {YoutubeLoader}  from "@langchain/community/document_loaders/web/youtube"
import play from "play-dl";
import { summarizeNoChapters } from "@/lib/gemini-transript/noChapters-gemini";

export async function fetchSingleTranscript(){
    try {

       // const {ytUrl :  string} =  await  req.json();
       const ytUrl =  "https://www.youtube.com/watch?v=-Qm1_On71Oo" as string

        if(!ytUrl){
            return NextResponse.json(
                {message : "Url not found!!"},
                {status :  404}
            )
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

       console.log(details);
       

    console.log({
    viedoId :  details.id,
    title: details.title,
    thumbnail: details.thumbnails.at(-1)?.url,
    chapters : details.chapters,
    durationwe : details.durationRaw
  });
  

const chapaters = details.chapters?.map((c)=> ({
    title :c.title,
    timeStamp : c.timestamp
}))

//console.log(chapaters);



//summarizeNoChapters(transcriptText ,  details.durationRaw);
  
          
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error:"Failed to fetch the youtube transcript try another url"},
            {status :  500}
        )
    }
}

fetchSingleTranscript();
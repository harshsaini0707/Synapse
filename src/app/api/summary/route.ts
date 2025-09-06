import { db } from "@/lib";
import { summary } from "@/lib/db/schema";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { eq } from "drizzle-orm";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NextRequest, NextResponse } from "next/server";

type SummaryTypeKey = "quick_summary" | "detailed_summary";

export async function POST(req : NextRequest) {

try {
    
     const userId = req.headers.get("x-user-id");
    
        if (!userId) {
          return NextResponse.json(
            { message: "Unauthorized User!!" },
            { status: 401 }
          );
        }
    
   // const summaryType = "detailed"; // || "quick";

  //  const videoId =  "1tRTWwZ5DIc";

  const {videoId , summaryType} :{videoId:  string , summaryType :  string} = await  req.json();

    if(!videoId || !["quick" , "detailed"].includes(summaryType) ){
        return NextResponse.json(
            {message : "Invalid Selection!!"},
            {status :  400}
        )
    }

    //check if video exists in video table
    const video = await db.query.videos.findFirst({
        where : (v , {eq}) => eq(v.video_id ,  videoId) 
    })

    if(!video) return NextResponse.json(
        {message :"Video not found!!"},
        {status :  404}
    )

    // check if summary already exists
    const exists =  await  db.query.summary.findFirst({
        where: (v , {eq}) => eq(v.video_id ,  videoId)
    })

    const key : SummaryTypeKey = summaryType === "quick" ? "quick_summary" : "detailed_summary";

    if(exists && exists[key]){
        return NextResponse.json(
            {summary : exists[key]},
            {status : 200}
        )
    }

    const llm = new ChatGoogleGenerativeAI({
       model : "gemini-2.5-flash-lite",
       apiKey :  process.env.GEMINI_API_KEY!,
       temperature : 0.2
    });

    //split the transcript

    const splitter =  new RecursiveCharacterTextSplitter({
        chunkSize:3000,
        chunkOverlap:250
    })

    const chunks = await  splitter.splitText(video.transcript);

    //console.log(chunks);
    
    //summarize the chunks

    const chunkSummaries : string[] =[];

    for(const ch of chunks){
        const res =  await llm.invoke([
            {role :"system" , content : `You summarize transcript chunks concisely.`},
            {role:"user" , content : `Summarize this transcript chunk in 4–5 sentences:\n\n${ch}`}
        ])

        chunkSummaries.push(res.content as string);
    }


    //generate summary
    const combinedSummary : string =  chunkSummaries.join(" ");
    
   const summaryInstruction =
  summaryType === "detailed"
    ? `You are an expert content summarizer. Create a detailed, beginner-friendly summary of this video:
1. Include 10–12 key bullet points.
2. Use headers and subheaders for each major topic.
3. For each key point, provide a 3–5 sentence explanation.
4. Use relevant emojis to highlight important ideas.
5. Include a brief "Tip" or "Note" at the end of each section to reinforce learning.
6. Make it visually structured and easy to read.`
    : `You are an expert content summarizer. Create a concise summary of this video:
1. Include 3–4 main points only.
2. Use headers and subheaders to organize topics.
3. For each key point, provide 2–3 sentences explaining it.
4. Limit the entire summary to 8–9 lines of text per subheader.
5. Use emojis to highlight important ideas.
6. Make it engaging and beginner-friendly.`;

const generateSummary = await llm.invoke([
  {
    role: "system",
    content: "You are a helpful assistant summarizing YouTube transcripts in a structured, learner-friendly format."
  },
  {
    role: "user",
    content: `${summaryInstruction}\n\nTranscript Summaries:\n${combinedSummary}`
  }
]);



  const summaryFinal : string = generateSummary.content  as string;

  if(exists){
    await db.update(summary)
    .set({
        [key] :  summaryFinal,
        updated_at : new Date()
    })
    .where(eq(summary.video_id ,  videoId));
  }else{
    await  db.insert(summary).values({
    video_id : videoId,
    quick_summary : summaryType === "quick" ? summaryFinal : null ,
    detailed_summary :  summaryType === "detailed" ? summaryFinal : null,
    updated_at : new Date()
  })
  }
 return NextResponse.json(
    {message: `${summaryType} summary fetcher`,
    summary : summaryFinal
    },
    {status : 200}
 )

} catch (error) {
    console.log(error);
    return NextResponse.json(
        {message : "Internal Server Error While getting Summary"},
        {status :  500}
    )
    
}
}
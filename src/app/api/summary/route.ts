import { db } from "@/lib";
import { summary } from "@/lib/db/schema";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { eq } from "drizzle-orm";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NextRequest, NextResponse } from "next/server";

type SummaryTypeKey = "quick_summary" | "detailed_summary";

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized User!!" },
        { status: 401 }
      );
    }

    const { videoId, summaryType }: { videoId: string; summaryType: string } =
      await req.json();

    if (!videoId || !["quick", "detailed"].includes(summaryType)) {
      return NextResponse.json(
        { message: "Invalid Selection!!" },
        { status: 400 }
      );
    }

    // check if video exists
    const video = await db.query.videos.findFirst({
      where: (v, { eq }) => eq(v.video_id, videoId),
    });

    if (!video)
      return NextResponse.json(
        { message: "Video not found!!" },
        { status: 404 }
      );

    // check if summary already exists
    const exists = await db.query.summary.findFirst({
      where: (v, { eq }) => eq(v.video_id, videoId),
    });

    const key: SummaryTypeKey =
      summaryType === "quick" ? "quick_summary" : "detailed_summary";

    if (exists && exists[key]) {
      return NextResponse.json(
        { videoId, summaryType, summary: exists[key] },
        { status: 200 }
      );
    }

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash-lite",
      apiKey: process.env.GEMINI_API_KEY!,
      temperature: 0.2,
    });

    // split transcript into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 3000,
      chunkOverlap: 250,
    });

    const chunks = await splitter.splitText(video.transcript);

    // summarize chunks in parallel
    const chunkSummaries: string[] = await Promise.all(
      chunks.map(async (ch) => {
        const res = await llm.invoke([
          { role: "system", content: `You summarize transcript chunks concisely.` },
          { role: "user", content: `Summarize this transcript chunk in 4–5 sentences:\n\n${ch}` },
        ]);

        if (typeof res.content === "string") {
          return res.content;
        } else {
          return (res.content as Array<{ type: string; text: string }>)
            .map((c) => (c.type === "text" ? c.text : ""))
            .join("\n");
        }
      })
    );

    // combine summaries
    const combinedSummary: string = chunkSummaries.join(" ");

    const summaryInstruction =
      summaryType === "detailed"
        ? `🎯 You are an expert content summarizer. Generate a **detailed, engaging summary** of this YouTube video. 
Format it in a way that's visually appealing and easy to read:
1. Use **headers and subheaders** with emojis (## 📖 Topic Name).
2. Break content into **7–8 key bullet points**.
3. For each key point, write **3–5 sentences** with important keywords in **bold**.
4. Add relevant emojis 🔑✨🚀 to make it fun.
5. After each section, add a 📌 **Tip** or 💡 **Note**.
6. Make it look like a friendly ChatGPT-style answer.`
        : `⚡ You are an expert content summarizer. Generate a **quick, engaging summary** of this YouTube video. 
Format it in a way that's visually appealing:
1. Use **headers/subheaders** with emojis (### 🎬 Main Idea).
2. Include **3–4 main points** only.
3. For each point, write **2–3 sentences** with bold highlights for key words.
4. Use emojis 🎯🔥🌱 to keep it engaging.
5. Keep the total length within **8–9 lines per subheader**.`;


    // final summary generation
    const generateSummary = await llm.invoke([
      {
        role: "system",
        content:
          "You are a helpful assistant summarizing YouTube transcripts in a structured, learner-friendly format.",
      },
      {
        role: "user",
        content: `${summaryInstruction}\n\nTranscript Summaries:\n${combinedSummary}`,
      },
    ]);

    let summaryFinal: string;
    if (typeof generateSummary.content === "string") {
      summaryFinal = generateSummary.content;
    } else {
      summaryFinal = (generateSummary.content as Array<{ type: string; text: string }>)
        .map((c) => (c.type === "text" ? c.text : ""))
        .join("\n");
    }

    // save to DB
    if (exists) {
      await db
        .update(summary)
        .set({
          [key]: summaryFinal,
          updated_at: new Date(),
        })
        .where(eq(summary.video_id, videoId));
    } else {
      await db.insert(summary).values({
        video_id: videoId,
        quick_summary: summaryType === "quick" ? summaryFinal : null,
        detailed_summary: summaryType === "detailed" ? summaryFinal : null,
        updated_at: new Date(),
      });
    }

    // return result
    return NextResponse.json(
      {
        videoId,
        summaryType,
        summary: summaryFinal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error While getting Summary" },
      { status: 500 }
    );
  }
}

import { db } from "@/lib";
import { flashcards, transcriptChunks } from "@/lib/db/schema";
import { createFlashCards } from "@/lib/flashcards/flashcardGeneration";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type Flashcard = {
  question: string;
  answer: string;
  hint: string;
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ video_id: string }> }
) {
  try {
    const { video_id } = await params;
    const userId = req.headers.get("x-user-id");

    if (!video_id) {
      return NextResponse.json(
        { message: "Video Id required for generating the flashcards" },
        { status: 404 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized User!!" },
        { status: 401 }
      );
    }


    const flashCardExists = await db.query.flashcards.findMany({
      where: (cards, { eq }) => eq(cards.video_id, video_id),
    });

    if (flashCardExists.length > 0) {
      return NextResponse.json(
        { message: "Flashcard data already exists", data: flashCardExists },
        { status: 200 }
      );
    }


    const transcriptChunkss = await db
      .select({ content: transcriptChunks.content })
      .from(transcriptChunks)
      .where(eq(transcriptChunks.video_id, video_id));

    if (transcriptChunkss.length === 0) {
      return NextResponse.json(
        {
          message:
            "The transcript chunks for this particular video don't exist",
        },
        { status: 404 }
      );
    }


    const flashCardsKit: Flashcard[] = [];
    const windowSize = 12;
    const step = 4;

    for (let i = 0; i < transcriptChunkss.length; i += step) {
      const windowChunks = transcriptChunkss.slice(i, i + windowSize);
      const chunkText = windowChunks.map((ele) => ele.content).join(" ");

      const flashCardss = await createFlashCards(video_id, chunkText);
      if (flashCardss && flashCardss.length > 0) {
        flashCardsKit.push(...flashCardss);
      }
    }

    // Remove duplicates
    const uniqueFlashcards = Array.from(
      new Map(flashCardsKit.map((fc) => [fc.question, fc])).values()
    );

   
    let saved: Flashcard[] = [];
    if (uniqueFlashcards.length > 0) {
      saved = await db
        .insert(flashcards)
        .values(
          uniqueFlashcards.map((fc) => ({
            video_id: video_id,
            question: fc.question,
            answer: fc.answer,
            hint: fc.hint,
          }))
        )
        .returning();
    }

    return NextResponse.json(
      {
        message: "Flashcards generated successfully",
        data: saved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Flashcard generation error:", error);
    return NextResponse.json(
      { message: "Unable to create flashcards" },
      { status: 500 }
    );
  }
}

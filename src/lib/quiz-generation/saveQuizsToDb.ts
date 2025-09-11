import { NextResponse } from "next/server";
import { db } from "..";
import { quiz, quizOptions, quizQuestion } from "../db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

type AllQuestion = {
  question_text: string;
  type: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
}[];

export async function saveToDB(
  video_id: string,
  difficulty: string,
  allQuestion: AllQuestion
) {
  try {
    if (!allQuestion || allQuestion.length === 0) {
      return NextResponse.json(
        { message: "No questions to insert into the DB!" },
        { status: 404 }
      );
    }

    const quiz_id = uuidv4();

    // Use a transaction so either everything saves or nothing does
    await db.transaction(async (trx) => {
      await trx.insert(quiz).values({
        id: quiz_id,
        video_id,
        difficulty,
      });

      for (const q of allQuestion) {
        const question_id = uuidv4();

        // Insert the question first WITHOUT correct_option_id
        await trx.insert(quizQuestion).values({
          id: question_id,
          quiz_id,
          question_text: q.question_text,
          type: q.type,
          correct_option_id: null, // temporary, will update later
          explanation: q.explanation,
        });

        let correct_option_id: string | null = null;

        // Insert options for this question
        for (let i = 0; i < q.options.length; i++) {
          const option_id = uuidv4();

          await trx.insert(quizOptions).values({
            id: option_id,
            question_id,
            option_text: q.options[i],
          });

          if (i === q.correct_option_index) {
            correct_option_id = option_id;
          }
        }

        // Now update the question with the real correct_option_id
       if (correct_option_id) {
  await trx
    .update(quizQuestion)
    .set({ correct_option_id })
    .where(eq(quizQuestion.id, question_id));
}
      }
    });

    return NextResponse.json(
      {
        message: `Quiz saved for video ${video_id} with ${allQuestion.length} questions.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in saveToDB:", error);
    return NextResponse.json(
      { message: "Internal Server Error While Inserting Quiz Data" },
      { status: 500 }
    );
  }
}

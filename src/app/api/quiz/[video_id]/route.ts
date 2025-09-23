import { db } from "@/lib";
import { generateQuizFromTranscript } from "@/lib/quiz-generation/quizGeneration";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,
  { params }: { params: Promise<{ video_id: string }>}
) {
  try {
    const id = req.headers.get("x-user-id");
    if (!id) {
      return NextResponse.json({ message: "Unauthorized User!!" }, { status: 401 });
    }
  const resolvedParams  = await params; 
    const { video_id } = resolvedParams;


    const { difficulty }: { difficulty: string } = await req.json();

    console.log(video_id +"  vbfnwm");
    // console.log(difficulty +" hfegh");
    
    
    if(!video_id || !difficulty){
        return NextResponse.json(
            {message : "Required fields are there !!"}
        )
    }

    // Check if quiz already exists
    const quizExists = await db.query.quiz.findFirst({
      where: (v, { eq, and }) => and(eq(v.video_id, video_id), eq(v.difficulty, difficulty)),
      with: { questions: { with: { options: true } } },
    });

    if (quizExists) {
      return NextResponse.json(
        { data: quizExists, message: "Quiz already present in db!!" },
        { status: 200 }
      );
    }

    // Generate new quiz
    const newQuizData = await generateQuizFromTranscript(video_id, difficulty);

    // If generateQuizFromTranscript returned a NextResponse (error), forward it
    if (newQuizData instanceof NextResponse) return newQuizData;

    // Otherwise, respond with success
    return NextResponse.json(
      { message: "Quiz generated successfully!", data: newQuizData },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error while making the quiz" },
      { status: 500 }
    );
  }
}

import React, { use, useEffect, useState } from "react";
import {
  BookOpenCheck,
  TestTubeDiagonal,
  FlaskConical,
  GraduationCap,
} from "lucide-react";
import { useQuiz } from "@/hooks/quiz";
import { useParams } from "next/navigation";

const Quiz = () => {
  const [difficulty , setDifficulty] =  useState<"easy" | "hard">();
 const params = useParams();

 console.log(params.id);
 const video_id  = params.id as string
 
  const { data, isFetching, isError , refetch } = useQuiz(video_id ,difficulty, {
    enabled: false, // only fetch when triggered
  });
  
  useEffect(()=>{
    if(difficulty) refetch();
  },[difficulty])
  console.log(data?.data);
  

  return (
    <div className="flex flex-col md:flex-row mt-20 items-center justify-center gap-3">
      {/* Basic Quiz */}
      <div className="flex flex-col gap-4 border rounded-xl border-gray-700 p-4 w-80 shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-3 items-center">
            <BookOpenCheck className="text-green-500 h-6 w-6" />
            <h1 className="text-lg font-semibold">Basic Quiz</h1>
          </div>
          <span className="border border-green-500 text-green-500 text-xs px-2 py-1 rounded font-mono">
            Beginner
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-300">
          Quick brush-up  with fundamental concepts and key points.
        </p>

        <button
        onClick={()=>{
          setDifficulty("easy")
        }}
        
        className="flex font-mono items-center justify-center gap-2 bg-white/98 text-black rounded-md px-2 py-2 hover:scale-105 duration-200 transition">
          <TestTubeDiagonal className="h-5 w-5" />
          Attempt Basic Quiz
        </button>
      </div>

      {/* Advanced Quiz */}
      <div className="flex flex-col gap-4 border rounded-xl border-gray-700 p-4 w-80 shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-3 items-center">
            <GraduationCap className="text-red-500 h-6 w-6" />
            <h1 className="text-lg font-semibold">Advance Quiz</h1>
          </div>
          <span className="border border-red-500 text-red-500 text-xs px-2 py-1 rounded font-mono">
            Master
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-300">
        Tackle advanced concepts with strategic reasoning and applied knowledge.
        </p>

        <button 
        onClick={()=>{
          setDifficulty("hard")
        }}
        className="flex font-mono items-center justify-center gap-2 bg-white/98 text-black rounded-md px-2 py-2 hover:scale-105 duration-200 transition">
          <FlaskConical className="h-5 w-5 " />
          Attempt Advance Quiz
        </button>
      </div>
    </div>
  );
};

export default Quiz;

import React, { use, useEffect, useState } from "react";
import {
  BookOpenCheck,
  TestTubeDiagonal,
  FlaskConical,
  GraduationCap,
  Brain,
} from "lucide-react";
import { useQuiz } from "@/hooks/quiz";
import { useParams } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import { useUserStore } from "@/store/userStore";
import Quizquestions from "../Quizquestions/Quizquestions";

const Quiz = () => {
  const [difficulty , setDifficulty] =  useState<"easy" | "hard">();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
 const params = useParams();

 //console.log(params.id);
 const video_id  = params.id as string
 const {setAttemptingQuiz ,  attemptingQuiz} =  useQuizStore();
 const userName = useUserStore((state) => state.user?.name);
 
  const { data, isFetching, isError , refetch } = useQuiz(video_id ,difficulty, {
    enabled: false, // only fetch when triggered
  });
  
  const rotatingMessages = [
    `${userName?.split(" ")?.[0] || "Learner"}, generating quiz questions…`,
    `${userName?.split(" ")?.[0] || "Learner"}, crafting challenging problems…`,
    `${userName?.split(" ")?.[0] || "Learner"}, analyzing video content…`,
    `${userName?.split(" ")?.[0] || "Learner"}, preparing your ${difficulty} quiz…`,
    `${userName?.split(" ")?.[0] || "Learner"}, almost ready to test you! 🧠`,
  ];

  // Rotating messages effect
  useEffect(() => {
    if (isFetching) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => 
          (prevIndex + 1) % rotatingMessages.length
        );
      }, 4500); 
      return () => clearInterval(interval);
    }
  }, [isFetching, rotatingMessages.length]);

  // Reset message index when loading starts
  useEffect(() => {
    if (isFetching) {
      setCurrentMessageIndex(0);
    }
  }, [isFetching]);
  
  useEffect(()=>{
    if(difficulty) refetch();
  },[difficulty])

  
if(isFetching) return (
  <div className="flex flex-col justify-center items-center gap-8 min-h-[60vh] bg-[#09090B]">
    <div className="text-center space-y-6">
      {/* Flipping Text Messages */}
      <div className="h-12 flex items-center justify-center perspective-1000">
        <div 
          key={currentMessageIndex}
          className="text-xl text-green-400 font-mono animate-flipIn"
        >
          {rotatingMessages[currentMessageIndex]}
        </div>
      </div>
      
      {/* Progress Animation */}
      <div className="flex justify-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-700 ${
              i === currentMessageIndex % 5 
                ? 'bg-green-400 scale-125 shadow-lg shadow-purple-400/50' 
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
); 
 if(!attemptingQuiz || !data) { return (
   <div className="flex flex-col md:flex-row items-center justify-center gap-3 h-full p-4 overflow-y-auto">
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
         setAttemptingQuiz(true)
       }}
       disabled={isFetching}
       className={`flex font-mono items-center justify-center gap-2 bg-white/98 text-black rounded-md px-4 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
         isFetching ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
       }`}>
         <TestTubeDiagonal className={`h-5 w-5 ${isFetching ? 'animate-spin' : ''}`} />
         {isFetching && difficulty === 'easy' ? 'Generating...' : 'Attempt Basic Quiz'}
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
         setAttemptingQuiz(true)
       }}
       disabled={isFetching}
       className={`flex font-mono items-center justify-center gap-2 bg-white/98 text-black rounded-md px-4 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
         isFetching ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
       }`}>
         <FlaskConical className={`h-5 w-5 ${isFetching ? 'animate-bounce' : ''}`} />
         {isFetching && difficulty === 'hard' ? 'Generating...' : 'Attempt Advance Quiz'}
       </button>
     </div>
   </div>)
 }

if(attemptingQuiz && data) {
  return <Quizquestions questions ={data} difficulty={difficulty} />
}

    

};

export default Quiz;

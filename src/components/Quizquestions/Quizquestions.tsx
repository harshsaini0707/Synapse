"use client"
import { useQuizStore } from "@/store/quizStore";
import { useVideoStore } from "@/store/videoStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ArrowLeft , BadgeQuestionMark } from 'lucide-react';
interface QuizOption {
  id: string;
  option_text: string;
}

interface QuizQuestion {
  id: string;
  question_text: string;
  type: "mcq" | "fill_up";
  correct_option_id: string;
  explanation: string;
  options: QuizOption[];
}

interface QuizProps {
  questions: QuizQuestion[];
  difficulty : string | undefined
}

const Quizquestions: React.FC<QuizProps> = ({ questions, difficulty }) => {

    const video_id = useVideoStore((state) => state.videoId)
    const router = useRouter()
  const {
    setTotalQuestions,
    incrementAnswered,
    incrementScore,
    answers,
    showExplanations,
    setAnswer,
    setShowExplanation,
    resetAttemptingQuiz,
    setAttemptingQuiz 
  } = useQuizStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (questions) setTotalQuestions(questions.length);
  }, [questions, setTotalQuestions]);

  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentQuestion.id];
  const showExplanation = showExplanations[currentQuestion.id] || false;

  const isCorrect = (optionId: string) => optionId === currentQuestion.correct_option_id;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleOptionClick = (optionId: string) => {
    if (!selectedOption) {
      setAnswer(currentQuestion.id, optionId);
      setShowExplanation(currentQuestion.id, true);
      incrementAnswered();
      if (isCorrect(optionId)) incrementScore();
    }
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border-1 border-gray-600 text-white rounded-md shadow-md h-full overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 ">
        <button  
        onClick={
            ()=>{
            resetAttemptingQuiz(); 
            setAttemptingQuiz(false);
            router.push(`/video/${video_id}`);
            }
        }
        className="px-2 py-1 flex items-center justify-center cursor-pointer text-sm border border-gray-500 rounded-md bg-[#050505] hover:bg-[#282424] transition-all  duration-400">
         <ArrowLeft size={18}/>  Return
        </button>
        <h2 className="text-md font-semibold">{difficulty?.toUpperCase()} Quiz</h2>
        <span className="border-red-500 text-sm border-1 py-1 px-2 rounded-md text-red-500 font-mono">
          {currentQuestion.type.toUpperCase()}
        </span>
        <span className="text-neutral-400 font-sans">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-2 w-full bg-gray-700 rounded mb-4">
        <div className="h-2 bg-green-500 rounded" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <h3 className="mb-4 text-md font-medium">{currentQuestion.question_text}</h3>

      {/* Options */}
      <div className="flex flex-col gap-2 mb-4">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const correct = isCorrect(option.id);

          let optionClass = "border p-3 rounded cursor-pointer border-1 border-gray-700 hover:bg-[#111113] transition-all  duration-400";
          if (selectedOption) {
            if (isSelected && correct) optionClass += " bg-[#0B1C14] border-green-500";
            if (isSelected && !correct) optionClass += " bg-[#f97a6757] border-red-500";
            if (!isSelected && correct && showExplanation) optionClass += " bg-[#0B1C14] border-green-500";
          }

          return (
            <div key={option.id} className={optionClass} onClick={() => handleOptionClick(option.id)}
            
            >
              <input
              title="_"
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={isSelected}

                readOnly
                className="mr-2 accent-gray-600"
              />
              {option.option_text}
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-[#040504] p-3 border-1 border-gray-600 rounded-md mb-4 ">
          <strong className="font-extrabold">Explanation:</strong>
          <p className="font-bold">{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end gap-2">
        <button
        
        onClick={goPrevious} disabled={currentIndex === 0}
        
        
         className="px-4 py-2 text-neutral-200  cursor-grab bg-transparent border-1 border-gray-500  font-semibold  rounded-md hover:bg-[#222224] hover:text-neutral-100 transition-all  duration-400">
          Previous
        </button>
        <button onClick={() => setShowExplanation(currentQuestion.id, true)} className="px-2 py-2 font-semibold  cursor-help bg-[#ffa3031f] border-1 border-orange-500 text-neutral-200 flex gap-1 items-center justify-center  rounded-md hover:bg-[#ffa30347] transition">
        <BadgeQuestionMark size={20}/>Hint
        </button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={goNext} className="px-4 py-2 cursor-grab bg-transparent border-1 border-gray-500  font-semibold  rounded-md hover:bg-[#222224] hover:text-neutral-200 transition-all  duration-400">
            Next 
          </button>
        ) : (
          <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">Result</button>
        )}
      </div>
    </div>
  );
};


export default Quizquestions;

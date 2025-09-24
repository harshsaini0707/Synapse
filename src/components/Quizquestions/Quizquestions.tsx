import { useQuizStore } from "@/store/quizStore";
import React, { useState } from "react";

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
  const {
    setTotalQuestions,
    incrementAnswered,
    incrementScore,
    answers,
    showExplanations,
    setAnswer,
    setShowExplanation,
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
    <div className="max-w-3xl mx-auto p-4 bg-gray-900 text-white rounded-md shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={goPrevious} disabled={currentIndex === 0} className="px-3 py-1 border rounded">
          Previous
        </button>
        <h2 className="text-lg font-semibold">{difficulty} Quiz</h2>
        <span className="border-red-500 border-1 py-1 px-2 rounded-md text-red-500 font-mono">
          {currentQuestion.type.toUpperCase()}
        </span>
        <span>
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-2 w-full bg-gray-700 rounded mb-4">
        <div className="h-2 bg-pink-500 rounded" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <h3 className="mb-4 text-lg">{currentQuestion.question_text}</h3>

      {/* Options */}
      <div className="flex flex-col gap-2 mb-4">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const correct = isCorrect(option.id);

          let optionClass = "border p-3 rounded cursor-pointer hover:bg-gray-800 transition";
          if (selectedOption) {
            if (isSelected && correct) optionClass += " bg-green-600 border-green-500";
            if (isSelected && !correct) optionClass += " bg-red-700 border-red-500";
            if (!isSelected && correct && showExplanation) optionClass += " bg-green-600 border-green-500";
          }

          return (
            <div key={option.id} className={optionClass} onClick={() => handleOptionClick(option.id)}>
              <input
              title="_"
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={isSelected}
                readOnly
                className="mr-2"
              />
              {option.option_text}
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-gray-800 p-3 rounded mb-4">
          <strong>Explanation:</strong>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end gap-2">
        <button onClick={goPrevious} disabled={currentIndex === 0} className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
          Previous
        </button>
        <button onClick={() => setShowExplanation(currentQuestion.id, true)} className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
          Show Answer
        </button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={goNext} className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
            Next Question
          </button>
        ) : (
          <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">Result</button>
        )}
      </div>
    </div>
  );
};


export default Quizquestions;

import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuizStore = {
  totalQuestions: number;
  answered: number;
  score: number;
  correct: number;
  answers: { [questionId: string]: string };
  showExplanations: { [questionId: string]: boolean };
  attemptingQuiz: boolean;

  setTotalQuestions: (count: number) => void;
  incrementAnswered: () => void;
  incrementScore: () => void;
  setCorrect: () => void;
  resetQuiz: () => void;

  setAnswer: (questionId: string, optionId: string) => void;
  setShowExplanation: (questionId: string, value: boolean) => void;

  setAttemptingQuiz: (value: boolean) => void;
  resetAttemptingQuiz: () => void;
};


export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      totalQuestions: 0,
      answered: 0,
      score: 0,
      correct: 0,
      answers: {},
      showExplanations: {},
      attemptingQuiz: false,
      setTotalQuestions: (count) => set({ totalQuestions: count }),
      incrementAnswered: () => set((state) => ({ answered: state.answered + 1 })),
      incrementScore: () => set((state) => ({ score: state.score + 1 })),
      setCorrect: () => set((state) => ({ correct: state.correct + 1 })),
      resetQuiz: () =>
        set({
          totalQuestions: 0,
          answered: 0,
          score: 0,
          correct: 0,
          answers: {},
          showExplanations: {},
          attemptingQuiz: false,
        }),

      setAnswer: (questionId, optionId) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: optionId } })),
      setShowExplanation: (questionId, value) =>
        set((state) => ({ showExplanations: { ...state.showExplanations, [questionId]: value } })),

      setAttemptingQuiz: (value) => set({ attemptingQuiz: value }),
      resetAttemptingQuiz: () => set({ attemptingQuiz: false }),
    }),
    {
      name: "quiz-store",
    }
  )
);

import { create } from 'zustand';

type Answer = {
  question: string;
  answer: string;
};

type AnswersState = {
  answers: Answer[];
  addAnswer: (question: string, answer: string) => void;
  updateAnswer: (question: string, newAnswer: string) => void;
  removeAnswer: (question: string) => void;
  clearAnswers: () => void;
};

const useAnswersStore = create<AnswersState>((set) => ({
  answers: [],

  addAnswer: (question, answer) =>
    set((state) => {
      const existingIndex = state.answers.findIndex(
        (item) => item.question === question
      );

      if (existingIndex !== -1) {
        // Update existing
        const updated = [...state.answers];
        updated[existingIndex] = { question, answer };
        return { answers: updated };
      } else {
        // Add new
        return { answers: [...state.answers, { question, answer }] };
      }
    }),
  updateAnswer: (question, newAnswer) =>
    set((state) => ({
      answers: state.answers.map((item) =>
        item.question === question ? { ...item, answer: newAnswer } : item
      ),
    })),

  removeAnswer: (question) =>
    set((state) => ({
      answers: state.answers.filter((item) => item.question !== question),
    })),

  clearAnswers: () => set({ answers: [] }),
}));

export default useAnswersStore;

/*
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Answer = {
  question: string;
  answer: string;
};

type AnswersState = {
  answers: Answer[];
  addAnswer: (question: string, answer: string) => void;
  updateAnswer: (question: string, newAnswer: string) => void;
  removeAnswer: (question: string) => void;
  clearAnswers: () => void;
};

const useAnswersStore = create<AnswersState>()(
  persist(
    (set) => ({
      answers: [],

      addAnswer: (question, answer) =>
        set((state) => {
          const existingIndex = state.answers.findIndex(
            (item) => item.question === question
          );

          if (existingIndex !== -1) {
            // Update existing
            const updated = [...state.answers];
            updated[existingIndex] = { question, answer };
            return { answers: updated };
          } else {
            // Add new
            return { answers: [...state.answers, { question, answer }] };
          }
        }),

      updateAnswer: (question, newAnswer) =>
        set((state) => ({
          answers: state.answers.map((item) =>
            item.question === question ? { ...item, answer: newAnswer } : item
          ),
        })),

      removeAnswer: (question) =>
        set((state) => ({
          answers: state.answers.filter((item) => item.question !== question),
        })),

      clearAnswers: () => set({ answers: [] }),
    }),
    {
      name: 'answers-storage', // key in localStorage
    }
  )
);

export default useAnswersStore;

*/

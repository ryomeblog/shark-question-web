import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Question, CreateQuestionData, UpdateQuestionData } from '@/types/question';
import { LocalStorage, STORAGE_KEYS } from '@/lib/storage';

interface QuestionStore {
  questions: Question[];
  currentExam: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadQuestions: () => void;
  addQuestion: (questionData: CreateQuestionData) => void;
  updateQuestion: (id: string, updates: UpdateQuestionData) => void;
  deleteQuestion: (id: string) => void;
  getQuestionsByExam: (examName: string) => Question[];
  searchQuestions: (query: string) => Question[];
  setCurrentExam: (examName: string | null) => void;
  clearError: () => void;
}

export const useQuestionStore = create<QuestionStore>()(
  devtools(
    (set, get) => ({
      questions: [],
      currentExam: null,
      isLoading: false,
      error: null,

      loadQuestions: () => {
        set({ isLoading: true, error: null });
        try {
          const savedQuestions = LocalStorage.get<Question[]>(STORAGE_KEYS.QUESTIONS) || [];
          // Date オブジェクトの復元
          const questions = savedQuestions.map(q => ({
            ...q,
            createdAt: new Date(q.createdAt),
            updatedAt: new Date(q.updatedAt),
          }));
          set({ questions, isLoading: false });
        } catch (error) {
          set({ error: '問題の読み込みに失敗しました', isLoading: false });
        }
      },

      addQuestion: (questionData: CreateQuestionData) => {
        try {
          const now = new Date();
          const newQuestion: Question = {
            ...questionData,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now,
          };

          const updatedQuestions = [...get().questions, newQuestion];
          LocalStorage.set(STORAGE_KEYS.QUESTIONS, updatedQuestions);
          set({ questions: updatedQuestions, error: null });
        } catch (error) {
          set({ error: '問題の追加に失敗しました' });
        }
      },

      updateQuestion: (id: string, updates: UpdateQuestionData) => {
        try {
          const questions = get().questions;
          const questionIndex = questions.findIndex(q => q.id === id);
          
          if (questionIndex === -1) {
            set({ error: '問題が見つかりません' });
            return;
          }

          const updatedQuestion = {
            ...questions[questionIndex],
            ...updates,
            updatedAt: new Date(),
          };

          const updatedQuestions = [...questions];
          updatedQuestions[questionIndex] = updatedQuestion;

          LocalStorage.set(STORAGE_KEYS.QUESTIONS, updatedQuestions);
          set({ questions: updatedQuestions, error: null });
        } catch (error) {
          set({ error: '問題の更新に失敗しました' });
        }
      },

      deleteQuestion: (id: string) => {
        try {
          const updatedQuestions = get().questions.filter(q => q.id !== id);
          LocalStorage.set(STORAGE_KEYS.QUESTIONS, updatedQuestions);
          set({ questions: updatedQuestions, error: null });
        } catch (error) {
          set({ error: '問題の削除に失敗しました' });
        }
      },

      getQuestionsByExam: (examName: string) => {
        return get().questions.filter(q => q.examName === examName);
      },

      searchQuestions: (query: string) => {
        const questions = get().questions;
        const lowercaseQuery = query.toLowerCase();
        
        return questions.filter(q =>
          q.title.toLowerCase().includes(lowercaseQuery) ||
          q.content.toLowerCase().includes(lowercaseQuery) ||
          q.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
          q.examName.toLowerCase().includes(lowercaseQuery)
        );
      },

      setCurrentExam: (examName: string | null) => {
        set({ currentExam: examName });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    { name: 'question-store' }
  )
);
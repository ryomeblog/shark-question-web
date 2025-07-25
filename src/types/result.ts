import type { Question } from './question';
import type { UserAnswer } from './quiz';

export interface QuestionResult {
  questionId: string;
  question: Question;
  userAnswer: UserAnswer;
  isCorrect: boolean;
  timeSpent: number; // 秒単位
}

export interface QuizResult {
  id: string;
  quizId: string;
  examName: string;
  score: number; // 正答率（0-100）
  correctCount: number;
  totalCount: number;
  timeSpent: number; // 秒単位
  completedAt: Date;
  questionResults: QuestionResult[];
}
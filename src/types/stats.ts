import type { QuizResult } from './result';

export interface StudyStats {
  id: string;
  period: 'daily' | 'weekly' | 'monthly';
  examName?: string; // 試験別統計の場合
  questionsAnswered: number;
  averageScore: number;
  studyTime: number; // 分単位
  streakDays: number;
  date: Date;
}

export interface StudyHistory {
  id: string;
  examName: string;
  results: QuizResult[];
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  totalTimeSpent: number; // 分単位
  lastStudiedAt: Date;
  createdAt: Date;
}
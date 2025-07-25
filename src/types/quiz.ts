import type { Question } from './question';

export interface UserAnswer {
  questionId: string;
  selectedOptionIds: string[];
  isCorrect: boolean;
  answeredAt: Date;
}

export interface Quiz {
  id: string;
  examName: string;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  startTime: Date;  
  endTime?: Date;
  timeLimit?: number; // 分単位
  status: 'in_progress' | 'completed' | 'abandoned';
}

export type CreateQuizData = Omit<Quiz, 'id' | 'userAnswers' | 'currentQuestionIndex' | 'startTime' | 'status'>;
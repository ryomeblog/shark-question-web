export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  examName: string;
  title: string;
  content: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
  correctAnswers: string[];
  explanation?: string;
  keywords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  updatedAt: Date;
}

export type CreateQuestionData = Omit<Question, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateQuestionData = Partial<Omit<Question, 'id' | 'createdAt' | 'updatedAt'>>;
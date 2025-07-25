export interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:MM format
  days: number[]; // 0-6 (Sunday-Saturday)
}

export interface AppSettings {
  id: string;
  openaiApiKey?: string;
  questionsPerQuiz: number;
  defaultTimeLimit?: number; // 分単位
  reminderSettings: ReminderSettings;
  theme: 'light' | 'dark' | 'system';
  language: 'ja' | 'en';
  createdAt: Date;
  updatedAt: Date;
}

export interface ExamCategory {
  id: string;
  name: string;
  description?: string;
  keywords: string[];
  color: string;
  icon?: string;
  createdAt: Date;
}
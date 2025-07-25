# データ設計書

## 概要

受験対策アプリのデータ設計書です。アプリケーションで使用するデータモデル、型定義、ストレージ設計について説明します。

## データモデル

### 1. Question（問題）

問題データの基本構造

```typescript
interface Question {
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

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}
```

### 2. Quiz（クイズセッション）

問題を解くセッションのデータ

```typescript
interface Quiz {
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

interface UserAnswer {
  questionId: string;
  selectedOptionIds: string[];
  isCorrect: boolean;
  answeredAt: Date;
}
```

### 3. QuizResult（結果）

クイズ完了後の結果データ

```typescript
interface QuizResult {
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

interface QuestionResult {
  questionId: string;
  question: Question;
  userAnswer: UserAnswer;
  isCorrect: boolean;
  timeSpent: number;
}
```

### 4. StudyHistory（学習履歴）

学習履歴の集約データ

```typescript
interface StudyHistory {
  id: string;
  examName: string;
  results: QuizResult[];
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  totalTimeSpent: number;
  lastStudiedAt: Date;
  createdAt: Date;
}
```

### 5. StudyStats（学習統計）

学習統計データ

```typescript
interface StudyStats {
  id: string;
  period: 'daily' | 'weekly' | 'monthly';
  examName?: string; // 試験別統計の場合
  questionsAnswered: number;
  averageScore: number;
  studyTime: number; // 分単位
  streakDays: number;
  date: Date;
}
```

### 6. AppSettings（アプリ設定）

アプリケーション設定データ

```typescript
interface AppSettings {
  id: string;
  openaiApiKey?: string;
  questionsPerQuiz: number;
  defaultTimeLimit?: number;
  reminderSettings: ReminderSettings;
  theme: 'light' | 'dark' | 'system';
  language: 'ja' | 'en';
  createdAt: Date;
  updatedAt: Date;
}

interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:MM format
  days: number[]; // 0-6 (Sunday-Saturday)
}
```

### 7. ExamCategory（試験カテゴリ）

試験分類データ

```typescript
interface ExamCategory {
  id: string;
  name: string;
  description?: string;
  keywords: string[];
  color: string;
  icon?: string;
  createdAt: Date;
}
```

## データベーススキーマ（IndexedDB想定）

### Object Stores

1. **questions**
   - キー: `id` (string)
   - インデックス: `examName`, `createdAt`, `keywords`

2. **quizzes**
   - キー: `id` (string)
   - インデックス: `examName`, `status`, `startTime`

3. **quiz_results**
   - キー: `id` (string)
   - インデックス: `examName`, `completedAt`, `score`

4. **study_history**
   - キー: `examName` (string)
   - インデックス: `lastStudiedAt`

5. **study_stats**
   - キー: `[period, date, examName]` (compound)
   - インデックス: `period`, `date`, `examName`

6. **app_settings**
   - キー: `id` (string, 常に 'default')

7. **exam_categories**
   - キー: `id` (string)
   - インデックス: `name`

## 状態管理（Zustand Store）

### QuestionStore

```typescript
interface QuestionStore {
  questions: Question[];
  currentExam: string | null;
  
  // Actions
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  getQuestionsByExam: (examName: string) => Question[];
  searchQuestions: (query: string) => Question[];
}
```

### QuizStore

```typescript
interface QuizStore {
  currentQuiz: Quiz | null;
  
  // Actions
  startQuiz: (examName: string, questionCount: number) => void;
  answerQuestion: (questionId: string, selectedOptionIds: string[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => QuizResult;
  abandonQuiz: () => void;
}
```

### ResultStore

```typescript
interface ResultStore {
  results: QuizResult[];
  currentResult: QuizResult | null;
  
  // Actions
  saveResult: (result: QuizResult) => void;
  getResultsByExam: (examName: string) => QuizResult[];
  getResultsByDateRange: (start: Date, end: Date) => QuizResult[];
  deleteResult: (id: string) => void;
}
```

### StatsStore

```typescript
interface StatsStore {
  weeklyStats: StudyStats | null;
  dailyStats: StudyStats[];
  
  // Actions
  updateStats: (result: QuizResult) => void;
  getStatsForPeriod: (period: 'daily' | 'weekly' | 'monthly', date: Date) => StudyStats | null;
  calculateStreak: () => number;
}
```

### SettingsStore

```typescript
interface SettingsStore {
  settings: AppSettings;
  
  // Actions
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
  exportData: () => Promise<string>;
  importData: (data: string) => Promise<void>;
  clearAllData: () => Promise<void>;
}
```

## データフロー

### 1. 問題作成フロー

```
問題作成画面 → QuestionStore.addQuestion → IndexedDB.questions
                ↓
            ExamCategory更新 → IndexedDB.exam_categories
```

### 2. クイズ実行フロー

```
ホーム画面 → QuizStore.startQuiz → IndexedDB.questions（問題取得）
         ↓
      問題画面 → QuizStore.answerQuestion → 回答保存
         ↓
      結果画面 → QuizStore.finishQuiz → ResultStore.saveResult
         ↓
    IndexedDB.quiz_results → StatsStore.updateStats → IndexedDB.study_stats
```

### 3. 履歴表示フロー

```
履歴画面 → ResultStore.getResultsByExam → IndexedDB.quiz_results
        ↓
      結果一覧表示 → 詳細アコーディオン展開
```

## データバリデーション

### 入力検証ルール

1. **Question**
   - `title`: 必須、最大100文字
   - `content`: 必須、最大1000文字
   - `options`: 最小2個、最大10個
   - `correctAnswers`: 最小1個

2. **Quiz**
   - `timeLimit`: 0以上の数値
   - `questions`: 最小1個

3. **AppSettings**
   - `questionsPerQuiz`: 1-50の範囲
   - `openaiApiKey`: API キー形式の検証

## データマイグレーション

バージョン管理とデータマイグレーション戦略

```typescript
interface DataVersion {
  version: string;
  migratedAt: Date;
}

const migrations = {
  '1.0.0': (db: IDBDatabase) => {
    // 初期スキーマ作成
  },
  '1.1.0': (db: IDBDatabase) => {
    // ExamCategory追加
  },
  '1.2.0': (db: IDBDatabase) => {
    // StudyStats構造変更
  }
};
```

## パフォーマンス最適化

### インデックス戦略

1. **頻繁に検索される項目**
   - `examName`（試験別フィルタ）
   - `createdAt`/`completedAt`（日付ソート）
   - `score`（成績ソート）

2. **複合インデックス**
   - `[examName, completedAt]`（試験別履歴）
   - `[period, date]`（統計データ）

### キャッシュ戦略

1. **メモリキャッシュ**
   - 現在のクイズデータ
   - 直近の統計データ

2. **永続化キャッシュ**
   - 設定データ
   - 試験カテゴリ

## セキュリティ考慮事項

1. **API キー管理**
   - ローカルストレージでの暗号化
   - 適切な権限管理

2. **データエクスポート**
   - 個人情報の除外
   - データサニタイゼーション

3. **入力検証**
   - XSS対策
   - SQLインジェクション対策（将来のサーバー連携時）

## 今後の拡張予定

1. **クラウド同期**
   - ユーザー認証
   - データ同期機能

2. **協調学習**
   - 問題共有機能
   - ランキング機能

3. **AI機能強化**
   - 学習進度分析
   - カスタマイズ問題生成
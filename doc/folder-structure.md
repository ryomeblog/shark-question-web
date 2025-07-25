# フォルダ構成設計書

## 概要

受験対策アプリのフォルダ構成設計書です。React + TypeScript + shadcn/ui + Zustandを使用したモダンなフロントエンドアプリケーションの構成を定義します。

## 全体構成

```
src/
├── components/          # 再利用可能なUIコンポーネント
│   ├── ui/             # shadcn/uiコンポーネント（自動生成）
│   ├── common/         # 共通コンポーネント
│   ├── features/       # 機能別コンポーネント
│   └── layout/         # レイアウトコンポーネント
├── pages/              # ページコンポーネント
├── stores/             # Zustand状態管理
├── utils/                # ユーティリティ・ライブラリ
├── hooks/              # カスタムhooks
├── types/              # TypeScript型定義
├── constants/          # 定数定義
├── styles/             # スタイル関連
└── assets/             # 静的アセット
```

## 詳細構成

### `/src/components/`

UIコンポーネントの階層構造

```
components/
├── ui/                 # shadcn/uiコンポーネント
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── progress.tsx
│   ├── accordion.tsx
│   ├── select.tsx
│   ├── badge.tsx
│   └── ...
├── common/             # 共通UIコンポーネント
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   ├── ConfirmDialog.tsx
│   └── ThemeToggle.tsx
├── features/           # 機能別コンポーネント
│   ├── question/       # 問題関連
│   │   ├── QuestionCard.tsx
│   │   ├── QuestionForm.tsx
│   │   ├── QuestionList.tsx
│   │   ├── OptionInput.tsx
│   │   └── QuestionPreview.tsx
│   ├── quiz/           # クイズ関連
│   │   ├── QuizProgress.tsx
│   │   ├── QuestionDisplay.tsx
│   │   ├── AnswerOption.tsx
│   │   ├── QuizNavigation.tsx
│   │   ├── TimerDisplay.tsx
│   │   └── QuizControls.tsx
│   ├── result/         # 結果関連
│   │   ├── ScoreDisplay.tsx
│   │   ├── ResultChart.tsx
│   │   ├── QuestionResult.tsx
│   │   ├── ResultActions.tsx
│   │   └── ScoreBadge.tsx
│   ├── history/        # 履歴関連
│   │   ├── HistoryList.tsx
│   │   ├── HistoryItem.tsx
│   │   ├── HistoryFilter.tsx
│   │   ├── StatsSummary.tsx
│   │   └── ExportButton.tsx
│   ├── settings/       # 設定関連
│   │   ├── ApiKeyForm.tsx
│   │   ├── GeneralSettings.tsx
│   │   ├── ReminderSettings.tsx
│   │   ├── DataManagement.tsx
│   │   └── ThemeSettings.tsx
│   └── stats/          # 統計関連
│       ├── WeeklyStats.tsx
│       ├── StudyProgress.tsx
│       ├── PerformanceChart.tsx
│       └── StreakCounter.tsx
└── layout/             # レイアウトコンポーネント
    ├── AppLayout.tsx
    ├── PageLayout.tsx
    ├── Sidebar.tsx
    ├── MobileNav.tsx
    └── Container.tsx
```

### `/src/pages/`

ページコンポーネント（React Router用）

```
pages/
├── HomePage.tsx        # ホーム画面
├── CreateQuestionPage.tsx  # 問題作成画面
├── QuizPage.tsx        # 問題画面
├── ResultPage.tsx      # 結果画面
├── HistoryPage.tsx     # 履歴画面
├── SettingsPage.tsx    # 設定画面
└── NotFoundPage.tsx    # 404画面
```

### `/src/stores/`

Zustand状態管理ストア

```
stores/
├── index.ts            # ストアのexport
├── questionStore.ts    # 問題管理ストア
├── quizStore.ts        # クイズ実行ストア
├── resultStore.ts      # 結果管理ストア
├── historyStore.ts     # 履歴管理ストア
├── statsStore.ts       # 統計ストア
├── settingsStore.ts    # 設定ストア
└── uiStore.ts          # UI状態ストア
```

### `/src/utils/`

ユーティリティとライブラリ

```
utils/
├── utils.ts            # 汎用ユーティリティ（shadcn/ui標準）
├── db/                 # データベース関連
│   ├── index.ts
│   ├── migrations.ts
│   ├── questions.ts
│   ├── quizzes.ts
│   ├── results.ts
│   └── settings.ts
├── api/                # API関連
│   ├── openai.ts
│   └── types.ts
├── validation/         # バリデーション
│   ├── question.ts
│   ├── quiz.ts
│   └── settings.ts
├── export/             # データエクスポート
│   ├── csv.ts
│   └── json.ts
├── analytics/          # 分析・統計
│   ├── calculator.ts
│   └── formatter.ts
└── constants.ts        # ライブラリ固有の定数
```

### `/src/hooks/`

カスタムReact hooks

```
hooks/
├── useQuestion.ts      # 問題関連のhooks
├── useQuiz.ts          # クイズ関連のhooks
├── useResult.ts        # 結果関連のhooks
├── useStats.ts         # 統計関連のhooks
├── useLocalStorage.ts  # ローカルストレージhooks
├── useTimer.ts         # タイマーhooks
├── useDebounce.ts      # デバウンスhooks
└── useKeyboard.ts      # キーボードショートカットhooks
```

### `/src/types/`

TypeScript型定義

```
types/
├── index.ts            # 全型定義のexport
├── question.ts         # 問題関連の型
├── quiz.ts             # クイズ関連の型
├── result.ts           # 結果関連の型
├── settings.ts         # 設定関連の型
├── stats.ts            # 統計関連の型
├── api.ts              # API関連の型
└── ui.ts               # UI関連の型
```

### `/src/constants/`

定数定義

```
constants/
├── index.ts            # 全定数のexport
├── exam.ts             # 試験関連定数
├── ui.ts               # UI関連定数
├── colors.ts           # カラーパレット
├── routes.ts           # ルート定義
└── config.ts           # アプリ設定
```

### `/src/styles/`

CSS・スタイル関連

```
styles/
├── globals.css         # グローバルスタイル
├── components.css      # コンポーネント固有スタイル
└── animations.css      # アニメーション定義
```

### `/src/assets/`

静的アセット

```
assets/
├── icons/              # アイコンファイル
├── images/             # 画像ファイル
└── fonts/              # フォントファイル
```

## ファイル命名規則

### コンポーネント

- **PascalCase**: `QuestionCard.tsx`, `HomePage.tsx`
- **機能接頭語**: 機能別フォルダ内では機能名を含める
  - `QuestionForm.tsx` (question機能)
  - `QuizProgress.tsx` (quiz機能)

### Hooks

- **camelCase**: `useQuestion.ts`, `useLocalStorage.ts`
- **use接頭語**: React hooksの命名規則に従う

### ストア

- **camelCase + Store接尾語**: `questionStore.ts`, `settingsStore.ts`

### 型定義

- **小文字 + 機能名**: `question.ts`, `quiz.ts`
- **インターface/Type名はPascalCase**: `Question`, `QuizResult`

### ユーティリティ

- **camelCase**: `calculator.ts`, `formatter.ts`
- **機能を表す明確な名前**: `csvExporter.ts`, `validation.ts`

## Import/Export 規則

### Barrel Exports

各ディレクトリに`index.ts`を配置してbarrel exportを活用

```typescript
// src/components/features/question/index.ts
export { QuestionCard } from './QuestionCard';
export { QuestionForm } from './QuestionForm';
export { QuestionList } from './QuestionList';

// 使用側
import { QuestionCard, QuestionForm } from '@/components/features/question';
```

### 絶対インポート

`@/`エイリアスを使用した絶対インポート

```typescript
import { Button } from '@/components/ui/button';
import { useQuestion } from '@/hooks/useQuestion';
import { Question } from '@/types/question';
```

## コンポーネント設計原則

### 単一責任の原則

- 各コンポーネントは1つの責任のみを持つ
- 複雑なコンポーネントは小さなコンポーネントに分割

### Props設計

```typescript
// Good: 明確で型安全なProps
interface QuestionCardProps {
  question: Question;
  isSelected?: boolean;
  onSelect?: (questionId: string) => void;
  onEdit?: (questionId: string) => void;
  onDelete?: (questionId: string) => void;
}

// Bad: 不明確なProps
interface QuestionCardProps {
  data: any;
  callback?: Function;
}
```

### コンポーネント構成例

```typescript
// src/components/features/question/QuestionCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/types/question';
import { cn } from '@/utils/utils';

interface QuestionCardProps {
  question: Question;
  className?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function QuestionCard({
  question,
  className,
  onEdit,
  onDelete
}: QuestionCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{question.title}</CardTitle>
        <div className="flex gap-2">
          <Badge variant="secondary">{question.type}</Badge>
          <Badge variant="outline">{question.difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {question.content}
        </p>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onEdit?.(question.id)}>
            編集
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete?.(question.id)}>
            削除
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## 状態管理パターン

### Zustandストア例

```typescript
// src/stores/questionStore.ts
import { create } from 'zustand';
import { Question } from '@/types/question';
import { questionService } from '@/utils/db/questions';

interface QuestionStore {
  questions: Question[];
  currentExam: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchQuestions: () => Promise<void>;
  addQuestion: (question: Omit<Question, 'id'>) => Promise<void>;
  updateQuestion: (id: string, updates: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  setCurrentExam: (examName: string) => void;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],
  currentExam: null,
  isLoading: false,
  error: null,

  fetchQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const questions = await questionService.getAll();
      set({ questions, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addQuestion: async questionData => {
    try {
      const question = await questionService.create(questionData);
      set(state => ({
        questions: [...state.questions, question],
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // ... other actions
}));
```

## テスト構成（将来対応）

```
src/
├── __tests__/          # テストファイル
│   ├── components/     # コンポーネントテスト
│   ├── hooks/          # hooksテスト
│   ├── stores/         # ストアテスト
│   └── utils/            # ユーティリティテスト
└── test-utils/         # テストユーティリティ
    ├── setup.ts
    ├── mocks.ts
    └── helpers.ts
```

## 開発ワークフロー

### 新機能追加手順

1. **型定義作成**: `/src/types/` に必要な型を定義
2. **ストア作成**: `/src/stores/` に状態管理ロジックを実装
3. **データレイヤー**: `/src/utils/db/` にデータ永続化ロジックを実装
4. **hooks作成**: `/src/hooks/` にカスタムhooksを実装
5. **コンポーネント作成**: `/src/components/features/` に機能別コンポーネントを実装
6. **ページ作成**: `/src/pages/` にページコンポーネントを実装
7. **ルーティング追加**: ルーター設定を更新

このフォルダ構成により、機能別の明確な分離と高い保守性を実現できます。

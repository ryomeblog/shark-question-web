# Shark Question Web

受験対策のための問題管理・学習支援Webアプリケーションです。問題の作成、クイズの実行、学習履歴の管理などの機能を提供します。

## 特徴

- 📝 **問題作成**: カスタム問題を簡単に作成・管理
- 🎯 **クイズモード**: 作成した問題でクイズを実行
- 📊 **学習統計**: 学習進捗や成績を可視化
- 📚 **履歴管理**: 過去の学習記録を確認
- ⚙️ **設定管理**: アプリケーションの各種設定をカスタマイズ
- 💾 **ローカルストレージ**: データはブラウザに保存され、オフラインでも使用可能
- 🎨 **モダンUI**: shadcn/uiとTailwind CSSによる美しいインターフェース

## 技術スタック

- **フロントエンド**: React 19
- **言語**: TypeScript
- **ビルドツール**: Vite
- **UIフレームワーク**: shadcn/ui + Tailwind CSS
- **状態管理**: Zustand
- **ルーティング**: React Router v7
- **フォーム管理**: React Hook Form
- **チャート**: Recharts
- **アイコン**: Lucide React
- **日付処理**: date-fns

## 前提条件

- Node.js 18.x 以上
- npm 9.x 以上

## インストール

1. リポジトリをクローン:

```bash
git clone https://github.com/ryomeblog/shark-question-web.git
cd shark-question-web
```

2. 依存関係をインストール:

```bash
npm install
```

## 使い方

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

### ビルド

```bash
npm run build
```

ビルド成果物は `dist` ディレクトリに出力されます。

### プレビュー

ビルドした成果物をプレビュー:

```bash
npm run preview
```

### リント

```bash
npm run lint
```

自動修正を有効にする場合:

```bash
npm run lint:fix
```

### フォーマット

コードのフォーマット:

```bash
npm run format
```

フォーマットチェック:

```bash
npm run format:check
```

## プロジェクト構成

```
src/
├── components/          # UIコンポーネント
│   ├── ui/             # shadcn/uiコンポーネント
│   ├── common/         # 共通コンポーネント
│   ├── features/       # 機能別コンポーネント
│   └── layout/         # レイアウトコンポーネント
├── pages/              # ページコンポーネント
├── stores/             # Zustand状態管理
├── lib/                # ユーティリティ・ライブラリ
├── types/              # TypeScript型定義
├── constants/          # 定数定義
└── App.tsx             # アプリケーションルート
```

詳細なフォルダ構成については、[doc/folder-structure.md](doc/folder-structure.md) を参照してください。

## 主な機能

### ホーム画面
- 学習統計の概要表示
- 各機能へのクイックアクセス

### 問題作成
- 単一選択・複数選択問題の作成
- 試験名、難易度、キーワードの設定
- 問題の編集・削除

### クイズ実行
- ランダムまたは指定した問題でクイズを実行
- 進捗状況の表示
- タイマー機能（オプション）

### 結果表示
- スコアと正答率の表示
- 問題別の正誤確認
- 解説の表示

### 学習履歴
- 過去のクイズ結果一覧
- 試験別のフィルタリング
- 詳細な統計情報

### 設定
- OpenAI APIキーの設定
- クイズの問題数設定
- テーマ設定

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | プロダクションビルドを実行 |
| `npm run preview` | ビルドしたアプリをプレビュー |
| `npm run lint` | ESLintでコードをチェック |
| `npm run lint:fix` | ESLintでコードを自動修正 |
| `npm run format` | Prettierでコードをフォーマット |
| `npm run format:check` | フォーマットをチェック |

## ドキュメント

- [データ設計書](doc/data-design.md) - データモデルとストレージ設計
- [フォルダ構成](doc/folder-structure.md) - プロジェクトの詳細な構成

## ライセンス

このプロジェクトは [MIT License](LICENSE) の下でライセンスされています。

## 作者

[ryome](https://github.com/ryomeblog)

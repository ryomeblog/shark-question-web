/**
 * アプリケーション定数
 */

// カラーパレット（SVG仕様書に基づく）
export const COLORS = {
  PRIMARY: '#007bff',     // 青
  SECONDARY: '#28a745',   // 緑
  WARNING: '#dc3545',     // 赤
  INFO: '#17a2b8',        // 水色
  GRAY: '#6c757d',        // グレー
  PURPLE: '#6f42c1',      // 紫
} as const;

// デフォルト設定値
export const DEFAULT_SETTINGS = {
  QUESTIONS_PER_QUIZ: 10,
  DEFAULT_TIME_LIMIT: 30, // 分
  THEME: 'system' as const,
  LANGUAGE: 'ja' as const,
} as const;

// 画面サイズ（モバイルファースト）
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// ルート定義
export const ROUTES = {
  HOME: '/',
  CREATE_QUESTION: '/create-question',
  QUIZ: '/quiz',
  RESULT: '/result',
  HISTORY: '/history',
  SETTINGS: '/settings',
} as const;

// 制限値
export const LIMITS = {
  QUESTION_TITLE_MAX: 100,
  QUESTION_CONTENT_MAX: 1000,
  OPTIONS_MIN: 2,
  OPTIONS_MAX: 10,
  QUESTIONS_PER_QUIZ_MIN: 1,
  QUESTIONS_PER_QUIZ_MAX: 50,
  TIME_LIMIT_MIN: 5, // 分
  TIME_LIMIT_MAX: 180, // 分
} as const;

// アニメーション設定
export const ANIMATIONS = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    IN: 'ease-in',
    OUT: 'ease-out',
    IN_OUT: 'ease-in-out',
  },
} as const;
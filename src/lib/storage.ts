/**
 * ローカルストレージのユーティリティクラス
 * 型安全なデータの保存・取得を提供
 */
export class LocalStorage {
  /**
   * データを保存
   */
  static set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage with key "${key}":`, error);
    }
  }

  /**
   * データを取得
   */
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage with key "${key}":`, error);
      return null;
    }
  }

  /**
   * データを削除
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage with key "${key}":`, error);
    }
  }

  /**
   * すべてのデータを削除
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * キーが存在するかチェック
   */
  static has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * すべてのキーを取得
   */
  static keys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) keys.push(key);
    }
    return keys;
  }

  /**
   * データサイズを取得（概算）
   */
  static getSize(): number {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
}

/**
 * アプリ固有のストレージキー
 */
export const STORAGE_KEYS = {
  QUESTIONS: 'exam_app_questions',
  QUIZ_RESULTS: 'exam_app_quiz_results',
  STUDY_STATS: 'exam_app_study_stats',
  SETTINGS: 'exam_app_settings',
  EXAM_CATEGORIES: 'exam_app_exam_categories',
  CURRENT_QUIZ: 'exam_app_current_quiz',
  USER_PREFERENCES: 'exam_app_user_preferences',
} as const;

/**
 * 日付オブジェクトのシリアライゼーション対応
 */
export const StorageUtils = {
  /**
   * Dateオブジェクトを含むデータの保存
   */
  setWithDates<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value, (key, val) => {
        if (val instanceof Date) {
          return { __type: 'Date', value: val.toISOString() };
        }
        return val;
      });
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving data with dates to localStorage:`, error);
    }
  },

  /**
   * Dateオブジェクトを含むデータの取得
   */
  getWithDates<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      
      return JSON.parse(item, (key, val) => {
        if (val && typeof val === 'object' && val.__type === 'Date') {
          return new Date(val.value);
        }
        return val;
      }) as T;
    } catch (error) {
      console.error(`Error reading data with dates from localStorage:`, error);
      return null;
    }
  },

  /**
   * 配列データに要素を追加
   */
  appendToArray<T>(key: string, newItem: T): void {
    const existing = LocalStorage.get<T[]>(key) || [];
    existing.push(newItem);
    LocalStorage.set(key, existing);
  },

  /**
   * 配列データから要素を削除
   */
  removeFromArray<T>(key: string, predicate: (item: T) => boolean): void {
    const existing = LocalStorage.get<T[]>(key) || [];
    const filtered = existing.filter(item => !predicate(item));
    LocalStorage.set(key, filtered);
  },

  /**
   * 配列データの要素を更新
   */
  updateInArray<T>(key: string, predicate: (item: T) => boolean, updater: (item: T) => T): void {
    const existing = LocalStorage.get<T[]>(key) || [];
    const updated = existing.map(item => predicate(item) ? updater(item) : item);
    LocalStorage.set(key, updated);
  },
};
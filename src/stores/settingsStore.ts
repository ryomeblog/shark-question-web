import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AppSettings } from '@/types/settings';
import { LocalStorage, STORAGE_KEYS } from '@/lib/storage';
import { DEFAULT_SETTINGS } from '@/constants/app';

interface SettingsStore {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadSettings: () => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
  exportData: () => Promise<string>;
  importData: (data: string) => Promise<void>;
  clearAllData: () => Promise<void>;
  clearError: () => void;
}

const createDefaultSettings = (): AppSettings => ({
  id: 'default',
  questionsPerQuiz: DEFAULT_SETTINGS.QUESTIONS_PER_QUIZ,
  defaultTimeLimit: DEFAULT_SETTINGS.DEFAULT_TIME_LIMIT,
  reminderSettings: {
    enabled: false,
    time: '18:00',
    days: [1, 2, 3, 4, 5], // 平日
  },
  theme: DEFAULT_SETTINGS.THEME,
  language: DEFAULT_SETTINGS.LANGUAGE,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    (set, get) => ({
      settings: createDefaultSettings(),
      isLoading: false,
      error: null,

      loadSettings: () => {
        set({ isLoading: true, error: null });
        try {
          const savedSettings = LocalStorage.get<AppSettings>(STORAGE_KEYS.SETTINGS);
          if (savedSettings) {
            // Date オブジェクトの復元
            const settings = {
              ...savedSettings,
              createdAt: new Date(savedSettings.createdAt),
              updatedAt: new Date(savedSettings.updatedAt),
            };
            set({ settings, isLoading: false });
          } else {
            const defaultSettings = createDefaultSettings();
            LocalStorage.set(STORAGE_KEYS.SETTINGS, defaultSettings);
            set({ settings: defaultSettings, isLoading: false });
          }
        } catch (error) {
          set({ error: '設定の読み込みに失敗しました', isLoading: false });
        }
      },

      updateSettings: (updates: Partial<AppSettings>) => {
        try {
          const currentSettings = get().settings;
          const updatedSettings = {
            ...currentSettings,
            ...updates,
            updatedAt: new Date(),
          };

          LocalStorage.set(STORAGE_KEYS.SETTINGS, updatedSettings);
          set({ settings: updatedSettings, error: null });
        } catch (error) {
          set({ error: '設定の更新に失敗しました' });
        }
      },

      resetSettings: () => {
        try {
          const defaultSettings = createDefaultSettings();
          LocalStorage.set(STORAGE_KEYS.SETTINGS, defaultSettings);
          set({ settings: defaultSettings, error: null });
        } catch (error) {
          set({ error: '設定のリセットに失敗しました' });
        }
      },

      exportData: async () => {
        try {
          const allData = {
            questions: LocalStorage.get(STORAGE_KEYS.QUESTIONS) || [],
            quizResults: LocalStorage.get(STORAGE_KEYS.QUIZ_RESULTS) || [],
            studyStats: LocalStorage.get(STORAGE_KEYS.STUDY_STATS) || [],
            settings: get().settings,
            examCategories: LocalStorage.get(STORAGE_KEYS.EXAM_CATEGORIES) || [],
            exportedAt: new Date().toISOString(),
          };

          return JSON.stringify(allData, null, 2);
        } catch (error) {
          set({ error: 'データのエクスポートに失敗しました' });
          throw error;
        }
      },

      importData: async (data: string) => {
        try {
          const parsedData = JSON.parse(data);
          
          // データの検証（簡易版）
          if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
            throw new Error('無効なデータ形式です');
          }

          // 各データをローカルストレージに保存
          LocalStorage.set(STORAGE_KEYS.QUESTIONS, parsedData.questions);
          LocalStorage.set(STORAGE_KEYS.QUIZ_RESULTS, parsedData.quizResults || []);
          LocalStorage.set(STORAGE_KEYS.STUDY_STATS, parsedData.studyStats || []);
          LocalStorage.set(STORAGE_KEYS.EXAM_CATEGORIES, parsedData.examCategories || []);

          if (parsedData.settings) {
            const settings = {
              ...parsedData.settings,
              createdAt: new Date(parsedData.settings.createdAt),
              updatedAt: new Date(),
            };
            LocalStorage.set(STORAGE_KEYS.SETTINGS, settings);
            set({ settings });
          }

          set({ error: null });
        } catch (error) {
          set({ error: 'データのインポートに失敗しました' });
          throw error;
        }
      },

      clearAllData: async () => {
        try {
          // 設定以外のデータを削除
          LocalStorage.remove(STORAGE_KEYS.QUESTIONS);
          LocalStorage.remove(STORAGE_KEYS.QUIZ_RESULTS);
          LocalStorage.remove(STORAGE_KEYS.STUDY_STATS);
          LocalStorage.remove(STORAGE_KEYS.EXAM_CATEGORIES);
          LocalStorage.remove(STORAGE_KEYS.CURRENT_QUIZ);

          set({ error: null });
        } catch (error) {
          set({ error: 'データの削除に失敗しました' });
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    { name: 'settings-store' }
  )
);
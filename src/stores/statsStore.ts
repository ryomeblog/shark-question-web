import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StudyStats } from '@/types/stats';
import type { QuizResult } from '@/types/result';
import { LocalStorage, STORAGE_KEYS } from '@/lib/storage';
import { format, startOfDay, startOfWeek, startOfMonth, differenceInDays } from 'date-fns';

interface StatsStore {
  weeklyStats: StudyStats | null;
  dailyStats: StudyStats[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadStats: () => void;
  updateStats: (result: QuizResult) => void;
  getStatsForPeriod: (period: 'daily' | 'weekly' | 'monthly', date: Date) => StudyStats | null;
  calculateStreak: () => number;
  clearError: () => void;
}

export const useStatsStore = create<StatsStore>()(
  devtools(
    (set, get) => ({
      weeklyStats: null,
      dailyStats: [],
      isLoading: false,
      error: null,

      loadStats: () => {
        set({ isLoading: true, error: null });
        try {
          const savedStats = LocalStorage.get<StudyStats[]>(STORAGE_KEYS.STUDY_STATS) || [];
          // Date オブジェクトの復元
          const stats = savedStats.map(s => ({
            ...s,
            date: new Date(s.date),
          }));

          // 今週と今日の統計を取得
          const today = new Date();
          const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 月曜日始まり
          
          const weeklyStats = stats.find(s => 
            s.period === 'weekly' && 
            startOfWeek(s.date, { weekStartsOn: 1 }).getTime() === weekStart.getTime()
          ) || null;

          const dailyStats = stats.filter(s => s.period === 'daily')
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 30); // 直近30日分

          set({ 
            weeklyStats, 
            dailyStats, 
            isLoading: false 
          });
        } catch (error) {
          set({ error: '統計データの読み込みに失敗しました', isLoading: false });
        }
      },

      updateStats: (result: QuizResult) => {
        try {
          const completedDate = result.completedAt;
          const dayStart = startOfDay(completedDate);
          const weekStart = startOfWeek(completedDate, { weekStartsOn: 1 });
          const monthStart = startOfMonth(completedDate);

          const existingStats = LocalStorage.get<StudyStats[]>(STORAGE_KEYS.STUDY_STATS) || [];
          const statsMap = new Map(existingStats.map(s => [`${s.period}_${s.date}_${s.examName || ''}`, s]));

          // 日次統計の更新
          const dailyKey = `daily_${dayStart.toISOString()}_${result.examName}`;
          const dailyStats = statsMap.get(dailyKey) || {
            id: crypto.randomUUID(),
            period: 'daily' as const,
            examName: result.examName,
            questionsAnswered: 0,
            averageScore: 0,
            studyTime: 0,
            streakDays: 0,
            date: dayStart,
          };

          // 統計を更新
          const totalQuestions = dailyStats.questionsAnswered + result.totalCount;
          const totalScore = (dailyStats.averageScore * dailyStats.questionsAnswered) + (result.score * result.totalCount);
          
          dailyStats.questionsAnswered = totalQuestions;
          dailyStats.averageScore = totalScore / totalQuestions;
          dailyStats.studyTime += Math.round(result.timeSpent / 60); // 分に変換
          
          statsMap.set(dailyKey, dailyStats);

          // 週次統計の更新
          const weeklyKey = `weekly_${weekStart.toISOString()}_${result.examName}`;
          const weeklyStats = statsMap.get(weeklyKey) || {
            id: crypto.randomUUID(),
            period: 'weekly' as const,
            examName: result.examName,
            questionsAnswered: 0,
            averageScore: 0,
            studyTime: 0,
            streakDays: 0,
            date: weekStart,
          };

          const weeklyTotalQuestions = weeklyStats.questionsAnswered + result.totalCount;
          const weeklyTotalScore = (weeklyStats.averageScore * weeklyStats.questionsAnswered) + (result.score * result.totalCount);
          
          weeklyStats.questionsAnswered = weeklyTotalQuestions;
          weeklyStats.averageScore = weeklyTotalScore / weeklyTotalQuestions;
          weeklyStats.studyTime += Math.round(result.timeSpent / 60);
          
          statsMap.set(weeklyKey, weeklyStats);

          // 統計データを保存
          const updatedStats = Array.from(statsMap.values());
          LocalStorage.set(STORAGE_KEYS.STUDY_STATS, updatedStats);

          // ストアを更新
          get().loadStats();
          
        } catch (error) {
          set({ error: '統計データの更新に失敗しました' });
        }
      },

      getStatsForPeriod: (period: 'daily' | 'weekly' | 'monthly', date: Date) => {
        const stats = LocalStorage.get<StudyStats[]>(STORAGE_KEYS.STUDY_STATS) || [];
        let targetDate: Date;

        switch (period) {
          case 'daily':
            targetDate = startOfDay(date);
            break;
          case 'weekly':
            targetDate = startOfWeek(date, { weekStartsOn: 1 });
            break;
          case 'monthly':
            targetDate = startOfMonth(date);
            break;
        }

        return stats.find(s => 
          s.period === period && 
          new Date(s.date).getTime() === targetDate.getTime()
        ) || null;
      },

      calculateStreak: () => {
        try {
          const dailyStats = get().dailyStats;
          if (dailyStats.length === 0) return 0;

          let streak = 0;
          const today = startOfDay(new Date());
          let currentDate = today;

          // 連続学習日数を計算
          for (const stat of dailyStats) {
            const statDate = startOfDay(stat.date);
            const daysDiff = differenceInDays(currentDate, statDate);

            if (daysDiff === 0) {
              // 今日または連続した日
              streak++;
              currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // 1日前
            } else if (daysDiff === 1 && streak === 0) {
              // 昨日から始まる場合（今日はまだ学習していない）
              streak++;
              currentDate = statDate;
              currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
            } else {
              // 連続が途切れた
              break;
            }
          }

          return streak;
        } catch (error) {
          set({ error: '連続学習日数の計算に失敗しました' });
          return 0;
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    { name: 'stats-store' }
  )
);
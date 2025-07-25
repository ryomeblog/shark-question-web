import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStatsStore } from '@/stores';
import { BookOpen, Target, Calendar, Clock } from 'lucide-react';

export function WeeklyStats() {
  const { weeklyStats, calculateStreak } = useStatsStore();
  const streak = calculateStreak();

  // デフォルト値を設定
  const stats = weeklyStats || {
    questionsAnswered: 0,
    averageScore: 0,
    studyTime: 0,
  };

  const statItems = [
    {
      label: '解いた問題',
      value: `${stats.questionsAnswered}問`,
      icon: BookOpen,
      color: 'text-blue-600',
    },
    {
      label: '平均正答率',
      value: `${Math.round(stats.averageScore)}%`,
      icon: Target,
      color: 'text-green-600',
    },
    {
      label: '連続学習',
      value: `${streak}日`,
      icon: Calendar,
      color: 'text-orange-600',
    },
    {
      label: '学習時間',
      value: `${Math.floor(stats.studyTime / 60)}時間${stats.studyTime % 60}分`,
      icon: Clock,
      color: 'text-purple-600',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          今週の学習状況
          <Badge variant="secondary">Week</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {statItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
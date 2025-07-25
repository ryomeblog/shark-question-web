import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WeeklyStats } from '@/components/features/stats/WeeklyStats';
import { useQuestionStore } from '@/stores';
import { 
  Play, 
  PlusCircle, 
  BarChart3, 
  Settings,
  BookOpen,
  RefreshCw
} from 'lucide-react';
import { ROUTES, COLORS } from '@/constants/app';

export function HomePage() {
  const questions = useQuestionStore((state) => state.questions);
  
  // 試験別問題数の統計
  const examStats = questions.reduce((acc, question) => {
    acc[question.examName] = (acc[question.examName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalQuestions = questions.length;
  const examCount = Object.keys(examStats).length;

  return (
    <div className="space-y-6">
      {/* ウェルカムメッセージ */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">こんにちは！</h1>
        <p className="text-muted-foreground">今日も学習を頑張りましょう</p>
      </div>

      {/* メインメニューカード */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* 問題を解く */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20">
          <Link to={ROUTES.QUIZ}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-white">
                <div 
                  className="p-2 rounded-md"
                  style={{ backgroundColor: COLORS.PRIMARY }}
                >
                  <Play className="h-5 w-5 text-white" />
                </div>
                問題を解く
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                ランダム10問に挑戦
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {totalQuestions}問が利用可能
                </span>
                <span className="text-xs font-medium" style={{ color: COLORS.PRIMARY }}>
                  START
                </span>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* 問題を作成 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-secondary/20">
          <Link to={ROUTES.CREATE_QUESTION}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-md"
                  style={{ backgroundColor: COLORS.SECONDARY }}
                >
                  <PlusCircle className="h-5 w-5 text-white" />
                </div>
                問題を作成
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                AIで新しい問題を生成
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {examCount}種類の試験
                </span>
                <span className="text-xs font-medium" style={{ color: COLORS.SECONDARY }}>
                  CREATE
                </span>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* 結果を見る */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-info/20">
          <Link to={ROUTES.HISTORY}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-md"
                  style={{ backgroundColor: COLORS.INFO }}
                >
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                結果を見る
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                過去の成績と履歴
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  学習履歴を確認
                </span>
                <span className="text-xs font-medium" style={{ color: COLORS.INFO }}>
                  HISTORY
                </span>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* 設定 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-gray-500/20">
          <Link to={ROUTES.SETTINGS}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-md"
                  style={{ backgroundColor: COLORS.GRAY }}
                >
                  <Settings className="h-5 w-5 text-white" />
                </div>
                設定
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                API設定とその他
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  アプリの設定
                </span>
                <span className="text-xs font-medium text-gray-600">
                  CONFIG
                </span>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* 学習統計セクション */}
      <WeeklyStats />

      {/* クイックアクション */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="flex-1 justify-start gap-2"
              disabled
            >
              <RefreshCw className="h-4 w-4" />
              間違えた問題を復習する（準備中）
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1 justify-start gap-2"
              disabled
            >
              <BookOpen className="h-4 w-4" />
              ランダム問題に挑戦（準備中）
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 問題が登録されていない場合のメッセージ */}
      {totalQuestions === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center">
            <PlusCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">問題を追加してください</h3>
            <p className="text-muted-foreground mb-4">
              まずは問題を作成して学習を始めましょう
            </p>
            <Button asChild>
              <Link to={ROUTES.CREATE_QUESTION}>
                最初の問題を作成する
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function QuizPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">問題を解く</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>クイズ機能</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            クイズ機能は開発中です。近日公開予定です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
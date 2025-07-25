import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">履歴</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>履歴機能</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            履歴機能は開発中です。近日公開予定です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
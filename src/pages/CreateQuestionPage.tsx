import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CreateQuestionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">問題作成</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>問題作成機能</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            問題作成機能は開発中です。近日公開予定です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">設定</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>設定機能</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            設定機能は開発中です。近日公開予定です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
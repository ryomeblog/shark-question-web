import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  History, 
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/app';

const navigationItems = [
  {
    name: 'ホーム',
    href: ROUTES.HOME,
    icon: Home,
  },
  {
    name: '問題作成',
    href: ROUTES.CREATE_QUESTION,
    icon: PlusCircle,
  },
  {
    name: '履歴',
    href: ROUTES.HISTORY,
    icon: History,
  },
  {
    name: '設定',
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
];

export function Navigation() {
  const location = useLocation();

  return (
    <>
      {/* デスクトップ用サイドナビゲーション */}
      <nav className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:flex md:flex-col md:bg-card md:border-r md:border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold text-foreground">受験対策アプリ</h1>
        </div>
        
        <div className="flex-1 px-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* モバイル用ボトムナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* デスクトップ用のメインコンテンツ余白 */}
      <div className="hidden md:block md:w-64" />
    </>
  );
}
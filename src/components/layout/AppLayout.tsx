import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Container } from './Container';

interface AppLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export function AppLayout({ children, showNavigation = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="pb-16 md:pb-0">
        <Container>
          <main className="py-4 md:py-8">
            {children}
          </main>
        </Container>
      </div>
      
      {showNavigation && <Navigation />}
    </div>
  );
}
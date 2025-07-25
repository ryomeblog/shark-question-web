import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { HomePage } from '@/pages/HomePage';
import { CreateQuestionPage } from '@/pages/CreateQuestionPage';
import { QuizPage } from '@/pages/QuizPage';
import { ResultPage } from '@/pages/ResultPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { useSettingsStore, useQuestionStore, useStatsStore } from '@/stores';
import { ROUTES } from '@/constants/app';

function App() {
  const loadSettings = useSettingsStore((state) => state.loadSettings);
  const loadQuestions = useQuestionStore((state) => state.loadQuestions);
  const loadStats = useStatsStore((state) => state.loadStats);

  // アプリ起動時にデータを読み込み
  useEffect(() => {
    loadSettings();
    loadQuestions();
    loadStats();
  }, [loadSettings, loadQuestions, loadStats]);

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CREATE_QUESTION} element={<CreateQuestionPage />} />
          <Route path={ROUTES.QUIZ} element={<QuizPage />} />
          <Route path={ROUTES.RESULT} element={<ResultPage />} />
          <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
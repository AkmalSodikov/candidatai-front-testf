import { BrowserRouter, Route, Routes } from 'react-router';
import QuizPage from './pages/quiz/QuizPage';
import JobSuggest from './pages/quiz/JobSuggest';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<QuizPage />} path="/" />
        <Route element={<JobSuggest />} path="/rank-jobs" />
      </Routes>
    </BrowserRouter>
  );
}

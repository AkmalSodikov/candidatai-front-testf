import { BrowserRouter, Route, Routes } from 'react-router';
import QuizPage from './pages/quiz/QuizPage';
import JobSuggest from './pages/quiz/JobSuggest';
import UploadCV from './pages/upload-cv/UploadCV';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UploadCV />} path="/" />
        <Route element={<QuizPage />} path="/quiz" />
        <Route element={<JobSuggest />} path="/rank-jobs" />
      </Routes>
    </BrowserRouter>
  );
}

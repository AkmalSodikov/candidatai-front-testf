import { BrowserRouter, Route, Routes } from 'react-router';
import QuizPage from './pages/quiz/QuizPage';
import JobSuggest from './pages/quiz/JobTitlesPage/JobSuggest';
import UploadCV from './pages/upload-cv/UploadCV';
import CustomJobTitle from './pages/quiz/JobTitlesPage/CustomJobTitle';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardLayout from './components/layouts/DashboardLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UploadCV />} path="/" />
        <Route element={<QuizPage />} path="/quiz" />
        <Route path="/rank-jobs">
          <Route index element={<JobSuggest />} />
          <Route path="custom" element={<CustomJobTitle />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/my-jobs" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

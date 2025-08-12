import api from './api';

export async function getJobTitles(
  answers: { question: string; answer: string }[]
) {
  const res =
    await api.post('/job-titles', answers);

  return res.data;
}

import api from './api';

// Fixed version - returns consistent data and throws errors
export async function getJobTitles(
  answers: { question: string; answer: string }[]
): Promise<{ job_titles: string[] }> {
  const resumeId = localStorage.getItem('resume_id');

  if (!resumeId) {
    throw new Error('No resume id found');
  }

  const response = await api.post('/job_titles', {
    responses: answers,
    resume_id: resumeId,
  });

  return response.data;
}

import api from './api';

type VacancyRequestItemType = {
  title: string;
  location: string;
  weight: number;
};

interface VacancyRequestType {
  queries: VacancyRequestItemType[];
  resume_id: string;
}

export async function startVacancyScraping(queries: VacancyRequestType) {
  const res = await api.post('/scrape', queries);
  return res.data;
}

export async function getVacancyStatus(request_id: string) {
  const res = await api.get(`/status/${request_id}`);
  return res.data;
}

export async function getMatchedVacancies(request_id: string) {
  return await api.get(`/matching/lancedb/${request_id}`);
}

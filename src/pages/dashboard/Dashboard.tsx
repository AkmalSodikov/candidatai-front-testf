import MyJobs from '../../features/dashboard/jobs/MyJobs';
import { useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getMatchedVacancies, getVacancyStatus } from '@/api/matchingService'; // Add getVacancyData import
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const MyJobsPage = () => {
  const location = useLocation();
  const requestId = location.state?.id;


  const { data: statusData, isFetching: isStatusFetching } = useQuery({
    queryKey: ['vacancyStatus', requestId],
    queryFn: () => getVacancyStatus(requestId),
    enabled: !!requestId,
    refetchInterval: (data) => {
      if (!data) return 30000;
      return data?.state?.data?.status === 'finished' ? false : 30000;
    },
    refetchIntervalInBackground: true,
    staleTime: Infinity,
  });


  const isStatusFinished = statusData?.status === 'finished';


  const { data: vacancyData, isFetching: isVacancyFetching } = useQuery({
    queryKey: ['vacancyData', requestId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await getMatchedVacancies(requestId);
      console.log('Vacancy data received:', data);
      return data;
    },
    enabled: !!requestId && isStatusFinished,
    staleTime: Infinity,
  });

  if (isStatusFetching || isVacancyFetching || !isStatusFinished) {
    const loadingMessage = isStatusFinished
      ? 'Loading vacancy data...'
      : 'Fetching personalized vacancies... This might take a little while.';

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col justify-center h-screen items-center gap-8"
      >
        <span className="text-gray-500 text-xl text-center">
          {loadingMessage}
        </span>
        <Loader2 className="text-primary font-bold mr-5 ml-5 size-12 animate-spin" />
      </motion.div>
    );
  }

  return <MyJobs items={vacancyData?.data.jobs} />;
};

export default MyJobsPage;

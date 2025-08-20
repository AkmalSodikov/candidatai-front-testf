import { Button } from '@/components/ui/button.tsx';
import JobCard from '@/features/dashboard/jobs/JobCard';
import JobDetailSheet from '@/features/dashboard/jobs/JobInfo';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

export interface Job {
  id: number;
  mainImage: string;
  job_url: string;
  description: string;
  job_type: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  lance_db_distance: number;
  isLast: boolean;
}

const MyJobs = ({ items }: { items: Job[] }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); // store clicked job

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-1 flex-col gap-3 pb-8">
          <div className="flex flex-row items-center justify-between pt-6">
            <h1 className="text-3xl font-semibold">
              Top 10 Job Opportunities for You
            </h1>

            <div className="hidden md:flex items-center space-x-2">
              <Button className="p-5" variant="outline">
                <RefreshCw />
                Refresh
              </Button>
            </div>
          </div>

          {items.length > 1 ? (
            <div className="border rounded-xl">
              {items.map((item, i) => {
                const isLast = i === items.length - 1;
                return (
                  <JobCard
                    key={item.id}
                    mainImage={item.mainImage}
                    url={item.job_url}
                    jobTitle={item.title}
                    company={item.company}
                    location={item.location}
                    salaryRange={item.salaryRange || 'Not specified'}
                    match={Math.round(item.lance_db_distance * 100)}
                    isLast={isLast}
                    onSeeDetails={() => {
                      setSelectedJob(item); // set the selected job
                      setSheetOpen(true); // open sheet
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-center text-lg">Nothing found.</p>
          )}
        </div>
      </div>

      {/* Pass the selected job to the sheet */}
      <JobDetailSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        job={selectedJob} 
      />
    </>
  );
};

export default MyJobs;

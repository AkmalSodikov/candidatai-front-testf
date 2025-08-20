import { Button } from '@/components/ui/button';

import Mock from '@/assets/dashboard/jobs/mock.png';
import { X } from 'lucide-react';
import MatchingBadge from './MatchingBadge';
import SalaryBadge from './SalaryBadge';

type JobCardProps = {
  mainImage: string;
  url: string;
  jobTitle: string;
  company: string;
  location: string;
  salaryRange: string;
  match: number;
  isLast: boolean;
  onSeeDetails?: () => void;
};

const JobCard = ({
  url,
  jobTitle,
  company,
  location,
  salaryRange,
  match,
  isLast,
  onSeeDetails,
}: JobCardProps) => {
  return (
    <article
      className={`group relative flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-5 transition-colors ${
        !isLast ? 'border-b' : ''
      }`}
    >
      <button
        className="cursor-pointer absolute top-4 right-5 p-1 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Dismiss job"
      >
        <X />
      </button>
      <img
        className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-sm object-cover flex-shrink-0"
        alt={`${company} logo`}
        src={Mock}
        loading="lazy"
      />

      {/* Job Details */}
      <div className="flex-1 mt-3 sm:mt-0 sm:ml-5">
        <div>
          <h3 className="font-normal text-lg">{jobTitle}</h3>
          <p className="text-sm text-secondary">Company: {company}</p>
          <p className="text-sm text-muted-foreground">Location: {location}</p>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <SalaryBadge salary={salaryRange} />
            <MatchingBadge match={String(match)} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSeeDetails}
              className="flex-1 sm:flex-initial p-4"
            >
              See Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(url, '_blank')}
              className="flex-1 sm:flex-initial p-4"
            >
              Apply now
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobCard;

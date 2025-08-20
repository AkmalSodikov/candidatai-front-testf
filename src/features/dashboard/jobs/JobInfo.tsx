import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from '@/components/ui/sheet';
import Mock from '@/assets/dashboard/jobs/mock.png';

import ReactMarkdown from 'react-markdown';
import SalaryBadge from './SalaryBadge';
import MatchingBadge from './MatchingBadge';
import { Button } from '@/components/ui/button';
import type { Job } from '@/features/dashboard/jobs/MyJobs';

type JobDetailSheetProps = {
  open: boolean;
  onClose: () => void;
  job: Job | null;
};

export default function JobDetailSheet({
  open,
  onClose,
  job,
}: JobDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="overflow-y-scroll" style={{ maxWidth: '50vw' }}>
        <SheetHeader>
          <SheetDescription className="m-6 whitespace-pre-line  text-black leading-relaxed text-sm md:text-base">
            <div className="flex items-center sm:flex-row flex-col gap-6">
              <img
                className="size-30 rounded-sm object-cover flex-shrink-0"
                alt={` logo`}
                src={Mock}
                loading="lazy"
              />

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-normal text-2xl">{job?.title}</h3>
                  <p className="text-md text-secondary">
                    Company: {job?.company}
                  </p>
                  <p className="text-md text-muted-foreground">
                    Location: {job?.location}
                  </p>
                </div>

                <div className="flex mt-2 items-center gap-2 ">
                  <SalaryBadge salary="20-30$" />
                  <MatchingBadge
                    match={String(
                      Math.round((job?.lance_db_distance || 0) * 100)
                    )}
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={() => window.open(job?.job_url, '_blank')}
              className="my-8 px-6 py-5 text-md"
            >
              Apply Now
            </Button>
            <p className="font-medium text-2xl mb-4">Full Job Description</p>
            <div className="text-lg space-y-2 mb-5">
              <p>Job Type: {job?.job_type} </p>
            </div>

            <ReactMarkdown>{job?.description}</ReactMarkdown>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

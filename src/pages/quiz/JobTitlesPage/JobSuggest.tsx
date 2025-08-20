// JobRanker.tsx
import { useState } from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import { AnimatePresence, motion } from 'framer-motion';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import { getJobTitles } from '@/api/jobTitleService';
import useAnswersStore from '@/stores/useAnswersStore';
import { Loader2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { startVacancyScraping } from '@/api/matchingService';

function DraggablePill({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: 1,
      }}
      className="  border-primary border-2 rounded-xl px-4 py-2 text-md cursor-grab select-none"
    >
      {id}
    </div>
  );
}

function DroppableSlot({
  id,
  job,
}: {
  id: string;
  job: UniqueIdentifier | null;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center justify-center h-12 border-2 border-dashed rounded-xl min-w-[8rem] px-2 transition-colors ${
        isOver ? 'border-primary bg-primary/10' : 'border-gray-300'
      }`}
    >
      {job || <span className="text-gray-400">Job #{id}</span>}
    </div>
  );
}

export default function JobTitlesPage() {
  const navigate = useNavigate();
  const { answers } = useAnswersStore();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      startVacancyScraping({
        queries: [
          {
            title: String(slots['1']),
            location: 'UK',
            weight: 0.6,
          },
          {
            title: String(slots['2']),
            location: 'UK',
            weight: 0.3,
          },
          {
            title: String(slots['3']),
            location: 'UK',
            weight: 0.1,
          },
        ],
        resume_id: localStorage.getItem('resume_id') || 'none',
      }),
    onSuccess: (data) => {
      navigate('/my-jobs', { state: { id: data.user_request_id } });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: jobTitles, isLoading } = useQuery<
    { job_titles: string[] },
    Error,
    string[]
  >({
    queryKey: ['jobTitles', answers],
    queryFn: () => getJobTitles(answers),
    enabled: !!answers,
    staleTime: Infinity,
    select: (res) => res.job_titles,
  });

  const [slots, setSlots] = useState<{
    [key: string]: UniqueIdentifier | null;
  }>({
    '1': null,
    '2': null,
    '3': null,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && over.id in slots) {
      setSlots((prev) => ({
        ...prev,
        [over.id]: active.id,
      }));
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col justify-center h-screen items-center gap-8"
      >
        <span className="text-gray-500 text-xl text-center">
          Finding your dream jobs 🚀
        </span>
        <Loader2 className="text-primary font-bold mr-5 ml-5 size-12 animate-spin" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="p-4 flex flex-col items-center gap-6 mt-4"
    >
      <DndContext onDragEnd={handleDragEnd}>
        <h1 className="text-3xl font-semibold">
          Select your top 3 job choices
        </h1>
        <span className="text-xl font-medium text-gray-500">
          Drag and drop here
        </span>

        {/* Droppable slots */}
        <div className="flex flex-col sm:flex-row gap-4">
          {Object.entries(slots).map(([slotId, job]) => (
            <DroppableSlot key={slotId} id={slotId} job={job} />
          ))}
        </div>

        {/* Draggable pills */}
        <AnimatePresence>
          <div className="p-4 flex flex-wrap gap-2 max-w-lg justify-center">
            {jobTitles?.map(
              (job: string) =>
                !Object.values(slots).includes(job) && (
                  <motion.div
                    key={job}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DraggablePill id={job} />
                  </motion.div>
                )
            )}
          </div>
        </AnimatePresence>
      </DndContext>
      <Link className="text-primary underline" to="custom">
        Couldn't find a job that fits you?
      </Link>
      <Button onClick={() => mutate()} className="px-16 py-5">
        {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Continue'}
      </Button>
    </motion.div>
  );
}

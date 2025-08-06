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

const jobs = [
  'Designer',
  'Developer',
  'Product Manager',
  'Data Analyst',
  'UX Researcher',
];

function DraggablePill({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
      }}
      className="border-primary border-2 rounded-xl px-4 py-2 text-md cursor-grab select-none"
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

export default function JobRanker() {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="p-4 flex flex-col items-center gap-6 mt-4"
    >
      <DndContext onDragEnd={handleDragEnd}>
        <h1 className="text-3xl font-semibold">
          Pick top 3 jobs that fit you best
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
            {jobs.map(
              (job) =>
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
      <Button className="px-16 py-5">Continue</Button>
    </motion.div>
  );
}

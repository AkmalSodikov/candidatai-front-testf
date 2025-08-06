import { useState } from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import ChoiceOption from './ChoiceOption';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

interface QuizCardProps {
  question: string;
  options: { value: string; label: string }[];
  onNext: () => void;
  onSkip: () => void;
  onSelect: (value: string) => void;
  selected: string;
  isLast: boolean;
}

export default function QuizCard({
  selected: selectedParent,
  question,
  options,
  onNext,
  onSkip,
  onSelect,
  isLast,
}: QuizCardProps) {
  const [selected, setSelected] = useState<string>(selectedParent || '');
  const navigate = useNavigate();

  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.15 }}
      className="w-full max-w-xl space-y-6"
    >
      <h1 className="font-semibold text-3xl">{question}</h1>

      <RadioGroup
        value={selected}
        onValueChange={(value) => {
          setSelected(value);
          onSelect(value);
        }}
        className="flex flex-col gap-y-4"
      >
        {options.map((opt) => (
          <ChoiceOption
            key={opt.value}
            id={opt.value}
            value={opt.value}
            label={opt.label}
            selected={selected === opt.value}
            onSelect={(value) => {
              setSelected(value);
              onSelect(value);
            }}
          />
        ))}
      </RadioGroup>
      <div className="flex items-center justify-end gap-x-3">
        {isLast ? (
          <Button onClick={() => navigate('/rank-jobs')} className="p-5 px-16">
            Finish
          </Button>
        ) : (
          <div className="flex gap-x-4">
            <Button className="p-5 px-6" variant="outline" onClick={onSkip}>
              Skip
            </Button>
            <Button className="p-5 px-6 flex-1" onClick={onNext}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ChoiceOption from './ChoiceOption';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Slider } from '@/components/ui/slider';

interface QuizCardProps {
  question: string;
  options?: { value: string; icon?: string; label?: string }[];
  onNext: () => void;
  onSkip: () => void;
  onSelect: (value: string) => void;
  selected: string;
  isLast: boolean;
  questionType: string;
}

export default function QuizCard({
  selected: selectedParent,
  question,
  options,
  onNext,
  onSkip,
  onSelect,
  isLast,
  questionType,
}: QuizCardProps) {
  const [selected, setSelected] = useState<string>(selectedParent || '');
  const navigate = useNavigate();

  const handleSelection = (value: string) => {
    setSelected(value);
    onSelect(value);
  };

  const renderQuestionInput = () => {
    switch (questionType) {
      case 'select':
        return (
          <Select value={selected} onValueChange={handleSelection}>
            <SelectTrigger className="capitalize w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((opt) => (
                <SelectItem
                  className="capitalize"
                  key={opt.value}
                  value={opt.value}
                >
                  {opt?.icon} {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'slider':
        return (
          <div className="flex flex-col w-full px-1">
            <span className="text-secondary mb-1">Minutes to the office</span>
            <Slider
              value={[Number(selected) || 15]}
              max={120}
              min={15}
              step={1}
              onValueChange={([value]) => {
                handleSelection(`${value}`);
              }}
              className="relative my-8"
            >
              <div
                className="absolute left-[calc(var(--value,50)*1%)] -translate-x-1/2 -top-6 text-sm font-medium"
                style={{
                  left: `${Number(selected) || 50}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {selected || 50} km
              </div>
            </Slider>
          </div>
        );

      case 'regular':
      default:
        return (
          <RadioGroup
            value={selected}
            onValueChange={handleSelection}
            className="flex flex-col gap-y-4"
          >
            {options?.map((opt) => (
              <ChoiceOption
                key={opt.value}
                id={opt.value}
                value={opt.value}
                label={opt?.label || ''}
                selected={selected === opt.value}
                onSelect={handleSelection}
              />
            ))}
          </RadioGroup>
        );
    }
  };

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

      {renderQuestionInput()}

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

import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ChoiceOptionProps {
  id: string;
  value: string;
  label: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

export default function ChoiceOption({
  id,
  value,
  label,
  selected,
  onSelect,
}: ChoiceOptionProps) {
  return (
    <div
      className={cn(
        'border-2 rounded-md flex items-center p-4 cursor-pointer transition-colors',
        selected ? 'border-primary ' : 'hover:border-primary/40'
      )}
      onClick={() => onSelect(value)}
    >
      <RadioGroupItem value={value} id={id} checked={selected} />
      <Label htmlFor={id} className="font-medium text-lg ml-4">
        {label}
      </Label>
    </div>
  );
}

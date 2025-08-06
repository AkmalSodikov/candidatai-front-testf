import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import QuizCard from '@/features/quiz/QuizCard';
import { AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: "What's your strength in group projects?",
    options: [
      { label: '🎨 Creative', value: 'creative' },
      { label: '📊 Organized', value: 'organizing' },
      { label: '🤝 Harmony', value: 'harmony' },
      { label: '🔍 Research', value: 'research' },
    ],
  },
  {
    question: 'When do you feel most energized?',
    options: [
      { label: '🌅 Morning', value: 'morning' },
      { label: '🌞 Midday', value: 'midday' },
      { label: '🌙 Evening', value: 'evening' },
      { label: '🔄 Flexible', value: 'flexible' },
    ],
  },
  {
    question: 'How do you prefer to learn new things?',
    options: [
      { label: '📘 Reading', value: 'reading' },
      { label: '🎥 Watching', value: 'videos' },
      { label: '🧪 Doing', value: 'hands-on' },
      { label: '🗣️ Talking', value: 'discussion' },
    ],
  },
  {
    question: 'What motivates you the most?',
    options: [
      { label: '🏆 Winning', value: 'achievement' },
      { label: '👥 Team', value: 'team' },
      { label: '📈 Growth', value: 'growth' },
      { label: '💡 Ideas', value: 'ideas' },
    ],
  },
  {
    question: 'What drives your decision-making?',
    options: [
      { label: '🧠 Logic', value: 'logic' },
      { label: '💖 Feelings', value: 'feelings' },
      { label: '📊 Data', value: 'data' },
      { label: '🌟 Intuition', value: 'intuition' },
    ],
  },
];

export default function QuizPage() {
  const total = questions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(total).fill(''));
  const [finishText, setFinishText] = useState<string>('');

  const isLast = currentIndex === total - 1;

  const handleSelect = (value: string) => {
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);
  };

  const next = () => {
    if (currentIndex < total - 1) {
      if (currentIndex === 0) {
        setFinishText('💪 Keep going!');
      } else if (currentIndex === 1) {
        setFinishText('✨ You are halfway there!');
      } else if (currentIndex === 2) {
        setFinishText('🚀 Almost there!');
      }
      setCurrentIndex((i) => i + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setFinishText('');
    }
  };

  const skip = () => {
    next();
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {/* Progress Bar at the Top */}
      <div className="w-full max-w-xl flex flex-col justify-center mt-4">
        <div className="flex items-center justify-between mb-4">
          <ArrowLeft
            className={`size-6 transition-colors cursor-pointer hover:text-primary ${
              currentIndex === 0 ? 'invisible' : ''
            }`}
            onClick={prev}
          />
          <h1 className="text-xl">{finishText}</h1>
          <span className="self-end text-lg">
            {currentIndex + 1}
            <span className="text-muted-foreground">/{total}</span>
          </span>
        </div>

        <Progress value={((currentIndex + 1) / total) * 100} />
      </div>

      {/* Quiz Content */}
      <div className="flex flex-1 justify-center mt-8 w-full max-w-xl">
        <AnimatePresence mode="wait">
          <QuizCard
            onSelect={handleSelect}
            selected={answers[currentIndex]}
            key={currentIndex}
            question={questions[currentIndex].question}
            options={questions[currentIndex].options}
            onNext={next}
            onSkip={skip}
            isLast={isLast}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

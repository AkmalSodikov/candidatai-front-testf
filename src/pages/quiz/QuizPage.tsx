import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import QuizCard from '@/features/quiz/QuizCard';
import { AnimatePresence } from 'framer-motion';

const questions = [
  {
    type: 'select',
    question: 'Select your country',
    options: [
      { value: 'argentina', icon: '🇦🇷' },
      { value: 'australia', icon: '🇦🇺' },
      { value: 'austria', icon: '🇦🇹' },
      { value: 'bahrain', icon: '🇧🇭' },
      { value: 'bangladesh', icon: '🇧🇩' },
      { value: 'belgium', icon: '🇧🇪' },
      { value: 'bulgaria', icon: '🇧🇬' },
      { value: 'brazil', icon: '🇧🇷' },
      { value: 'canada', icon: '🇨🇦' },
      { value: 'chile', icon: '🇨🇱' },
      { value: 'china', icon: '🇨🇳' },
      { value: 'colombia', icon: '🇨🇴' },
      { value: 'costa rica', icon: '🇨🇷' },
      { value: 'croatia', icon: '🇭🇷' },
      { value: 'cyprus', icon: '🇨🇾' },
      { value: 'czech republic', icon: '🇨🇿' },
      { value: 'denmark', icon: '🇩🇰' },
      { value: 'ecuador', icon: '🇪🇨' },
      { value: 'egypt', icon: '🇪🇬' },
      { value: 'estonia', icon: '🇪🇪' },
      { value: 'finland', icon: '🇫🇮' },
      { value: 'france', icon: '🇫🇷' },
      { value: 'germany', icon: '🇩🇪' },
      { value: 'greece', icon: '🇬🇷' },
      { value: 'hong kong', icon: '🇭🇰' },
      { value: 'hungary', icon: '🇭🇺' },
      { value: 'india', icon: '🇮🇳' },
      { value: 'indonesia', icon: '🇮🇩' },
      { value: 'ireland', icon: '🇮🇪' },
      { value: 'israel', icon: '🇮🇱' },
      { value: 'italy', icon: '🇮🇹' },
      { value: 'japan', icon: '🇯🇵' },
      { value: 'kuwait', icon: '🇰🇼' },
      { value: 'latvia', icon: '🇱🇻' },
      { value: 'lithuania', icon: '🇱🇹' },
      { value: 'luxembourg', icon: '🇱🇺' },
      { value: 'malaysia', icon: '🇲🇾' },
      { value: 'malta', icon: '🇲🇹' },
      { value: 'mexico', icon: '🇲🇽' },
      { value: 'morocco', icon: '🇲🇦' },
      { value: 'netherlands', icon: '🇳🇱' },
      { value: 'new zealand', icon: '🇳🇿' },
      { value: 'nigeria', icon: '🇳🇬' },
      { value: 'norway', icon: '🇳🇴' },
      { value: 'oman', icon: '🇴🇲' },
      { value: 'pakistan', icon: '🇵🇰' },
      { value: 'panama', icon: '🇵🇦' },
      { value: 'peru', icon: '🇵🇪' },
      { value: 'philippines', icon: '🇵🇭' },
      { value: 'poland', icon: '🇵🇱' },
      { value: 'portugal', icon: '🇵🇹' },
      { value: 'qatar', icon: '🇶🇦' },
      { value: 'romania', icon: '🇷🇴' },
      { value: 'saudi arabia', icon: '🇸🇦' },
      { value: 'singapore', icon: '🇸🇬' },
      { value: 'slovakia', icon: '🇸🇰' },
      { value: 'slovenia', icon: '🇸🇮' },
      { value: 'south africa', icon: '🇿🇦' },
      { value: 'south korea', icon: '🇰🇷' },
      { value: 'spain', icon: '🇪🇸' },
      { value: 'sweden', icon: '🇸🇪' },
      { value: 'switzerland', icon: '🇨🇭' },
      { value: 'taiwan', icon: '🇹🇼' },
      { value: 'thailand', icon: '🇹🇭' },
      { value: 'turkey', icon: '🇹🇷' },
      { value: 'ukraine', icon: '🇺🇦' },
      { value: 'united arab emirates', icon: '🇦🇪' },
      { value: 'uk', icon: '🇬🇧' },
      { value: 'usa', icon: '🇺🇸' },
      { value: 'uruguay', icon: '🇺🇾' },
      { value: 'venezuela', icon: '🇻🇪' },
      { value: 'vietnam', icon: '🇻🇳' },
    ],
  },
  {
    type: 'slider',
    question: "What's your preferred search radius in kilometers?",
  },
  {
    type: 'select',
    question: 'Select the preffered job type',
    options: [
      { value: 'fulltime', label: 'Full Time' },
      { value: 'parttime', label: 'Part Time' },
      { value: 'contract', label: 'Contract' },
      { value: 'temporary', label: 'Temporary' },
      { value: 'internship', label: 'Internship' },
    ],
  },
  {
    type: 'regular',
    question: 'Would you like to work remotely?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    type: 'regular',
    question: "What's your strength in group projects?",
    options: [
      { label: '🎨 Creative', value: 'creative' },
      { label: '📊 Organized', value: 'organizing' },
      { label: '🤝 Harmony', value: 'harmony' },
      { label: '🔍 Research', value: 'research' },
    ],
  },
  {
    type: 'regular',
    question: 'When do you feel most energized?',
    options: [
      { label: '🌅 Morning', value: 'morning' },
      { label: '🌞 Midday', value: 'midday' },
      { label: '🌙 Evening', value: 'evening' },
      { label: '🔄 Flexible', value: 'flexible' },
    ],
  },
  {
    type: 'regular',
    question: 'How do you prefer to learn new things?',
    options: [
      { label: '📘 Reading', value: 'reading' },
      { label: '🎥 Watching', value: 'videos' },
      { label: '🧪 Doing', value: 'hands-on' },
      { label: '🗣️ Talking', value: 'discussion' },
    ],
  },
  {
    type: 'regular',
    question: 'What motivates you the most?',
    options: [
      { label: '🏆 Winning', value: 'achievement' },
      { label: '👥 Team', value: 'team' },
      { label: '📈 Growth', value: 'growth' },
      { label: '💡 Ideas', value: 'ideas' },
    ],
  },
  {
    type: 'regular',
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

  if (isLast) {
    console.log(answers);
  }

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
            options={questions[currentIndex]?.options}
            questionType={questions[currentIndex].type}
            onNext={next}
            onSkip={skip}
            isLast={isLast}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

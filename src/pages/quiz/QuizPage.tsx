import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import QuizCard from '@/features/quiz/QuizCard';
import { AnimatePresence } from 'framer-motion';
import useAnswersStore from '@/stores/useAnswersStore';

const questions = [
  {
    type: 'select',
    question: 'Select your location',
    options: [
      { value: 'argentina', icon: '🇦🇷', label: 'Argentina' },
      { value: 'australia', icon: '🇦🇺', label: 'Australia' },
      { value: 'austria', icon: '🇦🇹', label: 'Austria' },
      { value: 'bahrain', icon: '🇧🇭', label: 'Bahrain' },
      { value: 'bangladesh', icon: '🇧🇩', label: 'Bangladesh' },
      { value: 'belgium', icon: '🇧🇪', label: 'Belgium' },
      { value: 'bulgaria', icon: '🇧🇬', label: 'Bulgaria' },
      { value: 'brazil', icon: '🇧🇷', label: 'Brazil' },
      { value: 'canada', icon: '🇨🇦', label: 'Canada' },
      { value: 'chile', icon: '🇨🇱', label: 'Chile' },
      { value: 'china', icon: '🇨🇳', label: 'China' },
      { value: 'colombia', icon: '🇨🇴', label: 'Colombia' },
      { value: 'costa rica', icon: '🇨🇷', label: 'Costa Rica' },
      { value: 'croatia', icon: '🇭🇷', label: 'Croatia' },
      { value: 'cyprus', icon: '🇨🇾', label: 'Cyprus' },
      { value: 'czech republic', icon: '🇨🇿', label: 'Czech Republic' },
      { value: 'denmark', icon: '🇩🇰', label: 'Denmark' },
      { value: 'ecuador', icon: '🇪🇨', label: 'Ecuador' },
      { value: 'egypt', icon: '🇪🇬', label: 'Egypt' },
      { value: 'estonia', icon: '🇪🇪', label: 'Estonia' },
      { value: 'finland', icon: '🇫🇮', label: 'Finland' },
      { value: 'france', icon: '🇫🇷', label: 'France' },
      { value: 'germany', icon: '🇩🇪', label: 'Germany' },
      { value: 'greece', icon: '🇬🇷', label: 'Greece' },
      { value: 'hong kong', icon: '🇭🇰', label: 'Hong Kong' },
      { value: 'hungary', icon: '🇭🇺', label: 'Hungary' },
      { value: 'india', icon: '🇮🇳', label: 'India' },
      { value: 'indonesia', icon: '🇮🇩', label: 'Indonesia' },
      { value: 'ireland', icon: '🇮🇪', label: 'Ireland' },
      { value: 'israel', icon: '🇮🇱', label: 'Israel' },
      { value: 'italy', icon: '🇮🇹', label: 'Italy' },
      { value: 'japan', icon: '🇯🇵', label: 'Japan' },
      { value: 'kuwait', icon: '🇰🇼', label: 'Kuwait' },
      { value: 'latvia', icon: '🇱🇻', label: 'Latvia' },
      { value: 'lithuania', icon: '🇱🇹', label: 'Lithuania' },
      { value: 'luxembourg', icon: '🇱🇺', label: 'Luxembourg' },
      { value: 'malaysia', icon: '🇲🇾', label: 'Malaysia' },
      { value: 'malta', icon: '🇲🇹', label: 'Malta' },
      { value: 'mexico', icon: '🇲🇽', label: 'Mexico' },
      { value: 'morocco', icon: '🇲🇦', label: 'Morocco' },
      { value: 'netherlands', icon: '🇳🇱', label: 'Netherlands' },
      { value: 'new zealand', icon: '🇳🇿', label: 'New Zealand' },
      { value: 'nigeria', icon: '🇳🇬', label: 'Nigeria' },
      { value: 'norway', icon: '🇳🇴', label: 'Norway' },
      { value: 'oman', icon: '🇴🇲', label: 'Oman' },
      { value: 'pakistan', icon: '🇵🇰', label: 'Pakistan' },
      { value: 'panama', icon: '🇵🇦', label: 'Panama' },
      { value: 'peru', icon: '🇵🇪', label: 'Peru' },
      { value: 'philippines', icon: '🇵🇭', label: 'Philippines' },
      { value: 'poland', icon: '🇵🇱', label: 'Poland' },
      { value: 'portugal', icon: '🇵🇹', label: 'Portugal' },
      { value: 'qatar', icon: '🇶🇦', label: 'Qatar' },
      { value: 'romania', icon: '🇷🇴', label: 'Romania' },
      { value: 'saudi arabia', icon: '🇸🇦', label: 'Saudi Arabia' },
      { value: 'singapore', icon: '🇸🇬', label: 'Singapore' },
      { value: 'slovakia', icon: '🇸🇰', label: 'Slovakia' },
      { value: 'slovenia', icon: '🇸🇮', label: 'Slovenia' },
      { value: 'south africa', icon: '🇿🇦', label: 'South Africa' },
      { value: 'south korea', icon: '🇰🇷', label: 'South Korea' },
      { value: 'spain', icon: '🇪🇸', label: 'Spain' },
      { value: 'sweden', icon: '🇸🇪', label: 'Sweden' },
      { value: 'switzerland', icon: '🇨🇭', label: 'Switzerland' },
      { value: 'taiwan', icon: '🇹🇼', label: 'Taiwan' },
      { value: 'thailand', icon: '🇹🇭', label: 'Thailand' },
      { value: 'turkey', icon: '🇹🇷', label: 'Turkey' },
      { value: 'ukraine', icon: '🇺🇦', label: 'Ukraine' },
      {
        value: 'united arab emirates',
        icon: '🇦🇪',
        label: 'United Arab Emirates',
      },
      { value: 'London, UK', icon: '🇬🇧', label: 'London, UK' },
      { value: 'usa', icon: '🇺🇸', label: 'USA' },
      { value: 'uruguay', icon: '🇺🇾', label: 'Uruguay' },
      { value: 'venezuela', icon: '🇻🇪', label: 'Venezuela' },
      { value: 'vietnam', icon: '🇻🇳', label: 'Vietnam' },
    ],
  },
  {
    type: 'slider',
    question: 'How far are you happy to travel for work?',
  },
  {
    type: 'select',
    question: "What's your preferred job type?",
    options: [
      { value: 'fulltime', label: 'Full-time' },
      { value: 'parttime', label: 'Part-time' },
      { value: 'contract', label: 'Temporary / Contract' },
      { value: 'internship', label: 'Internship / Graduate scheme' },
      { value: 'freelance', label: 'Freelance / Self-employed' },
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
  const { answers, addAnswer } = useAnswersStore();
  const [finishText, setFinishText] = useState<string>('');

  const isLast = currentIndex === total - 1;

  if (isLast) {
    console.log(answers);
  }

  const handleSelect = (value: string) => {
    addAnswer(questions[currentIndex].question, value);
  };

  const next = () => {
    if (currentIndex < total - 1) {
      if (currentIndex === 0) {
        setFinishText('💪 Keep going!');
      } else if (currentIndex === Math.ceil(total / 2) - 3) {
        setFinishText('✨ You are halfway there!');
      } else if (currentIndex === total - 4) {
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
            selected={answers[currentIndex]?.answer}
            key={currentIndex}
            question={questions[currentIndex]?.question}
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

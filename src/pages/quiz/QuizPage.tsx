import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import QuizCard from '@/features/quiz/QuizCard';
import { AnimatePresence } from 'framer-motion';
import useAnswersStore from '@/stores/useAnswersStore';

const questions = [
  {
    type: 'select',
    question: 'Where do you prefer to work?',
    options: [
      { value: 'london', label: 'London' },
      { value: 'manchester', label: 'Manchester' },
      { value: 'birmingham', label: 'Birmingham' },
      { value: 'liverpool', label: 'Liverpool' },
      { value: 'leeds', label: 'Leeds' },
      { value: 'newcastle', label: 'Newcastle upon Tyne' },
      { value: 'sheffield', label: 'Sheffield' },
      { value: 'nottingham', label: 'Nottingham' },
      { value: 'bristol', label: 'Bristol' },
      { value: 'cardiff', label: 'Cardiff' },
      { value: 'edinburgh', label: 'Edinburgh' },
      { value: 'glasgow', label: 'Glasgow' },
      { value: 'aberdeen', label: 'Aberdeen' },
      { value: 'dundee', label: 'Dundee' },
      { value: 'inverness', label: 'Inverness' },
      { value: 'belfast', label: 'Belfast' },
      { value: 'derry', label: 'Derry / Londonderry' },
      { value: 'cambridge', label: 'Cambridge' },
      { value: 'oxford', label: 'Oxford' },
      { value: 'bath', label: 'Bath' },
      { value: 'brighton', label: 'Brighton' },
      { value: 'portsmouth', label: 'Portsmouth' },
      { value: 'southampton', label: 'Southampton' },
      { value: 'york', label: 'York' },
      { value: 'canterbury', label: 'Canterbury' },
      { value: 'exeter', label: 'Exeter' },
      { value: 'swansea', label: 'Swansea' },
      { value: 'stirling', label: 'Stirling' },
      { value: 'lake_district', label: 'Lake District' },
      { value: 'stonehenge', label: 'Stonehenge' },
      { value: 'isle_of_skye', label: 'Isle of Skye' },
      { value: 'cornwall', label: 'Cornwall' },
      { value: 'peak_district', label: 'Peak District' },
      { value: 'snowdonia', label: 'Snowdonia' },
      { value: 'isle_of_wight', label: 'Isle of Wight' },
      { value: 'stratford', label: 'Stratford-upon-Avon' },
      { value: 'durham', label: 'Durham' },
      { value: 'chester', label: 'Chester' },
    ],
  },
  {
    type: 'slider',
    question: 'How far* are you happy to travel for work?',
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
    type: 'select',
    question: 'Which industry do you prefer to work in?',
    options: [
      { value: 'tech_it', label: 'Technology / IT' },
      { value: 'finance', label: 'Finance / Banking / Insurance' },
      { value: 'marketing', label: 'Marketing / Advertising / Media' },
      { value: 'retail', label: 'Retail / E-commerce' },
      { value: 'healthcare', label: 'Healthcare / Life Sciences' },
      { value: 'education', label: 'Education / Training' },
      { value: 'engineering', label: 'Engineering / Manufacturing' },
      { value: 'hospitality', label: 'Hospitality / Tourism' },
      { value: 'government', label: 'Government / Non-profit' },
      { value: 'other', label: 'Other' },
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
  const [finishStar, setFinishStar] = useState<string>('');

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
        setFinishStar('⭐');
      } else if (currentIndex === Math.ceil(total / 2) - 3) {
        setFinishText('✨ You are halfway there!');
      } else if (currentIndex === total - 4) {
        setFinishText('🚀 Almost there!');
        setFinishStar('🌟');
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
          <span className="self-end text-xl">
            {finishStar} {currentIndex + 1}
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

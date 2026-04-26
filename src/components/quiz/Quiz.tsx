import { useState, useMemo } from 'react';
import type { Quiz, QuizQuestion, AnswerState } from './types';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion as QuizQuestionComponent } from './QuizQuestion';
import { QuizResult } from './QuizResult';

interface QuizProps {
  quiz: Quiz;
  onComplete?: (score: number, total: number) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase();
}

function checkAnswer(
  userAnswer: string | string[],
  correctAnswer: string | string[],
  type: QuizQuestion['type']
): boolean {
  if (type === 'single') {
    return normalizeAnswer(userAnswer as string) === normalizeAnswer(correctAnswer as string);
  }
  if (type === 'multiple') {
    const userArr = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
    const correctArr = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
    return (
      userArr.length === correctArr.length &&
      userArr.every((a) => correctArr.some((c) => normalizeAnswer(a) === normalizeAnswer(c)))
    );
  }
  return normalizeAnswer(userAnswer as string) === normalizeAnswer(correctAnswer as string);
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const processedQuestions = useMemo(() => {
    let questions = [...quiz.questions];

    if (quiz.shuffleQuestions) {
      questions = shuffleArray(questions);
    }

    if (quiz.shuffleOptions) {
      questions = questions.map((q) => ({
        ...q,
        options: q.options ? shuffleArray(q.options) : q.options,
      }));
    }

    return questions;
  }, [quiz.questions, quiz.shuffleQuestions, quiz.shuffleOptions]);

  const currentQuestion = processedQuestions[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);

  const handleAnswer = (answer: string | string[]) => {
    const isCorrect = checkAnswer(answer, currentQuestion.correctAnswer, currentQuestion.type);
    const points = isCorrect ? (currentQuestion.points ?? 1) : 0;

    const newAnswer: AnswerState = {
      questionId: currentQuestion.id,
      answer,
      isCorrect,
      points,
    };

    const existingIndex = answers.findIndex((a) => a.questionId === currentQuestion.id);
    const newAnswers =
      existingIndex >= 0
        ? [...answers.slice(0, existingIndex), newAnswer, ...answers.slice(existingIndex + 1)]
        : [...answers, newAnswer];

    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < processedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setIsComplete(false);
  };

  const handleFinish = () => {
    setIsComplete(true);
    const totalPoints = processedQuestions.reduce((sum, q) => sum + (q.points ?? 1), 0);
    const earnedPoints = answers.reduce((sum, a) => sum + a.points, 0);
    onComplete?.(earnedPoints, totalPoints);
  };

  if (isComplete) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <QuizResult
          questions={processedQuestions}
          answers={answers}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const isCurrentAnswered = !!currentAnswer;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>

      <QuizProgress current={currentIndex} total={processedQuestions.length} />

      <QuizQuestionComponent
        question={currentQuestion}
        onAnswer={handleAnswer}
        isAnswered={isCurrentAnswered}
        submittedAnswer={currentAnswer?.answer}
        correctAnswer={currentQuestion.correctAnswer}
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          กลับ
        </button>

        {isCurrentAnswered &&
          (currentIndex < processedQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ข้อถัดไป
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              ดูผลลัพธ์
            </button>
          ))}
      </div>
    </div>
  );
}
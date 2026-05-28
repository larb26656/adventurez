import { useState, useMemo } from "react";
import type { Quiz, QuizQuestion, AnswerState } from "./types";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion as QuizQuestionComponent } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { Button } from "@/components/ui/Button";

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
  type: QuizQuestion["type"],
): boolean {
  if (type === "single") {
    return (
      normalizeAnswer(userAnswer as string) ===
      normalizeAnswer(correctAnswer as string)
    );
  }
  if (type === "multiple") {
    const userArr = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
    const correctArr = Array.isArray(correctAnswer)
      ? correctAnswer
      : [correctAnswer];
    return (
      userArr.length === correctArr.length &&
      userArr.every((a) =>
        correctArr.some((c) => normalizeAnswer(a) === normalizeAnswer(c)),
      )
    );
  }
  return (
    normalizeAnswer(userAnswer as string) ===
    normalizeAnswer(correctAnswer as string)
  );
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState<string | string[] | null>(
    null,
  );

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
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion.id,
  );

  const getCanSubmit = () => {
    if (!pendingAnswer) return false;
    if (currentQuestion.type === "text") {
      return (pendingAnswer as string).trim().length > 0;
    }
    if (currentQuestion.type === "multiple") {
      return (pendingAnswer as string[]).length > 0;
    }
    return !!pendingAnswer;
  };

  const handleAnswer = (answer: string | string[]) => {
    const isCorrect = checkAnswer(
      answer,
      currentQuestion.correctAnswer,
      currentQuestion.type,
    );
    const points = isCorrect ? (currentQuestion.points ?? 1) : 0;

    const newAnswer: AnswerState = {
      questionId: currentQuestion.id,
      answer,
      isCorrect,
      points,
    };

    const existingIndex = answers.findIndex(
      (a) => a.questionId === currentQuestion.id,
    );
    const newAnswers =
      existingIndex >= 0
        ? [
            ...answers.slice(0, existingIndex),
            newAnswer,
            ...answers.slice(existingIndex + 1),
          ]
        : [...answers, newAnswer];

    setAnswers(newAnswers);
    setPendingAnswer(null);
  };

  const handleSubmit = () => {
    if (pendingAnswer) {
      handleAnswer(pendingAnswer);
    }
  };

  const handleNext = () => {
    setPendingAnswer(null);
    if (currentIndex < processedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    setPendingAnswer(null);
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
    const totalPoints = processedQuestions.reduce(
      (sum, q) => sum + (q.points ?? 1),
      0,
    );
    const earnedPoints = answers.reduce((sum, a) => sum + a.points, 0);
    onComplete?.(earnedPoints, totalPoints);
  };

  if (isComplete) {
    return (
      <div className="p-4 rounded-lg border bg-inherit border-gray-500 text-border-gray-100">
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
    <div className="p-4 rounded-lg border bg-inherit border-gray-500 text-border-gray-100 not-content">
      <h2 className="text-lg font-semibold mb-4">{quiz.title}</h2>

      <QuizProgress current={currentIndex} total={processedQuestions.length} />

      <QuizQuestionComponent
        question={currentQuestion}
        onAnswer={handleAnswer}
        onPendingAnswer={(answer) => setPendingAnswer(answer)}
        onSubmit={handleSubmit}
        isAnswered={isCurrentAnswered}
        submittedAnswer={currentAnswer?.answer}
        correctAnswer={currentQuestion.correctAnswer}
        pendingAnswer={pendingAnswer || undefined}
      />

      <div className="flex justify-between mt-4">
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={currentIndex === 0}
          size="sm"
        >
          กลับ
        </Button>

        {!isCurrentAnswered && (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!getCanSubmit()}
            size="sm"
          >
            ส่งคำตอบ
          </Button>
        )}

        {isCurrentAnswered &&
          (currentIndex < processedQuestions.length - 1 ? (
            <Button variant="primary" onClick={handleNext} size="sm">
              ข้อถัดไป
            </Button>
          ) : (
            <Button variant="primary" onClick={handleFinish} size="sm">
              ดูผลลัพธ์
            </Button>
          ))}
      </div>
    </div>
  );
}

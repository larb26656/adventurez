import { Button } from "../ui";
import type { AnswerState, QuizQuestion } from "./types";

interface QuizResultProps {
  questions: QuizQuestion[];
  answers: AnswerState[];
  onRetry: () => void;
}

export function QuizResult({ questions, answers, onRetry }: QuizResultProps) {
  const totalPoints = questions.reduce((sum, q) => sum + (q.points ?? 1), 0);
  const earnedPoints = answers.reduce((sum, a) => sum + a.points, 0);
  const percentage = Math.round((earnedPoints / totalPoints) * 100);

  const getGrade = () => {
    if (percentage >= 80)
      return { text: "ดีเยี่ยม!", color: "text-[--sl-color-accent-high]" };
    if (percentage >= 60)
      return { text: "ดี", color: "text-[--sl-color-accent]" };
    if (percentage >= 40)
      return { text: "พอใช้", color: "text-[--sl-color-gray-3]" };
    return { text: "ควรทบทวน", color: "text-red-500" };
  };

  const grade = getGrade();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-lg font-semibold mb-4 text-border-gray-100">
        ผลการทดสอบ
      </h3>

      <div className="mb-4">
        <div className="text-3xl font-bold mb-1 text-border-gray-100">
          {percentage}%
        </div>
        <div className={`text-base font-medium ${grade.color}`}>
          {grade.text}
        </div>
        <p className="text-sm text-[--sl-color-gray-3]">
          ได้คะแนน {earnedPoints} / {totalPoints} คะแนน
        </p>
      </div>

      <div className="text-left space-y-2 mb-4">
        <h4 className="font-medium text-sm text-border-gray-100">สรุปคำตอบ:</h4>
        {questions.map((q, idx) => {
          const answer = answers.find((a) => a.questionId === q.id);
          return (
            <div
              key={q.id}
              className={`p-2 rounded-lg border ${
                answer?.isCorrect
                  ? "bg-green-500/10 border-green-500"
                  : "bg-red-500/10 border-red-500"
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={
                    answer?.isCorrect ? "text-green-500" : "text-red-500"
                  }
                >
                  {answer?.isCorrect ? "✓" : "✗"}
                </span>
                <div>
                  <p className="text-sm text-border-gray-100">{q.question}</p>
                  <p className="text-xs text-border-gray-100">
                    คำตอบ:{" "}
                    {Array.isArray(answer?.answer)
                      ? answer.answer.join(", ")
                      : answer?.answer}
                  </p>
                  {!answer?.isCorrect && (
                    <p className="text-xs text-border-gray-100">
                      เฉลย:{" "}
                      {Array.isArray(q.correctAnswer)
                        ? q.correctAnswer.join(", ")
                        : q.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button onClick={onRetry} variant="primary" size="sm">
        ทำอีกครั้ง
      </Button>
    </div>
  );
}

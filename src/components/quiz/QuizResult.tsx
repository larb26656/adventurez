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

  const grade =
    percentage >= 80
      ? { text: "ดีเยี่ยม!", tone: "quiz-grade--great" }
      : percentage >= 60
        ? { text: "ดี", tone: "quiz-grade--good" }
        : percentage >= 40
          ? { text: "พอใช้", tone: "quiz-grade--ok" }
          : { text: "ควรทบทวน", tone: "quiz-grade--review" };

  return (
    <div className="quiz-result">
      <h3 className="quiz-result-title">ผลการทดสอบ</h3>

      <div>
        <div className="quiz-result-percent">{percentage}%</div>
        <div className={`quiz-grade ${grade.tone}`}>{grade.text}</div>
        <p className="quiz-result-score">
          ได้คะแนน {earnedPoints} / {totalPoints} คะแนน
        </p>
      </div>

      <div className="quiz-summary">
        <h4 className="quiz-summary-title">สรุปคำตอบ:</h4>
        <div className="quiz-summary-list">
          {questions.map((q) => {
            const answer = answers.find((a) => a.questionId === q.id);
            const tone = answer?.isCorrect ? "is-correct" : "is-incorrect";
            return (
              <div key={q.id} className={`quiz-summary-item ${tone}`}>
                <div className="quiz-summary-row">
                  <span className="quiz-summary-mark">
                    {answer?.isCorrect ? "✓" : "✗"}
                  </span>
                  <div>
                    <p className="quiz-summary-question">{q.question}</p>
                    <p className="quiz-summary-answer">
                      คำตอบ:{" "}
                      {Array.isArray(answer?.answer)
                        ? answer.answer.join(", ")
                        : answer?.answer}
                    </p>
                    {!answer?.isCorrect && (
                      <p className="quiz-summary-answer">
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
      </div>

      <Button onClick={onRetry} variant="primary" size="sm">
        ทำอีกครั้ง
      </Button>
    </div>
  );
}

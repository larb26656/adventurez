interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="quiz-progress">
      <div className="quiz-progress-meta">
        <span>
          ข้อ {current + 1} / {total}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="quiz-progress-track">
        <div
          className="quiz-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

import type { AnswerState, QuizQuestion } from './types';

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
    if (percentage >= 80) return { text: 'ดีเยี่ยม!', color: 'text-green-600' };
    if (percentage >= 60) return { text: 'ดี', color: 'text-blue-600' };
    if (percentage >= 40) return { text: 'พอใช้', color: 'text-yellow-600' };
    return { text: 'ควรทบทวน', color: 'text-red-600' };
  };

  const grade = getGrade();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-lg font-semibold mb-4">ผลการทดสอบ</h3>

      <div className="mb-4">
        <div className="text-3xl font-bold mb-1">{percentage}%</div>
        <div className={`text-base font-medium ${grade.color}`}>{grade.text}</div>
        <p className="text-gray-600 text-sm">
          ได้คะแนน {earnedPoints} / {totalPoints} คะแนน
        </p>
      </div>

      <div className="text-left space-y-2 mb-4">
        <h4 className="font-medium text-sm">สรุปคำตอบ:</h4>
        {questions.map((q, idx) => {
          const answer = answers.find((a) => a.questionId === q.id);
          return (
            <div
              key={q.id}
              className={`p-2 border rounded-lg ${
                answer?.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className={answer?.isCorrect ? 'text-green-600' : 'text-red-600'}>
                  {answer?.isCorrect ? '✓' : '✗'}
                </span>
                <div>
                  <p className="text-sm">{q.question}</p>
                  <p className="text-xs text-gray-600">
                    คำตอบ: {Array.isArray(answer?.answer) ? answer.answer.join(', ') : answer?.answer}
                  </p>
                  {!answer?.isCorrect && (
                    <p className="text-xs text-gray-600">
                      เฉลย: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRetry}
        className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        ทำอีกครั้ง
      </button>
    </div>
  );
}
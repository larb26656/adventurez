interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[--sl-color-gray-3]">
          ข้อ {current + 1} / {total}
        </span>
        <span className="text-sm text-[--sl-color-gray-3]">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden bg-[--sl-color-gray-5]">
        <div
          className="h-full transition-all duration-300 ease-out bg-[--sl-color-accent-high]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
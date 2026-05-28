import { useState, useEffect, useMemo } from "react";
import type { QuizQuestion } from "./types";

interface QuizQuestionProps {
  question: QuizQuestion;
  onAnswer: (answer: string | string[]) => void;
  onPendingAnswer: (answer: string | string[]) => void;
  onSubmit: () => void;
  isAnswered: boolean;
  submittedAnswer?: string | string[];
  correctAnswer: string | string[];
  pendingAnswer?: string | string[];
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase();
}

function isCorrectAnswer(
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

export function QuizQuestion({
  question,
  onAnswer,
  onPendingAnswer,
  onSubmit,
  isAnswered,
  submittedAnswer,
  correctAnswer,
}: QuizQuestionProps) {
  const [textValue, setTextValue] = useState("");
  const [singleValue, setSingleValue] = useState<string>("");
  const [multipleValues, setMultipleValues] = useState<string[]>([]);

  const points = question.points ?? 1;
  const isCorrect =
    isAnswered &&
    isCorrectAnswer(submittedAnswer || "", correctAnswer, question.type);

  useEffect(() => {
    setTextValue("");
    setSingleValue("");
    setMultipleValues([]);
  }, [question.id]);

  const handleSingleChange = (value: string) => {
    if (!isAnswered) {
      setSingleValue(value);
      onPendingAnswer(value);
    }
  };

  const handleMultipleChange = (value: string) => {
    if (!isAnswered) {
      const newValues = multipleValues.includes(value)
        ? multipleValues.filter((v) => v !== value)
        : [...multipleValues, value];
      setMultipleValues(newValues);
      onPendingAnswer(newValues);
    }
  };

  const handleTextChange = (value: string) => {
    if (!isAnswered) {
      setTextValue(value);
      onPendingAnswer(value);
    }
  };

  const getCurrentValue = (): string | string[] => {
    switch (question.type) {
      case "single":
        return singleValue;
      case "multiple":
        return multipleValues;
      case "text":
        return textValue;
    }
  };

  const canSubmit = useMemo(() => {
    switch (question.type) {
      case "single":
        return !!singleValue;
      case "multiple":
        return multipleValues.length > 0;
      case "text":
        return textValue.trim().length > 0;
    }
  }, [question.type, singleValue, multipleValues, textValue]);

  const handleSubmit = () => {
    onSubmit();
  };

  const renderOptions = () => {
    const options = question.options || [];

    if (question.type === "single") {
      return (
        <div className="space-y-2">
          {options.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center p-3 rounded-lg gap-3 cursor-pointer transition-colors border ${
                isAnswered
                  ? option === correctAnswer
                    ? "bg-green-500/10 border-green-500"
                    : singleValue === option
                      ? "bg-red-500/10 border-red-500"
                      : "bg-transparent border-gray-500"
                  : singleValue === option
                    ? "bg-blue-950 border-blue-400"
                    : "bg-transparent border-gray-500 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={singleValue === option}
                onChange={() => handleSingleChange(option)}
                disabled={isAnswered}
                className="w-4 h-4"
                style={{ accentColor: "var(--sl-color-accent-high)" }}
              />
              <span className="ml-3 text-gray-100">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    if (question.type === "multiple") {
      return (
        <div className="space-y-2">
          {options.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center p-3 rounded-lg gap-3 cursor-pointer transition-colors border ${
                isAnswered
                  ? Array.isArray(correctAnswer) &&
                    correctAnswer.includes(option)
                    ? "bg-green-500/10 border-green-500"
                    : multipleValues.includes(option)
                      ? "bg-red-500/10 border-red-500"
                      : "bg-transparent border-gray-500"
                  : multipleValues.includes(option)
                    ? "bg-blue-950 border-blue-400"
                    : "bg-transparent border-gray-500 hover:border-gray-400"
              }`}
            >
              <input
                type="checkbox"
                value={option}
                checked={multipleValues.includes(option)}
                onChange={() => handleMultipleChange(option)}
                disabled={isAnswered}
                className="w-4 h-4 rounded"
                style={{ accentColor: "var(--sl-color-accent-high)" }}
              />
              <span className="ml-3 text-gray-100">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderInput = () => {
    if (question.type === "text") {
      return (
        <div className="space-y-2">
          <input
            type="text"
            value={textValue}
            onChange={(e) => handleTextChange(e.target.value)}
            disabled={isAnswered}
            placeholder="พิมพ์คำตอบของคุณ..."
            className={`w-full p-3 rounded-lg border bg-neutral-950 text-gray-100 ${
              isAnswered
                ? isCorrect
                  ? "bg-green-500/10 border-green-500"
                  : "bg-red-500/10 border-red-500"
                : "border-gray-500"
            }`}
          />
        </div>
      );
    }

    return renderOptions();
  };

  const renderFeedback = () => {
    if (!isAnswered) return null;

    const correctText = Array.isArray(correctAnswer)
      ? correctAnswer.join(", ")
      : correctAnswer;

    return (
      <div
        className={`mt-4 p-4 rounded-lg border ${
          isCorrect
            ? "bg-green-500/10 border-green-500"
            : "bg-red-500/10 border-red-500"
        }`}
      >
        <p
          className={`font-medium ${
            isCorrect ? "text-green-500" : "text-red-500"
          }`}
        >
          {isCorrect ? "✓ ถูกต้อง!" : "✗ ไม่ถูกต้อง"}
        </p>
        <p className="mt-1">เฉลย: {correctText}</p>
        <p className="mt-1 text-sm">
          ได้คะแนน: {isCorrect ? points : 0} / {points}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-base font-medium mb-3 text-gray-100">
        {question.question}
      </h3>

      {question.type === "multiple" && (
        <p className="text-xs mb-2 text-gray-400">(เลือกได้หลายข้อ)</p>
      )}

      {renderInput()}
      {renderFeedback()}
    </div>
  );
}

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

  const selectedSingle = isAnswered
    ? typeof submittedAnswer === "string"
      ? submittedAnswer
      : ""
    : singleValue;
  const selectedMultiple = isAnswered
    ? Array.isArray(submittedAnswer)
      ? submittedAnswer
      : submittedAnswer
        ? [submittedAnswer]
        : []
    : multipleValues;

  const optionClass = (option: string, selected: boolean) => {
    if (!isAnswered) return selected ? "quiz-option is-selected" : "quiz-option";
    if (question.type === "multiple") {
      const correct = Array.isArray(correctAnswer) && correctAnswer.includes(option);
      if (correct) return "quiz-option is-correct";
      if (selected) return "quiz-option is-incorrect";
      return "quiz-option";
    }
    if (option === correctAnswer) return "quiz-option is-correct";
    if (selected) return "quiz-option is-incorrect";
    return "quiz-option";
  };

  const renderOptions = () => {
    const options = question.options || [];

    if (question.type === "single") {
      return (
        <div className={`quiz-options${isAnswered ? " is-locked" : ""}`}>
          {options.map((option, idx) => (
            <label key={idx} className={optionClass(option, selectedSingle === option)}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedSingle === option}
                onChange={() => handleSingleChange(option)}
                disabled={isAnswered}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );
    }

    if (question.type === "multiple") {
      return (
        <div className={`quiz-options${isAnswered ? " is-locked" : ""}`}>
          {options.map((option, idx) => (
            <label
              key={idx}
              className={optionClass(option, selectedMultiple.includes(option))}
            >
              <input
                type="checkbox"
                value={option}
                checked={selectedMultiple.includes(option)}
                onChange={() => handleMultipleChange(option)}
                disabled={isAnswered}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderInput = () => {
    if (question.type === "text") {
      const textAnswer =
        isAnswered && typeof submittedAnswer === "string" ? submittedAnswer : textValue;
      return (
        <input
          type="text"
          value={textAnswer}
          onChange={(e) => handleTextChange(e.target.value)}
          disabled={isAnswered}
          placeholder="พิมพ์คำตอบของคุณ..."
          className={`quiz-input${
            isAnswered ? (isCorrect ? " is-correct" : " is-incorrect") : ""
          }`}
        />
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
      <div className={`quiz-feedback${isCorrect ? " is-correct" : " is-incorrect"}`}>
        <p className="quiz-feedback-status">
          {isCorrect ? "✓ ถูกต้อง!" : "✗ ไม่ถูกต้อง"}
        </p>
        <p>เฉลย: {correctText}</p>
        <p className="quiz-feedback-points">
          ได้คะแนน: {isCorrect ? points : 0} / {points}
        </p>
      </div>
    );
  };

  return (
    <div className="quiz-body">
      <h3 className="quiz-question">{question.question}</h3>

      {question.type === "multiple" && (
        <p className="quiz-hint">(เลือกได้หลายข้อ)</p>
      )}

      {renderInput()}
      {renderFeedback()}
    </div>
  );
}

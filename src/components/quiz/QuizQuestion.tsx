import { useState, useEffect } from 'react';
import type { QuizQuestion } from './types';

interface QuizQuestionProps {
  question: QuizQuestion;
  onAnswer: (answer: string | string[]) => void;
  isAnswered: boolean;
  submittedAnswer?: string | string[];
  correctAnswer: string | string[];
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase();
}

function isCorrectAnswer(
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

export function QuizQuestion({
  question,
  onAnswer,
  isAnswered,
  submittedAnswer,
  correctAnswer,
}: QuizQuestionProps) {
  const [textValue, setTextValue] = useState('');
  const [singleValue, setSingleValue] = useState<string>('');
  const [multipleValues, setMultipleValues] = useState<string[]>([]);

  const points = question.points ?? 1;
  const isCorrect = isAnswered && isCorrectAnswer(submittedAnswer || '', correctAnswer, question.type);

  useEffect(() => {
    setTextValue('');
    setSingleValue('');
    setMultipleValues([]);
  }, [question.id]);

  const handleSingleChange = (value: string) => {
    if (!isAnswered) {
      setSingleValue(value);
    }
  };

  const handleMultipleChange = (value: string) => {
    if (!isAnswered) {
      setMultipleValues((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      onAnswer(textValue);
    }
  };

  const handleSingleSubmit = () => {
    if (singleValue) {
      onAnswer(singleValue);
    }
  };

  const handleMultipleSubmit = () => {
    if (multipleValues.length > 0) {
      onAnswer(multipleValues);
    }
  };

  const getSubmitHandler = () => {
    switch (question.type) {
      case 'single':
        return handleSingleSubmit;
      case 'multiple':
        return handleMultipleSubmit;
      case 'text':
        return handleTextSubmit;
    }
  };

  const canSubmit = () => {
    switch (question.type) {
      case 'single':
        return !!singleValue;
      case 'multiple':
        return multipleValues.length > 0;
      case 'text':
        return textValue.trim().length > 0;
    }
  };

  const renderOptions = () => {
    const options = question.options || [];

    if (question.type === 'single') {
      return (
        <div className="space-y-2">
          {options.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                isAnswered
                  ? option === correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : singleValue === option
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                  : singleValue === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={singleValue === option}
                onChange={() => handleSingleChange(option)}
                disabled={isAnswered}
                className="w-4 h-4 text-blue-500"
              />
              <span className="ml-3">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    if (question.type === 'multiple') {
      return (
        <div className="space-y-2">
          {options.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                isAnswered
                  ? Array.isArray(correctAnswer) && correctAnswer.includes(option)
                    ? 'border-green-500 bg-green-50'
                    : multipleValues.includes(option)
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                  : multipleValues.includes(option)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                value={option}
                checked={multipleValues.includes(option)}
                onChange={() => handleMultipleChange(option)}
                disabled={isAnswered}
                className="w-4 h-4 text-blue-500 rounded"
              />
              <span className="ml-3">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderInput = () => {
    if (question.type === 'text') {
      return (
        <div className="space-y-2">
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            disabled={isAnswered}
            placeholder="พิมพ์คำตอบของคุณ..."
            className={`w-full p-3 border rounded-lg ${
              isAnswered
                ? isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-blue-500'
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
      ? correctAnswer.join(', ')
      : correctAnswer;

    return (
      <div
        className={`mt-4 p-4 rounded-lg ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}
      >
        <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {isCorrect ? '✓ ถูกต้อง!' : '✗ ไม่ถูกต้อง'}
        </p>
        <p className="mt-1 text-gray-600">
          เฉลย: {correctText}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          ได้คะแนน: {isCorrect ? points : 0} / {points}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      
      {question.type === 'multiple' && (
        <p className="text-sm text-gray-500 mb-3">(เลือกได้หลายข้อ)</p>
      )}
      
      {renderInput()}
      {renderFeedback()}

      {!isAnswered && (
        <button
          onClick={getSubmitHandler()}
          disabled={!canSubmit()}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ส่งคำตอบ
        </button>
      )}
    </div>
  );
}
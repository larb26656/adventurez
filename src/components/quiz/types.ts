export type QuestionType = 'single' | 'multiple' | 'text';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points?: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
}

export interface AnswerState {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  points: number;
}
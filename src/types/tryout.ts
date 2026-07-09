export type TryoutCategory = "akpol" | "tni" | "kedinasan" | "cpns";

export type TryoutStatus = "available" | "in_progress" | "completed";

export interface TryoutExam {
  id: string;
  title: string;
  category: TryoutCategory;
  categoryLabel: string;
  duration: string;
  questions: number;
  status: TryoutStatus;
  description: string;
}

export interface QuestionOption {
  key: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  category: string;
  constraints?: string[];
  options: QuestionOption[];
  correctAnswer: string;
}

export type AnswerMap = Record<number, string>;
export type FlagMap = Record<number, boolean>;

export interface TryoutResult {
  tryoutId: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  unanswered: number;
  score: number;
  answers: AnswerMap;
  flagged: FlagMap;
  timestamp: string;
}

export interface SubjectBreakdown {
  key: "twk" | "tiu" | "tkp";
  title: string;
  subtitle: string;
  maxScore: number;
  score: number;
  correct: number;
  wrong: number;
  empty: number;
  accentClass: string;
}

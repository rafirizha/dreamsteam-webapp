import type { AnswerMap, FlagMap, Question, SubjectBreakdown, TryoutResult } from "@/types/tryout";

const RESULT_KEY_PREFIX = "tryout_result_";

export function getTryoutResultKey(tryoutId: string) {
  return `${RESULT_KEY_PREFIX}${tryoutId}`;
}

export function parseTryoutResult(value: string | null): TryoutResult | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as TryoutResult;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function readTryoutResult(tryoutId: string): TryoutResult | null {
  return parseTryoutResult(localStorage.getItem(getTryoutResultKey(tryoutId)));
}

export function readAllTryoutResults(): TryoutResult[] {
  const results: TryoutResult[] = [];

  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (!key?.startsWith(RESULT_KEY_PREFIX)) continue;

    const result = parseTryoutResult(localStorage.getItem(key));
    if (result) results.push(result);
  }

  return results;
}

export function saveTryoutResult(result: TryoutResult) {
  localStorage.setItem(getTryoutResultKey(result.tryoutId), JSON.stringify(result));
}

export function calculateTryoutResult(params: {
  tryoutId: string;
  questions: Question[];
  answers: AnswerMap;
  flagged: FlagMap;
}): TryoutResult {
  const { tryoutId, questions, answers, flagged } = params;
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const userAnswer = answers[question.id];
    if (!userAnswer) {
      unanswered++;
    } else if (userAnswer === question.correctAnswer) {
      correct++;
    } else {
      wrong++;
    }
  });

  return {
    tryoutId,
    totalQuestions: questions.length,
    correct,
    wrong,
    unanswered,
    score: Math.round((correct / questions.length) * 100),
    answers,
    flagged,
    timestamp: new Date().toISOString(),
  };
}

export function getSubjectBreakdown(result: TryoutResult | null): SubjectBreakdown[] {
  const twkCorrect = result ? Math.min(result.correct, 2) : 24;
  const twkWrong = result ? (result.correct >= 2 ? 0 : 1) : 4;
  const twkEmpty = result ? (result.correct === 0 ? 3 : 1) : 2;

  const tiuCorrect = result ? Math.max(0, result.correct - 2) : 29;
  const tiuWrong = result ? (result.wrong > 1 ? 1 : 0) : 5;
  const tiuEmpty = result ? 0 : 1;

  const tkpCorrect = result ? Math.min(result.correct, 3) : 31;
  const tkpWrong = result ? 0 : 4;
  const tkpEmpty = 0;

  return [
    createBreakdown("twk", "TWK", "Tes Wawasan Kebangsaan", 150, twkCorrect, twkWrong, twkEmpty, "bg-primary"),
    createBreakdown("tiu", "TIU", "Tes Intelegensia Umum", 175, tiuCorrect, tiuWrong, tiuEmpty, "bg-secondary"),
    createBreakdown("tkp", "TKP", "Tes Karakteristik Pribadi", 175, tkpCorrect, tkpWrong, tkpEmpty, "bg-tertiary-container"),
  ];
}

function createBreakdown(
  key: SubjectBreakdown["key"],
  title: string,
  subtitle: string,
  maxScore: number,
  correct: number,
  wrong: number,
  empty: number,
  accentClass: string,
): SubjectBreakdown {
  const total = correct + wrong + empty || 1;

  return {
    key,
    title,
    subtitle,
    maxScore,
    score: Math.round((correct / total) * maxScore) || 0,
    correct,
    wrong,
    empty,
    accentClass,
  };
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tryoutQuestions } from "@/data/tryouts";
import { calculateTryoutResult, saveTryoutResult } from "@/lib/tryout-results";
import type { AnswerMap, FlagMap } from "@/types/tryout";

export default function TryoutClient({ id }: { id: string }) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerMap>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlagMap>({});
  const [timeLeft, setTimeLeft] = useState(7200); // 120 minutes in seconds

  const currentQuestion = tryoutQuestions[currentIdx];

  const handleFinish = useCallback(() => {
    const result = calculateTryoutResult({
      tryoutId: id,
      answers: selectedAnswers,
      flagged: flaggedQuestions,
      questions: tryoutQuestions,
    });

    saveTryoutResult(result);
    router.push(`/tryout/${id}/hasil`);
  }, [flaggedQuestions, id, router, selectedAnswers]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [handleFinish, timeLeft]);

  // Format time (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionKey,
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleNext = () => {
    if (currentIdx < tryoutQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-surface-cream font-body-md text-on-surface antialiased flex flex-col min-h-screen">
      {/* Top Bar (Transactional / Distraction Free) */}
      <header className="bg-white border-b border-outline-variant sticky top-0 z-50 h-20 flex items-center shadow-sm">
        <div className="max-w-max-width mx-auto w-full px-margin-mobile md:px-margin-desktop flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-headline-md text-headline-md font-bold text-primary">Dreams Team</span>
            <span className="h-6 w-px bg-outline-variant hidden md:block"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant hidden md:block uppercase tracking-wider">
              Tryout Simulation - ID {id}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-warning-amber" style={{ fontVariationSettings: "'FILL' 1" }}>
                timer
              </span>
              <span className="font-label-sm text-label-sm font-bold text-on-surface" id="countdown">
                {formatTime(timeLeft)}
              </span>
            </div>
            <button
              onClick={handleFinish}
              className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-2 rounded-lg hover:bg-primary-container transition-colors duration-200 shadow-sm cursor-pointer"
            >
              Finish Exam
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-grow max-w-max-width mx-auto w-full px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row gap-8">
        {/* Question Canvas */}
        <div className="flex-grow md:w-2/3 lg:w-3/4 flex flex-col gap-6">
          {/* Question Header */}
          <div className="flex justify-between items-end border-b border-outline-variant pb-4">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
                Question {currentIdx + 1} of {tryoutQuestions.length}
              </span>
              <h2 className="font-headline-md text-headline-md font-bold text-xl text-on-surface">
                {currentQuestion.category}
              </h2>
            </div>
            <button
              onClick={toggleFlag}
              className="flex items-center gap-2 text-secondary hover:text-on-secondary-container transition-colors group cursor-pointer"
            >
              <span
                className={`material-symbols-outlined transition-colors ${
                  flaggedQuestions[currentQuestion.id] ? "text-warning-amber fill-current" : "text-outline"
                }`}
                style={{ fontVariationSettings: flaggedQuestions[currentQuestion.id] ? "'FILL' 1" : "'FILL' 0" }}
              >
                flag
              </span>
              <span className="font-label-sm text-label-sm">
                {flaggedQuestions[currentQuestion.id] ? "Flagged" : "Flag for review"}
              </span>
            </button>
          </div>

          {/* Question Content */}
          <div className="bg-white p-8 rounded-xl border border-outline-variant shadow-sm text-body-lg text-on-surface space-y-6">
            <p className="leading-relaxed">{currentQuestion.text}</p>
            {currentQuestion.constraints && (
              <div className="bg-surface-container-low p-6 rounded-lg font-label-sm text-label-sm text-on-surface-variant border border-outline-variant">
                <p className="mb-2 font-bold">Constraints / Details:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {currentQuestion.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedAnswers[currentQuestion.id] === opt.key;
              return (
                <label
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-2 border-secondary bg-secondary-fixed/20 shadow-[0_4px_12px_rgba(0,97,164,0.1)]"
                      : "border-outline-variant bg-white hover:shadow-[0_4px_6px_-1px_rgba(128,0,0,0.08)]"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_${currentQuestion.id}`}
                    checked={isSelected}
                    onChange={() => {}}
                    className={`mt-1 h-5 w-5 focus:ring-secondary ${
                      isSelected ? "text-secondary border-secondary" : "text-primary border-outline-variant"
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className={`font-label-sm text-label-sm font-bold mb-1 ${isSelected ? "text-secondary" : "text-on-surface-variant"}`}>
                      {opt.key}
                    </span>
                    <span className={`text-body-md text-on-surface ${isSelected ? "font-medium" : ""}`}>
                      {opt.text}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Navigation Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-outline-variant">
            <button
              onClick={handlePrevious}
              disabled={currentIdx === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border font-label-sm text-label-sm transition-colors cursor-pointer ${
                currentIdx === 0
                  ? "border-outline-variant text-outline-variant cursor-not-allowed"
                  : "border-secondary text-secondary hover:bg-secondary-fixed/30"
              }`}
            >
              <span className="material-symbols-outlined">chevron_left</span>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIdx === tryoutQuestions.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-label-sm text-label-sm shadow-md transition-colors cursor-pointer ${
                currentIdx === tryoutQuestions.length - 1
                  ? "bg-outline-variant text-on-surface-variant cursor-not-allowed"
                  : "bg-secondary text-on-secondary hover:bg-on-secondary-container"
              }`}
            >
              Next
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <aside className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm sticky top-28">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-4 border-b border-outline-variant pb-2">
              Question Grid
            </h3>
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="font-label-sm text-[10px] text-on-surface">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-outline-variant bg-surface-cream"></div>
                <span className="font-label-sm text-[10px] text-on-surface">Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning-amber"></div>
                <span className="font-label-sm text-[10px] text-on-surface">Flagged</span>
              </div>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-[400px] overflow-y-auto pr-2">
              {tryoutQuestions.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = !!selectedAnswers[q.id];
                const isFlagged = !!flaggedQuestions[q.id];

                let statusClass = "bg-surface-cream border-outline-variant text-on-surface-variant hover:border-primary";
                if (isCurrent) {
                  statusClass = "bg-primary border-primary text-on-primary ring-2 ring-primary-container ring-offset-2";
                } else if (isFlagged) {
                  statusClass = "bg-warning-amber border-warning-amber text-white";
                } else if (isAnswered) {
                  statusClass = "bg-secondary border-secondary text-on-secondary";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-full aspect-square flex items-center justify-center rounded border font-label-sm text-label-sm transition-colors cursor-pointer ${statusClass}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

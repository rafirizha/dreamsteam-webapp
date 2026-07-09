"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { getSubjectBreakdown, readTryoutResult } from "@/lib/tryout-results";
import type { SubjectBreakdown, TryoutResult } from "@/types/tryout";

function SubjectBreakdownCard({ subject }: { subject: SubjectBreakdown }) {
  const progress = Math.round((subject.score / subject.maxScore) * 100);

  return (
    <div className="bg-white border border-outline-variant rounded-lg p-6 flex flex-col relative overflow-hidden group hover:shadow-[0_8px_24px_rgba(87,0,0,0.06)] transition-shadow">
      <div className={`absolute top-0 left-0 w-full h-[4px] ${subject.accentClass}`}></div>
      <div className="flex justify-between items-start mb-6 mt-2">
        <div>
          <h3 className="font-headline-md text-headline-md font-bold text-xl text-on-surface">{subject.title}</h3>
          <p className="font-label-sm text-label-sm text-on-surface-variant">{subject.subtitle}</p>
        </div>
        <span className="font-headline-md text-headline-md font-semibold text-primary">
          {subject.score}
          <span className="text-body-md text-on-surface-variant font-normal">/{subject.maxScore}</span>
        </span>
      </div>
      <div className="w-full bg-surface-variant h-2 rounded-full mb-6 overflow-hidden">
        <div className="bg-secondary h-full rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="grid grid-cols-3 gap-2 border-t border-outline-variant pt-4 mt-auto">
        <div className="text-center">
          <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase text-[10px]">Correct</span>
          <span className="font-body-md text-body-md font-semibold text-success-emerald">{subject.correct}</span>
        </div>
        <div className="text-center border-l border-outline-variant">
          <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase text-[10px]">Wrong</span>
          <span className="font-body-md text-body-md font-semibold text-error">{subject.wrong}</span>
        </div>
        <div className="text-center border-l border-outline-variant">
          <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase text-[10px]">Empty</span>
          <span className="font-body-md text-body-md font-semibold text-warning-amber">{subject.empty}</span>
        </div>
      </div>
    </div>
  );
}

export default function HasilClient({ id }: { id: string }) {
  const [result] = useState<TryoutResult | null>(() => {
    if (typeof window === "undefined") return null;
    return readTryoutResult(id);
  });

  // Default values from Figma design if no actual result is stored
  const totalScore = result ? Math.round((result.correct / result.totalQuestions) * 500) : 420;
  const isTopPercent = totalScore >= 400;

  const subjectBreakdown = getSubjectBreakdown(result);

  return (
    <DashboardLayout activeTab="results" title="Tryout Results">
      <div className="dashboard-page-shell">
        {/* Hero Section: Score & Achievement */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Typography & Actions */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest bg-secondary-fixed px-3 py-1 rounded-full mb-4 inline-block">
                  Grand Tryout Nasional #{id}
                </span>
                <h1 className="font-display-xl text-[40px] md:text-[64px] leading-tight font-extrabold text-on-surface mb-2">
                  {totalScore >= 350 ? "Outstanding Work!" : "Keep Practicing!"}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  You&apos;ve completed the tryout. Here is your comprehensive performance summary. Analyze your strengths and identify areas for improvement before the real exam.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href={`/tryout/${id}/pengerjaan`}>
                  <button className="bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_8px_24px_rgba(87,0,0,0.15)] transition-all uppercase tracking-wide cursor-pointer w-full sm:w-auto">
                    <span className="material-symbols-outlined">assignment_turned_in</span>
                    Review Discussion
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="border border-secondary text-secondary bg-transparent font-label-sm text-label-sm px-8 py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary/5 transition-all uppercase tracking-wide cursor-pointer w-full sm:w-auto">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: High-Impact Score Display */}
            <div className="lg:col-span-5 flex justify-center relative mt-4 lg:mt-0">
              {/* Decorative Background Image */}
              <div
                className="absolute inset-0 z-0 rounded-full bg-secondary/10 blur-3xl"
              ></div>

              {/* Score Circle */}
              <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-white border-8 border-surface-variant flex flex-col items-center justify-center shadow-lg">
                <div
                  className="absolute inset-0 rounded-full border-8 border-secondary"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                ></div>
                <div className="absolute inset-0 rounded-full bg-white m-2 flex flex-col items-center justify-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
                    Total Score
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display-xl text-primary font-extrabold text-5xl md:text-6xl">{totalScore}</span>
                    <span className="font-headline-md text-headline-md text-on-surface-variant text-xl">/500</span>
                  </div>
                  <span className={`font-label-sm text-label-sm mt-2 px-3 py-1 rounded-full flex items-center gap-1 ${
                    isTopPercent ? "bg-success-emerald/10 text-success-emerald" : "bg-warning-amber/10 text-warning-amber"
                  }`}>
                    <span className="material-symbols-outlined text-[16px] symbol-fill">
                      trending_up
                    </span>
                    {isTopPercent ? "Top 5%" : "Passed passing grade"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breakdown Section */}
        <section className="border-t border-outline-variant pt-6">
          <div>
            <div className="mb-6">
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-2">Subject Breakdown</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Detailed performance metrics across all tested competencies.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {subjectBreakdown.map((subject) => (
                <SubjectBreakdownCard key={subject.key} subject={subject} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

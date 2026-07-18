"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { readAllTryoutResults } from "@/lib/tryout-results";

interface DashboardStats {
  averageScore: number;
  examsCompleted: number;
  skdCount: number;
  tpaCount: number;
}

function getInitialDashboardState() {
  const fallbackStats: DashboardStats = {
    averageScore: 85,
    examsCompleted: 12,
    skdCount: 8,
    tpaCount: 4,
  };

  if (typeof window === "undefined") {
    return { stats: fallbackStats, hasTakenTryout: false, latestTryoutId: "1" };
  }

  const results = readAllTryoutResults();
  const count = results.length;
  if (count === 0) {
    return { stats: fallbackStats, hasTakenTryout: false, latestTryoutId: "1" };
  }

  const totalScore = results.reduce((total, item) => total + item.score, 0);
  const averageLocal = Math.round(totalScore / count);

  return {
    stats: {
      averageScore: Math.round((85 * 12 + averageLocal * count) / (12 + count)),
      examsCompleted: 12 + count,
      skdCount: 8 + count,
      tpaCount: 4,
    },
    hasTakenTryout: true,
    latestTryoutId: results[count - 1].tryoutId,
  };
}

export default function Dashboard() {
  const [{ stats, hasTakenTryout, latestTryoutId }] = useState(getInitialDashboardState);

  return (
    <DashboardLayout activeTab="dashboard" title="Dashboard">
      <div className="dashboard-page-shell">
          {/* Welcome Header */}
          <section>
            <h1 className="font-display-xl text-3xl md:text-4xl font-bold text-on-surface mb-2">
              Halo, Calon Taruna!
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Welcome back to your preparation journey. Keep pushing forward.
            </p>
          </section>

          {/* Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {/* Average Score Card */}
            <div className="col-span-1 md:col-span-4 bg-white rounded-xl border border-outline-variant p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
                    Overall Average
                  </span>
                  <span className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                    {stats.averageScore}
                    <span className="text-headline-md text-on-surface-variant text-lg">/100</span>
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    trending_up
                  </span>
                </div>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 mt-4">
                <div className="bg-secondary h-2 rounded-full" style={{ width: `${stats.averageScore}%` }}></div>
              </div>
              <p className="font-label-sm text-[10px] text-on-surface-variant mt-3 text-right">Top 15% of cohort</p>
            </div>

            {/* Exams Completed */}
            <div className="col-span-1 md:col-span-4 bg-white rounded-xl border border-outline-variant p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-success-emerald"></div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
                    Exams Completed
                  </span>
                  <span className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">{stats.examsCompleted}</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-success-emerald/10 flex items-center justify-center text-success-emerald">
                  <span className="material-symbols-outlined">task_alt</span>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <span className="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface">
                  {stats.skdCount} SKD
                </span>
                <span className="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface">
                  {stats.tpaCount} TPA
                </span>
              </div>
            </div>

            {/* Next Goal / Motivation */}
            <div className="col-span-1 md:col-span-4 bg-primary text-on-primary rounded-xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-center">
              <div className="relative z-10">
                <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider block mb-2">
                  Next Target
                </span>
                <h3 className="font-headline-md text-xl font-bold mb-2">Simulasi Akbar Nasional</h3>
                <p className="font-body-md text-sm text-primary-fixed opacity-90">In 14 Days. Focus on your weakest subjects.</p>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-primary-container opacity-50 select-none">
                emoji_events
              </span>
            </div>
          </section>

          {/* Main Actions Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Continue & Active Tasks */}
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary">play_circle</span>
                Continue Learning
              </h2>
              {/* Continue Last Tryout Card */}
              <Link href={hasTakenTryout ? `/tryout/${latestTryoutId}/pengerjaan` : "/tryout/1/pengerjaan"} className="block bg-white rounded-xl border border-outline-variant p-5 md:p-6 flex flex-col md:flex-row gap-5 md:gap-6 items-center shadow-sm hover:shadow-[0_10px_25px_rgba(128,0,0,0.08)] transition-all cursor-pointer group">
                <div className="w-full md:w-32 h-32 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center border border-outline-variant relative overflow-hidden bg-surface-cream">
                  <span className="material-symbols-outlined text-5xl text-on-surface-variant group-hover:scale-110 transition-transform">
                    psychology
                  </span>
                  <div className="absolute bottom-0 w-full h-1 bg-secondary"></div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm rounded uppercase tracking-wide">
                      TWK - Sejarah
                    </span>
                    <span className="font-label-sm text-label-sm text-warning-amber flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> 45 mins left
                    </span>
                  </div>
                  <h3 className="font-headline-md text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                    Tryout Mingguan #4: Wawasan Kebangsaan
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <div className="w-1/2">
                      <div className="flex justify-between font-label-sm text-[10px] text-on-surface-variant mb-1">
                        <span>Progress</span>
                        <span>32/50 Questions</span>
                      </div>
                      <div className="w-full bg-surface-variant rounded-full h-1.5">
                        <div className="bg-secondary h-1.5 rounded-full" style={{ width: "64%" }}></div>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary-container transition-colors cursor-pointer">
                      Resume
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column: Schedules */}
            <div className="lg:col-span-4">
              <h2 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-on-surface-variant">calendar_month</span>
                Upcoming Schedules
              </h2>
              <div className="bg-white rounded-xl border border-outline-variant p-2 shadow-sm">
                {/* Schedule Item 1 */}
                <div className="flex gap-4 p-4 hover:bg-surface-container-low rounded-lg transition-colors border-b border-outline-variant last:border-0">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-surface-cream rounded-lg border border-outline-variant flex-shrink-0">
                    <span className="font-label-sm text-[10px] text-error font-bold uppercase">Oct</span>
                    <span className="font-headline-md text-lg font-bold text-on-surface leading-none">12</span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-body-md font-semibold text-on-surface">Tryout SKD Premium 5</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> 08:00 AM - 10:00 AM
                    </p>
                  </div>
                </div>
                {/* Schedule Item 2 */}
                <div className="flex gap-4 p-4 hover:bg-surface-container-low rounded-lg transition-colors border-b border-outline-variant last:border-0">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-surface-cream rounded-lg border border-outline-variant flex-shrink-0">
                    <span className="font-label-sm text-[10px] text-error font-bold uppercase">Oct</span>
                    <span className="font-headline-md text-lg font-bold text-on-surface leading-none">15</span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-body-md font-semibold text-on-surface">Live Class: TWK Strategy</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[14px]">videocam</span> Zoom Link provided
                    </p>
                  </div>
                </div>
                {/* Schedule Item 3 */}
                <div className="flex gap-4 p-4 hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-surface-cream rounded-lg border border-outline-variant flex-shrink-0 opacity-60">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Oct</span>
                    <span className="font-headline-md text-lg font-bold text-on-surface-variant leading-none">20</span>
                  </div>
                  <div className="opacity-85">
                    <h4 className="font-body-md text-body-md font-semibold text-on-surface">Simulasi Kesamaptaan</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> Gelora Bung Karno
                    </p>
                  </div>
                </div>
                <div className="p-3 text-center border-t border-outline-variant mt-2">
                  <Link href="/dashboard/calendar" className="font-label-sm text-label-sm text-secondary font-medium hover:underline">
                    View Full Calendar
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tryoutExams } from "@/data/tryouts";
import type { TryoutCategory, TryoutExam, TryoutStatus } from "@/types/tryout";

const categoryStyles: Record<TryoutCategory, { accent: string; badge: string }> = {
  akpol: { accent: "bg-primary", badge: "bg-primary/10 text-primary" },
  tni: { accent: "bg-success-emerald", badge: "bg-success-emerald/10 text-success-emerald" },
  kedinasan: { accent: "bg-secondary", badge: "bg-secondary/10 text-secondary" },
  cpns: { accent: "bg-tertiary", badge: "bg-tertiary/10 text-tertiary" },
};

function StatusLabel({ status }: { status: TryoutStatus }) {
  if (status === "available") {
    return (
      <div className="flex items-center gap-1 text-success-emerald font-medium">
        <span className="material-symbols-outlined text-[18px]">check_circle</span> Available
      </div>
    );
  }

  if (status === "in_progress") {
    return (
      <div className="flex items-center gap-1 text-warning-amber font-medium">
        <span className="material-symbols-outlined text-[18px]">pending</span> In Progress
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-on-surface-variant font-medium">
      <span className="material-symbols-outlined text-[18px]">done_all</span> Completed
    </div>
  );
}

function ExamActions({ exam }: { exam: TryoutExam }) {
  if (exam.status === "available") {
    return (
      <Link href={`/tryout/${exam.id}/pengerjaan`}>
        <button className="w-full bg-primary text-on-primary font-body-md text-body-md font-medium py-3 rounded-lg hover:bg-primary-container transition-colors shadow-sm cursor-pointer">
          Start Exam
        </button>
      </Link>
    );
  }

  if (exam.status === "in_progress") {
    return (
      <Link href={`/tryout/${exam.id}/pengerjaan`}>
        <button className="w-full border border-secondary text-secondary font-body-md text-body-md font-medium py-3 rounded-lg hover:bg-secondary/5 transition-colors cursor-pointer">
          Resume Exam
        </button>
      </Link>
    );
  }

  return (
    <div className="flex gap-2">
      <Link href={`/tryout/${exam.id}/hasil`} className="w-1/2">
        <button className="w-full border border-outline-variant text-on-surface-variant font-body-md text-body-md font-medium py-3 rounded-lg hover:bg-surface-variant/50 transition-colors cursor-pointer">
          Results
        </button>
      </Link>
      <Link href={`/tryout/${exam.id}/pengerjaan`} className="w-1/2">
        <button className="w-full border border-primary text-primary font-body-md text-body-md font-medium py-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
          Retake
        </button>
      </Link>
    </div>
  );
}

function ExamCard({ exam }: { exam: TryoutExam }) {
  const styles = categoryStyles[exam.category];

  return (
    <div
      className={`bg-white border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0_10px_25px_-5px_rgba(128,0,0,0.08)] transition-shadow duration-300 flex flex-col group relative ${
        exam.status === "completed" ? "opacity-80" : ""
      }`}
    >
      <div className={`h-1 w-full absolute top-0 left-0 ${styles.accent}`}></div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className={`font-label-sm text-label-sm uppercase px-2 py-1 rounded ${styles.badge}`}>
            {exam.categoryLabel}
          </span>
          <span className="flex items-center text-on-surface-variant text-sm gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span> {exam.duration}
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md font-bold text-lg text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {exam.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
          {exam.description}
        </p>
        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm text-on-surface-variant mb-4 pb-4 border-b border-outline-variant/50">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              {exam.questions} Questions
            </div>
            <StatusLabel status={exam.status} />
          </div>
          <ExamActions exam={exam} />
        </div>
      </div>
    </div>
  );
}

export default function ExamCatalog() {
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExams = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();

    return tryoutExams.filter((exam) => {
      const matchesCategory = category === "all" || exam.category === category;
      const matchesStatus = status === "all" || exam.status === status;
      const matchesSearch =
        exam.title.toLowerCase().includes(normalizedQuery) ||
        exam.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [category, status, searchQuery]);

  return (
    <>
      <div className="bg-surface rounded-xl border border-outline-variant p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-end">
          <div className="w-full md:w-1/3">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full appearance-none bg-surface border border-outline-variant text-on-surface rounded-lg py-3 px-4 pr-10 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="akpol">Akpol</option>
                <option value="tni">TNI</option>
                <option value="kedinasan">Sekolah Kedinasan</option>
                <option value="cpns">CPNS</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">
              Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full appearance-none bg-surface border border-outline-variant text-on-surface rounded-lg py-3 px-4 pr-10 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto md:ml-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                type="text"
                placeholder="Search exams..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full md:w-64 bg-surface border border-outline-variant text-on-surface rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
        ) : (
          <div className="col-span-full text-center py-12 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
            <p className="font-body-lg">No tryouts found matching your criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}

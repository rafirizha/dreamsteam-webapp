"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

type EventType = "tryout" | "live" | "offline" | "deadline";

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  type: EventType;
  location: string;
  href?: string;
}

const EVENT_STYLES: Record<
  EventType,
  { label: string; icon: string; dot: string; chipBg: string; chipText: string; iconBg: string; iconText: string }
> = {
  tryout: {
    label: "Tryout",
    icon: "psychology",
    dot: "bg-primary",
    chipBg: "bg-primary-fixed",
    chipText: "text-on-primary-fixed",
    iconBg: "bg-primary/10",
    iconText: "text-primary",
  },
  live: {
    label: "Live Class",
    icon: "videocam",
    dot: "bg-secondary",
    chipBg: "bg-secondary-fixed",
    chipText: "text-on-secondary-fixed",
    iconBg: "bg-secondary/10",
    iconText: "text-secondary",
  },
  offline: {
    label: "On-site",
    icon: "location_on",
    dot: "bg-warning-amber",
    chipBg: "bg-warning-amber/15",
    chipText: "text-on-surface",
    iconBg: "bg-warning-amber/10",
    iconText: "text-warning-amber",
  },
  deadline: {
    label: "Deadline",
    icon: "flag",
    dot: "bg-error",
    chipBg: "bg-error-container",
    chipText: "text-on-error-container",
    iconBg: "bg-error/10",
    iconText: "text-error",
  },
};

// Seeded around July 2026 so the calendar reads as an active schedule.
const EVENTS: CalendarEvent[] = [
  { id: "e1", title: "Tryout SKD Premium 5", date: "2026-07-03", time: "08:00 - 10:00", type: "tryout", location: "Online CAT System", href: "/dashboard/exams" },
  { id: "e2", title: "Live Class: TWK Strategy", date: "2026-07-08", time: "19:30 - 21:00", type: "live", location: "Zoom Link provided" },
  { id: "e3", title: "Mini Tryout: Sejarah TWK", date: "2026-07-11", time: "13:00 - 14:30", type: "tryout", location: "Online CAT System", href: "/dashboard/exams" },
  { id: "e4", title: "Live Class: TIU Deret Angka", date: "2026-07-11", time: "20:00 - 21:30", type: "live", location: "Zoom Link provided" },
  { id: "e5", title: "Batas Daftar Simulasi Akbar", date: "2026-07-14", time: "23:59", type: "deadline", location: "Halaman pendaftaran" },
  { id: "e6", title: "Simulasi Kesamaptaan", date: "2026-07-19", time: "06:00 - 09:00", type: "offline", location: "Gelora Bung Karno, Jakarta" },
  { id: "e7", title: "Tryout CPNS SKD Standard", date: "2026-07-22", time: "09:00 - 10:50", type: "tryout", location: "Online CAT System", href: "/dashboard/exams" },
  { id: "e8", title: "Live Class: TKP Pembahasan", date: "2026-07-24", time: "19:30 - 21:00", type: "live", location: "Zoom Link provided" },
  { id: "e9", title: "Simulasi Akbar Nasional", date: "2026-07-25", time: "08:00 - 11:00", type: "tryout", location: "Online CAT System", href: "/dashboard/exams" },
  { id: "e10", title: "Psikotes TNI AD Preparatory", date: "2026-07-30", time: "13:00 - 15:30", type: "tryout", location: "Online CAT System", href: "/dashboard/exams" },
];

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const TODAY = new Date("2026-07-11");

function toKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatLongDate(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

export default function DashboardCalendarPage() {
  const [viewYear, setViewYear] = useState(TODAY.getFullYear());
  const [viewMonth, setViewMonth] = useState(TODAY.getMonth());
  const [selectedKey, setSelectedKey] = useState(toKey(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()));

  const todayKey = toKey(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of EVENTS) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, []);

  const monthEventCount = useMemo(
    () => EVENTS.filter((e) => e.date.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`)).length,
    [viewYear, viewMonth],
  );

  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    // Monday-first offset (JS: 0=Sun).
    const leadingBlanks = (firstDay.getDay() + 6) % 7;
    const result: Array<{ key: string; day: number } | null> = [];
    for (let i = 0; i < leadingBlanks; i += 1) result.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      result.push({ key: toKey(viewYear, viewMonth, day), day });
    }
    while (result.length % 7 !== 0) result.push(null);
    return result;
  }, [viewYear, viewMonth]);

  const selectedEvents = eventsByDate.get(selectedKey) ?? [];

  const upcomingEvents = useMemo(
    () =>
      [...EVENTS]
        .filter((e) => e.date >= todayKey)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 4),
    [todayKey],
  );

  const goToMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const goToToday = () => {
    setViewYear(TODAY.getFullYear());
    setViewMonth(TODAY.getMonth());
    setSelectedKey(todayKey);
  };

  return (
    <DashboardLayout activeTab="calendar" title="Calendar">
      <div className="dashboard-page-shell">
        {/* Header */}
        <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display-xl text-3xl md:text-4xl font-bold text-on-surface mb-2">Study Calendar</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Track your tryouts, live classes, and important deadlines in one place.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white border border-outline-variant px-4 py-3 shadow-sm">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              event_available
            </span>
            <div>
              <span className="block font-headline-md text-xl font-bold leading-none text-on-surface">{monthEventCount}</span>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant">
                Agenda bulan ini
              </span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              {/* Month controls */}
              <div className="flex items-center justify-between gap-3 border-b border-outline-variant p-4 md:p-5">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-md text-lg md:text-xl font-bold text-on-surface">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToToday}
                    className="min-h-9 rounded-lg border border-outline-variant px-3 font-label-sm text-label-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer"
                  >
                    Hari Ini
                  </button>
                  <button
                    onClick={() => goToMonth(-1)}
                    aria-label="Bulan sebelumnya"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <button
                    onClick={() => goToMonth(1)}
                    aria-label="Bulan berikutnya"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Weekday header */}
              <div className="grid grid-cols-7 border-b border-outline-variant bg-surface-cream/50">
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="py-2.5 text-center font-label-sm text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7">
                {cells.map((cell, index) => {
                  if (!cell) {
                    return <div key={`blank-${index}`} className="min-h-16 md:min-h-24 border-b border-r border-outline-variant/60 bg-surface-cream/30" />;
                  }
                  const dayEvents = eventsByDate.get(cell.key) ?? [];
                  const isToday = cell.key === todayKey;
                  const isSelected = cell.key === selectedKey;
                  return (
                    <button
                      key={cell.key}
                      onClick={() => setSelectedKey(cell.key)}
                      className={`group relative flex min-h-16 md:min-h-24 flex-col gap-1 border-b border-r border-outline-variant/60 p-1.5 md:p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40 cursor-pointer ${
                        isSelected ? "bg-primary-fixed/40" : "hover:bg-surface-container-low"
                      }`}
                      aria-pressed={isSelected}
                      aria-label={`${formatLongDate(cell.key)}${dayEvents.length ? `, ${dayEvents.length} agenda` : ""}`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full font-body-md text-sm font-semibold ${
                          isToday
                            ? "bg-primary text-on-primary"
                            : isSelected
                              ? "text-primary"
                              : "text-on-surface group-hover:text-on-surface"
                        }`}
                      >
                        {cell.day}
                      </span>
                      {/* Event indicators */}
                      <div className="flex flex-col gap-1 overflow-hidden">
                        {dayEvents.slice(0, 2).map((event) => {
                          const style = EVENT_STYLES[event.type];
                          return (
                            <span
                              key={event.id}
                              className={`hidden md:flex items-center gap-1 truncate rounded px-1.5 py-0.5 font-label-sm text-[10px] font-medium ${style.chipBg} ${style.chipText}`}
                            >
                              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                              <span className="truncate">{event.title}</span>
                            </span>
                          );
                        })}
                        {/* Mobile: dots only */}
                        <div className="flex gap-1 md:hidden">
                          {dayEvents.slice(0, 3).map((event) => (
                            <span key={event.id} className={`h-1.5 w-1.5 rounded-full ${EVENT_STYLES[event.type].dot}`} />
                          ))}
                        </div>
                        {dayEvents.length > 2 && (
                          <span className="hidden md:block font-label-sm text-[10px] font-medium text-on-surface-variant">
                            +{dayEvents.length - 2} lainnya
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-1">
              {(Object.keys(EVENT_STYLES) as EventType[]).map((type) => (
                <span key={type} className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                  <span className={`h-2.5 w-2.5 rounded-full ${EVENT_STYLES[type].dot}`} />
                  {EVENT_STYLES[type].label}
                </span>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Selected day */}
            <div>
              <h2 className="font-headline-md text-lg font-bold text-on-surface mb-1">
                {selectedKey === todayKey ? "Hari Ini" : "Detail Tanggal"}
              </h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">{formatLongDate(selectedKey)}</p>

              <div className="space-y-3">
                {selectedEvents.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-outline-variant bg-white/60 p-6 text-center">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant/60">event_busy</span>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">Tidak ada agenda di tanggal ini.</p>
                  </div>
                ) : (
                  selectedEvents.map((event) => {
                    const style = EVENT_STYLES[event.type];
                    return (
                      <EventCard key={event.id} event={event} style={style} />
                    );
                  })
                )}
              </div>
            </div>

            {/* Upcoming */}
            <div>
              <h2 className="font-headline-md text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">upcoming</span>
                Agenda Mendatang
              </h2>
              <div className="bg-white rounded-xl border border-outline-variant p-2 shadow-sm">
                {upcomingEvents.length === 0 ? (
                  <p className="p-4 font-body-md text-body-md text-on-surface-variant">Belum ada agenda mendatang.</p>
                ) : (
                  upcomingEvents.map((event) => {
                    const style = EVENT_STYLES[event.type];
                    const [, m, d] = event.date.split("-");
                    return (
                      <button
                        key={event.id}
                        onClick={() => {
                          const [y, mm] = event.date.split("-").map(Number);
                          setViewYear(y);
                          setViewMonth(mm - 1);
                          setSelectedKey(event.date);
                        }}
                        className="flex w-full gap-4 p-3 text-left rounded-lg transition-colors hover:bg-surface-container-low border-b border-outline-variant last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-surface-cream rounded-lg border border-outline-variant flex-shrink-0">
                          <span className="font-label-sm text-[10px] text-error font-bold uppercase">
                            {MONTH_NAMES[Number(m) - 1].slice(0, 3)}
                          </span>
                          <span className="font-headline-md text-base font-bold text-on-surface leading-none">{d}</span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-body-md text-body-md font-semibold text-on-surface truncate">{event.title}</h4>
                          <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-1">
                            <span className={`material-symbols-outlined text-[14px] ${style.iconText}`}>{style.icon}</span>
                            {event.time}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function EventCard({
  event,
  style,
}: {
  event: CalendarEvent;
  style: (typeof EVENT_STYLES)[EventType];
}) {
  const body = (
    <div className="rounded-xl border border-outline-variant bg-white p-4 shadow-sm transition-shadow hover:shadow-[0_10px_25px_rgba(128,0,0,0.08)]">
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${style.iconBg} ${style.iconText}`}>
          <span className="material-symbols-outlined text-[22px]">{style.icon}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`rounded px-2 py-0.5 font-label-sm text-[10px] font-medium uppercase tracking-wide ${style.chipBg} ${style.chipText}`}>
              {style.label}
            </span>
          </div>
          <h4 className="font-body-md text-body-md font-semibold text-on-surface">{event.title}</h4>
          <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-1.5">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {event.time}
          </p>
          <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[14px]">place</span>
            {event.location}
          </p>
        </div>
        {event.href && <span className="material-symbols-outlined text-on-surface-variant/70 text-[20px]">chevron_right</span>}
      </div>
    </div>
  );

  if (event.href) {
    return (
      <Link href={event.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-xl">
        {body}
      </Link>
    );
  }
  return body;
}

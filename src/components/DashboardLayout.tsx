"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { readAllTryoutResults } from "@/lib/tryout-results";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: "dashboard" | "exams" | "results" | "profile";
  title: string;
}

type DashboardTab = DashboardLayoutProps["activeTab"];

function getInitialLayoutState() {
  if (typeof window === "undefined") {
    return {
      hasTakenTryout: false,
      latestTryoutId: "1",
      displayName: "Calon Taruna",
      displayStatus: "Member Premium",
    };
  }

  const results = readAllTryoutResults();
  return {
    hasTakenTryout: results.length > 0,
    latestTryoutId: results.length > 0 ? results[results.length - 1].tryoutId : "1",
    displayName: localStorage.getItem("profile_name") || "Calon Taruna",
    displayStatus: localStorage.getItem("profile_status") || "Member Premium",
  };
}

export default function DashboardLayout({ children, activeTab, title }: DashboardLayoutProps) {
  const router = useRouter();
  const [{ hasTakenTryout, latestTryoutId, displayName, displayStatus }, setLayoutState] = useState(getInitialLayoutState);

  useEffect(() => {
    const handleProfileUpdate = () => {
      setLayoutState((current) => ({
        ...current,
        displayName: localStorage.getItem("profile_name") || current.displayName,
        displayStatus: localStorage.getItem("profile_status") || current.displayStatus,
      }));
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .join("")
      .substring(0, 2)
      .toUpperCase() || "CT";
  };

  const handleLogout = () => {
    router.push("/");
  };

  const resultsHref = hasTakenTryout ? `/tryout/${latestTryoutId}/hasil` : "/tryout/1/hasil";
  const navItems: Array<{ tab: DashboardTab; label: string; shortLabel: string; icon: string; href: string }> = [
    { tab: "dashboard", label: "Dashboard", shortLabel: "Home", icon: "dashboard", href: "/dashboard" },
    { tab: "exams", label: "My Exams", shortLabel: "Exams", icon: "quiz", href: "/dashboard/exams" },
    { tab: "results", label: "Results", shortLabel: "Results", icon: "analytics", href: resultsHref },
    { tab: "profile", label: "Profile", shortLabel: "Profile", icon: "person", href: "/dashboard/profile" },
  ];

  const getLinkClass = (tab: DashboardTab) => {
    if (activeTab === tab) {
      return "group flex min-h-11 items-center gap-3 rounded-lg bg-primary px-3.5 py-2.5 text-on-primary font-semibold shadow-sm transition-colors";
    }
    return "group flex min-h-11 items-center gap-3 rounded-lg px-3.5 py-2.5 text-on-surface-variant transition-colors hover:bg-white hover:text-on-surface focus-visible:bg-white font-medium";
  };

  const getIconFill = (tab: DashboardTab) => {
    return activeTab === tab ? "'FILL' 1" : "'FILL' 0";
  };

  const activeNavLabel = navItems.find((item) => item.tab === activeTab)?.label || title;

  return (
    <div className="font-body-md text-on-surface flex min-h-screen overflow-hidden bg-surface-cream">
      {/* Sidebar Navigation */}
      <aside className="z-20 hidden h-screen w-[280px] shrink-0 border-r border-outline-variant/70 bg-surface-container-low md:flex md:flex-col">
        <div className="flex h-20 items-center gap-3 border-b border-outline-variant/70 px-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white ring-1 ring-outline-variant/80">
            <Image
              className="h-8 w-auto object-contain"
              alt="Dreams Team logo"
              src="/icon.png"
              width={32}
              height={32}
            />
          </div>
          <div className="min-w-0">
            <span className="block truncate font-headline-md text-lg font-bold leading-tight text-primary">Dreams Team</span>
            <span className="block text-xs font-medium text-on-surface-variant">Tryout preparation</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-5">
          <p className="px-3.5 pb-2 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
            Workspace
          </p>
          <div className="space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.tab}
                href={item.href}
                className={`${getLinkClass(item.tab)} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low`}
                aria-current={activeTab === item.tab ? "page" : undefined}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: getIconFill(item.tab) }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        <div className="space-y-4 border-t border-outline-variant/70 p-4">
          <div className="rounded-lg bg-white p-3 ring-1 ring-outline-variant/70">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-sm font-bold text-on-primary-fixed">
                {getInitials(displayName)}
              </div>
              <div className="min-w-0">
                <span className="block truncate text-sm font-semibold text-on-surface">{displayName}</span>
                <span className="block truncate text-xs text-on-surface-variant">{displayStatus}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2.5 text-left font-medium text-on-surface-variant transition-colors hover:bg-error-container hover:text-on-error-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/30"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex h-screen min-w-0 flex-1 flex-col overflow-y-auto">
        {/* Top App Bar */}
        <header className="sticky top-0 z-10 border-b border-outline-variant/70 bg-surface-cream/95 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-[var(--spacing-max-width)] items-center justify-between gap-4 px-4 md:h-20 md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-outline-variant/80 md:hidden">
                <Image
                  className="h-7 w-auto object-contain"
                  alt="Dreams Team logo"
                  src="/icon.png"
                  width={28}
                  height={28}
                />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-on-surface-variant md:hidden">{activeNavLabel}</span>
                <h1 className="truncate font-headline-md text-xl font-bold leading-tight text-on-surface md:text-2xl">
                  {title}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/exams"
                className="hidden min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 md:inline-flex"
              >
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                Mulai Tryout
              </Link>
              <div className="hidden flex-col text-right md:flex">
                <span className="text-sm font-semibold text-on-surface">{displayName}</span>
                <span className="text-xs text-on-surface-variant">{displayStatus}</span>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-sm font-bold text-on-primary-fixed ring-1 ring-outline-variant/70">
                {getInitials(displayName)}
              </div>
            </div>
          </div>
        </header>

        {/* Children content wrapper */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Mobile Bottom Nav Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant/70 bg-white/95 px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
          <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.tab}
                href={item.href}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-2 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                  activeTab === item.tab
                    ? "bg-primary-fixed text-on-primary-fixed"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
                aria-current={activeTab === item.tab ? "page" : undefined}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: getIconFill(item.tab) }}
                >
                  {item.icon}
                </span>
                <span className="font-label-sm text-[10px] font-semibold leading-none">{item.shortLabel}</span>
              </Link>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
}

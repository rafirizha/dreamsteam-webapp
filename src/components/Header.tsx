"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const activeStyle = "text-primary font-bold border-b-2 border-primary pb-1 transition-all";
  const inactiveStyle = "text-primary font-medium transition-colors duration-200";

  return (
    <nav className="bg-surface-cream/80 backdrop-blur-md dark:bg-surface-dim/80 docked full-width top-0 sticky z-50 border-b border-outline-variant dark:border-outline flat no shadows">
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
        {/* Brand */}
        <Link href="/" className="flex items-center">
          <Image
            className="h-12 w-auto object-contain"
            alt="Dreams Team logo"
            src="/icon.png"
            width={48}
            height={48}
            priority
          />
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 h-full">
          <div className="h-full flex items-center">
            <Link
              className={isLinkActive("/") ? activeStyle : inactiveStyle}
              href="/"
            >
              Home
            </Link>
          </div>
          <div className="h-full flex items-center">
            <Link
              className={isLinkActive("/programs") ? activeStyle : inactiveStyle}
              href="/programs"
            >
              Programs
            </Link>
          </div>
          <div className="h-full flex items-center">
            <Link
              className={isLinkActive("/tryout") ? activeStyle : inactiveStyle}
              href="/tryout"
            >
              Tryouts
            </Link>
          </div>
          <div className="h-full flex items-center">
            <Link
              className={isLinkActive("/about") ? activeStyle : inactiveStyle}
              href="/about"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="font-label-sm text-label-sm bg-primary text-on-primary px-5 py-2.5 rounded-lg hover:bg-primary-container transition-colors duration-200 shadow-md cursor-pointer flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Login with Google
            </button>
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary p-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-surface-cream/95 backdrop-blur-md dark:bg-surface-dim/95 border-b border-outline-variant px-margin-mobile py-4 flex flex-col gap-4">
          <Link
            className={`font-medium py-2 ${isLinkActive("/") ? "text-primary font-bold" : "text-primary"}`}
            href="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            className={`font-medium py-2 ${isLinkActive("/programs") ? "text-primary font-bold" : "text-primary"}`}
            href="/programs"
            onClick={() => setIsOpen(false)}
          >
            Programs
          </Link>
          <Link
            className={`font-medium py-2 ${isLinkActive("/tryout") ? "text-primary font-bold" : "text-primary"}`}
            href="/tryout"
            onClick={() => setIsOpen(false)}
          >
            Tryouts
          </Link>
          <Link
            className={`font-medium py-2 ${isLinkActive("/about") ? "text-primary font-bold" : "text-primary"}`}
            href="/about"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
}

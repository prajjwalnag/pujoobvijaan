"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutGrid,
  Map,
  MessageCircle,
  CalendarDays,
  Trophy,
  Menu,
  X,
  Flame,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "./Button";

const navItems = [
  { label: "Pandals", href: "/pandals", icon: LayoutGrid },
  { label: "Map", href: "/map", icon: Map },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Chat", href: "/chat", icon: MessageCircle },
  { label: "Itinerary", href: "/itinerary", icon: CalendarDays },
];

// Mocked for Phase 1 UI — real auth/points land with the backend.
const isAuthenticated = false;
const mockPoints = 240;

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg-secondary)] shadow-[var(--shadow-light)]">
      <div className="gold-rule" />
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-red)] text-[var(--color-gold-light)]">
            <Flame size={16} fill="currentColor" />
          </span>
          <span className="text-xl font-bold tracking-tight text-[var(--color-red)]">
            Pujo <span className="text-[var(--color-gold-dark)]">Obhijaan</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors duration-300",
                  active
                    ? "font-bold text-[var(--color-red)] border-b-[3px] border-[var(--color-gold)]"
                    : "font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-red)]"
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && (
            <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
              Points: {mockPoints} · Rank #9
            </span>
          )}
          <Button size="sm">Sign In</Button>
        </div>

        <button
          className="md:hidden text-[var(--color-text-primary)]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden flex flex-col gap-1 border-t border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3">
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "flex items-center gap-2 rounded-md px-3 py-3 text-base",
                  active
                    ? "font-bold text-[var(--color-red)] bg-[var(--color-bg-tertiary)]"
                    : "font-medium text-[var(--color-text-secondary)]"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
          <Button size="sm" className="mt-2 w-full">
            Sign In
          </Button>
        </nav>
      )}
    </header>
  );
}

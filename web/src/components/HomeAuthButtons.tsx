"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useAuth, getDisplayName } from "./AuthProvider";
import { Button } from "./Button";

export function HomeAuthButtons() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return (
      <p className="mt-6 flex items-center justify-center gap-1.5 text-sm font-semibold text-[var(--color-text-secondary)]">
        <Sparkles size={14} className="text-[var(--color-gold)]" />
        Welcome back, {getDisplayName(user)} — head to the{" "}
        <Link href="/map" className="text-[var(--color-red)] hover:underline">
          map
        </Link>{" "}
        to keep earning points.
      </p>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <Link href="/signup">
        <Button>Sign Up</Button>
      </Link>
      <Link href="/login">
        <Button variant="secondary">Sign In</Button>
      </Link>
    </div>
  );
}

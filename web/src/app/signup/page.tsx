"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, User, Flame, CheckCircle2, Sparkles } from "lucide-react";
import { useAuth, REFERRAL_STORAGE_KEY } from "@/components/AuthProvider";
import { POINTS } from "@/components/PointsProvider";
import { Button } from "@/components/Button";
import { GoogleButton } from "@/components/GoogleButton";

export default function SignupPage() {
  const { signInWithMagicLink } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | undefined>(undefined);

  // Not useSearchParams() — plain window.location avoids a Suspense
  // boundary requirement for something this simple (a one-time read on
  // mount). Kept in state so it can be passed straight through to
  // signInWithMagicLink/GoogleButton (the primary attribution path — see
  // AuthProvider); also stashed in localStorage as a fallback for
  // whatever else might read REFERRAL_STORAGE_KEY.
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("ref");
    if (code) {
      setReferralCode(code);
      try {
        localStorage.setItem(REFERRAL_STORAGE_KEY, code);
      } catch {
        // private browsing / storage blocked — the URL-based path still works
      }
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    const { error } = await signInWithMagicLink(email.trim(), {
      name: name.trim() || undefined,
      shouldCreateUser: true,
      referralCode,
    });
    if (error) {
      setError(error);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="mx-auto flex max-w-[420px] flex-col items-center px-4 py-16 sm:px-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-red)] text-[var(--color-gold-light)]">
        <Flame size={22} fill="currentColor" />
      </span>
      <h1 className="mt-4 text-2xl font-bold text-[var(--color-text-primary)]">Create your account</h1>
      <p className="mt-1 text-center text-sm text-[var(--color-text-secondary)]">
        No password to set — we&apos;ll email you a link to finish signing up.
      </p>
      <p className="mt-2 flex items-center gap-1.5 rounded-full bg-[var(--color-bg-tertiary)] px-3 py-1 text-xs font-semibold text-[var(--color-red)]">
        <Sparkles size={13} className="text-[var(--color-gold)]" />+{POINTS.SIGNUP} points just for signing up
      </p>

      {status === "sent" ? (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 text-center">
          <CheckCircle2 className="text-[var(--color-red)]" size={28} />
          <p className="text-sm text-[var(--color-text-primary)]">
            Check <strong>{email}</strong> for a link to finish creating your account.
          </p>
        </div>
      ) : (
        <>
        <div className="mt-6 w-full">
          <GoogleButton label="Sign up with Google" referralCode={referralCode} />
        </div>

        <div className="mt-5 flex w-full items-center gap-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-light)]">
          <div className="h-px flex-1 bg-[var(--color-border)]" />
          or
          <div className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-3">
          <div className="relative">
            <User
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] pl-9 pr-3 text-sm outline-none focus:border-2 focus:border-[var(--color-red)]"
            />
          </div>
          <div className="relative">
            <Mail
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] pl-9 pr-3 text-sm outline-none focus:border-2 focus:border-[var(--color-red)]"
            />
          </div>
          <Button type="submit" disabled={status === "sending" || !email.trim()} className="w-full">
            {status === "sending" ? "Sending link…" : "Sign up"}
          </Button>
          {status === "error" && (
            <p className="text-center text-xs text-[var(--color-red)]">{error}</p>
          )}
        </form>
        </>
      )}

      <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[var(--color-red)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

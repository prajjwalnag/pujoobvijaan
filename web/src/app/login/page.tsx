"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Flame, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/Button";
import { GoogleButton } from "@/components/GoogleButton";

export default function LoginPage() {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    const { error } = await signInWithMagicLink(email.trim(), { shouldCreateUser: false });
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
      <h1 className="mt-4 text-2xl font-bold text-[var(--color-text-primary)]">Sign in</h1>
      <p className="mt-1 text-center text-sm text-[var(--color-text-secondary)]">
        No password needed — we&apos;ll email you a link to sign in.
      </p>

      {status === "sent" ? (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 text-center">
          <CheckCircle2 className="text-[var(--color-red)]" size={28} />
          <p className="text-sm text-[var(--color-text-primary)]">
            Check <strong>{email}</strong> for a sign-in link.
          </p>
        </div>
      ) : (
        <>
        <div className="mt-6 w-full">
          <GoogleButton label="Sign in with Google" />
        </div>

        <div className="mt-5 flex w-full items-center gap-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-light)]">
          <div className="h-px flex-1 bg-[var(--color-border)]" />
          or
          <div className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex w-full flex-col gap-3">
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
            {status === "sending" ? "Sending link…" : "Send magic link"}
          </Button>
          {status === "error" && (
            <p className="text-center text-xs text-[var(--color-red)]">{error}</p>
          )}
        </form>
        </>
      )}

      <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-[var(--color-red)] hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

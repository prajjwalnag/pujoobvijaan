"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface MagicLinkOptions {
  /** Display name to store on the new account — sign-up only. */
  name?: string;
  /** false = sign-in only, rejects unknown emails instead of creating an account. */
  shouldCreateUser?: boolean;
  /** Referral code to attribute — carried in the emailed link itself, not localStorage (see below). */
  referralCode?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signInWithMagicLink: (email: string, opts?: MagicLinkOptions) => Promise<{ error: string | null }>;
  signInWithGoogle: (opts?: { referralCode?: string }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Best-effort display name: our own signup flow stores `display_name`;
// Google OAuth instead populates `full_name`/`name` on the user metadata.
// Falls back to the part of the email before the @ if neither is set.
export function getDisplayName(user: User): string {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const name = meta?.display_name || meta?.full_name || meta?.name;
  if (typeof name === "string" && name.trim()) return name.trim();
  return user.email?.split("@")[0] ?? "there";
}

export const REFERRAL_STORAGE_KEY = "pujo-pending-referral-code";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      // Fallback attribution path — the primary one now is /auth/callback
      // reading `?ref=` straight off the confirmed link (see
      // signInWithMagicLink/signInWithGoogle below), which survives the
      // magic-link email being opened in a different browser/app context
      // than the one that has this localStorage. This client-side path
      // still catches anything that lands here some other way. The
      // server-side claim_referral() function is the real guard — it's a
      // no-op for a stale/foreign/already-claimed code either way.
      if (event === "SIGNED_IN") {
        try {
          const code = localStorage.getItem(REFERRAL_STORAGE_KEY);
          if (code) {
            void Promise.resolve(supabase.rpc("claim_referral", { p_code: code })).finally(() => {
              localStorage.removeItem(REFERRAL_STORAGE_KEY);
            });
          }
        } catch {
          // private browsing / storage blocked — skip attribution
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Carries the referral code in the callback URL itself rather than
  // relying only on localStorage — the emailed magic link is very often
  // opened in a different browser context (Gmail/Outlook's in-app
  // webview) than the one that started the sign-up, which silently loses
  // anything stashed in storage. A query param on the link survives that.
  function callbackUrl(referralCode?: string) {
    const url = `${window.location.origin}/auth/callback`;
    return referralCode ? `${url}?ref=${encodeURIComponent(referralCode)}` : url;
  }

  async function signInWithMagicLink(email: string, opts: MagicLinkOptions = {}) {
    const supabase = createClient();
    const shouldCreateUser = opts.shouldCreateUser ?? true;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: callbackUrl(opts.referralCode),
        shouldCreateUser,
        data: opts.name ? { display_name: opts.name } : undefined,
      },
    });
    if (error && !shouldCreateUser) {
      // With shouldCreateUser: false, Supabase errors here specifically
      // because the email has no account yet (an existing email succeeds
      // silently and gets the link) — safe to surface as "go sign up".
      return { error: "No account found for that email — try signing up instead." };
    }
    return { error: error?.message ?? null };
  }

  async function signInWithGoogle(opts: { referralCode?: string } = {}) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl(opts.referralCode) },
    });
    // On success the browser is redirected to Google immediately, so this
    // only ever returns with an error (e.g. Google provider not enabled).
    return { error: error?.message ?? null };
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithMagicLink, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

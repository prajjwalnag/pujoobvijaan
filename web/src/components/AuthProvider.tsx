"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface MagicLinkOptions {
  /** Display name to store on the new account — sign-up only. */
  name?: string;
  /** false = sign-in only, rejects unknown emails instead of creating an account. */
  shouldCreateUser?: boolean;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signInWithMagicLink: (email: string, opts?: MagicLinkOptions) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
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
      // Best-effort: attribute this sign-in to whoever's referral link
      // was used to get here (see /signup capturing ?ref= into storage).
      // The server-side claim_referral() function is the real guard — it
      // only pays out for a genuinely new account within its first few
      // minutes, so a stale/foreign code left in storage is a harmless
      // no-op here.
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

  async function signInWithMagicLink(email: string, opts: MagicLinkOptions = {}) {
    const supabase = createClient();
    const shouldCreateUser = opts.shouldCreateUser ?? true;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
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

  async function signInWithGoogle() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
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

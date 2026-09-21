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
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithMagicLink, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

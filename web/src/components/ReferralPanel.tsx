"use client";

import { useEffect, useState } from "react";
import { UserPlus, Copy, Check } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { POINTS } from "./PointsProvider";
import { createClient } from "@/lib/supabase/client";

export function ReferralPanel() {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referredCount, setReferredCount] = useState(0);
  const [copied, setCopied] = useState(false);

  // Syncs local state from the server (Supabase) whenever the signed-in
  // user changes — including clearing it back out on sign-out.
  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReferralCode(null);
      setReferredCount(0);
      return;
    }
    const supabase = createClient();
    supabase
      .from("profiles")
      .select("referral_code")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setReferralCode(data?.referral_code ?? null));
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("referred_by", user.id)
      .then(({ count }) => setReferredCount(count ?? 0));
  }, [user]);

  const link = referralCode ? `${window.location.origin}/signup?ref=${referralCode}` : null;

  async function handleCopy() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
      <div className="flex items-center gap-2">
        <UserPlus className="text-[var(--color-red)]" size={18} />
        <h2 className="font-bold text-[var(--color-text-primary)]">Invite a friend</h2>
      </div>

      {!user ? (
        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
          Sign in to get your own referral link — you earn +{POINTS.REFERRAL} points for every
          friend who signs up through it.
        </p>
      ) : (
        <>
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            Share your link — you get +{POINTS.REFERRAL} points the moment a friend actually signs
            up through it (verified automatically, not self-reported).
          </p>

          <div className="mt-3 flex gap-2">
            <input
              readOnly
              value={link ?? "Loading…"}
              className="flex-1 truncate rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3 py-2 text-xs text-[var(--color-text-secondary)] outline-none"
            />
            <button
              onClick={handleCopy}
              disabled={!link}
              aria-label="Copy referral link"
              className="flex items-center gap-1.5 rounded-lg bg-[var(--color-red)] px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
            {referredCount > 0
              ? `${referredCount} friend${referredCount === 1 ? "" : "s"} joined using your link so far.`
              : "No one's joined via your link yet."}
          </p>
        </>
      )}
    </div>
  );
}

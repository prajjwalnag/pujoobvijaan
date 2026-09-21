"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { usePoints, POINTS } from "./PointsProvider";
import { Button } from "./Button";

export function ReferralPanel() {
  const { referrals, addReferral } = usePoints();
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const added = await addReferral(name);
    setMessage(added ? `+${POINTS.REFERRAL} points — thanks for inviting ${name.trim()}!` : "Already added that name.");
    if (added) setName("");
  }

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
      <div className="flex items-center gap-2">
        <UserPlus className="text-[var(--color-red)]" size={18} />
        <h2 className="font-bold text-[var(--color-text-primary)]">Invite a friend</h2>
      </div>
      <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
        Get someone else onto Pujo Obhijaan and log their name here for +{POINTS.REFERRAL} points.
        This is self-reported &mdash; there&apos;s no way to verify the signup against &mdash; so
        it&apos;s an honor-system bonus, once per name.
      </p>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Friend's name"
          className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-red)]"
        />
        <Button type="submit" size="sm" disabled={!name.trim()}>
          Add
        </Button>
      </form>

      {message && <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{message}</p>}

      {referrals.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {referrals.map((r) => (
            <span
              key={r}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-main)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)]"
            >
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

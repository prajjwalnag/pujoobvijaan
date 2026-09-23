"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;

export function UsernameEditor({ userId, username }: { userId: string; username: string }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(username);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startEditing() {
    setValue(username);
    setError(null);
    setEditing(true);
  }

  function cancel() {
    setEditing(false);
    setError(null);
  }

  async function save() {
    const next = value.trim().toLowerCase();
    if (!USERNAME_PATTERN.test(next)) {
      setError("3-20 chars: lowercase letters, numbers, underscores.");
      return;
    }
    if (next === username) {
      setEditing(false);
      return;
    }
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ username: next })
      .eq("id", userId);
    setSaving(false);
    if (updateError) {
      setError(updateError.code === "23505" ? "That username is taken." : "Couldn't save — try again.");
      return;
    }
    setEditing(false);
    router.refresh();
  }

  if (!editing) {
    return (
      <button
        type="button"
        onClick={startEditing}
        className="inline-flex items-center gap-1 text-xs text-[var(--color-text-light)] hover:text-[var(--color-red)]"
      >
        @{username}
        <Pencil size={11} />
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <span className="text-xs text-[var(--color-text-light)]">@</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={saving}
          autoFocus
          className="w-28 rounded border border-[var(--color-border)] bg-[var(--color-bg-main)] px-1.5 py-0.5 text-xs text-[var(--color-text-primary)] focus:border-[var(--color-red)] focus:outline-none"
        />
        <button
          type="button"
          onClick={save}
          disabled={saving}
          aria-label="Save username"
          className="text-[var(--color-red)] disabled:opacity-50"
        >
          <Check size={14} />
        </button>
        <button
          type="button"
          onClick={cancel}
          disabled={saving}
          aria-label="Cancel"
          className="text-[var(--color-text-light)] disabled:opacity-50"
        >
          <X size={14} />
        </button>
      </div>
      {error && <p className="text-[10px] text-[var(--color-red)]">{error}</p>}
    </div>
  );
}

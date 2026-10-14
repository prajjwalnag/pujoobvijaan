// Remembers the page a signed-out visitor was on when an action (check-in,
// rating) sent them to /login, so the auth callback can bring them back
// there instead of dumping them on the home page. Stored client-side and
// expired after 30 minutes so a stale value can't hijack a later sign-in.
const KEY = "pujo-return-to";
const MAX_AGE_MS = 30 * 60 * 1000;

export function setReturnTo(path: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ path, at: Date.now() }));
  } catch {
    // storage blocked — fall back to the default landing page
  }
}

export function getReturnTo(): string | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { path, at } = JSON.parse(raw);
    if (typeof path !== "string" || Date.now() - at > MAX_AGE_MS) return null;
    return path;
  } catch {
    return null;
  }
}

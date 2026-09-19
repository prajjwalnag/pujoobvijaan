export const ADMIN_SESSION_COOKIE = "pujo_admin_session";

// No database/session store exists, so the session cookie is a signed token
// (HMAC of a fixed payload keyed by ADMIN_SESSION_SECRET) rather than an
// opaque id — verifiable statelessly. Uses Web Crypto (not node:crypto) so
// this also works from the Edge middleware runtime that checks it.
function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
  return s;
}

async function hmacHex(key: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createAdminSessionToken(): Promise<string> {
  return hmacHex(getSecret(), "pujo-admin");
}

export async function verifyAdminSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await createAdminSessionToken();
  return constantTimeEqual(token, expected);
}

export function verifyAdminPassword(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return false;
  return constantTimeEqual(password, configured);
}

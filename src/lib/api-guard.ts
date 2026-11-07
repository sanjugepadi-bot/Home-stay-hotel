/**
 * Request guard for the public AI-assistant endpoint: strict body validation, size limits,
 * a same-origin check and a small in-memory rate limiter.
 *
 * Pure module (no framework imports) so it can be unit-tested with `npm test`.
 *
 * NOTE on rate limiting: the limiter lives in server memory. On serverless hosting each instance has its own
 * counters, so this is a best-effort brake that stops casual abuse and runaway loops — it is not a hard global
 * quota. For a hard limit use a shared store (e.g. Upstash/Redis or Vercel's firewall rate-limit rules).
 */

export const CHAT_LIMITS = {
  /** Maximum accepted request body (characters). */
  maxBodyChars: 6_000,
  /** Maximum number of entries accepted in `messages`. */
  maxMessagesIn: 40,
  /** Number of the most recent user messages forwarded to the model. */
  maxMessagesOut: 6,
  /** Maximum length of one message (characters). */
  maxMessageChars: 800,
} as const;

export type CleanMessage = { role: "user"; content: string };

export type ParseResult =
  | { ok: true; messages: CleanMessage[] }
  | { ok: false; status: 400 | 413; error: string };

/**
 * Validates the raw JSON text of a chat request. Client-supplied roles are NOT trusted: only `user`
 * messages are forwarded (a client could otherwise forge "assistant" turns to steer the model).
 */
export function parseChatBody(rawText: string): ParseResult {
  if (rawText.length > CHAT_LIMITS.maxBodyChars) return { ok: false, status: 413, error: "Request too large." };

  let data: unknown;
  try {
    data = JSON.parse(rawText);
  } catch {
    return { ok: false, status: 400, error: "Invalid JSON." };
  }
  if (!data || typeof data !== "object" || !Array.isArray((data as { messages?: unknown }).messages)) {
    return { ok: false, status: 400, error: "Expected { messages: [...] }." };
  }

  const list = (data as { messages: unknown[] }).messages;
  if (list.length === 0 || list.length > CHAT_LIMITS.maxMessagesIn) {
    return { ok: false, status: 400, error: "Invalid number of messages." };
  }

  const users: CleanMessage[] = [];
  for (const m of list) {
    if (!m || typeof m !== "object") return { ok: false, status: 400, error: "Invalid message." };
    const { role, content } = m as { role?: unknown; content?: unknown };
    if (typeof role !== "string" || typeof content !== "string") return { ok: false, status: 400, error: "Invalid message." };
    if (role !== "user") continue; // never forward client-supplied assistant/system turns
    const text = content.trim();
    if (!text) continue;
    if (text.length > CHAT_LIMITS.maxMessageChars) return { ok: false, status: 413, error: "Message too long." };
    users.push({ role: "user", content: text });
  }
  if (users.length === 0) return { ok: false, status: 400, error: "No user message." };
  return { ok: true, messages: users.slice(-CHAT_LIMITS.maxMessagesOut) };
}

/** True when the request comes from this site (or has no Origin header, e.g. server-side/curl). */
export function isSameOrigin(origin: string | null, host: string | null): boolean {
  if (!origin) return true;
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Client IP as set by the hosting proxy (first X-Forwarded-For entry). */
export function clientIp(headers: { get(name: string): string | null }): string {
  const fwd = headers.get("x-forwarded-for");
  const first = fwd ? fwd.split(",")[0].trim() : "";
  return first || headers.get("x-real-ip") || "unknown";
}

export type RateLimiter = { check(key: string, now?: number): { allowed: boolean; retryAfterSec: number } };

/** Sliding-window limiter: at most `max` hits per `windowMs` for each key. */
export function createRateLimiter({ windowMs, max, maxKeys = 5_000 }: { windowMs: number; max: number; maxKeys?: number }): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    check(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= max) {
        hits.set(key, recent);
        return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000)) };
      }
      recent.push(now);
      hits.set(key, recent);
      if (hits.size > maxKeys) {
        // keep memory bounded: drop the oldest-inserted keys
        for (const k of hits.keys()) {
          hits.delete(k);
          if (hits.size <= maxKeys * 0.8) break;
        }
      }
      return { allowed: true, retryAfterSec: 0 };
    },
  };
}

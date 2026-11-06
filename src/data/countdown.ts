/**
 * HOMEPAGE COUNTDOWN BANNER — central configuration.
 *
 * STATUS: DISABLED (temporary). The banner is completely hidden until the owner confirms a real offer
 * and its real expiry date. Nothing here is a real offer — do not invent a discount, price or deadline.
 *
 * To switch it on, fill in ALL of the following, then set `enabled: true`:
 *   • targetDate   — the exact expiry, ISO 8601 WITH a timezone, e.g. "2026-12-31T23:59:59+05:30" (IST)
 *   • headline     — the owner-approved offer headline (shown exactly as written)
 *   • description  — optional owner-approved details (dates, terms)  — leave "" if none
 *   • ctaLabel + ctaHref — optional button, e.g. "Enquire on WhatsApp" + "/#book" — leave "" if none
 *
 * When the deadline passes the banner never resets itself:
 *   • expiredBehavior "hide"    → the banner disappears (default)
 *   • expiredBehavior "message" → shows `expiredMessage` instead of the timer (owner-approved wording)
 */
export const countdown = {
  /** Master switch. Keep false until the owner confirms the offer + date. */
  enabled: true, // DEMO-PREVIEW-ONLY: revert to false

  /** Expiry moment — ISO 8601 with timezone. Empty = never active. */
  targetDate: "2026-11-16T00:00:00+05:30", // DEMO-PREVIEW-ONLY test date

  /** Small label above the headline, e.g. "Limited-time offer" (owner-approved). */
  eyebrow: "DEMO PREVIEW", // DEMO-PREVIEW-ONLY

  /** Owner-approved headline. Required for the banner to show. */
  headline: "DEMO ONLY - sample countdown, not a real offer", // DEMO-PREVIEW-ONLY

  /** Owner-approved supporting text. Optional. */
  description: "Temporary preview content. No offer, discount or price is being advertised.", // DEMO-PREVIEW-ONLY

  /** Optional call-to-action button. */
  ctaLabel: "Demo button", // DEMO-PREVIEW-ONLY
  ctaHref: "/#book",

  /** What to do after the deadline: "hide" or "message". */
  expiredBehavior: "hide" as "hide" | "message",

  /** Owner-approved wording shown after expiry when expiredBehavior is "message". */
  expiredMessage: "",
};

/** True only when the banner is switched on AND has the minimum real content (a valid date and a headline). */
export function countdownIsConfigured(): boolean {
  return countdown.enabled && countdown.headline.trim() !== "" && Number.isFinite(Date.parse(countdown.targetDate));
}

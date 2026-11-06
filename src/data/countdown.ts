/**
 * HOMEPAGE COUNTDOWN BANNER — central configuration.
 *
 * It is a permanent "coming up" banner, NOT an offer: it counts down to the next real Assamese festival
 * in the list below and makes no discount, price or availability claim. Because every date is a real,
 * fixed calendar date, the timer never resets and never fakes urgency.
 *
 *  • The banner shows the FIRST event in `events` whose date has not passed, and moves on to the next
 *    one automatically. When every event has passed it hides itself — add new events (in date order).
 *  • Dates are ISO 8601 with a timezone (IST = +05:30). Please have the owner double-check the festival dates.
 *  • To switch the banner off, set `enabled: false`.
 *  • To run a real, owner-approved OFFER instead, add it as an event with its real deadline and wording.
 */
export type CountdownEvent = {
  /** Shown as the headline, e.g. "Rongali (Bohag) Bihu 2027". */
  name: string;
  /** Short factual line under the headline. */
  note: string;
  /** The moment the countdown ends — ISO 8601 with timezone. */
  date: string;
};

export const countdown = {
  /** Master switch. */
  enabled: true,

  /** Small label above the headline. */
  eyebrow: "Countdown to",

  /** Friendly, claim-free invitation shown under the festival note. */
  invite: "Planning to visit Dibrugarh? Message us to plan your stay.",

  /** Optional call-to-action button. */
  ctaLabel: "Plan your stay",
  ctaHref: "/#book",

  /** Upcoming festivals, in date order. Real fixed dates only. */
  events: [
    { name: "Magh (Bhogali) Bihu 2027", note: "Assam's harvest festival · 14 January 2027", date: "2027-01-14T00:00:00+05:30" },
    { name: "Rongali (Bohag) Bihu 2027", note: "Assamese New Year festival · begins 14 April 2027", date: "2027-04-14T00:00:00+05:30" },
    { name: "Magh (Bhogali) Bihu 2028", note: "Assam's harvest festival · 14 January 2028", date: "2028-01-14T00:00:00+05:30" },
    { name: "Rongali (Bohag) Bihu 2028", note: "Assamese New Year festival · begins 14 April 2028", date: "2028-04-14T00:00:00+05:30" },
  ] as CountdownEvent[],
};

/** The first event that has not happened yet (null when every event has passed). */
export function nextCountdownEvent(now: number): CountdownEvent | null {
  return countdown.events.find((e) => Date.parse(e.date) > now) ?? null;
}

/**
 * GUEST REVIEWS — genuine reviews only.
 *
 * Add a review here ONLY if it was given to us by the owner, or it is a publicly verifiable review
 * (e.g. on the Google Business Profile). Never invent names, text or ratings. Each entry appears on the
 * homepage "Guest Reviews & Experiences" section automatically (and the "Reviews" menu link switches on).
 *
 * Example of the shape (do NOT paste example text as a real review):
 *   {
 *     name: "<guest's real name as shown / permitted>",
 *     location: "<city or country, as they gave it>",
 *     rating: 5,                              // 1-5, exactly as the guest rated
 *     text: "<the review, word for word>",
 *     date: "<e.g. March 2026>",
 *     source: "Google",                       // optional: "Google" | "Owner-provided" | any platform name
 *     url: "<link to the public review>",     // optional: shown as "View on Google"
 *   }
 */
export type Review = {
  name: string;
  location: string;
  /** 1-5, exactly as the guest rated. */
  rating: number;
  /** The review text, word for word. */
  text: string;
  /** Free text, e.g. "March 2026". */
  date: string;
  /** A video review (shows a play icon instead of stars). */
  video?: boolean;
  /** Where the review comes from, e.g. "Google". */
  source?: string;
  /** Link to the public review (shown when source is Google). */
  url?: string;
};

export const reviewsConfig = {
  /**
   * The VERIFIED Google Business Profile reviews link (e.g. the "Read reviews" / "g.page/r/…" URL).
   * Leave empty until confirmed with the owner — the "Read More Reviews on Google" button only appears
   * once this is filled in.
   */
  googleReviewsUrl: "",
};

// Add real guest reviews here.
export const reviews: Review[] = [];

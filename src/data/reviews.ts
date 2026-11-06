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
   * The owner-authorised Google reviews link. The "Read Guest Reviews on Google" button only appears
   * while this is filled in.
   */
  googleReviewsUrl:
    "https://www.google.com/travel/hotels/entity/CgoInfWA9buiut9oEAE/reviews?q=homestay%20by%20tea%20garden&g2lb=4965990%2C72471280%2C72573224%2C72686036%2C72803964%2C72882230%2C73064764%2C121529350%2C121608706%2C121738283%2C121921501%2C121951222%2C122078727%2C122093076%2C122097177%2C122121968%2C122147524%2C122201283&hl=en-IN&gl=in&cs=1&ssta=1&ts=CAEaSQorEicyJTB4Mzc0MDk5MjJjMmU2YjMxZjoweDY4YmVlOTEzYmVhMDNhOWQaABIaEhQKBwjqDxALGAgSBwjqDxALGAkYATICEAAqCQoFOgNJTlIaAA&qs=CAE4AkIJCZ06oL4T6b5o&ap=MAA&ictx=111&utm_campaign=sharing&utm_medium=link&utm_source=htls",
};

// Add real guest reviews here.
export const reviews: Review[] = [];

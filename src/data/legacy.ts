// ─────────────────────────────────────────────────────────────────────────────
// BRAND / LEGACY CONTENT — edit this file to update the Legacy, Award,
// Journey and Why-Choose-Us sections. Nothing here is invented: every claim
// below was supplied by the owner and is marked with its confirmation status.
//
//   • "OWNER-STATED"  — given to us by the owner, not yet independently verified.
//   • "OWNER TO PROVIDE" — left blank on purpose; the UI hides it until filled in.
// ─────────────────────────────────────────────────────────────────────────────

export type AwardImage = {
  /** Path under /public, e.g. "/images/homestay/awards/award-trophy.webp". */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export const legacy = {
  /** OWNER-STATED: "more than 10 years of hospitality experience". */
  yearsLabel: "10+",

  /** OWNER-STATED: the first homestay in Dibrugarh and the first luxury homestay in North East India. */
  pioneerLine: "Established in 2016 as the first homestay in Dibrugarh and the first luxury homestay in the entire North East India.",

  /** OWNER-STATED: established in 2016. Appears in the Journey timeline and in the search-engine data. */
  foundedYear: "2016",

  award: {
    /** OWNER-STATED: the owner says the homestay received a Best Homestay / Best Hospitality award. */
    title: "Best Homestay / Best Hospitality Award",
    /** OWNER-STATED: the award was presented by the Government of Assam. */
    organisation: "Government of Assam",
    /** OWNER TO PROVIDE: year the award was received. */
    year: "",
    /** OWNER TO PROVIDE (optional): a sentence about the award. */
    note: "",
    /**
     * OWNER TO PROVIDE: the real award photograph and certificate.
     * 1. Put the files in /public/images/homestay/awards/ (WebP or JPG).
     * 2. Add one entry per image below, e.g.
     *    { src: "/images/homestay/awards/trophy.webp", alt: "Best Homestay award trophy presented to Homestay by the Tea Garden", width: 1200, height: 900, caption: "The award" }
     * They then appear in the Award Recognition section automatically.
     */
    images: [] as AwardImage[],
  },

  /**
   * OUR JOURNEY timeline. Only facts the owner has given us — no dates are
   * invented. Add a `year` (e.g. "2013") to any step once the owner confirms it.
   */
  journey: [
    {
      label: "The beginning",
      year: "", // OWNER TO PROVIDE
      title: "A homestay in Dibrugarh",
      text: "Homestay by the Tea Garden began welcoming guests in Dibrugarh — the city's first homestay and the first luxury homestay in the entire North East India.",
    },
    {
      label: "A decade of welcome",
      year: "",
      title: "Over ten years of hospitality",
      text: "More than ten years of hosting guests with traditional Assamese hospitality.",
    },
    {
      label: "Recognition",
      year: "", // OWNER TO PROVIDE (year of the award)
      title: "Recognised for hospitality",
      text: "The homestay received a Best Homestay / Best Hospitality award.",
    },
    {
      label: "Today",
      year: "",
      title: "Themed rooms by the tea garden",
      // The room counts are filled in from the rooms data ({total} = all rooms, {themed} = themed rooms).
      text: "{total} rooms in Seujpur, Dibrugarh — including {themed} individually themed rooms: Gold, White, Green, Blue, Black, Yellow, Pink and Red — plus a separate Party Room.",
    },
  ],
};

/** True once the owner has supplied who gave the award and when — only then is it
 * allowed into the structured data that search engines read. */
export const awardIsVerified = Boolean(legacy.award.organisation && legacy.award.year);

/** "Best Homestay / Best Hospitality Award, presented by X in 2024" — built only from filled-in fields. */
export function awardSentence() {
  const { title, organisation, year } = legacy.award;
  let s = `Recipient of the ${title}`;
  if (organisation) s += `, presented by ${organisation}`;
  if (year) s += ` in ${year}`;
  return `${s}.`;
}

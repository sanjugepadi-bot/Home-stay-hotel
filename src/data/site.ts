// ── Website address ─────────────────────────────────────────────────────────
// Set NEXT_PUBLIC_SITE_URL to the final production domain, e.g.
//   NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
// (in Vercel: Project → Settings → Environment Variables, then redeploy).
// It drives canonical URLs, the sitemap, robots.txt, Open Graph and structured data.
//
// Until it is set, the site is deliberately marked NOINDEX and robots.txt blocks
// crawling, so a temporary/demo address can never be indexed as a duplicate of
// the real site. Setting the variable switches indexing on automatically.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
// Vercel "Preview" deployments (branches / pull requests) must never be indexed, even
// if the domain variable happens to be set for every environment.
const isVercelPreview = process.env.VERCEL_ENV === "preview";
const resolvedUrl =
  configuredUrl || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

// Details below come from the owner's brochure / price list. Anything not
// provided by the owner is left empty and the UI hides it automatically.
export const site = {
  name: "Homestay by the Tea Garden",
  shortName: "Tea Garden Homestay",
  url: resolvedUrl,
  /** True only once a real production domain has been configured (and never on Vercel previews). */
  indexable: Boolean(configuredUrl) && !isVercelPreview,
  /** Date the site content was last meaningfully updated (used as sitemap lastmod). Update when content changes. */
  contentUpdated: "2026-11-04",
  tagline: "A Legacy of Hospitality in Dibrugarh",
  subheadline: "Over a decade of welcoming guests with warmth, unique stays and memorable experiences.",
  // Search-result / social-share description (~150 characters).
  metaDescription:
    "Award-winning homestay in Dibrugarh, Assam with 10+ years of hospitality, eight themed guest rooms and a separate Party Room. Unique accommodation in Dibrugarh, by the tea garden.",
  // Used for the page's keyword tags only; the visible copy uses them naturally.
  keywords: [
    "homestay in Dibrugarh",
    "unique homestay in Assam",
    "award-winning homestay in Dibrugarh",
    "accommodation in Dibrugarh",
    "themed rooms",
    "Seujpur",
  ],
  description:
    "Homestay by the Tea Garden is a homestay in Seujpur, Dibrugarh, Assam, with 9 rooms: eight individually themed guest rooms — Gold, White, Green, Blue, Black, Yellow, Pink and Red — and a separate Party Room, with traditional Assamese hospitality.",
  location: {
    label: "Dibrugarh, Assam, India",
    locality: "Dibrugarh",
    region: "Assam",
    postalCode: "786001",
    country: "IN",
    streetAddress: "Lane 6, Seujpur, Opposite Jalan Tea Garden",
    address: "Lane 6, Seujpur, Opposite Jalan Tea Garden, Dibrugarh 786001, Assam, India",
    // Dibrugarh city centre — used only for the weather widget.
    lat: 27.4728,
    lng: 94.912,
  },
  phones: ["+91 9899997370", "+91 9531356250"],
  // Confirmed by the owner as the homestay's WhatsApp number.
  whatsapp: "919899997370",
  email: "",
  social: { instagram: "", facebook: "", youtube: "" },
  // Add a Matterport / 360 embed URL to enable the Virtual Tour section.
  virtualTourUrl: "",
  /**
   * Owner-confirmed features used in the search-engine (structured) data.
   * Only add an item once the owner has confirmed it — Wi-Fi, parking, AC, pets
   * and check-in/out times are NOT listed because they are not yet confirmed.
   */
  confirmedFeatures: [
    "Breakfast included in the Gold, White, Green, Blue, Black and Yellow room rates",
    "Ground-floor room with a private kitchen (Yellow Room)",
    "Balconies facing or overlooking a tea garden (White, Blue and Pink rooms)",
    "Individually themed rooms",
  ],
};

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

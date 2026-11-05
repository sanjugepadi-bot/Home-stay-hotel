import type { Metadata } from "next";
import { site } from "@/data/site";

/** Homepage <title>: leads with the search phrase, brand last (≤ 60 characters). */
export const homeTitle = "Homestay in Dibrugarh, Assam | Homestay by the Tea Garden";

/** Share image (Open Graph / Twitter): a real property photograph, 1200×630. */
export const ogImage = {
  url: "/images/homestay/og/og-gold-room-homestay-by-the-tea-garden.jpg",
  width: 1200,
  height: 630,
  alt: "The Gold Room at Homestay by the Tea Garden in Dibrugarh, with a gilded bed and painted ceiling",
};

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter tags.
 * `path` is relative ("/" or "/contact"); it is resolved against `metadataBase`
 * (the site's production domain) so every URL is absolute and consistent.
 */
export function buildMetadata({
  title,
  socialTitle,
  description,
  path,
  image = ogImage,
}: {
  title: Metadata["title"];
  socialTitle: string;
  description: string;
  path: string;
  /** Share image; defaults to the site-wide property photo. */
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_IN",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [image] },
  };
}

/** Absolute URL for a site path or a static asset path. */
export function absoluteUrl(path: string) {
  // The home page's canonical URL is the bare domain (no trailing slash) — keep every
  // reference to it (breadcrumbs, schema, sitemap) identical to that canonical.
  if (path === "/") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

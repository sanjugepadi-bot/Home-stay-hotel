import { site } from "@/data/site";
import { faqs } from "@/data/faqs";
import { rooms, lowestRoomPrice, highestRoomPrice, roomPath, roomsWithPages, type Room } from "@/data/rooms";
import { gallery } from "@/data/gallery";
import { legacy } from "@/data/legacy";
import { photos } from "@/lib/photos";
import { absoluteUrl } from "@/lib/seo";

/*
 * Structured data (schema.org JSON-LD).
 *
 * RULES — only owner-confirmed facts go in here:
 *   • included: name, address, phones, price range, 8 themed rooms, owner-confirmed
 *     features, the award *title*, and real property photographs.
 *   • deliberately NOT included (not confirmed): geo coordinates, check-in/out times,
 *     Wi-Fi / parking / AC / pets, ratings or reviews, distances, founding year.
 *   • foundingDate / social links / email / award organiser+year are added
 *     automatically as soon as they are filled in (legacy.ts / site.ts).
 */

const lodgingId = `${site.url}/#lodging`;
const websiteId = `${site.url}/#website`;

/** Cover photograph of a room, as an absolute image URL. */
function roomCoverUrl(room: (typeof rooms)[number]) {
  const key = room.gallery?.[0]?.photoKey ?? room.photoKey;
  return key ? absoluteUrl(photos[key].src) : undefined;
}

function awardText() {
  const { title, organisation, year } = legacy.award;
  let s = title;
  if (organisation) s += ` — ${organisation}`;
  if (year) s += ` (${year})`;
  return s;
}

function lodgingNode() {
  const covers = rooms.map(roomCoverUrl).filter((u): u is string => Boolean(u));
  const sameAs = Object.values(site.social).filter(Boolean);

  return {
    "@type": ["LodgingBusiness", "LocalBusiness"],
    "@id": lodgingId,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    image: covers,
    telephone: site.phones[0],
    contactPoint: site.phones.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      contactType: "reservations",
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.streetAddress,
      addressLocality: site.location.locality,
      addressRegion: site.location.region,
      postalCode: site.location.postalCode,
      addressCountry: site.location.country,
    },
    priceRange: `₹${lowestRoomPrice.toLocaleString("en-IN")}–₹${highestRoomPrice.toLocaleString("en-IN")}`,
    numberOfRooms: rooms.length,
    amenityFeature: site.confirmedFeatures.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    containsPlace: rooms.map((room) => ({
      "@type": "HotelRoom",
      name: room.name,
      description: room.description,
      ...(roomCoverUrl(room) ? { image: roomCoverUrl(room) } : {}),
    })),
    award: awardText(),
    ...(legacy.foundedYear ? { foundingDate: legacy.foundedYear } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": lodgingId },
  };
}

/** Site-wide data: the lodging business + the website. Rendered in the root layout. */
export function lodgingBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [lodgingNode(), websiteNode()],
  };
}

/** Contact page: ContactPage + breadcrumb trail (Home › Contact). */
export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${site.url}/contact#page`,
        url: absoluteUrl("/contact"),
        name: `Contact ${site.name}`,
        isPartOf: { "@id": websiteId },
        about: { "@id": lodgingId },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Contact", item: absoluteUrl("/contact") },
        ],
      },
    ],
  };
}

/** Breadcrumb trail as schema.org data. Pass crumbs in order, last one = current page. */
function breadcrumbNode(crumbs: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** /rooms — a collection page listing every room that has its own page. */
export function roomsIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/rooms")}#page`,
        url: absoluteUrl("/rooms"),
        name: `Rooms & rates at ${site.name}, Dibrugarh`,
        isPartOf: { "@id": websiteId },
        about: { "@id": lodgingId },
        inLanguage: "en-IN",
      },
      {
        "@type": "ItemList",
        itemListElement: roomsWithPages.map((r, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: r.name,
          url: absoluteUrl(roomPath(r)),
        })),
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Rooms", path: "/rooms" },
      ]),
    ],
  };
}

/** /rooms/[slug] — one themed room, with all of its photographs. */
export function roomPageJsonLd(room: Room) {
  const images = (room.gallery ?? []).map((p) => absoluteUrl(photos[p.photoKey].src));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HotelRoom",
        "@id": `${absoluteUrl(roomPath(room))}#room`,
        url: absoluteUrl(roomPath(room)),
        name: `${room.name} — ${site.name}`,
        description: room.description,
        image: images,
        containedInPlace: { "@id": lodgingId },
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Rooms", path: "/rooms" },
        { name: room.name, path: roomPath(room) },
      ]),
    ],
  };
}

/** /gallery — an image gallery; every photo with its own caption and description. */
export function galleryPageJsonLd() {
  const seen = new Set<string>();
  const images = gallery
    .filter((g) => (seen.has(g.photoKey) ? false : (seen.add(g.photoKey), true)))
    .map((g) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(photos[g.photoKey].src),
      name: g.caption,
      description: g.alt,
    }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": `${absoluteUrl("/gallery")}#page`,
        url: absoluteUrl("/gallery"),
        name: `Photo gallery — ${site.name}, Dibrugarh`,
        isPartOf: { "@id": websiteId },
        about: { "@id": lodgingId },
        image: images,
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "Gallery", path: "/gallery" },
      ]),
    ],
  };
}

/** /about — the story page. */
export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${absoluteUrl("/about")}#page`,
        url: absoluteUrl("/about"),
        name: `About ${site.name}`,
        isPartOf: { "@id": websiteId },
        about: { "@id": lodgingId },
        inLanguage: "en-IN",
      },
      breadcrumbNode([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { gallery } from "@/data/gallery";
import { roomPath, roomsWithPages } from "@/data/rooms";
import type { PhotoKey } from "@/lib/photos";
import { photoPublicPath } from "@/lib/photo-urls";
import { partyRoom, partyPhotoPath } from "@/data/party-room";
import { absoluteUrl } from "@/lib/seo";

/** Absolute, crawlable image URLs (descriptive filenames) for a set of photos. */
function imageUrls(keys: PhotoKey[]) {
  return [...new Set(keys.map((k) => absoluteUrl(photoPublicPath[k])))];
}

export default function sitemap(): MetadataRoute.Sitemap {
  // A closed (noindex) site must not advertise URLs.
  if (!site.indexable) return [];

  const lastModified = new Date(site.contentUpdated);
  const coverKeys = gallery.filter((g) => !g.extra).map((g) => g.photoKey);

  return [
    // Home URL written exactly as its canonical tag is (no trailing slash on the bare domain).
    { url: site.url, lastModified, images: imageUrls(coverKeys) },
    { url: absoluteUrl("/rooms"), lastModified },
    ...roomsWithPages.map((room) => ({
      url: absoluteUrl(roomPath(room)),
      lastModified,
      images: imageUrls((room.gallery ?? []).map((p) => p.photoKey)),
    })),
    { url: absoluteUrl("/gallery"), lastModified, images: imageUrls(gallery.map((g) => g.photoKey)) },
    { url: absoluteUrl("/party-room"), lastModified, images: partyRoom.photos.map((p) => absoluteUrl(partyPhotoPath(p.id))) },
    { url: absoluteUrl("/about"), lastModified },
    { url: absoluteUrl("/contact"), lastModified },
  ];
}

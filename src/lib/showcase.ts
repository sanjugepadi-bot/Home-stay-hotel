import fs from "node:fs";
import path from "node:path";

/**
 * AI-generated, ILLUSTRATIVE showcase images for the "Our Legacy" room trio.
 *
 * Drop a file in public/images/homestay/showcase/ named gold-room.webp, blue-room.webp or black-room.webp
 * — `node scripts/prepare-showcase-image.cjs <file> <gold|blue|black>` prepares it. Nothing else needs editing.
 * Each room that has a file shows it (with an "AI Illustration" label); rooms without one keep the owner's
 * photograph. When all three exist the trio switches to a matching landscape format. The owner's photographs
 * always remain in each room's gallery / room page.
 */
export const SHOWCASE_IDS = ["gold", "blue", "black"] as const;
export type ShowcaseId = (typeof SHOWCASE_IDS)[number];

export const SHOWCASE_SIZE = { width: 1920, height: 1080 } as const;

export function getShowcaseImages(): Partial<Record<ShowcaseId, string>> {
  const out: Partial<Record<ShowcaseId, string>> = {};
  for (const id of SHOWCASE_IDS) {
    const rel = `/images/homestay/showcase/${id}-room.webp`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) out[id] = rel;
  }
  return out;
}

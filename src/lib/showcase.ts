import fs from "node:fs";
import path from "node:path";

/**
 * AI-generated, ILLUSTRATIVE showcase images for the Gold / Blue / Black rooms.
 *
 * Drop a file in public/images/homestay/showcase/ named  gold-room.webp, blue-room.webp or black-room.webp
 * (or gold-room-v2.webp, gold-room-v3.webp … — the highest version wins, which also avoids stale CDN caches
 * when an image is replaced). Nothing else needs editing. Each room that has a file shows it with an
 * "AI Illustration" label; rooms without one keep the owner's photograph. The owner's photographs always
 * remain in each room's gallery / room page.
 */
export const SHOWCASE_IDS = ["gold", "blue", "black"] as const;
export type ShowcaseId = (typeof SHOWCASE_IDS)[number];

const DIR = "/images/homestay/showcase";

export function getShowcaseImages(): Partial<Record<ShowcaseId, string>> {
  const out: Partial<Record<ShowcaseId, string>> = {};
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", DIR));
  } catch {
    return out;
  }
  for (const id of SHOWCASE_IDS) {
    const re = new RegExp(String.raw`^${id}-room(?:-v(\d+))?\.webp$`);
    let best: { file: string; v: number } | null = null;
    for (const f of files) {
      const m = re.exec(f);
      if (!m) continue;
      const v = m[1] ? Number(m[1]) : 0;
      if (!best || v > best.v) best = { file: f, v };
    }
    if (best) out[id] = `${DIR}/${best.file}`;
  }
  return out;
}

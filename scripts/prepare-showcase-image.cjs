// Usage: node scripts/prepare-showcase-image.cjs <input-image> <gold|blue|black> [--force]
// Converts a supplied image to the exact showcase format: 1920x1080 landscape WebP (cover-cropped, no sharpening).
// Refuses images narrower than 1920 px (to avoid enlarging) unless --force (enlarge) or --native (keep own size) is given.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const [input, id, flag] = process.argv.slice(2);
if (!input || !["gold", "blue", "black"].includes(id)) {
  console.error("Usage: node scripts/prepare-showcase-image.cjs <input-image> <gold|blue|black> [--force]");
  process.exit(1);
}
(async () => {
  const meta = await sharp(input).metadata();
  console.log(`input: ${meta.width}x${meta.height} ${meta.format}`);
  if (meta.width < 1920 && flag !== "--force" && flag !== "--native") {
    console.error(`Too small (${meta.width}px wide, need >= 1920). Ask for the full-resolution file, use --native to keep it at its own size, or --force to enlarge it (will look softer).`);
    process.exit(2);
  }
  const outDir = path.join(__dirname, "..", "public", "images", "homestay", "showcase");
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `${id}-room.webp`);
  const pipeline = flag === "--native" ? sharp(input) : sharp(input).resize(1920, 1080, { fit: "cover", position: "centre" });
  const info = await pipeline.webp({ quality: 90, effort: 6 }).toFile(out);
  console.log(`wrote ${path.relative(process.cwd(), out)}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
})();

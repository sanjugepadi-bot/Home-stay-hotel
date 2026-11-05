import type { NextConfig } from "next";

// Reminder shown during production builds when the real domain isn't configured:
// without it the site is built as NOINDEX (see src/data/site.ts).
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set — this build is marked noindex and robots.txt blocks crawlers.\n" +
      "   Set it to your production domain (e.g. https://www.yourdomain.com) before launch.\n"
  );
}

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
};

export default nextConfig;

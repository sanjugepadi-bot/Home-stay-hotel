import type { NextConfig } from "next";

// Reminder shown during production builds when the real domain isn't configured:
// without it the site is built as NOINDEX (see src/data/site.ts).
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set — this build is marked noindex and robots.txt blocks crawlers.\n" +
      "   Set it to your production domain (e.g. https://www.yourdomain.com) before launch.\n"
  );
}

/**
 * Same rule as `site.indexable` in src/data/site.ts: the site is only open to search engines when a real
 * production domain is configured AND this is not a Vercel preview deployment. Everywhere else an
 * `X-Robots-Tag: noindex` HTTP header is added as a second, independent safeguard (on top of the
 * <meta robots> tag and robots.txt), so previews/temporary URLs can never be indexed by accident.
 */
const closedToSearchEngines = !process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.VERCEL_ENV === "preview";

const isProd = process.env.NODE_ENV === "production";

// Content-Security-Policy. Next.js needs inline bootstrap scripts/styles, so 'unsafe-inline' is kept for those;
// everything else is locked down. Allowed third parties: Open-Meteo (weather) and Google Maps (embedded map).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.open-meteo.com",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Content-Security-Policy", value: csp },
          ...(closedToSearchEngines ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        ],
      },
    ];
  },
};

export default nextConfig;

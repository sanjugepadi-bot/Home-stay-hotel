import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { BookingProvider } from "@/components/booking/BookingContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { StickyBookingBar } from "@/components/layout/StickyBookingBar";
import { LeadCapturePopup } from "@/components/layout/LeadCapturePopup";
import { site } from "@/data/site";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { homeTitle, ogImage } from "@/lib/seo";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s | ${site.name}`,
  },
  description: site.metaDescription,
  applicationName: site.name,
  keywords: [...site.keywords, site.location.label],
  // Indexing is only switched on once the production domain is configured
  // (NEXT_PUBLIC_SITE_URL) — see src/data/site.ts.
  robots: site.indexable
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
      }
    : { index: false, follow: false },
  // Fallback social tags (e.g. for the 404 page); each real page sets its own.
  openGraph: {
    title: homeTitle,
    description: site.metaDescription,
    siteName: site.name,
    type: "website",
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.metaDescription,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${playfair.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <BookingProvider>
            <ScrollProgress />
            <Navbar />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <StickyBookingBar />
            <LeadCapturePopup />
          </BookingProvider>
        </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

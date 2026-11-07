import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Navigation, Phone, Plane, Train } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/booking/BookingForm";
import { site, phoneHref } from "@/data/site";
import { directionsUrl, locationInfo } from "@/data/location";
import { buildMetadata } from "@/lib/seo";
import { contactPageJsonLd } from "@/lib/structured-data";
import { BusinessJsonLd } from "@/components/seo/BusinessJsonLd";

const contactTitle = `Contact & Book | ${site.name}, Dibrugarh`;

export const metadata: Metadata = buildMetadata({
  title: { absolute: contactTitle },
  socialTitle: contactTitle,
  description: `Call, WhatsApp or send a booking enquiry to ${site.name} in Seujpur, Dibrugarh. Ask about room rates, availability and the Party Room.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <BusinessJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd()) }}
      />
      <Container className="max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="rounded-sm underline-offset-4 hover:text-gold-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-foreground">Contact</li>
          </ol>
        </nav>

        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Contact us & book your stay in Dibrugarh"
          description="We'd love to hear from you — call, WhatsApp or send a booking request."
          align="left"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-5">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
              <p className="text-sm leading-relaxed text-muted-foreground">{site.location.address}</p>
            </div>
            <section aria-labelledby="getting-here" className="rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
              <h2 id="getting-here" className="font-display text-xl text-foreground">Getting to us in Seujpur</h2>
              <ul className="mt-4 space-y-3">
                {locationInfo.travel.map((t) => (
                  <li key={t.id} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-deep">
                      {t.id === "airport" ? <Plane className="h-4.5 w-4.5" aria-hidden /> : <Train className="h-4.5 w-4.5" aria-hidden />}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">{t.time}</span> from {t.place}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-gold-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  <Navigation className="h-4 w-4" aria-hidden /> Get directions
                </a>
                <Link href="/#location" className="inline-flex min-h-11 items-center font-semibold text-gold-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  About our location →
                </Link>
              </div>
            </section>
            {site.mapEmbedUrl && (
              <iframe
                title={`Map showing the location of ${site.name}`}
                src={site.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full rounded-xl border border-border"
              />
            )}
            {site.phones.map((phone) => (
              <a
                key={phone}
                href={phoneHref(phone)}
                className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] transition-colors hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Phone className="h-5 w-5 shrink-0 text-gold-deep" />
                <p className="text-sm text-muted-foreground">{phone}</p>
              </a>
            ))}
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] transition-colors hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Mail className="h-5 w-5 shrink-0 text-gold-deep" />
                <p className="text-sm text-muted-foreground">{site.email}</p>
              </a>
            )}
            <p className="px-1 text-sm leading-relaxed text-muted-foreground">
              Still choosing? Browse our{" "}
              <Link href="/rooms" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
                themed rooms and rates
              </Link>
              , see the{" "}
              <Link href="/gallery" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
                photo gallery
              </Link>
              , learn{" "}
              <Link href="/about" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
                about us
              </Link>{" "}
              or read the{" "}
              <Link href="/#faq" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
                frequently asked questions
              </Link>
              .
            </p>
          </div>

          <BookingForm />
        </div>
      </Container>
    </div>
  );
}

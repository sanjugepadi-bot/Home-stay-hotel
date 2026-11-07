import type { Metadata } from "next";
import Link from "next/link";
import { BedDouble, Check, MessageCircle, Phone, PartyPopper, TreePine } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buttonVariants } from "@/components/ui/Button";
import { PartyRoomPhotos } from "@/components/home/PartyRoomPhotos";
import { BusinessJsonLd } from "@/components/seo/BusinessJsonLd";
import {
  PARTY_ROOM_CAPACITY,
  PARTY_ROOM_SLEEPS,
  partyPhotoPath,
  partyRoom,
  partyRoomFaqs,
  partyRoomUseCases,
} from "@/data/party-room";
import { TOTAL_ROOMS, rooms } from "@/data/rooms";
import { phoneHref, site, whatsappLink } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { partyRoomPageJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

const title = `Party Room in Dibrugarh | ${site.name}`;
const cover = partyRoom.photos[0];

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  socialTitle: title,
  description: `Spacious Party Room at ${site.name}, Dibrugarh: hosts up to ${PARTY_ROOM_CAPACITY} guests, with a sound system, psychedelic lighting, kitchen and bar counter.`,
  path: "/party-room",
  ...(cover
    ? { image: { url: partyPhotoPath(cover.id), width: cover.src.width, height: cover.src.height, alt: cover.alt } }
    : {}),
});

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export default function PartyRoomPage() {
  const waLink = whatsappLink(`Hi ${site.name}! I'd like to know about the Party Room.`);

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <BusinessJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(partyRoomPageJsonLd()) }} />

      <Container className="max-w-6xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Party Room" }]} />

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div className="min-w-0">
            <SectionHeading
              as="h1"
              align="left"
              eyebrow="Also at the homestay"
              title="Party Room in Dibrugarh for celebrations & private events"
              description={partyRoom.description[0]}
            />

            <ul className="mt-6 flex flex-wrap gap-2">
              {[`Up to ${PARTY_ROOM_CAPACITY} guests`, `Sleeps up to ${PARTY_ROOM_SLEEPS}`, "Tea-garden views"].map((f) => (
                <li key={f} className="rounded-full border border-gold-deep/30 bg-gold/10 px-3.5 py-1.5 text-sm font-semibold text-gold-deep">
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "whatsapp", size: "lg" })}>
                <MessageCircle className="h-5 w-5" aria-hidden /> Ask about the Party Room
              </a>
              <a href={phoneHref(site.phones[0])} className={buttonVariants({ variant: "outline", size: "lg" })}>
                <Phone className="h-5 w-5" aria-hidden /> Call {site.phones[0]}
              </a>
            </div>
          </div>

          <PartyRoomPhotos photos={partyRoom.photos} priority />
        </div>

        <section aria-labelledby="about-party-room" className="mt-20 max-w-3xl">
          <h2 id="about-party-room" className="font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] text-foreground">
            {partyRoom.descriptionTitle}
          </h2>
          <div className="mt-5 space-y-4 text-[1.0625rem] leading-8 text-muted-foreground">
            {partyRoom.description.slice(1).map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <section aria-labelledby="pr-facilities" className="rounded-2xl border border-border bg-card p-6 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
            <h2 id="pr-facilities" className="flex items-center gap-2 font-display text-xl text-foreground">
              <PartyPopper className="h-5 w-5 text-gold-deep" aria-hidden /> Facilities
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-muted-foreground">
              {["Sound system", "Psychedelic lighting", "Kitchen", "Bar counter"].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden /> {f}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="pr-stay" className="rounded-2xl border border-border bg-card p-6 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
            <h2 id="pr-stay" className="flex items-center gap-2 font-display text-xl text-foreground">
              <BedDouble className="h-5 w-5 text-gold-deep" aria-hidden /> Sleeping arrangements
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Sleeping arrangements for up to {PARTY_ROOM_SLEEPS} guests, with convertible sofa beds — suitable for both
              private celebrations and comfortable overnight stays.
            </p>
          </section>

          <section aria-labelledby="pr-uses" className="rounded-2xl border border-border bg-card p-6 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
            <h2 id="pr-uses" className="flex items-center gap-2 font-display text-xl text-foreground">
              <TreePine className="h-5 w-5 text-gold-deep" aria-hidden /> Ideal for
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-muted-foreground">
              {partyRoomUseCases.map((u) => (
                <li key={u} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden /> {u}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="pr-separate" className="mt-16 rounded-2xl border border-gold-deep/25 bg-gold/10 p-6 sm:p-8">
          <h2 id="pr-separate" className="font-display text-xl text-foreground sm:text-2xl">
            Separate from our {rooms.length} themed guest rooms
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
            The Party Room is the {TOTAL_ROOMS}th room at the homestay and is not one of the {rooms.length} individually
            themed guest bedrooms. Rates and availability are confirmed directly with the host.{" "}
            <Link href="/rooms" className={cn("font-semibold text-gold-deep underline underline-offset-4", focusRing)}>
              See the themed rooms and rates
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="pr-faq" className="mt-16 max-w-3xl">
          <h2 id="pr-faq" className="font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] text-foreground">
            Party Room — frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
            {partyRoomFaqs.map((f) => (
              <details key={f.question} className="group p-5">
                <summary className={cn("flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-md font-semibold text-foreground", focusRing)}>
                  {f.question}
                  <span aria-hidden className="text-xl text-gold-deep transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="pr-enquire" className="mt-16 rounded-[2rem] bg-forest p-8 text-beige-light sm:p-12">
          <h2 id="pr-enquire" className="font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)]">
            Planning a celebration in Dibrugarh?
          </h2>
          <p className="mt-3 max-w-2xl text-beige-light/85">
            Tell the host the occasion, date and number of guests — they will confirm availability and rates directly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "whatsapp", size: "lg" })}>
              <MessageCircle className="h-5 w-5" aria-hidden /> WhatsApp the host
            </a>
            <Link href="/contact" className={cn(buttonVariants({ variant: "gold", size: "lg" }))}>
              Send an enquiry
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}

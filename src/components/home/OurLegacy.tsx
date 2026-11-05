import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, CalendarClock, HeartHandshake, Landmark } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { legacy } from "@/data/legacy";
import { rooms, roomHasPage, roomPath } from "@/data/rooms";
import { photos } from "@/lib/photos";

const pillars = [
  {
    icon: CalendarClock,
    title: `${legacy.yearsLabel} Years of Hospitality`,
    text: "Over a decade of welcoming guests to Dibrugarh, Assam.",
  },
  {
    icon: Landmark,
    title: "Pioneer in Dibrugarh’s Homestay Industry",
    text: legacy.pioneerLine,
  },
  {
    icon: Award,
    title: "Award-Winning Recognition",
    text: `Recipient of the ${legacy.award.title}.`,
  },
  {
    icon: HeartHandshake,
    title: "Guest-Centred Hospitality",
    text: "Traditional Assamese hospitality, with every stay arranged directly with the host.",
  },
];

/** Cover photo of a room, taken from that room's own photo set. */
function cover(roomId: string) {
  const room = rooms.find((r) => r.id === roomId);
  const photo = room?.gallery?.[0];
  return room && photo
    ? { name: room.name, src: photos[photo.photoKey], alt: photo.alt, href: roomHasPage(room) ? roomPath(room) : null }
    : null;
}

export function OurLegacy() {
  const tiles = ["gold", "blue", "black"].map(cover).filter((t): t is NonNullable<ReturnType<typeof cover>> => t !== null);

  return (
    <section id="legacy" className="relative isolate scroll-mt-20 overflow-hidden bg-forest py-20 text-beige-light sm:py-28">
      {/* soft gold glow, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <Container>
        {/* Story + milestone */}
        <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              tone="inverted"
              align="left"
              eyebrow="Our Legacy"
              title="Over a decade of welcoming guests to Dibrugarh"
              description="Homestay by the Tea Garden has been offering homestay accommodation in Dibrugarh, Assam for more than ten years — a pioneer in the city’s homestay scene, recognised for its hospitality and its distinctive themed bedrooms."
              className="max-w-2xl"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5 lg:items-end lg:text-right">
              <div className="flex items-end gap-3 border-l-2 border-gold/60 pl-4 sm:gap-4 sm:pl-5 lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-5">
                <span className="font-display text-6xl leading-none text-gold sm:text-7xl">{legacy.yearsLabel}</span>
                <span className="min-w-0 pb-1 text-left text-xs font-semibold uppercase tracking-[0.14em] text-beige-light/80 sm:text-sm sm:tracking-[0.18em]">
                  years of
                  <br />
                  hospitality
                </span>
              </div>
              <Link
                href="/about"
                className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-light underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Read our story and journey
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Three equal, evenly spaced room portraits */}
        {tiles.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-5 lg:mt-16 lg:gap-8">
            {tiles.map((t, i) => {
              const frame = (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-black/30 ring-1 ring-beige-light/15 sm:aspect-[4/5]">
                    <Image
                      src={t.src}
                      alt={t.alt}
                      fill
                      sizes="(min-width: 1280px) 384px, (min-width: 640px) 31vw, 92vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/60 to-transparent" />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <span aria-hidden className="h-px w-8 bg-gold/70 transition-all duration-500 group-hover:w-14" />
                    <span className="font-display text-xl text-beige-light">{t.name}</span>
                  </div>
                </>
              );
              return (
                <Reveal key={t.name} delay={i * 0.08} className="h-full">
                  {t.href ? (
                    <Link
                      href={t.href}
                      aria-label={`${t.name} — room details and photos`}
                      className="group block rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-forest"
                    >
                      {frame}
                    </Link>
                  ) : (
                    <div className="group">{frame}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        )}

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-2xl border border-beige-light/12 bg-beige-light/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-beige-light/[0.07]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg leading-snug text-beige-light">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-beige-light/75">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

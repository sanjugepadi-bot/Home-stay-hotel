import Link from "next/link";
import { Award, CalendarClock, HeartHandshake, Landmark } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { legacy } from "@/data/legacy";
import { rooms } from "@/data/rooms";
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
  return room && photo ? { name: room.name, src: photos[photo.photoKey], alt: photo.alt } : null;
}

export function OurLegacy() {
  const tiles = ["gold", "blue", "black"].map(cover).filter((t): t is NonNullable<ReturnType<typeof cover>> => t !== null);
  const [lead, ...rest] = tiles;

  return (
    <section id="legacy" className="relative isolate scroll-mt-20 overflow-hidden bg-forest py-20 text-beige-light sm:py-28">
      {/* soft gold glow, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              tone="inverted"
              align="left"
              eyebrow="Our Legacy"
              title="Over a decade of welcoming guests to Dibrugarh"
              description="Homestay by the Tea Garden has been offering homestay accommodation in Dibrugarh, Assam for more than ten years — a pioneer in the city’s homestay scene, recognised for its hospitality and its distinctive themed bedrooms."
              className="max-w-xl"
            />
            <div className="mt-8 flex items-end gap-3 border-l-2 border-gold/60 pl-4 sm:gap-4 sm:pl-5">
              <span className="font-display text-5xl leading-none text-gold sm:text-7xl">{legacy.yearsLabel}</span>
              <span className="min-w-0 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-beige-light/80 sm:text-sm sm:tracking-[0.18em]">
                years of
                <br />
                hospitality
              </span>
            </div>
            <Link
              href="/about"
              className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-gold-light underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Read our story and journey →
            </Link>
          </Reveal>

          {lead && (
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <SmartImage
                  icon="Home"
                  aspect="aspect-[16/10]"
                  className="col-span-2 shadow-2xl ring-1 ring-beige-light/10"
                  label={lead.name}
                  src={lead.src}
                  alt={lead.alt}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                {rest.map((t) => (
                  <SmartImage
                    key={t.name}
                    icon="Home"
                    aspect="aspect-[4/3]"
                    className="shadow-xl ring-1 ring-beige-light/10"
                    label={t.name.replace(/^The /, "")}
                    src={t.src}
                    alt={t.alt}
                    sizes="(min-width: 1024px) 22vw, 50vw"
                  />
                ))}
              </div>
            </Reveal>
          )}
        </div>

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

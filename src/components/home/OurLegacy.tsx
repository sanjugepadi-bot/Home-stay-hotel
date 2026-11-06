import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, CalendarClock, HeartHandshake, Landmark, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { LegacyPortal } from "./LegacyPortal";
import { legacy } from "@/data/legacy";
import { rooms, roomCover, roomHasPage, roomPath, type Room } from "@/data/rooms";
import { photos } from "@/lib/photos";
import { getShowcaseImages, type ShowcaseId } from "@/lib/showcase";
import { formatINR } from "@/lib/utils";

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

/** The room, with the photograph chosen as its cover (owner's own photo). */
function featured(roomId: string, illustration?: string) {
  const room = rooms.find((r) => r.id === roomId);
  const photo = room ? roomCover(room) : undefined;
  return room && photo ? { room, src: photos[photo.photoKey], alt: photo.alt, illustration } : null;
}

function RoomFeature({
  room,
  src,
  alt,
  illustration,
}: {
  room: Room;
  src: (typeof photos)[keyof typeof photos];
  alt: string;
  /** Path of an AI-generated, illustrative showcase image (1920x1080). When set it replaces the owner photo on this card only. */
  illustration?: string;
}) {
  const href = roomHasPage(room) ? roomPath(room) : null;
  const image = (
    <Tilt3D className="group/img relative">
      <div
        className={`relative overflow-hidden rounded-[2rem] bg-forest-light shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65),0_0_0_1px_rgba(224,191,118,0.28)] aspect-[4/5]`}
      >
        {illustration ? (
          <Image
            src={illustration}
            alt={`AI illustration of the ${room.name} theme — not a photograph of the actual room`}
            fill
            sizes="(min-width: 1536px) 480px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            quality={90}
            className="object-cover transition-transform duration-[1100ms] ease-out group-hover/img:scale-[1.05]"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1536px) 480px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            quality={90}
            placeholder="blur"
            className="object-cover transition-transform duration-[1100ms] ease-out group-hover/img:scale-[1.05]"
          />
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,240,200,0.14),transparent_40%)]" />
        <div aria-hidden className="room-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/img:opacity-100" />
        {illustration && (
          <span
            title="AI-generated illustration — not a photograph of the actual room. Real photographs are on the room page."
            className="pointer-events-none absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm"
          >
            <Sparkles className="h-3 w-3 text-gold-light" aria-hidden /> AI Illustration
          </span>
        )}
      </div>
    </Tilt3D>
  );

  return (
    <article className="group flex h-full flex-col">
      {href ? (
        <Link
          href={href}
          aria-label={`${room.name} — room details and photos`}
          className="block rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-forest"
        >
          {image}
        </Link>
      ) : (
        image
      )}

      <div className="mt-8 flex flex-1 flex-col">
        <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gold-light">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full ring-2 ring-beige-light/80" style={{ backgroundColor: room.accent }} />
          Room
        </span>
        <h3 className="mt-2 font-display text-[clamp(1.75rem,1.4rem+0.9vw,2.4rem)] font-medium leading-tight text-beige-light">
          {href ? (
            <Link href={href} className="underline-offset-[6px] decoration-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              {room.name}
            </Link>
          ) : (
            room.name
          )}
        </h3>
        <span aria-hidden className="mt-4 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
        <p className="mt-5 text-[1.0625rem] leading-8 text-beige-light/90 xl:text-lg xl:leading-8">{room.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {room.highlights.map((h) => (
            <li key={h} className="rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-sm font-medium text-gold-light">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col items-start gap-4 pt-8"><div className="w-full border-t border-beige-light/15" aria-hidden />
          <div className="min-h-[5.75rem]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-beige-light/70">Room rate</span>
            <p className="font-display text-3xl leading-tight text-beige-light">{formatINR(room.price)}</p>
            {room.includes && <p className="mt-0.5 text-sm text-beige-light/75">{room.includes}</p>}
          </div>
          {href && (
            <Link
              href={href}
              className="group/link inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-gold-light underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Room details &amp; photos
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function OurLegacy() {
  // Illustrative AI images replace the owner photo on a card only where a file exists (see src/lib/showcase.ts).
  const showcase = getShowcaseImages();
  const tiles = (["gold", "blue", "black"] as ShowcaseId[]).map((id) => featured(id, showcase[id])).filter((t): t is NonNullable<ReturnType<typeof featured>> => t !== null);

  return (
    <section
      id="legacy"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[radial-gradient(70rem_40rem_at_88%_6%,rgba(201,162,75,0.16),transparent_60%),radial-gradient(60rem_40rem_at_0%_70%,rgba(63,106,82,0.35),transparent_60%),linear-gradient(180deg,#1a3226_0%,#1f3b2c_45%,#16291f_100%)] py-24 text-beige-light sm:py-28 xl:py-36"
    >
      {/* fine gold hairline arches for depth */}
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-24 -z-10 hidden h-[40rem] w-[26rem] rounded-t-full border border-gold/15 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-[30rem] -z-10 hidden h-[34rem] w-[22rem] rounded-t-full border border-gold/15 xl:block" />

      <Container className="max-w-[96rem] xl:px-12">
        {/* Story + 3D milestone */}
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gold-light sm:text-sm">
              <span className="h-px w-10 bg-gold" aria-hidden /> Our Legacy
            </span>
            <h2 className="font-display text-[clamp(2.4rem,1.3rem+3vw,4.6rem)] font-medium leading-[1.05] tracking-tight text-beige-light">
              Over a decade of welcoming guests to Dibrugarh
            </h2>
            <p className="mt-7 max-w-2xl text-[clamp(1.0625rem,0.95rem+0.45vw,1.3rem)] leading-relaxed text-beige-light/85">
              Homestay by the Tea Garden has been offering homestay accommodation in Dibrugarh, Assam for more than ten years — a pioneer in the city’s homestay scene, recognised for its hospitality and its distinctive themed bedrooms.
            </p>
            <Link
              href="/about"
              className="group/link mt-9 inline-flex min-h-12 items-center gap-2 rounded-full border border-gold/55 px-7 text-base font-semibold text-gold-light transition-colors duration-300 hover:bg-gold hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Read our story and journey
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <LegacyPortal years={legacy.yearsLabel} />
          </Reveal>
        </div>

        {/* Room showcase */}
        {tiles.length > 0 && (
          <div className="mt-24 grid gap-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-10 xl:gap-14">
            {tiles.map((t, i) => (
              <Reveal key={t.room.id} delay={i * 0.08} className="h-full">
                <RoomFeature room={t.room} src={t.src} alt={t.alt} illustration={t.illustration} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Four pillars */}
        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4 xl:gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-b from-beige-light/[0.10] to-beige-light/[0.03] p-8 shadow-[0_24px_50px_-26px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-2 hover:border-gold/55 hover:shadow-[0_34px_60px_-24px_rgba(0,0,0,0.8)]">
                <span aria-hidden className="absolute right-6 top-4 font-display text-6xl leading-none text-beige-light/[0.06]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f1d68f] via-gold to-[#9a742a] text-forest shadow-[0_10px_20px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.5)]">
                  <p.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-7 font-display text-[clamp(1.3rem,1.15rem+0.4vw,1.6rem)] font-medium leading-snug text-beige-light">{p.title}</h3>
                <p className="mt-3 text-base leading-7 text-beige-light/85 xl:text-[1.0625rem]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

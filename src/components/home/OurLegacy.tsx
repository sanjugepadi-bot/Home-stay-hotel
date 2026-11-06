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

/** Colour sets (CSS variables) — each room / pillar gets its own colour so the section is easy to scan. */
type Palette = { c1: string; c2: string; c3: string; edge: string; edge2: string; glow: string; tx: string };
const GOLD: Palette = { c1: "#ffe9a8", c2: "#f5b82e", c3: "#b36a10", edge: "#8a5206", edge2: "#4d2d03", glow: "rgba(255,190,70,0.5)", tx: "#ffd978" };
const BLUE: Palette = { c1: "#cfe6ff", c2: "#4f8cff", c3: "#1d3f9e", edge: "#17327a", edge2: "#0b1c4a", glow: "rgba(79,140,255,0.55)", tx: "#a9d0ff" };
const COPPER: Palette = { c1: "#ffd8bd", c2: "#ff8f5a", c3: "#a8421d", edge: "#7a2f12", edge2: "#3d1707", glow: "rgba(255,143,90,0.5)", tx: "#ffbf9a" };
const MINT: Palette = { c1: "#b9fbe4", c2: "#2fd6a4", c3: "#0f8a6b", edge: "#0b6b52", edge2: "#054030", glow: "rgba(47,214,164,0.5)", tx: "#8ff3cf" };
const ROSE: Palette = { c1: "#ffd0e0", c2: "#f0588f", c3: "#a01a53", edge: "#7b1440", edge2: "#3e0a20", glow: "rgba(240,88,143,0.5)", tx: "#ffb0cc" };
const vars = (p: Palette) =>
  ({ "--c1": p.c1, "--c2": p.c2, "--c3": p.c3, "--edge": p.edge, "--edge2": p.edge2, "--glow": p.glow, "--tx": p.tx }) as React.CSSProperties;

const ROOM_PALETTE: Record<string, Palette> = { gold: GOLD, blue: BLUE, black: COPPER };

const pillars = [
  {
    icon: CalendarClock,
    palette: GOLD,
    title: `${legacy.yearsLabel} Years of Hospitality`,
    text: "Over a decade of welcoming guests to Dibrugarh, Assam.",
  },
  {
    icon: Landmark,
    palette: MINT,
    title: "Pioneer in Dibrugarh’s Homestay Industry",
    text: legacy.pioneerLine,
  },
  {
    icon: Award,
    palette: BLUE,
    title: "Award-Winning Recognition",
    text: `Recipient of the ${legacy.award.title}.`,
  },
  {
    icon: HeartHandshake,
    palette: ROSE,
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
  const pal = ROOM_PALETTE[room.id] ?? GOLD;
  const image = (
    <div className="pop-2 relative [transform-style:preserve-3d]">
      <div
        className="rounded-[1.9rem] p-[5px] [background:linear-gradient(135deg,var(--c1),var(--c2)_50%,var(--c3))] [box-shadow:inset_0_2px_0_rgba(255,255,255,0.55),0_6px_0_var(--edge2),0_36px_50px_-14px_rgba(0,0,0,0.75),0_0_46px_-6px_var(--glow)]"
      >
        <div className="group/img relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#0a2233] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.4)]">
          {illustration ? (
            <Image
              src={illustration}
              alt={`AI illustration of the ${room.name} theme — not a photograph of the actual room`}
              fill
              sizes="(min-width: 1536px) 480px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
              quality={90}
              className="object-cover transition-transform duration-[1100ms] ease-out group-hover/img:scale-[1.06]"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1536px) 480px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
              quality={90}
              placeholder="blur"
              className="object-cover transition-transform duration-[1100ms] ease-out group-hover/img:scale-[1.06]"
            />
          )}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,244,210,0.2),transparent_44%)]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#061a2c]/60 to-transparent" />
          <div aria-hidden className="room-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/img:opacity-100" />
          {illustration && (
            <span
              title="AI-generated illustration — not a photograph of the actual room. Real photographs are on the room page."
              className="pointer-events-none absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3 text-[color:var(--tx)]" aria-hidden /> AI Illustration
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Tilt3D strength={0.7} className="h-full">
      <article
        style={vars(pal)}
        className="tint-card slab group flex h-full flex-col rounded-[2.4rem] border border-white/15 p-4 [transform-style:preserve-3d] sm:p-5"
      >
        {href ? (
          <Link
            href={href}
            aria-label={`${room.name} — room details and photos`}
            className="block rounded-[2rem] [transform-style:preserve-3d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a2b3c]"
          >
            {image}
          </Link>
        ) : (
          image
        )}

        <div className="mt-8 flex flex-1 flex-col px-1.5 pb-1 sm:px-2">
          <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--tx)] sm:text-[0.8rem]">
            <span aria-hidden className="h-3 w-3 rounded-full ring-2 ring-white/90 shadow-[0_0_14px_var(--glow)]" style={{ backgroundColor: room.accent }} />
            Room
          </span>
          <h3 className="pop-1 mt-2 font-display text-[clamp(1.9rem,1.5rem+1vw,2.6rem)] font-medium leading-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
            {href ? (
              <Link href={href} className="underline-offset-[7px] decoration-[color:var(--c2)] decoration-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                {room.name}
              </Link>
            ) : (
              room.name
            )}
          </h3>
          <span aria-hidden className="mt-4 h-[3px] w-20 rounded-full [background:linear-gradient(90deg,var(--c1),var(--c2),transparent)]" />
          <p className="mt-5 text-[1.125rem] leading-8 text-[#f1f6fa] xl:text-[1.2rem] xl:leading-8">{room.description}</p>

          <ul className="mt-5 flex flex-wrap gap-2.5">
            {room.highlights.map((h) => (
              <li
                key={h}
                className="rounded-full border border-white/25 px-4 py-2 text-[0.95rem] font-semibold text-[#0a1f2e] [background:linear-gradient(135deg,var(--c1),var(--c2))] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_3px_0_var(--edge2)]"
              >
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col items-start gap-4 pt-8"><div className="h-px w-full bg-gradient-to-r from-white/45 via-white/15 to-transparent" aria-hidden />
            <div className="min-h-[5.75rem]">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#cfe0ec]">Room rate</span>
              <p className="pop-1 font-display text-[2.4rem] leading-tight text-[color:var(--tx)] drop-shadow-[0_3px_0_var(--edge2)]">{formatINR(room.price)}</p>
              {room.includes && <p className="mt-0.5 text-[0.95rem] text-[#dce9f2]">{room.includes}</p>}
            </div>
            {href && (
              <Link
                href={href}
                className="group/link inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-base font-bold text-[#0a1f2e] [background:linear-gradient(135deg,var(--c1),var(--c2))] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_0_var(--edge2),0_14px_24px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_6px_0_var(--edge2),0_20px_30px_-10px_rgba(0,0,0,0.65)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80"
              >
                Room details &amp; photos
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </article>
    </Tilt3D>
  );
}

export function OurLegacy() {
  // Illustrative AI images replace the owner photo on a card only where a file exists (see src/lib/showcase.ts).
  const showcase = getShowcaseImages();
  const tiles = (["gold", "blue", "black"] as ShowcaseId[]).map((id) => featured(id, showcase[id])).filter((t): t is NonNullable<ReturnType<typeof featured>> => t !== null);

  return (
    <section
      id="legacy"
      className="legacy-stage relative isolate scroll-mt-20 overflow-hidden border-y border-white/15 py-24 text-[#f8fafc] sm:py-28 xl:py-36"
    >
      {/* texture, light and layered colourful arch outlines for depth */}
      <div aria-hidden className="legacy-grain pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[3px] bg-gradient-to-r from-[#2fd6a4] via-[#f5b82e] to-[#f0588f]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-24 -z-10 hidden h-[40rem] w-[26rem] rounded-t-full border-2 border-[#2fd6a4]/25 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-24 -z-10 hidden h-[36rem] w-[22rem] rounded-t-full border border-[#2fd6a4]/15 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-[30rem] -z-10 hidden h-[34rem] w-[22rem] rounded-t-full border-2 border-[#f0588f]/25 xl:block" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-[30rem] -z-10 hidden h-[30rem] w-[18rem] rounded-t-full border border-[#f0588f]/15 xl:block" />

      <Container className="max-w-[96rem] xl:px-12">
        {/* Story + 3D milestone */}
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#f5b82e]/50 bg-[#f5b82e]/15 py-2 pl-4 pr-5 text-xs font-bold uppercase tracking-[0.24em] text-[#ffd978] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_0_#4d2d03] sm:text-sm">
              <span className="h-[3px] w-10 rounded-full bg-gradient-to-r from-[#ffe9a8] to-[#f5b82e]" aria-hidden /> Our Legacy
            </span>
            <h2 className="bg-gradient-to-b from-white via-[#fff2c9] to-[#ffc65c] bg-clip-text font-display text-[clamp(2.5rem,1.3rem+3.1vw,4.8rem)] font-medium leading-[1.05] tracking-tight text-transparent drop-shadow-[0_6px_0_rgba(77,45,3,0.45)]">
              Over a decade of welcoming guests to Dibrugarh
            </h2>
            <ul className="mt-9 max-w-2xl space-y-6">
              <li
                style={vars(MINT)}
                className="tint-card slab relative flex items-start gap-4 rounded-3xl border border-white/20 p-5 sm:gap-5 sm:p-6"
              >
                <span aria-hidden className="absolute inset-y-4 left-0 w-1.5 rounded-full [background:linear-gradient(180deg,var(--c1),var(--c2))]" />
                <span className="chrome-tile mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-[#06241d] sm:h-14 sm:w-14">
                  <Landmark className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
                </span>
                <p className="text-[clamp(1.125rem,1rem+0.5vw,1.4rem)] leading-relaxed text-[#f1f6fa]">
                  Established in <strong className="font-bold text-[#8ff3cf]">{legacy.foundedYear}</strong>, it is the{" "}
                  <strong className="font-bold text-white">first Homestay in Dibrugarh</strong> and the{" "}
                  <strong className="font-bold text-white">first luxury Homestay in the entire North East India</strong>.
                </p>
              </li>
              <li
                style={vars(GOLD)}
                className="tint-card slab relative flex items-start gap-4 rounded-3xl border border-white/20 p-5 sm:gap-5 sm:p-6"
              >
                <span aria-hidden className="absolute inset-y-4 left-0 w-1.5 rounded-full [background:linear-gradient(180deg,var(--c1),var(--c2))]" />
                <span className="chrome-tile mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-[#3a2203] sm:h-14 sm:w-14">
                  <Award className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
                </span>
                <p className="text-[clamp(1.125rem,1rem+0.5vw,1.4rem)] leading-relaxed text-[#f1f6fa]">
                  Recipient of the{" "}
                  <strong className="font-bold text-white">{legacy.award.title}</strong> from the{" "}
                  <strong className="font-bold text-[#ffd978]">{legacy.award.organisation}</strong>.
                </p>
              </li>
            </ul>
            <Link
              href="/about"
              className="group/link mt-10 inline-flex min-h-14 items-center gap-2.5 rounded-full px-8 text-lg font-bold text-[#3a2203] [background:linear-gradient(135deg,#ffe9a8,#f5b82e_55%,#d98a1a)] shadow-[inset_0_2px_0_rgba(255,255,255,0.6),0_5px_0_#4d2d03,0_18px_30px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.7),0_8px_0_#4d2d03,0_26px_36px_-10px_rgba(0,0,0,0.65)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80"
            >
              Read our story and journey
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden />
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
        <div className="mt-24 grid gap-7 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4 xl:gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <Tilt3D strength={0.6} className="h-full">
                <div
                  style={vars(p.palette)}
                  className="tint-card slab group relative h-full rounded-3xl border border-white/20 p-8 [transform-style:preserve-3d]"
                >
                  <span aria-hidden className="absolute right-6 top-4 font-display text-6xl leading-none text-transparent [-webkit-text-stroke:1.5px_var(--c1)] opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="chrome-tile pop-2 flex h-16 w-16 items-center justify-center rounded-2xl text-[#0a1f2e]">
                    <p.icon className="h-8 w-8" />
                  </span>
                  <h3 className="pop-1 mt-8 font-display text-[clamp(1.4rem,1.2rem+0.5vw,1.75rem)] font-medium leading-snug text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)]">{p.title}</h3>
                  <p className="mt-3 text-[1.0625rem] leading-7 text-[#eaf2f7] xl:text-lg">{p.text}</p>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

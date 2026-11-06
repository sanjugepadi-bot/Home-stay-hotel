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
      <div className="gold-metal rounded-[1.9rem] p-[3px] shadow-[0_34px_64px_-22px_rgba(0,0,0,0.8),0_0_50px_-10px_rgba(236,204,128,0.28)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#0b2a2a] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)]">
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
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,240,200,0.16),transparent_42%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#041217]/55 to-transparent" />
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
      </div>
    </Tilt3D>
  );

  return (
    <article className="glass-panel group flex h-full flex-col rounded-[2.4rem] border border-white/10 p-4 transition-all duration-500 hover:-translate-y-2 hover:border-[#ecd18f]/40 sm:p-5">
      {href ? (
        <Link
          href={href}
          aria-label={`${room.name} — room details and photos`}
          className="block rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1d98f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#07242a]"
        >
          {image}
        </Link>
      ) : (
        image
      )}

      <div className="mt-7 flex flex-1 flex-col px-1.5 pb-1 sm:px-2">
        <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#efd491]">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full ring-2 ring-white/80 shadow-[0_0_12px_currentColor]" style={{ backgroundColor: room.accent }} />
          Room
        </span>
        <h3 className="mt-2 font-display text-[clamp(1.75rem,1.4rem+0.9vw,2.4rem)] font-medium leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
          {href ? (
            <Link href={href} className="underline-offset-[6px] decoration-[#f1d98f] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1d98f]">
              {room.name}
            </Link>
          ) : (
            room.name
          )}
        </h3>
        <span aria-hidden className="mt-4 h-px w-20 bg-gradient-to-r from-[#f1d98f] via-[#b98c3c]/60 to-transparent" />
        <p className="mt-5 text-[1.0625rem] leading-8 text-[#dfe5dc] xl:text-lg xl:leading-8">{room.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {room.highlights.map((h) => (
            <li key={h} className="rounded-full border border-[#ecd18f]/35 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-[#f4e3b0] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col items-start gap-4 pt-8"><div className="h-px w-full bg-gradient-to-r from-[#f1d98f]/50 via-white/10 to-transparent" aria-hidden />
          <div className="min-h-[5.75rem]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bfd0c6]">Room rate</span>
            <p className="gold-text font-display text-[2rem] leading-tight">{formatINR(room.price)}</p>
            {room.includes && <p className="mt-0.5 text-sm text-[#bfd0c6]">{room.includes}</p>}
          </div>
          {href && (
            <Link
              href={href}
              className="group/link inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-[#f1d98f] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1d98f]"
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
      className="legacy-stage relative isolate scroll-mt-20 overflow-hidden border-y border-[#ecd18f]/20 py-24 text-[#f6efe0] sm:py-28 xl:py-36"
    >
      {/* texture, light and fine champagne hairline arches for depth */}
      <div aria-hidden className="legacy-grain pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#f1d98f]/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-24 -z-10 hidden h-[40rem] w-[26rem] rounded-t-full border border-[#ecd18f]/20 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-24 -z-10 hidden h-[36rem] w-[22rem] rounded-t-full border border-[#ecd18f]/10 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-[30rem] -z-10 hidden h-[34rem] w-[22rem] rounded-t-full border border-[#ecd18f]/20 xl:block" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-[30rem] -z-10 hidden h-[30rem] w-[18rem] rounded-t-full border border-[#ecd18f]/10 xl:block" />

      <Container className="max-w-[96rem] xl:px-12">
        {/* Story + 3D milestone */}
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#ecd18f]/30 bg-white/[0.04] py-2 pl-4 pr-5 text-xs font-bold uppercase tracking-[0.24em] text-[#efd491] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm sm:text-sm">
              <span className="h-px w-10 bg-gradient-to-r from-[#f1d98f] to-transparent" aria-hidden /> Our Legacy
            </span>
            <h2 className="ivory-text font-display text-[clamp(2.4rem,1.3rem+3vw,4.6rem)] font-medium leading-[1.05] tracking-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
              Over a decade of welcoming guests to Dibrugarh
            </h2>
            <ul className="mt-8 max-w-2xl space-y-5">
              <li className="glass-panel legacy-sheen group/stmt relative flex items-start gap-4 rounded-3xl border border-white/10 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#ecd18f]/40 sm:gap-5 sm:p-6">
                <span aria-hidden className="absolute inset-y-5 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#f7e7b8] via-[#c99a45] to-transparent" />
                <span className="gold-metal mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#0b2a2a] shadow-[0_10px_20px_-8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.55)] sm:h-12 sm:w-12">
                  <Landmark className="h-6 w-6" aria-hidden />
                </span>
                <p className="text-[clamp(1.0625rem,0.97rem+0.4vw,1.3rem)] leading-relaxed text-[#e6e9df]">
                  Established in <strong className="gold-text font-semibold">{legacy.foundedYear}</strong>, it is the{" "}
                  <strong className="font-semibold text-white">first Homestay in Dibrugarh</strong> and the{" "}
                  <strong className="font-semibold text-white">first luxury Homestay in the entire North East India</strong>.
                </p>
              </li>
              <li className="glass-panel legacy-sheen group/stmt relative flex items-start gap-4 rounded-3xl border border-white/10 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#ecd18f]/40 sm:gap-5 sm:p-6">
                <span aria-hidden className="absolute inset-y-5 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#f7e7b8] via-[#c99a45] to-transparent" />
                <span className="gold-metal mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#0b2a2a] shadow-[0_10px_20px_-8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.55)] sm:h-12 sm:w-12">
                  <Award className="h-6 w-6" aria-hidden />
                </span>
                <p className="text-[clamp(1.0625rem,0.97rem+0.4vw,1.3rem)] leading-relaxed text-[#e6e9df]">
                  Recipient of the{" "}
                  <strong className="font-semibold text-white">{legacy.award.title}</strong> from the{" "}
                  <strong className="gold-text font-semibold">{legacy.award.organisation}</strong>.
                </p>
              </li>
            </ul>
            <Link
              href="/about"
              className="group/link mt-9 inline-flex min-h-12 items-center gap-2 rounded-full border border-transparent px-7 text-base font-semibold text-[#f1d98f] shadow-[0_14px_30px_-14px_rgba(0,0,0,0.8)] transition-all duration-300 [background:linear-gradient(#082329,#082329)_padding-box,linear-gradient(135deg,#f7e7b8,#b98c3c_55%,#ecd18f)_border-box] hover:-translate-y-0.5 hover:text-[#0b2a2a] hover:[background:linear-gradient(135deg,#fbeab8,#e2c070_45%,#b98c3c)_padding-box,linear-gradient(135deg,#f7e7b8,#b98c3c_55%,#ecd18f)_border-box] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1d98f]"
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
              <div className="glass-panel legacy-sheen group relative h-full rounded-3xl border border-white/10 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#ecd18f]/45">
                <span aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#f1d98f]/70 to-transparent" />
                <span aria-hidden className="absolute right-6 top-4 font-display text-6xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(236,209,143,0.28)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="gold-metal flex h-14 w-14 items-center justify-center rounded-2xl text-[#0b2a2a] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <p.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-7 font-display text-[clamp(1.3rem,1.15rem+0.4vw,1.6rem)] font-medium leading-snug text-white">{p.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#d3dcd3] xl:text-[1.0625rem]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Images, Sparkles } from "lucide-react";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { formatINR } from "@/lib/utils";
import { photos } from "@/lib/photos";
import { site } from "@/data/site";
import { roomCover, roomHasPage, roomPath, type Room } from "@/data/rooms";

// Cards are never wider than ~390 CSS px, so Next.js serves a file at least 2x that wherever the original allows it.
const SIZES = "(min-width: 1280px) 390px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw";

const LAYERED_SHADOW =
  "shadow-[0_2px_4px_rgba(70,45,10,0.06),0_14px_28px_-8px_rgba(70,45,10,0.14),0_44px_70px_-30px_rgba(70,45,10,0.38)] hover:shadow-[0_4px_8px_rgba(70,45,10,0.08),0_22px_40px_-10px_rgba(70,45,10,0.2),0_60px_90px_-34px_rgba(70,45,10,0.5)]";

/** Pointer-driven 3D tilt + light glare. Mouse only; respects reduced motion; no React re-renders while moving. */
function Tilt3D({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.dataset.tilting = "true";
    el.style.setProperty("--ry", `${((x - 0.5) * 9).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * 7).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.dataset.tilting = "false";
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={className}>
      {children}
    </div>
  );
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-3.5 gap-y-1.5 text-xs font-medium text-foreground/70">
      {items.map((h) => (
        <li key={h} className="flex items-center gap-1.5">
          <span aria-hidden className="h-1 w-1 rounded-full bg-gold" /> {h}
        </li>
      ))}
    </ul>
  );
}

function EnquireRow({ room }: { room: Room }) {
  const { selectRoomAndScroll } = useBooking();
  return (
    <div className="mt-auto flex items-end justify-between gap-3 pt-5">
      <p className="min-w-0 text-xs leading-snug text-muted-foreground">{room.includes}</p>
      <Button variant="forest" size="sm" className="shrink-0 px-6" onClick={() => selectRoomAndScroll(room.id)}>
        Enquire
      </Button>
    </div>
  );
}

function DetailsLink({ room }: { room: Room }) {
  if (!roomHasPage(room)) return null;
  return (
    <Link
      href={roomPath(room)}
      className="group/link mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      Room details &amp; all photos
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden />
    </Link>
  );
}

/** Name plate that floats forward from the card: room name, colour dot and rate. */
function Plate({ room }: { room: Room }) {
  return (
    <div className="relative z-10 -mt-11 mx-5 flex items-end justify-between gap-3 rounded-2xl border border-white/50 bg-background/90 px-5 py-4 shadow-[0_18px_30px_-14px_rgba(40,25,5,0.45)] backdrop-blur-md [transform:translateZ(46px)]">
      <div className="min-w-0">
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-deep">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full ring-2 ring-background" style={{ backgroundColor: room.accent, boxShadow: `0 0 0 1px ${room.accent}55` }} />
          Room
        </span>
        <h3 className="mt-1 font-display text-[1.55rem] font-medium leading-tight text-foreground">
          {roomHasPage(room) ? (
            <Link href={roomPath(room)} className="underline-offset-4 decoration-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              {room.name}
            </Link>
          ) : (
            room.name
          )}
        </h3>
      </div>
      <div className="shrink-0 text-right">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Room rate</span>
        <p className="font-display text-xl leading-tight text-foreground">{formatINR(room.price)}</p>
      </div>
    </div>
  );
}

/** Photographed room: an arched "window" onto the owner's photograph on a tilting 3D card. */
export function RoomCard({ room, illustration }: { room: Room; index?: number; illustration?: string }) {
  const { markViewed } = useRecentlyViewed();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const gallery = room.gallery ?? [];
  const cover = roomCover(room);
  const coverKey = cover?.photoKey ?? room.photoKey;
  const coverSrc = coverKey ? photos[coverKey] : undefined;
  const landscape = coverSrc ? coverSrc.width > coverSrc.height : false;

  return (
    <article className="group h-full" onMouseEnter={() => markViewed(room.id)}>
      <Tilt3D
        className={`room-card-3d relative flex h-full flex-col rounded-[2rem] border border-white/60 bg-card p-2.5 pb-6 ${LAYERED_SHADOW}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[9.5rem] rounded-b-[1.4rem] bg-muted">
          {(coverSrc || illustration) && (
            <button
              type="button"
              onClick={() => gallery.length && setViewerIndex(0)}
              aria-label={`View all ${gallery.length} photos of ${room.name}`}
              className="absolute inset-0 block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
            >
              {illustration ? (
                <Image
                  src={illustration}
                  alt={`AI illustration of the ${room.name} theme — not a photograph of the actual room`}
                  fill
                  sizes={SIZES}
                  quality={90}
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
                />
              ) : coverSrc ? (
              <Image
                src={coverSrc}
                alt={cover?.alt ?? `${room.name} at ${site.name}, Dibrugarh`}
                fill
                sizes={SIZES}
                quality={90}
                placeholder="blur"
                className={`object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06] ${landscape ? "object-[70%_60%]" : "object-center"}`}
              />
              ) : null}
            </button>
          )}
          {illustration && (
            <span
              title="AI-generated illustration — not a photograph of the actual room. Real photographs are in the room's gallery."
              className="pointer-events-none absolute bottom-14 left-3.5 z-[1] inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3 text-gold-light" aria-hidden /> AI Illustration
            </span>
          )}
          {/* warm light from the top-left + a soft floor shade for the plate */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,240,200,0.18),transparent_40%)]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
          <div aria-hidden className="room-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {gallery.length > 0 && (
            <button
              type="button"
              onClick={() => setViewerIndex(0)}
              className="absolute right-3.5 top-14 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-background/90 px-3.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Images className="h-4 w-4" aria-hidden /> {gallery.length} {gallery.length === 1 ? "photo" : "photos"}
            </button>
          )}
        </div>
        {gallery.length > 0 && (
          <PhotoLightbox
            title={`${room.name} photos`}
            photos={gallery.map((p) => ({ id: p.id, src: photos[p.photoKey], caption: p.caption, alt: p.alt }))}
            index={viewerIndex}
            onIndexChange={setViewerIndex}
          />
        )}

        <Plate room={room} />

        <div className="flex flex-1 flex-col px-5 pt-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{room.description}</p>
          <Highlights items={room.highlights} />
          <DetailsLink room={room} />
          <EnquireRow room={room} />
        </div>
      </Tilt3D>
    </article>
  );
}

/** Room with no photograph yet: honest, text-led card in the room's own colour — no placeholder image. */
export function RoomCardCompact({ room }: { room: Room; index?: number }) {
  const { markViewed } = useRecentlyViewed();
  return (
    <article className="group h-full" onMouseEnter={() => markViewed(room.id)}>
      <Tilt3D
        className={`room-card-3d relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-card p-7 pl-9 ${LAYERED_SHADOW}`}
      >
        <span aria-hidden className="absolute inset-y-0 left-0 w-3" style={{ background: `linear-gradient(180deg, ${room.accent}, ${room.accent}99)` }} />
        <div aria-hidden className="room-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-deep">Room</span>
            <h3 className="mt-1 font-display text-[1.55rem] font-medium leading-tight text-foreground">
              {roomHasPage(room) ? (
                <Link href={roomPath(room)} className="underline-offset-4 decoration-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  {room.name}
                </Link>
              ) : (
                room.name
              )}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Room rate</span>
            <p className="font-display text-xl leading-tight text-foreground">{formatINR(room.price)}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{room.description}</p>
        <Highlights items={room.highlights} />
        <DetailsLink room={room} />
        <EnquireRow room={room} />
      </Tilt3D>
    </article>
  );
}

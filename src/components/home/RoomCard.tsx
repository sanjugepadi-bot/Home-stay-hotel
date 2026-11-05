"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Images } from "lucide-react";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { formatINR } from "@/lib/utils";
import { photos } from "@/lib/photos";
import { site } from "@/data/site";
import { roomCover, roomHasPage, roomPath, type Room } from "@/data/rooms";

// Cards are never wider than ~390 CSS px on desktop, so these sizes make Next.js pick a file that is
// at least 2x the display width wherever the original photograph is large enough to allow it.
const SIZES = "(min-width: 1280px) 390px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw";

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

function PriceAndActions({ room }: { room: Room }) {
  const { selectRoomAndScroll } = useBooking();
  return (
    <div className="mt-auto flex min-h-[7rem] items-end justify-between gap-3 border-t border-border pt-5">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Room rate</span>
        <p className="font-display text-2xl leading-tight text-foreground">{formatINR(room.price)}</p>
        {room.includes && <p className="mt-0.5 text-xs text-muted-foreground">{room.includes}</p>}
      </div>
      <Button variant="forest" size="sm" className="shrink-0 px-5" onClick={() => selectRoomAndScroll(room.id)}>
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

/** Photographed room: portrait card, the room name set over the owner's photograph. */
export function RoomCard({ room }: { room: Room; index?: number }) {
  const { markViewed } = useRecentlyViewed();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const gallery = room.gallery ?? [];
  const cover = roomCover(room);
  const coverKey = cover?.photoKey ?? room.photoKey;
  const coverSrc = coverKey ? photos[coverKey] : undefined;
  // Landscape originals are cropped around the bed rather than the middle of the frame.
  const landscape = coverSrc ? coverSrc.width > coverSrc.height : false;

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-[0_1px_2px_rgba(26,35,29,0.05),0_12px_32px_-18px_rgba(26,35,29,0.25)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_2px_4px_rgba(26,35,29,0.05),0_28px_48px_-22px_rgba(26,35,29,0.35)]"
      onMouseEnter={() => markViewed(room.id)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {coverSrc && (
          <button
            type="button"
            onClick={() => gallery.length && setViewerIndex(0)}
            aria-label={`View all ${gallery.length} photos of ${room.name}`}
            className="absolute inset-0 block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
          >
            <Image
              src={coverSrc}
              alt={cover?.alt ?? `${room.name} at ${site.name}, Dibrugarh`}
              fill
              sizes={SIZES}
              quality={90}
              placeholder="blur"
              className={`object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] ${landscape ? "object-[70%_60%]" : "object-center"}`}
            />
          </button>
        )}
        {/* Soft fade only where the room name sits */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/80 via-forest/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <h3 className="font-display text-[1.65rem] font-medium leading-tight text-beige-light [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
            {roomHasPage(room) ? (
              <Link
                href={roomPath(room)}
                className="pointer-events-auto underline-offset-4 decoration-gold/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {room.name}
              </Link>
            ) : (
              room.name
            )}
          </h3>
          <span
            aria-hidden
            className="mb-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-2 ring-beige-light/90"
            style={{ backgroundColor: room.accent }}
          />
        </div>
        {gallery.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setViewerIndex(0)}
              className="absolute right-3 top-3 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-background/90 px-3.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Images className="h-4 w-4" aria-hidden /> {gallery.length} {gallery.length === 1 ? "photo" : "photos"}
            </button>
            <PhotoLightbox
              title={`${room.name} photos`}
              photos={gallery.map((p) => ({ id: p.id, src: photos[p.photoKey], caption: p.caption, alt: p.alt }))}
              index={viewerIndex}
              onIndexChange={setViewerIndex}
            />
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{room.description}</p>
        <Highlights items={room.highlights} />
        <DetailsLink room={room} />
        <div className="mt-5 flex flex-1 flex-col">
          <PriceAndActions room={room} />
        </div>
      </div>
    </article>
  );
}

/** Room with no photograph yet: honest, text-led card in the room's own colour — no placeholder image. */
export function RoomCardCompact({ room }: { room: Room; index?: number }) {
  const { markViewed } = useRecentlyViewed();
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-6 pl-8 shadow-[0_1px_2px_rgba(26,35,29,0.05),0_12px_32px_-18px_rgba(26,35,29,0.2)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 sm:p-7 sm:pl-9"
      onMouseEnter={() => markViewed(room.id)}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-2.5" style={{ backgroundColor: room.accent }} />
      <h3 className="font-display text-[1.65rem] font-medium leading-tight text-foreground">
        {roomHasPage(room) ? (
          <Link href={roomPath(room)} className="underline-offset-4 hover:text-gold-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
            {room.name}
          </Link>
        ) : (
          room.name
        )}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{room.description}</p>
      <Highlights items={room.highlights} />
      <DetailsLink room={room} />
      <div className="mt-5 flex flex-1 flex-col">
        <PriceAndActions room={room} />
      </div>
    </article>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Images } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { cn, formatINR } from "@/lib/utils";
import { photos } from "@/lib/photos";
import { site } from "@/data/site";
import { roomHasPage, roomPath, type Room } from "@/data/rooms";

export function RoomCard({ room, index }: { room: Room; index: number }) {
  const { selectRoomAndScroll } = useBooking();
  const { markViewed } = useRecentlyViewed();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const gallery = room.gallery ?? [];
  const cover = gallery[0];

  return (
    <div
      className={cn(
        // Rooms with no photos size to their own content instead of stretching to match
        // their neighbours (which would leave a big empty gap in the card).
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-2xl",
        cover || room.photoKey ? "h-full" : "h-auto"
      )}
      onMouseEnter={() => markViewed(room.id)}
    >
      <div className="relative">
        {cover ? (
          <>
            <button
              type="button"
              onClick={() => setViewerIndex(0)}
              aria-label={`View all ${gallery.length} photos of ${room.name}`}
              className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
            >
              <SmartImage
                icon="BedDouble"
                seed={index}
                aspect="aspect-[4/3]"
                className="rounded-none"
                src={photos[cover.photoKey]}
                alt={cover.alt}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </button>
            <button
              type="button"
              onClick={() => setViewerIndex(0)}
              className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-black/65 px-3.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Images className="h-4 w-4" aria-hidden /> View {gallery.length} photos
            </button>
            <PhotoLightbox
              title={`${room.name} photos`}
              photos={gallery.map((p) => ({ id: p.id, src: photos[p.photoKey], caption: p.caption, alt: p.alt }))}
              index={viewerIndex}
              onIndexChange={setViewerIndex}
            />
          </>
        ) : room.photoKey ? (
          <SmartImage
            icon="BedDouble"
            seed={index}
            aspect="aspect-[4/3]"
            className="rounded-none"
            src={photos[room.photoKey]}
            alt={`${room.name} at ${site.name}, Dibrugarh`}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl text-foreground">
          {roomHasPage(room) ? (
            <Link
              href={roomPath(room)}
              className="underline-offset-4 hover:text-gold-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {room.name}
            </Link>
          ) : (
            room.name
          )}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{room.description}</p>
        {roomHasPage(room) && (
          <Link
            href={roomPath(room)}
            className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-gold-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            Room details &amp; all photos →
          </Link>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {room.highlights.map((h) => (
            <Badge key={h}>
              <CheckCircle2 className="mr-1 h-3 w-3" /> {h}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
          <div className="mt-5">
            <span className="text-xs text-muted-foreground">Room rate</span>
            <p className="font-display text-2xl text-forest dark:text-gold">{formatINR(room.price)}</p>
            {room.includes && <p className="text-xs text-muted-foreground">{room.includes}</p>}
          </div>
          <Button variant="forest" size="sm" onClick={() => selectRoomAndScroll(room.id)}>
            Enquire
          </Button>
        </div>
      </div>
    </div>
  );
}

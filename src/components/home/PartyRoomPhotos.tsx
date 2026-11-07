"use client";

import { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import type { PartyRoomPhoto } from "@/data/party-room";
import { cn } from "@/lib/utils";

/** Owner's Party Room photographs: one large framed main photo, a thumbnail strip, and a full-screen viewer. */
export function PartyRoomPhotos({ photos, priority = false }: { photos: PartyRoomPhoto[]; priority?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const [main, setMain] = useState(0);
  const current = photos[main] ?? photos[0];
  if (!current) return null;

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <div className="rounded-[1.75rem] p-[3px] [background:linear-gradient(135deg,#fbeab8,#c99a45_55%,#ecd18f)] shadow-[0_40px_70px_-28px_rgba(0,0,0,0.8)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem] bg-[#15112a]">
          <button
            type="button"
            onClick={() => setIndex(main)}
            aria-label={`View all ${photos.length} photos of the Party Room`}
            className="absolute inset-0 block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
          >
            <Image
              key={current.id}
              src={current.src}
              alt={current.alt}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 40vw, (min-width: 768px) 448px, 92vw"
              quality={85}
              placeholder="blur"
              className="object-cover transition-transform duration-[1100ms] ease-out hover:scale-[1.04]"
            />
          </button>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#15112a]/55 to-transparent" />
          <button
            type="button"
            onClick={() => setIndex(main)}
            className="absolute right-3 top-3 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-background/90 px-4 text-sm font-semibold text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Images className="h-4 w-4" aria-hidden /> {photos.length} photos
          </button>
        </div>
      </div>

      {photos.length > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-2.5">
          {photos.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setMain(i)}
                aria-label={`Show photo: ${p.caption}`}
                aria-pressed={i === main}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-xl ring-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-gold",
                  i === main ? "ring-gold" : "ring-white/15 opacity-75 hover:opacity-100"
                )}
              >
                <Image src={p.src} alt="" fill sizes="110px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <PhotoLightbox
        title="Party Room photos"
        photos={photos.map((p) => ({ id: p.id, src: p.src, caption: p.caption, alt: p.alt }))}
        index={index}
        onIndexChange={setIndex}
      />
    </div>
  );
}

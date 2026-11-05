"use client";

import { useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { photos } from "@/lib/photos";
import type { RoomPhoto } from "@/data/room-photos";

/**
 * Grid of photographs where every photo is a real <img> in the page HTML (so
 * search engines can find it), with the full-screen viewer on click.
 */
export function PhotoGrid({
  items,
  label,
  priorityCount = 0,
}: {
  items: RoomPhoto[];
  /** Used in the viewer's accessible title, e.g. "The Gold Room photos". */
  label: string;
  /** Load the first N photos eagerly (use on the first screen of a page). */
  priorityCount?: number;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo: ${p.caption}`}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <SmartImage
                icon="Home"
                seed={i}
                aspect="aspect-[4/3]"
                className="transition-transform duration-500 group-hover:scale-105"
                src={photos[p.photoKey]}
                alt={p.alt}
                priority={i < priorityCount}
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 50vw"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 text-left text-xs font-medium text-white sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                {p.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <PhotoLightbox
        title={label}
        photos={items.map((p) => ({ id: p.id, src: photos[p.photoKey], caption: p.caption, alt: p.alt }))}
        index={active}
        onIndexChange={setActive}
      />
    </>
  );
}

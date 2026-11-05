"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/Dialog";

export type LightboxPhoto = {
  id: string;
  src: StaticImageData;
  caption: string;
  alt: string;
};

/**
 * Full-screen photo viewer. Photos are shown at their natural aspect ratio
 * (no cropping), with prev/next buttons, keyboard arrows, swipe, a counter and
 * a thumbnail strip. `index` is the open photo, or null when closed.
 */
export function PhotoLightbox({
  photos,
  index,
  onIndexChange,
  title,
}: {
  photos: LightboxPhoto[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  title?: string;
}) {
  const [direction, setDirection] = useState(1);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const count = photos.length;
  const active = index !== null ? photos[index] : null;

  function go(delta: number) {
    if (index === null || count === 0) return;
    setDirection(delta);
    onIndexChange((index + delta + count) % count);
  }

  function jump(to: number) {
    if (index === null) return;
    setDirection(to > index ? 1 : -1);
    onIndexChange(to);
  }

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // go() only depends on index/count
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    if (index === null) return;
    const el = thumbsRef.current?.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  return (
    <Dialog open={index !== null} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent
        showClose={false}
        aria-describedby={undefined}
        className="max-w-5xl overflow-x-hidden border-none bg-transparent p-0 shadow-none"
      >
        <DialogTitle className="sr-only">{title ?? active?.caption ?? "Photo gallery"}</DialogTitle>
        {active && index !== null && (
          <div className="relative">
            <div className="relative flex h-[58vh] items-center justify-center sm:h-[64vh]">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    placeholder="blur"
                    loading="eager"
                    sizes="(min-width: 1024px) 64rem, 95vw"
                    draggable={false}
                    className="h-auto max-h-full w-auto max-w-full select-none rounded-xl object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Warm the next/previous photos so navigating feels instant. */}
              {count > 1 &&
                [1, -1].map((step) => {
                  const p = photos[(index + step + count) % count];
                  return (
                    <Image
                      key={`preload-${step}`}
                      src={p.src}
                      alt=""
                      aria-hidden
                      loading="eager"
                      sizes="(min-width: 1024px) 64rem, 95vw"
                      className="pointer-events-none absolute h-px w-px opacity-0"
                    />
                  );
                })}

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:left-3"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-3"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 px-1 text-sm text-white">
              <span className="font-medium">{active.caption}</span>
              <span className="shrink-0 text-white/70" aria-live="polite">
                {index + 1} / {count}
              </span>
            </div>

            {count > 1 && (
              <div
                ref={thumbsRef}
                className="mt-3 flex gap-2 overflow-x-auto px-1 pb-1"
                role="tablist"
                aria-label="Photo thumbnails"
              >
                {photos.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show photo ${i + 1}: ${p.caption}`}
                    data-thumb={i}
                    onClick={() => jump(i)}
                    className={cn(
                      "relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:h-16 sm:w-16",
                      i === index ? "border-gold opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={p.src} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <DialogClose className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-3 sm:top-3">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

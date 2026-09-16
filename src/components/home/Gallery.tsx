"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { gallery } from "@/data/gallery";
import { photos } from "@/lib/photos";

const tags = ["All", "Property", "Rooms", "Food", "Nature", "Experiences"] as const;

export function Gallery() {
  const [filter, setFilter] = useState<(typeof tags)[number]>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = filter === "All" ? gallery : gallery.filter((g) => g.tag === filter);
  const active = activeIndex !== null ? items[activeIndex] : null;

  function go(delta: number) {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + delta + items.length) % items.length);
  }

  return (
    <section id="gallery" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="A glimpse of Serenity Stays"
          description="Browse photos and videos from around the property."
        />

        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mt-10 flex justify-center">
          <TabsList>
            {tags.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 8) * 0.04} className="break-inside-avoid">
              <button
                onClick={() => setActiveIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <SmartImage
                  icon={item.icon}
                  seed={i}
                  aspect={i % 5 === 0 ? "aspect-[3/4]" : "aspect-square"}
                  className="transition-transform duration-500 group-hover:scale-105"
                  src={photos[item.photoKey]}
                  alt={item.caption}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
                {item.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <PlayCircle className="h-10 w-10 text-white drop-shadow-lg" />
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Dialog open={activeIndex !== null} onOpenChange={(o) => !o && setActiveIndex(null)}>
        <DialogContent className="bg-transparent border-none p-0 shadow-none">
          <DialogTitle className="sr-only">{active?.caption ?? "Gallery image"}</DialogTitle>
          {active && (
            <div className="relative">
              <SmartImage
                icon={active.icon}
                seed={activeIndex ?? 0}
                aspect="aspect-video"
                label={active.caption}
                src={photos[active.photoKey]}
                alt={active.caption}
                sizes="90vw"
              />
              <button
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

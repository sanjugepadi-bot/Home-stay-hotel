"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { gallery, roomTabs } from "@/data/gallery";
import { photos } from "@/lib/photos";

// Tab ids: "all", "rooms", "bathroom", "kitchen", or a room id (e.g. "black").
const tabs = [
  { id: "all", label: "All" },
  { id: "rooms", label: "Rooms" },
  ...roomTabs,
  { id: "bathroom", label: "Bathroom" },
  { id: "kitchen", label: "Kitchen" },
];

function filterItems(filter: string) {
  switch (filter) {
    case "all":
      return gallery.filter((g) => !g.extra);
    case "rooms":
      return gallery.filter((g) => g.tag === "Rooms" && !g.extra);
    case "bathroom":
      return gallery.filter((g) => g.tag === "Bathroom");
    case "kitchen":
      return gallery.filter((g) => g.tag === "Kitchen");
    default:
      return gallery.filter((g) => g.room === filter);
  }
}

export function Gallery() {
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = filterItems(filter);

  if (gallery.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Take a look inside"
          description="Photographs of the rooms, bathroom and kitchen at the homestay."
        />

        <Tabs value={filter} onValueChange={setFilter} className="mt-10 flex justify-center">
          <TabsList className="max-w-full flex-wrap justify-center rounded-3xl sm:rounded-full">
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 8) * 0.04}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`View photo: ${item.caption}`}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <SmartImage
                  icon="Home"
                  seed={i}
                  aspect="aspect-[4/3]"
                  className="transition-transform duration-500 group-hover:scale-105"
                  src={photos[item.photoKey]}
                  alt={item.alt}
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 50vw"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 text-left text-xs font-medium text-white opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/gallery" className={buttonVariants({ variant: "outline", size: "md" })}>
            View the full photo gallery
          </Link>
        </div>
      </Container>

      <PhotoLightbox
        title="Gallery photo"
        photos={items.map((g) => ({ id: g.id, src: photos[g.photoKey], caption: g.caption, alt: g.alt }))}
        index={activeIndex}
        onIndexChange={setActiveIndex}
      />
    </section>
  );
}

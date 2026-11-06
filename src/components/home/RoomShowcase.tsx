"use client";

import Link from "next/link";
import { History } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { RoomCard, RoomCardCompact } from "./RoomCard";
import { rooms } from "@/data/rooms";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

const hasPhoto = (r: (typeof rooms)[number]) => Boolean(r.gallery?.length || r.photoKey);

export function RoomShowcase() {
  const { ids } = useRecentlyViewed();
  const recentRooms = rooms.filter((r) => ids.includes(r.id));
  const photographed = rooms.filter(hasPhoto);
  const textOnly = rooms.filter((r) => !hasPhoto(r));

  return (
    <section id="rooms" className="rooms-stage relative isolate scroll-mt-20 overflow-hidden py-20 sm:py-28">
      {/* hairline arches echo the hero's arched photo */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-24 -z-10 hidden h-[34rem] w-[22rem] rounded-t-full border border-gold/30 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-40 -z-10 hidden h-[30rem] w-[20rem] rounded-t-full border border-gold/25 lg:block" />

      <Container>
        <SectionHeading
          eyebrow="Rooms & Stays"
          title="Choose your room"
          description={`${rooms.length} rooms, each with its own colour and character.`}
        />

        {recentRooms.length > 0 && (
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <History className="h-3.5 w-3.5 text-gold-deep" /> Recently viewed:
            {recentRooms.map((r) => (
              <span key={r.id} className="rounded-full border border-border bg-card/60 px-2.5 py-1">
                {r.name}
              </span>
            ))}
          </div>
        )}

        {/* Phones: swipeable carousel. Tablet: 2 columns. Desktop: 3 columns with a staggered, editorial rhythm. */}
        <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-10 pt-2 hide-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-6 lg:grid-cols-3 lg:gap-9 lg:pb-16">
          {photographed.map((room, i) => (
            <div
              key={room.id}
              className={`w-[82vw] max-w-sm shrink-0 snap-center sm:w-auto sm:max-w-none ${i % 3 === 1 ? "lg:translate-y-14" : ""}`}
            >
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <RoomCard room={room} index={i} />
              </Reveal>
            </div>
          ))}
        </div>
        <p className="-mt-4 mb-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:hidden">Swipe to explore →</p>

        {textOnly.length > 0 && (
          <div className="mt-10 lg:mt-14">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-gold/30" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">More rooms</span>
              <span className="h-px flex-1 bg-gold/30" aria-hidden />
            </div>
            <div className="grid gap-7 md:grid-cols-2 lg:gap-9">
              {textOnly.map((room, i) => (
                <Reveal key={room.id} delay={i * 0.08} className="h-full">
                  <RoomCardCompact room={room} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 text-center">
          <Link href="/rooms" className={buttonVariants({ variant: "forest", size: "lg" }) + " px-10"}>
            Compare all rooms &amp; rates
          </Link>
        </div>
      </Container>
    </section>
  );
}

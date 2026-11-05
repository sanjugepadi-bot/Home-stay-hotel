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
    <section id="rooms" className="relative scroll-mt-20 bg-muted py-20 sm:py-28">
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
              <span key={r.id} className="rounded-full border border-border px-2.5 py-1">
                {r.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {photographed.map((room, i) => (
            <Reveal key={room.id} delay={(i % 3) * 0.08} className="h-full">
              <RoomCard room={room} index={i} />
            </Reveal>
          ))}
        </div>

        {textOnly.length > 0 && (
          <div className="mt-12 lg:mt-14">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-border" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">More rooms</span>
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
            <div className="grid gap-7 md:grid-cols-2 lg:gap-8">
              {textOnly.map((room, i) => (
                <Reveal key={room.id} delay={i * 0.08} className="h-full">
                  <RoomCardCompact room={room} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/rooms" className={buttonVariants({ variant: "outline", size: "lg" }) + " bg-card/60 hover:bg-card"}>
            Compare all rooms &amp; rates
          </Link>
        </div>
      </Container>
    </section>
  );
}

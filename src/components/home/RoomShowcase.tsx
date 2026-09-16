"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { RoomCard } from "./RoomCard";
import { rooms } from "@/data/rooms";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { History } from "lucide-react";

export function RoomShowcase() {
  const { ids } = useRecentlyViewed();
  const recentRooms = rooms.filter((r) => ids.includes(r.id));

  return (
    <section id="rooms" className="bg-muted/30 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Rooms & Stays"
          title="Find your perfect space"
          description="From cosy deluxe rooms to a private cottage — each stay is thoughtfully furnished for comfort."
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

        <div className="mt-12 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {rooms.map((room, i) => (
            <Reveal key={room.id} delay={i * 0.08}>
              <RoomCard room={room} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

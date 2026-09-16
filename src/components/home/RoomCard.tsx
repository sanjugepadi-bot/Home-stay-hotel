"use client";

import { Users, BedSingle, Maximize, CheckCircle2 } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { formatINR } from "@/lib/utils";
import { photos } from "@/lib/photos";
import type { Room } from "@/data/rooms";

export function RoomCard({ room, index }: { room: Room; index: number }) {
  const { selectRoomAndScroll } = useBooking();
  const { markViewed } = useRecentlyViewed();

  return (
    <div
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-2xl"
      onMouseEnter={() => markViewed(room.id)}
    >
      <div className="relative">
        <SmartImage
          icon={room.icon}
          seed={index}
          aspect="aspect-[4/3]"
          className="rounded-none"
          src={photos[room.photoKey]}
          alt={`${room.name} at Serenity Stays`}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        {room.available && (
          <span className="absolute left-3 top-3 rounded-full bg-forest px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-beige-light shadow-md">
            Available
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl text-foreground">{room.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{room.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-gold-deep" /> {room.occupancy} Guests
          </span>
          <span className="flex items-center gap-1.5">
            <BedSingle className="h-3.5 w-3.5 text-gold-deep" /> {room.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-3.5 w-3.5 text-gold-deep" /> {room.sizeSqft} sqft
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {room.amenities.map((a) => (
            <Badge key={a}>
              <CheckCircle2 className="mr-1 h-3 w-3" /> {a}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <span className="text-xs text-muted-foreground">Starting from</span>
            <p className="font-display text-2xl text-forest dark:text-gold">
              {formatINR(room.priceFrom)}
              <span className="text-sm font-sans text-muted-foreground"> /night</span>
            </p>
          </div>
          <Button variant="forest" size="sm" onClick={() => selectRoomAndScroll(room.id)}>
            Quick Book
          </Button>
        </div>
      </div>
    </div>
  );
}

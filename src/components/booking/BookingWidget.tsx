"use client";

import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GuestCounter } from "@/components/ui/GuestCounter";
import { useBooking } from "./BookingContext";

export function BookingWidget({ className }: { className?: string }) {
  const { checkIn, checkOut, guests, setCheckIn, setCheckOut, setGuests } = useBooking();
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={`glass rounded-2xl p-4 shadow-2xl sm:p-5 ${className ?? ""}`}>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground/75">
            <CalendarDays className="h-3.5 w-3.5 text-gold-deep" /> Check-in
          </span>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full min-h-11 rounded-lg border border-border bg-background/80 px-3 py-2.5 text-base text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 sm:text-sm"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground/75">
            <CalendarDays className="h-3.5 w-3.5 text-gold-deep" /> Check-out
          </span>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full min-h-11 rounded-lg border border-border bg-background/80 px-3 py-2.5 text-base text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 sm:text-sm"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/75">
            Guests
          </span>
          <GuestCounter value={guests} onChange={setGuests} />
        </label>
        <a href="#book">
          <Button variant="gold" size="lg" className="w-full">
            Enquire for These Dates
          </Button>
        </a>
      </div>
    </div>
  );
}

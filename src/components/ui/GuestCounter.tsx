"use client";

import { Minus, Plus, Users } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export function GuestCounter({
  value,
  onChange,
  max = 10,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
  className?: string;
}) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-11 w-full items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2.5 text-left text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:text-sm",
            className
          )}
        >
          <Users className="h-4 w-4 text-gold-deep" />
          {value} {value === 1 ? "Guest" : "Guests"}
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={10}
          className="z-50 w-64 rounded-xl border border-border bg-card p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Guests</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChange(Math.max(1, value - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Decrease guests"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-4 text-center text-sm">{value}</span>
              <button
                type="button"
                onClick={() => onChange(Math.min(max, value + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Increase guests"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

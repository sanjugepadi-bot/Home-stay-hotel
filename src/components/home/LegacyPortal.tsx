"use client";

import { Tilt3D } from "@/components/ui/Tilt3D";

/**
 * A layered, 3D-inspired "gold arch portal" — pure CSS (no image, no stock photography), so it never
 * pretends to show the property. It carries the owner-stated "10+ years" milestone and echoes the arched
 * photo frames used elsewhere on the site.
 */
export function LegacyPortal({ years }: { years: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[23rem] xl:max-w-[27rem]">
      {/* floor glow + contact shadow */}
      <div aria-hidden className="absolute -bottom-6 left-1/2 h-10 w-[85%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-2xl" />
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(224,191,118,0.28),transparent_62%)]" />

      <div className="legacy-float">
      <Tilt3D strength={0.8} className="relative aspect-[4/5] w-full">
        {/* back arch */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-t-[999px] rounded-b-[2rem] border border-gold/30 [transform:translateZ(-70px)_scale(1.14)]"
        />
        {/* middle arch */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-t-[999px] rounded-b-[2rem] border-2 border-gold/55 shadow-[0_0_60px_rgba(201,162,75,0.25)] [transform:translateZ(-32px)_scale(1.065)]"
        />
        {/* front panel */}
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-gold/70 bg-[radial-gradient(ellipse_at_50%_22%,#3f6a52_0%,#244433_55%,#17291f_100%)] px-6 text-center shadow-[0_40px_80px_-24px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,236,190,0.35),inset_0_-40px_80px_rgba(0,0,0,0.35)] [transform:translateZ(18px)]">
          <div aria-hidden className="room-glare pointer-events-none absolute inset-0" />
          <div aria-hidden className="absolute left-1/2 top-[9%] h-px w-14 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="bg-gradient-to-b from-[#f6e2a8] via-gold to-[#9a742a] bg-clip-text font-display text-[5.5rem] font-medium leading-none text-transparent drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] sm:text-[7rem] xl:text-[8.5rem]">
            {years}
          </span>
          <span className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-beige-light sm:text-base xl:text-lg">
            Years of
            <br />
            Hospitality
          </span>
          <span aria-hidden className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
          <span className="mt-4 text-xs font-medium uppercase tracking-[0.24em] text-gold-light/90 sm:text-sm">Dibrugarh · Assam</span>
        </div>
      </Tilt3D>
      </div>
    </div>
  );
}

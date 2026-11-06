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
      <div aria-hidden className="absolute -bottom-6 left-1/2 h-10 w-[85%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl" />
      <div aria-hidden className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(circle,rgba(236,204,128,0.32),rgba(30,128,112,0.14)_45%,transparent_66%)]" />

      <div className="legacy-float">
      <Tilt3D strength={0.8} className="relative aspect-[4/5] w-full">
        {/* back arch */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-t-[999px] rounded-b-[2rem] border border-[#ecd18f]/30 [transform:translateZ(-70px)_scale(1.14)]"
        />
        {/* middle arch */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-t-[999px] rounded-b-[2rem] border-2 border-[#ecd18f]/55 shadow-[0_0_70px_rgba(236,204,128,0.28)] [transform:translateZ(-32px)_scale(1.065)]"
        />
        {/* front panel */}
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-[#f1d98f]/80 bg-[radial-gradient(ellipse_at_50%_18%,#2a8577_0%,#115049_38%,#0a2f35_70%,#05191f_100%)] px-6 text-center shadow-[0_44px_90px_-26px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,244,210,0.45),inset_0_-50px_90px_rgba(0,0,0,0.45),0_0_0_6px_rgba(236,208,140,0.08)] [transform:translateZ(18px)]">
          <div aria-hidden className="room-glare pointer-events-none absolute inset-0" />
          <div aria-hidden className="absolute left-1/2 top-[9%] h-px w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f1d98f] to-transparent" />
          <span className="gold-text font-display text-[5.5rem] font-medium leading-none drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)] sm:text-[7rem] xl:text-[8.5rem]">
            {years}
          </span>
          <span className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#fbf4e0] sm:text-base xl:text-lg">
            Years of
            <br />
            Hospitality
          </span>
          <span aria-hidden className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#f1d98f]/90 to-transparent" />
          <span className="mt-4 text-xs font-medium uppercase tracking-[0.24em] text-[#efd491] sm:text-sm">Dibrugarh · Assam</span>
        </div>
      </Tilt3D>
      </div>
    </div>
  );
}

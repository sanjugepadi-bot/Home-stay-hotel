"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Hourglass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { countdown, countdownIsConfigured } from "@/data/countdown";
import { cn } from "@/lib/utils";

function parts(msLeft: number) {
  const total = Math.max(0, Math.floor(msLeft / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center">
      <div className="relative w-full overflow-hidden rounded-2xl border border-[#e8c872]/45 bg-gradient-to-b from-[#1b1710] to-[#0a0907] px-2 py-4 text-center shadow-[inset_0_1px_0_rgba(255,236,190,0.25),0_10px_0_-4px_#4a3510,0_24px_30px_-14px_rgba(0,0,0,0.75)] sm:py-6">
        <span aria-hidden className="absolute inset-x-3 top-1/2 h-px bg-black/60" />
        <span
          key={value}
          className="countdown-tick block bg-gradient-to-b from-[#fff3cf] via-[#efd491] to-[#bd9040] bg-clip-text font-display text-[clamp(2rem,1.2rem+4vw,3.75rem)] font-medium leading-none tabular-nums text-transparent"
        >
          {value}
        </span>
      </div>
      <span className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#e8c872] sm:text-xs">{label}</span>
    </div>
  );
}

/**
 * Countdown banner under the Hero. Renders nothing unless it is switched on and fully configured in
 * src/data/countdown.ts. It counts down to a fixed date and never resets itself.
 */
export function CountdownBanner() {
  const configured = countdownIsConfigured();
  const target = Date.parse(countdown.targetDate);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!configured) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [configured]);

  if (!configured) return null;

  const expired = now !== null && now >= target;
  if (expired && (countdown.expiredBehavior === "hide" || !countdown.expiredMessage.trim())) return null;

  const left = now === null ? null : parts(target - now);
  const show = (n: number | undefined, width = 2) => (n === undefined ? "–".repeat(width) : pad(n));

  return (
    <section aria-labelledby="countdown-heading" className="relative isolate overflow-hidden bg-[#0a0907] py-12 text-[#f6efe0] sm:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(44rem_18rem_at_85%_0%,rgba(232,200,114,0.2),transparent_65%),radial-gradient(40rem_16rem_at_5%_100%,rgba(232,200,114,0.1),transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8c872]/80 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e8c872]/50 to-transparent" />

      <Container className="max-w-6xl">
        <div className={cn("grid items-center gap-9", !expired && "lg:grid-cols-[1fr_1.1fr] lg:gap-14")}>
          <div className={cn(expired && "mx-auto max-w-2xl text-center")}>
            {countdown.eyebrow && (
              <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.24em] text-[#e8c872] sm:text-sm">
                <Hourglass className="h-4 w-4" aria-hidden /> {countdown.eyebrow}
              </span>
            )}
            <h2 id="countdown-heading" className="mt-3 font-display text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)] font-medium leading-tight text-white">
              {countdown.headline}
            </h2>
            {expired ? (
              <p className="mt-4 text-lg leading-relaxed text-[#e6e0d2]">{countdown.expiredMessage}</p>
            ) : (
              <>
                {countdown.description && <p className="mt-4 max-w-xl text-base leading-relaxed text-[#e6e0d2] sm:text-lg">{countdown.description}</p>}
                {countdown.ctaLabel && countdown.ctaHref && (
                  <Link
                    href={countdown.ctaHref}
                    className="group mt-6 inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-base font-bold text-[#2a1b04] [background:linear-gradient(135deg,#ffe9a8,#f0c04a_55%,#c58a1c)] shadow-[inset_0_2px_0_rgba(255,255,255,0.55),0_4px_0_#4a3510,0_16px_26px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
                  >
                    {countdown.ctaLabel}
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                )}
              </>
            )}
          </div>

          {!expired && (
            <div
              role="timer"
              aria-label={left ? `${left.days} days, ${left.hours} hours, ${left.minutes} minutes and ${left.seconds} seconds remaining` : "Countdown"}
              className="grid grid-cols-4 gap-2.5 sm:gap-4"
            >
              <Unit value={show(left?.days)} label="Days" />
              <Unit value={show(left?.hours)} label="Hours" />
              <Unit value={show(left?.minutes)} label="Minutes" />
              <Unit value={show(left?.seconds)} label="Seconds" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

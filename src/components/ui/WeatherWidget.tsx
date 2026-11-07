"use client";

import { useEffect, useRef, useState } from "react";
import { CloudSun, Loader2 } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { site } from "@/data/site";

export function WeatherWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(() => typeof window !== "undefined" && !("IntersectionObserver" in window));
  const { weather, loading } = useWeather(near);

  // Only contact the weather service once the widget is close to the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <CloudSun className="h-4 w-4 text-gold-deep" aria-hidden /> Weather near {site.location.label.split(",")[0]}
      </div>
      {loading ? (
        <div className="mt-3.5 flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
          <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden /> Loading…
        </div>
      ) : weather ? (
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-3xl text-foreground">{weather.tempC}°C</span>
          <span className="text-sm text-muted-foreground">{weather.description}</span>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Live weather is unavailable right now.</p>
      )}
    </div>
  );
}

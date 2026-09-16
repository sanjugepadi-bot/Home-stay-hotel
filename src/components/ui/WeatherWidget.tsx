"use client";

import { CloudSun, Loader2 } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { site } from "@/data/site";

export function WeatherWidget() {
  const { weather, loading } = useWeather();

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        <CloudSun className="h-4 w-4 text-gold-deep" /> Weather near {site.location.label.split(",")[0]}
      </div>
      {loading ? (
        <div className="mt-3.5 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : (
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-3xl text-foreground">{weather?.tempC}°C</span>
          <span className="text-sm text-muted-foreground">{weather?.description}</span>
        </div>
      )}
    </div>
  );
}

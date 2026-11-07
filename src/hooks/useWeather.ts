"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

type Weather = { tempC: number; code: number; description: string } | null;

const codeMap: Record<number, string> = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  80: "Rain showers",
  95: "Thunderstorm",
};

/**
 * Live weather from Open-Meteo. Pass `enabled=false` until the widget is near the viewport so the
 * third-party request is not made on every page load. If the request fails, `weather` stays null —
 * no placeholder temperature is ever shown.
 */
export function useWeather(enabled = true) {
  const [weather, setWeather] = useState<Weather>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${site.location.lat}&longitude=${site.location.lng}&current=temperature_2m,weather_code`;
    fetch(url, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("weather unavailable"))))
      .then((data) => {
        const temp = data?.current?.temperature_2m;
        const code = data?.current?.weather_code;
        if (typeof temp !== "number") throw new Error("weather unavailable");
        setWeather({ tempC: Math.round(temp), code, description: codeMap[code] ?? "Current conditions" });
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setWeather(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [enabled]);

  return { weather, loading };
}

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

export function useWeather() {
  const [weather, setWeather] = useState<Weather>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${site.location.lat}&longitude=${site.location.lng}&current=temperature_2m,weather_code`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const code = data?.current?.weather_code ?? 1;
        setWeather({
          tempC: Math.round(data?.current?.temperature_2m ?? 22),
          code,
          description: codeMap[code] ?? "Pleasant",
        });
      })
      .catch(() => setWeather({ tempC: 22, code: 1, description: "Pleasant" }))
      .finally(() => setLoading(false));
  }, []);

  return { weather, loading };
}

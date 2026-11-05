"use client";

import { useMemo, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { attractions, type AttractionCategory } from "@/data/attractions";
import { site } from "@/data/site";
import { haversineKm, estimateTravelMinutes } from "@/lib/utils";

const categories: AttractionCategory[] = ["Places", "Viewpoints", "Cafes", "Restaurants", "Temples", "Adventure"];

export function NearbyAttractions() {
  const [category, setCategory] = useState<AttractionCategory>("Places");

  const items = useMemo(() => {
    return attractions
      .filter((a) => a.category === category)
      .map((a) => {
        const km = haversineKm(site.location, a);
        return { ...a, km, mins: estimateTravelMinutes(km) };
      })
      .sort((a, b) => a.km - b.km);
  }, [category]);

  if (attractions.length === 0) return null;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${site.location.lng - 0.08}%2C${
    site.location.lat - 0.06
  }%2C${site.location.lng + 0.08}%2C${site.location.lat + 0.06}&layer=mapnik&marker=${site.location.lat}%2C${site.location.lng}`;

  return (
    <section id="nearby" className="scroll-mt-20 bg-muted/30 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Explore the Area" title="Nearby attractions" description={`Real distances and estimated drive times from ${site.name}.`} />

        <Tabs value={category} onValueChange={(v) => setCategory(v as AttractionCategory)} className="mt-10 flex justify-center">
          <TabsList>
            {categories.map((c) => (
              <TabsTrigger key={c} value={c}>{c}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((a, i) => (
              <Reveal key={a.name} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lg">
                  <p className="text-base font-semibold text-foreground">{a.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
                  <div className="mt-3.5 flex gap-4 text-xs font-semibold text-gold-deep">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {a.km.toFixed(1)} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> ~{a.mins} min
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-border">
            <iframe
              src={mapSrc}
              className="h-full min-h-80 w-full"
              title="Property location map"
              loading="lazy"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

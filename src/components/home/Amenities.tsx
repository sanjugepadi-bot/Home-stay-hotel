import { createElement } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";
import { amenities } from "@/data/amenities";

export function Amenities() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Amenities" title="Everything you need, nothing you don't" />
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {amenities.map((a, i) => {
            return (
              <Reveal key={a.label} delay={(i % 8) * 0.05}>
                <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-7 text-center shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest dark:bg-gold/10 dark:text-gold">
                    {createElement(getIcon(a.icon), { className: "h-5 w-5" })}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{a.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

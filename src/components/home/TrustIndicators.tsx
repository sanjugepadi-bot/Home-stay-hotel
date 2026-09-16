import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

const stats = [
  { value: site.reviewCount, suffix: "+", label: "Happy Guests Hosted" },
  { value: site.rating, decimals: 1, label: "Average Guest Rating" },
  { value: site.yearsHosting, suffix: "+", label: "Years of Hospitality" },
  { value: 98, suffix: "%", label: "Guests Who Return or Refer" },
];

export function TrustIndicators() {
  return (
    <section className="border-y border-border bg-muted/40 py-12 sm:py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix}
                decimals={s.decimals}
                className="text-3xl text-forest dark:text-gold sm:text-4xl"
              />
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

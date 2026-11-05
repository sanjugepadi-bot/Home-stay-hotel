import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { legacy } from "@/data/legacy";
import { rooms } from "@/data/rooms";

/**
 * Vertical timeline of the homestay's journey. Content lives in
 * src/data/legacy.ts — only owner-given facts, with a year shown only where
 * the owner has provided one.
 */
export function OurJourney() {
  const steps = legacy.journey.map((s) => {
    let text = s.text.replace("{rooms}", String(rooms.length));
    // The award step gains detail once the owner confirms who/when.
    if (s.label === "Recognition") {
      const { organisation, year } = legacy.award;
      if (organisation) text = text.replace(/\.$/, `, presented by ${organisation}.`);
      if (year && !s.year) return { ...s, text, year };
    }
    if (s.label === "The beginning" && !s.year && legacy.foundedYear) return { ...s, text, year: legacy.foundedYear };
    return { ...s, text };
  });

  return (
    <section id="journey" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Journey"
          title="A journey of hospitality"
          description="From a pioneering homestay in Dibrugarh to an award-winning stay by the tea garden."
        />

        <ol className="relative mx-auto mt-14 max-w-3xl">
          {/* the line the steps hang from */}
          <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-gold via-gold/50 to-gold/10" />
          {steps.map((s, i) => (
            <li key={s.label} className="relative pb-10 pl-12 last:pb-0 sm:pl-14">
              <span
                aria-hidden
                className="absolute left-0 top-1 flex h-[31px] w-[31px] items-center justify-center rounded-full border-2 border-gold bg-background font-display text-xs text-gold-deep"
              >
                {i + 1}
              </span>
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-gold/40 hover:shadow-lg">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">{s.label}</span>
                    {s.year && (
                      <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest dark:bg-gold/10 dark:text-gold">
                        {s.year}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl leading-snug text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

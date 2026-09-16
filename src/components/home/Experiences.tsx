import { createElement } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";
import { experiences } from "@/data/experiences";

export function Experiences() {
  return (
    <section id="experiences" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Experiences"
          title="More than just a stay"
          description="Curated local experiences to make your trip unforgettable."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp, i) => {
            return (
              <Reveal key={exp.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-border bg-card p-7 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-gold shadow-md transition-transform duration-300 group-hover:scale-110">
                    {createElement(getIcon(exp.icon), { className: "h-6 w-6" })}
                  </span>
                  <h3 className="mt-5 text-lg text-foreground">{exp.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                  <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wide text-gold-deep">
                    {exp.duration}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

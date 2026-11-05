import { PlayCircle, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { reviews } from "@/data/reviews";

export function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Guest Reviews"
          title="What our guests say"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i % 6) * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl">
                <Quote className="h-7 w-7 text-gold-deep/70" />
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">{r.text}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-sm font-bold text-beige-light">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.location} · {r.date}</p>
                    </div>
                  </div>
                  {r.video ? (
                    <PlayCircle className="h-8 w-8 shrink-0 text-gold-deep" />
                  ) : (
                    <StarRating rating={r.rating} />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

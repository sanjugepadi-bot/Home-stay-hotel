import Image from "next/image";
import { Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { awardSentence, legacy } from "@/data/legacy";
import { site } from "@/data/site";

/**
 * Award showcase. Shows only what the owner has confirmed: the award name is
 * always shown; the awarding organisation, year and note appear once filled in
 * (src/data/legacy.ts), and the real award photograph / certificate appear as
 * soon as image entries are added there.
 */
export function AwardRecognition() {
  const { title, organisation, year, note, images } = legacy.award;
  const details = [
    organisation ? { label: "Presented by", value: organisation } : null,
    year ? { label: "Year", value: year } : null,
  ].filter((d): d is { label: string; value: string } => d !== null);
  const hasImages = images.length > 0;

  return (
    <section id="recognition" className="scroll-mt-20 bg-gradient-to-b from-muted/50 to-background py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Recognition"
          title="An award-winning homestay in Dibrugarh"
          description={`${site.name} has been recognised for its hospitality with a Best Homestay / Best Hospitality award.`}
        />

        <div
          className={
            hasImages
              ? "mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14"
              : "mx-auto mt-14 max-w-2xl"
          }
        >
          <Reveal>
            <figure className="relative overflow-hidden rounded-3xl border border-gold/40 bg-card p-6 text-center shadow-[0_20px_50px_-20px_rgba(184,137,43,0.45)] sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
              />
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold-deep ring-1 ring-gold/40 dark:text-gold">
                <Award className="h-8 w-8" strokeWidth={1.5} />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">Award</p>
              <h3 className="mt-2 text-[clamp(1.375rem,1.1rem+1.2vw,1.875rem)] leading-snug text-foreground">{title}</h3>
              <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {awardSentence()}
                {note ? ` ${note}` : ""}
              </figcaption>

              {details.length > 0 && (
                <dl className="mt-6 grid gap-4 border-t border-border pt-6 text-left sm:grid-cols-2">
                  {details.map((d) => (
                    <div key={d.label}>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{d.label}</dt>
                      <dd className="mt-1 font-display text-lg text-foreground">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </figure>
          </Reveal>

          {hasImages && (
            <Reveal delay={0.1}>
              <ul className={images.length > 1 ? "grid gap-5 sm:grid-cols-2" : "grid gap-5"}>
                {images.map((img) => (
                  <li key={img.src}>
                    <figure className="overflow-hidden rounded-2xl border border-gold/40 bg-card p-2.5 shadow-xl">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="h-auto w-full rounded-lg"
                      />
                      {img.caption && (
                        <figcaption className="px-1 pb-1 pt-3 text-center text-xs text-muted-foreground">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

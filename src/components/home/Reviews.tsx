import { ExternalLink, MessageCircle, PlayCircle, Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { StarRating } from "@/components/ui/StarRating";
import { buttonVariants } from "@/components/ui/Button";
import { reviews, reviewsConfig, type Review } from "@/data/reviews";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

const LAYERED_SHADOW =
  "shadow-[0_1px_2px_rgba(70,45,10,0.06),0_16px_32px_-10px_rgba(70,45,10,0.16),0_46px_70px_-34px_rgba(70,45,10,0.4)] hover:shadow-[0_2px_4px_rgba(70,45,10,0.08),0_24px_44px_-12px_rgba(70,45,10,0.22),0_64px_90px_-34px_rgba(70,45,10,0.5)]";

function ReviewCard({ r }: { r: Review }) {
  const fromGoogle = r.source?.toLowerCase() === "google";
  return (
    <Tilt3D strength={0.5} className="h-full">
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-card p-7 transition-shadow duration-500 sm:p-8",
          LAYERED_SHADOW
        )}
      >
        <span aria-hidden className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-gold to-transparent" />
        <span aria-hidden className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gold/10 blur-2xl" />

        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f1d68f] via-gold to-[#9a742a] text-forest shadow-[0_8px_16px_-6px_rgba(90,60,10,0.55),inset_0_1px_0_rgba(255,255,255,0.6)]">
            <Quote className="h-6 w-6" aria-hidden />
          </span>
          {r.video ? (
            <PlayCircle className="h-9 w-9 shrink-0 text-gold-deep" aria-label="Video review" />
          ) : (
            <StarRating rating={r.rating} className="gap-1 [&_svg]:h-5 [&_svg]:w-5" />
          )}
        </div>

        <blockquote className="mt-6 flex-1 text-[1.0625rem] leading-8 text-foreground/90 sm:text-lg">
          <p>{r.text}</p>
        </blockquote>

        <div className="mt-7 flex min-h-[7.5rem] items-start gap-4 border-t border-border pt-6">
          <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-lg font-bold text-beige-light ring-2 ring-gold/50 ring-offset-2 ring-offset-card">
            {r.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-foreground">{r.name}</p>
            <p className="text-sm text-muted-foreground">
              {r.location} · {r.date}
            </p>
            {r.source && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                {fromGoogle && r.url ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
                    View on Google <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                ) : (
                  <>Source: {r.source}</>
                )}
              </p>
            )}
          </div>
        </div>
      </article>
    </Tilt3D>
  );
}

/**
 * "Guest Reviews & Experiences". Shows ONLY genuine reviews from src/data/reviews.ts. While that list is
 * empty it shows an honest invitation (no placeholder reviews, names or ratings).
 */
export function Reviews() {
  const count = reviews.length;
  const rated = reviews.filter((r) => !r.video);
  const average = rated.length ? rated.reduce((sum, r) => sum + r.rating, 0) / rated.length : 0;
  const googleUrl = reviewsConfig.googleReviewsUrl;
  const shareLink = whatsappLink(`Hi ${site.name}! I'd like to share my experience of staying with you.`);

  return (
    <section id="reviews" className="rooms-stage relative isolate scroll-mt-20 overflow-hidden py-20 sm:py-28 xl:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-20 -z-10 hidden h-[28rem] w-[18rem] rounded-t-full border border-gold/25 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-16 -z-10 hidden h-[26rem] w-[16rem] rounded-t-full border border-gold/20 lg:block" />

      <Container className="max-w-7xl">
        <SectionHeading
          eyebrow="Guest Reviews"
          title="Guest Reviews & Experiences"
          description={count > 0 ? `What guests say about staying at ${site.name}.` : undefined}
        />

        {count >= 3 && (
          <Reveal>
            <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-gold/40 bg-card/80 px-6 py-3 shadow-[0_14px_30px_-16px_rgba(70,45,10,0.4)] backdrop-blur-sm">
              <Star className="h-5 w-5 fill-gold-deep text-gold-deep" aria-hidden />
              <span className="font-display text-2xl text-foreground">{average.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                out of 5 · from the {count} guest reviews shown here
              </span>
            </div>
          </Reveal>
        )}

        {count > 0 ? (
          <div
            className={cn(
              "mt-12 grid gap-7 lg:gap-9",
              count === 1 && "mx-auto max-w-2xl",
              count === 2 && "mx-auto max-w-4xl sm:grid-cols-2",
              count >= 3 && "sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {reviews.map((r, i) => (
              <Reveal key={`${r.name}-${r.date}-${i}`} delay={(i % 6) * 0.07} className="h-full">
                <ReviewCard r={r} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className={cn("relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-[2rem] border border-white/70 bg-card p-8 text-center sm:p-12", LAYERED_SHADOW)}>
              <span aria-hidden className="absolute inset-x-10 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-gold to-transparent" />
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f1d68f] via-gold to-[#9a742a] text-forest shadow-[0_10px_20px_-8px_rgba(90,60,10,0.55),inset_0_1px_0_rgba(255,255,255,0.6)]">
                <Quote className="h-7 w-7" aria-hidden />
              </span>
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                Genuine guest reviews will be shown here. Have you stayed with us? We&apos;d love to hear about your experience.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {googleUrl && (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "forest", size: "lg" }), "min-h-14 px-8")}
            >
              Read More Reviews on Google <ExternalLink className="h-4.5 w-4.5" aria-hidden />
            </a>
          )}
          <a
            href={shareLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: googleUrl ? "outline" : "whatsapp", size: "lg" }), "min-h-14 px-8")}
          >
            <MessageCircle className="h-4.5 w-4.5" aria-hidden /> Share your experience
          </a>
        </div>
      </Container>
    </section>
  );
}

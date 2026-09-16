import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { site } from "@/data/site";
import { photos } from "@/lib/photos";

export function OwnerStory() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SmartImage
            icon="Home"
            seed={2}
            aspect="aspect-[4/5]"
            className="w-full max-w-md"
            label="Our Garden & Grounds"
            src={photos.exteriorGarden}
            alt="The garden and grounds at Serenity Stays"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
            <span className="h-px w-6 bg-gold-deep/60" aria-hidden />
            Our Story
          </span>
          <h2 className="mt-4 text-3xl leading-[1.12] tracking-tight text-foreground sm:text-4xl">
            A home, shared with love
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            {site.name} began as a family home before it became a stay — built by hands that still tend the garden
            you&apos;ll walk through today. What started as a way to share our love for these hills with travelers
            has grown into a small community of guests who keep coming back.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We cook the same recipes passed down through generations, source produce from neighboring farms, and
            treat every guest the way we&apos;d want to be treated on our own travels — with warmth, honesty, and
            genuine care. That&apos;s the promise behind every stay here.
          </p>
          <div className="mt-7 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-lg text-beige-light">
              S
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">The Hosting Family</p>
              <p className="text-xs text-muted-foreground">Hosting since {new Date().getFullYear() - site.yearsHosting}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

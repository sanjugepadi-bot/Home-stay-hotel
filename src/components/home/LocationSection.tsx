import { Bus, ExternalLink, MapPin, Navigation, Plane, Train } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { directionsUrl, locationInfo } from "@/data/location";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** "Find us" — the homestay's location, in the owner's own words, with the nearby places and travel times set out clearly. */
export function LocationSection() {
  return (
    <section id="location" className="relative isolate scroll-mt-20 overflow-hidden py-20 sm:py-28 xl:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50rem_26rem_at_8%_10%,rgba(63,106,82,0.10),transparent_62%),radial-gradient(46rem_26rem_at_95%_90%,rgba(201,162,75,0.14),transparent_62%)]"
      />
      <Container className="max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          {/* Story */}
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-gold-deep sm:text-sm">
              <span className="h-px w-8 bg-gold" aria-hidden /> Find Us
            </span>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,1.3rem+2.6vw,3.6rem)] font-medium leading-[1.08] tracking-tight text-foreground">
              Homestay in Seujpur, Dibrugarh, Assam
            </h2>
            <p className="mt-7 max-w-2xl text-[clamp(1.0625rem,0.98rem+0.4vw,1.25rem)] leading-[1.8] text-muted-foreground">
              {locationInfo.story}
            </p>

            <address className="mt-8 flex max-w-xl items-start gap-3 rounded-2xl border border-border bg-card p-5 not-italic shadow-[0_18px_40px_-26px_rgba(30,40,30,0.4)]">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
              <span className="text-base leading-relaxed text-foreground">{site.location.address}</span>
            </address>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "forest", size: "lg" }), "mt-6")}
            >
              <Navigation className="h-4.5 w-4.5" aria-hidden /> Get directions
              <ExternalLink className="h-4 w-4 opacity-70" aria-hidden />
            </a>
          </Reveal>

          {/* Nearby + travel times */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-[radial-gradient(40rem_22rem_at_85%_0%,rgba(224,191,118,0.18),transparent_60%),linear-gradient(160deg,#25432f_0%,#1c3526_55%,#16291f_100%)] p-7 text-beige-light shadow-[0_40px_80px_-34px_rgba(10,25,15,0.75)] sm:p-9">
              <div aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full border border-gold/25" />

              <h3 className="font-display text-2xl font-medium text-beige-light sm:text-[1.7rem]">Close to key places in Dibrugarh</h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {locationInfo.nearby.map((n) => (
                  <li key={n} className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[0.95rem] font-medium text-gold-light">
                    <MapPin className="h-4 w-4" aria-hidden /> {n}
                  </li>
                ))}
              </ul>

              <h3 className="mt-9 text-xs font-bold uppercase tracking-[0.22em] text-gold-light sm:text-sm">Travel times</h3>
              <ul className="mt-4 space-y-4">
                {locationInfo.travel.map((t) => (
                  <li key={t.id} className="flex items-center gap-4 rounded-2xl border border-beige-light/15 bg-white/[0.05] p-4 sm:gap-5 sm:p-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f1d68f] via-gold to-[#9a742a] text-forest shadow-[0_10px_20px_-8px_rgba(0,0,0,0.6)]">
                      {t.id === "airport" ? <Plane className="h-6 w-6" aria-hidden /> : (
                        <span className="relative flex items-center justify-center">
                          <Train className="h-6 w-6" aria-hidden />
                          <Bus className="absolute -bottom-2 -right-2 h-3.5 w-3.5 rounded-full bg-gold p-0.5 text-forest" aria-hidden />
                        </span>
                      )}
                    </span>
                    <p className="min-w-0 text-base leading-snug text-beige-light/90 sm:text-[1.0625rem]">
                      <span className="block font-display text-[1.35rem] leading-tight text-beige-light sm:text-2xl">{t.time}</span>
                      from {t.place}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

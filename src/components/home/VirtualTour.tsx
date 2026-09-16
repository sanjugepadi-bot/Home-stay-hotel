import { PlayCircle, View } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function VirtualTour() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Virtual Tour" title="Walk through before you arrive" />
        <Reveal className="mt-10">
          {site.virtualTourUrl ? (
            <div className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl border border-border">
              <iframe src={site.virtualTourUrl} className="h-full w-full" allowFullScreen title="Virtual tour" />
            </div>
          ) : (
            <div className="relative mx-auto flex aspect-video max-w-4xl flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-forest via-forest-light to-forest text-beige-light shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,162,75,0.25),transparent_60%)]" />
              <View className="relative h-10 w-10 text-gold-light" strokeWidth={1.25} />
              <button className="relative mt-5 flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-forest shadow-lg transition-transform hover:scale-105">
                <PlayCircle className="h-5 w-5" /> Launch 360° Tour
              </button>
              <p className="relative mt-4 max-w-sm px-6 text-center text-xs text-beige-light/75">
                Add your Matterport or 360° video link in the site config to enable an interactive walkthrough here.
              </p>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

// Hidden until a 360° / Matterport link is set in data/site.ts (virtualTourUrl).
export function VirtualTour() {
  if (!site.virtualTourUrl) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Virtual Tour" title="Walk through before you arrive" />
        <Reveal className="mt-10">
          <div className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl border border-border">
            <iframe src={site.virtualTourUrl} className="h-full w-full" allowFullScreen title="Virtual tour" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

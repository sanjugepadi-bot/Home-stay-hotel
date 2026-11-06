import { Award, CalendarClock, HeartHandshake, Palette } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { rooms, TOTAL_ROOMS } from "@/data/rooms";

const features = [
  {
    icon: CalendarClock,
    title: "Over a Decade of Experience",
    text: "More than ten years of hosting guests in Dibrugarh, Assam.",
  },
  {
    icon: Award,
    title: "Recognised Hospitality",
    text: "Recipient of a Best Homestay / Best Hospitality award.",
  },
  {
    icon: Palette,
    title: "Unique Themed Rooms",
    text: `${rooms.length} individually themed guest rooms, each with its own colour and character — plus a separate Party Room, ${TOTAL_ROOMS} rooms in total.`,
  },
  {
    icon: HeartHandshake,
    title: "Personalised Guest Experience",
    text: "Traditional Assamese hospitality, arranged directly with the host over WhatsApp.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why guests choose our homestay in Dibrugarh"
          description="Unique accommodation in Dibrugarh, backed by experience and recognition."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="h-full">
              <Card className="h-full p-7 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest dark:bg-gold/10 dark:text-gold">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg leading-snug text-foreground">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <a href="#book" className={buttonVariants({ variant: "gold", size: "lg" })}>
              Check Availability
            </a>
            <a href="#rooms" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Explore Our Rooms
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

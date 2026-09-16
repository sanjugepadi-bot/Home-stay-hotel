import { Mountain, HeartHandshake, Wallet, Trees } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

const highlights = [
  { icon: Mountain, title: "Breathtaking Location", text: "Perched amid rolling hills with uninterrupted valley views from every room." },
  { icon: HeartHandshake, title: "Authentic Hospitality", text: "A family-run stay where every guest is welcomed like an old friend." },
  { icon: Trees, title: "Close to Nature", text: "Forest trails, waterfalls, and viewpoints all within a short walk or drive." },
  { icon: Wallet, title: "Genuine Value", text: "Luxury-grade comfort at honest, transparent prices — no hidden fees." },
];

export function PropertyHighlights() {
  return (
    <section id="highlights" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Serenity Stays"
          title="A stay designed around you"
          description="Every detail — from the view to the welcome drink — is crafted for comfort, connection, and calm."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <Card className="h-full p-7 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest dark:bg-gold/10 dark:text-gold">
                  <h.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg text-foreground">{h.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

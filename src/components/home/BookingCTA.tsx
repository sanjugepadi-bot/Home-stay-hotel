import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WeatherWidget } from "@/components/ui/WeatherWidget";
import { CurrencyConverter } from "@/components/ui/CurrencyConverter";
import { BookingForm } from "@/components/booking/BookingForm";

export function BookingCTA() {
  return (
    <section id="book" className="bg-gradient-to-b from-muted/40 to-background py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Book Your Stay"
          title="Ready for your Serenity getaway?"
          description="Send us a quick request and we'll confirm your dates within minutes."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <BookingForm />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <WeatherWidget />
            <CurrencyConverter />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

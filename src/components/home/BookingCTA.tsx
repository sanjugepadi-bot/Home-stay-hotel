import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WeatherWidget } from "@/components/ui/WeatherWidget";
import { CurrencyConverter } from "@/components/ui/CurrencyConverter";
import { BookingForm } from "@/components/booking/BookingForm";

export function BookingCTA() {
  return (
    <section id="book" className="scroll-mt-20 bg-gradient-to-b from-muted/40 to-background py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Book Your Stay"
          title="Ready for your tea garden getaway?"
          description="Send a quick request on WhatsApp and the host will confirm availability and rates."
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
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Prefer to speak to us? See our{" "}
          <Link href="/contact" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
            contact details
          </Link>{" "}
          or browse the{" "}
          <a href="#rooms" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
            themed rooms
          </a>
          .
        </p>
      </Container>
    </section>
  );
}

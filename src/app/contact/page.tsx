import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/booking/BookingForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Book",
  description: `Get in touch with ${site.name} or send a booking request directly.`,
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <Container className="max-w-5xl">
        <SectionHeading eyebrow="Contact" title="We'd love to hear from you" align="left" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-5">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
              <p className="text-sm leading-relaxed text-muted-foreground">{site.location.address}</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
              <Phone className="h-5 w-5 shrink-0 text-gold-deep" />
              <p className="text-sm text-muted-foreground">{site.phone}</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
              <Mail className="h-5 w-5 shrink-0 text-gold-deep" />
              <p className="text-sm text-muted-foreground">{site.email}</p>
            </div>
          </div>

          <BookingForm />
        </div>
      </Container>
    </div>
  );
}

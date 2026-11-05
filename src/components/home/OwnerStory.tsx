import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { buttonVariants } from "@/components/ui/Button";
import { site, whatsappLink } from "@/data/site";
import { rooms } from "@/data/rooms";
import { photos } from "@/lib/photos";

export function OwnerStory() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SmartImage
            icon="Home"
            seed={2}
            aspect="aspect-[4/3]"
            className="w-full"
            label="The Blue Room"
            src={photos.blueRoom1}
            alt={`The Blue Room at ${site.name}, with blue walls, a large wall clock and a white iron table`}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
            <span className="h-px w-6 bg-gold-deep/60" aria-hidden />
            About the Homestay
          </span>
          <h2 className="mt-4 text-3xl leading-[1.12] tracking-tight text-foreground sm:text-4xl">
            Come and enjoy traditional Assamese hospitality
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            {site.name} is at {site.location.streetAddress}, {site.location.locality}. Its {rooms.length} rooms
            are each styled around a colour and a character — the Gold Room&apos;s painted ceiling, the Black
            Room&apos;s retro black-and-white decor, the all-white White Room and the Blue Room with its Bali
            craftworks, among others.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Explore the{" "}
            <Link href="/rooms" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
              rooms and rates
            </Link>
            , read{" "}
            <Link href="/about" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
              our story and journey
            </Link>
            , or message us on WhatsApp to ask about a room, check availability or plan your stay.
          </p>
          <a
            href={whatsappLink(`Hi ${site.name}! I'd like to know more about the rooms.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonVariants({ variant: "whatsapp", size: "md" })} mt-7`}
          >
            <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

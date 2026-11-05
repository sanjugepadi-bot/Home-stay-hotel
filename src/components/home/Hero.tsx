"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Award, CalendarClock, Palette } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { site, whatsappLink } from "@/data/site";
import { rooms } from "@/data/rooms";
import { legacy } from "@/data/legacy";
import heroImage from "../../../public/images/homestay/hero/hero-tea-garden-bedroom-portrait-4x5.webp";

const badges = [
  { icon: CalendarClock, label: `${legacy.yearsLabel} years of hospitality` },
  { icon: Award, label: "Award-winning homestay" },
  { icon: Palette, label: `${rooms.length} themed rooms` },
];

const heroAlt = `A sunlit bedroom with a balcony door opening onto a tea garden — illustrative image`;

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-background pt-28 pb-12 sm:pt-32 lg:pb-16 lg:pt-36">
      {/* Soft ivory-and-gold atmosphere — no photo behind the text, so nothing needs darkening */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.18),transparent_65%)]" />
        <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(47,87,65,0.10),transparent_65%)]" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
          <div className="hero-rise order-2 lg:order-1">
            <span className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep sm:text-xs">
              <span className="h-px w-8 bg-gold" /> Homestay in Dibrugarh, Assam
            </span>
            <h1 className="font-display text-[clamp(2.4rem,1.5rem+3.6vw,4.4rem)] font-medium leading-[1.06] tracking-tight text-foreground">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-lg text-[clamp(1rem,0.92rem+0.4vw,1.2rem)] leading-relaxed text-muted-foreground">
              {site.subheadline}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#rooms" className="group">
                <Button variant="forest" size="lg" className="px-9">
                  Explore Our Rooms <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
              <a
                href={whatsappLink(`Hi ${site.name}! I'd like to enquire about a stay.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg">
                  <MessageCircle className="h-4.5 w-4.5" /> WhatsApp Enquiry
                </Button>
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-6">
              {badges.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <Icon className="h-4 w-4 text-gold-deep" /> {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 mx-auto w-full max-w-[27rem] lg:order-2">
            <div className="relative">
              {/* Offset gold frame */}
              <div aria-hidden className="absolute -inset-3 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-3xl border border-gold/50" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-muted shadow-2xl shadow-forest/20 ring-1 ring-forest/10">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 448px) 432px, 92vw"
                  quality={90}
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-forest/25 to-transparent" />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/70 backdrop-blur-sm">
                  Illustrative image
                </span>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 lg:mt-16"
        >
          <BookingWidget />
        </motion.div>
      </Container>
    </section>
  );
}

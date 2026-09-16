"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Star, Users, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { site, whatsappLink } from "@/data/site";
import { photos } from "@/lib/photos";

const badges = [
  { icon: Star, label: `${site.rating} Guest Rating` },
  { icon: Users, label: `${site.reviewCount}+ Happy Guests` },
  { icon: ShieldCheck, label: "Best Price Guarantee" },
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest pt-28 pb-10 sm:items-center sm:pb-16">
      {/* Full-bleed property photography stands in for a hero video, with a slow Ken-Burns drift */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -inset-[6%]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={photos.heroBedroom}
            alt="Luxury bedroom with mountain views at Serenity Stays"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(201,162,75,0.2),transparent_55%)]" />
        <div className="hero-noise absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(19,36,25,0.92)_0%,rgba(19,36,25,0.4)_50%,rgba(19,36,25,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(19,36,25,0.55)_0%,rgba(19,36,25,0)_60%)]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
            {site.location.label}
          </span>
          <h1 className="font-display text-4xl leading-[1.08] text-beige-light sm:text-6xl lg:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base text-beige-light/80 sm:text-lg">
            {site.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#book">
              <Button variant="gold" size="lg">Book Now</Button>
            </a>
            <a
              href={whatsappLink(`Hi ${site.name}! I'd like to enquire about a stay.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg">
                <MessageCircle className="h-4.5 w-4.5" /> WhatsApp Inquiry
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-beige-light/85">
                <Icon className="h-4 w-4 text-gold" /> {label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 lg:mt-14"
        >
          <BookingWidget />
        </motion.div>
      </Container>
    </section>
  );
}

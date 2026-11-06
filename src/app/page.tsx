import type { Metadata } from "next";
import { buildMetadata, homeTitle } from "@/lib/seo";
import { site } from "@/data/site";
import { Hero } from "@/components/home/Hero";
import { OurLegacy } from "@/components/home/OurLegacy";
import { AwardRecognition } from "@/components/home/AwardRecognition";
import { RoomShowcase } from "@/components/home/RoomShowcase";
import { getShowcaseImages } from "@/lib/showcase";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Experiences } from "@/components/home/Experiences";
import { AiTravelAssistant } from "@/components/home/AiTravelAssistant";
import { Gallery } from "@/components/home/Gallery";
import { VirtualTour } from "@/components/home/VirtualTour";
import { Amenities } from "@/components/home/Amenities";
import { Reviews } from "@/components/home/Reviews";
import { OwnerStory } from "@/components/home/OwnerStory";
import { NearbyAttractions } from "@/components/home/NearbyAttractions";
import { FAQ } from "@/components/home/FAQ";
import { BookingCTA } from "@/components/home/BookingCTA";

export const metadata: Metadata = buildMetadata({
  title: { absolute: homeTitle },
  socialTitle: homeTitle,
  description: site.metaDescription,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <OurLegacy />
      <AwardRecognition />
      <RoomShowcase illustrations={{ ...(getShowcaseImages().gold ? { gold: getShowcaseImages().gold as string } : {}) }} />
      <WhyChooseUs />
      <Experiences />
      <AiTravelAssistant />
      <Gallery />
      <VirtualTour />
      <Amenities />
      <Reviews />
      <OwnerStory />
      <NearbyAttractions />
      <FAQ />
      <BookingCTA />
    </>
  );
}

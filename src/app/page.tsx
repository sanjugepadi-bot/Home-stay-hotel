import { Hero } from "@/components/home/Hero";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { PropertyHighlights } from "@/components/home/PropertyHighlights";
import { RoomShowcase } from "@/components/home/RoomShowcase";
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

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <PropertyHighlights />
      <RoomShowcase />
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

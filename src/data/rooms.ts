import type { PhotoKey } from "@/lib/photos";

export type Room = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  occupancy: number;
  beds: string;
  sizeSqft: number;
  priceFrom: number;
  available: boolean;
  amenities: string[];
  icon: "BedDouble" | "Home" | "TreePine" | "Sparkles";
  photoKey: PhotoKey;
};

export const rooms: Room[] = [
  {
    id: "deluxe",
    slug: "deluxe-room",
    name: "Deluxe Room",
    tagline: "Cosy comfort with a mountain view",
    occupancy: 2,
    beds: "1 Queen Bed",
    sizeSqft: 220,
    priceFrom: 1300,
    available: true,
    amenities: ["Free WiFi", "Smart TV", "Mountain View", "Air Conditioning"],
    icon: "BedDouble",
    photoKey: "roomDeluxe",
  },
  {
    id: "family",
    slug: "family-room",
    name: "Family Room",
    tagline: "Room enough for the whole family",
    occupancy: 4,
    beds: "2 Queen Beds",
    sizeSqft: 340,
    priceFrom: 2600,
    available: true,
    amenities: ["Free WiFi", "Smart TV", "Balcony", "Work Desk"],
    icon: "Home",
    photoKey: "roomFamily",
  },
  {
    id: "cottage",
    slug: "cottage-stay",
    name: "Cottage Stay",
    tagline: "A private cottage among the pines",
    occupancy: 3,
    beds: "1 King + 1 Single",
    sizeSqft: 400,
    priceFrom: 3400,
    available: true,
    amenities: ["Free WiFi", "Bonfire", "Pet Friendly", "Private Balcony"],
    icon: "TreePine",
    photoKey: "cottageExterior",
  },
  {
    id: "suite",
    slug: "premium-suite",
    name: "Premium Suite",
    tagline: "Our most indulgent stay, top to bottom",
    occupancy: 3,
    beds: "1 King Bed",
    sizeSqft: 520,
    priceFrom: 4800,
    available: true,
    amenities: ["Free WiFi", "Smart TV", "Mountain View", "Airport Pickup"],
    icon: "Sparkles",
    photoKey: "roomSuite",
  },
];

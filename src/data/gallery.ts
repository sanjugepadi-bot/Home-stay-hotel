import type { PhotoKey } from "@/lib/photos";

export type GalleryItem = {
  id: string;
  tag: "Property" | "Rooms" | "Food" | "Nature" | "Experiences";
  type: "photo" | "video";
  icon: string;
  caption: string;
  photoKey: PhotoKey;
};

export const gallery: GalleryItem[] = [
  { id: "g1", tag: "Property", type: "photo", icon: "Home", caption: "Main cottage at golden hour", photoKey: "heroCottage" },
  { id: "g2", tag: "Rooms", type: "photo", icon: "BedDouble", caption: "Deluxe Room with smart TV", photoKey: "smartTvRoom" },
  { id: "g3", tag: "Nature", type: "photo", icon: "Mountain", caption: "Balcony views over the valley", photoKey: "balcony" },
  { id: "g4", tag: "Food", type: "photo", icon: "UtensilsCrossed", caption: "Home-cooked breakfast spread", photoKey: "breakfast" },
  { id: "g5", tag: "Experiences", type: "video", icon: "Flame", caption: "Bonfire evening highlights", photoKey: "bonfire" },
  { id: "g6", tag: "Property", type: "photo", icon: "TreePine", caption: "Cozy indoor lounge", photoKey: "livingFireplace" },
  { id: "g7", tag: "Rooms", type: "photo", icon: "Sparkles", caption: "Premium Suite bathroom", photoKey: "bathroom" },
  { id: "g8", tag: "Nature", type: "photo", icon: "Trees", caption: "Forest trail near the property", photoKey: "trekking" },
  { id: "g9", tag: "Property", type: "photo", icon: "Laptop", caption: "Work-friendly desk with a view", photoKey: "workspace" },
  { id: "g10", tag: "Property", type: "video", icon: "Waves", caption: "Property walkthrough", photoKey: "exteriorModern" },
  { id: "g11", tag: "Food", type: "photo", icon: "Utensils", caption: "Candlelit dinner setting", photoKey: "diningCandlelight" },
  { id: "g12", tag: "Nature", type: "photo", icon: "CloudSun", caption: "Misty morning on the deck", photoKey: "amenitiesBalcony" },
];

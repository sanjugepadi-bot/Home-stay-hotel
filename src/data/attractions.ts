export type AttractionCategory =
  | "Places"
  | "Cafes"
  | "Restaurants"
  | "Viewpoints"
  | "Temples"
  | "Adventure";

export type Attraction = {
  name: string;
  category: AttractionCategory;
  description: string;
  lat: number;
  lng: number;
};

// Add verified nearby places here (with real coordinates) — the Nearby
// Attractions section stays hidden while empty.
export const attractions: Attraction[] = [];

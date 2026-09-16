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

// Sample data centered near the property — replace with real nearby spots.
export const attractions: Attraction[] = [
  { name: "Sim's Park Botanical Garden", category: "Places", description: "A lush botanical garden with rare exotic trees.", lat: 11.3520, lng: 76.7980 },
  { name: "Lamb's Rock", category: "Viewpoints", description: "Panoramic views over coffee and tea estates.", lat: 11.3005, lng: 76.7610 },
  { name: "Dolphin's Nose", category: "Viewpoints", description: "Dramatic cliffside viewpoint over the valley.", lat: 11.3160, lng: 76.7690 },
  { name: "Sri Kamatchi Amman Temple", category: "Temples", description: "A serene hilltop temple with valley views.", lat: 11.3480, lng: 76.7890 },
  { name: "Catherine Falls", category: "Adventure", description: "A scenic two-tier waterfall trek.", lat: 11.3990, lng: 76.7440 },
  { name: "Highfield Cafe", category: "Cafes", description: "Cosy cafe known for filter coffee and homemade cake.", lat: 11.3450, lng: 76.7920 },
  { name: "The Bakers Nook", category: "Cafes", description: "Fresh bakes and all-day breakfast spot.", lat: 11.3390, lng: 76.7860 },
  { name: "Nilgiri Kitchen", category: "Restaurants", description: "Local Tamil Nadu cuisine in a family-run setting.", lat: 11.3430, lng: 76.7910 },
  { name: "Hill View Multicuisine", category: "Restaurants", description: "Multi-cuisine dining with a valley-facing terrace.", lat: 11.3370, lng: 76.7830 },
  { name: "Droog Fort Trek", category: "Adventure", description: "A moderate trek to historic fort ruins with sunset views.", lat: 11.3700, lng: 76.7350 },
  { name: "Tea Museum & Factory", category: "Places", description: "Learn how the region's famous tea is made, with tastings.", lat: 11.3300, lng: 76.8050 },
  { name: "Sri Subramanya Swamy Temple", category: "Temples", description: "A peaceful temple popular with local devotees.", lat: 11.3560, lng: 76.7750 },
];

export type Experience = {
  title: string;
  description: string;
  duration: string;
  icon: string;
};

export const experiences: Experience[] = [
  { title: "Trekking", description: "Guided trails through pine forests and ridgelines.", duration: "3-5 hrs", icon: "Mountain" },
  { title: "Bonfire Evenings", description: "Stories, music, and warmth under the stars.", duration: "2 hrs", icon: "Flame" },
  { title: "BBQ Night", description: "A private open-fire barbecue set up just for you.", duration: "2 hrs", icon: "Utensils" },
  { title: "Village Walk", description: "Meet local artisans and taste home-grown produce.", duration: "1.5 hrs", icon: "Footprints" },
  { title: "Wildlife Safari", description: "Spot native birds and wildlife in the reserve nearby.", duration: "4 hrs", icon: "PawPrint" },
  { title: "Cycling", description: "Scenic rides along quiet hill roads.", duration: "2-3 hrs", icon: "Bike" },
  { title: "River Activities", description: "Kayaking and riverside picnics in season.", duration: "2 hrs", icon: "Waves" },
  { title: "Photography Tours", description: "Golden-hour shoots at the best viewpoints.", duration: "2 hrs", icon: "Camera" },
];

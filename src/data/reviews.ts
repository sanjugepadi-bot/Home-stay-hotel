export type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  video?: boolean;
};

// Add real guest reviews here — the Reviews section stays hidden while empty.
export const reviews: Review[] = [];

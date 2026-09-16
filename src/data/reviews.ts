export type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  video?: boolean;
};

export const reviews: Review[] = [
  {
    name: "Ananya Rao",
    location: "Bengaluru",
    rating: 5,
    text: "Genuinely one of the best homestays we've been to. The hosts made us feel like family, and the mountain view from our balcony was unreal.",
    date: "March 2026",
  },
  {
    name: "Rohit & Meera",
    location: "Mumbai",
    rating: 5,
    text: "Booked the Premium Suite for our anniversary — every detail was thoughtful. Would come back in a heartbeat.",
    date: "January 2026",
    video: true,
  },
  {
    name: "Fatima Sheikh",
    location: "Hyderabad",
    rating: 5,
    text: "The home-cooked food alone is worth the trip. Loved the bonfire evening with the other guests too.",
    date: "December 2025",
  },
  {
    name: "Daniel Cooper",
    location: "London, UK",
    rating: 5,
    text: "As an international traveler I was nervous about the logistics, but the team arranged airport pickup and everything was seamless.",
    date: "November 2025",
    video: true,
  },
  {
    name: "Priya & family",
    location: "Chennai",
    rating: 4,
    text: "Great stay for kids — the family room was spacious and the staff went out of their way to help with our toddler.",
    date: "October 2025",
  },
  {
    name: "Arjun Mehta",
    location: "Delhi",
    rating: 5,
    text: "Came for a solo work-from-hills week. Fast WiFi, a proper desk, and the most peaceful mornings I've had in years.",
    date: "September 2025",
  },
];

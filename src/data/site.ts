export const site = {
  name: "Serenity Stays",
  tagline: "Your Perfect Stay Awaits",
  subheadline: "Experience comfort, nature, and authentic hospitality.",
  description:
    "A premium boutique homestay nestled in the hills — comfort, nature, and authentic hospitality for couples, families, and travelers seeking a stay that feels like home.",
  // Sample location — replace with the real property's address & coordinates.
  location: {
    label: "Serenity Valley, Nilgiri Hills, Tamil Nadu",
    address: "Serenity Stays, Dolphin's Nose Road, Coonoor, Nilgiris, Tamil Nadu 643101",
    lat: 11.341,
    lng: 76.795,
  },
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@serenitystays.example",
  rating: 4.9,
  reviewCount: 512,
  yearsHosting: 6,
  responseTime: "Under 30 min",
  currency: "INR",
  social: {
    instagram: "https://instagram.com/serenitystays",
    facebook: "https://facebook.com/serenitystays",
    youtube: "https://youtube.com/@serenitystays",
  },
  // Add a Matterport / 360 embed URL to enable the Virtual Tour section.
  virtualTourUrl: "",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

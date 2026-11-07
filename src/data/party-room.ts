/**
 * The Party Room — a SEPARATE space at the homestay (owner-confirmed): the 9th of the property's 9 rooms.
 * It is NOT one of the 8 guest bedrooms.
 *
 * Only what the owner has confirmed is stated on the website. Everything else is left empty on purpose;
 * the card hides each field until it is filled in, and shows a "details coming soon" notice until then.
 *
 * STILL NEEDED FROM THE OWNER:
 *  • (done) description, capacity, facilities, sleeping arrangements
 *  • capacity (number of guests)          • facilities / what is included
 *  • rate / how it is charged             • whether it can be booked for overnight stays
 *  • real photographs (>= 1600 px wide, no people / phone numbers / app overlays)
 */
import type { StaticImageData } from "next/image";
import loungeBeds from "../../public/images/homestay/party-room/party-room-chalk-art-lounge-and-beds.webp";
import sofaWindowBeds from "../../public/images/homestay/party-room/party-room-sofa-window-and-beds.webp";
import yellowSofaWindow from "../../public/images/homestay/party-room/party-room-yellow-sofa-and-window.webp";
import chalkWallBeds from "../../public/images/homestay/party-room/party-room-chalk-art-wall-and-beds.webp";

export type PartyRoomPhoto = { id: string; src: StaticImageData; caption: string; alt: string };

export const partyRoom = {
  name: "The Party Room",
  /** SEO heading shown above the description (owner-supplied wording). */
  descriptionTitle: "Spacious Party Room in Dibrugarh for Celebrations & Private Events",
  /** Owner-supplied description, one paragraph per entry (shown exactly as written). */
  description: [
    "Enjoy unforgettable celebrations at the spacious Party Room at Homestay by the Tea Garden, Dibrugarh, featuring beautiful views of the tea gardens. Designed for hosting up to 20 guests, it is an ideal venue for birthday parties, anniversaries, engagement celebrations, bachelor parties and hen parties.",
    "The Party Room offers a lively atmosphere with a sound system, psychedelic lighting, a kitchen and a bar counter. It also provides sleeping arrangements for up to 6 guests, with convertible sofa beds, making it suitable for both private celebrations and comfortable overnight stays.",
    "Whether you're planning an intimate gathering or a special occasion with friends and family, our Party Room in Dibrugarh offers a spacious and memorable setting.",
  ] as string[],
  /** Owner-confirmed capacity. */
  capacity: "Up to 20 guests",
  /** Owner to provide, e.g. "₹15,000 per event". */
  rate: "",
  /** Owner-confirmed facilities (rate is still to be provided). */
  facilities: ["Sound system", "Psychedelic lighting", "Kitchen", "Bar counter", "Sleeps up to 6 guests", "Convertible sofa beds"] as string[],
  /** Owner-confirmed: sleeping arrangements for up to 6 guests, so overnight stays are possible. */
  overnightStay: true,
  /** The owner's own photographs of the Party Room (first = main photo). Add more entries as they are supplied. */
  photos: [
    {
      id: "lounge-beds",
      src: loungeBeds,
      caption: "The Party Room",
      alt: "The Party Room at Homestay by the Tea Garden, Dibrugarh — a spacious room with chalk-art walls, a yellow sofa, a wooden coffee table and pink-covered beds",
    },
    {
      id: "sofa-window-beds",
      src: sofaWindowBeds,
      caption: "Sofa by the window",
      alt: "Party Room at Homestay by the Tea Garden — yellow sofa and wooden coffee table beside a large window with printed curtains, and pink-covered beds on the right",
    },
    {
      id: "yellow-sofa-window",
      src: yellowSofaWindow,
      caption: "Lounge area",
      alt: "Party Room lounge at Homestay by the Tea Garden — yellow sofa, pink chairs and a wooden coffee table in front of a window with tree views and a neon 'It's so good to be home' sign",
    },
    {
      id: "chalk-wall-beds",
      src: chalkWallBeds,
      caption: "Chalk-art wall",
      alt: "Party Room at Homestay by the Tea Garden — wall of hand-drawn chalk art above pink-covered beds, with a plant on a wooden table in the foreground",
    },
  ] as PartyRoomPhoto[],
};

/** Owner-confirmed numbers, used in copy and structured data. */
export const PARTY_ROOM_CAPACITY = 20;
export const PARTY_ROOM_SLEEPS = 6;

/** Owner-stated uses (from the owner's description). */
export const partyRoomUseCases = ["Birthday parties", "Anniversaries", "Engagement celebrations", "Bachelor parties", "Hen parties"];

/** Stable public URLs of the Party Room photographs (for structured data and the sitemap). */
const PHOTO_FILES: Record<string, string> = {
  "lounge-beds": "party-room-chalk-art-lounge-and-beds.webp",
  "sofa-window-beds": "party-room-sofa-window-and-beds.webp",
  "yellow-sofa-window": "party-room-yellow-sofa-and-window.webp",
  "chalk-wall-beds": "party-room-chalk-art-wall-and-beds.webp",
};
export const partyPhotoPath = (id: string) => `/images/homestay/party-room/${PHOTO_FILES[id]}`;

/** Questions answered ONLY with owner-confirmed facts (no rates, policies or extra amenities are invented). */
export const partyRoomFaqs = [
  {
    question: "How many guests can the Party Room host?",
    answer: `The Party Room at Homestay by the Tea Garden is designed for hosting up to ${PARTY_ROOM_CAPACITY} guests.`,
  },
  {
    question: "Can guests stay overnight in the Party Room?",
    answer: `Yes. It provides sleeping arrangements for up to ${PARTY_ROOM_SLEEPS} guests, with convertible sofa beds.`,
  },
  {
    question: "What facilities does the Party Room have?",
    answer: "A sound system, psychedelic lighting, a kitchen and a bar counter, with views of the tea gardens.",
  },
  {
    question: "What celebrations is the Party Room suited to?",
    answer: "Birthday parties, anniversaries, engagement celebrations, bachelor parties and hen parties.",
  },
  {
    question: "How do I enquire about the Party Room?",
    answer: "Message the host on WhatsApp or call the homestay. Rates and availability are confirmed directly with the host.",
  },
];

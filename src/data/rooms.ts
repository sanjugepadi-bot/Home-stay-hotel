import type { PhotoKey } from "@/lib/photos";
import {
  blackRoomPhotos,
  blueRoomPhotos,
  goldRoomPhotos,
  greenRoomPhotos,
  pinkRoomPhotos,
  redRoomPhotos,
  whiteRoomPhotos,
  shown,
  type RoomPhoto,
} from "@/data/room-photos";

export type Room = {
  id: string;
  name: string;
  /** Owner's description, from the brochure. */
  description: string;
  /** Room rate in INR, from the owner's price list. */
  price: number;
  /** What the owner's price list says is included, if anything. */
  includes?: string;
  /** Short facts stated in the owner's description. */
  highlights: string[];
  /** Who the room suits — only where the owner's own description says so. */
  bestFor?: string;
  /** Photo of this room; rooms without one are shown as a card with no image area. */
  photoKey?: PhotoKey;
  /** All photos of this room (first is the cover); opens in a lightbox from the room card. */
  gallery?: RoomPhoto[];
  /** Theme colour of the room. */
  accent: string;
};

// Listed with photographed rooms first.
export const rooms: Room[] = [
  {
    id: "gold",
    name: "The Gold Room",
    description:
      "Step into a VIP-style haven of gilded furniture and a painted ceiling — a room that captivates families and kids alike.",
    price: 8500,
    includes: "Breakfast, snacks and other edibles",
    highlights: ["Painted ceiling", "Gilded furniture", "Families & kids"],
    bestFor: "Families and kids — the owners describe it as captivating for families and kids alike.",
    photoKey: shown(goldRoomPhotos)[0]?.photoKey,
    gallery: shown(goldRoomPhotos),
    accent: "#b8892b",
  },
  {
    id: "white",
    name: "The White Room",
    description:
      "Enchanting all-white room, a fairy tale come true. Spacious balcony overlooking a tea garden.",
    price: 5000,
    includes: "Breakfast included",
    highlights: ["Spacious balcony", "Tea garden view"],
    bestFor: "Guests who want a tea garden view from a spacious balcony.",
    photoKey: shown(whiteRoomPhotos)[0]?.photoKey,
    gallery: shown(whiteRoomPhotos),
    accent: "#cfd8d4",
  },
  {
    id: "blue",
    name: "The Blue Room",
    description:
      "This room with large windows and tea garden facing balcony is ideal for 4 guests & dotted with craftworks from the Indonesian island of Bali.",
    price: 4000,
    includes: "Breakfast included",
    highlights: ["Ideal for 4 guests", "Tea garden balcony", "Large windows", "Bali craftworks"],
    bestFor: "Small groups and families — the owners describe it as ideal for 4 guests.",
    photoKey: shown(blueRoomPhotos)[0]?.photoKey,
    gallery: shown(blueRoomPhotos),
    accent: "#2a3f8f",
  },
  {
    id: "black",
    name: "The Black Room",
    description:
      "Step into a vast, airy room adorned with captivating black and white hues, exuding a retro charm.",
    price: 3500,
    includes: "Breakfast included",
    highlights: ["Black & white decor", "Retro charm"],
    photoKey: shown(blackRoomPhotos)[0]?.photoKey,
    gallery: shown(blackRoomPhotos),
    accent: "#1c1c1c",
  },
  {
    id: "green",
    name: "The Green Room",
    description:
      "Enchanting entrance through a concealed portal. A hidden green gateway awaits.",
    price: 4000,
    includes: "Breakfast included",
    highlights: ["Hidden green entrance"],
    photoKey: shown(greenRoomPhotos)[0]?.photoKey,
    gallery: shown(greenRoomPhotos),
    accent: "#3f7d3a",
  },
  {
    id: "pink",
    name: "The Pink Room",
    description:
      "Small, cozy room with a double bed & a tea garden facing balcony perfect for couples & backpackers.",
    price: 3000,
    highlights: ["Double bed", "Tea garden balcony"],
    bestFor: "Couples and backpackers.",
    photoKey: shown(pinkRoomPhotos)[0]?.photoKey,
    gallery: shown(pinkRoomPhotos),
    accent: "#b8326f",
  },
  {
    id: "yellow",
    name: "The Yellow Room",
    description:
      "Ground-floor room with natural light, ideal for those unable to climb stairs. Attached private kitchen with utensils and gas stove, free to use.",
    price: 3500,
    includes: "Breakfast included",
    highlights: ["Ground floor", "Private kitchen"],
    bestFor: "Guests who cannot climb stairs, and anyone who wants a private kitchen.",
    accent: "#d9a920",
  },
  {
    id: "red",
    name: "The Red Room",
    description:
      "The Red Room is designed for budget travellers, solo guests, students, or young couples. Red illustrations of Hollywood actors decorate one of the walls.",
    price: 2500,
    highlights: ["Budget-friendly", "Hollywood actor illustrations"],
    bestFor: "Budget travellers, solo guests, students and young couples.",
    photoKey: shown(redRoomPhotos)[0]?.photoKey,
    gallery: shown(redRoomPhotos),
    accent: "#b3261e",
  },
];

/** A room gets its own page only when it has enough real photographs to make
 * the page useful (no thin pages). The Yellow Room will get one automatically
 * as soon as 3+ photographs are added to its `gallery`. */
export const MIN_PHOTOS_FOR_ROOM_PAGE = 3;

export function roomSlug(room: Room) {
  return `${room.id}-room`;
}

export function roomHasPage(room: Room) {
  return (room.gallery?.length ?? 0) >= MIN_PHOTOS_FOR_ROOM_PAGE;
}

export function roomPath(room: Room) {
  return `/rooms/${roomSlug(room)}`;
}

/**
 * Which photograph represents each room on cards. Chosen from the owner's own photos for
 * resolution (all >= 960 px wide), sharpness and how well they crop to a portrait card —
 * the room's page and lightbox still show the full set in its original order.
 */
const COVER_KEYS: Record<string, PhotoKey> = {
  gold: "goldBedCeiling",
  blue: "blueWide",
  black: "blackBedWindows",
};

export function roomCover(room: Room): RoomPhoto | undefined {
  const wanted = COVER_KEYS[room.id];
  return room.gallery?.find((p) => p.photoKey === wanted) ?? room.gallery?.[0];
}

export const roomsWithPages = rooms.filter(roomHasPage);

export function getRoomBySlug(slug: string) {
  return roomsWithPages.find((r) => roomSlug(r) === slug);
}

export const lowestRoomPrice = Math.min(...rooms.map((r) => r.price));
export const highestRoomPrice = Math.max(...rooms.map((r) => r.price));

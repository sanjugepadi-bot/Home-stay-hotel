import type { PhotoKey } from "@/lib/photos";
import { rooms } from "@/data/rooms";

export type GalleryItem = {
  id: string;
  tag: "Rooms" | "Bathroom" | "Kitchen";
  photoKey: PhotoKey;
  caption: string;
  alt: string;
  /** Id of the room this photo belongs to (photos are never shared between rooms). */
  room?: string;
  /** Extra photos of a room: shown only in that room's tab, not under All / Rooms. */
  extra?: boolean;
};

/** Every photo of every room, built from each room's own photo set. */
const roomItems: GalleryItem[] = rooms.flatMap((room) =>
  (room.gallery ?? []).map((p, i) => ({
    id: `${room.id}-room-${p.id}`,
    tag: "Rooms" as const,
    photoKey: p.photoKey,
    caption: i === 0 ? room.name : `${room.name} — ${p.caption}`,
    alt: p.alt,
    room: room.id,
    extra: i > 0,
  }))
);

/** One tab per room that has more than one photo. */
export const roomTabs = rooms
  .filter((r) => (r.gallery?.length ?? 0) > 1)
  .map((r) => ({ id: r.id, label: r.name.replace(/^The /, "") }));

export const gallery: GalleryItem[] = [
  // One cover photo per room — these are what "All" and "Rooms" show.
  ...roomItems.filter((i) => !i.extra),
  {
    id: "bathroom-bathtub",
    tag: "Bathroom",
    photoKey: "bathBathtub",
    caption: "Bathroom with brass bathtub",
    alt: "Bathroom with a golden clawfoot bathtub at Homestay by the Tea Garden",
  },
  {
    id: "bathroom-telephone-booth",
    tag: "Bathroom",
    photoKey: "bathTelephone",
    caption: "Red telephone booth in the bathroom",
    alt: "Red telephone booth feature in the bathroom at Homestay by the Tea Garden",
  },
  {
    id: "kitchen",
    tag: "Kitchen",
    photoKey: "kitchen",
    caption: "Kitchen",
    alt: "Kitchen facilities with comic-art cabinet panels at Homestay by the Tea Garden",
  },
  // Remaining photos of each room: visible only in that room's own tab.
  ...roomItems.filter((i) => i.extra),
];

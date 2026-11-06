import type { PhotoKey } from "@/lib/photos";

/** One photograph of a specific room. The first photo in each list is the
 * room's cover image. Photos are never shared between rooms. */
export type RoomPhoto = {
  id: string;
  photoKey: PhotoKey;
  caption: string;
  alt: string;
  /** TEMPORARILY hidden from the website (e.g. for a client presentation). The photo file and
   * the owner's original are untouched — delete the `hidden: true` line to show it again. */
  hidden?: boolean;
};

/** The photos that are currently shown on the website (hidden ones filtered out). */
export const shown = (list: RoomPhoto[]) => list.filter((p) => !p.hidden);

export const goldRoomPhotos: RoomPhoto[] = [
  {
    id: "gilded-bed",
    photoKey: "goldRoom1",
    caption: "The Gold Room",
    alt: "Gold Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — gilded bed under a painted ceiling",
  },
  {
    id: "bed-ceiling",
    photoKey: "goldBedCeiling",
    caption: "Bed and painted ceiling",
    alt: "Gold Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — ornate gilded bed with a ceiling painted with a heavenly scene",
  },
  {
    id: "bed-marble",
    photoKey: "goldBedMarble",
    caption: "Gilded bed and marble floor",
    alt: "Gilded bed with a marble floor and golden wall mural in the Gold Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "mirror-console",
    photoKey: "goldMirror",
    caption: "Gilded mirror and console table",
    alt: "Ornate gilded mirror and console table in the Gold Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "bed-balcony",
    photoKey: "goldBedBalcony",
    caption: "Bed, curtains and balcony view",
    alt: "Gold Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — bed with leaf-print bedding, a gilded armchair and curtained glass doors to the balcony",
  },
  {
    id: "balcony-table",
    photoKey: "goldBalconyTable",
    caption: "Balcony table and seating",
    alt: "Wooden balcony counter with a yellow chair and a cup of tea among green plants, photographed for the Gold Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "gold-bathtub",
    photoKey: "goldBathtub",
    caption: "Gold bathtub with flower petals",
    alt: "Gold clawfoot bathtub filled with flower petals in the Gold Theme Room bathroom at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "twin-basins",
    photoKey: "goldBasins",
    caption: "Gold twin-basin vanity",
    alt: "Gold twin-basin vanity in the Gold Theme Room bathroom at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "gold-door",
    photoKey: "goldDoor",
    caption: "Gold fluted doorway",
    alt: "Gold fluted doorway in the Gold Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "telephone-booth",
    photoKey: "goldTelephone",
    caption: "Red telephone booth feature",
    alt: "Red telephone booth feature in the Gold Theme Room bathroom area at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "painted-ceiling",
    photoKey: "heroGoldRoom",
    caption: "The painted ceiling",
    alt: "The Gold Room at Homestay by the Tea Garden in Dibrugarh, with a gilded bed and painted ceiling",
  },
];

export const whiteRoomPhotos: RoomPhoto[] = [
  {
    id: "canopy-bed",
    photoKey: "whiteRoom",
    caption: "The White Room",
    alt: "White Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — all-white room with a canopy bed",
  },
];

export const blueRoomPhotos: RoomPhoto[] = [
  {
    id: "wide-view",
    photoKey: "blueWide",
    caption: "Wide view of the Blue Room",
    alt: "Blue Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — wide view with red brick arches, a blue bed and a ceiling fan with spotlights",
  },
  {
    id: "bed-painting",
    photoKey: "blueBedPainting",
    caption: "Bed and boat painting",
    alt: "Blue Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — bed with blue bedding below a painting of boats at sunset",
  },
  {
    id: "arch-window-table",
    photoKey: "blueArchTable",
    caption: "Arched window and white iron table",
    alt: "White iron table and chairs by an arched window in the Blue Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "arch-door",
    photoKey: "blueArchDoor",
    caption: "Arched door and swan chair",
    alt: "Blue arched door and a blue swan chair against a red brick wall in the Blue Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "bedside-lamp",
    photoKey: "blueLamp",
    caption: "Bedside lamp against brick",
    alt: "Bedside table lamp made from a bottle against a red brick wall in the Blue Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "washbasin",
    photoKey: "blueWashbasin",
    caption: "Blue washbasin",
    alt: "Blue washbasin with an oval mirror in the Blue Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "tiled-bathroom",
    photoKey: "blueBathroom",
    caption: "Tiled bathroom",
    alt: "Teal-tiled bathroom with windows in the Blue Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "shower-area",
    photoKey: "blueShower",
    caption: "Tiled shower area",
    alt: "Tiled shower area with a window in the Blue Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "bed-seating",
    photoKey: "blueRoom1",
    caption: "Bed and seating",
    alt: "Blue themed bedroom with a large wall clock and white iron table at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "window-seating",
    photoKey: "blueRoom2",
    caption: "Window seating",
    alt: "Window side seating area in the Blue Room at Homestay by the Tea Garden, Dibrugarh",
  },
];

export const redRoomPhotos: RoomPhoto[] = [
  {
    id: "wide-view",
    photoKey: "redWide",
    caption: "Wide view of the Red Room",
    alt: "Red Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — wide view of the bed, neon 'Our Happy Place' sign and portrait illustrations under a sloping ceiling",
  },
  {
    id: "sloping-ceiling",
    photoKey: "redSloping",
    caption: "Bed under the sloping ceiling",
    alt: "Red Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — double bed and wicker chairs under a sloping red-lit ceiling",
  },
  {
    id: "lips-art",
    photoKey: "redLips",
    caption: "Lips artwork and wicker chairs",
    alt: "Red lips artwork on the wall with two wicker chairs and a glass table in the Red Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "portrait-wall",
    photoKey: "redPortraitWall",
    caption: "Illustrated portrait wall",
    alt: "Wall of red portrait illustrations above the bed in the Red Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "bed-neon",
    photoKey: "redBedNeon",
    caption: "Bed and neon sign",
    alt: "Bed with red printed cushions below a neon 'Our Happy Place' sign in the Red Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "neon-painting",
    photoKey: "redNeonPainting",
    caption: "Neon sign and painting",
    alt: "Neon sign, wall clock and a framed painting above the air conditioner in the Red Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "wicker-chairs",
    photoKey: "redChairs",
    caption: "Wicker chairs and table",
    alt: "Two wicker chairs and a glass-top wicker table with water bottles in the Red Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
];

export const blackRoomPhotos: RoomPhoto[] = [
  {
    id: "wide-view",
    photoKey: "blackWide",
    caption: "Wide view of the Black Room",
    alt: "Black Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — wide view with a yin-yang wall, white wingback chair and mirror",
  },
  {
    id: "bed-windows",
    photoKey: "blackBedWindows",
    caption: "Bed and windows with large stamp-style prints",
    alt: "Black Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — bed in front of windows covered with large vintage stamp-style portraits, on a black and white patterned floor",
  },
  {
    id: "evening-view",
    photoKey: "blackEvening",
    caption: "The room in the evening",
    alt: "Black Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — evening view with the yin-yang wall, portrait curtains and a white wingback chair",
  },
  {
    id: "piano-bed",
    photoKey: "blackPianoBed",
    caption: "Bed with a piano-key base",
    alt: "Double bed with a painted piano-key base and a printed Bob Marley bed sheet in the Black Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "wardrobe-wall",
    photoKey: "blackWardrobe",
    caption: "Wardrobe wall and tree-pattern curtains",
    alt: "Black wardrobe with framed photographs and tree-pattern curtains in the Black Theme Bedroom at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "entrance-chalkboard",
    photoKey: "blackEntrance",
    caption: "Entrance corner with chalkboard wall",
    alt: "Entrance corner of the Black Theme Room at Homestay by the Tea Garden, Dibrugarh, with a framed portrait and a chalkboard reading 'Where words fail, music speaks'",
  },
];

export const greenRoomPhotos: RoomPhoto[] = [
];

export const pinkRoomPhotos: RoomPhoto[] = [
  {
    id: "wide-view",
    photoKey: "pinkWide",
    caption: "Wide view of the Pink Room",
    alt: "Pink Theme Bedroom at Homestay by the Tea Garden, Dibrugarh — wide view of the double bed with heart-shaped headboards under a sloping ceiling",
  },
  {
    id: "barrel-sofa",
    photoKey: "pinkBarrelSofa",
    caption: "Barrel sofa and round table",
    alt: "Pink barrel-style sofa and round glass-top table in the Pink Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "curtained-window",
    photoKey: "pinkCurtains",
    caption: "Curtained window corner",
    alt: "Pink curtains and lace curtain at the window of the Pink Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
  {
    id: "balcony",
    photoKey: "pinkBalcony",
    caption: "Balcony facing the tea garden",
    alt: "Balcony with a table and two folding chairs overlooking the tea garden, from the Pink Theme Room at Homestay by the Tea Garden, Dibrugarh",
  },
];

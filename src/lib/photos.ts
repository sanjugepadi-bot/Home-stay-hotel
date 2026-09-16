import heroBedroom from "../../public/images/hero-bedroom.jpg";
import heroCottage from "../../public/images/hero-cottage.jpg";
import roomDeluxe from "../../public/images/room-deluxe.jpg";
import roomSuite from "../../public/images/room-suite.jpg";
import roomFamily from "../../public/images/room-family.jpg";
import cottageExterior from "../../public/images/cottage-exterior.jpg";
import bathroom from "../../public/images/bathroom.jpg";
import balcony from "../../public/images/balcony.jpg";
import livingFireplace from "../../public/images/living-fireplace.jpg";
import diningCandlelight from "../../public/images/dining-candlelight.jpg";
import breakfast from "../../public/images/breakfast.jpg";
import bonfire from "../../public/images/bonfire.jpg";
import trekking from "../../public/images/trekking.jpg";
import workspace from "../../public/images/workspace.jpg";
import exteriorGarden from "../../public/images/exterior-garden.jpg";
import exteriorModern from "../../public/images/exterior-modern.jpg";
import smartTvRoom from "../../public/images/smart-tv-room.jpg";
import amenitiesBalcony from "../../public/images/amenities-balcony.jpg";

/**
 * Curated free-license stock photography (Pexels) standing in for this
 * property's own photography until custom AI-generated images are available.
 * See public/images/CREDITS.md for the source/photographer of each file.
 */
export const photos = {
  heroBedroom,
  heroCottage,
  roomDeluxe,
  roomSuite,
  roomFamily,
  cottageExterior,
  bathroom,
  balcony,
  livingFireplace,
  diningCandlelight,
  breakfast,
  bonfire,
  trekking,
  workspace,
  exteriorGarden,
  exteriorModern,
  smartTvRoom,
  amenitiesBalcony,
} as const;

export type PhotoKey = keyof typeof photos;

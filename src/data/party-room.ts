/**
 * The Party Room — a SEPARATE space at the homestay (owner-confirmed): the 9th of the property's 9 rooms.
 * It is NOT one of the 8 guest bedrooms.
 *
 * Only what the owner has confirmed is stated on the website. Everything else is left empty on purpose;
 * the card hides each field until it is filled in, and shows a "details coming soon" notice until then.
 *
 * STILL NEEDED FROM THE OWNER:
 *  • a short description of the Party Room
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
  /** Owner to provide. */
  description: "",
  /** Owner to provide, e.g. "Up to 30 guests". */
  capacity: "",
  /** Owner to provide, e.g. "₹15,000 per event". */
  rate: "",
  /** Owner to provide: list of confirmed facilities. */
  facilities: [] as string[],
  /** Set true ONLY if the owner confirms it is available for overnight stays. */
  overnightStay: false,
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

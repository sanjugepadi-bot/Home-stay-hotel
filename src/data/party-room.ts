/**
 * The Party Room — a SEPARATE space at the homestay (owner-confirmed). It is NOT one of the guest bedrooms
 * and is not counted in the room total.
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
  /** Owner to provide: real photographs (add entries here once supplied). */
  photos: [] as { src: string; alt: string; width: number; height: number }[],
};

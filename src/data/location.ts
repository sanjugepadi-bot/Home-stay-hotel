/**
 * Location content supplied by the owner — wording, place names and travel times are kept exactly as given.
 * Shown in full on the homepage ("Find us"); the Contact page only shows the travel times and directions,
 * so the same text is never repeated across pages.
 */
export const locationInfo = {
  /** The owner's paragraph, verbatim. */
  story:
    "Located in the peaceful and green neighbourhood of Seujpur, Dibrugarh, Homestay by the Tea Garden offers a welcoming stay in one of the city's most desirable residential areas. Conveniently situated near Assam Medical College, Paltan Bazaar and Naliapool, the homestay provides easy access to key destinations across Dibrugarh. The property is approximately 10 minutes from Dibrugarh Railway Station and the main bus stand, and around 17 minutes from Dibrugarh Airport, making it a convenient choice for travellers seeking a comfortable homestay in Dibrugarh, Assam.",
  nearby: ["Assam Medical College", "Paltan Bazaar", "Naliapool"],
  travel: [
    { id: "station", place: "Dibrugarh Railway Station and the main bus stand", time: "approximately 10 minutes" },
    { id: "airport", place: "Dibrugarh Airport", time: "around 17 minutes" },
  ],
};

/** The homestay's own Google Maps link, supplied by the owner/client. */
export const directionsUrl = "https://maps.app.goo.gl/iTna2jX6LqC5KHnV9";

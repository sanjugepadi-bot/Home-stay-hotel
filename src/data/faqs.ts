import { formatINR } from "@/lib/utils";
import { site } from "@/data/site";
import { rooms, TOTAL_ROOMS } from "@/data/rooms";

export type Faq = { question: string; answer: string };

const rateLine = rooms.map((r) => `${r.name.replace("The ", "")} ${formatINR(r.price)}`).join(", ");

export const faqs: Faq[] = [
  {
    question: "Where is Homestay by the Tea Garden?",
    answer: `${site.location.address}.`,
  },
  {
    question: "Is Homestay by the Tea Garden the first homestay in Dibrugarh?",
    answer:
      "The owners describe it as the first homestay established in Dibrugarh, with more than 10 years of hospitality experience. This is also the first luxury Homestay in the entire North East India.",
  },
  {
    question: "Is it an award-winning homestay?",
    answer: `Yes — Homestay by the Tea Garden has received a Best Homestay / Best Hospitality award from the Government of Assam. The homestay has ${TOTAL_ROOMS} rooms, including ${rooms.length} individually themed rooms — Gold, White, Green, Blue, Black, Yellow, Pink and Red — and a separate Party Room.`,
  },
  {
    question: "What are the room rates?",
    answer: `Room rates: ${rateLine}. Please confirm availability and any extra charges when you enquire.`,
  },
  {
    question: "Is breakfast included?",
    answer:
      "Breakfast is included in the rates for the Gold, White, Green, Blue, Black and Yellow rooms (the Gold Room also includes snacks and other edibles). No inclusions are listed for the Pink and Red rooms — please ask when you enquire.",
  },
  {
    question: "Is there a ground-floor room?",
    answer:
      "Yes — the Yellow Room is on the ground floor with natural light, ideal for those unable to climb stairs. It has an attached private kitchen with utensils and a gas stove, free to use.",
  },
  {
    question: "Which rooms have a tea garden balcony?",
    answer:
      "The White Room has a spacious balcony overlooking a tea garden, and the Blue and Pink rooms have tea garden facing balconies.",
  },
  {
    question: "How do I book a room?",
    answer:
      "Fill in the booking request on this page — it opens WhatsApp with your details so the host can reply directly. No payment is taken on this website.",
  },
];

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { site } from "@/data/site";
import { attractions } from "@/data/attractions";
import { experiences } from "@/data/experiences";
import { rooms } from "@/data/rooms";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

function systemPrompt() {
  const attractionsList = attractions
    .map((a) => `- ${a.name} (${a.category}): ${a.description}`)
    .join("\n");
  const experiencesList = experiences
    .map((e) => `- ${e.title} (${e.duration}): ${e.description}`)
    .join("\n");
  const roomsList = rooms
    .map((r) => `- ${r.name}: from ₹${r.priceFrom}/night, sleeps ${r.occupancy}`)
    .join("\n");

  return `You are the friendly AI Travel Assistant for "${site.name}", a homestay at ${site.location.label}. Help guests with nearby attractions, restaurants, local experiences, trip planning, and general travel/weather advice for the area. Be warm, concise (2-4 short paragraphs or a short list), and specific to the data below. If asked about something unrelated to travel or the stay, gently redirect to how you can help with their trip.

Rooms available:
${roomsList}

Experiences offered on-site:
${experiencesList}

Nearby attractions:
${attractionsList}

Never invent prices, phone numbers, or booking confirmations — for booking, direct guests to the Book Now / WhatsApp button on the site.`;
}

function fallbackReply(): string {
  const picks = attractions.slice(0, 3).map((a) => a.name).join(", ");
  return `Our AI assistant is temporarily offline, but here are a few quick picks: ${picks}. For anything else, tap the WhatsApp button and our team will help right away!`;
}

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: ChatMessage[] };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: fallbackReply(), offline: true });
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 500,
      system: systemPrompt(),
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    return NextResponse.json({ reply: reply || fallbackReply(), offline: false });
  } catch {
    return NextResponse.json({ reply: fallbackReply(), offline: true });
  }
}

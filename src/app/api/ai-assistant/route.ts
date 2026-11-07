import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { site } from "@/data/site";
import { rooms, TOTAL_ROOMS } from "@/data/rooms";
import { formatINR } from "@/lib/utils";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

function systemPrompt() {
  const roomsList = rooms
    .map(
      (r) =>
        `- ${r.name}: ${formatINR(r.price)}${r.includes ? ` (${r.includes})` : ""}. ${r.description}`
    )
    .join("\n");

  return `You are the friendly assistant for "${site.name}", a homestay at ${site.location.address}. Help visitors understand the rooms and plan a trip to Dibrugarh, Assam. Be warm and concise (2-4 short paragraphs or a short list).

Verified facts about the homestay (the ONLY facts you may state about it):
${roomsList}
- The homestay has ${TOTAL_ROOMS} rooms in total: the ${rooms.length} individually themed guest rooms above plus a separate Party Room (not a guest bedroom). Party Room facts (owner-confirmed): hosts up to 20 guests for celebrations such as birthday parties, anniversaries, engagement celebrations, bachelor and hen parties; has a sound system, psychedelic lighting, a kitchen and a bar counter; has sleeping arrangements for up to 6 guests with convertible sofa beds, and views of the tea gardens. Its rate is not available — suggest asking the host.
Contact: ${site.phones.join(" / ")}.

Rules:
- Do not state or guess any other detail about the homestay (amenities, check-in times, policies, distances, nearby places, availability, discounts, reviews). If asked, say you don't have that information and suggest messaging the host on WhatsApp or calling ${site.phones[0]}.
- General travel tips about Dibrugarh and Assam are fine, but make clear they are general information and not specific to the homestay, and don't present uncertain details as fact.
- Never confirm bookings or availability — direct guests to the booking form or WhatsApp.`;
}

function fallbackReply(): string {
  return `The assistant is temporarily offline. For rooms, rates and availability, please message us on WhatsApp or call ${site.phones[0]}.`;
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

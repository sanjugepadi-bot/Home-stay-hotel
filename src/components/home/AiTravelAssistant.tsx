"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What's the best viewpoint nearby?",
  "Suggest a 2-day itinerary",
  "Where can I get good local food?",
  "What's the weather like this week?",
];

export function AiTravelAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI travel assistant for ${site.name}. Ask me about nearby attractions, restaurants, experiences, or planning your trip.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try WhatsApp instead!" },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  }

  return (
    <section id="ai-assistant" className="bg-forest py-20 text-beige-light sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="AI Travel Assistant"
          title="Ask before you book"
          description="Get instant, personalized recommendations on attractions, food, and trip planning."
          tone="inverted"
        />

        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-beige-light/15 bg-forest-light/30 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-beige-light/10 px-5 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-forest">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-medium">Serenity AI Assistant</p>
              <p className="text-[11px] text-beige-light/60">Usually replies instantly</p>
            </div>
          </div>

          <div ref={listRef} className="flex max-h-96 flex-col gap-4 overflow-y-auto px-5 py-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    m.role === "user" ? "bg-gold text-forest" : "bg-beige-light/10 text-gold"
                  }`}
                >
                  {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </span>
                <p
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user" ? "bg-gold text-forest" : "bg-beige-light/10 text-beige-light"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-beige-light/60">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs">Thinking…</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-beige-light/20 px-3 py-1.5 text-xs text-beige-light/80 transition-colors hover:border-gold hover:text-gold"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-beige-light/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about attractions, food, weather…"
              className="flex-1 rounded-full bg-beige-light/10 px-4 py-2.5 text-sm text-beige-light placeholder:text-beige-light/40 focus:outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-forest"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </form>
        </div>
      </Container>
    </section>
  );
}

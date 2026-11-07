"use client";

import { MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { useStickyBarVisible } from "@/hooks/useStickyBarVisible";

export function WhatsAppButton() {
  const stickyBarVisible = useStickyBarVisible();

  return (
    <a
      href={whatsappLink(`Hi ${site.name}! I'd like to know more about a stay.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b7a4b] text-white shadow-xl shadow-[#0b7a4b]/30 transition-[transform,bottom] duration-300 hover:scale-110 sm:right-8",
        stickyBarVisible ? "bottom-24 sm:bottom-28" : "bottom-6 sm:bottom-8"
      )}
    >
      <span aria-hidden className="absolute inset-0 motion-reduce:hidden animate-ping rounded-full bg-[#0b7a4b]/40" />
      <MessageCircle aria-hidden className="relative h-7 w-7" />
    </a>
  );
}

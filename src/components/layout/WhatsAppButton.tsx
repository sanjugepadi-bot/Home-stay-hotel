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
        "fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-[transform,bottom] duration-300 hover:scale-110 sm:right-8",
        stickyBarVisible ? "bottom-24 sm:bottom-28" : "bottom-6 sm:bottom-8"
      )}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
      <MessageCircle className="relative h-7 w-7" />
    </a>
  );
}

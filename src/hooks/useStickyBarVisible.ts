"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** True once the homepage has been scrolled past the hero — the same
 * condition StickyBookingBar uses to show itself, shared so other fixed
 * elements (e.g. the WhatsApp button) can avoid overlapping it. */
export function useStickyBarVisible() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return isHome && pastHero;
}

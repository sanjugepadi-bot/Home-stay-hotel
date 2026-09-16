"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { site } from "@/data/site";
import { rooms } from "@/data/rooms";
import { formatINR } from "@/lib/utils";

export function StickyBookingBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  if (!isHome) return null;

  const startingFrom = Math.min(...rooms.map((r) => r.priceFrom));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass fixed inset-x-0 bottom-0 z-40 border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        >
          <Container className="flex flex-wrap items-center justify-between gap-3 py-3.5">
            <div className="flex items-center gap-2 text-sm">
              <CalendarCheck className="h-4.5 w-4.5 text-gold-deep" />
              <span className="font-semibold text-foreground">{site.name}</span>
              <span className="hidden text-muted-foreground sm:inline">
                — stays from {formatINR(startingFrom)}/night
              </span>
            </div>
            <a href="#book" className={buttonVariants({ variant: "gold", size: "md" })}>
              Check Availability
            </a>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { site } from "@/data/site";
import { lowestRoomPrice } from "@/data/rooms";
import { formatINR } from "@/lib/utils";
import { useStickyBarVisible } from "@/hooks/useStickyBarVisible";

export function StickyBookingBar() {
  const visible = useStickyBarVisible();

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
          <Container className="flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <CalendarCheck aria-hidden className="h-4.5 w-4.5 shrink-0 text-gold-deep" />
              <span className="hidden truncate font-semibold text-foreground min-[400px]:inline">{site.name}</span>
              <span className="hidden text-muted-foreground md:inline">
                — rooms from {formatINR(lowestRoomPrice)}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={`tel:${site.phones[0].replace(/\s/g, "")}`}
                aria-label={`Call ${site.phones[0]}`}
                className={buttonVariants({ variant: "outline", size: "md" }) + " px-4"}
              >
                <Phone aria-hidden className="h-4 w-4" />
                <span className="hidden sm:inline">Call</span>
              </a>
              <a href="#book" className={buttonVariants({ variant: "gold", size: "md" })}>
                Enquire Now
              </a>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

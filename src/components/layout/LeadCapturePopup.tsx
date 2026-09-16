"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/data/site";

const STORAGE_KEY = "serenity-lead-popup-dismissed";

export function LeadCapturePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    const timer = setTimeout(show, 25000);

    function show() {
      setOpen(true);
      window.removeEventListener("mouseout", onLeave);
      clearTimeout(timer);
    }

    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mouseout", onLeave);
      clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-2xl"
          >
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-foreground/10"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
              <Gift className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-2xl text-foreground">Wait — before you go!</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Message us on WhatsApp now and get <span className="font-bold text-gold-deep">10% off</span> your first direct booking.
            </p>
            <a
              href={whatsappLink("Hi! I'd like to claim the 10% off my first booking.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="mt-6 inline-block w-full"
            >
              <Button variant="whatsapp" size="lg" className="w-full">
                Claim on WhatsApp
              </Button>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site, whatsappLink } from "@/data/site";

const STORAGE_KEY = "tea-garden-lead-popup-dismissed";

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

  // Close with the Escape key while the popup is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Plan your stay"
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
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
              <MessageCircle className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-2xl text-foreground">Planning a stay?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Message us on WhatsApp to ask about rooms, availability and rates.
            </p>
            <a
              href={whatsappLink(`Hi ${site.name}! I'd like to ask about a stay.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="mt-6 inline-block w-full"
            >
              <Button variant="whatsapp" size="lg" className="w-full">
                Chat on WhatsApp
              </Button>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

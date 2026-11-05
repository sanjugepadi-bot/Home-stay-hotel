"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

const MotionLink = motion.create(Link);
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "@/data/site";
import { reviews } from "@/data/reviews";
import { experiences } from "@/data/experiences";
import { attractions } from "@/data/attractions";
import { cn } from "@/lib/utils";

// Sections without real content are hidden, so their nav links are too.
const links = [
  { href: "#legacy", label: "Our Legacy" },
  { href: "#rooms", label: "Rooms" },
  ...(experiences.length ? [{ href: "#experiences", label: "Experiences" }] : []),
  { href: "#gallery", label: "Gallery" },
  ...(reviews.length ? [{ href: "#reviews", label: "Reviews" }] : []),
  ...(attractions.length ? [{ href: "#nearby", label: "Nearby" }] : []),
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const pathname = usePathname();
  // Only the homepage has a full-bleed dark hero behind the header, so only
  // there can the header start transparent with light text — every other
  // page must render an opaque, theme-aware header from the first paint.
  const isHome = pathname === "/";

  const [scrolledPast, setScrolledPast] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolledPast(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolledPast;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        transparent
          ? "border-b border-transparent bg-transparent py-5 text-foreground"
          : "glass py-3 text-foreground shadow-lg shadow-black/5"
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/#top" className="group flex min-w-0 items-center gap-2.5 font-display tracking-tight">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-gold ring-2 ring-gold/40 transition-transform group-hover:scale-105">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="max-w-[10.5rem] text-base leading-tight sm:max-w-none sm:text-xl lg:max-w-[10.5rem] xl:max-w-none">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={`/${l.href}`}
              className={cn(
                "relative rounded-sm py-1 text-sm font-semibold tracking-wide text-foreground/85 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:text-gold-deep hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Link href="/#book" className={cn(buttonVariants({ variant: "gold", size: "sm" }), "shadow-md")}>
            Book Now
          </Link>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu className="h-6 w-6" />
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-beige-light/10 px-5 py-5">
              <span className="flex min-w-0 items-center gap-2.5 font-display text-beige-light">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-forest">
                  <Leaf className="h-4.5 w-4.5" />
                </span>
                <span className="max-w-[10.5rem] text-base leading-tight sm:max-w-none sm:text-xl">{site.name}</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-beige-light transition-colors hover:bg-beige-light/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-7 pt-14">
              {links.map((l, i) => (
                <MotionLink
                  key={l.href}
                  href={`/${l.href}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                  className="rounded-sm text-2xl text-beige-light transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {l.label}
                </MotionLink>
              ))}
              <Link
                href="/#book"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "gold", size: "lg" }), "mt-4")}
              >
                Book Now
              </Link>
              <ThemeToggle className="mt-2 text-beige-light" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

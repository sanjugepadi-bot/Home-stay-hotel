import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { site, phoneHref } from "@/data/site";
import { reviews } from "@/data/reviews";
import { experiences } from "@/data/experiences";
import { attractions } from "@/data/attractions";

const focusRing = "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/rooms", label: "Rooms & Rates" },
      { href: "/party-room", label: "Party Room" },
      { href: "/gallery", label: "Photo Gallery" },
      ...(experiences.length ? [{ href: "/#experiences", label: "Experiences" }] : []),
      ...(attractions.length ? [{ href: "/#nearby", label: "Nearby Attractions" }] : []),
    ],
  },
  {
    title: "Stay",
    links: [
      ...(reviews.length ? [{ href: "/#reviews", label: "Guest Reviews" }] : []),
      { href: "/#faq", label: "FAQ" },
      { href: "/#book", label: "Book Now" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

const socials = [
  { href: site.social.instagram, Icon: InstagramIcon, label: "Instagram" },
  { href: site.social.facebook, Icon: FacebookIcon, label: "Facebook" },
  { href: site.social.youtube, Icon: YoutubeIcon, label: "YouTube" },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer className="bg-forest text-beige-light">
      <Container className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-10">
        <div>
          <Link href="/#top" className={`flex min-h-11 items-center gap-2.5 text-xl text-beige-light ${focusRing}`}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-forest ring-2 ring-gold/30">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="leading-tight">{site.name}</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-beige-light/80">{site.description}</p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-beige-light/15 bg-beige-light/5 transition-colors hover:border-gold hover:bg-gold hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-gold-light">{col.title}</p>
            <ul className="mt-5 space-y-0.5 text-[15px] text-beige-light/85">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={`flex min-h-11 items-center transition-colors hover:text-gold-light ${focusRing}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-gold-light">Get in Touch</p>
          <ul className="mt-5 space-y-3.5 text-[15px] text-beige-light/85">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" /> {site.location.address}
            </li>
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={phoneHref(phone)}
                  className={`flex min-h-11 items-center gap-2.5 transition-colors hover:text-gold-light ${focusRing}`}
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-light" /> {phone}
                </a>
              </li>
            ))}
            {site.email && (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className={`flex min-h-11 items-center gap-2.5 transition-colors hover:text-gold-light ${focusRing}`}
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold-light" /> {site.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-beige-light/15 py-6">
        <Container className="text-center text-sm text-beige-light/70 sm:text-left">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}

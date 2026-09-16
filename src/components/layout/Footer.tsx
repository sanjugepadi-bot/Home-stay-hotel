import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/#rooms", label: "Rooms" },
      { href: "/#experiences", label: "Experiences" },
      { href: "/#gallery", label: "Gallery" },
      { href: "/#nearby", label: "Nearby Attractions" },
    ],
  },
  {
    title: "Stay",
    links: [
      { href: "/#reviews", label: "Guest Reviews" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#book", label: "Book Now" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest text-beige-light">
      <Container className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-10">
        <div>
          <Link href="/#top" className="flex items-center gap-2.5 text-xl text-beige-light">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-forest ring-2 ring-gold/30">
              <Leaf className="h-5 w-5" />
            </span>
            {site.name}
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-beige-light/80">{site.description}</p>
          <div className="mt-6 flex gap-3">
            {[
              { href: site.social.instagram, Icon: InstagramIcon, label: "Instagram" },
              { href: site.social.facebook, Icon: FacebookIcon, label: "Facebook" },
              { href: site.social.youtube, Icon: YoutubeIcon, label: "YouTube" },
            ].map(({ href, Icon, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-beige-light/15 bg-beige-light/5 transition-colors hover:border-gold hover:bg-gold hover:text-forest"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gold-light">{col.title}</h3>
            <ul className="mt-5 space-y-3.5 text-[15px] text-beige-light/85">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-gold-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gold-light">Get in Touch</h3>
          <ul className="mt-5 space-y-3.5 text-[15px] text-beige-light/85">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" /> {site.location.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-light" /> {site.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-light" /> {site.email}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-beige-light/15 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-sm text-beige-light/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex gap-5">
            <Link href="/contact" className="transition-colors hover:text-gold-light">Privacy Policy</Link>
            <Link href="/contact" className="transition-colors hover:text-gold-light">Terms of Service</Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}

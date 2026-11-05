import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { PhotoGrid } from "@/components/rooms/PhotoGrid";
import { RoomListCard } from "@/components/rooms/RoomListCard";
import { EnquiryCta } from "@/components/rooms/EnquiryCta";
import { getRoomBySlug, roomPath, roomSlug, roomsWithPages } from "@/data/rooms";
import { site, whatsappLink } from "@/data/site";
import { formatINR } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { roomPageJsonLd } from "@/lib/structured-data";
import { photos } from "@/lib/photos";

/** Lower-case the first letter of a phrase for use mid-sentence, keeping proper nouns (Hollywood, Bali) intact. */
const lowerFirst = (s: string) => (/^(Hollywood|Bali|Assam)/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));

// Only rooms with enough photographs get a page (see roomHasPage); anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return roomsWithPages.map((r) => ({ slug: roomSlug(r) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};

  const title = `${room.name} — Themed Room in Dibrugarh | Tea Garden Homestay`;
  const cover = room.gallery?.[0];
  const coverPhoto = cover ? photos[cover.photoKey] : undefined;

  return buildMetadata({
    title: { absolute: title },
    socialTitle: title,
    description: `${room.name} at ${site.name}, Dibrugarh — ${room.highlights.slice(0, 3).map(lowerFirst).join(", ")}. Room rate ${formatINR(room.price)}. See ${room.gallery?.length ?? 0} photos and enquire.`,
    path: roomPath(room),
    image:
      cover && coverPhoto
        ? { url: coverPhoto.src, width: coverPhoto.width, height: coverPhoto.height, alt: cover.alt }
        : undefined,
  });
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const gallery = room.gallery ?? [];
  // The next three rooms in order (wrapping round), so every room page gets linked to evenly.
  const at = roomsWithPages.findIndex((r) => r.id === room.id);
  const others = [1, 2, 3]
    .map((k) => roomsWithPages[(at + k) % roomsWithPages.length])
    .filter((r, i, arr) => r.id !== room.id && arr.findIndex((x) => x.id === r.id) === i);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomPageJsonLd(room)) }}
      />
      <div className="pb-20 pt-28 sm:pb-24 sm:pt-32">
        <Container>
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Rooms", href: "/rooms" }, { name: room.name }]}
          />

          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <SectionHeading
                as="h1"
                align="left"
                eyebrow="Themed room in Dibrugarh"
                title={room.name}
                description={room.description}
                className="max-w-none"
              />
              <div className="mt-6 flex flex-wrap gap-1.5">
                {room.highlights.map((h) => (
                  <Badge key={h}>
                    <CheckCircle2 className="mr-1 h-3 w-3" /> {h}
                  </Badge>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(`Hi ${site.name}! I'd like to enquire about ${room.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "whatsapp", size: "lg" })}
                >
                  <MessageCircle className="h-4.5 w-4.5" /> Enquire about this room
                </a>
                <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Contact &amp; Book
                </Link>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-gold/40 bg-card p-6 shadow-[0_20px_50px_-24px_rgba(184,137,43,0.45)] sm:p-8">
              <h2 className="text-lg text-foreground">Good to know</h2>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Room rate</dt>
                  <dd className="mt-1 font-display text-3xl text-forest dark:text-gold">{formatINR(room.price)}</dd>
                  <dd className="mt-1 text-muted-foreground">{room.includes ?? "Please ask what is included when you enquire."}</dd>
                </div>
                {room.bestFor && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Best for</dt>
                    <dd className="mt-1 leading-relaxed text-foreground">{room.bestFor}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Where</dt>
                  <dd className="mt-1 flex items-start gap-2 leading-relaxed text-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" /> {site.location.address}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                Availability and extra charges are confirmed when you enquire.
              </p>
            </aside>
          </div>

          <section className="mt-16" aria-labelledby="photos-heading">
            <h2 id="photos-heading" className="text-2xl text-foreground sm:text-3xl">
              Photographs of the {room.name.replace(/^The /, "")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {gallery.length} photographs — select any photo to enlarge it.
            </p>
            <div className="mt-8">
              <PhotoGrid items={gallery} label={`${room.name} photos`} priorityCount={2} />
            </div>
          </section>

          {others.length > 0 && (
            <section className="mt-20">
              <SectionHeading
                eyebrow="More rooms"
                title="Other themed rooms you may like"
                className="max-w-xl"
                align="left"
              />
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((r, i) => (
                  <RoomListCard key={r.id} room={r} index={i} compact />
                ))}
              </div>
            </section>
          )}
        </Container>
      </div>
      <EnquiryCta
        title={`Interested in ${room.name}?`}
        text={`Message the host on WhatsApp to ask about ${room.name}, check availability and confirm the rate for your dates.`}
        whatsappText={`Hi ${site.name}! I'd like to enquire about ${room.name}.`}
      />
    </>
  );
}

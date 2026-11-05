import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PhotoGrid } from "@/components/rooms/PhotoGrid";
import { EnquiryCta } from "@/components/rooms/EnquiryCta";
import { rooms, roomHasPage, roomPath } from "@/data/rooms";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { galleryPageJsonLd } from "@/lib/structured-data";

const title = "Photo Gallery | Themed Rooms in Dibrugarh | Tea Garden Homestay";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  socialTitle: title,
  description: `Photographs of every themed room at ${site.name}, Dibrugarh — plus the bathroom and kitchen. Browse all ${new Set(gallery.map((g) => g.photoKey)).size} photos.`,
  path: "/gallery",
});

export default function GalleryPage() {
  const roomGroups = rooms.filter((r) => (r.gallery?.length ?? 0) > 0);
  const bathroom = gallery.filter((g) => g.tag === "Bathroom");
  const kitchen = gallery.filter((g) => g.tag === "Kitchen");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryPageJsonLd()) }}
      />
      <div className="pb-20 pt-28 sm:pb-28 sm:pt-32">
        <Container>
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Gallery" }]} />
          <SectionHeading
            as="h1"
            eyebrow="Gallery"
            title="Photo gallery — themed rooms in Dibrugarh"
            description={`Photographs of the rooms at ${site.name}, grouped room by room, plus the bathroom and kitchen. Select any photo to enlarge it.`}
          />

          <nav aria-label="Jump to a room" className="mt-8 flex flex-wrap justify-center gap-2">
            {roomGroups.map((r) => (
              <a
                key={r.id}
                href={`#${r.id}-room`}
                className="min-h-11 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {r.name.replace(/^The /, "")}
              </a>
            ))}
          </nav>

          <div className="mt-16 space-y-20">
            {roomGroups.map((r, i) => (
              <section key={r.id} id={`${r.id}-room`} className="scroll-mt-24" aria-labelledby={`${r.id}-room-heading`}>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <h2 id={`${r.id}-room-heading`} className="text-2xl text-foreground sm:text-3xl">
                    {r.name}
                  </h2>
                  {roomHasPage(r) && (
                    <Link href={roomPath(r)} className="inline-flex min-h-11 items-center text-sm font-semibold text-gold-deep underline-offset-4 hover:underline">
                      Room details &amp; rate →
                    </Link>
                  )}
                </div>
                <div className="mt-6">
                  <PhotoGrid items={r.gallery ?? []} label={`${r.name} photos`} priorityCount={i === 0 ? 2 : 0} />
                </div>
              </section>
            ))}

            {bathroom.length > 0 && (
              <section id="bathroom" className="scroll-mt-24" aria-labelledby="bathroom-heading">
                <h2 id="bathroom-heading" className="text-2xl text-foreground sm:text-3xl">
                  Bathroom
                </h2>
                <div className="mt-6">
                  <PhotoGrid items={bathroom} label="Bathroom photos" />
                </div>
              </section>
            )}

            {kitchen.length > 0 && (
              <section id="kitchen" className="scroll-mt-24" aria-labelledby="kitchen-heading">
                <h2 id="kitchen-heading" className="text-2xl text-foreground sm:text-3xl">
                  Kitchen
                </h2>
                <div className="mt-6">
                  <PhotoGrid items={kitchen} label="Kitchen photos" />
                </div>
              </section>
            )}
          </div>
        </Container>
      </div>
      <EnquiryCta title="Seen a room you like?" text="Message the host on WhatsApp to ask about availability and rates." />
    </>
  );
}

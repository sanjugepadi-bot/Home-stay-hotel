import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { OurJourney } from "@/components/home/OurJourney";
import { EnquiryCta } from "@/components/rooms/EnquiryCta";
import { rooms, roomCountPhrase, roomHasPage, roomPath, lowestRoomPrice, highestRoomPrice } from "@/data/rooms";
import { awardSentence, legacy } from "@/data/legacy";
import { site, phoneHref } from "@/data/site";
import { formatINR } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { aboutPageJsonLd } from "@/lib/structured-data";
import { BusinessJsonLd } from "@/components/seo/BusinessJsonLd";

const title = `About ${site.name} | Hospitality in Dibrugarh`;

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  socialTitle: title,
  description: `${site.name} in Seujpur, Dibrugarh — over a decade of traditional Assamese hospitality, ${rooms.length} themed guest rooms and a separate Party Room.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BusinessJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd()) }}
      />
      <div className="pt-28 sm:pt-32">
        <Container>
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
          <SectionHeading
            as="h1"
            eyebrow="About Us"
            title={`About ${site.name}`}
            description="A homestay in Dibrugarh with over a decade of traditional Assamese hospitality and rooms that each have a character of their own."
          />

          <div className="mx-auto mt-14 max-w-3xl space-y-14">
            <Reveal>
              <section aria-labelledby="who-heading">
                <h2 id="who-heading" className="text-2xl text-foreground sm:text-3xl">
                  Who we are
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {site.name} is a homestay at {site.location.streetAddress}, {site.location.locality},{" "}
                  {site.location.region}. For more than ten years it has welcomed guests with traditional Assamese
                  hospitality. Established in {legacy.foundedYear}, it is the first homestay in Dibrugarh and the first luxury homestay in the entire North East India.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  To book, message the host on WhatsApp or call — availability and rates are confirmed directly with the
                  host, and no payment is taken on this website.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="rooms-heading">
                <h2 id="rooms-heading" className="text-2xl text-foreground sm:text-3xl">
                  Rooms with their own character
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  The homestay has {roomCountPhrase}. Each guest room is styled around a colour — this is what each
                  one is known for:
                </p>
                <ul className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
                  {rooms.map((r) => (
                    <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3.5 text-sm">
                      <span className="font-semibold text-foreground">
                        {roomHasPage(r) ? (
                          <Link href={roomPath(r)} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-gold-deep hover:underline">
                            {r.name}
                          </Link>
                        ) : (
                          r.name
                        )}
                      </span>
                      <span className="text-muted-foreground">{r.highlights.join(" · ")}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  See every room with rates on the{" "}
                  <Link href="/rooms" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
                    rooms page
                  </Link>{" "}
                  or browse the{" "}
                  <Link href="/gallery" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
                    photo gallery
                  </Link>
                  .
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="recognition-heading">
                <h2 id="recognition-heading" className="text-2xl text-foreground sm:text-3xl">
                  Recognition
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {awardSentence()} {legacy.award.note}
                </p>
              </section>
            </Reveal>
          </div>
        </Container>

        <OurJourney />

        <Container>
          <section className="mx-auto max-w-3xl pb-20 sm:pb-24" aria-labelledby="glance-heading">
            <h2 id="glance-heading" className="text-2xl text-foreground sm:text-3xl">
              At a glance
            </h2>
            <dl className="mt-6 grid gap-5 rounded-2xl border border-border bg-card p-6 text-sm shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</dt>
                <dd className="mt-1 leading-relaxed text-foreground">{site.location.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone / WhatsApp</dt>
                <dd className="mt-1 text-foreground">
                  {site.phones.map((p) => (
                    <a key={p} href={phoneHref(p)} className="flex min-h-11 items-center underline-offset-4 hover:text-gold-deep hover:underline">
                      {p}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rooms</dt>
                <dd className="mt-1 text-foreground">{roomCountPhrase}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Room rates</dt>
                <dd className="mt-1 text-foreground">
                  {formatINR(lowestRoomPrice)} – {formatINR(highestRoomPrice)}
                </dd>
              </div>
            </dl>
          </section>
        </Container>
      </div>
      <EnquiryCta title="Come and stay with us" text="Tell the host about your dates and which room caught your eye — we'll reply on WhatsApp." />
    </>
  );
}

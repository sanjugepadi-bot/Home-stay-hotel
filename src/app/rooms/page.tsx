import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RoomListCard } from "@/components/rooms/RoomListCard";
import { EnquiryCta } from "@/components/rooms/EnquiryCta";
import { rooms, roomCountPhrase, roomHasPage, roomPath } from "@/data/rooms";
import { PartyRoomCard } from "@/components/home/PartyRoomCard";
import { site } from "@/data/site";
import { formatINR } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { roomsIndexJsonLd } from "@/lib/structured-data";

const names = rooms.map((r) => r.name.replace("The ", "").replace(" Room", ""));
const nameList = `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

const title = "Rooms & Rates | Accommodation in Dibrugarh | Tea Garden Homestay";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  socialTitle: title,
  description: `${roomCountPhrase} in Dibrugarh, Assam — ${nameList}, plus a separate Party Room. See room rates, what's included and photographs.`,
  path: "/rooms",
});

/** Who-it-suits guidance. Every line comes from the owner's own room descriptions. */
const guide: { title: string; text: string; roomIds: string[] }[] = [
  {
    title: "Families and groups",
    text: "The Blue Room is ideal for 4 guests, and the owners describe the Gold Room as captivating for families and kids alike.",
    roomIds: ["blue", "gold"],
  },
  {
    title: "Couples and backpackers",
    text: "The Pink Room is a small, cozy room with a double bed and a tea garden facing balcony.",
    roomIds: ["pink"],
  },
  {
    title: "Budget stays, solo travellers and students",
    text: "The Red Room is designed for budget travellers, solo guests, students and young couples.",
    roomIds: ["red"],
  },
  {
    title: "Tea garden views",
    text: "The White Room has a spacious balcony overlooking a tea garden, and the Blue and Pink rooms have tea garden facing balconies.",
    roomIds: ["white", "blue", "pink"],
  },
  {
    title: "Ground floor and a private kitchen",
    text: "The Yellow Room is on the ground floor with natural light — ideal for those unable to climb stairs — and has an attached private kitchen, free to use.",
    roomIds: ["yellow"],
  },
  {
    title: "Breakfast",
    text: "Breakfast is included in the Gold, White, Green, Blue, Black and Yellow room rates (the Gold Room also includes snacks and other edibles). For the Pink and Red rooms, please ask when you enquire.",
    roomIds: [],
  },
];

export default function RoomsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomsIndexJsonLd()) }}
      />
      <div className="pb-20 pt-28 sm:pb-28 sm:pt-32">
        <Container>
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Rooms" }]} />
          <SectionHeading
            as="h1"
            eyebrow="Rooms & Rates"
            title="Themed accommodation in Dibrugarh"
            description={`${roomCountPhrase} at ${site.name}, Seujpur — each with its own colour and character — plus a separate Party Room. Looking for places to stay in Dibrugarh for a family trip, a couple's getaway or a budget stay? Start here.`}
          />

          <section className="mt-16" aria-labelledby="suit-heading">
            <h2 id="suit-heading" className="text-2xl text-foreground sm:text-3xl">
              Find the room that suits you
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guide.map((g) => (
                <div key={g.title} className="rounded-2xl border border-border bg-card p-6 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
                  <h3 className="text-lg text-foreground">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
                  {g.roomIds.length > 0 && (
                    <p className="mt-2 flex flex-wrap gap-x-4 text-sm font-semibold">
                      {g.roomIds.map((id) => {
                        const room = rooms.find((r) => r.id === id);
                        if (!room) return null;
                        return roomHasPage(room) ? (
                          <Link key={id} href={roomPath(room)} className="inline-flex min-h-11 items-center text-gold-deep underline-offset-4 hover:underline">
                            {room.name} →
                          </Link>
                        ) : (
                          <span key={id} className="inline-flex min-h-11 items-center text-muted-foreground">
                            {room.name}
                          </span>
                        );
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20" aria-labelledby="all-rooms-heading">
            <h2 id="all-rooms-heading" className="text-2xl text-foreground sm:text-3xl">
              Our themed rooms
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {rooms.map((room, i) => (
                <RoomListCard key={room.id} room={room} index={i} />
              ))}
            </div>
          </section>

          <section className="mt-20" aria-label="The Party Room">
            <PartyRoomCard />
          </section>

          <section className="mt-20" aria-labelledby="rates-heading">
            <h2 id="rates-heading" className="text-2xl text-foreground sm:text-3xl">
              Room rates at a glance
            </h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)]">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <caption className="sr-only">Room rates and inclusions at {site.name}</caption>
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <th scope="col" className="px-5 py-3 font-semibold">Room</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Room rate</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Included</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((r) => (
                    <tr key={r.id} className="border-b border-border last:border-0">
                      <th scope="row" className="px-5 py-3.5 font-semibold text-foreground">
                        {roomHasPage(r) ? (
                          <Link href={roomPath(r)} className="underline-offset-4 hover:text-gold-deep hover:underline">
                            {r.name}
                          </Link>
                        ) : (
                          r.name
                        )}
                      </th>
                      <td className="px-5 py-3.5 text-foreground">{formatINR(r.price)}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{r.includes ?? "Please ask when you enquire"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              These are the owner&apos;s current room rates. Please confirm availability and any extra charges when you
              enquire. No payment is taken on this website.
            </p>
          </section>
        </Container>
      </div>
      <EnquiryCta title="Choose your room, then message the host" />
    </>
  );
}

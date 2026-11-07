"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BedDouble, History, Images, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { Button, buttonVariants } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { PartyRoomCard } from "./PartyRoomCard";
import { rooms, roomCover, roomHasPage, roomPath, TOTAL_ROOMS, type Room } from "@/data/rooms";
import { photos } from "@/lib/photos";
import { site } from "@/data/site";
import { formatINR, cn } from "@/lib/utils";

const STAGE_SIZES = "(min-width: 1536px) 520px, (min-width: 1280px) 440px, (min-width: 768px) 40vw, 92vw";

function coverOf(room: Room) {
  const cover = roomCover(room);
  const key = cover?.photoKey ?? room.photoKey;
  return { src: key ? photos[key] : undefined, alt: cover?.alt };
}

/** One row of the room selector: thumbnail, name and rate — makes comparing rooms effortless. */
function SelectorRow({
  room,
  active,
  onSelect,
  onKeyDown,
  buttonRef,
  illustration,
}: {
  room: Room;
  active: boolean;
  onSelect: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
  illustration?: string;
}) {
  const { src } = coverOf(room);
  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={`tab-${room.id}`}
      aria-selected={active}
      aria-controls={`panel-${room.id}`}
      tabIndex={active ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={cn(
        "group flex w-[15.5rem] shrink-0 snap-center items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold xl:w-full xl:p-3",
        active
          ? "border-gold bg-card shadow-[0_22px_40px_-18px_rgba(70,45,10,0.45)] xl:translate-x-3"
          : "border-border/70 bg-card/55 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-card xl:hover:translate-x-1.5 xl:hover:translate-y-0"
      )}
    >
      <span
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-card xl:h-14 xl:w-14"
        style={{ ["--tw-ring-color" as string]: active ? room.accent : "transparent" }}
      >
        {illustration ? (
          <Image src={illustration} alt="" fill sizes="64px" className="object-cover" />
        ) : src ? (
          <Image src={src} alt="" fill sizes="64px" className="object-cover" placeholder="blur" />
        ) : (
          <span className="flex h-full w-full items-center justify-center" style={{ background: `linear-gradient(135deg, ${room.accent}, ${room.accent}99)` }}>
            <BedDouble className="h-6 w-6 text-white/85" aria-hidden />
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-lg leading-tight text-foreground xl:text-xl">{room.name}</span>
        <span className="mt-1 block text-base font-semibold text-gold-deep">{formatINR(room.price)}</span>
      </span>
      <ArrowRight
        className={cn("hidden h-5 w-5 shrink-0 transition-all duration-300 xl:block", active ? "translate-x-0 text-gold-deep opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60")}
        aria-hidden
      />
    </button>
  );
}

/** The large "stage" for the selected room: photograph on the left, readable details and actions on the right. */
function RoomPanel({
  room,
  active,
  illustration,
  onOpenPhotos,
}: {
  room: Room;
  active: boolean;
  illustration?: string;
  onOpenPhotos: () => void;
}) {
  const { selectRoomAndScroll } = useBooking();
  const { src, alt } = coverOf(room);
  const gallery = room.gallery ?? [];
  const landscape = src ? src.width > src.height : false;

  return (
    <div
      role="tabpanel"
      id={`panel-${room.id}`}
      aria-labelledby={`tab-${room.id}`}
      hidden={!active}
      className="room-panel-in grid w-full grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 xl:gap-14"
    >
      {/* photograph */}
      <Tilt3D className="relative mx-auto w-full max-w-md md:max-w-none">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[11rem] rounded-b-[2rem] bg-muted shadow-[0_2px_4px_rgba(70,45,10,0.08),0_30px_60px_-20px_rgba(70,45,10,0.5)] ring-1 ring-gold/30">
          {illustration || src ? (
            <button
              type="button"
              onClick={onOpenPhotos}
              disabled={gallery.length === 0}
              aria-label={`View all ${gallery.length} photos of ${room.name}`}
              className="absolute inset-0 block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
            >
              {illustration ? (
                <Image
                  src={illustration}
                  alt={`AI illustration of the ${room.name} theme — not a photograph of the actual room`}
                  fill
                  sizes={STAGE_SIZES}
                  quality={90}
                  className="object-cover"
                />
              ) : src ? (
                <Image
                  src={src}
                  alt={alt ?? `${room.name} at ${site.name}, Dibrugarh`}
                  fill
                  sizes={STAGE_SIZES}
                  quality={90}
                  placeholder="blur"
                  className={cn("object-cover", landscape ? "object-[70%_60%]" : "object-center")}
                />
              ) : null}
            </button>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center text-white" style={{ background: `linear-gradient(160deg, ${room.accent}, ${room.accent}88)` }}>
              <BedDouble className="h-14 w-14 text-white/90" aria-hidden />
              <p className="font-display text-2xl">{room.name}</p>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/85">Photographs coming soon</p>
            </div>
          )}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,240,200,0.16),transparent_42%)]" />
          <div aria-hidden className="room-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100" />
          {illustration && (
            <span
              title="AI-generated illustration — not a photograph of the actual room. Real photographs are in the room's gallery."
              className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3 text-gold-light" aria-hidden /> AI Illustration
            </span>
          )}
          {gallery.length > 0 && (
            <button
              type="button"
              onClick={onOpenPhotos}
              className="absolute right-4 top-16 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-background/90 px-4 text-sm font-semibold text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Images className="h-4 w-4" aria-hidden /> {gallery.length} {gallery.length === 1 ? "photo" : "photos"}
            </button>
          )}
        </div>
      </Tilt3D>

      {/* details */}
      <div>
        <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gold-deep sm:text-sm">
          <span aria-hidden className="h-3 w-3 rounded-full ring-2 ring-background" style={{ backgroundColor: room.accent, boxShadow: `0 0 0 1px ${room.accent}66` }} />
          Guest room
        </span>
        <h3 className="mt-3 font-display text-[clamp(2.25rem,1.5rem+2.4vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-foreground">{room.name}</h3>
        <span aria-hidden className="mt-5 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />

        <p className="mt-6 text-[1.0625rem] leading-8 text-muted-foreground sm:text-lg xl:text-[1.2rem] xl:leading-9">{room.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {room.highlights.map((h) => (
            <li key={h} className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[0.95rem] font-medium text-foreground">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-t border-border pt-7">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Room rate</span>
            <p className="font-display text-[clamp(2.5rem,2rem+1.6vw,3.5rem)] leading-none text-foreground">{formatINR(room.price)}</p>
            {room.includes && <p className="mt-2 text-base text-muted-foreground">{room.includes}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="forest" size="lg" className="min-h-14 px-8" onClick={() => selectRoomAndScroll(room.id)}>
              Enquire Now
            </Button>
            {roomHasPage(room) ? (
              <Link href={roomPath(room)} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group/btn min-h-14 px-7")}>
                View Details <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />
              </Link>
            ) : gallery.length > 0 ? (
              <Button variant="outline" size="lg" className="min-h-14 px-7" onClick={onOpenPhotos}>
                View Photos
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoomShowcase({ illustrations = {} }: { illustrations?: Record<string, string> }) {
  const { ids, markViewed } = useRecentlyViewed();
  const recentRooms = rooms.filter((r) => ids.includes(r.id));
  const [activeId, setActiveId] = useState(rooms[0].id);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeRoom = rooms.find((r) => r.id === activeId) ?? rooms[0];

  const select = (id: string, focus = false) => {
    setActiveId(id);
    markViewed(id);
    if (focus) tabRefs.current[id]?.focus();
  };

  const onKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = rooms.length - 1;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next >= 0) {
      e.preventDefault();
      select(rooms[next].id, true);
    }
  };

  return (
    <section id="rooms" className="rooms-stage relative isolate scroll-mt-20 overflow-hidden py-20 sm:py-28 xl:py-32">
      {/* hairline arches echo the hero's arched photo */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-24 -z-10 hidden h-[34rem] w-[22rem] rounded-t-full border border-gold/30 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-40 -z-10 hidden h-[30rem] w-[20rem] rounded-t-full border border-gold/25 lg:block" />

      <Container className="max-w-[96rem] xl:px-12">
        <SectionHeading
          eyebrow="Rooms & Stays"
          title="Choose your room"
          description={`${TOTAL_ROOMS} rooms in total: ${rooms.length} individually themed guest rooms and a separate Party Room.`}
        />

        {recentRooms.length > 0 && (
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <History className="h-3.5 w-3.5 text-gold-deep" /> Recently viewed:
            {recentRooms.map((r) => (
              <span key={r.id} className="rounded-full border border-border bg-card/60 px-2.5 py-1">
                {r.name}
              </span>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 xl:mt-16 xl:grid-cols-[26rem_minmax(0,1fr)] xl:gap-12">
            {/* selector: horizontal swipe row on phones/tablets, vertical list on large screens */}
            <div className="min-w-0">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-gold-deep xl:mb-4">Select a guest room</p>
              <div
                role="tablist"
                aria-label="Guest rooms"
                aria-orientation="vertical"
                className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 hide-scrollbar sm:mx-0 sm:px-0 xl:flex-col xl:gap-2.5 xl:overflow-visible xl:pb-0"
              >
                {rooms.map((room, i) => (
                  <SelectorRow
                    key={room.id}
                    room={room}
                    active={room.id === activeId}
                    onSelect={() => select(room.id)}
                    onKeyDown={onKeyDown(i)}
                    buttonRef={(el) => {
                      tabRefs.current[room.id] = el;
                    }}
                    illustration={illustrations[room.id]}
                  />
                ))}
              </div>
              <Link href="/rooms" className="mt-5 hidden min-h-11 items-center gap-2 text-base font-semibold text-gold-deep underline-offset-4 hover:underline xl:inline-flex">
                Compare all rooms &amp; rates <ArrowRight className="h-4.5 w-4.5" aria-hidden />
              </Link>
            </div>

            {/* stage */}
            <div className="min-w-0 rounded-[2.25rem] border border-white/60 bg-card/80 p-6 shadow-[0_2px_4px_rgba(70,45,10,0.05),0_40px_80px_-40px_rgba(70,45,10,0.45)] backdrop-blur-sm sm:p-8 xl:flex xl:flex-col xl:justify-center xl:p-12">
              {rooms.map((room) => (
                <RoomPanel
                  key={room.id}
                  room={room}
                  active={room.id === activeId}
                  illustration={illustrations[room.id]}
                  onOpenPhotos={() => setViewerIndex(0)}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Link href="/rooms" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-8 flex w-full xl:hidden")}>
          Compare all rooms &amp; rates
        </Link>

        <div className="mt-16 lg:mt-20">
          <PartyRoomCard />
        </div>
      </Container>

      {(activeRoom.gallery?.length ?? 0) > 0 && (
        <PhotoLightbox
          title={`${activeRoom.name} photos`}
          photos={(activeRoom.gallery ?? []).map((p) => ({ id: p.id, src: photos[p.photoKey], caption: p.caption, alt: p.alt }))}
          index={viewerIndex}
          onIndexChange={setViewerIndex}
        />
      )}
    </section>
  );
}

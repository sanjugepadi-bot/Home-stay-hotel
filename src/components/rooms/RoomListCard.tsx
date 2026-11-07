import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { cn, formatINR } from "@/lib/utils";
import { photos } from "@/lib/photos";
import { site, whatsappLink } from "@/data/site";
import { roomHasPage, roomPath, type Room } from "@/data/rooms";

/**
 * Room card for the Rooms page (and "other rooms" blocks). The photo and the
 * room name link to the room's own page when it has one.
 */
export function RoomListCard({
  room,
  index = 0,
  compact = false,
  headingLevel = "h3",
}: {
  room: Room;
  index?: number;
  /** Compact: no description / badges (used for "other rooms you may like"). */
  compact?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const cover = room.gallery?.[0];
  const href = roomHasPage(room) ? roomPath(room) : null;
  const Heading = headingLevel;

  const image = cover ? (
    <SmartImage
      icon="BedDouble"
      seed={index}
      aspect="aspect-[4/3]"
      className="rounded-none"
      src={photos[cover.photoKey]}
      alt={cover.alt}
      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
    />
  ) : null; // rooms without photos show no image area at all

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-2xl",
        // Rooms with no photos size to their own content instead of stretching.
        image ? "h-full" : "h-auto self-start"
      )}
    >
      {image &&
        (href ? (
          <Link href={href} aria-label={`${room.name} — view room and photos`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold">
            {image}
          </Link>
        ) : (
          image
        ))}

      <div className="flex flex-1 flex-col p-5">
        <Heading className="text-xl text-foreground">
          {href ? (
            <Link href={href} className="-my-2 inline-flex min-h-11 items-center underline-offset-4 hover:text-gold-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              {room.name}
            </Link>
          ) : (
            room.name
          )}
        </Heading>

        {!compact && (
          <>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{room.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {room.highlights.map((h) => (
                <Badge key={h}>
                  <CheckCircle2 className="mr-1 h-3 w-3" /> {h}
                </Badge>
              ))}
            </div>
          </>
        )}

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-border pt-4">
            <div>
              <span className="text-xs text-muted-foreground">Room rate</span>
              <p className="font-display text-2xl text-forest dark:text-gold">{formatINR(room.price)}</p>
              {room.includes && <p className="text-xs text-muted-foreground">{room.includes}</p>}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {href && (
              <Link href={href} className={buttonVariants({ variant: "forest", size: "sm" })}>
                View room &amp; photos
              </Link>
            )}
            <a
              href={whatsappLink(`Hi ${site.name}! I'd like to enquire about ${room.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <MessageCircle className="h-4 w-4" /> Enquire
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

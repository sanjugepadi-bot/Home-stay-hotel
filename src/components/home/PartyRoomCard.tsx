import Link from "next/link";
import { ArrowRight, MessageCircle, PartyPopper, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { partyRoom } from "@/data/party-room";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { PartyRoomPhotos } from "./PartyRoomPhotos";

/**
 * The separate Party Room — deliberately styled differently from the guest-room cards (midnight + gold
 * panel instead of a photo card). Shows only owner-confirmed content; fields stay hidden until supplied.
 */
export function PartyRoomCard({ className }: { className?: string }) {
  const hasDetails = Boolean(partyRoom.description.length || partyRoom.capacity || partyRoom.rate || partyRoom.facilities.length);
  const hasPhotos = partyRoom.photos.length > 0;

  return (
    <Reveal className={className}>
      <article
        id="party-room"
        className="relative isolate overflow-hidden rounded-[2rem] border border-gold/40 bg-[radial-gradient(60rem_26rem_at_90%_0%,rgba(201,162,75,0.22),transparent_60%),linear-gradient(135deg,#1b1530_0%,#241a3a_55%,#15112a_100%)] p-7 text-beige-light shadow-[0_40px_80px_-34px_rgba(20,10,40,0.8)] sm:p-10 lg:p-12"
      >
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full border border-gold/25" />
        <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full border border-gold/20" />

        <div className={cn("grid grid-cols-[minmax(0,1fr)] items-center gap-8", hasPhotos && "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14")}>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-gold-light sm:text-sm">
              <PartyPopper className="h-4.5 w-4.5" aria-hidden /> Also at the homestay
            </span>
            <h3 className="mt-4 font-display text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-medium leading-tight text-beige-light">
              {partyRoom.name}
            </h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold-light/90">
              Celebrations, private events &amp; overnight stays
            </p>

            {partyRoom.description.length > 0 && (
              <div className="mt-7 max-w-2xl">
                {partyRoom.descriptionTitle && (
                  <h4 className="font-display text-[clamp(1.35rem,1.1rem+0.9vw,1.85rem)] font-medium leading-snug text-gold-light">{partyRoom.descriptionTitle}</h4>
                )}
                <div className="mt-4 space-y-4 text-[1.0625rem] leading-8 text-beige-light/90 xl:text-lg xl:leading-8">
                  {partyRoom.description.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {(partyRoom.capacity || partyRoom.rate || partyRoom.facilities.length > 0 || partyRoom.overnightStay) && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {partyRoom.capacity && <li className="rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-sm font-medium text-gold-light">{partyRoom.capacity}</li>}
                {partyRoom.rate && <li className="rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-sm font-medium text-gold-light">{partyRoom.rate}</li>}
                {partyRoom.overnightStay && <li className="rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-sm font-medium text-gold-light">Overnight stays available</li>}
                {partyRoom.facilities.map((f) => (
                  <li key={f} className="rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-sm font-medium text-gold-light">{f}</li>
                ))}
              </ul>
            )}

            {!hasDetails && (
              <p className="mt-6 flex max-w-2xl items-start gap-3 rounded-2xl border border-dashed border-gold/45 bg-white/[0.04] p-4 text-[0.97rem] leading-relaxed text-beige-light/90 sm:p-5">
                <Sparkles className="mt-1 h-4.5 w-4.5 shrink-0 text-gold-light" aria-hidden />
                <span>
                  {hasPhotos
                    ? "Capacity, facilities and rates for the Party Room are being confirmed with the owner — please ask the host for details."
                    : "The homestay also has a separate Party Room. Photographs, capacity, facilities and rates are being confirmed with the owner — please ask the host for details."}
                </span>
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={whatsappLink(`Hi ${site.name}! I'd like to know about the Party Room.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "gold", size: "lg" })}
              >
                <MessageCircle className="h-4.5 w-4.5" aria-hidden /> Ask about the Party Room
              </a>
              <Link
                href="/party-room"
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-gold-light underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Party Room details <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          {hasPhotos && <PartyRoomPhotos photos={partyRoom.photos} />}
        </div>
      </article>
    </Reveal>
  );
}

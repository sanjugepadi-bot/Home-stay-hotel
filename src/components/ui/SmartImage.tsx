import { createElement } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

const TONES = [
  "from-forest via-forest-light to-gold/60",
  "from-gold/70 via-beige to-forest/70",
  "from-forest-light via-forest to-gold/40",
  "from-beige via-gold/50 to-forest-light",
];

/**
 * Property photo (when `src` is given) with a graceful gradient + icon
 * placeholder fallback (when it isn't) — same aspect box either way, so a
 * missing photo never breaks layout.
 */
export function SmartImage({
  icon,
  label,
  seed = 0,
  aspect = "aspect-[4/3]",
  className,
  iconClassName,
  src,
  alt,
  priority,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  icon: string;
  label?: string;
  seed?: number;
  aspect?: string;
  className?: string;
  iconClassName?: string;
  src?: StaticImageData;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const tone = TONES[seed % TONES.length];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        !src && "bg-gradient-to-br",
        !src && tone,
        aspect,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? label ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            {createElement(getIcon(icon), {
              className: cn("h-10 w-10 text-white/70 sm:h-14 sm:w-14", iconClassName),
              strokeWidth: 1.25,
            })}
          </div>
        </>
      )}
      {label && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}

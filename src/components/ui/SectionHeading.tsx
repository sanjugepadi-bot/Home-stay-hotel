import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  /** "inverted" is for sections that are always a dark forest surface
   * (e.g. AI Travel Assistant) regardless of the site-wide light/dark theme —
   * it forces light/cream text so headings never go dark-on-dark. */
  tone = "default",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "default" | "inverted";
  className?: string;
}) {
  const inverted = tone === "inverted";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]",
            inverted ? "text-gold-light" : "text-gold-deep",
            align === "center" && "justify-center"
          )}
        >
          <span className={cn("h-px w-6", inverted ? "bg-gold-light/60" : "bg-gold-deep/60")} aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl",
          inverted ? "text-beige-light" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            inverted ? "text-beige-light/75" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

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
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "default" | "inverted";
  /** Use "h1" on pages whose main heading this is (one H1 per page). */
  as?: "h1" | "h2";
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
      <Heading
        className={cn(
          "text-[clamp(1.875rem,1.3rem+2.8vw,3rem)] leading-[1.12] tracking-tight",
          inverted ? "text-beige-light" : "text-foreground"
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-[clamp(1rem,0.94rem+0.3vw,1.125rem)] leading-relaxed",
            inverted ? "text-beige-light/75" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

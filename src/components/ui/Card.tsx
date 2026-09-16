import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest dark:bg-gold/10 dark:text-gold",
        className
      )}
      {...props}
    />
  );
}

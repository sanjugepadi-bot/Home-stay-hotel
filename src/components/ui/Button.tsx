import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold: "bg-gold text-forest hover:bg-gold-light shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/35 hover:-translate-y-0.5",
        forest: "bg-forest text-beige-light hover:bg-forest-light shadow-lg shadow-forest/25 hover:shadow-xl hover:-translate-y-0.5",
        outline: "border-2 border-current/25 text-foreground hover:border-gold hover:text-gold-deep dark:hover:text-gold",
        ghost: "text-foreground hover:bg-foreground/5",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:-translate-y-0.5",
      },
      size: {
        sm: "h-11 px-4 text-[clamp(0.8125rem,0.78rem+0.15vw,0.875rem)]",
        md: "h-11 px-6 text-[clamp(0.8125rem,0.78rem+0.15vw,0.875rem)]",
        lg: "h-14 px-8 text-[clamp(0.9375rem,0.88rem+0.3vw,1.0625rem)]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

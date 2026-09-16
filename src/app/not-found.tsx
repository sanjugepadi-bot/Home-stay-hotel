import Link from "next/link";
import { Leaf } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center pt-24">
      <Container className="text-center">
        <Leaf className="mx-auto h-10 w-10 text-gold-deep" />
        <h1 className="mt-6 text-5xl text-foreground">404</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">This trail doesn&apos;t lead anywhere — let&apos;s get you back.</p>
        <Link href="/" className={buttonVariants({ variant: "gold", size: "lg", className: "mt-8" })}>
          Back to Serenity Stays
        </Link>
      </Container>
    </div>
  );
}

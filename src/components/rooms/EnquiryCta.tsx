import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { site, whatsappLink } from "@/data/site";

/** Closing call-to-action for the content pages: WhatsApp enquiry + contact page. */
export function EnquiryCta({
  title = "Ready to plan your stay?",
  text = "Message the host on WhatsApp to ask about a room, check availability and confirm the rate.",
  whatsappText = `Hi ${site.name}! I'd like to enquire about a stay.`,
}: {
  title?: string;
  text?: string;
  whatsappText?: string;
}) {
  return (
    <section className="bg-forest py-16 text-beige-light sm:py-20">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-[clamp(1.625rem,1.2rem+2vw,2.5rem)] leading-tight text-beige-light">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-beige-light/80">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "whatsapp", size: "lg" })}
          >
            <MessageCircle className="h-4.5 w-4.5" /> Enquire on WhatsApp
          </a>
          <Link href="/contact" className={buttonVariants({ variant: "gold", size: "lg" })}>
            Contact &amp; Book
          </Link>
        </div>
      </Container>
    </section>
  );
}

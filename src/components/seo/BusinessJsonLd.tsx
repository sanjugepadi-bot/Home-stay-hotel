import { lodgingBusinessJsonLd } from "@/lib/structured-data";

/** The LodgingBusiness + WebSite structured data. Rendered on real pages only (never on the 404 page). */
export function BusinessJsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessJsonLd()) }} />;
}

import Link from "next/link";

export type Crumb = { name: string; href?: string };

/** Visible breadcrumb trail; the last crumb (no href) is the current page.
 * Pair it with `breadcrumbJsonLd()` so search engines get the same trail. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={c.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href ? (
              <Link
                href={c.href}
                className="inline-flex min-h-11 items-center rounded-sm underline-offset-4 hover:text-gold-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

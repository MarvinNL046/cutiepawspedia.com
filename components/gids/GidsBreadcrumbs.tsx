import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface GidsBreadcrumbsProps {
  items: BreadcrumbItem[];
  locale?: string;
}

export function GidsBreadcrumbs({ items, locale = "nl" }: GidsBreadcrumbsProps) {
  const baseUrl = "https://cutiepawspedia.com";

  // Build full breadcrumb list with Home and Gids
  const fullItems: BreadcrumbItem[] = [
    { label: "Home", href: `/${locale}` },
    { label: "Gids", href: `/${locale}/gids` },
    ...items,
  ];

  return (
    <>
      {/* Visual Breadcrumbs */}
      <nav className="bg-muted/30 dark:bg-cpCharcoal/50 border-b border-border dark:border-cpAmber/10">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            {fullItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${index === 0 ? "flex items-center gap-1" : ""} text-muted-foreground hover:text-cpCoral transition-colors`}
                  >
                    {index === 0 && <Home className="w-3.5 h-3.5" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span className="text-foreground dark:text-cpCream font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": fullItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              "item": item.href ? `${baseUrl}${item.href}` : undefined,
            })),
          }),
        }}
      />
    </>
  );
}

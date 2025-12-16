/**
 * FoodGuideBreadcrumb Component
 * Adds both visual breadcrumbs and JSON-LD schema for SEO
 * Used on voedselgids, veilige-voeding, giftige-stoffen, and detail pages
 */

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface FoodGuideBreadcrumbProps {
  locale: string;
  items: BreadcrumbItem[];
  currentPage: string;
}

export function FoodGuideBreadcrumb({ locale, items, currentPage }: FoodGuideBreadcrumbProps) {
  // Build full breadcrumb list including Home
  const fullItems = [
    { name: "Home", href: `/${locale}` },
    ...items,
  ];

  // JSON-LD BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...fullItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `https://cutiepawspedia.com${item.href}`,
      })),
      {
        "@type": "ListItem",
        position: fullItems.length + 1,
        name: currentPage,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Visual Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap"
      >
        {fullItems.map((item, index) => (
          <span key={item.href} className="flex items-center gap-1">
            {index === 0 ? (
              <Link
                href={item.href}
                className="hover:text-cpCoral flex items-center gap-1 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">{item.name}</span>
              </Link>
            ) : (
              <Link
                href={item.href}
                className="hover:text-cpCoral transition-colors"
              >
                {item.name}
              </Link>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          </span>
        ))}
        <span className="text-foreground dark:text-cpCream font-medium">
          {currentPage}
        </span>
      </nav>
    </>
  );
}

/**
 * Related toxic substances component for internal linking
 * Shows links to related toxic substances on safe food pages
 */
interface RelatedToxicSubstance {
  slug: string;
  name: string;
  animal: "honden" | "katten";
  icon: string;
}

interface RelatedToxicLinksProps {
  locale: string;
  animal: "honden" | "katten";
  substances: RelatedToxicSubstance[];
  title?: string;
}

export function RelatedToxicLinks({
  locale,
  animal,
  substances,
  title = "Andere giftige stoffen",
}: RelatedToxicLinksProps) {
  const filteredSubstances = substances.filter((s) => s.animal === animal);

  if (filteredSubstances.length === 0) return null;

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-semibold text-muted-foreground dark:text-cpCream/70 mb-3">
        {title} voor {animal}:
      </h3>
      <div className="flex flex-wrap gap-2">
        {filteredSubstances.map((substance) => (
          <Link
            key={substance.slug}
            href={`/${locale}/is-${substance.slug}-giftig-voor-${substance.animal}`}
            className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            <span>{substance.icon}</span>
            {substance.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Related safe foods component for internal linking
 * Shows links to related safe foods on toxic substance pages
 */
interface RelatedSafeFood {
  slug: string;
  name: string;
  animal: "honden" | "katten";
  icon: string;
}

interface RelatedSafeFoodsProps {
  locale: string;
  animal: "honden" | "katten";
  foods: RelatedSafeFood[];
  title?: string;
}

export function RelatedSafeFoods({
  locale,
  animal,
  foods,
  title = "Veilige alternatieven",
}: RelatedSafeFoodsProps) {
  const filteredFoods = foods.filter((f) => f.animal === animal);

  if (filteredFoods.length === 0) return null;

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <h3 className="text-sm font-semibold text-muted-foreground dark:text-cpCream/70 mb-3">
        {title} voor {animal}:
      </h3>
      <div className="flex flex-wrap gap-2">
        {filteredFoods.map((food) => (
          <Link
            key={food.slug}
            href={`/${locale}/mag-${food.animal === "honden" ? "hond" : "kat"}-${food.slug}-eten`}
            className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
          >
            <span>{food.icon}</span>
            {food.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Common toxic substances for quick linking
export const commonToxicSubstances: RelatedToxicSubstance[] = [
  { slug: "chocolade", name: "Chocolade", animal: "honden", icon: "🍫" },
  { slug: "druiven", name: "Druiven", animal: "honden", icon: "🍇" },
  { slug: "xylitol", name: "Xylitol", animal: "honden", icon: "🍬" },
  { slug: "ui", name: "Ui", animal: "honden", icon: "🧅" },
  { slug: "knoflook", name: "Knoflook", animal: "honden", icon: "🧄" },
  { slug: "avocado", name: "Avocado", animal: "honden", icon: "🥑" },
  { slug: "lelie", name: "Lelie", animal: "katten", icon: "🌺" },
  { slug: "ui", name: "Ui", animal: "katten", icon: "🧅" },
  { slug: "knoflook", name: "Knoflook", animal: "katten", icon: "🧄" },
  { slug: "chocolade", name: "Chocolade", animal: "katten", icon: "🍫" },
  { slug: "paracetamol", name: "Paracetamol", animal: "katten", icon: "💊" },
];

// Common safe foods for quick linking
export const commonSafeFoods: RelatedSafeFood[] = [
  { slug: "rijst", name: "Rijst", animal: "honden", icon: "🍚" },
  { slug: "kip", name: "Kip", animal: "honden", icon: "🍗" },
  { slug: "wortel", name: "Wortel", animal: "honden", icon: "🥕" },
  { slug: "appel", name: "Appel", animal: "honden", icon: "🍎" },
  { slug: "banaan", name: "Banaan", animal: "honden", icon: "🍌" },
  { slug: "tonijn", name: "Tonijn", animal: "katten", icon: "🐟" },
  { slug: "kip", name: "Kip", animal: "katten", icon: "🍗" },
  { slug: "zalm", name: "Zalm", animal: "katten", icon: "🐟" },
  { slug: "pompoen", name: "Pompoen", animal: "katten", icon: "🎃" },
];

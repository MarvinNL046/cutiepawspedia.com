import Link from "next/link";
import { NewsletterForm } from "@/components/forms";

interface FooterProps {
  locale: string;
}

const CATEGORIES = [
  { slug: "veterinary", icon: "🩺", labelNl: "Dierenartsen", labelEn: "Veterinarians" },
  { slug: "grooming", icon: "✂️", labelNl: "Trimsalons", labelEn: "Grooming" },
  { slug: "pet-store", icon: "🛒", labelNl: "Dierenwinkels", labelEn: "Pet Stores" },
  { slug: "dog-training", icon: "🐕", labelNl: "Hondentraining", labelEn: "Dog Training" },
  { slug: "pet-hotel", icon: "🏨", labelNl: "Dierenpensions", labelEn: "Pet Hotels" },
  { slug: "dog-walking", icon: "🦮", labelNl: "Hondenuitlaat", labelEn: "Dog Walking" },
];

const CITIES = [
  { slug: "amsterdam", name: "Amsterdam" },
  { slug: "rotterdam", name: "Rotterdam" },
  { slug: "utrecht", name: "Utrecht" },
  { slug: "den-haag", name: "Den Haag" },
];

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isNl = locale === "nl";

  return (
    <footer className="border-t border-border bg-muted/50">
      {/* Newsletter Section */}
      <div className="bg-cpPink/5 dark:bg-cpPink/10 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {isNl ? "Blijf op de hoogte" : "Stay Updated"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isNl
                  ? "Ontvang de laatste tips en nieuwe listings in je inbox."
                  : "Get the latest pet care tips and new listings in your inbox."}
              </p>
            </div>
            <div className="md:w-96">
              <NewsletterForm variant="inline" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold text-foreground">
                Cutie<span className="text-cpPink">Paws</span>Pedia
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {isNl
                ? "Dé gids voor huisdierservices. Vind de beste zorg voor je huisdier."
                : "The ultimate directory for pet services. Find the best pet care providers."}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {isNl ? "Categorieën" : "Categories"}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${locale}/netherlands/c/${cat.slug}`}
                    className="hover:text-cpPink transition-colors"
                  >
                    {cat.icon} {isNl ? cat.labelNl : cat.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {isNl ? "Populaire Steden" : "Popular Cities"}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${locale}/netherlands/${city.slug}`}
                    className="hover:text-cpPink transition-colors"
                  >
                    📍 {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/netherlands`}
                  className="hover:text-cpPink transition-colors font-medium"
                >
                  {isNl ? "→ Alle steden" : "→ All cities"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Lists */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {isNl ? "Top Lijsten" : "Top Lists"}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href={`/${locale}/netherlands/top/veterinary`}
                  className="hover:text-cpPink transition-colors"
                >
                  🏆 Top 10 {isNl ? "Dierenartsen" : "Veterinarians"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/netherlands/best/grooming`}
                  className="hover:text-cpPink transition-colors"
                >
                  ⭐ {isNl ? "Beste Trimsalons" : "Best Grooming"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/netherlands/amsterdam/best/veterinary`}
                  className="hover:text-cpPink transition-colors"
                >
                  🩺 {isNl ? "Beste in Amsterdam" : "Best in Amsterdam"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/netherlands/top/pet-store`}
                  className="hover:text-cpPink transition-colors"
                >
                  🛒 Top 10 {isNl ? "Dierenwinkels" : "Pet Stores"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Directory */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {isNl ? "Over Ons" : "Company"}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}`} className="hover:text-cpPink transition-colors">
                  🏠 {isNl ? "Home" : "Home"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/search`} className="hover:text-cpPink transition-colors">
                  🔍 {isNl ? "Zoeken" : "Search"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-cpPink transition-colors">
                  📝 Blog
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/for-businesses`} className="hover:text-cpPink transition-colors">
                  💼 {isNl ? "Voor Bedrijven" : "For Businesses"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-cpPink transition-colors">
                  ℹ️ {isNl ? "Over Ons" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-cpPink transition-colors">
                  ✉️ Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} CutiePawsPedia</p>
            <span className="hidden sm:inline">•</span>
            <Link href={`/${locale}/privacy`} className="hover:text-cpPink transition-colors">
              {isNl ? "Privacy" : "Privacy Policy"}
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href={`/${locale}/terms`} className="hover:text-cpPink transition-colors">
              {isNl ? "Voorwaarden" : "Terms"}
            </Link>
          </div>
          <div className="flex gap-4">
            <span className="text-muted-foreground/70 hover:text-cpPink cursor-pointer transition-colors">
              Twitter
            </span>
            <span className="text-muted-foreground/70 hover:text-cpPink cursor-pointer transition-colors">
              Instagram
            </span>
            <span className="text-muted-foreground/70 hover:text-cpPink cursor-pointer transition-colors">
              Facebook
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

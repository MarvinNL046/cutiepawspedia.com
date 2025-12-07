import Link from "next/link";
import { BadgeCheck, GraduationCap, Users, Lock, Shield } from "lucide-react";
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
      <div className="bg-cpCoral/5 dark:bg-cpCoral/10 border-b border-border">
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
                Cutie<span className="text-cpCoral">Paws</span>Pedia
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
                    className="hover:text-cpCoral transition-colors"
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
                    className="hover:text-cpCoral transition-colors"
                  >
                    📍 {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/netherlands`}
                  className="hover:text-cpCoral transition-colors font-medium"
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
                  className="hover:text-cpCoral transition-colors"
                >
                  🏆 Top 10 {isNl ? "Dierenartsen" : "Veterinarians"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/netherlands/best/grooming`}
                  className="hover:text-cpCoral transition-colors"
                >
                  ⭐ {isNl ? "Beste Trimsalons" : "Best Grooming"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/netherlands/amsterdam/best/veterinary`}
                  className="hover:text-cpCoral transition-colors"
                >
                  🩺 {isNl ? "Beste in Amsterdam" : "Best in Amsterdam"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/netherlands/top/pet-store`}
                  className="hover:text-cpCoral transition-colors"
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
                <Link href={`/${locale}`} className="hover:text-cpCoral transition-colors">
                  🏠 {isNl ? "Home" : "Home"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/search`} className="hover:text-cpCoral transition-colors">
                  🔍 {isNl ? "Zoeken" : "Search"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-cpCoral transition-colors">
                  📝 Blog
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/for-businesses`} className="hover:text-cpCoral transition-colors">
                  💼 {isNl ? "Voor Bedrijven" : "For Businesses"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-cpCoral transition-colors">
                  ℹ️ {isNl ? "Over Ons" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-cpCoral transition-colors">
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
            <Link href={`/${locale}/privacy-policy`} className="hover:text-cpCoral transition-colors">
              {isNl ? "Privacybeleid" : "Privacy Policy"}
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href={`/${locale}/cookie-policy`} className="hover:text-cpCoral transition-colors">
              {isNl ? "Cookiebeleid" : "Cookie Policy"}
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href={`/${locale}/terms`} className="hover:text-cpCoral transition-colors">
              {isNl ? "Voorwaarden" : "Terms"}
            </Link>
          </div>
          <div className="flex gap-4">
            <span className="text-muted-foreground/70 hover:text-cpCoral cursor-pointer transition-colors">
              Twitter
            </span>
            <span className="text-muted-foreground/70 hover:text-cpCoral cursor-pointer transition-colors">
              Instagram
            </span>
            <span className="text-muted-foreground/70 hover:text-cpCoral cursor-pointer transition-colors">
              Facebook
            </span>
          </div>
        </div>

        {/* Trust & Security Section - E-E-A-T (Bottom) */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <BadgeCheck className="w-4 h-4 text-blue-500" />
              <span className="text-xs">{isNl ? "Geverifieerde Bedrijven" : "Verified Businesses"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span className="text-xs">{isNl ? "Expert Reviews" : "Expert Reviews"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4 text-cpCoral" />
              <span className="text-xs">{isNl ? "Community Gedreven" : "Community Driven"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Lock className="w-4 h-4 text-cpAmber" />
              <span className="text-xs">{isNl ? "Privacy & Veiligheid" : "Privacy & Security"}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800">
              <Shield className="w-3 h-3 text-green-600 dark:text-green-400" />
              <span className="text-[10px] font-medium text-green-700 dark:text-green-300">
                {isNl ? "SSL Beveiligd" : "SSL Secured"}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
              <Lock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span className="text-[10px] font-medium text-blue-700 dark:text-blue-300">
                {isNl ? "GDPR Conform" : "GDPR Compliant"}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-full border border-purple-200 dark:border-purple-800">
              <BadgeCheck className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span className="text-[10px] font-medium text-purple-700 dark:text-purple-300">
                {isNl ? "Actief Gemodereerd" : "Actively Moderated"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

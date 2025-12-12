"use client";

import { OptimizedLink as Link } from "@/components/ui/optimized-link";
import { BadgeCheck, GraduationCap, Users, Lock, Shield } from "lucide-react";
import { NewsletterForm } from "@/components/forms";
import { useTranslations } from "next-intl";

interface FooterProps {
  locale: string;
}

// Category slugs mapped to translation keys
const CATEGORY_KEYS = [
  { slug: "veterinary", icon: "🩺", key: "veterinary" },
  { slug: "grooming", icon: "✂️", key: "grooming" },
  { slug: "pet-store", icon: "🛒", key: "petStore" },
  { slug: "dog-training", icon: "🐕", key: "dogTraining" },
  { slug: "pet-hotel", icon: "🏨", key: "petHotel" },
  { slug: "dog-walking", icon: "🦮", key: "dogWalking" },
] as const;

const CITIES = [
  { slug: "amsterdam", name: "Amsterdam" },
  { slug: "rotterdam", name: "Rotterdam" },
  { slug: "utrecht", name: "Utrecht" },
  { slug: "den-haag", name: "Den Haag" },
];

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tCategories = useTranslations("categories");

  return (
    <footer className="border-t border-border bg-muted/50">
      {/* Newsletter Section */}
      <div className="bg-cpCoral/5 dark:bg-cpCoral/10 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {t("stayUpdated")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("newsletterDescription")}
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
              {t("tagline")}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("categories")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CATEGORY_KEYS.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${locale}/netherlands/c/${cat.slug}`}
                    className="hover:text-cpCoral transition-colors"
                  >
                    {cat.icon} {tCategories(cat.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("popularCities")}
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
                  → {t("allCities")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Lists */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("topLists")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href={`/${locale}/netherlands/top/veterinary`}
                  className="hover:text-cpCoral transition-colors"
                >
                  🏆 Top 10 {tCategories("veterinary")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/netherlands/best/grooming`}
                  className="hover:text-cpCoral transition-colors"
                >
                  ⭐ {tCategories("grooming")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/netherlands/amsterdam/best/veterinary`}
                  className="hover:text-cpCoral transition-colors"
                >
                  🩺 Amsterdam
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/netherlands/top/pet-store`}
                  className="hover:text-cpCoral transition-colors"
                >
                  🛒 Top 10 {tCategories("petStore")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Directory */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("company")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}`} className="hover:text-cpCoral transition-colors">
                  🏠 {tCommon("home")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/search`} className="hover:text-cpCoral transition-colors">
                  🔍 {tCommon("search")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/${t("guideUrl")}`} className="hover:text-cpCoral transition-colors">
                  📚 {t("petGuide")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-cpCoral transition-colors">
                  📝 {tCommon("blog")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/for-businesses`} className="hover:text-cpCoral transition-colors">
                  💼 {tCommon("forBusinesses")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-cpCoral transition-colors">
                  ℹ️ {tCommon("about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-cpCoral transition-colors">
                  ✉️ {tCommon("contact")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/dog-food-calculator`} className="hover:text-cpCoral transition-colors">
                  🧮 {t("dogFoodCalculator")}
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
              {t("privacyPolicy")}
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href={`/${locale}/cookie-policy`} className="hover:text-cpCoral transition-colors">
              {t("cookiePolicy")}
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href={`/${locale}/terms`} className="hover:text-cpCoral transition-colors">
              {t("terms")}
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
              <span className="text-xs">{t("verifiedBusinesses")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span className="text-xs">{t("expertReviews")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4 text-cpCoral" />
              <span className="text-xs">{t("communityDriven")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Lock className="w-4 h-4 text-cpAmber" />
              <span className="text-xs">{t("privacySecurity")}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800">
              <Shield className="w-3 h-3 text-green-600 dark:text-green-400" />
              <span className="text-[10px] font-medium text-green-700 dark:text-green-300">
                {t("sslSecured")}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
              <Lock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span className="text-[10px] font-medium text-blue-700 dark:text-blue-300">
                {t("gdprCompliant")}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-full border border-purple-200 dark:border-purple-800">
              <BadgeCheck className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span className="text-[10px] font-medium text-purple-700 dark:text-purple-300">
                {t("activelyModerated")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

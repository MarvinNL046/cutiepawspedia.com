import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DogFoodCalculator } from "@/components/tools/DogFoodCalculator";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dogFoodCalculator" });

  const titles: Record<string, string> = {
    nl: "Hondenvoer Calculator - Bereken Dagelijkse Portie | CutiePawsPedia",
    en: "Dog Food Calculator - Calculate Daily Portion | CutiePawsPedia",
    de: "Hundefutter Rechner - Tägliche Portion Berechnen | CutiePawsPedia",
    fr: "Calculateur Nourriture Chien - Portion Quotidienne | CutiePawsPedia",
  };

  const descriptions: Record<string, string> = {
    nl: "Gratis hondenvoer calculator. Bereken hoeveel voer je hond per dag nodig heeft op basis van gewicht, leeftijd en activiteit. Wetenschappelijk onderbouwd.",
    en: "Free dog food calculator. Calculate how much food your dog needs per day based on weight, age and activity level. Scientifically backed formulas.",
    de: "Kostenloser Hundefutter Rechner. Berechnen Sie, wie viel Futter Ihr Hund pro Tag braucht basierend auf Gewicht, Alter und Aktivität. Wissenschaftlich fundiert.",
    fr: "Calculateur gratuit de nourriture pour chien. Calculez la quantité de nourriture dont votre chien a besoin par jour selon son poids, âge et activité.",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `/${locale}/tools/dog-food-calculator`,
      languages: {
        nl: "/nl/tools/dog-food-calculator",
        en: "/en/tools/dog-food-calculator",
        de: "/de/tools/dog-food-calculator",
        fr: "/fr/tools/dog-food-calculator",
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      type: "website",
    },
  };
}

export default async function DogFoodCalculatorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "dogFoodCalculator" });

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("title"),
    description: t("description"),
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    creator: {
      "@type": "Organization",
      name: "CutiePawsPedia",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
        <div className="container mx-auto">
          <DogFoodCalculator />
        </div>
      </main>
    </>
  );
}

/**
 * Annual Awards Page - CutiePawsPedia Pet Service Awards
 *
 * CACHING STRATEGY: Force Static with daily revalidation
 * - Awards data changes rarely (based on ratings at time of page generation)
 * - revalidate: 86400 (24 hours) for updates
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  Trophy,
  Medal,
  Award,
  Star,
  MapPin,
  ExternalLink,
  Share2,
  CheckCircle2,
  Sparkles,
  Crown,
  Users,
  TrendingUp,
  Calendar,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { locales, type Locale } from "@/i18n/config";
import {
  getAllAwardsData,
  getAwardCountries,
  type AwardWinner,
  type AwardCategory,
} from "@/db/queries";
import { buildWebPageJsonLd, buildItemListJsonLd } from "@/lib/seo/jsonld";
import { getBaseUrl } from "@/lib/seo/url-helpers";

// Static page with daily revalidation
export const dynamic = "force-static";
export const revalidate = 86400;

interface AwardsPageProps {
  params: Promise<{ locale: string; year: string }>;
}

// Only generate for current year and supported locales
export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const years = [currentYear.toString()];

  const params: Array<{ locale: string; year: string }> = [];

  for (const locale of locales) {
    for (const year of years) {
      params.push({ locale, year });
    }
  }

  return params;
}

// Translations for awards page
const translations = {
  en: {
    metaTitle: "CutiePawsPedia Awards {year} | Best Pet Services",
    metaDescription:
      "Discover the best pet services of {year}. Our annual awards recognize excellence in veterinary care, grooming, pet shops, training, and more.",
    badge: "Annual Awards",
    title: "CutiePawsPedia Awards",
    titleYear: "{year}",
    subtitle: "Celebrating Excellence in Pet Services",
    intro:
      "We are proud to present the CutiePawsPedia Awards {year}, recognizing the best pet service providers across our platform. These awards are based on verified customer reviews, ratings, and overall service quality.",
    winner: "Winner",
    runnerUp: "Runner-up",
    secondRunnerUp: "2nd Runner-up",
    viewProfile: "View Profile",
    rating: "Rating",
    reviews: "reviews",
    verified: "Verified",
    premium: "Premium",
    newcomerOfYear: "Newcomer of the Year",
    newcomerDesc:
      "The best new business that joined CutiePawsPedia this year with outstanding performance.",
    peoplesChoice: "People's Choice Award",
    peoplesChoiceDesc:
      "The most beloved pet service based on community votes and reviews.",
    methodology: "Methodology",
    methodologyTitle: "How Winners Are Selected",
    methodologyIntro:
      "Our awards are determined through a rigorous, data-driven process:",
    methodologyItems: [
      "Only businesses with verified customer reviews are considered",
      "Minimum rating threshold of 3.5 stars (4.0 for special awards)",
      "Review count and consistency are factored into rankings",
      "Winners are selected from each category per country",
      "Special awards require exceptional performance metrics",
    ],
    shareAwards: "Share These Awards",
    shareText: "Check out the CutiePawsPedia Awards {year}!",
    noWinners: "No winners yet in this category",
    awardsIn: "Awards in",
    categoryAwards: "{category} Awards",
    countries: {
      nederland: "Netherlands",
      belgie: "Belgium",
      duitsland: "Germany",
    },
    categories: {
      veterinary: "Best Veterinary Practice",
      grooming: "Best Grooming Salon",
      "pet-shop": "Best Pet Store",
      "dog-training": "Best Dog Training",
      "pet-hotel": "Best Pet Hotel",
      "dog-walking": "Best Dog Walking Service",
    },
  },
  nl: {
    metaTitle: "CutiePawsPedia Awards {year} | Beste Huisdierservices",
    metaDescription:
      "Ontdek de beste huisdierservices van {year}. Onze jaarlijkse awards erkennen excellentie in dierenzorg, trimmen, dierenwinkels, training en meer.",
    badge: "Jaarlijkse Awards",
    title: "CutiePawsPedia Awards",
    titleYear: "{year}",
    subtitle: "Excellentie in Huisdierservices Vieren",
    intro:
      "We presenteren met trots de CutiePawsPedia Awards {year}, waarmee we de beste huisdierservice-aanbieders op ons platform erkennen. Deze awards zijn gebaseerd op geverifieerde klantbeoordelingen, ratings en algemene servicekwaliteit.",
    winner: "Winnaar",
    runnerUp: "Tweede Plaats",
    secondRunnerUp: "Derde Plaats",
    viewProfile: "Bekijk Profiel",
    rating: "Beoordeling",
    reviews: "reviews",
    verified: "Geverifieerd",
    premium: "Premium",
    newcomerOfYear: "Nieuwkomer van het Jaar",
    newcomerDesc:
      "Het beste nieuwe bedrijf dat dit jaar bij CutiePawsPedia is gekomen met uitstekende prestaties.",
    peoplesChoice: "Publieksprijs",
    peoplesChoiceDesc:
      "De meest geliefde huisdierservice op basis van community-stemmen en reviews.",
    methodology: "Methodologie",
    methodologyTitle: "Hoe Winnaars Worden Geselecteerd",
    methodologyIntro:
      "Onze awards worden bepaald door een rigoureus, data-gedreven proces:",
    methodologyItems: [
      "Alleen bedrijven met geverifieerde klantbeoordelingen worden overwogen",
      "Minimale beoordelingsdrempel van 3,5 sterren (4,0 voor speciale awards)",
      "Aantal reviews en consistentie worden meegewogen in de rankings",
      "Winnaars worden per categorie per land geselecteerd",
      "Speciale awards vereisen uitzonderlijke prestatiemetrics",
    ],
    shareAwards: "Deel Deze Awards",
    shareText: "Bekijk de CutiePawsPedia Awards {year}!",
    noWinners: "Nog geen winnaars in deze categorie",
    awardsIn: "Awards in",
    categoryAwards: "{category} Awards",
    countries: {
      nederland: "Nederland",
      belgie: "Belgie",
      duitsland: "Duitsland",
    },
    categories: {
      veterinary: "Beste Dierenartspraktijk",
      grooming: "Beste Trimsalon",
      "pet-shop": "Beste Dierenwinkel",
      "dog-training": "Beste Hondentraining",
      "pet-hotel": "Beste Dierenpension",
      "dog-walking": "Beste Hondenuitlaatservice",
    },
  },
  de: {
    metaTitle: "CutiePawsPedia Awards {year} | Beste Tierdienstleistungen",
    metaDescription:
      "Entdecken Sie die besten Tierdienstleistungen des Jahres {year}. Unsere jahrlichen Awards wurden fur Exzellenz in Tierpflege, Grooming, Tierhandlungen, Training und mehr.",
    badge: "Jahrliche Awards",
    title: "CutiePawsPedia Awards",
    titleYear: "{year}",
    subtitle: "Exzellenz in Tierdienstleistungen Feiern",
    intro:
      "Wir prasentieren stolz die CutiePawsPedia Awards {year}, mit denen wir die besten Tierdienstleister auf unserer Plattform auszeichnen. Diese Awards basieren auf verifizierten Kundenbewertungen, Ratings und allgemeiner Servicequalitat.",
    winner: "Gewinner",
    runnerUp: "Zweiter Platz",
    secondRunnerUp: "Dritter Platz",
    viewProfile: "Profil Ansehen",
    rating: "Bewertung",
    reviews: "Bewertungen",
    verified: "Verifiziert",
    premium: "Premium",
    newcomerOfYear: "Newcomer des Jahres",
    newcomerDesc:
      "Das beste neue Unternehmen, das dieses Jahr mit herausragender Leistung zu CutiePawsPedia gekommen ist.",
    peoplesChoice: "Publikumspreis",
    peoplesChoiceDesc:
      "Der beliebteste Tierdienst basierend auf Community-Stimmen und Bewertungen.",
    methodology: "Methodik",
    methodologyTitle: "Wie Gewinner Ausgewahlt Werden",
    methodologyIntro:
      "Unsere Awards werden durch einen rigorosen, datengetriebenen Prozess bestimmt:",
    methodologyItems: [
      "Nur Unternehmen mit verifizierten Kundenbewertungen werden berucksichtigt",
      "Mindestbewertungsschwelle von 3,5 Sternen (4,0 fur Sonderauszeichnungen)",
      "Anzahl der Bewertungen und Konsistenz werden in die Rankings einbezogen",
      "Gewinner werden pro Kategorie pro Land ausgewahlt",
      "Sonderauszeichnungen erfordern ausergewohnliche Leistungsmetriken",
    ],
    shareAwards: "Diese Awards Teilen",
    shareText: "Schauen Sie sich die CutiePawsPedia Awards {year} an!",
    noWinners: "Noch keine Gewinner in dieser Kategorie",
    awardsIn: "Awards in",
    categoryAwards: "{category} Awards",
    countries: {
      nederland: "Niederlande",
      belgie: "Belgien",
      duitsland: "Deutschland",
    },
    categories: {
      veterinary: "Beste Tierarztpraxis",
      grooming: "Bester Grooming-Salon",
      "pet-shop": "Beste Tierhandlung",
      "dog-training": "Beste Hundetraining",
      "pet-hotel": "Bestes Tierhotel",
      "dog-walking": "Bester Hundeausfahrservice",
    },
  },
  fr: {
    metaTitle: "CutiePawsPedia Awards {year} | Meilleurs Services pour Animaux",
    metaDescription:
      "Decouvrez les meilleurs services pour animaux de {year}. Nos prix annuels reconnaissent l'excellence dans les soins veterinaires, le toilettage, les animaleries, la formation et plus encore.",
    badge: "Prix Annuels",
    title: "CutiePawsPedia Awards",
    titleYear: "{year}",
    subtitle: "Celebrer l'Excellence dans les Services pour Animaux",
    intro:
      "Nous sommes fiers de presenter les CutiePawsPedia Awards {year}, reconnaissant les meilleurs prestataires de services pour animaux sur notre plateforme. Ces prix sont bases sur des avis clients verifies, des notes et la qualite globale du service.",
    winner: "Gagnant",
    runnerUp: "Deuxieme Place",
    secondRunnerUp: "Troisieme Place",
    viewProfile: "Voir le Profil",
    rating: "Note",
    reviews: "avis",
    verified: "Verifie",
    premium: "Premium",
    newcomerOfYear: "Nouveau Venu de l'Annee",
    newcomerDesc:
      "La meilleure nouvelle entreprise qui a rejoint CutiePawsPedia cette annee avec des performances exceptionnelles.",
    peoplesChoice: "Prix du Public",
    peoplesChoiceDesc:
      "Le service pour animaux le plus aime base sur les votes et les avis de la communaute.",
    methodology: "Methodologie",
    methodologyTitle: "Comment les Gagnants sont Selectionnes",
    methodologyIntro:
      "Nos prix sont determines par un processus rigoureux, axe sur les donnees:",
    methodologyItems: [
      "Seules les entreprises avec des avis clients verifies sont prises en compte",
      "Seuil de notation minimum de 3,5 etoiles (4,0 pour les prix speciaux)",
      "Le nombre d'avis et la coherence sont pris en compte dans les classements",
      "Les gagnants sont selectionnes par categorie par pays",
      "Les prix speciaux necessitent des metriques de performance exceptionnelles",
    ],
    shareAwards: "Partager ces Prix",
    shareText: "Decouvrez les CutiePawsPedia Awards {year}!",
    noWinners: "Pas encore de gagnants dans cette categorie",
    awardsIn: "Prix en",
    categoryAwards: "Prix {category}",
    countries: {
      nederland: "Pays-Bas",
      belgie: "Belgique",
      duitsland: "Allemagne",
    },
    categories: {
      veterinary: "Meilleur Cabinet Veterinaire",
      grooming: "Meilleur Salon de Toilettage",
      "pet-shop": "Meilleure Animalerie",
      "dog-training": "Meilleur Dressage de Chiens",
      "pet-hotel": "Meilleur Hotel pour Animaux",
      "dog-walking": "Meilleur Service de Promenade de Chiens",
    },
  },
};

export async function generateMetadata({
  params,
}: AwardsPageProps): Promise<Metadata> {
  const { locale, year } = await params;
  setRequestLocale(locale);
  const yearNum = parseInt(year, 10);
  const currentYear = new Date().getFullYear();

  if (isNaN(yearNum) || yearNum < 2024 || yearNum > currentYear) {
    return { title: "Awards Not Found" };
  }

  const t = translations[locale as keyof typeof translations] || translations.en;

  const title = t.metaTitle.replace("{year}", year);
  const description = t.metaDescription.replace("{year}", year);
  const url = `${getBaseUrl()}/${locale}/awards/${year}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: [
        {
          url: `${getBaseUrl()}/images/awards-og-${year}.png`,
          width: 1200,
          height: 630,
          alt: `CutiePawsPedia Awards ${year}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${getBaseUrl()}/${l}/awards/${year}`])
      ),
    },
  };
}

// Medal component for winner positions
function MedalIcon({
  position,
  className = "",
}: {
  position: number;
  className?: string;
}) {
  if (position === 1) {
    return (
      <div
        className={`w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg ${className}`}
      >
        <Trophy className="w-6 h-6 text-yellow-900" />
      </div>
    );
  }
  if (position === 2) {
    return (
      <div
        className={`w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center shadow-md ${className}`}
      >
        <Medal className="w-5 h-5 text-gray-700" />
      </div>
    );
  }
  return (
    <div
      className={`w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 flex items-center justify-center shadow-md ${className}`}
    >
      <Award className="w-4 h-4 text-amber-200" />
    </div>
  );
}

// Winner card component
function WinnerCard({
  winner,
  position,
  locale,
  t,
}: {
  winner: AwardWinner;
  position: number;
  locale: string;
  t: (typeof translations)["en"];
}) {
  const positionLabels = [t.winner, t.runnerUp, t.secondRunnerUp];
  const positionLabel = positionLabels[position - 1] || "";

  const placeUrl = `/${locale}/${winner.countrySlug}/${winner.citySlug}/${winner.categorySlug}/${winner.slug}`;

  return (
    <div
      className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
        position === 1
          ? "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950/30 dark:via-amber-950/20 dark:to-orange-950/20 border-yellow-300 dark:border-yellow-700 shadow-lg"
          : position === 2
            ? "bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900/50 dark:to-slate-800/30 border-gray-300 dark:border-gray-600"
            : "bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-300/50 dark:border-amber-700/50"
      }`}
    >
      {/* Position Badge */}
      <div className="absolute -top-3 -left-3">
        <MedalIcon position={position} />
      </div>

      {/* Position Label */}
      <div className="mb-4 pt-2">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            position === 1
              ? "text-yellow-700 dark:text-yellow-400"
              : position === 2
                ? "text-gray-600 dark:text-gray-400"
                : "text-amber-700 dark:text-amber-500"
          }`}
        >
          {positionLabel}
        </span>
      </div>

      {/* Business Name */}
      <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
        {winner.name}
      </h3>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-muted-foreground dark:text-cpCream/70 mb-3">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">{winner.cityName}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20">
          <Star className="w-4 h-4 text-cpCoral fill-cpCoral" />
          <span className="font-semibold text-cpCoral">
            {winner.avgRating ? parseFloat(winner.avgRating).toFixed(1) : "-"}
          </span>
        </div>
        <span className="text-sm text-muted-foreground dark:text-cpCream/60">
          ({winner.reviewCount} {t.reviews})
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {winner.isVerified && (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {t.verified}
          </Badge>
        )}
        {winner.isPremium && (
          <Badge
            variant="secondary"
            className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            {t.premium}
          </Badge>
        )}
      </div>

      {/* View Profile Button */}
      <Link href={placeUrl}>
        <Button
          variant={position === 1 ? "default" : "outline"}
          className={
            position === 1
              ? "w-full bg-cpCoral hover:bg-cpCoral/90 text-white"
              : "w-full"
          }
        >
          {t.viewProfile}
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}

// Category Award Section
function CategoryAwardSection({
  awardCategory,
  locale,
  t,
}: {
  awardCategory: AwardCategory;
  locale: string;
  t: (typeof translations)["en"];
}) {
  const categoryName =
    t.categories[awardCategory.categorySlug as keyof typeof t.categories] ||
    awardCategory.categoryLabelKey;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-cpCoral" />
        </div>
        <h3 className="text-2xl font-bold text-foreground dark:text-cpCream">
          {categoryName}
        </h3>
      </div>

      {awardCategory.winners.length === 0 ? (
        <p className="text-muted-foreground dark:text-cpCream/70 italic">
          {t.noWinners}
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {awardCategory.winners.map((winner, index) => (
            <WinnerCard
              key={winner.id}
              winner={winner}
              position={index + 1}
              locale={locale}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Special Award Card (Newcomer, People's Choice)
function SpecialAwardCard({
  title,
  description,
  winner,
  locale,
  t,
  icon: Icon,
}: {
  title: string;
  description: string;
  winner: AwardWinner | null;
  locale: string;
  t: (typeof translations)["en"];
  icon: typeof Crown;
}) {
  if (!winner) return null;

  const placeUrl = `/${locale}/${winner.countrySlug}/${winner.citySlug}/${winner.categorySlug}/${winner.slug}`;

  return (
    <Card className="overflow-hidden border-2 border-cpCoral/30 dark:border-cpCoral/50 bg-gradient-to-br from-cpCoral/5 to-cpAmber/5 dark:from-cpCoral/10 dark:to-cpAmber/10">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cpCoral to-cpAmber flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-foreground dark:text-cpCream">
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-xl bg-white/50 dark:bg-cpSurface/50">
          <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
            {winner.name}
          </h4>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5 text-muted-foreground dark:text-cpCream/70">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{winner.cityName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-cpCoral fill-cpCoral" />
              <span className="font-semibold text-cpCoral">
                {winner.avgRating ? parseFloat(winner.avgRating).toFixed(1) : "-"}
              </span>
              <span className="text-sm text-muted-foreground dark:text-cpCream/60">
                ({winner.reviewCount})
              </span>
            </div>
          </div>
          <Link href={placeUrl}>
            <Button className="w-full bg-cpCoral hover:bg-cpCoral/90 text-white">
              {t.viewProfile}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function AwardsPage({ params }: AwardsPageProps) {
  const { locale, year } = await params;
  setRequestLocale(locale);
  const yearNum = parseInt(year, 10);
  const currentYear = new Date().getFullYear();

  // Validate year
  if (isNaN(yearNum) || yearNum < 2024 || yearNum > currentYear) {
    notFound();
  }

  const t = translations[locale as keyof typeof translations] || translations.en;

  // Fetch awards data
  const { byCountry, newcomerOfYear, peoplesChoice } =
    await getAllAwardsData(yearNum);

  const pageUrl = `${getBaseUrl()}/${locale}/awards/${year}`;

  // Build JSON-LD
  const webPageJsonLd = buildWebPageJsonLd({
    title: t.metaTitle.replace("{year}", year),
    description: t.metaDescription.replace("{year}", year),
    url: pageUrl,
    locale,
  });

  // Build ItemList JSON-LD for winners
  const allWinners: Array<{ name: string; url: string; position: number }> = [];
  let position = 1;
  Object.values(byCountry).forEach((categories) => {
    categories.forEach((cat) => {
      cat.winners.forEach((winner) => {
        allWinners.push({
          name: winner.name,
          url: `${getBaseUrl()}/${locale}/${winner.countrySlug}/${winner.citySlug}/${winner.categorySlug}/${winner.slug}`,
          position: position++,
        });
      });
    });
  });

  const itemListJsonLd =
    allWinners.length > 0
      ? buildItemListJsonLd({
          url: pageUrl,
          name: `CutiePawsPedia Awards ${year} Winners`,
          description: t.metaDescription.replace("{year}", year),
          items: allWinners,
        })
      : null;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-b from-cpCream to-white dark:from-cpCharcoal dark:to-cpSurface">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-cpCoral/10 via-cpAmber/5 to-background dark:from-cpCoral/20 dark:via-cpAmber/10 dark:to-cpCharcoal py-16 md:py-24">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-cpCoral/20 rounded-full blur-3xl" />

          <div className="container mx-auto max-w-6xl px-4 relative">
            <div className="text-center">
              <Badge
                variant="secondary"
                className="mb-6 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700 px-4 py-2"
              >
                <Trophy className="w-4 h-4 mr-2" />
                {t.badge}
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground dark:text-cpCream mb-4">
                {t.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500">
                  {year}
                </span>
              </h1>

              <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-6">
                {t.subtitle}
              </p>

              <p className="max-w-3xl mx-auto text-muted-foreground dark:text-cpCream/70">
                {t.intro.replace("{year}", year)}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-foreground dark:text-cpCream">
                    {Object.values(byCountry).reduce(
                      (acc, cats) =>
                        acc +
                        cats.reduce((a, c) => a + Math.min(c.winners.length, 1), 0),
                      0
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-cpCream/60">
                    Winners
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                    <Star className="w-7 h-7 text-cpCoral" />
                  </div>
                  <div className="text-2xl font-bold text-foreground dark:text-cpCream">
                    {Object.values(byCountry).reduce(
                      (acc, cats) => acc + cats.length,
                      0
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-cpCream/60">
                    Categories
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-foreground dark:text-cpCream">
                    {Object.keys(byCountry).length}
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-cpCream/60">
                    Countries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Awards Section */}
        {(newcomerOfYear || peoplesChoice) && (
          <section className="container mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-8 text-center">
              Special Awards
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <SpecialAwardCard
                title={t.newcomerOfYear}
                description={t.newcomerDesc}
                winner={newcomerOfYear}
                locale={locale}
                t={t}
                icon={Sparkles}
              />
              <SpecialAwardCard
                title={t.peoplesChoice}
                description={t.peoplesChoiceDesc}
                winner={peoplesChoice}
                locale={locale}
                t={t}
                icon={Users}
              />
            </div>
          </section>
        )}

        {/* Awards by Country */}
        <section className="container mx-auto max-w-6xl px-4 py-12">
          {Object.entries(byCountry).map(([countrySlug, categories]) => {
            const countryName =
              t.countries[countrySlug as keyof typeof t.countries] || countrySlug;

            return (
              <div key={countrySlug} className="mb-16">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border dark:border-cpAmber/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cpCoral to-cpAmber flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground dark:text-cpCream">
                    {t.awardsIn} {countryName}
                  </h2>
                </div>

                {categories.map((awardCategory) => (
                  <CategoryAwardSection
                    key={`${countrySlug}-${awardCategory.categorySlug}`}
                    awardCategory={awardCategory}
                    locale={locale}
                    t={t}
                  />
                ))}
              </div>
            );
          })}

          {Object.keys(byCountry).length === 0 && (
            <div className="text-center py-16">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30 dark:text-cpCream/20" />
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-2">
                {t.noWinners}
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/70">
                Check back soon for the {year} award winners!
              </p>
            </div>
          )}
        </section>

        {/* Methodology Section */}
        <section className="bg-muted/50 dark:bg-cpSurface/30 py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Info className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-2">
                {t.methodologyTitle}
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/70">
                {t.methodologyIntro}
              </p>
            </div>

            <Card className="border-border dark:border-cpAmber/20">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {t.methodologyItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cpCoral mt-0.5 shrink-0" />
                      <span className="text-foreground dark:text-cpCream/90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Share Section */}
        <section className="container mx-auto max-w-4xl px-4 py-12">
          <Card className="border-border dark:border-cpAmber/20 bg-gradient-to-r from-cpCoral/5 to-cpAmber/5 dark:from-cpCoral/10 dark:to-cpAmber/10">
            <CardContent className="pt-6 text-center">
              <Share2 className="w-10 h-10 mx-auto mb-4 text-cpCoral" />
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
                {t.shareAwards}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  className="border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2]/10"
                  asChild
                >
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(t.shareText.replace("{year}", year))}&url=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter/X
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#4267B2] text-[#4267B2] hover:bg-[#4267B2]/10"
                  asChild
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10"
                  asChild
                >
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}

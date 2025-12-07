/**
 * For Businesses Page - Subscription pricing and signup
 *
 * CACHING STRATEGY: Force Static
 * - Pricing/features content is relatively static
 * - revalidate: 86400 (24 hours) for pricing updates
 * - Optimal performance for conversion-focused page
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
  BarChart3,
  Shield,
  Building2,
  Search,
  ArrowRight,
  Mail,
  Crown,
  Sparkles,
  Camera,
  Globe,
  Phone,
  Heart,
} from "lucide-react";
import { getActivePlans, formatPlanPrice, FEATURE_COMPARISONS, type PlanDefinition } from "@/lib/plans/config";

// Static page with daily revalidation - pricing rarely changes
export const dynamic = "force-static";
export const revalidate = 86400;

interface ForBusinessesPageProps {
  params: Promise<{ locale: string }>;
}

// Translations
const translations = {
  en: {
    badge: "For Pet Businesses",
    title: "Grow Your Pet Business with CutiePawsPedia",
    subtitle: "Connect with pet owners actively searching for services like yours. Choose a plan that fits your needs.",

    // How it works
    howItWorksTitle: "How It Works",
    howItWorksSteps: [
      { title: "Claim Your Listing", description: "Find your business and claim it for free. Start with our Free plan." },
      { title: "Choose Your Plan", description: "Upgrade anytime to unlock photos, contact info, and better visibility." },
      { title: "Grow Your Business", description: "Get discovered by pet owners and build trust with reviews." },
    ],

    // Pricing
    pricingTitle: "Simple, Transparent Pricing",
    pricingSubtitle: "Choose the plan that's right for your business. Upgrade or downgrade anytime.",
    monthlyLabel: "Monthly",
    yearlyLabel: "Yearly",
    yearlySave: "Save 2 months",
    perMonth: "/month",
    perYear: "/year",
    popular: "Most Popular",
    getStarted: "Get Started",
    currentPlan: "Current Plan",
    comingSoon: "Coming Soon",

    // Review notice
    reviewNotice: "All plans include reviews",
    reviewNoticeDesc: "Receive, display, and respond to customer reviews on any plan - even Free!",

    // Features
    featuresTitle: "Compare Plans",
    included: "Included",
    notIncluded: "Not included",

    // Benefits
    benefitsTitle: "Why Pet Businesses Choose Us",
    benefits: [
      { icon: "users", title: "Targeted Audience", description: "Reach pet owners actively searching for services in their area" },
      { icon: "trending", title: "Grow Your Business", description: "Higher plans get priority placement in search results" },
      { icon: "shield", title: "Build Trust", description: "Showcase authentic customer reviews and ratings" },
      { icon: "chart", title: "Track Performance", description: "See how many people view your listing and engage with it" },
    ],

    // CTA
    ctaTitle: "Ready to Grow Your Business?",
    ctaSubtitle: "Join thousands of pet businesses already on CutiePawsPedia",
    ctaButton: "Claim Your Business",
    ctaHelp: "Need help? Contact us at",

    // Footer
    enterpriseTitle: "Enterprise & Multi-Location",
    enterpriseDescription: "Managing multiple locations or need custom solutions? Let's talk.",
    enterpriseButton: "Contact Sales",
  },
  nl: {
    badge: "Voor Bedrijven",
    title: "Laat Je Dierenbedrijf Groeien met CutiePawsPedia",
    subtitle: "Bereik huisdiereigenaren die actief zoeken naar diensten zoals de jouwe. Kies een abonnement dat bij je past.",

    howItWorksTitle: "Hoe Het Werkt",
    howItWorksSteps: [
      { title: "Claim Je Vermelding", description: "Vind je bedrijf en claim het gratis. Begin met ons Gratis abonnement." },
      { title: "Kies Je Abonnement", description: "Upgrade wanneer je wilt voor foto's, contactgegevens en betere zichtbaarheid." },
      { title: "Groei Je Bedrijf", description: "Word gevonden door huisdiereigenaren en bouw vertrouwen met reviews." },
    ],

    pricingTitle: "Eenvoudige, Transparante Prijzen",
    pricingSubtitle: "Kies het abonnement dat bij je bedrijf past. Upgrade of downgrade wanneer je wilt.",
    monthlyLabel: "Maandelijks",
    yearlyLabel: "Jaarlijks",
    yearlySave: "Bespaar 2 maanden",
    perMonth: "/maand",
    perYear: "/jaar",
    popular: "Meest Populair",
    getStarted: "Aan de slag",
    currentPlan: "Huidig Abonnement",
    comingSoon: "Binnenkort",

    reviewNotice: "Alle abonnementen inclusief reviews",
    reviewNoticeDesc: "Ontvang, toon en reageer op klantreviews met elk abonnement - zelfs Gratis!",

    featuresTitle: "Vergelijk Abonnementen",
    included: "Inbegrepen",
    notIncluded: "Niet inbegrepen",

    benefitsTitle: "Waarom Dierenbedrijven Voor Ons Kiezen",
    benefits: [
      { icon: "users", title: "Gericht Publiek", description: "Bereik huisdiereigenaren die actief zoeken naar diensten in hun buurt" },
      { icon: "trending", title: "Groei Je Bedrijf", description: "Hogere abonnementen krijgen prioriteit in zoekresultaten" },
      { icon: "shield", title: "Bouw Vertrouwen", description: "Toon authentieke klantbeoordelingen en ratings" },
      { icon: "chart", title: "Volg Prestaties", description: "Zie hoeveel mensen je vermelding bekijken en ermee interacteren" },
    ],

    ctaTitle: "Klaar Om Je Bedrijf Te Laten Groeien?",
    ctaSubtitle: "Sluit je aan bij duizenden dierenbedrijven op CutiePawsPedia",
    ctaButton: "Claim Je Bedrijf",
    ctaHelp: "Hulp nodig? Neem contact op via",

    enterpriseTitle: "Zakelijk & Meerdere Locaties",
    enterpriseDescription: "Beheer je meerdere locaties of heb je maatwerkoplossingen nodig? Laten we praten.",
    enterpriseButton: "Neem Contact Op",
  },
  de: {
    badge: "Für Unternehmen",
    title: "Lassen Sie Ihr Tiergeschäft mit CutiePawsPedia wachsen",
    subtitle: "Erreichen Sie Tierbesitzer, die aktiv nach Dienstleistungen suchen. Wählen Sie einen passenden Plan.",

    howItWorksTitle: "So Funktioniert Es",
    howItWorksSteps: [
      { title: "Eintrag Beanspruchen", description: "Finden Sie Ihr Unternehmen und beanspruchen Sie es kostenlos." },
      { title: "Plan Wählen", description: "Upgraden Sie für Fotos, Kontaktdaten und bessere Sichtbarkeit." },
      { title: "Geschäft Erweitern", description: "Werden Sie von Tierbesitzern gefunden und bauen Sie Vertrauen auf." },
    ],

    pricingTitle: "Einfache, Transparente Preise",
    pricingSubtitle: "Wählen Sie den richtigen Plan für Ihr Unternehmen. Jederzeit upgraden oder downgraden.",
    monthlyLabel: "Monatlich",
    yearlyLabel: "Jährlich",
    yearlySave: "2 Monate sparen",
    perMonth: "/Monat",
    perYear: "/Jahr",
    popular: "Am Beliebtesten",
    getStarted: "Loslegen",
    currentPlan: "Aktueller Plan",
    comingSoon: "Demnächst",

    reviewNotice: "Alle Pläne inkl. Bewertungen",
    reviewNoticeDesc: "Erhalten, anzeigen und beantworten Sie Kundenbewertungen mit jedem Plan - auch kostenlos!",

    featuresTitle: "Pläne Vergleichen",
    included: "Enthalten",
    notIncluded: "Nicht enthalten",

    benefitsTitle: "Warum Tierunternehmen Uns Wählen",
    benefits: [
      { icon: "users", title: "Zielgruppe", description: "Erreichen Sie Tierbesitzer, die aktiv nach Dienstleistungen suchen" },
      { icon: "trending", title: "Wachstum", description: "Höhere Pläne erhalten Priorität in Suchergebnissen" },
      { icon: "shield", title: "Vertrauen Aufbauen", description: "Zeigen Sie authentische Kundenbewertungen" },
      { icon: "chart", title: "Leistung Verfolgen", description: "Sehen Sie, wie viele Menschen Ihren Eintrag ansehen" },
    ],

    ctaTitle: "Bereit, Ihr Geschäft zu Erweitern?",
    ctaSubtitle: "Schließen Sie sich Tausenden von Tierunternehmen an",
    ctaButton: "Unternehmen Beanspruchen",
    ctaHelp: "Brauchen Sie Hilfe? Kontaktieren Sie uns unter",

    enterpriseTitle: "Enterprise & Mehrere Standorte",
    enterpriseDescription: "Verwalten Sie mehrere Standorte oder benötigen Sie individuelle Lösungen?",
    enterpriseButton: "Vertrieb Kontaktieren",
  },
};

const iconMap = {
  users: Users,
  trending: TrendingUp,
  shield: Shield,
  chart: BarChart3,
};

// Plan card styling based on plan key
function getPlanCardStyle(plan: PlanDefinition): string {
  if (plan.isPopular) {
    return "border-cpPink border-2 shadow-lg scale-105 relative z-10";
  }
  return "border-slate-200";
}

// Plan icon based on plan key
function getPlanIcon(planKey: string) {
  switch (planKey) {
    case "FREE":
      return Heart;
    case "STARTER":
      return Sparkles;
    case "PRO":
      return Crown;
    case "ELITE":
      return Star;
    default:
      return Heart;
  }
}

export default async function ForBusinessesPage({ params }: ForBusinessesPageProps) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const isNl = locale === "nl";

  // Get active plans from config
  const plans = getActivePlans();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-cpPink/10 text-cpPink border-cpPink/20">
            <Building2 className="h-3.5 w-3.5 mr-1" />
            {t.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-cpDark dark:text-white mb-6">
            {t.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-cpPink hover:bg-cpPink/90">
              <Link href={`/${locale}/onboarding/business`}>
                <ArrowRight className="h-4 w-4 mr-2" />
                {t.getStarted}
              </Link>
            </Button>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-cpDark dark:text-white text-center mb-10">{t.howItWorksTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-cpPink text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-cpDark dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Notice - Important callout */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="flex items-center gap-4 py-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center shrink-0">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">{t.reviewNotice}</h3>
                <p className="text-sm text-green-700 dark:text-green-300">{t.reviewNoticeDesc}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-cpDark dark:text-white mb-2">{t.pricingTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400">{t.pricingSubtitle}</p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-start">
            {plans.map((plan) => {
              const PlanIcon = getPlanIcon(plan.key);
              const monthlyPrice = formatPlanPrice(plan.monthlyPriceCents, locale);
              const yearlyPrice = plan.yearlyPriceCents
                ? formatPlanPrice(plan.yearlyPriceCents, locale)
                : null;
              const planName = isNl ? plan.nameNl : plan.name;
              const planDescription = isNl ? plan.descriptionNl : plan.description;

              return (
                <Card key={plan.key} className={`relative ${getPlanCardStyle(plan)}`}>
                  {/* Popular badge */}
                  {plan.isPopular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cpPink">
                      <Star className="h-3 w-3 mr-1" />
                      {t.popular}
                    </Badge>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        plan.isPopular ? "bg-cpPink/10" : "bg-slate-100 dark:bg-slate-700"
                      }`}>
                        <PlanIcon className={`h-4 w-4 ${
                          plan.isPopular ? "text-cpPink" : "text-slate-600 dark:text-slate-300"
                        }`} />
                      </div>
                      <CardTitle className="text-xl">{planName}</CardTitle>
                    </div>
                    <CardDescription className="min-h-[40px]">{planDescription}</CardDescription>

                    {/* Pricing */}
                    <div className="mt-4 space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-cpDark dark:text-white">
                          {monthlyPrice}
                        </span>
                        {plan.monthlyPriceCents > 0 && (
                          <span className="text-slate-500 dark:text-slate-400">{t.perMonth}</span>
                        )}
                      </div>
                      {yearlyPrice && (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {yearlyPrice}{t.perYear} <span className="text-green-600 dark:text-green-400 font-medium">({t.yearlySave})</span>
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Key Features */}
                    <ul className="space-y-3 text-sm mb-6">
                      {/* Photos */}
                      <li className="flex items-center gap-2">
                        <Camera className={`h-4 w-4 ${plan.features.maxPhotos > 0 ? "text-cpPink" : "text-slate-300 dark:text-slate-600"}`} />
                        <span className={plan.features.maxPhotos > 0 ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}>
                          {plan.features.maxPhotos === 0
                            ? (isNl ? "Geen foto's" : "No photos")
                            : `${plan.features.maxPhotos} ${isNl ? "foto's" : "photos"}`
                          }
                        </span>
                      </li>

                      {/* Website */}
                      <li className="flex items-center gap-2">
                        {plan.features.canShowWebsite ? (
                          <Globe className="h-4 w-4 text-cpPink" />
                        ) : (
                          <Globe className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                        )}
                        <span className={plan.features.canShowWebsite ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}>
                          {isNl ? "Website link" : "Website link"}
                        </span>
                        {!plan.features.canShowWebsite && <X className="h-3 w-3 text-slate-300 dark:text-slate-600 ml-auto" />}
                      </li>

                      {/* Contact info */}
                      <li className="flex items-center gap-2">
                        {plan.features.canShowPhone ? (
                          <Phone className="h-4 w-4 text-cpPink" />
                        ) : (
                          <Phone className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                        )}
                        <span className={plan.features.canShowPhone ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}>
                          {isNl ? "Telefoon & e-mail" : "Phone & email"}
                        </span>
                        {!plan.features.canShowPhone && <X className="h-3 w-3 text-slate-300 dark:text-slate-600 ml-auto" />}
                      </li>

                      {/* Description */}
                      <li className="flex items-center gap-2">
                        {plan.features.canShowDescription ? (
                          <Check className="h-4 w-4 text-cpPink" />
                        ) : (
                          <X className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                        )}
                        <span className={plan.features.canShowDescription ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}>
                          {isNl ? "Bedrijfsomschrijving" : "Business description"}
                        </span>
                      </li>

                      {/* Categories */}
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-cpPink" />
                        <span className="text-slate-700 dark:text-slate-200">
                          {plan.features.maxCategories} {plan.features.maxCategories === 1
                            ? (isNl ? "categorie" : "category")
                            : (isNl ? "categorieën" : "categories")
                          }
                        </span>
                      </li>

                      {/* Search ranking */}
                      <li className="flex items-center gap-2">
                        <TrendingUp className={`h-4 w-4 ${plan.features.priorityRank > 1 ? "text-cpPink" : "text-slate-400"}`} />
                        <span className={plan.features.priorityRank > 1 ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}>
                          {plan.features.priorityRank === 4
                            ? (isNl ? "Hoogste zoekprioriteit" : "Highest search priority")
                            : plan.features.priorityRank === 3
                              ? (isNl ? "Hoge zoekprioriteit" : "High search priority")
                              : plan.features.priorityRank === 2
                                ? (isNl ? "Hogere zoekprioriteit" : "Higher search priority")
                                : (isNl ? "Standaard zoekprioriteit" : "Standard search priority")
                          }
                        </span>
                      </li>

                      {/* Featured styling (PRO+) */}
                      {plan.features.hasFeaturedStyling && (
                        <li className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-amber-500" />
                          <span className="text-slate-700 dark:text-slate-200 font-medium">
                            {isNl ? "Uitgelichte styling" : "Featured styling"}
                          </span>
                        </li>
                      )}

                      {/* ELITE-exclusive: Verified Badge */}
                      {plan.features.hasVerifiedBadge && (
                        <li className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-purple-500" />
                          <span className="text-slate-700 dark:text-slate-200 font-medium">
                            {isNl ? "Geverifieerd badge" : "Verified badge"}
                          </span>
                        </li>
                      )}

                      {/* ELITE-exclusive: Homepage Spotlight */}
                      {plan.features.hasHomepageSpotlight && (
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-500" />
                          <span className="text-slate-700 dark:text-slate-200 font-medium">
                            {isNl ? "Homepage uitgelicht" : "Homepage spotlight"}
                          </span>
                        </li>
                      )}

                      {/* Locations */}
                      <li className="flex items-center gap-2">
                        <Building2 className={`h-4 w-4 ${
                          plan.features.maxLocations === 0
                            ? "text-purple-500"
                            : plan.features.maxLocations > 1
                              ? "text-cpPink"
                              : "text-slate-400"
                        }`} />
                        <span className={`${
                          plan.features.maxLocations === 0
                            ? "text-slate-700 dark:text-slate-200 font-medium"
                            : plan.features.maxLocations > 1
                              ? "text-slate-700 dark:text-slate-200 font-medium"
                              : "text-slate-600 dark:text-slate-400"
                        }`}>
                          {plan.features.maxLocations === 0
                            ? (isNl ? "Onbeperkt locaties" : "Unlimited locations")
                            : plan.features.maxLocations === 1
                              ? (isNl ? "1 locatie" : "1 location")
                              : (isNl ? `${plan.features.maxLocations} locaties` : `${plan.features.maxLocations} locations`)
                          }
                        </span>
                      </li>

                      {/* Analytics */}
                      <li className="flex items-center gap-2">
                        {plan.features.hasBasicAnalytics ? (
                          <BarChart3 className="h-4 w-4 text-cpPink" />
                        ) : (
                          <BarChart3 className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                        )}
                        <span className={plan.features.hasBasicAnalytics ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}>
                          {plan.features.hasAdvancedAnalytics
                            ? (isNl ? "Geavanceerde statistieken" : "Advanced analytics")
                            : plan.features.hasBasicAnalytics
                              ? (isNl ? "Basis statistieken" : "Basic analytics")
                              : (isNl ? "Geen statistieken" : "No analytics")
                          }
                        </span>
                      </li>

                      {/* Reviews - Always included! */}
                      <li className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <MessageSquare className="h-4 w-4 text-green-500" />
                        <span className="text-green-700 dark:text-green-300 font-medium">
                          {isNl ? "Reviews inbegrepen" : "Reviews included"}
                        </span>
                        <Check className="h-4 w-4 text-green-500 ml-auto" />
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className={`w-full ${
                        plan.isPopular
                          ? "bg-cpPink hover:bg-cpPink/90"
                          : ""
                      }`}
                      variant={plan.isPopular ? "default" : "outline"}
                    >
                      <Link href={`/${locale}/onboarding/business?plan=${plan.key}`}>
                        {t.getStarted}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-cpDark dark:text-white text-center mb-10">{t.featuresTitle}</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-4 px-4 font-semibold text-slate-600 dark:text-slate-300">
                    {isNl ? "Functie" : "Feature"}
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.key} className="text-center py-4 px-4 font-semibold text-cpDark dark:text-white">
                      <div className="flex flex-col items-center gap-1">
                        <span>{isNl ? plan.nameNl : plan.name}</span>
                        <span className="text-sm font-normal text-slate-500">
                          {formatPlanPrice(plan.monthlyPriceCents, locale)}
                          {plan.monthlyPriceCents > 0 && (isNl ? "/mnd" : "/mo")}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_COMPARISONS.map((feature, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="py-3 px-4 text-sm text-slate-700 dark:text-slate-300">
                      {isNl ? feature.nameNl : feature.name}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FeatureValue value={feature.free} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FeatureValue value={feature.starter} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FeatureValue value={feature.pro} highlight />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <FeatureValue value={feature.elite ?? false} highlightElite />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-cpDark dark:text-white text-center mb-10">{t.benefitsTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];
              return (
                <Card key={index} className="border-slate-200 dark:border-slate-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cpPink/10 flex items-center justify-center shrink-0">
                        <IconComponent className="h-5 w-5 text-cpPink" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-cpDark dark:text-white mb-1">{benefit.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Card className="bg-gradient-to-r from-cpPink/5 to-cpYellow/5 border-cpPink/20">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold text-cpDark dark:text-white mb-2">{t.ctaTitle}</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{t.ctaSubtitle}</p>
              <Button asChild size="lg" className="bg-cpPink hover:bg-cpPink/90">
                <Link href={`/${locale}/onboarding/business`}>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {t.getStarted}
                </Link>
              </Button>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                {t.ctaHelp}{" "}
                <a href="mailto:business@cutiepawspedia.com" className="text-cpPink hover:underline">
                  business@cutiepawspedia.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Section */}
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
            <CardContent className="pt-6 pb-6">
              <h3 className="font-semibold text-cpDark dark:text-white mb-2">{t.enterpriseTitle}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{t.enterpriseDescription}</p>
              <Button asChild variant="outline">
                <a href="mailto:enterprise@cutiepawspedia.com">
                  <Mail className="h-4 w-4 mr-2" />
                  {t.enterpriseButton}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper component for feature comparison table
function FeatureValue({ value, highlight, highlightElite }: { value: string | boolean; highlight?: boolean; highlightElite?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className={`h-5 w-5 mx-auto ${highlightElite ? "text-purple-500" : highlight ? "text-cpPink" : "text-green-500"}`} />
    ) : (
      <X className="h-5 w-5 mx-auto text-slate-300 dark:text-slate-600" />
    );
  }
  return (
    <span className={`text-sm ${highlightElite ? "text-purple-600 font-semibold" : highlight ? "text-cpPink font-semibold" : "text-slate-600 dark:text-slate-400"}`}>
      {value}
    </span>
  );
}

/**
 * Plan Management Page - View current plan, features, and upgrade options
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessByIdForUser } from "@/db/queries";
import { getBusinessById } from "@/db/queries/businesses";
import { DashboardHeader } from "@/components/dashboard";
import { PlanActions, ManageSubscriptionButton } from "@/components/dashboard/PlanActions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Crown,
  Sparkles,
  Heart,
  Check,
  X,
  Camera,
  Globe,
  Phone,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Calendar,
  Info,
  ExternalLink,
  Star,
  Building2,
} from "lucide-react";
import {
  getActivePlans,
  getPlan,
  formatPlanPrice,
  type PlanKey,
} from "@/lib/plans/config";

interface PlanPageProps {
  params: Promise<{ locale: string; businessId: string }>;
}

// Helper component - defined outside main component to avoid re-creating during render
function PlanIcon({ planKey, className }: { planKey: string; className?: string }) {
  switch (planKey) {
    case "FREE":
      return <Heart className={className} />;
    case "STARTER":
      return <Sparkles className={className} />;
    case "PRO":
      return <Crown className={className} />;
    case "ELITE":
      return <Star className={className} />;
    default:
      return <Heart className={className} />;
  }
}

function getBadgeColor(planKey: string) {
  switch (planKey) {
    case "PRO":
      return "bg-gradient-to-r from-amber-500 to-amber-400 text-white";
    case "STARTER":
      return "bg-gradient-to-r from-blue-500 to-blue-400 text-white";
    case "ELITE":
      return "bg-gradient-to-r from-purple-500 to-purple-400 text-white";
    default:
      return "bg-muted text-muted-foreground dark:bg-cpSurface dark:text-cpCream/70";
  }
}

export default async function PlanPage({ params }: PlanPageProps) {
  const { locale, businessId } = await params;
  const businessIdNum = parseInt(businessId, 10);

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  // Get business with ownership check (admin bypass)
  let business;
  if (dbUser.role === "admin") {
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: dbUser.id });
  }

  if (!business) notFound();

  // Get current plan key - use new planKey field with fallback to derive from legacy plan
  const currentPlanKey = (business.planKey as PlanKey) || "FREE";
  const currentPlan = getPlan(currentPlanKey);
  const allPlans = getActivePlans();

  const isNl = locale === "nl";

  const labels = {
    en: {
      title: "Subscription Plan",
      description: "Manage your subscription and view available features",
      currentPlan: "Current Plan",
      features: "Plan Features",
      availablePlans: "Available Plans",
      upgrade: "Upgrade",
      downgrade: "Downgrade",
      current: "Current",
      manage: "Manage Subscription",
      perMonth: "/month",
      perYear: "/year",
      yearlySave: "Save 2 months",
      reviewsIncluded: "Reviews Included",
      reviewsNote: "Receive, display, and respond to reviews on any plan",
      stripeInfo: "Secure Payments",
      stripeNote: "All payments are securely processed by Stripe.",
      featureLabels: {
        photos: "Business photos",
        website: "Website link",
        contact: "Phone & email",
        description: "Business description",
        categories: "Categories",
        searchPriority: "Search priority",
        featuredStyling: "Featured styling",
        basicAnalytics: "Basic analytics",
        advancedAnalytics: "Advanced analytics",
        socialLinks: "Social media links",
        reviews: "Customer reviews",
        locations: "Locations",
      },
      priorityLabels: {
        standard: "Standard",
        higher: "Higher",
        highest: "Highest",
      },
      planValidUntil: "Plan valid until",
      trialEndsAt: "Trial ends",
      unlimited: "Unlimited",
    },
    nl: {
      title: "Abonnement",
      description: "Beheer je abonnement en bekijk beschikbare functies",
      currentPlan: "Huidig Abonnement",
      features: "Abonnementfuncties",
      availablePlans: "Beschikbare Abonnementen",
      upgrade: "Upgraden",
      downgrade: "Downgraden",
      current: "Huidig",
      manage: "Abonnement Beheren",
      perMonth: "/maand",
      perYear: "/jaar",
      yearlySave: "Bespaar 2 maanden",
      reviewsIncluded: "Reviews Inbegrepen",
      reviewsNote: "Ontvang, toon en reageer op reviews met elk abonnement",
      stripeInfo: "Veilige Betalingen",
      stripeNote: "Alle betalingen worden veilig verwerkt door Stripe.",
      featureLabels: {
        photos: "Bedrijfsfoto's",
        website: "Website link",
        contact: "Telefoon & e-mail",
        description: "Bedrijfsomschrijving",
        categories: "Categorieën",
        searchPriority: "Zoekprioriteit",
        featuredStyling: "Uitgelichte styling",
        basicAnalytics: "Basis statistieken",
        advancedAnalytics: "Geavanceerde statistieken",
        socialLinks: "Social media links",
        reviews: "Klantbeoordelingen",
        locations: "Locaties",
      },
      priorityLabels: {
        standard: "Standaard",
        higher: "Hoger",
        highest: "Hoogste",
      },
      planValidUntil: "Abonnement geldig tot",
      trialEndsAt: "Proefperiode eindigt",
      unlimited: "Onbeperkt",
    },
    de: {
      title: "Abonnement",
      description: "Verwalten Sie Ihr Abonnement und sehen Sie verfügbare Funktionen",
      currentPlan: "Aktuelles Abonnement",
      features: "Plan-Funktionen",
      availablePlans: "Verfügbare Pläne",
      upgrade: "Upgraden",
      downgrade: "Downgraden",
      current: "Aktuell",
      manage: "Abonnement Verwalten",
      perMonth: "/Monat",
      perYear: "/Jahr",
      yearlySave: "2 Monate sparen",
      reviewsIncluded: "Bewertungen Enthalten",
      reviewsNote: "Erhalten, anzeigen und beantworten Sie Bewertungen mit jedem Plan",
      stripeInfo: "Sichere Zahlungen",
      stripeNote: "Alle Zahlungen werden sicher über Stripe abgewickelt.",
      featureLabels: {
        photos: "Geschäftsfotos",
        website: "Website-Link",
        contact: "Telefon & E-Mail",
        description: "Geschäftsbeschreibung",
        categories: "Kategorien",
        searchPriority: "Suchpriorität",
        featuredStyling: "Hervorgehobenes Styling",
        basicAnalytics: "Basis-Analysen",
        advancedAnalytics: "Erweiterte Analysen",
        socialLinks: "Social-Media-Links",
        reviews: "Kundenbewertungen",
        locations: "Standorte",
      },
      priorityLabels: {
        standard: "Standard",
        higher: "Höher",
        highest: "Höchste",
      },
      planValidUntil: "Plan gültig bis",
      trialEndsAt: "Testphase endet",
      unlimited: "Unbegrenzt",
    },
    fr: {
      title: "Abonnement",
      description: "Gérez votre abonnement et consultez les fonctionnalités disponibles",
      currentPlan: "Abonnement Actuel",
      features: "Fonctionnalités du Plan",
      availablePlans: "Plans Disponibles",
      upgrade: "Passer au supérieur",
      downgrade: "Rétrograder",
      current: "Actuel",
      manage: "Gérer l'Abonnement",
      perMonth: "/mois",
      perYear: "/an",
      yearlySave: "Économisez 2 mois",
      reviewsIncluded: "Avis Inclus",
      reviewsNote: "Recevez, affichez et répondez aux avis avec n'importe quel plan",
      stripeInfo: "Paiements Sécurisés",
      stripeNote: "Tous les paiements sont traités en toute sécurité par Stripe.",
      featureLabels: {
        photos: "Photos de l'entreprise",
        website: "Lien site web",
        contact: "Téléphone & e-mail",
        description: "Description de l'entreprise",
        categories: "Catégories",
        searchPriority: "Priorité de recherche",
        featuredStyling: "Style mis en avant",
        basicAnalytics: "Statistiques de base",
        advancedAnalytics: "Statistiques avancées",
        socialLinks: "Liens réseaux sociaux",
        reviews: "Avis clients",
        locations: "Établissements",
      },
      priorityLabels: {
        standard: "Standard",
        higher: "Supérieure",
        highest: "Maximale",
      },
      planValidUntil: "Plan valide jusqu'au",
      trialEndsAt: "Essai se termine le",
      unlimited: "Illimité",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  // Get search priority label (needs t so must be inside component)
  const getPriorityLabel = (rank: number) => {
    switch (rank) {
      case 3:
      case 4:
        return t.priorityLabels.highest;
      case 2:
        return t.priorityLabels.higher;
      default:
        return t.priorityLabels.standard;
    }
  };

  return (
    <>
      <DashboardHeader
        title={t.title}
        description={t.description}
        businessId={businessIdNum}
        locale={locale}
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Stripe Secure Payments Info */}
        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-200">{t.stripeInfo}</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            {t.stripeNote}
          </AlertDescription>
        </Alert>

        {/* Current Plan Card */}
        <Card className="border-2 border-cpCoral/20 bg-gradient-to-br from-cpCoral/5 to-white dark:from-cpCoral/10 dark:to-cpSurface">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <PlanIcon planKey={currentPlanKey} className="h-6 w-6 text-cpCoral" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {t.currentPlan}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge className={getBadgeColor(currentPlanKey)}>
                      {isNl ? currentPlan.nameNl : currentPlan.name}
                    </Badge>
                    {business.planStatus && business.planStatus !== "ACTIVE" && (
                      <Badge variant="outline" className="text-amber-600 border-amber-300">
                        {business.planStatus}
                      </Badge>
                    )}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-foreground dark:text-cpCream">
                  {formatPlanPrice(currentPlan.monthlyPriceCents, locale)}
                </div>
                {currentPlan.monthlyPriceCents > 0 && (
                  <span className="text-muted-foreground dark:text-cpCream/60">{t.perMonth}</span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Plan validity dates */}
            {(business.planValidUntil || business.trialEndsAt) && (
              <div className="flex gap-4 mb-4 text-sm">
                {business.planValidUntil && (
                  <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/70">
                    <Calendar className="h-4 w-4" />
                    {t.planValidUntil}: {new Date(business.planValidUntil).toLocaleDateString(locale)}
                  </div>
                )}
                {business.trialEndsAt && (
                  <div className="flex items-center gap-2 text-cpAmber">
                    <Calendar className="h-4 w-4" />
                    {t.trialEndsAt}: {new Date(business.trialEndsAt).toLocaleDateString(locale)}
                  </div>
                )}
              </div>
            )}

            {/* Current plan features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Photos */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card dark:bg-cpSurface/50 border border-border dark:border-cpAmber/20">
                <Camera className={`h-5 w-5 ${currentPlan.features.maxPhotos > 0 ? "text-cpCoral" : "text-muted-foreground/50"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-cpCream">
                    {t.featureLabels.photos}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                    {currentPlan.features.maxPhotos === 0
                      ? "0"
                      : currentPlan.features.maxPhotos
                    }
                  </p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card dark:bg-cpSurface/50 border border-border dark:border-cpAmber/20">
                <Globe className={`h-5 w-5 ${currentPlan.features.canShowWebsite ? "text-cpCoral" : "text-muted-foreground/50"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-cpCream">
                    {t.featureLabels.website}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                    {currentPlan.features.canShowWebsite ? <Check className="h-3 w-3 inline text-green-500" /> : <X className="h-3 w-3 inline text-red-400" />}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card dark:bg-cpSurface/50 border border-border dark:border-cpAmber/20">
                <Phone className={`h-5 w-5 ${currentPlan.features.canShowPhone ? "text-cpCoral" : "text-muted-foreground/50"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-cpCream">
                    {t.featureLabels.contact}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                    {currentPlan.features.canShowPhone ? <Check className="h-3 w-3 inline text-green-500" /> : <X className="h-3 w-3 inline text-red-400" />}
                  </p>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card dark:bg-cpSurface/50 border border-border dark:border-cpAmber/20">
                <Check className="h-5 w-5 text-cpCoral" />
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-cpCream">
                    {t.featureLabels.categories}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                    {currentPlan.features.maxCategories}
                  </p>
                </div>
              </div>

              {/* Search Priority */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card dark:bg-cpSurface/50 border border-border dark:border-cpAmber/20">
                <TrendingUp className={`h-5 w-5 ${currentPlan.features.priorityRank > 1 ? "text-cpCoral" : "text-muted-foreground/50"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-cpCream">
                    {t.featureLabels.searchPriority}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                    {getPriorityLabel(currentPlan.features.priorityRank)}
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card dark:bg-cpSurface/50 border border-border dark:border-cpAmber/20">
                <BarChart3 className={`h-5 w-5 ${currentPlan.features.hasBasicAnalytics ? "text-cpCoral" : "text-muted-foreground/50"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-cpCream">
                    {currentPlan.features.hasAdvancedAnalytics
                      ? t.featureLabels.advancedAnalytics
                      : t.featureLabels.basicAnalytics
                    }
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                    {currentPlan.features.hasBasicAnalytics ? <Check className="h-3 w-3 inline text-green-500" /> : <X className="h-3 w-3 inline text-red-400" />}
                  </p>
                </div>
              </div>

              {/* Locations */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card dark:bg-cpSurface/50 border border-border dark:border-cpAmber/20">
                <Building2 className={`h-5 w-5 ${
                  currentPlan.features.maxLocations === 0
                    ? "text-purple-500"
                    : currentPlan.features.maxLocations > 1
                      ? "text-cpCoral"
                      : "text-muted-foreground/50"
                }`} />
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-cpCream">
                    {t.featureLabels.locations}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                    {currentPlan.features.maxLocations === 0
                      ? t.unlimited
                      : currentPlan.features.maxLocations
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Manage Subscription Button - only show if has active subscription */}
            {business.stripeSubscriptionId && (
              <div className="mt-6 pt-4 border-t border-border dark:border-cpAmber/20">
                <ManageSubscriptionButton
                  businessId={businessIdNum}
                  locale={locale}
                  label={t.manage}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reviews Always Included Notice */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center shrink-0">
              <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">{t.reviewsIncluded}</h3>
              <p className="text-sm text-green-700 dark:text-green-300">{t.reviewsNote}</p>
            </div>
            <Check className="h-6 w-6 text-green-500 ml-auto" />
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div>
          <h2 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">{t.availablePlans}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allPlans.map((plan) => {
              const isCurrent = plan.key === currentPlanKey;
              const isUpgrade = plan.features.priorityRank > currentPlan.features.priorityRank;

              return (
                <Card
                  key={plan.key}
                  className={`relative bg-card dark:bg-cpSurface/50 ${
                    isCurrent
                      ? "border-cpCoral border-2 bg-cpCoral/5 dark:bg-cpCoral/10"
                      : plan.isPopular
                        ? "border-cpAmber border-2"
                        : "border-border dark:border-cpAmber/20"
                  }`}
                >
                  {/* Popular badge */}
                  {plan.isPopular && !isCurrent && (
                    <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-cpAmber text-cpCharcoal">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}

                  {/* Current badge */}
                  {isCurrent && (
                    <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-cpCoral">
                      <Check className="h-3 w-3 mr-1" />
                      {t.current}
                    </Badge>
                  )}

                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <PlanIcon planKey={plan.key} className={`h-5 w-5 ${isCurrent ? "text-cpCoral" : "text-muted-foreground dark:text-cpCream/50"}`} />
                      <CardTitle className="text-lg text-foreground dark:text-cpCream">
                        {isNl ? plan.nameNl : plan.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-xs min-h-[32px] dark:text-cpCream/60">
                      {isNl ? plan.descriptionNl : plan.description}
                    </CardDescription>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-foreground dark:text-cpCream">
                        {formatPlanPrice(plan.monthlyPriceCents, locale)}
                      </span>
                      {plan.monthlyPriceCents > 0 && (
                        <span className="text-muted-foreground dark:text-cpCream/60 text-sm">{t.perMonth}</span>
                      )}
                    </div>
                    {plan.yearlyPriceCents && (
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {formatPlanPrice(plan.yearlyPriceCents, locale)}{t.perYear} ({t.yearlySave})
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* Key features list */}
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-center gap-2">
                        <Camera className={`h-4 w-4 ${plan.features.maxPhotos > 0 ? "text-cpCoral" : "text-muted-foreground/50"}`} />
                        <span className={plan.features.maxPhotos > 0 ? "text-foreground dark:text-cpCream" : "text-muted-foreground dark:text-cpCream/50"}>
                          {plan.features.maxPhotos} {isNl ? "foto's" : "photos"}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        {plan.features.canShowWebsite ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/50" />
                        )}
                        <span className={plan.features.canShowWebsite ? "text-foreground dark:text-cpCream" : "text-muted-foreground dark:text-cpCream/50"}>
                          {t.featureLabels.website}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        {plan.features.hasBasicAnalytics ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/50" />
                        )}
                        <span className={plan.features.hasBasicAnalytics ? "text-foreground dark:text-cpCream" : "text-muted-foreground dark:text-cpCream/50"}>
                          {plan.features.hasAdvancedAnalytics
                            ? t.featureLabels.advancedAnalytics
                            : t.featureLabels.basicAnalytics
                          }
                        </span>
                      </li>
                      {plan.features.hasFeaturedStyling && (
                        <li className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-cpAmber" />
                          <span className="font-medium text-foreground dark:text-cpCream">{t.featureLabels.featuredStyling}</span>
                        </li>
                      )}
                      {/* Locations */}
                      <li className="flex items-center gap-2">
                        <Building2 className={`h-4 w-4 ${
                          plan.features.maxLocations === 0
                            ? "text-purple-500"
                            : plan.features.maxLocations > 1
                              ? "text-cpCoral"
                              : "text-muted-foreground/50"
                        }`} />
                        <span className={
                          plan.features.maxLocations === 0
                            ? "font-medium text-purple-600 dark:text-purple-400"
                            : plan.features.maxLocations > 1
                              ? "font-medium text-foreground dark:text-cpCream"
                              : "text-muted-foreground dark:text-cpCream/50"
                        }>
                          {plan.features.maxLocations === 0
                            ? (isNl ? "Onbeperkt locaties" : "Unlimited locations")
                            : plan.features.maxLocations === 1
                              ? (isNl ? "1 locatie" : "1 location")
                              : (isNl ? `${plan.features.maxLocations} locaties` : `${plan.features.maxLocations} locations`)
                          }
                        </span>
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <PlanActions
                      businessId={businessIdNum}
                      currentPlanKey={currentPlanKey}
                      targetPlanKey={plan.key as PlanKey}
                      hasActiveSubscription={!!business.stripeSubscriptionId}
                      isUpgrade={isUpgrade}
                      locale={locale}
                      labels={{
                        upgrade: t.upgrade,
                        downgrade: t.downgrade,
                        manage: t.manage,
                        current: t.current,
                      }}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Link to public pricing page */}
        <div className="text-center">
          <Link href={`/${locale}/for-businesses`} className="text-cpCoral hover:underline text-sm">
            {isNl ? "Bekijk volledige prijsvergelijking" : "View full pricing comparison"}
            <ExternalLink className="h-3 w-3 inline ml-1" />
          </Link>
        </div>
      </div>
    </>
  );
}

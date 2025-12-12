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
import { getTranslations } from "next-intl/server";

// Static page with daily revalidation - pricing rarely changes
export const dynamic = "force-static";
export const revalidate = 86400;

interface ForBusinessesPageProps {
  params: Promise<{ locale: string }>;
}

const iconMap = {
  users: Users,
  trending: TrendingUp,
  shield: Shield,
  chart: BarChart3,
};

// Plan card styling based on plan key
function getPlanCardStyle(plan: PlanDefinition): string {
  if (plan.isPopular) {
    return "border-cpCoral border-2 shadow-lg scale-105 relative z-10 dark:border-cpCoral";
  }
  return "border-border dark:border-cpAmber/20";
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
  const t = await getTranslations("business");

  // Get active plans from config
  const plans = getActivePlans();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cpCream to-white dark:from-cpCharcoal dark:to-cpSurface">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-cpCoral/10 text-cpCoral border-cpCoral/20 dark:bg-cpCoral/20 dark:border-cpCoral/30">
            <Building2 className="h-3.5 w-3.5 mr-1" />
            {t("badge")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-cpCoral hover:bg-cpCoral/90 text-white">
              <Link href={`/${locale}/onboarding/business`}>
                <ArrowRight className="h-4 w-4 mr-2" />
                {t("getStarted")}
              </Link>
            </Button>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">{t("howItWorks.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-cpCoral text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{t(`howItWorks.step${index}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`howItWorks.step${index}.description`)}</p>
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
                <h3 className="font-semibold text-green-800 dark:text-green-200">{t("reviewNotice.title")}</h3>
                <p className="text-sm text-green-700 dark:text-green-300">{t("reviewNotice.description")}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">{t("pricing.title")}</h2>
            <p className="text-muted-foreground">{t("pricing.subtitle")}</p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-start">
            {plans.map((plan) => {
              const PlanIcon = getPlanIcon(plan.key);
              const monthlyPrice = formatPlanPrice(plan.monthlyPriceCents, locale);
              const yearlyPrice = plan.yearlyPriceCents
                ? formatPlanPrice(plan.yearlyPriceCents, locale)
                : null;
              const planName = locale === "nl" ? plan.nameNl : plan.name;
              const planDescription = locale === "nl" ? plan.descriptionNl : plan.description;

              return (
                <Card key={plan.key} className={`relative ${getPlanCardStyle(plan)}`}>
                  {/* Popular badge */}
                  {plan.isPopular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cpCoral text-white">
                      <Star className="h-3 w-3 mr-1" />
                      {t("pricing.popular")}
                    </Badge>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        plan.isPopular ? "bg-cpCoral/10 dark:bg-cpCoral/20" : "bg-muted"
                      }`}>
                        <PlanIcon className={`h-4 w-4 ${
                          plan.isPopular ? "text-cpCoral" : "text-muted-foreground"
                        }`} />
                      </div>
                      <CardTitle className="text-xl">{planName}</CardTitle>
                    </div>
                    <CardDescription className="min-h-[40px]">{planDescription}</CardDescription>

                    {/* Pricing */}
                    <div className="mt-4 space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">
                          {monthlyPrice}
                        </span>
                        {plan.monthlyPriceCents > 0 && (
                          <span className="text-muted-foreground">{t("pricing.perMonth")}</span>
                        )}
                      </div>
                      {yearlyPrice && (
                        <p className="text-sm text-muted-foreground">
                          {yearlyPrice}{t("pricing.perYear")} <span className="text-green-600 dark:text-green-400 font-medium">({t("pricing.yearlySave")})</span>
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Key Features */}
                    <ul className="space-y-3 text-sm mb-6">
                      {/* Photos */}
                      <li className="flex items-center gap-2">
                        <Camera className={`h-4 w-4 ${plan.features.maxPhotos > 0 ? "text-cpCoral" : "text-muted-foreground/40"}`} />
                        <span className={plan.features.maxPhotos > 0 ? "text-foreground" : "text-muted-foreground"}>
                          {plan.features.maxPhotos === 0
                            ? t("features.noPhotos")
                            : t("features.photos", { count: plan.features.maxPhotos })
                          }
                        </span>
                      </li>

                      {/* Website */}
                      <li className="flex items-center gap-2">
                        {plan.features.canShowWebsite ? (
                          <Globe className="h-4 w-4 text-cpCoral" />
                        ) : (
                          <Globe className="h-4 w-4 text-muted-foreground/40" />
                        )}
                        <span className={plan.features.canShowWebsite ? "text-foreground" : "text-muted-foreground"}>
                          {t("features.websiteLink")}
                        </span>
                        {!plan.features.canShowWebsite && <X className="h-3 w-3 text-muted-foreground/40 ml-auto" />}
                      </li>

                      {/* Contact info */}
                      <li className="flex items-center gap-2">
                        {plan.features.canShowPhone ? (
                          <Phone className="h-4 w-4 text-cpCoral" />
                        ) : (
                          <Phone className="h-4 w-4 text-muted-foreground/40" />
                        )}
                        <span className={plan.features.canShowPhone ? "text-foreground" : "text-muted-foreground"}>
                          {t("features.phoneEmail")}
                        </span>
                        {!plan.features.canShowPhone && <X className="h-3 w-3 text-muted-foreground/40 ml-auto" />}
                      </li>

                      {/* Description */}
                      <li className="flex items-center gap-2">
                        {plan.features.canShowDescription ? (
                          <Check className="h-4 w-4 text-cpCoral" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40" />
                        )}
                        <span className={plan.features.canShowDescription ? "text-foreground" : "text-muted-foreground"}>
                          {t("features.businessDescription")}
                        </span>
                      </li>

                      {/* Categories */}
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-cpCoral" />
                        <span className="text-foreground">
                          {t("features.categories", { count: plan.features.maxCategories })}
                        </span>
                      </li>

                      {/* Search ranking */}
                      <li className="flex items-center gap-2">
                        <TrendingUp className={`h-4 w-4 ${plan.features.priorityRank > 1 ? "text-cpCoral" : "text-muted-foreground"}`} />
                        <span className={plan.features.priorityRank > 1 ? "text-foreground" : "text-muted-foreground"}>
                          {plan.features.priorityRank === 4
                            ? t("features.searchPriorityHighest")
                            : plan.features.priorityRank === 3
                              ? t("features.searchPriorityHigh")
                              : plan.features.priorityRank === 2
                                ? t("features.searchPriorityHigher")
                                : t("features.searchPriorityStandard")
                          }
                        </span>
                      </li>

                      {/* Featured styling (PRO+) */}
                      {plan.features.hasFeaturedStyling && (
                        <li className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-cpAmber" />
                          <span className="text-foreground font-medium">
                            {t("features.featuredStyling")}
                          </span>
                        </li>
                      )}

                      {/* ELITE-exclusive: Verified Badge */}
                      {plan.features.hasVerifiedBadge && (
                        <li className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                          <span className="text-foreground font-medium">
                            {t("features.verifiedBadge")}
                          </span>
                        </li>
                      )}

                      {/* ELITE-exclusive: Homepage Spotlight */}
                      {plan.features.hasHomepageSpotlight && (
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                          <span className="text-foreground font-medium">
                            {t("features.homepageSpotlight")}
                          </span>
                        </li>
                      )}

                      {/* Locations */}
                      <li className="flex items-center gap-2">
                        <Building2 className={`h-4 w-4 ${
                          plan.features.maxLocations === 0
                            ? "text-purple-500 dark:text-purple-400"
                            : plan.features.maxLocations > 1
                              ? "text-cpCoral"
                              : "text-muted-foreground"
                        }`} />
                        <span className={`${
                          plan.features.maxLocations === 0
                            ? "text-foreground font-medium"
                            : plan.features.maxLocations > 1
                              ? "text-foreground font-medium"
                              : "text-muted-foreground"
                        }`}>
                          {plan.features.maxLocations === 0
                            ? t("features.locationsUnlimited")
                            : t("features.locations", { count: plan.features.maxLocations })
                          }
                        </span>
                      </li>

                      {/* Analytics */}
                      <li className="flex items-center gap-2">
                        {plan.features.hasBasicAnalytics ? (
                          <BarChart3 className="h-4 w-4 text-cpCoral" />
                        ) : (
                          <BarChart3 className="h-4 w-4 text-muted-foreground/40" />
                        )}
                        <span className={plan.features.hasBasicAnalytics ? "text-foreground" : "text-muted-foreground"}>
                          {plan.features.hasAdvancedAnalytics
                            ? t("features.analyticsAdvanced")
                            : plan.features.hasBasicAnalytics
                              ? t("features.analyticsBasic")
                              : t("features.analyticsNone")
                          }
                        </span>
                      </li>

                      {/* Reviews - Always included! */}
                      <li className="flex items-center gap-2 pt-2 border-t border-border">
                        <MessageSquare className="h-4 w-4 text-green-500" />
                        <span className="text-green-700 dark:text-green-300 font-medium">
                          {t("features.reviewsIncluded")}
                        </span>
                        <Check className="h-4 w-4 text-green-500 ml-auto" />
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className={`w-full ${
                        plan.isPopular
                          ? "bg-cpCoral hover:bg-cpCoral/90 text-white"
                          : "border-border hover:bg-muted"
                      }`}
                      variant={plan.isPopular ? "default" : "outline"}
                    >
                      <Link href={`/${locale}/onboarding/business?plan=${plan.key}`}>
                        {t("getStarted")}
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
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">{t("table.title")}</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                    {t("table.feature")}
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.key} className="text-center py-4 px-4 font-semibold text-foreground">
                      <div className="flex flex-col items-center gap-1">
                        <span>{locale === "nl" ? plan.nameNl : plan.name}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {formatPlanPrice(plan.monthlyPriceCents, locale)}
                          {plan.monthlyPriceCents > 0 && t("table.perMonth")}
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
                    className="border-b border-border/50 hover:bg-muted/50"
                  >
                    <td className="py-3 px-4 text-sm text-foreground">
                      {locale === "nl" ? feature.nameNl : feature.name}
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
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">{t("benefits.title")}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {(["users", "trending", "shield", "chart"] as const).map((iconKey, index) => {
              const IconComponent = iconMap[iconKey];
              return (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center shrink-0">
                        <IconComponent className="h-5 w-5 text-cpCoral" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{t(`benefits.${iconKey}.title`)}</h3>
                        <p className="text-sm text-muted-foreground">{t(`benefits.${iconKey}.description`)}</p>
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
          <Card className="bg-gradient-to-r from-cpCoral/5 to-cpAmber/5 dark:from-cpCoral/10 dark:to-cpAmber/10 border-cpCoral/20 dark:border-cpCoral/30">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t("cta.title")}</h2>
              <p className="text-muted-foreground mb-6">{t("cta.subtitle")}</p>
              <Button asChild size="lg" className="bg-cpCoral hover:bg-cpCoral/90 text-white">
                <Link href={`/${locale}/onboarding/business`}>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {t("getStarted")}
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                {t("cta.help")}{" "}
                <a href="mailto:hello@cutiepawspedia.com" className="text-cpCoral hover:underline">
                  hello@cutiepawspedia.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Section */}
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-border bg-muted/50">
            <CardContent className="pt-6 pb-6">
              <h3 className="font-semibold text-foreground mb-2">{t("enterprise.title")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("enterprise.description")}</p>
              <Button asChild variant="outline" className="border-border hover:bg-muted">
                <a href="mailto:hello@cutiepawspedia.com">
                  <Mail className="h-4 w-4 mr-2" />
                  {t("enterprise.button")}
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
      <Check className={`h-5 w-5 mx-auto ${highlightElite ? "text-purple-500 dark:text-purple-400" : highlight ? "text-cpCoral" : "text-green-500"}`} />
    ) : (
      <X className="h-5 w-5 mx-auto text-muted-foreground/40" />
    );
  }
  return (
    <span className={`text-sm ${highlightElite ? "text-purple-600 dark:text-purple-400 font-semibold" : highlight ? "text-cpCoral font-semibold" : "text-muted-foreground"}`}>
      {value}
    </span>
  );
}

/**
 * Business Dashboard Overview - Stats and quick actions
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import {
  getUserByStackAuthId,
  getBusinessByIdForUser,
  getBusinessStats,
} from "@/db/queries";
import { getBusinessById } from "@/db/queries/businesses";
import { getBasicAnalytics } from "@/db/queries/analytics";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MessageSquare,
  Star,
  ArrowRight,
  Globe,
  Mail,
  Phone,
  Crown,
  Lock,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { getPlan, getPlanFeatures, type PlanKey } from "@/lib/plans/config";

interface BusinessOverviewPageProps {
  params: Promise<{ locale: string; businessId: string }>;
}

export default async function BusinessOverviewPage({ params }: BusinessOverviewPageProps) {
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

  // Get stats and analytics in parallel
  const [stats, analytics] = await Promise.all([
    getBusinessStats(businessIdNum),
    getBasicAnalytics(businessIdNum),
  ]);

  // Calculate real percentage change
  const viewsChange = analytics.lastMonthViews > 0
    ? Math.round(((analytics.thisMonthViews - analytics.lastMonthViews) / analytics.lastMonthViews) * 100)
    : 0;

  // Calculate real conversion rate
  const conversionRate = analytics.thisMonthViews > 0
    ? Math.round((analytics.thisMonthLeads / analytics.thisMonthViews) * 10000) / 100
    : 0;

  // Get plan features for analytics gating
  const planKey = (business.planKey as PlanKey) || "FREE";
  const planFeatures = getPlanFeatures(planKey);

  const labels = {
    en: {
      overview: "Overview",
      overviewDesc: "Your business at a glance",
      profile: "Business Profile",
      places: "Places",
      placesDesc: "Active listings",
      leads: "Leads",
      leadsDesc: "Total inquiries",
      leadsLast30: "Last 30 days",
      plan: "Plan",
      planDesc: "Current subscription",
      avgRating: "Average Rating",
      avgRatingDesc: "Based on reviews",
      viewPlaces: "View Places",
      viewLeads: "View Leads",
      managePlan: "Manage Plan",
      noRating: "No reviews yet",
      analytics: "Analytics",
      analyticsDesc: "Track your business performance",
      viewsThisMonth: "Views this month",
      conversionRate: "Conversion rate",
      upgradeForAnalytics: "Upgrade to Starter to unlock analytics",
      advancedAnalytics: "Advanced Analytics",
      advancedDesc: "Detailed trends and demographics",
      upgradeForAdvanced: "Upgrade to Pro for advanced analytics",
    },
    nl: {
      overview: "Overzicht",
      overviewDesc: "Jouw bedrijf in een oogopslag",
      profile: "Bedrijfsprofiel",
      places: "Locaties",
      placesDesc: "Actieve vermeldingen",
      leads: "Leads",
      leadsDesc: "Totaal aanvragen",
      leadsLast30: "Laatste 30 dagen",
      plan: "Abonnement",
      planDesc: "Huidig abonnement",
      avgRating: "Gemiddelde Beoordeling",
      avgRatingDesc: "Gebaseerd op reviews",
      viewPlaces: "Bekijk Locaties",
      viewLeads: "Bekijk Leads",
      managePlan: "Beheer Abonnement",
      noRating: "Nog geen reviews",
      analytics: "Statistieken",
      analyticsDesc: "Volg de prestaties van je bedrijf",
      viewsThisMonth: "Weergaven deze maand",
      conversionRate: "Conversieratio",
      upgradeForAnalytics: "Upgrade naar Starter voor statistieken",
      advancedAnalytics: "Geavanceerde Statistieken",
      advancedDesc: "Gedetailleerde trends en demografie",
      upgradeForAdvanced: "Upgrade naar Pro voor geavanceerde statistieken",
    },
    de: {
      overview: "Übersicht",
      overviewDesc: "Ihr Unternehmen auf einen Blick",
      profile: "Unternehmensprofil",
      places: "Standorte",
      placesDesc: "Aktive Einträge",
      leads: "Leads",
      leadsDesc: "Gesamtanfragen",
      leadsLast30: "Letzte 30 Tage",
      plan: "Abonnement",
      planDesc: "Aktuelles Abonnement",
      avgRating: "Durchschnittsbewertung",
      avgRatingDesc: "Basierend auf Bewertungen",
      viewPlaces: "Standorte anzeigen",
      viewLeads: "Leads anzeigen",
      managePlan: "Plan verwalten",
      noRating: "Noch keine Bewertungen",
      analytics: "Statistiken",
      analyticsDesc: "Verfolgen Sie die Leistung Ihres Unternehmens",
      viewsThisMonth: "Aufrufe diesen Monat",
      conversionRate: "Konversionsrate",
      upgradeForAnalytics: "Upgrade auf Starter für Statistiken",
      advancedAnalytics: "Erweiterte Statistiken",
      advancedDesc: "Detaillierte Trends und Demografie",
      upgradeForAdvanced: "Upgrade auf Pro für erweiterte Statistiken",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <>
      <DashboardHeader
        title={t.overview}
        description={t.overviewDesc}
        businessId={businessIdNum}
        locale={locale}
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Business Profile Card */}
        <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
              <Building2 className="h-5 w-5 text-cpCoral" />
              {t.profile}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Logo */}
              <div className="shrink-0">
                {business.logo ? (
                  <img
                    src={business.logo}
                    alt={business.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-cpCoral/10 flex items-center justify-center">
                    <Building2 className="h-10 w-10 text-cpCoral" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream">{business.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={
                        (business.planKey as PlanKey) === "PRO"
                          ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
                          : (business.planKey as PlanKey) === "STARTER"
                            ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                            : "dark:border-cpAmber/30 dark:text-cpCream/80"
                      }
                    >
                      {getPlan((business.planKey as PlanKey) || "FREE").name}
                    </Badge>
                    <Badge
                      className={
                        business.status === "active"
                          ? "bg-cpCoral/10 text-cpCoral border-cpCoral/30"
                          : "bg-muted text-muted-foreground dark:bg-cpSurface dark:text-cpCream/60"
                      }
                    >
                      {business.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  {business.website && (
                    <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/70">
                      <Globe className="h-4 w-4 text-cpCoral" />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cpCoral truncate"
                      >
                        {business.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {business.contactEmail && (
                    <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/70">
                      <Mail className="h-4 w-4 text-cpCoral" />
                      <span className="truncate">{business.contactEmail}</span>
                    </div>
                  )}
                  {business.contactPhone && (
                    <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/70">
                      <Phone className="h-4 w-4 text-cpCoral" />
                      <span>{business.contactPhone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Places */}
          <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-cpCream/70">
                {t.places}
              </CardTitle>
              <Building2 className="h-4 w-4 text-cpCoral" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground dark:text-cpCream">{stats.totalListings}</div>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60">{t.placesDesc}</p>
            </CardContent>
          </Card>

          {/* Leads */}
          <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-cpCream/70">
                {t.leads}
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-cpCoral" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground dark:text-cpCream">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                {stats.leadsLast30Days} {t.leadsLast30.toLowerCase()}
              </p>
            </CardContent>
          </Card>

          {/* Plan */}
          <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-cpCream/70">
                {t.plan}
              </CardTitle>
              <Crown className="h-4 w-4 text-cpAmber" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground dark:text-cpCream">
                {getPlan((business.planKey as PlanKey) || "FREE").name}
              </div>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60">{t.planDesc}</p>
            </CardContent>
          </Card>

          {/* Average Rating */}
          <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-cpCream/70">
                {t.avgRating}
              </CardTitle>
              <Star className="h-4 w-4 text-cpAmber" />
            </CardHeader>
            <CardContent>
              {stats.avgRating > 0 ? (
                <>
                  <div className="text-3xl font-bold text-foreground dark:text-cpCream">
                    {stats.avgRating.toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                    {stats.totalReviews} reviews
                  </p>
                </>
              ) : (
                <>
                  <div className="text-xl font-bold text-muted-foreground dark:text-cpCream/50">-</div>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/60">{t.noRating}</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section - Plan Gated */}
        <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
              <BarChart3 className="h-5 w-5 text-cpCoral" />
              {t.analytics}
            </CardTitle>
            <CardDescription className="dark:text-cpCream/70">{t.analyticsDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            {planFeatures.hasBasicAnalytics ? (
              <div className="space-y-4">
                {/* Basic Analytics - Available for STARTER+ */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted dark:bg-cpSurface">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70 mb-1">
                      <TrendingUp className="h-4 w-4" />
                      {t.viewsThisMonth}
                    </div>
                    <div className="text-2xl font-bold text-foreground dark:text-cpCream">
                      {analytics.thisMonthViews}
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      {viewsChange >= 0 ? "+" : ""}{viewsChange}% vs last month
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted dark:bg-cpSurface">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/70 mb-1">
                      <MessageSquare className="h-4 w-4" />
                      {t.conversionRate}
                    </div>
                    <div className="text-2xl font-bold text-foreground dark:text-cpCream">
                      {conversionRate}%
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                      {analytics.thisMonthLeads} leads / {analytics.thisMonthViews} views
                    </p>
                  </div>
                </div>

                {/* Advanced Analytics Upsell for STARTER */}
                {!planFeatures.hasAdvancedAnalytics && (
                  <div className="p-4 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-100">
                          <Lock className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-amber-900">{t.advancedAnalytics}</p>
                          <p className="text-sm text-amber-700">{t.advancedDesc}</p>
                        </div>
                      </div>
                      <Link href={`/${locale}/dashboard/business/${businessId}/plan`}>
                        <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                          {t.upgradeForAdvanced.split(' ')[0]}
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Advanced Analytics Content for PRO/ELITE */}
                {planFeatures.hasAdvancedAnalytics && (
                  <div className="p-4 rounded-lg border border-border dark:border-cpAmber/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-cpCoral/10 text-cpCoral border-cpCoral/30">PRO</Badge>
                      <span className="font-medium text-foreground dark:text-cpCream">{t.advancedAnalytics}</span>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                      {locale === "nl"
                        ? "Gedetailleerde analytics komen binnenkort beschikbaar."
                        : locale === "de"
                          ? "Detaillierte Analysen kommen bald."
                          : "Detailed analytics dashboard coming soon."}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Locked State for FREE tier */
              <div className="p-6 rounded-lg bg-gradient-to-r from-muted to-muted/50 dark:from-cpSurface dark:to-cpSurface/50 border border-border dark:border-cpAmber/20">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-muted dark:bg-cpSurface mb-4">
                    <Lock className="h-6 w-6 text-muted-foreground dark:text-cpCream/60" />
                  </div>
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-1">
                    {t.analytics}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4 max-w-sm">
                    {t.upgradeForAnalytics}
                  </p>
                  <Link href={`/${locale}/dashboard/business/${businessId}/plan`}>
                    <Button className="bg-cpCoral hover:bg-cpCoral/90 gap-2">
                      <Crown className="h-4 w-4" />
                      {locale === "nl" ? "Upgrade Nu" : locale === "de" ? "Jetzt Upgraden" : "Upgrade Now"}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-foreground dark:text-cpCream">
                <Building2 className="h-5 w-5 text-cpCoral" />
                {t.places}
              </CardTitle>
              <CardDescription className="dark:text-cpCream/60">
                {stats.verifiedListings} verified, {stats.premiumListings} premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${locale}/dashboard/business/${businessId}/places`}>
                <Button className="bg-cpCoral hover:bg-cpCoral/90 gap-2">
                  {t.viewPlaces}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-foreground dark:text-cpCream">
                <MessageSquare className="h-5 w-5 text-cpCoral" />
                {t.leads}
              </CardTitle>
              <CardDescription className="dark:text-cpCream/60">
                {stats.leadsLast7Days} new this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${locale}/dashboard/business/${businessId}/leads`}>
                <Button className="bg-cpCoral hover:bg-cpCoral/90 gap-2">
                  {t.viewLeads}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-foreground dark:text-cpCream">
                <Crown className="h-5 w-5 text-cpAmber" />
                {t.plan}
              </CardTitle>
              <CardDescription className="dark:text-cpCream/60">
                {getPlan((business.planKey as PlanKey) || "FREE").name} plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${locale}/dashboard/business/${businessId}/plan`}>
                <Button className="bg-cpAmber hover:bg-cpAmber/90 text-cpCharcoal gap-2">
                  {t.managePlan}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

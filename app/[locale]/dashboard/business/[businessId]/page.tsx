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
  getCreditBalance,
} from "@/db/queries";
import { getBusinessById } from "@/db/queries/businesses";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MessageSquare,
  CreditCard,
  Star,
  ArrowRight,
  Globe,
  Mail,
  Phone,
} from "lucide-react";

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

  // Get stats and credit balance
  const [stats, creditBalance] = await Promise.all([
    getBusinessStats(businessIdNum),
    getCreditBalance(businessIdNum),
  ]);

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
      credits: "Credits",
      creditsDesc: "Available balance",
      avgRating: "Average Rating",
      avgRatingDesc: "Based on reviews",
      viewPlaces: "View Places",
      viewLeads: "View Leads",
      viewCredits: "View Credits",
      noRating: "No reviews yet",
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
      credits: "Credits",
      creditsDesc: "Beschikbaar saldo",
      avgRating: "Gemiddelde Beoordeling",
      avgRatingDesc: "Gebaseerd op reviews",
      viewPlaces: "Bekijk Locaties",
      viewLeads: "Bekijk Leads",
      viewCredits: "Bekijk Credits",
      noRating: "Nog geen reviews",
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
      credits: "Guthaben",
      creditsDesc: "Verfügbares Guthaben",
      avgRating: "Durchschnittsbewertung",
      avgRatingDesc: "Basierend auf Bewertungen",
      viewPlaces: "Standorte anzeigen",
      viewLeads: "Leads anzeigen",
      viewCredits: "Guthaben anzeigen",
      noRating: "Noch keine Bewertungen",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <>
      <DashboardHeader
        title={t.overview}
        description={t.overviewDesc}
      />

      <div className="p-6 space-y-6">
        {/* Business Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-cpPink" />
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
                  <div className="w-20 h-20 rounded-xl bg-cpPink/10 flex items-center justify-center">
                    <Building2 className="h-10 w-10 text-cpPink" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-cpDark">{business.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{business.plan} plan</Badge>
                    <Badge
                      className={
                        business.status === "active"
                          ? "bg-cpAqua/20 text-cpAqua border-cpAqua"
                          : "bg-slate-100 text-slate-600"
                      }
                    >
                      {business.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  {business.website && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Globe className="h-4 w-4 text-cpPink" />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cpPink truncate"
                      >
                        {business.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {business.contactEmail && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="h-4 w-4 text-cpPink" />
                      <span className="truncate">{business.contactEmail}</span>
                    </div>
                  )}
                  {business.contactPhone && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="h-4 w-4 text-cpPink" />
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t.places}
              </CardTitle>
              <Building2 className="h-4 w-4 text-cpAqua" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cpDark">{stats.totalListings}</div>
              <p className="text-xs text-slate-500">{t.placesDesc}</p>
            </CardContent>
          </Card>

          {/* Leads */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t.leads}
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-cpPink" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cpDark">{stats.totalLeads}</div>
              <p className="text-xs text-slate-500">
                {stats.leadsLast30Days} {t.leadsLast30.toLowerCase()}
              </p>
            </CardContent>
          </Card>

          {/* Credits */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t.credits}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-cpYellow" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cpDark">
                ${(creditBalance.balanceCents / 100).toFixed(2)}
              </div>
              <p className="text-xs text-slate-500">{t.creditsDesc}</p>
            </CardContent>
          </Card>

          {/* Average Rating */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {t.avgRating}
              </CardTitle>
              <Star className="h-4 w-4 text-cpYellow" />
            </CardHeader>
            <CardContent>
              {stats.avgRating > 0 ? (
                <>
                  <div className="text-3xl font-bold text-cpDark">
                    {stats.avgRating.toFixed(1)}
                  </div>
                  <p className="text-xs text-slate-500">
                    {stats.totalReviews} reviews
                  </p>
                </>
              ) : (
                <>
                  <div className="text-xl font-bold text-slate-400">-</div>
                  <p className="text-xs text-slate-500">{t.noRating}</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-cpAqua" />
                {t.places}
              </CardTitle>
              <CardDescription>
                {stats.verifiedListings} verified, {stats.premiumListings} premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${locale}/dashboard/business/${businessId}/places`}>
                <Button className="bg-cpAqua hover:bg-cpAqua/90 gap-2">
                  {t.viewPlaces}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-cpPink" />
                {t.leads}
              </CardTitle>
              <CardDescription>
                {stats.leadsLast7Days} new this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${locale}/dashboard/business/${businessId}/leads`}>
                <Button className="bg-cpPink hover:bg-cpPink/90 gap-2">
                  {t.viewLeads}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-cpYellow" />
                {t.credits}
              </CardTitle>
              <CardDescription>
                ${(creditBalance.totalSpent / 100).toFixed(2)} spent total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${locale}/dashboard/business/${businessId}/credits`}>
                <Button variant="outline" className="gap-2">
                  {t.viewCredits}
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

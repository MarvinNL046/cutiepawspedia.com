/**
 * Business Advertising Page
 *
 * Upsell page for businesses to purchase ad campaigns.
 * Features:
 * - Package selection
 * - Active campaigns list
 * - Stripe checkout integration
 */

import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import {
  getUserByStackAuthId,
  getBusinessByIdForUser,
  getBusinessCampaigns,
  getAdPackages,
} from "@/db/queries";
import { getBusinessStatsByPlacement } from "@/db/queries/ads";
import { Button } from "@/components/ui/button";
import {
  Megaphone,
  Check,
  Zap,
  Eye,
  MousePointerClick,
  TrendingUp,
  Calendar,
  Star,
  ArrowRight,
  Plus,
  BookOpen,
  LayoutList,
  Search,
  Home,
  Sparkles,
  Target,
  Users,
  Info,
} from "lucide-react";

interface AdvertisingPageProps {
  params: Promise<{ locale: string; businessId: string }>;
}

export default async function AdvertisingPage({ params }: AdvertisingPageProps) {
  const { locale, businessId } = await params;
  const businessIdNum = parseInt(businessId, 10);

  // Auth check
  if (!stackServerApp) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground dark:text-cpCream/60">Authentication not configured.</p>
      </div>
    );
  }

  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business/${businessId}/advertising`);
  }

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) {
    redirect(`/handler/sign-in`);
  }

  // Get business (with admin bypass)
  let business;
  if (dbUser.role === "admin") {
    const { getBusinessById } = await import("@/db/queries/businesses");
    business = await getBusinessById(businessIdNum);
  } else {
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: dbUser.id });
  }

  if (!business) {
    notFound();
  }

  // Get packages, campaigns, and stats
  const [packages, campaigns, placementStats] = await Promise.all([
    getAdPackages(locale as "en" | "nl"),
    getBusinessCampaigns(businessIdNum),
    getBusinessStatsByPlacement(businessIdNum),
  ]);

  const isNl = locale === "nl";

  // Format price
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
    }).format(cents / 100);
  };

  // Placement info with icons, descriptions, and intent type
  const placementInfo: Record<string, {
    icon: React.ComponentType<{ className?: string }>;
    label: { en: string; nl: string };
    description: { en: string; nl: string };
    intent: "awareness" | "buyer";
    reach: string;
  }> = {
    blog_sidebar: {
      icon: BookOpen,
      label: { en: "Blog Sidebar", nl: "Blog Zijbalk" },
      description: {
        en: "Shown next to blog articles. Great for brand awareness while readers learn about pet care.",
        nl: "Getoond naast blogartikelen. Perfect voor naamsbekendheid terwijl lezers over dierenverzorging leren.",
      },
      intent: "awareness",
      reach: "~2K/week",
    },
    blog_inline: {
      icon: LayoutList,
      label: { en: "Blog In-Content", nl: "Blog In-Content" },
      description: {
        en: "Appears between paragraphs in blog posts. Higher visibility as readers scroll through content.",
        nl: "Verschijnt tussen paragrafen in blogposts. Hogere zichtbaarheid terwijl lezers door content scrollen.",
      },
      intent: "awareness",
      reach: "~3K/week",
    },
    directory_sidebar: {
      icon: LayoutList,
      label: { en: "Directory Sidebar", nl: "Directory Zijbalk" },
      description: {
        en: "Shown on service listing pages. Reaches people actively browsing pet services in their area.",
        nl: "Getoond op dienst-overzichtspagina's. Bereikt mensen die actief zoeken naar dierservices.",
      },
      intent: "buyer",
      reach: "~5K/week",
    },
    search_results: {
      icon: Search,
      label: { en: "Search Results", nl: "Zoekresultaten" },
      description: {
        en: "Featured in search results. High-intent placement - these visitors are actively looking for services!",
        nl: "Uitgelicht in zoekresultaten. Hoge koopintentie - deze bezoekers zoeken actief naar diensten!",
      },
      intent: "buyer",
      reach: "~4K/week",
    },
    homepage_featured: {
      icon: Home,
      label: { en: "Homepage Featured", nl: "Homepage Uitgelicht" },
      description: {
        en: "Premium spot on the homepage. Maximum visibility to all visitors entering the site.",
        nl: "Premium plek op de homepage. Maximale zichtbaarheid voor alle bezoekers.",
      },
      intent: "buyer",
      reach: "~8K/week",
    },
  };

  // Legacy labels for backwards compatibility
  const placementLabels: Record<string, { en: string; nl: string }> = Object.fromEntries(
    Object.entries(placementInfo).map(([key, info]) => [key, info.label])
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground dark:text-cpCream flex items-center gap-2">
              <Megaphone className="w-6 h-6 text-cpCoral" />
              {isNl ? "Adverteren" : "Advertising"}
            </h1>
            <p className="text-muted-foreground dark:text-cpCream/60 mt-1">
              {isNl
                ? "Bereik meer klanten met gesponsorde advertenties op onze website"
                : "Reach more customers with sponsored ads on our website"}
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-4">
            <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/60 text-sm">
              <Megaphone className="w-4 h-4" />
              {isNl ? "Actieve Campagnes" : "Active Campaigns"}
            </div>
            <p className="text-2xl font-bold text-foreground dark:text-cpCream mt-1">
              {campaigns.filter((c) => c.status === "active").length}
            </p>
          </div>
          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-4">
            <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/60 text-sm">
              <Eye className="w-4 h-4" />
              {isNl ? "Totaal Impressies" : "Total Impressions"}
            </div>
            <p className="text-2xl font-bold text-foreground dark:text-cpCream mt-1">
              {campaigns.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-4">
            <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/60 text-sm">
              <MousePointerClick className="w-4 h-4" />
              {isNl ? "Totaal Clicks" : "Total Clicks"}
            </div>
            <p className="text-2xl font-bold text-foreground dark:text-cpCream mt-1">
              {campaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-4">
            <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/60 text-sm">
              <TrendingUp className="w-4 h-4" />
              CTR
            </div>
            <p className="text-2xl font-bold text-foreground dark:text-cpCream mt-1">
              {(() => {
                const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
                const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
                return totalImpressions > 0
                  ? ((totalClicks / totalImpressions) * 100).toFixed(2) + "%"
                  : "0%";
              })()}
            </p>
          </div>
        </div>

        {/* Performance by Placement */}
        {placementStats.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cpCoral" />
              {isNl ? "Prestaties per Plaatsing" : "Performance by Placement"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {placementStats.map((stat) => {
                const info = placementInfo[stat.placement as keyof typeof placementInfo];
                const Icon = info?.icon || Eye;
                return (
                  <div
                    key={stat.placement}
                    className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        info?.intent === "buyer" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          info?.intent === "buyer" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground dark:text-cpCream text-sm">
                          {info?.label[isNl ? "nl" : "en"] || stat.placement}
                        </h3>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          info?.intent === "buyer"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        }`}>
                          {info?.intent === "buyer"
                            ? (isNl ? "Koopintentie" : "High Intent")
                            : (isNl ? "Awareness" : "Awareness")
                          }
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground dark:text-cpCream">
                          {Number(stat.impressions || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-cpCream/60">{isNl ? "Impressies" : "Views"}</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground dark:text-cpCream">
                          {Number(stat.clicks || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-cpCream/60">Clicks</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-cpCoral">
                          {stat.ctr ? Number(stat.ctr).toFixed(2) : "0.00"}%
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-cpCream/60">CTR</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Placements Explanation */}
        <div>
          <h2 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-cpCoral" />
            {isNl ? "Waar verschijnen je advertenties?" : "Where do your ads appear?"}
          </h2>

          {/* Intent type legend */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                <Sparkles className="w-3 h-3" />
                {isNl ? "Naamsbekendheid" : "Brand Awareness"}
              </span>
              <span className="text-muted-foreground dark:text-cpCream/60">
                {isNl ? "Lezers ontdekken je merk" : "Readers discover your brand"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                <Target className="w-3 h-3" />
                {isNl ? "Koopintentie" : "Buyer Intent"}
              </span>
              <span className="text-muted-foreground dark:text-cpCream/60">
                {isNl ? "Actief zoekend naar diensten" : "Actively looking for services"}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(placementInfo).map(([key, info]) => {
              const Icon = info.icon;
              return (
                <div
                  key={key}
                  className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      info.intent === "buyer" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        info.intent === "buyer" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-foreground dark:text-cpCream">
                          {info.label[isNl ? "nl" : "en"]}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          info.intent === "buyer"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        }`}>
                          {info.intent === "buyer"
                            ? (isNl ? "Koopintentie" : "High Intent")
                            : (isNl ? "Awareness" : "Awareness")
                          }
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-1">
                        {info.description[isNl ? "nl" : "en"]}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground dark:text-cpCream/60">
                        <Users className="w-3 h-3" />
                        {isNl ? "Bereik:" : "Reach:"} {info.reach}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Packages Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cpCoral" />
            {isNl ? "Advertentiepakketten" : "Advertising Packages"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-card dark:bg-cpSurface/50 rounded-2xl border-2 p-6 relative transition-all hover:shadow-lg ${
                    pkg.isPopular
                      ? "border-cpCoral shadow-md"
                      : "border-border dark:border-cpAmber/20 hover:border-cpCoral/50"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-cpCoral text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {isNl ? "Populair" : "Popular"}
                      </span>
                    </div>
                  )}

                  <h3 className="font-bold text-lg text-foreground dark:text-cpCream">{String(pkg.name)}</h3>
                  <p className="text-muted-foreground dark:text-cpCream/60 text-sm mt-1 min-h-[40px]">
                    {pkg.description ? String(pkg.description) : ""}
                  </p>

                  <div className="mt-4">
                    <span className="text-3xl font-bold text-foreground dark:text-cpCream">
                      {formatPrice(pkg.priceCents)}
                    </span>
                    <span className="text-muted-foreground dark:text-cpCream/60 text-sm">
                      / {pkg.durationDays} {isNl ? "dagen" : "days"}
                    </span>
                  </div>

                  {/* Placements */}
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground dark:text-cpCream/60 uppercase">
                      {isNl ? "Plaatsingen:" : "Placements:"}
                    </p>
                    {pkg.includedPlacements.split(",").map((placement) => {
                      const info = placementInfo[placement];
                      const PlacementIcon = info?.icon || Check;
                      return (
                        <div key={placement} className="flex items-center gap-2 text-sm">
                          <PlacementIcon className={`w-4 h-4 ${
                            info?.intent === "buyer" ? "text-green-500" : "text-blue-500"
                          }`} />
                          <span className="text-foreground/80 dark:text-cpCream/80">
                            {info?.label[isNl ? "nl" : "en"] || placement}
                          </span>
                          {info?.intent === "buyer" && (
                            <Target className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                      );
                    })}
                    {pkg.maxImpressions && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-cpCream/60">
                        <Eye className="w-4 h-4" />
                        {isNl ? "Tot" : "Up to"} {pkg.maxImpressions.toLocaleString()} {isNl ? "impressies" : "impressions"}
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/${locale}/dashboard/business/${businessId}/advertising/new?package=${pkg.key}`}
                  >
                    <Button
                      className={`w-full mt-6 gap-2 ${
                        pkg.isPopular
                          ? "bg-cpCoral hover:bg-cpCoral/90"
                          : "bg-foreground dark:bg-cpCream text-background dark:text-cpCharcoal hover:bg-foreground/90 dark:hover:bg-cpCream/90"
                      }`}
                    >
                      {isNl ? "Selecteer" : "Select"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              /* Default packages if none in DB */
              <>
                <DefaultPackageCard
                  name={isNl ? "Starter" : "Starter"}
                  price="29"
                  duration={7}
                  placements={["blog_sidebar"]}
                  isNl={isNl}
                  locale={locale}
                  businessId={businessId}
                />
                <DefaultPackageCard
                  name={isNl ? "Groei" : "Growth"}
                  price="79"
                  duration={30}
                  placements={["blog_sidebar", "blog_inline", "search_results"]}
                  isPopular
                  isNl={isNl}
                  locale={locale}
                  businessId={businessId}
                />
                <DefaultPackageCard
                  name={isNl ? "Premium" : "Premium"}
                  price="149"
                  duration={30}
                  placements={["blog_sidebar", "blog_inline", "directory_sidebar", "search_results", "homepage_featured"]}
                  isNl={isNl}
                  locale={locale}
                  businessId={businessId}
                />
              </>
            )}
          </div>
        </div>

        {/* Active Campaigns */}
        <div>
          <h2 className="text-lg font-semibold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cpCoral" />
            {isNl ? "Jouw Campagnes" : "Your Campaigns"}
          </h2>

          {campaigns.length > 0 ? (
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-muted dark:bg-cpCharcoal border-b border-border dark:border-cpAmber/20">
                  <tr>
                    <th className="text-left text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      {isNl ? "Campagne" : "Campaign"}
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      Status
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      {isNl ? "Periode" : "Period"}
                    </th>
                    <th className="text-right text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      {isNl ? "Impressies" : "Impressions"}
                    </th>
                    <th className="text-right text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      Clicks
                    </th>
                    <th className="text-right text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      CTR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => {
                    const formatDate = (date: Date | null) => {
                      if (!date) return "-";
                      return new Intl.DateTimeFormat(locale, {
                        day: "numeric",
                        month: "short",
                      }).format(date);
                    };

                    const isExpired = campaign.endsAt && new Date(campaign.endsAt) < new Date();
                    const daysLeft = campaign.endsAt
                      ? Math.max(0, Math.ceil((new Date(campaign.endsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                      : null;

                    return (
                      <tr key={campaign.id} className="border-b border-border dark:border-cpAmber/10 last:border-b-0 hover:bg-muted/50 dark:hover:bg-cpAmber/10">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground dark:text-cpCream">{campaign.name}</p>
                            <p className="text-xs text-muted-foreground dark:text-cpCream/60">{campaign.headline}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={campaign.status} isNl={isNl} />
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p className="text-foreground/80 dark:text-cpCream/80">
                              {formatDate(campaign.startsAt)} - {formatDate(campaign.endsAt)}
                            </p>
                            {campaign.status === "active" && daysLeft !== null && !isExpired && (
                              <p className={`text-xs ${daysLeft <= 3 ? "text-orange-500 dark:text-orange-400 font-medium" : "text-muted-foreground dark:text-cpCream/60"}`}>
                                {daysLeft === 0
                                  ? (isNl ? "Laatste dag!" : "Last day!")
                                  : `${daysLeft} ${isNl ? "dagen over" : "days left"}`
                                }
                              </p>
                            )}
                            {isExpired && campaign.status === "active" && (
                              <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                                {isNl ? "Verlopen" : "Expired"}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-medium text-foreground dark:text-cpCream">{campaign.impressions.toLocaleString()}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-medium text-foreground dark:text-cpCream">{campaign.clicks.toLocaleString()}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`font-medium ${
                            campaign.impressions > 0 && (campaign.clicks / campaign.impressions) >= 0.02
                              ? "text-green-600 dark:text-green-400"
                              : "text-foreground dark:text-cpCream"
                          }`}>
                            {campaign.impressions > 0
                              ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) + "%"
                              : "0%"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty state when no campaigns */
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted dark:bg-cpAmber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Megaphone className="w-8 h-8 text-muted-foreground dark:text-cpCream/50" />
                </div>
                <h3 className="text-lg font-semibold text-foreground dark:text-cpCream mb-2">
                  {isNl ? "Nog geen campagnes" : "No campaigns yet"}
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/60 mb-4">
                  {isNl
                    ? "Start je eerste advertentiecampagne en bereik duizenden huisdiereigenaren."
                    : "Start your first ad campaign and reach thousands of pet owners."}
                </p>
                <div className="bg-muted dark:bg-cpCharcoal/50 rounded-lg p-4 text-left mb-4">
                  <p className="text-sm text-foreground/80 dark:text-cpCream/70 mb-2 font-medium">
                    {isNl ? "Wat je zult zien:" : "What you'll see:"}
                  </p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/60 space-y-1">
                    <li className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-cpCoral" />
                      {isNl ? "Real-time impressies & clicks" : "Real-time impressions & clicks"}
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cpCoral" />
                      {isNl ? "CTR per plaatsing" : "CTR per placement"}
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cpCoral" />
                      {isNl ? "Campagneduur & countdown" : "Campaign duration & countdown"}
                    </li>
                  </ul>
                </div>
                <Link href={`/${locale}/dashboard/business/${businessId}/advertising/new`}>
                  <Button className="bg-cpCoral hover:bg-cpCoral/90 gap-2">
                    <Plus className="w-4 h-4" />
                    {isNl ? "Start Eerste Campagne" : "Start First Campaign"}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* CTA for new campaign */}
        <div className="bg-gradient-to-r from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20 rounded-2xl p-6 md:p-8 text-center border border-cpCoral/20 dark:border-cpAmber/20">
          <Megaphone className="w-12 h-12 text-cpCoral mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
            {isNl ? "Klaar om meer klanten te bereiken?" : "Ready to reach more customers?"}
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/60 mb-4 max-w-md mx-auto">
            {isNl
              ? "Start vandaag nog met adverteren en laat jouw bedrijf groeien!"
              : "Start advertising today and grow your business!"}
          </p>
          <Link href={`/${locale}/dashboard/business/${businessId}/advertising/new`}>
            <Button className="bg-cpCoral hover:bg-cpCoral/90 gap-2">
              <Plus className="w-4 h-4" />
              {isNl ? "Nieuwe Campagne Starten" : "Start New Campaign"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Default package card component
function DefaultPackageCard({
  name,
  price,
  duration,
  placements,
  isPopular,
  isNl,
  locale,
  businessId,
}: {
  name: string;
  price: string;
  duration: number;
  placements: string[];
  isPopular?: boolean;
  isNl: boolean;
  locale: string;
  businessId: string;
}) {
  // Inline placement labels for fallback
  const labels: Record<string, { en: string; nl: string }> = {
    blog_sidebar: { en: "Blog Sidebar", nl: "Blog Zijbalk" },
    blog_inline: { en: "Blog In-Content", nl: "Blog In-Content" },
    directory_sidebar: { en: "Directory Sidebar", nl: "Directory Zijbalk" },
    search_results: { en: "Search Results", nl: "Zoekresultaten" },
    homepage_featured: { en: "Homepage Featured", nl: "Homepage Uitgelicht" },
  };

  const intentMap: Record<string, "buyer" | "awareness"> = {
    blog_sidebar: "awareness",
    blog_inline: "awareness",
    directory_sidebar: "buyer",
    search_results: "buyer",
    homepage_featured: "buyer",
  };

  return (
    <div
      className={`bg-card dark:bg-cpSurface/50 rounded-2xl border-2 p-6 relative transition-all hover:shadow-lg ${
        isPopular ? "border-cpCoral shadow-md" : "border-border dark:border-cpAmber/20 hover:border-cpCoral/50"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-cpCoral text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            {isNl ? "Populair" : "Popular"}
          </span>
        </div>
      )}

      <h3 className="font-bold text-lg text-foreground dark:text-cpCream">{name}</h3>

      <div className="mt-4">
        <span className="text-3xl font-bold text-foreground dark:text-cpCream">€{price}</span>
        <span className="text-muted-foreground dark:text-cpCream/60 text-sm">
          / {duration} {isNl ? "dagen" : "days"}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-medium text-muted-foreground dark:text-cpCream/60 uppercase">
          {isNl ? "Plaatsingen:" : "Placements:"}
        </p>
        {placements.map((placement) => {
          const intent = intentMap[placement];
          return (
            <div key={placement} className="flex items-center gap-2 text-sm">
              <Check className={`w-4 h-4 ${
                intent === "buyer" ? "text-green-500" : "text-blue-500"
              }`} />
              <span className="text-foreground/80 dark:text-cpCream/80">
                {labels[placement]?.[isNl ? "nl" : "en"] || placement}
              </span>
              {intent === "buyer" && (
                <Target className="w-3 h-3 text-green-500" />
              )}
            </div>
          );
        })}
      </div>

      <Link href={`/${locale}/dashboard/business/${businessId}/advertising/new?package=${name.toLowerCase()}`}>
        <Button
          className={`w-full mt-6 gap-2 ${
            isPopular ? "bg-cpCoral hover:bg-cpCoral/90" : "bg-foreground dark:bg-cpCream text-background dark:text-cpCharcoal hover:bg-foreground/90 dark:hover:bg-cpCream/90"
          }`}
        >
          {isNl ? "Selecteer" : "Select"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}

// Status badge component
function StatusBadge({ status, isNl }: { status: string; isNl: boolean }) {
  const statusStyles: Record<string, string> = {
    draft: "bg-muted text-muted-foreground dark:bg-cpSurface dark:text-cpCream/70",
    pending_payment: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    paused: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const statusLabels: Record<string, { en: string; nl: string }> = {
    draft: { en: "Draft", nl: "Concept" },
    pending_payment: { en: "Pending", nl: "Wachtend" },
    active: { en: "Active", nl: "Actief" },
    paused: { en: "Paused", nl: "Gepauzeerd" },
    completed: { en: "Completed", nl: "Voltooid" },
    cancelled: { en: "Cancelled", nl: "Geannuleerd" },
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[status] || "bg-muted dark:bg-cpSurface"}`}>
      {statusLabels[status]?.[isNl ? "nl" : "en"] || status}
    </span>
  );
}

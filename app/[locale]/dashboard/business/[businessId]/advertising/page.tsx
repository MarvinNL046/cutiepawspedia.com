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

  // Localization labels
  const labels = {
    en: {
      advertising: "Advertising",
      advertisingDesc: "Reach more customers with sponsored ads on our website",
      activeCampaigns: "Active Campaigns",
      totalImpressions: "Total Impressions",
      totalClicks: "Total Clicks",
      performanceByPlacement: "Performance by Placement",
      whereAdsAppear: "Where do your ads appear?",
      brandAwareness: "Brand Awareness",
      readersDiscover: "Readers discover your brand",
      buyerIntent: "Buyer Intent",
      activelyLooking: "Actively looking for services",
      advertisingPackages: "Advertising Packages",
      popular: "Popular",
      placements: "Placements:",
      upTo: "Up to",
      impressions: "impressions",
      select: "Select",
      yourCampaigns: "Your Campaigns",
      campaign: "Campaign",
      period: "Period",
      noCampaigns: "No campaigns yet",
      noCampaignsDesc: "Start your first ad campaign and reach thousands of pet owners.",
      whatYouSee: "What you'll see:",
      realTimeStats: "Real-time impressions & clicks",
      ctrPerPlacement: "CTR per placement",
      campaignDuration: "Campaign duration & countdown",
      startFirstCampaign: "Start First Campaign",
      readyToReach: "Ready to reach more customers?",
      startToday: "Start advertising today and grow your business!",
      startNewCampaign: "Start New Campaign",
      days: "days",
      daysLeft: "days left",
      lastDay: "Last day!",
      expired: "Expired",
      views: "Views",
      reach: "Reach:",
      highIntent: "High Intent",
      awareness: "Awareness",
    },
    nl: {
      advertising: "Adverteren",
      advertisingDesc: "Bereik meer klanten met gesponsorde advertenties op onze website",
      activeCampaigns: "Actieve Campagnes",
      totalImpressions: "Totaal Impressies",
      totalClicks: "Totaal Clicks",
      performanceByPlacement: "Prestaties per Plaatsing",
      whereAdsAppear: "Waar verschijnen je advertenties?",
      brandAwareness: "Naamsbekendheid",
      readersDiscover: "Lezers ontdekken je merk",
      buyerIntent: "Koopintentie",
      activelyLooking: "Actief zoekend naar diensten",
      advertisingPackages: "Advertentiepakketten",
      popular: "Populair",
      placements: "Plaatsingen:",
      upTo: "Tot",
      impressions: "impressies",
      select: "Selecteer",
      yourCampaigns: "Jouw Campagnes",
      campaign: "Campagne",
      period: "Periode",
      noCampaigns: "Nog geen campagnes",
      noCampaignsDesc: "Start je eerste advertentiecampagne en bereik duizenden huisdiereigenaren.",
      whatYouSee: "Wat je zult zien:",
      realTimeStats: "Real-time impressies & clicks",
      ctrPerPlacement: "CTR per plaatsing",
      campaignDuration: "Campagneduur & countdown",
      startFirstCampaign: "Start Eerste Campagne",
      readyToReach: "Klaar om meer klanten te bereiken?",
      startToday: "Start vandaag nog met adverteren en laat jouw bedrijf groeien!",
      startNewCampaign: "Nieuwe Campagne Starten",
      days: "dagen",
      daysLeft: "dagen over",
      lastDay: "Laatste dag!",
      expired: "Verlopen",
      views: "Impressies",
      reach: "Bereik:",
      highIntent: "Koopintentie",
      awareness: "Awareness",
    },
    de: {
      advertising: "Werbung",
      advertisingDesc: "Erreichen Sie mehr Kunden mit gesponserten Anzeigen auf unserer Website",
      activeCampaigns: "Aktive Kampagnen",
      totalImpressions: "Gesamte Impressionen",
      totalClicks: "Gesamte Klicks",
      performanceByPlacement: "Leistung nach Platzierung",
      whereAdsAppear: "Wo erscheinen Ihre Anzeigen?",
      brandAwareness: "Markenbekanntheit",
      readersDiscover: "Leser entdecken Ihre Marke",
      buyerIntent: "Kaufabsicht",
      activelyLooking: "Aktiv nach Diensten suchend",
      advertisingPackages: "Werbepakete",
      popular: "Beliebt",
      placements: "Platzierungen:",
      upTo: "Bis zu",
      impressions: "Impressionen",
      select: "Auswählen",
      yourCampaigns: "Ihre Kampagnen",
      campaign: "Kampagne",
      period: "Zeitraum",
      noCampaigns: "Noch keine Kampagnen",
      noCampaignsDesc: "Starten Sie Ihre erste Werbekampagne und erreichen Sie Tausende von Tierbesitzern.",
      whatYouSee: "Was Sie sehen werden:",
      realTimeStats: "Echtzeit-Impressionen & Klicks",
      ctrPerPlacement: "CTR pro Platzierung",
      campaignDuration: "Kampagnendauer & Countdown",
      startFirstCampaign: "Erste Kampagne Starten",
      readyToReach: "Bereit, mehr Kunden zu erreichen?",
      startToday: "Starten Sie noch heute mit der Werbung und lassen Sie Ihr Unternehmen wachsen!",
      startNewCampaign: "Neue Kampagne Starten",
      days: "Tage",
      daysLeft: "Tage übrig",
      lastDay: "Letzter Tag!",
      expired: "Abgelaufen",
      views: "Aufrufe",
      reach: "Reichweite:",
      highIntent: "Hohe Absicht",
      awareness: "Bekanntheit",
    },
    fr: {
      advertising: "Publicité",
      advertisingDesc: "Atteignez plus de clients avec des annonces sponsorisées sur notre site",
      activeCampaigns: "Campagnes Actives",
      totalImpressions: "Impressions Totales",
      totalClicks: "Clics Totaux",
      performanceByPlacement: "Performance par Emplacement",
      whereAdsAppear: "Où apparaissent vos annonces ?",
      brandAwareness: "Notoriété de marque",
      readersDiscover: "Les lecteurs découvrent votre marque",
      buyerIntent: "Intention d'achat",
      activelyLooking: "Recherche active de services",
      advertisingPackages: "Forfaits Publicitaires",
      popular: "Populaire",
      placements: "Emplacements :",
      upTo: "Jusqu'à",
      impressions: "impressions",
      select: "Sélectionner",
      yourCampaigns: "Vos Campagnes",
      campaign: "Campagne",
      period: "Période",
      noCampaigns: "Pas encore de campagnes",
      noCampaignsDesc: "Lancez votre première campagne publicitaire et atteignez des milliers de propriétaires d'animaux.",
      whatYouSee: "Ce que vous verrez :",
      realTimeStats: "Impressions et clics en temps réel",
      ctrPerPlacement: "CTR par emplacement",
      campaignDuration: "Durée de la campagne et compte à rebours",
      startFirstCampaign: "Lancer la Première Campagne",
      readyToReach: "Prêt à atteindre plus de clients ?",
      startToday: "Commencez à faire de la publicité aujourd'hui et développez votre entreprise !",
      startNewCampaign: "Lancer une Nouvelle Campagne",
      days: "jours",
      daysLeft: "jours restants",
      lastDay: "Dernier jour !",
      expired: "Expiré",
      views: "Vues",
      reach: "Portée :",
      highIntent: "Forte Intention",
      awareness: "Notoriété",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

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
    label: { en: string; nl: string; de: string; fr: string };
    description: { en: string; nl: string; de: string; fr: string };
    intent: "awareness" | "buyer";
    reach: string;
  }> = {
    blog_sidebar: {
      icon: BookOpen,
      label: { en: "Blog Sidebar", nl: "Blog Zijbalk", de: "Blog-Seitenleiste", fr: "Barre latérale du blog" },
      description: {
        en: "Shown next to blog articles. Great for brand awareness while readers learn about pet care.",
        nl: "Getoond naast blogartikelen. Perfect voor naamsbekendheid terwijl lezers over dierenverzorging leren.",
        de: "Neben Blog-Artikeln angezeigt. Ideal für Markenbekanntheit während Leser über Tierpflege lernen.",
        fr: "Affiché à côté des articles du blog. Idéal pour la notoriété de marque pendant que les lecteurs découvrent les soins aux animaux.",
      },
      intent: "awareness",
      reach: "~2K/week",
    },
    blog_inline: {
      icon: LayoutList,
      label: { en: "Blog In-Content", nl: "Blog In-Content", de: "Blog Im-Inhalt", fr: "Blog Dans le Contenu" },
      description: {
        en: "Appears between paragraphs in blog posts. Higher visibility as readers scroll through content.",
        nl: "Verschijnt tussen paragrafen in blogposts. Hogere zichtbaarheid terwijl lezers door content scrollen.",
        de: "Erscheint zwischen Absätzen in Blog-Posts. Höhere Sichtbarkeit beim Scrollen durch den Inhalt.",
        fr: "Apparaît entre les paragraphes des articles. Plus grande visibilité lorsque les lecteurs font défiler le contenu.",
      },
      intent: "awareness",
      reach: "~3K/week",
    },
    directory_sidebar: {
      icon: LayoutList,
      label: { en: "Directory Sidebar", nl: "Directory Zijbalk", de: "Verzeichnis-Seitenleiste", fr: "Barre latérale annuaire" },
      description: {
        en: "Shown on service listing pages. Reaches people actively browsing pet services in their area.",
        nl: "Getoond op dienst-overzichtspagina's. Bereikt mensen die actief zoeken naar dierservices.",
        de: "Auf Service-Listenseiten angezeigt. Erreicht Menschen, die aktiv nach Tierdienstleistungen suchen.",
        fr: "Affiché sur les pages de liste de services. Atteint les personnes recherchant activement des services pour animaux.",
      },
      intent: "buyer",
      reach: "~5K/week",
    },
    search_results: {
      icon: Search,
      label: { en: "Search Results", nl: "Zoekresultaten", de: "Suchergebnisse", fr: "Résultats de recherche" },
      description: {
        en: "Featured in search results. High-intent placement - these visitors are actively looking for services!",
        nl: "Uitgelicht in zoekresultaten. Hoge koopintentie - deze bezoekers zoeken actief naar diensten!",
        de: "In Suchergebnissen hervorgehoben. Hohe Kaufabsicht - diese Besucher suchen aktiv nach Diensten!",
        fr: "Mis en avant dans les résultats de recherche. Forte intention d'achat - ces visiteurs recherchent activement des services !",
      },
      intent: "buyer",
      reach: "~4K/week",
    },
    homepage_featured: {
      icon: Home,
      label: { en: "Homepage Featured", nl: "Homepage Uitgelicht", de: "Homepage Hervorgehoben", fr: "Page d'accueil en vedette" },
      description: {
        en: "Premium spot on the homepage. Maximum visibility to all visitors entering the site.",
        nl: "Premium plek op de homepage. Maximale zichtbaarheid voor alle bezoekers.",
        de: "Premium-Platz auf der Homepage. Maximale Sichtbarkeit für alle Website-Besucher.",
        fr: "Emplacement premium sur la page d'accueil. Visibilité maximale pour tous les visiteurs du site.",
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
              {t.advertising}
            </h1>
            <p className="text-muted-foreground dark:text-cpCream/60 mt-1">
              {t.advertisingDesc}
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-4">
            <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/60 text-sm">
              <Megaphone className="w-4 h-4" />
              {t.activeCampaigns}
            </div>
            <p className="text-2xl font-bold text-foreground dark:text-cpCream mt-1">
              {campaigns.filter((c) => c.status === "active").length}
            </p>
          </div>
          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-4">
            <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/60 text-sm">
              <Eye className="w-4 h-4" />
              {t.totalImpressions}
            </div>
            <p className="text-2xl font-bold text-foreground dark:text-cpCream mt-1">
              {campaigns.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-4">
            <div className="flex items-center gap-2 text-muted-foreground dark:text-cpCream/60 text-sm">
              <MousePointerClick className="w-4 h-4" />
              {t.totalClicks}
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
              {t.performanceByPlacement}
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
                          {info?.label[locale as keyof typeof info.label] || info?.label.en || stat.placement}
                        </h3>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          info?.intent === "buyer"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        }`}>
                          {info?.intent === "buyer" ? t.highIntent : t.awareness}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground dark:text-cpCream">
                          {Number(stat.impressions || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-cpCream/60">{t.views}</p>
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
            {t.whereAdsAppear}
          </h2>

          {/* Intent type legend */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                <Sparkles className="w-3 h-3" />
                {t.brandAwareness}
              </span>
              <span className="text-muted-foreground dark:text-cpCream/60">
                {t.readersDiscover}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                <Target className="w-3 h-3" />
                {t.buyerIntent}
              </span>
              <span className="text-muted-foreground dark:text-cpCream/60">
                {t.activelyLooking}
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
                          {info.label[locale as keyof typeof info.label] || info.label.en}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          info.intent === "buyer"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        }`}>
                          {info.intent === "buyer" ? t.highIntent : t.awareness}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-1">
                        {info.description[locale as keyof typeof info.description] || info.description.en}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground dark:text-cpCream/60">
                        <Users className="w-3 h-3" />
                        {t.reach} {info.reach}
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
            {t.advertisingPackages}
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
                        {t.popular}
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
                      / {pkg.durationDays} {t.days}
                    </span>
                  </div>

                  {/* Placements */}
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground dark:text-cpCream/60 uppercase">
                      {t.placements}
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
                            {info?.label[locale as keyof typeof info.label] || info?.label.en || placement}
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
                        {t.upTo} {pkg.maxImpressions.toLocaleString()} {t.impressions}
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
                      {t.select}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              /* Default packages if none in DB */
              <>
                <DefaultPackageCard
                  name={locale === "nl" ? "Starter" : locale === "de" ? "Starter" : locale === "fr" ? "Démarrage" : "Starter"}
                  price="29"
                  duration={7}
                  placements={["blog_sidebar"]}
                  locale={locale}
                  businessId={businessId}
                />
                <DefaultPackageCard
                  name={locale === "nl" ? "Groei" : locale === "de" ? "Wachstum" : locale === "fr" ? "Croissance" : "Growth"}
                  price="79"
                  duration={30}
                  placements={["blog_sidebar", "blog_inline", "search_results"]}
                  isPopular
                  locale={locale}
                  businessId={businessId}
                />
                <DefaultPackageCard
                  name="Premium"
                  price="149"
                  duration={30}
                  placements={["blog_sidebar", "blog_inline", "directory_sidebar", "search_results", "homepage_featured"]}
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
            {t.yourCampaigns}
          </h2>

          {campaigns.length > 0 ? (
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-muted dark:bg-cpCharcoal border-b border-border dark:border-cpAmber/20">
                  <tr>
                    <th className="text-left text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      {t.campaign}
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      Status
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      {t.period}
                    </th>
                    <th className="text-right text-sm font-medium text-muted-foreground dark:text-cpCream/70 p-4">
                      {t.views}
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
                          <StatusBadge status={campaign.status} locale={locale} />
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <p className="text-foreground/80 dark:text-cpCream/80">
                              {formatDate(campaign.startsAt)} - {formatDate(campaign.endsAt)}
                            </p>
                            {campaign.status === "active" && daysLeft !== null && !isExpired && (
                              <p className={`text-xs ${daysLeft <= 3 ? "text-orange-500 dark:text-orange-400 font-medium" : "text-muted-foreground dark:text-cpCream/60"}`}>
                                {daysLeft === 0
                                  ? t.lastDay
                                  : `${daysLeft} ${t.daysLeft}`
                                }
                              </p>
                            )}
                            {isExpired && campaign.status === "active" && (
                              <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                                {t.expired}
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
                  {t.noCampaigns}
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/60 mb-4">
                  {t.noCampaignsDesc}
                </p>
                <div className="bg-muted dark:bg-cpCharcoal/50 rounded-lg p-4 text-left mb-4">
                  <p className="text-sm text-foreground/80 dark:text-cpCream/70 mb-2 font-medium">
                    {t.whatYouSee}
                  </p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/60 space-y-1">
                    <li className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-cpCoral" />
                      {t.realTimeStats}
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cpCoral" />
                      {t.ctrPerPlacement}
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cpCoral" />
                      {t.campaignDuration}
                    </li>
                  </ul>
                </div>
                <Link href={`/${locale}/dashboard/business/${businessId}/advertising/new`}>
                  <Button className="bg-cpCoral hover:bg-cpCoral/90 gap-2">
                    <Plus className="w-4 h-4" />
                    {t.startFirstCampaign}
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
            {t.readyToReach}
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/60 mb-4 max-w-md mx-auto">
            {t.startToday}
          </p>
          <Link href={`/${locale}/dashboard/business/${businessId}/advertising/new`}>
            <Button className="bg-cpCoral hover:bg-cpCoral/90 gap-2">
              <Plus className="w-4 h-4" />
              {t.startNewCampaign}
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
  locale,
  businessId,
}: {
  name: string;
  price: string;
  duration: number;
  placements: string[];
  isPopular?: boolean;
  locale: string;
  businessId: string;
}) {
  // Inline placement labels for fallback
  const placementLabels: Record<string, { en: string; nl: string; de: string; fr: string }> = {
    blog_sidebar: { en: "Blog Sidebar", nl: "Blog Zijbalk", de: "Blog-Seitenleiste", fr: "Barre latérale du blog" },
    blog_inline: { en: "Blog In-Content", nl: "Blog In-Content", de: "Blog Im-Inhalt", fr: "Blog Dans le Contenu" },
    directory_sidebar: { en: "Directory Sidebar", nl: "Directory Zijbalk", de: "Verzeichnis-Seitenleiste", fr: "Barre latérale annuaire" },
    search_results: { en: "Search Results", nl: "Zoekresultaten", de: "Suchergebnisse", fr: "Résultats de recherche" },
    homepage_featured: { en: "Homepage Featured", nl: "Homepage Uitgelicht", de: "Homepage Hervorgehoben", fr: "Page d'accueil en vedette" },
  };

  const intentMap: Record<string, "buyer" | "awareness"> = {
    blog_sidebar: "awareness",
    blog_inline: "awareness",
    directory_sidebar: "buyer",
    search_results: "buyer",
    homepage_featured: "buyer",
  };

  const cardLabels = {
    en: { popular: "Popular", days: "days", placements: "Placements:", select: "Select" },
    nl: { popular: "Populair", days: "dagen", placements: "Plaatsingen:", select: "Selecteer" },
    de: { popular: "Beliebt", days: "Tage", placements: "Platzierungen:", select: "Auswählen" },
    fr: { popular: "Populaire", days: "jours", placements: "Emplacements :", select: "Sélectionner" },
  };
  const t = cardLabels[locale as keyof typeof cardLabels] || cardLabels.en;

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
            {t.popular}
          </span>
        </div>
      )}

      <h3 className="font-bold text-lg text-foreground dark:text-cpCream">{name}</h3>

      <div className="mt-4">
        <span className="text-3xl font-bold text-foreground dark:text-cpCream">€{price}</span>
        <span className="text-muted-foreground dark:text-cpCream/60 text-sm">
          / {duration} {t.days}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-medium text-muted-foreground dark:text-cpCream/60 uppercase">
          {t.placements}
        </p>
        {placements.map((placement) => {
          const intent = intentMap[placement];
          return (
            <div key={placement} className="flex items-center gap-2 text-sm">
              <Check className={`w-4 h-4 ${
                intent === "buyer" ? "text-green-500" : "text-blue-500"
              }`} />
              <span className="text-foreground/80 dark:text-cpCream/80">
                {placementLabels[placement]?.[locale as keyof typeof placementLabels[string]] || placementLabels[placement]?.en || placement}
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
          {t.select}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}

// Status badge component
function StatusBadge({ status, locale }: { status: string; locale: string }) {
  const statusStyles: Record<string, string> = {
    draft: "bg-muted text-muted-foreground dark:bg-cpSurface dark:text-cpCream/70",
    pending_payment: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    paused: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const statusLabels: Record<string, { en: string; nl: string; de: string; fr: string }> = {
    draft: { en: "Draft", nl: "Concept", de: "Entwurf", fr: "Brouillon" },
    pending_payment: { en: "Pending", nl: "Wachtend", de: "Ausstehend", fr: "En attente" },
    active: { en: "Active", nl: "Actief", de: "Aktiv", fr: "Actif" },
    paused: { en: "Paused", nl: "Gepauzeerd", de: "Pausiert", fr: "En pause" },
    completed: { en: "Completed", nl: "Voltooid", de: "Abgeschlossen", fr: "Terminé" },
    cancelled: { en: "Cancelled", nl: "Geannuleerd", de: "Storniert", fr: "Annulé" },
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[status] || "bg-muted dark:bg-cpSurface"}`}>
      {statusLabels[status]?.[locale as keyof typeof statusLabels[string]] || statusLabels[status]?.en || status}
    </span>
  );
}

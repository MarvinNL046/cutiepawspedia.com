"use client";

/**
 * Analytics Dashboard Component
 *
 * Displays analytics data with charts and statistics.
 * Features depend on plan level (basic vs advanced analytics).
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Eye,
  Mail,
  TrendingUp,
  TrendingDown,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Loader2,
  AlertCircle,
  Crown,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanKey } from "@/lib/plans/config";

interface BasicAnalytics {
  totalViews: number;
  totalLeads: number;
  thisMonthViews: number;
  thisMonthLeads: number;
  lastMonthViews: number;
  lastMonthLeads: number;
}

interface DailyData {
  date: string;
  views?: number;
  leads?: number;
}

interface BreakdownItem {
  device?: string;
  source?: string;
  count: number;
  percentage: number;
}

interface PlaceAnalyticsItem {
  placeId: number;
  placeName: string;
  views: number;
  leads: number;
}

interface AdvancedAnalytics {
  dailyViews: DailyData[];
  dailyLeads: DailyData[];
  deviceBreakdown: BreakdownItem[];
  sourceBreakdown: BreakdownItem[];
  placeAnalytics: PlaceAnalyticsItem[];
  conversionRate: number;
  days: number;
}

interface AnalyticsDashboardProps {
  businessId: number;
  planKey: PlanKey;
  locale: string;
}

const labels = {
  en: {
    title: "Analytics",
    description: "Track your business performance",
    totalViews: "Total Views",
    totalLeads: "Total Leads",
    thisMonth: "This Month",
    lastMonth: "Last Month",
    views: "Views",
    leads: "Leads",
    change: "change",
    noData: "No data available yet",
    loading: "Loading analytics...",
    error: "Failed to load analytics",
    conversionRate: "Conversion Rate",
    deviceBreakdown: "Device Breakdown",
    sourceBreakdown: "Traffic Sources",
    placePerformance: "Place Performance",
    upgradeTitle: "Upgrade for Advanced Analytics",
    upgradeDescription: "Get detailed charts, trends, and conversion insights",
    upgradeButton: "Upgrade to Pro",
    last30Days: "Last 30 days",
    desktop: "Desktop",
    mobile: "Mobile",
    tablet: "Tablet",
    unknown: "Unknown",
  },
  nl: {
    title: "Statistieken",
    description: "Volg de prestaties van je bedrijf",
    totalViews: "Totaal Weergaven",
    totalLeads: "Totaal Leads",
    thisMonth: "Deze Maand",
    lastMonth: "Vorige Maand",
    views: "Weergaven",
    leads: "Leads",
    change: "verandering",
    noData: "Nog geen gegevens beschikbaar",
    loading: "Statistieken laden...",
    error: "Kon statistieken niet laden",
    conversionRate: "Conversieratio",
    deviceBreakdown: "Apparaten",
    sourceBreakdown: "Verkeersbronnen",
    placePerformance: "Locatie Prestaties",
    upgradeTitle: "Upgrade voor Geavanceerde Statistieken",
    upgradeDescription: "Krijg gedetailleerde grafieken, trends en conversie-inzichten",
    upgradeButton: "Upgrade naar Pro",
    last30Days: "Laatste 30 dagen",
    desktop: "Desktop",
    mobile: "Mobiel",
    tablet: "Tablet",
    unknown: "Onbekend",
  },
  de: {
    title: "Statistiken",
    description: "Verfolgen Sie Ihre Geschäftsleistung",
    totalViews: "Gesamtaufrufe",
    totalLeads: "Gesamte Leads",
    thisMonth: "Dieser Monat",
    lastMonth: "Letzter Monat",
    views: "Aufrufe",
    leads: "Leads",
    change: "Änderung",
    noData: "Noch keine Daten verfügbar",
    loading: "Statistiken werden geladen...",
    error: "Statistiken konnten nicht geladen werden",
    conversionRate: "Konversionsrate",
    deviceBreakdown: "Geräteaufschlüsselung",
    sourceBreakdown: "Verkehrsquellen",
    placePerformance: "Standort-Leistung",
    upgradeTitle: "Upgrade für erweiterte Statistiken",
    upgradeDescription: "Erhalten Sie detaillierte Diagramme, Trends und Conversion-Einblicke",
    upgradeButton: "Auf Pro upgraden",
    last30Days: "Letzte 30 Tage",
    desktop: "Desktop",
    mobile: "Mobil",
    tablet: "Tablet",
    unknown: "Unbekannt",
  },
};

// Simple bar chart component - responsive sizing
function BarChart({
  data,
  valueKey,
  maxValue,
  color = "bg-cpPink",
}: {
  data: DailyData[];
  valueKey: "views" | "leads";
  maxValue: number;
  color?: string;
}) {
  if (data.length === 0 || maxValue === 0) {
    return (
      <div className="h-24 sm:h-32 flex items-end justify-center gap-px sm:gap-0.5">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 max-w-2 bg-slate-200 rounded-t"
            style={{ height: "4px" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-24 sm:h-32 flex items-end justify-between gap-px sm:gap-0.5">
      {data.map((item, index) => {
        const value = item[valueKey] || 0;
        const height = Math.max((value / maxValue) * 100, 2);
        return (
          <div
            key={index}
            className={cn("flex-1 max-w-2 rounded-t transition-all hover:opacity-80", color)}
            style={{ height: `${height}%` }}
            title={`${item.date}: ${value}`}
          />
        );
      })}
    </div>
  );
}

// Progress bar for breakdown items
function ProgressBar({
  value,
  color = "bg-cpPink",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="w-full bg-slate-200 rounded-full h-2">
      <div
        className={cn("h-2 rounded-full transition-all", color)}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}

// Device icon component
function DeviceIcon({ device }: { device: string }) {
  switch (device.toLowerCase()) {
    case "desktop":
      return <Monitor className="h-4 w-4" />;
    case "mobile":
      return <Smartphone className="h-4 w-4" />;
    case "tablet":
      return <Tablet className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
}

export function AnalyticsDashboard({
  businessId,
  planKey,
  locale,
}: AnalyticsDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [basic, setBasic] = useState<BasicAnalytics | null>(null);
  const [advanced, setAdvanced] = useState<AdvancedAnalytics | null>(null);
  const [hasBasicAnalytics, setHasBasicAnalytics] = useState(false);
  const [hasAdvancedAnalytics, setHasAdvancedAnalytics] = useState(false);

  const t = labels[locale as keyof typeof labels] || labels.en;

  const loadAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/dashboard/business/${businessId}/analytics`);

      if (response.status === 403) {
        const data = await response.json();
        setHasBasicAnalytics(data.hasBasicAnalytics || false);
        setHasAdvancedAnalytics(data.hasAdvancedAnalytics || false);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load analytics");
      }

      const data = await response.json();
      setHasBasicAnalytics(data.hasBasicAnalytics || false);
      setHasAdvancedAnalytics(data.hasAdvancedAnalytics || false);
      setBasic(data.basic || null);
      setAdvanced(data.advanced || null);
    } catch (err) {
      console.error("Error loading analytics:", err);
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  }, [businessId, t.error]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Calculate change percentages
  const viewsChange =
    basic?.lastMonthViews && basic.lastMonthViews > 0
      ? Math.round(
          ((basic.thisMonthViews - basic.lastMonthViews) / basic.lastMonthViews) * 100
        )
      : 0;

  const leadsChange =
    basic?.lastMonthLeads && basic.lastMonthLeads > 0
      ? Math.round(
          ((basic.thisMonthLeads - basic.lastMonthLeads) / basic.lastMonthLeads) * 100
        )
      : 0;

  // Calculate max values for charts
  const maxDailyViews = Math.max(...(advanced?.dailyViews.map((d) => d.views || 0) || [1]));
  const maxDailyLeads = Math.max(...(advanced?.dailyLeads.map((d) => d.leads || 0) || [1]));

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-cpPink" />
            <p className="text-sm text-slate-500">{t.loading}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No analytics access (FREE plan)
  if (!hasBasicAnalytics) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="p-4 bg-slate-100 rounded-full">
              <Lock className="h-8 w-8 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cpDark mb-1">
                {t.upgradeTitle}
              </h3>
              <p className="text-slate-600 max-w-md">{t.upgradeDescription}</p>
            </div>
            <Button className="bg-cpPink hover:bg-cpPink/90" asChild>
              <Link href={`/${locale}/dashboard/business/${businessId}/plan`}>
                <Crown className="h-4 w-4 mr-2" />
                {t.upgradeButton}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center gap-3 text-red-600">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Basic Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Views */}
        <Card>
          <CardContent className="p-4 sm:pt-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-cpAqua" />
              <span className="text-lg sm:text-2xl font-bold text-cpDark">
                {basic?.totalViews.toLocaleString() || 0}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 truncate">{t.totalViews}</p>
          </CardContent>
        </Card>

        {/* Total Leads */}
        <Card>
          <CardContent className="p-4 sm:pt-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-cpPink" />
              <span className="text-lg sm:text-2xl font-bold text-cpDark">
                {basic?.totalLeads.toLocaleString() || 0}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 truncate">{t.totalLeads}</p>
          </CardContent>
        </Card>

        {/* This Month Views */}
        <Card>
          <CardContent className="p-4 sm:pt-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="text-lg sm:text-2xl font-bold text-cpDark">
                {basic?.thisMonthViews.toLocaleString() || 0}
              </span>
              {viewsChange !== 0 && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs px-1.5",
                    viewsChange > 0
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  )}
                >
                  {viewsChange > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(viewsChange)}%
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              {t.views} - {t.thisMonth}
            </p>
          </CardContent>
        </Card>

        {/* This Month Leads */}
        <Card>
          <CardContent className="p-4 sm:pt-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="text-lg sm:text-2xl font-bold text-cpDark">
                {basic?.thisMonthLeads.toLocaleString() || 0}
              </span>
              {leadsChange !== 0 && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs px-1.5",
                    leadsChange > 0
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  )}
                >
                  {leadsChange > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(leadsChange)}%
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              {t.leads} - {t.thisMonth}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics - Only for PRO/ELITE */}
      {hasAdvancedAnalytics && advanced ? (
        <>
          {/* Views Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cpAqua" />
                {t.views}
              </CardTitle>
              <CardDescription>{t.last30Days}</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={advanced.dailyViews}
                valueKey="views"
                maxValue={maxDailyViews}
                color="bg-cpAqua"
              />
            </CardContent>
          </Card>

          {/* Leads Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-cpPink" />
                {t.leads}
              </CardTitle>
              <CardDescription>{t.last30Days}</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={advanced.dailyLeads}
                valueKey="leads"
                maxValue={maxDailyLeads}
                color="bg-cpPink"
              />
            </CardContent>
          </Card>

          {/* Breakdowns Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Conversion Rate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-cpYellow" />
                  {t.conversionRate}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <span className="text-4xl font-bold text-cpDark">
                    {advanced.conversionRate.toFixed(2)}%
                  </span>
                </div>
                <p className="text-sm text-slate-500 text-center">
                  {t.leads} / {t.views}
                </p>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-cpAqua" />
                  {t.deviceBreakdown}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {advanced.deviceBreakdown.length > 0 ? (
                  advanced.deviceBreakdown.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-700">
                          <DeviceIcon device={item.device || "unknown"} />
                          {item.device === "desktop"
                            ? t.desktop
                            : item.device === "mobile"
                              ? t.mobile
                              : item.device === "tablet"
                                ? t.tablet
                                : t.unknown}
                        </span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                      <ProgressBar value={item.percentage} color="bg-cpAqua" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4">
                    {t.noData}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Source Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-cpPink" />
                {t.sourceBreakdown}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {advanced.sourceBreakdown.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {advanced.sourceBreakdown.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-700 capitalize">
                          {item.source || "direct"}
                        </span>
                        <span className="font-medium">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <ProgressBar value={item.percentage} color="bg-cpPink" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">
                  {t.noData}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Place Performance */}
          {advanced.placeAnalytics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-cpYellow" />
                  {t.placePerformance}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {advanced.placeAnalytics.map((place) => (
                    <div
                      key={place.placeId}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <span className="font-medium text-cpDark">
                        {place.placeName}
                      </span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-slate-600">
                          <Eye className="h-4 w-4" />
                          {place.views}
                        </span>
                        <span className="flex items-center gap-1 text-slate-600">
                          <Mail className="h-4 w-4" />
                          {place.leads}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        /* Upgrade prompt for advanced analytics */
        <Card className="border-dashed border-2">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="p-3 bg-cpPink/10 rounded-full">
                <BarChart3 className="h-6 w-6 text-cpPink" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cpDark mb-1">
                  {t.upgradeTitle}
                </h3>
                <p className="text-slate-600 text-sm max-w-md">
                  {t.upgradeDescription}
                </p>
              </div>
              <Button variant="outline" className="border-cpPink text-cpPink hover:bg-cpPink/10" asChild>
                <Link href={`/${locale}/dashboard/business/${businessId}/plan`}>
                  <Crown className="h-4 w-4 mr-2" />
                  {t.upgradeButton}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getQualityStats, getLowQualityPlaces } from "@/db/queries/dataQuality";
import { getRefreshQueueStats, getRecentRefreshActivity } from "@/db/queries/refreshJobs";
import {
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  AlertCircle,
  XCircle,
  Activity,
  Zap,
  Star,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { DataQualityActions } from "./DataQualityActions";
import { EnrichmentFlagsDialog } from "./EnrichmentFlagsDialog";

// Helper to extract opening hours source from flags
function getOpeningHoursSource(flags: string[] | null): { source: string; badge: "success" | "warning" | "error" } | null {
  if (!flags) return null;

  if (flags.includes("OPENING_HOURS_VIA_SCHEMA")) {
    return { source: "Schema.org", badge: "success" };
  }
  if (flags.includes("OPENING_HOURS_VIA_TABLE")) {
    return { source: "Table", badge: "success" };
  }
  if (flags.includes("OPENING_HOURS_VIA_JINA")) {
    return { source: "Jina AI", badge: "success" };
  }
  if (flags.includes("OPENING_HOURS_VIA_REGEX")) {
    return { source: "Regex", badge: "warning" };
  }
  if (flags.includes("NO_OPENING_HOURS")) {
    return { source: "Missing", badge: "error" };
  }
  return null;
}

// Helper to extract rating source from flags
function getRatingSource(flags: string[] | null): { source: string; badge: "success" | "warning" | "error" } | null {
  if (!flags) return null;

  if (flags.includes("RATING_VIA_SCHEMA")) {
    return { source: "Schema.org", badge: "success" };
  }
  if (flags.includes("RATING_VIA_GOOGLE")) {
    return { source: "Google", badge: "success" };
  }
  if (flags.includes("RATING_VIA_FACEBOOK")) {
    return { source: "Facebook", badge: "success" };
  }
  if (flags.includes("RATING_VIA_TRUSTPILOT")) {
    return { source: "Trustpilot", badge: "success" };
  }
  if (flags.includes("RATING_VIA_STARS")) {
    return { source: "Stars", badge: "warning" };
  }
  if (flags.includes("RATING_VIA_TEXT")) {
    return { source: "Text", badge: "warning" };
  }
  if (flags.includes("NO_RATING")) {
    return { source: "Missing", badge: "error" };
  }
  return null;
}

// Helper to extract enrichment result from flags
function getEnrichmentResult(flags: string[] | null): { status: string; badge: "success" | "warning" | "error" } {
  if (!flags) return { status: "Not processed", badge: "warning" };

  if (flags.includes("ENRICHMENT_COMPLETE")) {
    return { status: "Complete", badge: "success" };
  }
  if (flags.includes("ENRICHMENT_PARTIAL")) {
    return { status: "Partial", badge: "warning" };
  }
  if (flags.includes("ENRICHMENT_FAILED")) {
    return { status: "Failed", badge: "error" };
  }
  if (flags.includes("MANUAL_REVIEW_NEEDED")) {
    return { status: "Review needed", badge: "warning" };
  }

  // If we have any source flags, it's at least partial
  const sourceFlags = flags.filter(f => f.includes("_VIA_") || f.includes("SCHEMA_ORG"));
  if (sourceFlags.length > 0) {
    return { status: "Partial", badge: "warning" };
  }

  return { status: "Pending", badge: "warning" };
}

interface AdminDataQualityPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminDataQualityPage({
  params,
  searchParams,
}: AdminDataQualityPageProps) {
  const { locale } = await params;
  const { tab } = await searchParams;
  const user = await requireAdmin(locale);

  // Get stats
  const [qualityStats, queueStats, lowQualityPlaces, recentActivity] = await Promise.all([
    getQualityStats(),
    getRefreshQueueStats(),
    getLowQualityPlaces({ limit: 20, maxScore: 70 }),
    getRecentRefreshActivity(24, 10),
  ]);

  const getQualityBadge = (score: number) => {
    if (score >= 85) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
          Excellent
        </Badge>
      );
    }
    if (score >= 70) {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
          Good
        </Badge>
      );
    }
    if (score >= 50) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-0">
          Fair
        </Badge>
      );
    }
    if (score >= 30) {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-0">
          Poor
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-red-100 text-red-700 border-0">
        Critical
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "done":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
            <CheckCircle className="h-3 w-3 mr-1" />
            Done
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            Processing
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-0">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700 border-0">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Data Quality"
        description="Monitor and manage place data quality and refresh queue"
        user={user}
        locale={locale}
      />

      <div className="p-6 space-y-6">
        {/* Quality Score Distribution */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Excellent (85+)</p>
                  <p className="text-2xl font-bold text-green-600">{qualityStats.excellent}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Good (70-84)</p>
                  <p className="text-2xl font-bold text-blue-600">{qualityStats.good}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fair (50-69)</p>
                  <p className="text-2xl font-bold text-yellow-600">{qualityStats.fair}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Poor (30-49)</p>
                  <p className="text-2xl font-bold text-orange-600">{qualityStats.poor}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical (&lt;30)</p>
                  <p className="text-2xl font-bold text-red-600">{qualityStats.critical}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Missing Data Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Missing Data Overview
            </CardTitle>
            <CardDescription>Places missing key information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">{qualityStats.missingOpeningHours}</p>
                <p className="text-sm text-muted-foreground">Missing Opening Hours</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">{qualityStats.missingRating}</p>
                <p className="text-sm text-muted-foreground">Missing Rating</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">{qualityStats.missingWebsite}</p>
                <p className="text-sm text-muted-foreground">Missing Website</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">{qualityStats.missingPhone}</p>
                <p className="text-sm text-muted-foreground">Missing Phone</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Refresh Queue Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-cpAqua" />
                Refresh Queue
              </CardTitle>
              <CardDescription>Current job queue status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{queueStats.pending}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{queueStats.inProgress}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{queueStats.done}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{queueStats.failed}</p>
                  <p className="text-xs text-muted-foreground">Failed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-cpPink" />
                Recent Activity (24h)
              </CardTitle>
              <CardDescription>Latest refresh job activity</CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent activity
                </p>
              ) : (
                <div className="space-y-2">
                  {recentActivity.slice(0, 5).map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{job.placeName}</p>
                        <p className="text-xs text-muted-foreground">{job.reason}</p>
                      </div>
                      {getStatusBadge(job.status)}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Low Quality Places Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Low Quality Places
            </CardTitle>
            <CardDescription>
              Places with quality score below 70% that need attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            {lowQualityPlaces.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No low quality places found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Place</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Hours
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Rating
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Enrichment
                        </div>
                      </TableHead>
                      <TableHead>Flags</TableHead>
                      <TableHead>Last Refresh</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowQualityPlaces.map((place) => {
                      const hoursSource = getOpeningHoursSource(place.dataQualityFlags as string[] | null);
                      const ratingSource = getRatingSource(place.dataQualityFlags as string[] | null);
                      const enrichmentResult = getEnrichmentResult(place.dataQualityFlags as string[] | null);
                      const flags = place.dataQualityFlags as string[] || [];

                      return (
                        <TableRow key={place.id}>
                          <TableCell>
                            <div className="min-w-[150px]">
                              <p className="font-medium">{place.name}</p>
                              <p className="text-xs text-muted-foreground">{place.slug}</p>
                              {place.website && (
                                <a
                                  href={place.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-cpAqua hover:underline flex items-center gap-1 mt-1"
                                >
                                  <Globe className="h-3 w-3" />
                                  Website
                                </a>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm whitespace-nowrap">
                              {place.cityName}, {place.countryName}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm">{place.dataQualityScore}%</span>
                              {getQualityBadge(place.dataQualityScore)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {hoursSource ? (
                              <Badge
                                variant="outline"
                                className={
                                  hoursSource.badge === "success"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : hoursSource.badge === "warning"
                                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                                }
                              >
                                {hoursSource.source}
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {ratingSource ? (
                              <div className="flex items-center gap-1">
                                <Badge
                                  variant="outline"
                                  className={
                                    ratingSource.badge === "success"
                                      ? "bg-green-100 text-green-700 border-green-200"
                                      : ratingSource.badge === "warning"
                                      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                      : "bg-red-100 text-red-700 border-red-200"
                                  }
                                >
                                  {ratingSource.source}
                                </Badge>
                                {place.avgRating && parseFloat(place.avgRating) > 0 && (
                                  <span className="text-xs font-mono">{parseFloat(place.avgRating).toFixed(1)}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                enrichmentResult.badge === "success"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : enrichmentResult.badge === "warning"
                                  ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                  : "bg-red-100 text-red-700 border-red-200"
                              }
                            >
                              {enrichmentResult.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {flags.length > 0 ? (
                              <EnrichmentFlagsDialog flags={flags} placeName={place.name} />
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                            {place.lastRefreshedAt
                              ? new Date(place.lastRefreshedAt).toLocaleDateString()
                              : "Never"}
                          </TableCell>
                          <TableCell className="text-right">
                            <DataQualityActions placeId={place.id} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

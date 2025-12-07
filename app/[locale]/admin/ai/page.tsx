import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Brain,
  Search,
  Clock,
  RefreshCw,
  Database,
  Zap,
  AlertTriangle,
  CheckCircle,
  FileQuestion,
  Timer,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getAiStats, scanMissingContent, scanStaleContent } from "./actions";
import { MissingScannerForm } from "./MissingScannerForm";
import { StaleScannerForm } from "./StaleScannerForm";
import { ForceRegenerateForm } from "./ForceRegenerateForm";

interface AiToolsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    tab?: string;
    scanLocale?: string;
  }>;
}

// Content type badges
function getContentTypeBadge(contentType: string) {
  const colors: Record<string, string> = {
    country: "bg-blue-100 text-blue-700 border-blue-200",
    city: "bg-green-100 text-green-700 border-green-200",
    category: "bg-amber-100 text-amber-700 border-amber-200",
    place: "bg-purple-100 text-purple-700 border-purple-200",
    combo: "bg-cpCoral/20 text-cpCoral border-cpCoral/30",
    best: "bg-cpAqua/20 text-cpAqua border-cpAqua/30",
    top: "bg-orange-100 text-orange-700 border-orange-200",
  };

  return (
    <Badge className={colors[contentType] || "bg-slate-100 text-slate-700 border-slate-200"}>
      {contentType}
    </Badge>
  );
}

export default async function AiToolsPage({ params, searchParams }: AiToolsPageProps) {
  const { locale } = await params;
  const { tab = "overview", scanLocale = "nl" } = await searchParams;
  const user = await requireAdmin(locale);

  // Fetch AI stats
  const stats = await getAiStats(locale);

  // Fetch scanner results if on those tabs
  const missingContent = tab === "missing" ? await scanMissingContent(locale, scanLocale as "nl" | "en" | "de", 50) : [];
  const staleContent = tab === "stale" ? await scanStaleContent(locale, 50) : [];

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="AI Content Tools"
        description="Manage AI-generated SEO content"
        user={user}
        locale={locale}
      />

      <div className="p-6">
        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Cached Content */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpCoral/10">
                  <Database className="h-5 w-5 text-cpCoral" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cached Content</p>
                  <p className="text-2xl font-bold">{stats.contentStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stale Content */}
          <Card className={stats.contentStats.staleCount > 0 ? "border-amber-300 bg-amber-50/50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stats.contentStats.staleCount > 0 ? "bg-amber-100" : "bg-green-100"}`}>
                  <Clock
                    className={`h-5 w-5 ${stats.contentStats.staleCount > 0 ? "text-amber-600" : "text-green-600"}`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stale Content</p>
                  <p className="text-2xl font-bold">{stats.contentStats.staleCount}</p>
                  {stats.contentStats.staleCount > 0 && (
                    <p className="text-xs text-amber-600 font-medium">Needs regeneration</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Outdated Versions */}
          <Card className={stats.contentStats.outdatedVersionCount > 0 ? "border-red-300 bg-red-50/50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stats.contentStats.outdatedVersionCount > 0 ? "bg-red-100" : "bg-green-100"}`}>
                  <AlertTriangle
                    className={`h-5 w-5 ${stats.contentStats.outdatedVersionCount > 0 ? "text-red-600" : "text-green-600"}`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Outdated Version</p>
                  <p className="text-2xl font-bold">{stats.contentStats.outdatedVersionCount}</p>
                  {stats.contentStats.outdatedVersionCount > 0 && (
                    <p className="text-xs text-red-600 font-medium">Version mismatch</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Queue Status */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpAqua/10">
                  <RefreshCw className="h-5 w-5 text-cpAqua" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Queue</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{stats.queueStats.pending}</span>
                    <span className="text-xs text-muted-foreground">pending</span>
                    {stats.queueStats.processing > 0 && (
                      <>
                        <span className="text-lg font-bold text-amber-600">{stats.queueStats.processing}</span>
                        <span className="text-xs text-muted-foreground">in progress</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Configuration */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-cpCoral" aria-hidden="true" />
              <CardTitle className="text-lg">AI Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Version</p>
                <Badge className="bg-cpCoral/10 text-cpCoral border-cpCoral/20 mt-1">
                  {stats.config.version}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Model</p>
                <p className="font-mono text-sm">{stats.config.model}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Provider</p>
                <p className="font-mono text-sm">{stats.config.provider}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                {stats.config.enabled ? (
                  <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 border-red-200 mt-1">
                    Disabled
                  </Badge>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max per Cron</p>
                <p className="font-mono text-sm">{stats.config.maxGenerationsPerCron}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max per Day</p>
                <p className="font-mono text-sm">{stats.config.maxGenerationsPerDay}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Staleness Threshold</p>
                <p className="font-mono text-sm">{stats.config.stalenessThresholdDays} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Generation Time</p>
                <p className="font-mono text-sm">
                  {stats.contentStats.avgGenerationTimeMs > 0
                    ? `${(stats.contentStats.avgGenerationTimeMs / 1000).toFixed(1)}s`
                    : "—"}
                </p>
              </div>
            </div>

            {/* Content by Type */}
            {Object.keys(stats.contentStats.byType).length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Content by Type</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(stats.contentStats.byType).map(([type, count]) => (
                    <div key={type} className="flex items-center gap-1">
                      {getContentTypeBadge(type)}
                      <span className="text-sm font-mono">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tool 1: Missing Content Scanner */}
          <Card className={tab === "missing" ? "ring-2 ring-cpCoral" : ""}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FileQuestion className="h-5 w-5 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg">Missing Content Scanner</CardTitle>
                  <CardDescription>Find entities without AI content</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <MissingScannerForm locale={locale} currentLocale={scanLocale} />
            </CardContent>
          </Card>

          {/* Tool 2: Stale Content Scanner */}
          <Card className={tab === "stale" ? "ring-2 ring-cpCoral" : ""}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100">
                  <Timer className="h-5 w-5 text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg">Stale Content Scanner</CardTitle>
                  <CardDescription>Find outdated or old content</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <StaleScannerForm locale={locale} />
            </CardContent>
          </Card>

          {/* Tool 3: Force Regenerate */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpAqua/10">
                  <Zap className="h-5 w-5 text-cpAqua" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg">Force Regenerate</CardTitle>
                  <CardDescription>Manually regenerate content</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ForceRegenerateForm locale={locale} />
            </CardContent>
          </Card>
        </div>

        {/* Missing Content Results */}
        {tab === "missing" && missingContent.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Missing Content ({missingContent.length} items)</CardTitle>
              <CardDescription>
                Entities that don&apos;t have AI-generated content yet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Cache Key</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {missingContent.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{getContentTypeBadge(item.type)}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground max-w-[300px] truncate">
                        {item.cacheKey}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          Ready to generate
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {tab === "missing" && missingContent.length === 0 && (
          <Card className="mt-6">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">All content generated!</p>
              <p className="text-sm text-muted-foreground">
                All cities, places, and categories have AI content for this locale.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stale Content Results */}
        {tab === "stale" && staleContent.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Stale Content ({staleContent.length} items)</CardTitle>
              <CardDescription>
                Content that needs regeneration due to age or version mismatch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Cache Key</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staleContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-xs">#{item.id}</TableCell>
                      <TableCell>{getContentTypeBadge(item.contentType)}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground max-w-[250px] truncate">
                        {item.key}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.isOutdated
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }
                        >
                          {item.version}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        {item.isOutdated ? (
                          <Badge className="bg-red-100 text-red-700 border-red-200">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Version Mismatch
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                            <Clock className="h-3 w-3 mr-1" />
                            Age Stale
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {tab === "stale" && staleContent.length === 0 && (
          <Card className="mt-6">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">All content is fresh!</p>
              <p className="text-sm text-muted-foreground">
                No stale or outdated content found.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

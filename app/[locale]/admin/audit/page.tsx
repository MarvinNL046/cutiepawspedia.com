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
import {
  getAuditLogs,
  getBusinessesWithMostRefunds,
  getSpamLeadCount,
  getEventCountsByType,
  type AuditEventType,
  type AuditActorRole,
  type AuditTargetType,
} from "@/db/queries/auditLogs";
import {
  ClipboardList,
  AlertTriangle,
  RefreshCw,
  Shield,
  Users,
  CreditCard,
  Star,
  FileCheck,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface AuditPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    eventType?: string;
    actorRole?: string;
    targetType?: string;
    page?: string;
  }>;
}

// Event type badges
function getEventTypeBadge(eventType: string) {
  switch (eventType) {
    case "LEAD_CREATED":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Lead Created</Badge>;
    case "LEAD_CHARGED":
      return <Badge className="bg-green-100 text-green-700 border-green-200">Lead Charged</Badge>;
    case "LEAD_REFUND":
      return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Lead Refund</Badge>;
    case "LEAD_SPAM":
      return <Badge className="bg-red-100 text-red-700 border-red-200">Lead Spam</Badge>;
    case "PREMIUM_UPGRADE":
      return <Badge className="bg-cpAqua/20 text-cpAqua border-cpAqua/30">Premium Upgrade</Badge>;
    case "PREMIUM_TOGGLE_ADMIN":
      return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Premium Toggle</Badge>;
    case "ADMIN_CREDIT_ADJUSTMENT":
      return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Credit Adjustment</Badge>;
    case "STRIPE_TOPUP_COMPLETED":
      return <Badge className="bg-green-100 text-green-700 border-green-200">Stripe Top-up</Badge>;
    case "CLAIM_CREATED":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Claim Created</Badge>;
    case "CLAIM_APPROVED":
      return <Badge className="bg-green-100 text-green-700 border-green-200">Claim Approved</Badge>;
    case "CLAIM_REJECTED":
      return <Badge className="bg-red-100 text-red-700 border-red-200">Claim Rejected</Badge>;
    case "BUSINESS_CREATED":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Business Created</Badge>;
    case "BUSINESS_STATUS_CHANGED":
      return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Status Changed</Badge>;
    default:
      return <Badge variant="outline">{eventType}</Badge>;
  }
}

// Actor role badges
function getActorRoleBadge(role: string) {
  switch (role) {
    case "admin":
      return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Admin</Badge>;
    case "business":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Business</Badge>;
    case "system":
      return <Badge className="bg-slate-100 text-slate-700 border-slate-200">System</Badge>;
    case "public":
      return <Badge className="bg-green-100 text-green-700 border-green-200">Public</Badge>;
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
}

// Target type icons
function getTargetTypeIcon(targetType: string) {
  switch (targetType) {
    case "lead":
      return <Users className="h-4 w-4 text-blue-500" />;
    case "business":
      return <Building2 className="h-4 w-4 text-purple-500" />;
    case "place":
      return <Star className="h-4 w-4 text-yellow-500" />;
    case "claim":
      return <FileCheck className="h-4 w-4 text-green-500" />;
    case "payment":
      return <CreditCard className="h-4 w-4 text-emerald-500" />;
    default:
      return <ClipboardList className="h-4 w-4 text-slate-500" />;
  }
}

export default async function AuditPage({ params, searchParams }: AuditPageProps) {
  const { locale } = await params;
  const { eventType, actorRole, targetType, page } = await searchParams;
  const user = await requireAdmin(locale);

  const currentPage = parseInt(page || "1", 10);
  const limit = 50;
  const offset = (currentPage - 1) * limit;

  // Build filters
  const filters: {
    limit: number;
    offset: number;
    eventType?: AuditEventType;
    actorRole?: AuditActorRole;
    targetType?: AuditTargetType;
  } = { limit, offset };

  if (eventType) {
    filters.eventType = eventType as AuditEventType;
  }
  if (actorRole) {
    filters.actorRole = actorRole as AuditActorRole;
  }
  if (targetType) {
    filters.targetType = targetType as AuditTargetType;
  }

  // Fetch data
  const [{ logs, total }, refundLeaders, spamCount, eventCounts] = await Promise.all([
    getAuditLogs(filters),
    getBusinessesWithMostRefunds(30, 5),
    getSpamLeadCount(7),
    getEventCountsByType(7),
  ]);

  const totalPages = Math.ceil(total / limit);

  // Calculate abuse signals
  const hasAbuseSignals = refundLeaders.length > 0 && refundLeaders[0].refundCount > 3;
  const hasSpamIssue = spamCount > 5;

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Audit Logs"
        description="System-wide event tracking and abuse signals"
        user={user}
        locale={locale}
      />

      <div className="p-6">
        {/* Abuse Signals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Spam Alert Card */}
          <Card className={hasSpamIssue ? "border-red-300 bg-red-50/50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${hasSpamIssue ? "bg-red-100" : "bg-amber-100"}`}>
                  <AlertTriangle
                    className={`h-5 w-5 ${hasSpamIssue ? "text-red-600" : "text-amber-600"}`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Spam Leads (7d)</p>
                  <p className="text-2xl font-bold">{spamCount}</p>
                  {hasSpamIssue && (
                    <p className="text-xs text-red-600 font-medium">High spam activity!</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Leaders Card */}
          <Card className={hasAbuseSignals ? "border-amber-300 bg-amber-50/50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${hasAbuseSignals ? "bg-amber-100" : "bg-blue-100"}`}>
                  <RefreshCw
                    className={`h-5 w-5 ${hasAbuseSignals ? "text-amber-600" : "text-blue-600"}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Top Refund Requesters (30d)</p>
                  {refundLeaders.length > 0 ? (
                    <div className="mt-1">
                      {refundLeaders.slice(0, 3).map((leader, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Business #{leader.businessId}
                          </span>
                          <span className="font-mono font-medium">
                            {leader.refundCount} refunds
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-green-600 font-medium">No refund abuse</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Summary Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpAqua/10">
                  <Shield className="h-5 w-5 text-cpAqua" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Events (7d)</p>
                  <div className="mt-1 grid grid-cols-2 gap-x-4 text-sm">
                    {eventCounts.slice(0, 4).map((event, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-muted-foreground truncate max-w-[100px]">
                          {event.eventType.split("_")[0]}
                        </span>
                        <span className="font-mono">{event.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Link href={`/${locale}/admin/audit`}>
                <Button
                  variant={!eventType && !actorRole && !targetType ? "default" : "outline"}
                  size="sm"
                >
                  All Events
                </Button>
              </Link>
              <Link href={`/${locale}/admin/audit?eventType=LEAD_CREATED`}>
                <Button
                  variant={eventType === "LEAD_CREATED" ? "default" : "outline"}
                  size="sm"
                >
                  Leads
                </Button>
              </Link>
              <Link href={`/${locale}/admin/audit?eventType=LEAD_REFUND`}>
                <Button
                  variant={eventType === "LEAD_REFUND" ? "default" : "outline"}
                  size="sm"
                >
                  Refunds
                </Button>
              </Link>
              <Link href={`/${locale}/admin/audit?eventType=LEAD_SPAM`}>
                <Button
                  variant={eventType === "LEAD_SPAM" ? "default" : "outline"}
                  size="sm"
                >
                  Spam
                </Button>
              </Link>
              <Link href={`/${locale}/admin/audit?eventType=PREMIUM_UPGRADE`}>
                <Button
                  variant={eventType === "PREMIUM_UPGRADE" ? "default" : "outline"}
                  size="sm"
                >
                  Premium
                </Button>
              </Link>
              <Link href={`/${locale}/admin/audit?eventType=STRIPE_TOPUP_COMPLETED`}>
                <Button
                  variant={eventType === "STRIPE_TOPUP_COMPLETED" ? "default" : "outline"}
                  size="sm"
                >
                  Payments
                </Button>
              </Link>
              <Link href={`/${locale}/admin/audit?actorRole=admin`}>
                <Button
                  variant={actorRole === "admin" ? "default" : "outline"}
                  size="sm"
                >
                  Admin Actions
                </Button>
              </Link>
              <Link href={`/${locale}/admin/audit?targetType=claim`}>
                <Button
                  variant={targetType === "claim" ? "default" : "outline"}
                  size="sm"
                >
                  Claims
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Log</CardTitle>
            <CardDescription>
              Showing {logs.length} of {total} events
            </CardDescription>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No audit logs yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">#{log.id}</TableCell>
                      <TableCell>{getEventTypeBadge(log.eventType)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {getActorRoleBadge(log.actorRole)}
                          {log.actorUserId && (
                            <span className="text-xs text-muted-foreground">
                              User #{log.actorUserId}
                            </span>
                          )}
                          {log.actorBusinessId && (
                            <span className="text-xs text-muted-foreground">
                              Business #{log.actorBusinessId}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTargetTypeIcon(log.targetType)}
                          <span className="text-sm">
                            {log.targetType} #{log.targetId || "—"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.metadata ? (
                          <div className="text-xs text-muted-foreground max-w-[200px] truncate">
                            {typeof log.metadata === "object"
                              ? JSON.stringify(log.metadata).slice(0, 50) + "..."
                              : String(log.metadata).slice(0, 50)}
                          </div>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {log.ipAddress || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDistanceToNow(new Date(log.createdAt), {
                          addSuffix: true,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {currentPage > 1 && (
                  <Link
                    href={`/${locale}/admin/audit?page=${currentPage - 1}${eventType ? `&eventType=${eventType}` : ""}${actorRole ? `&actorRole=${actorRole}` : ""}${targetType ? `&targetType=${targetType}` : ""}`}
                  >
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                  </Link>
                )}
                <span className="flex items-center px-3 text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages && (
                  <Link
                    href={`/${locale}/admin/audit?page=${currentPage + 1}${eventType ? `&eventType=${eventType}` : ""}${actorRole ? `&actorRole=${actorRole}` : ""}${targetType ? `&targetType=${targetType}` : ""}`}
                  >
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

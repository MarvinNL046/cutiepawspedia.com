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
import { db } from "@/db";
import { eq, desc, sql } from "drizzle-orm";
import { feedback } from "@/db/schema";
import { MessageCircle, Bug, Lightbulb, MessageSquare, Clock, CheckCircle, XCircle, Wrench, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FeedbackStatusActions } from "./FeedbackStatusActions";

interface AdminFeedbackPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; type?: string }>;
}

export default async function AdminFeedbackPage({ params, searchParams }: AdminFeedbackPageProps) {
  const { locale } = await params;
  const { status: filterStatus, type: filterType } = await searchParams;
  const user = await requireAdmin(locale);

  if (!db) {
    return <div className="p-8 text-center">Database not available</div>;
  }

  // Get feedback stats by status
  const statusStats = await db
    .select({
      status: feedback.status,
      count: sql<number>`count(*)`,
    })
    .from(feedback)
    .groupBy(feedback.status);

  const statsByStatus = {
    new: statusStats.find((s) => s.status === "new")?.count || 0,
    in_progress: statusStats.find((s) => s.status === "in_progress")?.count || 0,
    resolved: statusStats.find((s) => s.status === "resolved")?.count || 0,
    wont_fix: statusStats.find((s) => s.status === "wont_fix")?.count || 0,
  };

  // Get feedback stats by type
  const typeStats = await db
    .select({
      type: feedback.type,
      count: sql<number>`count(*)`,
    })
    .from(feedback)
    .groupBy(feedback.type);

  const statsByType = {
    bug: typeStats.find((t) => t.type === "bug")?.count || 0,
    idea: typeStats.find((t) => t.type === "idea")?.count || 0,
    other: typeStats.find((t) => t.type === "other")?.count || 0,
  };

  // Build where conditions
  let whereConditions = undefined;
  if (filterStatus && filterType) {
    whereConditions = sql`${feedback.status} = ${filterStatus} AND ${feedback.type} = ${filterType}`;
  } else if (filterStatus) {
    whereConditions = eq(feedback.status, filterStatus as typeof feedback.$inferSelect["status"]);
  } else if (filterType) {
    whereConditions = eq(feedback.type, filterType as typeof feedback.$inferSelect["type"]);
  }

  // Get feedback list
  const feedbackList = await db
    .select()
    .from(feedback)
    .where(whereConditions)
    .orderBy(desc(feedback.createdAt))
    .limit(100);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "bug":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700 border-0">
            <Bug className="h-3 w-3 mr-1" />
            Bug
          </Badge>
        );
      case "idea":
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-0">
            <Lightbulb className="h-3 w-3 mr-1" />
            Idea
          </Badge>
        );
      case "other":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
            <MessageSquare className="h-3 w-3 mr-1" />
            Other
          </Badge>
        );
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
            <Clock className="h-3 w-3 mr-1" />
            New
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-0">
            <Wrench className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
            <CheckCircle className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        );
      case "wont_fix":
        return (
          <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-0">
            <XCircle className="h-3 w-3 mr-1" />
            Won&apos;t Fix
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalFeedback = Object.values(statsByStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="User Feedback"
        description="Review and manage user feedback submissions"
        user={user}
        locale={locale}
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards - Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href={`/${locale}/admin/feedback?status=new`}>
            <Card className={`cursor-pointer hover:border-blue-500 transition-colors ${filterStatus === "new" ? "border-blue-500 bg-blue-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New</p>
                    <p className="text-2xl font-bold text-blue-600">{statsByStatus.new}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${locale}/admin/feedback?status=in_progress`}>
            <Card className={`cursor-pointer hover:border-yellow-500 transition-colors ${filterStatus === "in_progress" ? "border-yellow-500 bg-yellow-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">{statsByStatus.in_progress}</p>
                  </div>
                  <Wrench className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${locale}/admin/feedback?status=resolved`}>
            <Card className={`cursor-pointer hover:border-green-500 transition-colors ${filterStatus === "resolved" ? "border-green-500 bg-green-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">{statsByStatus.resolved}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${locale}/admin/feedback?status=wont_fix`}>
            <Card className={`cursor-pointer hover:border-slate-500 transition-colors ${filterStatus === "wont_fix" ? "border-slate-500 bg-slate-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Won&apos;t Fix</p>
                    <p className="text-2xl font-bold text-slate-600">{statsByStatus.wont_fix}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-slate-500" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Type Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href={`/${locale}/admin/feedback?type=bug`}>
            <Card className={`cursor-pointer hover:border-red-500 transition-colors ${filterType === "bug" ? "border-red-500 bg-red-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bug Reports</p>
                    <p className="text-2xl font-bold text-red-600">{statsByType.bug}</p>
                  </div>
                  <Bug className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${locale}/admin/feedback?type=idea`}>
            <Card className={`cursor-pointer hover:border-amber-500 transition-colors ${filterType === "idea" ? "border-amber-500 bg-amber-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Feature Ideas</p>
                    <p className="text-2xl font-bold text-amber-600">{statsByType.idea}</p>
                  </div>
                  <Lightbulb className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${locale}/admin/feedback?type=other`}>
            <Card className={`cursor-pointer hover:border-blue-500 transition-colors ${filterType === "other" ? "border-blue-500 bg-blue-50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">General Feedback</p>
                    <p className="text-2xl font-bold text-blue-600">{statsByType.other}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Filter Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link href={`/${locale}/admin/feedback`}>
            <Button variant={!filterStatus && !filterType ? "default" : "outline"} size="sm">
              All ({totalFeedback})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/feedback?status=new`}>
            <Button variant={filterStatus === "new" ? "default" : "outline"} size="sm">
              New ({statsByStatus.new})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/feedback?type=bug`}>
            <Button variant={filterType === "bug" ? "default" : "outline"} size="sm">
              Bugs ({statsByType.bug})
            </Button>
          </Link>
          <Link href={`/${locale}/admin/feedback?type=idea`}>
            <Button variant={filterType === "idea" ? "default" : "outline"} size="sm">
              Ideas ({statsByType.idea})
            </Button>
          </Link>
        </div>

        {/* Feedback Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-cpAqua" />
              Feedback
            </CardTitle>
            <CardDescription>
              {filterStatus || filterType
                ? `Showing ${filterStatus || ""} ${filterType || ""} feedback`
                : "All user feedback"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {feedbackList.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No feedback found
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbackList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{getTypeBadge(item.type)}</TableCell>
                      <TableCell>
                        <div className="max-w-[400px]">
                          <p className="text-sm line-clamp-3 whitespace-pre-wrap">
                            {item.message}
                          </p>
                          {item.adminNotes && (
                            <p className="text-xs text-muted-foreground mt-1 italic border-l-2 border-cpAqua pl-2">
                              Note: {item.adminNotes}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.email ? (
                          <a
                            href={`mailto:${item.email}?subject=Re: Your feedback on CutiePawsPedia`}
                            className="text-sm text-cpAqua hover:underline flex items-center gap-1"
                          >
                            <Mail className="h-3 w-3" />
                            {item.email}
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">Anonymous</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.page ? (
                          <a
                            href={item.page}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-cpAqua flex items-center gap-1 max-w-[150px] truncate"
                            title={item.page}
                          >
                            <Globe className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{new URL(item.page).pathname}</span>
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div>
                          {formatDistanceToNow(new Date(item.createdAt), {
                            addSuffix: true,
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <FeedbackStatusActions
                          feedbackId={item.id}
                          currentStatus={item.status}
                          adminNotes={item.adminNotes}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

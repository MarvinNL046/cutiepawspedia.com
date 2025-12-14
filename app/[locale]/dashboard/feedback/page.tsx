import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  MessageCircle,
  Bug,
  Lightbulb,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Wrench,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { db } from "@/db";
import { feedback } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface DashboardFeedbackPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardFeedbackPage({ params }: DashboardFeedbackPageProps) {
  const { locale } = await params;

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  if (!db) {
    return <div className="p-8 text-center">Database not available</div>;
  }

  // Get feedback submitted by this user (based on email)
  const userFeedback = dbUser.email
    ? await db
        .select()
        .from(feedback)
        .where(eq(feedback.email, dbUser.email))
        .orderBy(desc(feedback.createdAt))
        .limit(50)
    : [];

  // Get stats by status
  const statusStats = dbUser.email
    ? await db
        .select({
          status: feedback.status,
          count: sql<number>`count(*)`,
        })
        .from(feedback)
        .where(eq(feedback.email, dbUser.email))
        .groupBy(feedback.status)
    : [];

  const statsByStatus = {
    new: statusStats.find((s) => s.status === "new")?.count || 0,
    in_progress: statusStats.find((s) => s.status === "in_progress")?.count || 0,
    resolved: statusStats.find((s) => s.status === "resolved")?.count || 0,
    wont_fix: statusStats.find((s) => s.status === "wont_fix")?.count || 0,
  };

  const totalFeedback = Object.values(statsByStatus).reduce((a, b) => a + b, 0);

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
            Pending
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
            Closed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <DashboardHeader
        title="My Feedback"
        description="Track the status of your feedback submissions"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Submitted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cpDark">{totalFeedback}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{statsByStatus.new}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{statsByStatus.in_progress}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statsByStatus.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-cpAqua" />
              Your Feedback
            </CardTitle>
            <CardDescription>
              Feedback you&apos;ve submitted to help improve CutiePawsPedia
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {userFeedback.length === 0 ? (
              <div className="text-center py-16">
                <MessageCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-cpDark mb-2">
                  No feedback submitted yet
                </h3>
                <p className="text-slate-500 max-w-md mx-auto mb-4">
                  Use the feedback button on the right side of the screen to share your ideas, report bugs, or give us general feedback.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userFeedback.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{getTypeBadge(item.type)}</TableCell>
                      <TableCell>
                        <p className="text-sm line-clamp-2 max-w-[300px]">
                          {item.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        {item.page ? (
                          <Link
                            href={item.page}
                            target="_blank"
                            className="text-xs text-cpAqua hover:underline flex items-center gap-1 max-w-[150px] truncate"
                            title={item.page}
                          >
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{new URL(item.page).pathname}</span>
                          </Link>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {formatDistanceToNow(new Date(item.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

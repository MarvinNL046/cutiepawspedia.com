import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getDashboardStats } from "@/db/queries";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Building2, MessageSquare, TrendingUp, ArrowRight, Mail, Phone, Calendar } from "lucide-react";

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;

  // Get current user
  const stackUser = await stackServerApp?.getUser();
  if (!stackUser) return null;

  const dbUser = await getUserByStackAuthId(stackUser.id);
  if (!dbUser) return null;

  // Get dashboard stats
  const stats = await getDashboardStats(dbUser.id);

  return (
    <>
      <DashboardHeader
        title="Dashboard"
        description="Overview of your business performance"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Listings
              </CardTitle>
              <Building2 className="h-4 w-4 text-cpAqua" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cpDark">{stats.listingCount}</div>
              <p className="text-xs text-slate-500 mt-1">
                Active business listings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Leads
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-cpPink" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cpDark">{stats.leadCount}</div>
              <p className="text-xs text-slate-500 mt-1">
                Customer inquiries received
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Conversion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-cpYellow" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cpDark">
                {stats.listingCount > 0
                  ? Math.round((stats.leadCount / stats.listingCount) * 100) / 100
                  : 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Leads per listing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Leads Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>
                Latest inquiries from potential customers
              </CardDescription>
            </div>
            <Link href={`/${locale}/dashboard/leads`}>
              <Button variant="outline" size="sm" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentLeads.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No leads yet</p>
                <p className="text-sm text-slate-400">
                  Leads will appear here when customers contact you
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Listing</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-cpDark">{lead.name}</p>
                          {lead.message && (
                            <p className="text-sm text-slate-500 truncate max-w-[200px]">
                              {lead.message}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {lead.place?.name || "Unknown"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-slate-400" />
                            {lead.email}
                          </span>
                          {lead.phone && (
                            <span className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-slate-400" />
                              {lead.phone}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" asChild>
                          <a href={`mailto:${lead.email}`}>Reply</a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Manage Listings</CardTitle>
              <CardDescription>
                View and update your business listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${locale}/dashboard/listings`}>
                <Button className="bg-cpPink hover:bg-cpPink/90 gap-2">
                  <Building2 className="h-4 w-4" />
                  View Listings
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">View All Leads</CardTitle>
              <CardDescription>
                See all customer inquiries and respond
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/${locale}/dashboard/leads`}>
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  View Leads
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

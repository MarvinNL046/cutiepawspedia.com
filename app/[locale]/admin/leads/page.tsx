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
import { getAdminLeads, getAdminStats } from "@/db/queries/admin";
import { MessageSquare, TrendingUp, Calendar, Eye, AlertTriangle, DollarSign } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { LeadActionsDropdown } from "./LeadActionsDropdown";

interface LeadsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; page?: string }>;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "new":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">New</Badge>;
    case "sent":
      return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Sent</Badge>;
    case "viewed":
      return <Badge className="bg-green-100 text-green-700 border-green-200">Viewed</Badge>;
    case "converted":
      return <Badge className="bg-cpAqua/20 text-cpAqua border-cpAqua/30">Converted</Badge>;
    case "spam":
      return <Badge className="bg-red-100 text-red-700 border-red-200">Spam</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default async function LeadsPage({ params, searchParams }: LeadsPageProps) {
  const { locale } = await params;
  const { status, page } = await searchParams;
  const user = await requireAdmin(locale);

  const currentPage = parseInt(page || "1", 10);
  const limit = 50;
  const offset = (currentPage - 1) * limit;

  const [{ leads, total }, stats] = await Promise.all([
    getAdminLeads({ limit, offset }),
    getAdminStats(),
  ]);

  const totalPages = Math.ceil(total / limit);

  // Calculate spam stats
  const spamCount = leads.filter((l) => l.status === "spam").length;
  const chargedCount = leads.filter((l) => l.chargedAt).length;

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Platform Leads"
        description="All leads across the platform"
        user={user}
        locale={locale}
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpPink/10">
                  <MessageSquare className="h-5 w-5 text-cpPink" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">{stats.leads.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpAqua/10">
                  <TrendingUp className="h-5 w-5 text-cpAqua" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last 7 Days</p>
                  <p className="text-2xl font-bold">{stats.leads.last7Days}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cpYellow/10">
                  <Calendar className="h-5 w-5 text-cpYellow" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last 30 Days</p>
                  <p className="text-2xl font-bold">{stats.leads.last30Days}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <DollarSign className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Charged</p>
                  <p className="text-2xl font-bold">{chargedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Spam</p>
                  <p className="text-2xl font-bold">{spamCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
            <CardDescription>
              Showing {leads.length} of {total} leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No leads yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Business / Place</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Charged</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className={lead.status === "spam" ? "bg-red-50/50" : ""}
                    >
                      <TableCell className="font-mono text-xs">#{lead.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-xs text-muted-foreground">{lead.email}</p>
                          {lead.phone && (
                            <p className="text-xs text-muted-foreground">{lead.phone}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.businessName || "No business"}</p>
                          <p className="text-xs text-muted-foreground">{lead.placeName || "—"}</p>
                          <p className="text-xs text-slate-400">
                            {[lead.cityName, lead.countryName].filter(Boolean).join(", ") || "—"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell>
                        {lead.chargedAt && lead.priceCents ? (
                          <div className="text-sm">
                            <span className="font-mono font-medium text-green-600">
                              €{(lead.priceCents / 100).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not charged</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.source ? (
                          <Badge variant="outline" className="text-xs">
                            {lead.source}
                          </Badge>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        <div>
                          {formatDistanceToNow(new Date(lead.createdAt), {
                            addSuffix: true,
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <LeadActionsDropdown
                          lead={lead}
                          locale={locale}
                        />
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
                    href={`/${locale}/admin/leads?page=${currentPage - 1}${status ? `&status=${status}` : ""}`}
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
                    href={`/${locale}/admin/leads?page=${currentPage + 1}${status ? `&status=${status}` : ""}`}
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

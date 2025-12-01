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
import { getAdminLeads, getAdminStats } from "@/db/queries/admin";
import { MessageSquare, TrendingUp, Calendar } from "lucide-react";

interface LeadsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LeadsPage({ params }: LeadsPageProps) {
  const { locale } = await params;
  const user = await requireAdmin(locale);

  const [{ leads, total }, stats] = await Promise.all([
    getAdminLeads({ limit: 50 }),
    getAdminStats(),
  ]);

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                <div className="p-2 rounded-lg bg-slate-100">
                  <TrendingUp className="h-5 w-5 text-slate-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg/Day (7d)</p>
                  <p className="text-2xl font-bold">
                    {(stats.leads.last7Days / 7).toFixed(1)}
                  </p>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead.email}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead.phone || "—"}
                      </TableCell>
                      <TableCell>{lead.placeName || "—"}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {[lead.cityName, lead.countryName].filter(Boolean).join(", ") || "—"}
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
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
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

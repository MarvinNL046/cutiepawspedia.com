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
  getAdminStats,
  getLatestPlaces,
  getLatestLeads,
  getLatestBusinesses,
} from "@/db/queries/admin";
import {
  Globe,
  MapPin,
  Building2,
  MessageSquare,
  Star,
  Users,
  Crown,
  CheckCircle,
  Clock,
} from "lucide-react";

interface AdminDashboardProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminDashboard({ params }: AdminDashboardProps) {
  const { locale } = await params;
  const user = await requireAdmin(locale);

  // Fetch all data in parallel
  const [stats, latestPlaces, latestLeads, latestBusinesses] = await Promise.all([
    getAdminStats(),
    getLatestPlaces(5),
    getLatestLeads(5),
    getLatestBusinesses(5),
  ]);

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Admin Dashboard"
        description="Platform overview and recent activity"
        user={user}
        locale={locale}
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards Row 1 - Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Countries"
            value={stats.countries}
            icon={Globe}
            color="cpAqua"
          />
          <StatCard
            title="Cities"
            value={stats.cities}
            icon={MapPin}
            color="cpPink"
          />
          <StatCard
            title="Categories"
            value={stats.categories}
            icon={Star}
            color="cpYellow"
          />
          <StatCard
            title="Reviews"
            value={stats.reviews.total}
            icon={MessageSquare}
            color="cpAqua"
          />
        </div>

        {/* Stats Cards Row 2 - Places */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Places"
            value={stats.places.total}
            icon={Building2}
            color="slate"
          />
          <StatCard
            title="Premium Places"
            value={stats.places.premium}
            icon={Crown}
            color="cpYellow"
            subtitle={`${stats.places.total > 0 ? Math.round((stats.places.premium / stats.places.total) * 100) : 0}% of total`}
          />
          <StatCard
            title="Verified Places"
            value={stats.places.verified}
            icon={CheckCircle}
            color="cpAqua"
          />
          <StatCard
            title="Pending Review"
            value={stats.places.pendingReview}
            icon={Clock}
            color="cpPink"
          />
        </div>

        {/* Stats Cards Row 3 - Users & Leads */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Business Accounts"
            value={stats.businesses.total}
            icon={Users}
            color="cpAqua"
            subtitle={`${stats.businesses.active} active`}
          />
          <StatCard
            title="Leads (7 days)"
            value={stats.leads.last7Days}
            icon={MessageSquare}
            color="cpPink"
          />
          <StatCard
            title="Leads (30 days)"
            value={stats.leads.last30Days}
            icon={MessageSquare}
            color="cpYellow"
          />
          <StatCard
            title="Total Leads"
            value={stats.leads.total}
            icon={MessageSquare}
            color="slate"
          />
        </div>

        {/* Latest Activity Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Places */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-cpPink" aria-hidden="true" />
                Latest Places
              </CardTitle>
              <CardDescription>Recently created listings</CardDescription>
            </CardHeader>
            <CardContent>
              {latestPlaces.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No places yet
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestPlaces.map((place) => (
                      <TableRow key={place.id}>
                        <TableCell className="font-medium">{place.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {place.cityName || "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {place.isPremium && (
                              <Badge variant="secondary" className="bg-cpYellow/20 text-cpYellow border-0">
                                Premium
                              </Badge>
                            )}
                            {place.isVerified ? (
                              <Badge variant="secondary" className="bg-cpAqua/20 text-cpAqua border-0">
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-0">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(place.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Latest Leads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-cpAqua" aria-hidden="true" />
                Latest Leads
              </CardTitle>
              <CardDescription>Recently received inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              {latestLeads.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No leads yet
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Business</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {lead.placeName || "—"}
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
                          {formatDate(lead.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Latest Businesses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-cpYellow" aria-hidden="true" />
              Latest Business Accounts
            </CardTitle>
            <CardDescription>Recently registered business users</CardDescription>
          </CardHeader>
          <CardContent>
            {latestBusinesses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No business accounts yet
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Listings</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestBusinesses.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell className="font-medium">{business.email}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {business.name || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-slate-100">
                          {business.placesCount} listings
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(business.createdAt)}
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

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: "cpPink" | "cpAqua" | "cpYellow" | "slate";
  subtitle?: string;
}

function StatCard({ title, value, icon: Icon, color, subtitle }: StatCardProps) {
  const colorClasses = {
    cpPink: "bg-cpPink/10 text-cpPink",
    cpAqua: "bg-cpAqua/10 text-cpAqua",
    cpYellow: "bg-cpYellow/10 text-cpYellow",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Format date helper
function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

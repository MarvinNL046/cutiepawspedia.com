import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminStats } from "@/db/queries/admin";
import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  MessageSquare,
  Globe,
} from "lucide-react";

interface AnalyticsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { locale } = await params;
  const user = await requireAdmin(locale);

  const stats = await getAdminStats();

  // Calculate some derived metrics
  const conversionRate = stats.places.total > 0
    ? ((stats.leads.total / stats.places.total) * 100).toFixed(1)
    : "0";

  const premiumRate = stats.places.total > 0
    ? ((stats.places.premium / stats.places.total) * 100).toFixed(1)
    : "0";

  const verificationRate = stats.places.total > 0
    ? ((stats.places.verified / stats.places.total) * 100).toFixed(1)
    : "0";

  const avgLeadsPerBusiness = stats.businesses.active > 0
    ? (stats.leads.total / stats.businesses.active).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Analytics"
        description="Platform performance and insights"
        user={user}
        locale={locale}
      />

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cpPink" aria-hidden="true" />
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Lead Conversion Rate"
              value={`${conversionRate}%`}
              description="Leads per listing"
              icon={TrendingUp}
              color="cpPink"
            />
            <MetricCard
              title="Premium Adoption"
              value={`${premiumRate}%`}
              description="Premium vs total listings"
              icon={Building2}
              color="cpYellow"
            />
            <MetricCard
              title="Verification Rate"
              value={`${verificationRate}%`}
              description="Verified vs total listings"
              icon={Building2}
              color="cpAqua"
            />
            <MetricCard
              title="Leads/Business"
              value={avgLeadsPerBusiness}
              description="Average leads per active business"
              icon={MessageSquare}
              color="slate"
            />
          </div>
        </div>

        {/* Platform Overview */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-cpAqua" aria-hidden="true" />
            Platform Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Geographic Coverage</CardTitle>
                <CardDescription>Countries and cities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Countries</span>
                    <span className="font-semibold">{stats.countries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cities</span>
                    <span className="font-semibold">{stats.cities}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Cities/Country</span>
                    <span className="font-semibold">
                      {stats.countries > 0 ? (stats.cities / stats.countries).toFixed(1) : 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Listings Health</CardTitle>
                <CardDescription>Places breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Places</span>
                    <span className="font-semibold">{stats.places.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Premium</span>
                    <span className="font-semibold text-cpYellow">{stats.places.premium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verified</span>
                    <span className="font-semibold text-cpAqua">{stats.places.verified}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending Review</span>
                    <span className="font-semibold text-cpPink">{stats.places.pendingReview}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">User Engagement</CardTitle>
                <CardDescription>Users and leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business Users</span>
                    <span className="font-semibold">{stats.businesses.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Businesses</span>
                    <span className="font-semibold text-cpAqua">{stats.businesses.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Reviews</span>
                    <span className="font-semibold">{stats.reviews.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Leads</span>
                    <span className="font-semibold text-cpPink">{stats.leads.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lead Trends */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-cpYellow" aria-hidden="true" />
            Lead Trends
          </h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lead Activity</CardTitle>
              <CardDescription>Lead generation over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-3xl font-bold text-cpPink">{stats.leads.last7Days}</p>
                  <p className="text-sm text-muted-foreground">Last 7 Days</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-3xl font-bold text-cpAqua">{stats.leads.last30Days}</p>
                  <p className="text-sm text-muted-foreground">Last 30 Days</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-3xl font-bold text-cpYellow">{stats.leads.total}</p>
                  <p className="text-sm text-muted-foreground">All Time</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-6">
                Charts and detailed analytics coming soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "cpPink" | "cpAqua" | "cpYellow" | "slate";
}

function MetricCard({ title, value, description, icon: Icon, color }: MetricCardProps) {
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
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinesses } from "@/db/queries/businesses";
import { Building2, Users, TrendingUp, CreditCard } from "lucide-react";
import { BusinessesTable } from "@/components/admin/businesses";

interface BusinessesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BusinessesPage({ params }: BusinessesPageProps) {
  const { locale } = await params;
  const user = await requireAdmin(locale);

  const { businesses, total } = await getBusinesses({ limit: 50 });

  // Calculate stats
  const activeBusinesses = businesses.filter((b) => b.status === "active").length;
  const paidBusinesses = businesses.filter((b) => b.billingStatus === "paid").length;
  const totalListings = businesses.reduce((sum, b) => sum + b.placesCount, 0);
  const totalLeads = businesses.reduce((sum, b) => sum + b.leadsCount, 0);

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Business Management"
        description="Manage business accounts, plans, and billing"
        user={user}
        locale={locale}
      />

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Businesses"
            value={total}
            subtitle={`${activeBusinesses} active`}
            icon={Building2}
            color="cpAqua"
          />
          <StatCard
            title="Total Listings"
            value={totalListings}
            subtitle="Across all businesses"
            icon={Users}
            color="cpCoral"
          />
          <StatCard
            title="Total Leads"
            value={totalLeads}
            subtitle="All time"
            icon={TrendingUp}
            color="cpYellow"
          />
          <StatCard
            title="Paid Accounts"
            value={paidBusinesses}
            subtitle={`${total > 0 ? Math.round((paidBusinesses / total) * 100) : 0}% conversion`}
            icon={CreditCard}
            color="slate"
          />
        </div>

        {/* Businesses Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Businesses</CardTitle>
            <CardDescription>
              View and manage all business accounts on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessesTable
              initialBusinesses={businesses}
              initialTotal={total}
            />
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
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "cpCoral" | "cpAqua" | "cpYellow" | "slate";
}

function StatCard({ title, value, subtitle, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    cpCoral: "bg-cpCoral/10 text-cpCoral",
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

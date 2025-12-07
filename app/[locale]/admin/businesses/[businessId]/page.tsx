import { requireAdmin } from "@/lib/auth/admin";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBusinessById, getBusinessStats, getBusinessListings, getBusinessLeads } from "@/db/queries/businesses";
import { getImpersonation, startImpersonation } from "@/lib/auth/impersonation";
import { notFound, redirect } from "next/navigation";
import {
  Building2,
  Mail,
  Phone,
  User,
  TrendingUp,
  Star,
  Package,
  CreditCard,
  FileText,
  UserCheck,
} from "lucide-react";
import {
  BusinessOverviewTab,
  BusinessListingsTab,
  BusinessLeadsTab,
  BusinessBillingTab,
  BusinessNotesTab,
} from "@/components/admin/businesses/tabs";
import Link from "next/link";

interface BusinessDetailPageProps {
  params: Promise<{ locale: string; businessId: string }>;
  searchParams: Promise<{ impersonate?: string }>;
}

export default async function BusinessDetailPage({ params, searchParams }: BusinessDetailPageProps) {
  const { locale, businessId } = await params;
  const { impersonate } = await searchParams;
  const user = await requireAdmin(locale);

  const id = parseInt(businessId, 10);
  if (isNaN(id)) {
    notFound();
  }

  const [business, stats, listingsResult, leadsResult] = await Promise.all([
    getBusinessById(id),
    getBusinessStats(id),
    getBusinessListings(id, { limit: 10 }),
    getBusinessLeads(id, { limit: 10 }),
  ]);

  if (!business) {
    notFound();
  }

  // Handle impersonation request
  if (impersonate === "true") {
    await startImpersonation(user.id, business.id, business.name);
    // Redirect to remove the query param
    redirect(`/${locale}/admin/businesses/${businessId}`);
  }

  // Get current impersonation status
  const impersonationData = await getImpersonation();

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    suspended: "bg-red-100 text-red-700",
  };

  const planColors: Record<string, string> = {
    free: "bg-slate-100 text-slate-600",
    starter: "bg-blue-100 text-blue-700",
    pro: "bg-cpAqua/20 text-cpAqua",
    enterprise: "bg-cpYellow/20 text-cpYellow",
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title={business.name}
        description="Business account management"
        user={user}
        locale={locale}
        backHref={`/${locale}/admin/businesses`}
        impersonation={impersonationData}
      />

      <div className="p-6 space-y-6">
        {/* Business Summary Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cpAqua/10">
                  <Building2 className="h-8 w-8 text-cpAqua" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{business.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={statusColors[business.status] || "bg-slate-100"}>
                      {business.status}
                    </Badge>
                    <Badge className={planColors[business.plan] || "bg-slate-100"}>
                      {business.plan}
                    </Badge>
                    <Badge variant="outline">{business.billingStatus}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                    {business.ownerEmail && (
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {business.ownerEmail}
                      </div>
                    )}
                    {business.contactEmail && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {business.contactEmail}
                      </div>
                    )}
                    {business.contactPhone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {business.contactPhone}
                      </div>
                    )}
                  </div>
                  {/* Impersonate Button */}
                  {!impersonationData && (
                    <div className="mt-4">
                      <Link href={`/${locale}/admin/businesses/${businessId}?impersonate=true`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <UserCheck className="h-4 w-4" />
                          View as Business
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickStat
                  label="Listings"
                  value={stats.totalListings}
                  icon={Package}
                  color="cpAqua"
                />
                <QuickStat
                  label="Leads (30d)"
                  value={stats.leadsLast30Days}
                  icon={TrendingUp}
                  color="cpCoral"
                />
                <QuickStat
                  label="Avg Rating"
                  value={stats.avgRating || 0}
                  icon={Star}
                  color="cpYellow"
                />
                <QuickStat
                  label="Reviews"
                  value={stats.totalReviews}
                  icon={FileText}
                  color="slate"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="gap-2">
              <Building2 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="listings" className="gap-2">
              <Package className="h-4 w-4" />
              Listings ({stats.totalListings})
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Leads ({stats.totalLeads})
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <BusinessOverviewTab
              business={business}
              stats={stats}
            />
          </TabsContent>

          <TabsContent value="listings">
            <BusinessListingsTab
              businessId={business.id}
              initialListings={listingsResult.listings}
              initialTotal={listingsResult.total}
            />
          </TabsContent>

          <TabsContent value="leads">
            <BusinessLeadsTab
              businessId={business.id}
              initialLeads={leadsResult.leads}
              initialTotal={leadsResult.total}
            />
          </TabsContent>

          <TabsContent value="billing">
            <BusinessBillingTab business={business} />
          </TabsContent>

          <TabsContent value="notes">
            <BusinessNotesTab
              businessId={business.id}
              initialNotes={business.notes}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface QuickStatProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: "cpCoral" | "cpAqua" | "cpYellow" | "slate";
}

function QuickStat({ label, value, icon: Icon, color }: QuickStatProps) {
  const colorClasses = {
    cpCoral: "text-cpCoral",
    cpAqua: "text-cpAqua",
    cpYellow: "text-cpYellow",
    slate: "text-slate-600",
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-1">
        <Icon className={`h-5 w-5 ${colorClasses[color]}`} />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

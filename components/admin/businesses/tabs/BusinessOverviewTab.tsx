"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Mail,
  Phone,
  User,
  Building2,
  DollarSign,
  TrendingUp,
  Star,
  Package,
} from "lucide-react";

interface Business {
  id: number;
  userId: number;
  name: string;
  contactEmail: string | null;
  contactPhone: string | null;
  status: string;
  plan: string;
  billingStatus: string;
  leadPriceCents: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  ownerEmail: string | null;
  ownerName: string | null;
}

interface BusinessStats {
  totalListings: number;
  verifiedListings: number;
  premiumListings: number;
  totalLeads: number;
  leadsLast7Days: number;
  leadsLast30Days: number;
  avgRating: number;
  totalReviews: number;
}

interface BusinessOverviewTabProps {
  business: Business;
  stats: BusinessStats;
}

export function BusinessOverviewTab({ business, stats }: BusinessOverviewTabProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (cents: number | null) => {
    if (cents === null) return "Not set";
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-cpAqua" />
            Business Information
          </CardTitle>
          <CardDescription>Core business details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow label="Business Name" value={business.name} />
          <InfoRow
            label="Owner"
            value={
              <div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {business.ownerEmail || "No owner assigned"}
                </div>
                {business.ownerName && (
                  <span className="text-sm text-muted-foreground">{business.ownerName}</span>
                )}
              </div>
            }
          />
          <InfoRow
            label="Contact Email"
            value={
              business.contactEmail ? (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${business.contactEmail}`} className="text-cpAqua hover:underline">
                    {business.contactEmail}
                  </a>
                </div>
              ) : (
                "Not provided"
              )
            }
          />
          <InfoRow
            label="Contact Phone"
            value={
              business.contactPhone ? (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${business.contactPhone}`} className="text-cpAqua hover:underline">
                    {business.contactPhone}
                  </a>
                </div>
              ) : (
                "Not provided"
              )
            }
          />
          <InfoRow
            label="Created"
            value={
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {formatDate(business.createdAt)}
              </div>
            }
          />
          <InfoRow
            label="Last Updated"
            value={
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {formatDate(business.updatedAt)}
              </div>
            }
          />
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-cpYellow" />
            Account Status
          </CardTitle>
          <CardDescription>Subscription plan and billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow
            label="Status"
            value={
              <Badge
                className={
                  business.status === "active"
                    ? "bg-green-100 text-green-700"
                    : business.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }
              >
                {business.status}
              </Badge>
            }
          />
          <InfoRow
            label="Plan"
            value={
              <Badge
                className={
                  business.plan === "enterprise"
                    ? "bg-cpYellow/20 text-cpYellow"
                    : business.plan === "pro"
                      ? "bg-cpAqua/20 text-cpAqua"
                      : business.plan === "starter"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                }
              >
                {business.plan}
              </Badge>
            }
          />
          <InfoRow
            label="Billing Status"
            value={
              <Badge
                variant="outline"
                className={
                  business.billingStatus === "paid"
                    ? "border-green-200 text-green-700"
                    : business.billingStatus === "overdue"
                      ? "border-orange-200 text-orange-700"
                      : business.billingStatus === "cancelled"
                        ? "border-red-200 text-red-700"
                        : ""
                }
              >
                {business.billingStatus}
              </Badge>
            }
          />
          <InfoRow label="Lead Price" value={formatCurrency(business.leadPriceCents)} />
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-cpPink" />
            Performance
          </CardTitle>
          <CardDescription>Listings and lead generation metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow
            label="Total Listings"
            value={
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{stats.totalListings}</span>
                <span className="text-sm text-muted-foreground">
                  ({stats.verifiedListings} verified, {stats.premiumListings} premium)
                </span>
              </div>
            }
          />
          <InfoRow
            label="Total Leads"
            value={
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{stats.totalLeads}</span>
                {stats.leadsLast30Days > 0 && (
                  <Badge variant="secondary" className="bg-cpPink/10 text-cpPink">
                    +{stats.leadsLast30Days} last 30d
                  </Badge>
                )}
              </div>
            }
          />
          <InfoRow
            label="Average Rating"
            value={
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-cpYellow" />
                <span className="font-semibold">
                  {stats.avgRating ? stats.avgRating.toFixed(1) : "No ratings"}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({stats.totalReviews} reviews)
                </span>
              </div>
            }
          />
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Notes</CardTitle>
          <CardDescription>Internal notes about this business</CardDescription>
        </CardHeader>
        <CardContent>
          {business.notes ? (
            <p className="text-sm whitespace-pre-wrap">{business.notes}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">No notes added yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="text-right">{value}</div>
    </div>
  );
}

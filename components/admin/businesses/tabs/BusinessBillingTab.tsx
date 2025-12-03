"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreditCard, DollarSign, Package, Loader2, Save, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Business {
  id: number;
  name: string;
  plan: string;
  billingStatus: string;
  leadPriceCents: number | null;
}

interface BusinessBillingTabProps {
  business: Business;
}

const planFeatures: Record<string, { listings: string; leads: string; features: string[] }> = {
  free: {
    listings: "Up to 1 listing",
    leads: "Basic lead notifications",
    features: ["Standard profile", "Email notifications"],
  },
  starter: {
    listings: "Up to 5 listings",
    leads: "Priority lead delivery",
    features: ["Enhanced profile", "Email + SMS notifications", "Basic analytics"],
  },
  pro: {
    listings: "Up to 25 listings",
    leads: "Instant lead delivery",
    features: [
      "Premium profile",
      "All notifications",
      "Advanced analytics",
      "Priority support",
      "Featured placement",
    ],
  },
  enterprise: {
    listings: "Unlimited listings",
    leads: "Custom lead routing",
    features: [
      "Custom branding",
      "All notifications",
      "Full analytics suite",
      "Dedicated support",
      "API access",
      "Custom integrations",
    ],
  },
};

export function BusinessBillingTab({ business }: BusinessBillingTabProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(business.plan);
  const [billingStatus, setBillingStatus] = useState(business.billingStatus);
  const [leadPriceCents, setLeadPriceCents] = useState(
    business.leadPriceCents ? (business.leadPriceCents / 100).toFixed(2) : ""
  );

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/businesses/${business.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          billingStatus,
          leadPriceCents: leadPriceCents ? Math.round(parseFloat(leadPriceCents) * 100) : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to update billing");

      router.refresh();
    } catch (error) {
      console.error("Error updating billing:", error);
      alert("Failed to update billing settings");
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges =
    plan !== business.plan ||
    billingStatus !== business.billingStatus ||
    (leadPriceCents ? Math.round(parseFloat(leadPriceCents) * 100) : null) !==
      business.leadPriceCents;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-cpAqua" />
              Subscription Plan
            </CardTitle>
            <CardDescription>Manage the business subscription tier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plan">Current Plan</Label>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger id="plan">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Plan Features */}
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Plan Features:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {planFeatures[plan]?.listings}</li>
                <li>• {planFeatures[plan]?.leads}</li>
                {planFeatures[plan]?.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Billing Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-cpPink" />
              Billing Status
            </CardTitle>
            <CardDescription>Current billing and payment status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="billingStatus">Status</Label>
              <Select value={billingStatus} onValueChange={setBillingStatus}>
                <SelectTrigger id="billingStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {billingStatus === "overdue" && (
              <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-700">Payment Overdue</p>
                  <p className="text-xs text-orange-600">
                    This business has an outstanding balance. Consider reaching out to resolve.
                  </p>
                </div>
              </div>
            )}

            {billingStatus === "cancelled" && (
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700">Subscription Cancelled</p>
                  <p className="text-xs text-red-600">
                    This business subscription has been cancelled. Listings may be affected.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lead Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-cpYellow" />
              Lead Pricing
            </CardTitle>
            <CardDescription>Custom lead pricing for this business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="leadPrice">Price per Lead ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="leadPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={leadPriceCents}
                  onChange={(e) => setLeadPriceCents(e.target.value)}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Leave empty to use default pricing based on plan
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Default Lead Prices:</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <span>Free:</span>
                <span>$0.00</span>
                <span>Starter:</span>
                <span>$5.00</span>
                <span>Pro:</span>
                <span>$10.00</span>
                <span>Enterprise:</span>
                <span>Custom</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common billing operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  Upgrade to Pro
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Upgrade to Pro Plan?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will upgrade {business.name} to the Pro plan with enhanced features and
                    increased listing limits.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setPlan("pro");
                      setBillingStatus("paid");
                    }}
                  >
                    Upgrade
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  Mark as Paid
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Mark as Paid?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will update the billing status to Paid for {business.name}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => setBillingStatus("paid")}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-red-600">
                  Cancel Subscription
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will cancel the subscription for {business.name}. Their listings may be
                    affected.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => setBillingStatus("cancelled")}
                  >
                    Cancel Subscription
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Settings } from "lucide-react";
import type { PlanKey } from "@/lib/plans/config";

interface PlanActionsProps {
  businessId: number;
  currentPlanKey: PlanKey;
  targetPlanKey: PlanKey;
  hasActiveSubscription: boolean;
  isUpgrade: boolean;
  locale: string;
  labels: {
    upgrade: string;
    downgrade: string;
    manage: string;
    current: string;
  };
}

export function PlanActions({
  businessId,
  currentPlanKey,
  targetPlanKey,
  hasActiveSubscription,
  isUpgrade,
  locale,
  labels,
}: PlanActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCurrent = currentPlanKey === targetPlanKey;
  const isFree = targetPlanKey === "FREE";

  const handleUpgrade = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/subscription/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          planKey: targetPlanKey,
          interval: "monthly", // Default to monthly
          successUrl: `${window.location.origin}/${locale}/dashboard/business/${businessId}/plan?success=true`,
          cancelUrl: `${window.location.origin}/${locale}/dashboard/business/${businessId}/plan`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If already has subscription, redirect to portal
        if (data.hasActiveSubscription) {
          await handleManageSubscription();
          return;
        }
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/subscription/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          returnUrl: `${window.location.origin}/${locale}/dashboard/business/${businessId}/plan`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to open customer portal");
      }

      // Redirect to Stripe Customer Portal
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Portal error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Current plan button
  if (isCurrent) {
    return (
      <Button disabled className="w-full dark:border-cpAmber/30 dark:text-cpCream/50" variant="outline">
        {labels.current}
      </Button>
    );
  }

  // Free plan - just show downgrade info (handled in portal)
  if (isFree) {
    if (hasActiveSubscription) {
      return (
        <Button
          onClick={handleManageSubscription}
          disabled={loading}
          variant="outline"
          className="w-full dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Settings className="h-4 w-4 mr-2" />
          )}
          {labels.manage}
        </Button>
      );
    }
    return (
      <Button disabled className="w-full dark:border-cpAmber/30 dark:text-cpCream/50" variant="outline">
        {labels.current}
      </Button>
    );
  }

  // Has active subscription - use portal for changes
  if (hasActiveSubscription) {
    return (
      <div className="space-y-2">
        <Button
          onClick={handleManageSubscription}
          disabled={loading}
          className={`w-full ${isUpgrade ? "bg-cpCoral hover:bg-cpCoral/90" : "dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"}`}
          variant={isUpgrade ? "default" : "outline"}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {isUpgrade ? labels.upgrade : labels.downgrade}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
      </div>
    );
  }

  // No subscription - start new checkout
  return (
    <div className="space-y-2">
      <Button
        onClick={handleUpgrade}
        disabled={loading}
        className={`w-full ${isUpgrade ? "bg-cpCoral hover:bg-cpCoral/90" : "dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"}`}
        variant={isUpgrade ? "default" : "outline"}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : null}
        {isUpgrade ? labels.upgrade : labels.downgrade}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

// Separate component for "Manage Subscription" button in current plan section
export function ManageSubscriptionButton({
  businessId,
  locale,
  label,
}: {
  businessId: number;
  locale: string;
  label: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/subscription/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          returnUrl: `${window.location.origin}/${locale}/dashboard/business/${businessId}/plan`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to open customer portal");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Portal error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleClick}
        disabled={loading}
        variant="outline"
        className="gap-2 dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Settings className="h-4 w-4" />
        )}
        {label}
      </Button>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

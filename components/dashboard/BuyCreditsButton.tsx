"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard, Loader2, Coins } from "lucide-react";
import { CREDIT_PACKAGES } from "@/lib/pricing/config";

interface BuyCreditsButtonProps {
  businessId: number;
  currentBalance?: number;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function BuyCreditsButton({
  businessId,
  currentBalance = 0,
  variant = "default",
  size = "default",
  className,
}: BuyCreditsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    setIsLoading(true);
    setSelectedPackage(packageId);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          packageId,
          successUrl: `${window.location.origin}/dashboard/credits?success=true`,
          cancelUrl: `${window.location.origin}/dashboard/credits?canceled=true`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : "Failed to start checkout");
    } finally {
      setIsLoading(false);
      setSelectedPackage(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <CreditCard className="mr-2 h-4 w-4" />
          Buy Credits
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md dark:bg-cpSurface dark:border-cpAmber/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 dark:text-cpCream">
            <Coins className="h-5 w-5 text-cpAmber" />
            Top Up Credits
          </DialogTitle>
          <DialogDescription className="dark:text-cpCream/70">
            Current balance:{" "}
            <span className="font-semibold text-foreground dark:text-cpCream">
              {(currentBalance / 100).toFixed(2)}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {CREDIT_PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => handlePurchase(pkg.id)}
              disabled={isLoading}
              className="flex items-center justify-between p-4 border border-border dark:border-cpAmber/30 rounded-lg hover:border-cpAmber hover:bg-cpAmber/5 dark:hover:bg-cpAmber/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-left">
                <p className="font-medium text-foreground dark:text-cpCream">{pkg.label}</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/60">
                  {pkg.credits} credits
                </p>
              </div>
              {isLoading && selectedPackage === pkg.id ? (
                <Loader2 className="h-5 w-5 animate-spin text-cpAmber" />
              ) : (
                <span className="text-cpAmber font-semibold">
                  {pkg.label}
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground dark:text-cpCream/50 text-center">
          Secure payment via Stripe. Credits never expire.
        </p>
      </DialogContent>
    </Dialog>
  );
}

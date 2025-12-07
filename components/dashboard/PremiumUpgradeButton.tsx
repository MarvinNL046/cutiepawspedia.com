"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Crown, Loader2, Check, Sparkles } from "lucide-react";
import { PREMIUM_UPGRADE_PRICE_CENTS } from "@/lib/pricing/config";

interface PremiumUpgradeButtonProps {
  placeId: number;
  businessId: number;
  placeName: string;
  isPremium?: boolean;
  creditBalance?: number;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const PREMIUM_FEATURES = [
  "Featured placement in search results",
  "Premium badge on your listing",
  "Discounted lead pricing (save 40%)",
  "Priority in category pages",
];

export function PremiumUpgradeButton({
  placeId,
  businessId,
  placeName,
  isPremium = false,
  creditBalance = 0,
  variant = "default",
  size = "default",
  className,
}: PremiumUpgradeButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priceFormatted = (PREMIUM_UPGRADE_PRICE_CENTS / 100).toFixed(2);
  const balanceFormatted = (creditBalance / 100).toFixed(2);
  const hasEnoughCredits = creditBalance >= PREMIUM_UPGRADE_PRICE_CENTS;

  const handleUpgrade = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/premium/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId, businessId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upgrade");
      }

      // Success - close dialog and refresh page
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upgrade failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Already premium
  if (isPremium) {
    return (
      <Button variant="ghost" size={size} className={className} disabled>
        <Crown className="mr-2 h-4 w-4 text-amber-500" />
        Premium Active
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white ${className}`}
        >
          <Crown className="mr-2 h-4 w-4" />
          Upgrade to Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md dark:bg-cpSurface dark:border-cpAmber/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 dark:text-cpCream">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="dark:text-cpCream/70">
            Make <span className="font-medium text-foreground dark:text-cpCream">{placeName}</span>{" "}
            stand out with premium features.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Features list */}
          <div className="space-y-3 mb-6">
            {PREMIUM_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-muted-foreground dark:text-cpCream/70">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="bg-muted dark:bg-cpCharcoal rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground dark:text-cpCream/70">Premium upgrade</span>
              <span className="font-semibold text-foreground dark:text-cpCream">{priceFormatted}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground dark:text-cpCream/60">Your balance</span>
              <span
                className={hasEnoughCredits ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}
              >
                {balanceFormatted}
              </span>
            </div>
            {!hasEnoughCredits && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                Insufficient credits. Please top up first.
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 mt-3 text-center">{error}</p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="dark:border-cpAmber/30 dark:text-cpCream dark:hover:bg-cpAmber/10">
            Cancel
          </Button>
          <Button
            onClick={handleUpgrade}
            disabled={isLoading || !hasEnoughCredits}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Upgrading...
              </>
            ) : (
              <>
                <Crown className="mr-2 h-4 w-4" />
                Upgrade for {priceFormatted}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

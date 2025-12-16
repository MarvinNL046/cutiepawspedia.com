/**
 * PlaceFeatureBadges - Display accessibility and service features
 *
 * Shows badges for wheelchair access, parking, and service options
 * from SERP API data stored in scraped_content.
 */

"use client";

import { Badge } from "@/components/ui/badge";
import {
  Accessibility,
  Car,
  Truck,
  ShoppingBag,
  UtensilsCrossed,
  Coffee,
  Wifi,
  CreditCard,
  Dog,
  Clock,
  Phone,
  Calendar
} from "lucide-react";
import { useTranslations } from "next-intl";

interface AccessibilityData {
  wheelchairEntrance?: boolean;
  parking?: boolean;
}

interface PlaceFeatureBadgesProps {
  accessibility?: AccessibilityData | null;
  serviceOptions?: string[] | null;
  workStatus?: string | null;
  className?: string;
}

// Map service option strings to icons
const serviceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "delivery": Truck,
  "takeout": ShoppingBag,
  "dine-in": UtensilsCrossed,
  "curbside pickup": Car,
  "in-store pickup": ShoppingBag,
  "online appointments": Calendar,
  "onsite services": Dog,
};

// Normalize service option text for matching
function normalizeServiceOption(option: string): string {
  return option.toLowerCase().trim();
}

// Get icon for service option
function getServiceIcon(option: string): React.ComponentType<{ className?: string }> {
  const normalized = normalizeServiceOption(option);
  for (const [key, icon] of Object.entries(serviceIconMap)) {
    if (normalized.includes(key)) {
      return icon;
    }
  }
  return Coffee; // Default icon
}

export function PlaceFeatureBadges({
  accessibility,
  serviceOptions,
  workStatus,
  className = "",
}: PlaceFeatureBadgesProps) {
  const t = useTranslations("place");

  const hasAccessibility = accessibility?.wheelchairEntrance || accessibility?.parking;
  const hasServices = serviceOptions && serviceOptions.length > 0;
  const hasWorkStatus = workStatus && workStatus.length > 0;

  // Don't render if no data
  if (!hasAccessibility && !hasServices && !hasWorkStatus) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* Work Status Badge */}
      {hasWorkStatus && (
        <Badge
          variant="outline"
          className={`gap-1.5 ${
            workStatus.toLowerCase().includes("open")
              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              : workStatus.toLowerCase().includes("closed")
                ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
          }`}
        >
          <Clock className="h-3 w-3" />
          {workStatus}
        </Badge>
      )}

      {/* Accessibility Badges */}
      {accessibility?.wheelchairEntrance && (
        <Badge
          variant="outline"
          className="gap-1.5 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
        >
          <Accessibility className="h-3 w-3" />
          {t("wheelchairAccessible")}
        </Badge>
      )}

      {accessibility?.parking && (
        <Badge
          variant="outline"
          className="gap-1.5 bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700"
        >
          <Car className="h-3 w-3" />
          {t("parkingAvailable")}
        </Badge>
      )}

      {/* Service Options Badges */}
      {hasServices && serviceOptions.slice(0, 4).map((option, index) => {
        const Icon = getServiceIcon(option);
        return (
          <Badge
            key={index}
            variant="outline"
            className="gap-1.5 bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
          >
            <Icon className="h-3 w-3" />
            {option}
          </Badge>
        );
      })}

      {/* Show +X more if there are many service options */}
      {hasServices && serviceOptions.length > 4 && (
        <Badge
          variant="outline"
          className="bg-muted text-muted-foreground border-muted-foreground/20"
        >
          +{serviceOptions.length - 4} {t("more")}
        </Badge>
      )}
    </div>
  );
}

export default PlaceFeatureBadges;

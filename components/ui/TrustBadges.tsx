"use client";

import {
  BadgeCheck,
  Star,
  Heart,
  Camera,
  Crown,
  type LucideIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  TRUST_BADGES,
  type TrustBadgeType,
  type TrustBadge,
} from "@/lib/trustBadges/config";

// ============================================================================
// ICON MAP
// ============================================================================

const ICON_MAP: Record<string, LucideIcon> = {
  BadgeCheck,
  Star,
  Heart,
  Camera,
  Crown,
};

// ============================================================================
// TYPES
// ============================================================================

interface PlaceBadgeData {
  isVerified?: boolean;
  isTopRated?: boolean;
  isCommunityFavorite?: boolean;
  hasPhotos?: boolean;
  isPremium?: boolean;
}

interface TrustBadgesProps {
  place: PlaceBadgeData;
  variant?: "inline" | "stacked" | "compact";
  showLabels?: boolean;
  className?: string;
}

// ============================================================================
// HELPER
// ============================================================================

function getActiveBadges(place: PlaceBadgeData): TrustBadge[] {
  const badges: TrustBadge[] = [];

  // Order matters - Premium and Verified first
  if (place.isPremium) badges.push(TRUST_BADGES.premium);
  if (place.isVerified) badges.push(TRUST_BADGES.verified);
  if (place.isTopRated) badges.push(TRUST_BADGES.top_rated);
  if (place.isCommunityFavorite) badges.push(TRUST_BADGES.community_favorite);
  if (place.hasPhotos) badges.push(TRUST_BADGES.photo_verified);

  return badges;
}

// ============================================================================
// SINGLE BADGE COMPONENT
// ============================================================================

function TrustBadgeIcon({
  badge,
  showLabel = false,
  size = "sm",
}: {
  badge: TrustBadge;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const Icon = ICON_MAP[badge.icon];
  if (!Icon) return null;

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              "inline-flex items-center gap-1",
              badge.color
            )}
          >
            <Icon className={sizeClasses[size]} />
            {showLabel && (
              <span className="text-xs font-medium">{badge.label}</span>
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          <p className="font-medium">{badge.label}</p>
          <p className="text-muted-foreground">{badge.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function TrustBadges({
  place,
  variant = "inline",
  showLabels = false,
  className,
}: TrustBadgesProps) {
  const badges = getActiveBadges(place);

  if (badges.length === 0) {
    return null;
  }

  if (variant === "compact") {
    // Just show icons in a row
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {badges.map((badge) => (
          <TrustBadgeIcon key={badge.type} badge={badge} size="sm" />
        ))}
      </div>
    );
  }

  if (variant === "stacked") {
    // Show badges vertically with labels
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {badges.map((badge) => (
          <Badge
            key={badge.type}
            variant="secondary"
            className={cn("justify-start gap-1.5", badge.color)}
          >
            {(() => {
              const Icon = ICON_MAP[badge.icon];
              return Icon ? <Icon className="h-3.5 w-3.5" /> : null;
            })()}
            <span>{badge.label}</span>
          </Badge>
        ))}
      </div>
    );
  }

  // Default: inline with optional labels
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {badges.map((badge) => (
        <TrustBadgeIcon
          key={badge.type}
          badge={badge}
          showLabel={showLabels}
          size="md"
        />
      ))}
    </div>
  );
}

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

export { TrustBadgeIcon };
export type { PlaceBadgeData, TrustBadgesProps };

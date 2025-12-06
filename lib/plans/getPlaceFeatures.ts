/**
 * Plan Features Helper for Place Pages
 *
 * Extracts plan features from a place's business relation and provides
 * defaults for unclaimed places (FREE tier).
 */

import { type PlanKey, type PlanFeatures, getPlanFeatures, PLAN_CONFIG } from "./config";

// Type for the business relation from Drizzle
interface BusinessRelation {
  id: number;
  planKey: string | null;
  planStatus: string | null;
  subscriptionPlan?: {
    priorityRank: number;
    hasFeaturedStyling: boolean;
    showPlanBadge: boolean;
    badgeText: string | null;
    badgeColor: string | null;
  } | null;
}

// Type for the place with business relation
export interface PlaceWithBusiness {
  businessId: number | null;
  business?: BusinessRelation | BusinessRelation[] | null;
}

// Resolved features for display
export interface ResolvedPlaceFeatures extends PlanFeatures {
  planKey: PlanKey;
  isClaimed: boolean;
  planBadge: { text: string; color: string } | null;
}

/**
 * Get the effective plan features for a place
 * Returns FREE tier features if unclaimed or no active subscription
 */
export function getPlaceFeatures(place: PlaceWithBusiness): ResolvedPlaceFeatures {
  // Handle Drizzle relation (can be array or single object)
  const business = Array.isArray(place.business) ? place.business[0] : place.business;

  // Check if place is claimed and has a business
  const isClaimed = !!business && !!place.businessId;

  // Get the plan key - default to FREE if unclaimed or no plan set
  let planKey: PlanKey = "FREE";
  if (isClaimed && business?.planKey) {
    // Validate planKey is a valid PlanKey
    if (business.planKey in PLAN_CONFIG) {
      planKey = business.planKey as PlanKey;
    }
  }

  // Check if subscription is active (status check)
  const isActiveSubscription =
    business?.planStatus === "ACTIVE" ||
    business?.planStatus === "TRIAL";

  // If subscription is not active, fall back to FREE
  if (isClaimed && !isActiveSubscription && planKey !== "FREE") {
    planKey = "FREE";
  }

  // Get plan features from config
  const features = getPlanFeatures(planKey);

  // Build plan badge
  const planBadge =
    features.showPlanBadge && features.badgeText
      ? { text: features.badgeText, color: features.badgeColor ?? "gray" }
      : null;

  return {
    ...features,
    planKey,
    isClaimed,
    planBadge,
  };
}

/**
 * Check if a specific feature is enabled for a place
 */
export function canPlaceShow(
  place: PlaceWithBusiness,
  feature: keyof PlanFeatures
): boolean {
  const features = getPlaceFeatures(place);
  const value = features[feature];

  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  return !!value;
}

/**
 * Get upgrade CTA info for places on lower tiers
 */
export function getUpgradeCTA(
  place: PlaceWithBusiness,
  locale: string = "en"
): {
  showUpgradeCTA: boolean;
  message: string;
  targetPlan: PlanKey;
} | null {
  const features = getPlaceFeatures(place);

  // If already on PRO or ELITE, no upgrade needed for basic features
  if (features.planKey === "PRO" || features.planKey === "ELITE") {
    return null;
  }

  // If unclaimed, suggest claiming first
  if (!features.isClaimed) {
    return {
      showUpgradeCTA: true,
      message:
        locale === "nl"
          ? "Claim dit bedrijf om contactgegevens toe te voegen"
          : "Claim this business to add contact information",
      targetPlan: "STARTER",
    };
  }

  // If on FREE, suggest STARTER
  if (features.planKey === "FREE") {
    return {
      showUpgradeCTA: true,
      message:
        locale === "nl"
          ? "Upgrade naar Starter om contactgegevens te tonen"
          : "Upgrade to Starter to display contact information",
      targetPlan: "STARTER",
    };
  }

  return null;
}

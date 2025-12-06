/**
 * Subscription Plans Configuration
 *
 * Centralized configuration for business subscription plans.
 * Used by: pricing page, dashboard, listing display, search ranking
 *
 * IMPORTANT: Reviews are NOT gated - all tiers can receive, display, and respond to reviews.
 */

export type PlanKey = "FREE" | "STARTER" | "PRO" | "ELITE";

export type PlanStatus = "ACTIVE" | "CANCELLED" | "TRIAL" | "PAST_DUE" | "INACTIVE";

export interface PlanFeatures {
  // Photos
  maxPhotos: number;

  // Contact info display
  canShowWebsite: boolean;
  canShowEmail: boolean;
  canShowPhone: boolean;
  canShowSocialLinks: boolean;

  // Listing features
  maxCategories: number;
  canShowDescription: boolean;

  // Ranking & visibility
  priorityRank: number; // Higher = shown first (ELITE=4, PRO=3, STARTER=2, FREE=1)
  hasFeaturedStyling: boolean;
  hasEnhancedStyling: boolean; // ELITE: custom branding, larger logo

  // Analytics
  hasBasicAnalytics: boolean;
  hasAdvancedAnalytics: boolean;

  // Badge display
  showPlanBadge: boolean;
  badgeText: string | null;
  badgeColor: string | null;

  // ELITE features
  hasVerifiedBadge: boolean; // Trust indicator
  hasHomepageSpotlight: boolean; // Featured on homepage/city pages
  maxLocations: number; // Multi-location support (1 = single, 0 = unlimited)
  hasPrioritySupport: boolean; // Faster response times
  hasApiAccess: boolean; // API integration (future)
}

export interface PlanDefinition {
  key: PlanKey;
  name: string;
  nameNl: string;
  description: string;
  descriptionNl: string;
  monthlyPriceCents: number;
  yearlyPriceCents: number | null; // null = not available yet
  // Stripe Price IDs - set via environment variables
  stripePriceIdMonthly: string | null;
  stripePriceIdYearly: string | null;
  features: PlanFeatures;
  isPopular?: boolean;
  isActive: boolean;
  sortOrder: number;
}

/**
 * Plan configuration - single source of truth
 */
export const PLAN_CONFIG: Record<PlanKey, PlanDefinition> = {
  FREE: {
    key: "FREE",
    name: "Free",
    nameNl: "Gratis",
    description: "Basic listing to get started",
    descriptionNl: "Basis vermelding om te beginnen",
    monthlyPriceCents: 0,
    yearlyPriceCents: null,
    stripePriceIdMonthly: null, // Free plan has no Stripe price
    stripePriceIdYearly: null,
    isActive: true,
    sortOrder: 1,
    features: {
      maxPhotos: 0, // Only UGC photos allowed
      canShowWebsite: false,
      canShowEmail: false,
      canShowPhone: false,
      canShowSocialLinks: false,
      maxCategories: 1,
      canShowDescription: false,
      priorityRank: 1,
      hasFeaturedStyling: false,
      hasEnhancedStyling: false,
      hasBasicAnalytics: false,
      hasAdvancedAnalytics: false,
      showPlanBadge: false,
      badgeText: null,
      badgeColor: null,
      hasVerifiedBadge: false,
      hasHomepageSpotlight: false,
      maxLocations: 1,
      hasPrioritySupport: false,
      hasApiAccess: false,
    },
  },

  STARTER: {
    key: "STARTER",
    name: "Starter",
    nameNl: "Starter",
    description: "Essential features for growing businesses",
    descriptionNl: "Essentiële functies voor groeiende bedrijven",
    monthlyPriceCents: 700, // €7/month
    yearlyPriceCents: 7000, // €70/year (save €14)
    stripePriceIdMonthly: process.env.STRIPE_PRICE_STARTER_MONTHLY || null,
    stripePriceIdYearly: process.env.STRIPE_PRICE_STARTER_YEARLY || null,
    isPopular: false,
    isActive: true,
    sortOrder: 2,
    features: {
      maxPhotos: 3,
      canShowWebsite: true,
      canShowEmail: true,
      canShowPhone: true,
      canShowSocialLinks: false,
      maxCategories: 2,
      canShowDescription: true,
      priorityRank: 2,
      hasFeaturedStyling: false,
      hasEnhancedStyling: false,
      hasBasicAnalytics: true,
      hasAdvancedAnalytics: false,
      showPlanBadge: true,
      badgeText: "Starter",
      badgeColor: "blue",
      hasVerifiedBadge: false,
      hasHomepageSpotlight: false,
      maxLocations: 1,
      hasPrioritySupport: false,
      hasApiAccess: false,
    },
  },

  PRO: {
    key: "PRO",
    name: "Pro",
    nameNl: "Pro",
    description: "Maximum visibility and engagement",
    descriptionNl: "Maximale zichtbaarheid en betrokkenheid",
    monthlyPriceCents: 1900, // €19/month
    yearlyPriceCents: 19000, // €190/year (save €38)
    stripePriceIdMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY || null,
    stripePriceIdYearly: process.env.STRIPE_PRICE_PRO_YEARLY || null,
    isPopular: true,
    isActive: true,
    sortOrder: 3,
    features: {
      maxPhotos: 10,
      canShowWebsite: true,
      canShowEmail: true,
      canShowPhone: true,
      canShowSocialLinks: true,
      maxCategories: 5,
      canShowDescription: true,
      priorityRank: 3,
      hasFeaturedStyling: true,
      hasEnhancedStyling: false,
      hasBasicAnalytics: true,
      hasAdvancedAnalytics: true,
      showPlanBadge: true,
      badgeText: "Pro",
      badgeColor: "amber",
      hasVerifiedBadge: false,
      hasHomepageSpotlight: false,
      maxLocations: 1,
      hasPrioritySupport: false,
      hasApiAccess: false,
    },
  },

  ELITE: {
    key: "ELITE",
    name: "Elite",
    nameNl: "Elite",
    description: "Enterprise features for large businesses",
    descriptionNl: "Enterprise functies voor grote bedrijven",
    monthlyPriceCents: 3900, // €39/month
    yearlyPriceCents: 39000, // €390/year (save €78)
    stripePriceIdMonthly: process.env.STRIPE_PRICE_ELITE_MONTHLY || null,
    stripePriceIdYearly: process.env.STRIPE_PRICE_ELITE_YEARLY || null,
    isPopular: false,
    isActive: true, // Now available!
    sortOrder: 4,
    features: {
      maxPhotos: 20,
      canShowWebsite: true,
      canShowEmail: true,
      canShowPhone: true,
      canShowSocialLinks: true,
      maxCategories: 10,
      canShowDescription: true,
      priorityRank: 4,
      hasFeaturedStyling: true,
      hasEnhancedStyling: true, // Custom branding, larger logo
      hasBasicAnalytics: true,
      hasAdvancedAnalytics: true,
      showPlanBadge: true,
      badgeText: "Elite",
      badgeColor: "purple",
      hasVerifiedBadge: true, // Trust indicator
      hasHomepageSpotlight: true, // Featured on homepage/city pages
      maxLocations: 0, // Unlimited locations
      hasPrioritySupport: true, // Faster response times
      hasApiAccess: true, // API integration (future)
    },
  },
};

/**
 * Get all active plans (for pricing page display)
 */
export function getActivePlans(): PlanDefinition[] {
  return Object.values(PLAN_CONFIG)
    .filter((plan) => plan.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get plan by key
 */
export function getPlan(key: PlanKey): PlanDefinition {
  return PLAN_CONFIG[key];
}

/**
 * Get plan features by key
 */
export function getPlanFeatures(key: PlanKey): PlanFeatures {
  return PLAN_CONFIG[key].features;
}

/**
 * Format price for display
 */
export function formatPlanPrice(
  priceCents: number,
  locale: string = "en"
): string {
  if (priceCents === 0) {
    return locale === "nl" ? "Gratis" : "Free";
  }
  const euros = priceCents / 100;
  return new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(euros);
}

/**
 * Check if a business can show a specific feature based on plan
 */
export function canShowFeature(
  planKey: PlanKey,
  feature: keyof PlanFeatures
): boolean {
  const features = getPlanFeatures(planKey);
  const value = features[feature];
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  return !!value;
}

/**
 * Get priority rank for sorting businesses in search results
 * Higher number = higher priority
 */
export function getPriorityRank(planKey: PlanKey): number {
  return getPlanFeatures(planKey).priorityRank;
}

/**
 * Feature comparison for pricing page
 */
export interface FeatureComparison {
  name: string;
  nameNl: string;
  free: string | boolean;
  starter: string | boolean;
  pro: string | boolean;
  elite?: string | boolean;
}

export const FEATURE_COMPARISONS: FeatureComparison[] = [
  // Basic features available to all
  {
    name: "Business listing",
    nameNl: "Bedrijfsvermelding",
    free: true,
    starter: true,
    pro: true,
    elite: true,
  },
  {
    name: "Receive & display reviews",
    nameNl: "Reviews ontvangen & tonen",
    free: true,
    starter: true,
    pro: true,
    elite: true,
  },
  {
    name: "Respond to reviews",
    nameNl: "Reageren op reviews",
    free: true,
    starter: true,
    pro: true,
    elite: true,
  },
  // Content & media
  {
    name: "Business photos",
    nameNl: "Bedrijfsfoto's",
    free: "0",
    starter: "3",
    pro: "10",
    elite: "20 + HD",
  },
  {
    name: "Business description",
    nameNl: "Bedrijfsomschrijving",
    free: false,
    starter: true,
    pro: true,
    elite: true,
  },
  // Contact info
  {
    name: "Website link",
    nameNl: "Website link",
    free: false,
    starter: true,
    pro: true,
    elite: true,
  },
  {
    name: "Email & phone contact",
    nameNl: "E-mail & telefoon contact",
    free: false,
    starter: true,
    pro: true,
    elite: true,
  },
  {
    name: "Social media links",
    nameNl: "Social media links",
    free: false,
    starter: false,
    pro: true,
    elite: true,
  },
  // Categories & visibility
  {
    name: "Categories",
    nameNl: "Categorieën",
    free: "1",
    starter: "2",
    pro: "5",
    elite: "10",
  },
  {
    name: "Search ranking priority",
    nameNl: "Prioriteit in zoekresultaten",
    free: "Standard",
    starter: "Higher",
    pro: "High",
    elite: "Highest",
  },
  {
    name: "Featured styling",
    nameNl: "Uitgelichte styling",
    free: false,
    starter: false,
    pro: true,
    elite: true,
  },
  // Analytics
  {
    name: "Basic analytics",
    nameNl: "Basis statistieken",
    free: false,
    starter: true,
    pro: true,
    elite: true,
  },
  {
    name: "Advanced analytics",
    nameNl: "Geavanceerde statistieken",
    free: false,
    starter: false,
    pro: true,
    elite: true,
  },
  // Badges
  {
    name: "Plan badge",
    nameNl: "Abonnement badge",
    free: false,
    starter: "Starter",
    pro: "Pro",
    elite: "Elite",
  },
  // ELITE exclusive features
  {
    name: "Verified business badge",
    nameNl: "Geverifieerd bedrijf badge",
    free: false,
    starter: false,
    pro: false,
    elite: true,
  },
  {
    name: "Homepage spotlight",
    nameNl: "Homepage uitgelicht",
    free: false,
    starter: false,
    pro: false,
    elite: true,
  },
  {
    name: "Multi-location support",
    nameNl: "Meerdere locaties",
    free: "1",
    starter: "1",
    pro: "1",
    elite: "Unlimited",
  },
  {
    name: "Custom branding",
    nameNl: "Eigen huisstijl",
    free: false,
    starter: false,
    pro: false,
    elite: true,
  },
  {
    name: "Priority support",
    nameNl: "Prioriteit ondersteuning",
    free: false,
    starter: false,
    pro: false,
    elite: true,
  },
  {
    name: "API access",
    nameNl: "API toegang",
    free: false,
    starter: false,
    pro: false,
    elite: "Coming soon",
  },
];

/**
 * Default plan for new businesses
 */
export const DEFAULT_PLAN: PlanKey = "FREE";

/**
 * Trial duration in days (for future use)
 */
export const TRIAL_DURATION_DAYS = 14;

/**
 * Get Stripe Price ID for a plan
 */
export function getStripePriceId(
  planKey: PlanKey,
  interval: "monthly" | "yearly"
): string | null {
  const plan = PLAN_CONFIG[planKey];
  return interval === "monthly"
    ? plan.stripePriceIdMonthly
    : plan.stripePriceIdYearly;
}

/**
 * Check if Stripe is properly configured for a plan
 */
export function isStripeConfigured(planKey: PlanKey): boolean {
  const plan = PLAN_CONFIG[planKey];
  // Free plan doesn't need Stripe
  if (planKey === "FREE") return true;
  // Check if at least monthly price ID is set
  return !!plan.stripePriceIdMonthly;
}

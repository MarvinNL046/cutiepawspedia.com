/**
 * Trust Badges Configuration
 *
 * Defines thresholds and criteria for each badge type.
 */

export const TRUST_BADGE_CONFIG = {
  // Top Rated badge thresholds
  topRated: {
    minRating: 4.5, // Minimum average rating
    minReviews: 5, // Minimum number of reviews
  },

  // Community Favorite badge thresholds
  communityFavorite: {
    minReviews: 10, // Minimum number of reviews
    minRating: 4.0, // Minimum average rating
  },

  // Verified business - requires isVerified flag (set by admin)
  // No additional computation needed

  // Photo Verified - requires hasPhotos flag
  // Updated automatically when photos are approved

  // Premium Listing - requires isPremium flag
  // Set when business pays for premium
} as const;

export type TrustBadgeType =
  | "verified"
  | "top_rated"
  | "community_favorite"
  | "photo_verified"
  | "premium";

export interface TrustBadge {
  type: TrustBadgeType;
  label: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
}

export const TRUST_BADGES: Record<TrustBadgeType, TrustBadge> = {
  verified: {
    type: "verified",
    label: "Verified Business",
    description: "This business has been verified by our team",
    icon: "BadgeCheck",
    color: "text-blue-500",
  },
  top_rated: {
    type: "top_rated",
    label: "Top Rated",
    description: "Highly rated with excellent reviews",
    icon: "Star",
    color: "text-yellow-500",
  },
  community_favorite: {
    type: "community_favorite",
    label: "Community Favorite",
    description: "Popular choice among the community",
    icon: "Heart",
    color: "text-red-500",
  },
  photo_verified: {
    type: "photo_verified",
    label: "Photo Verified",
    description: "Has verified community photos",
    icon: "Camera",
    color: "text-green-500",
  },
  premium: {
    type: "premium",
    label: "Premium Listing",
    description: "Premium business listing",
    icon: "Crown",
    color: "text-purple-500",
  },
};

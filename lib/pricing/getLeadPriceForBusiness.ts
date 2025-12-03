/**
 * Lead Pricing Engine
 * Determines the price for a lead based on business and place configuration
 */

import { DEFAULT_LEAD_PRICE_CENTS, PREMIUM_LEAD_PRICE_CENTS } from "./config";

interface Business {
  leadPriceCents: number | null;
  autoChargeEnabled?: boolean;
}

interface Place {
  isPremium: boolean;
  premiumLevel?: number;
}

/**
 * Get the lead price for a business/place combination
 *
 * Priority order:
 * 1. Business custom lead price override (if set)
 * 2. Premium place discount (if place is premium)
 * 3. Default lead price
 *
 * @param options - Business and place information
 * @returns Price in cents
 */
export function getLeadPriceForBusiness(options: {
  business: Business | null;
  place: Place | null;
}): number {
  const { business, place } = options;

  // 1. Business override takes precedence
  if (business?.leadPriceCents != null && business.leadPriceCents > 0) {
    return business.leadPriceCents;
  }

  // 2. Premium places get discounted lead price
  if (place?.isPremium) {
    return PREMIUM_LEAD_PRICE_CENTS;
  }

  // 3. Default price
  return DEFAULT_LEAD_PRICE_CENTS;
}

/**
 * Check if a business should be auto-charged for leads
 */
export function shouldAutoCharge(business: Business | null): boolean {
  if (!business) return false;
  return business.autoChargeEnabled !== false; // Default to true if not set
}

/**
 * Check if a business has sufficient credits for a lead
 */
export function hasEnoughCreditsForLead(
  creditBalanceCents: number,
  leadPriceCents: number
): boolean {
  return creditBalanceCents >= leadPriceCents;
}

/**
 * Format price in cents to display string
 */
export function formatPriceCents(cents: number, locale: string = "en"): string {
  const euros = cents / 100;
  return new Intl.NumberFormat(
    locale === "nl" ? "nl-NL" : locale === "de" ? "de-DE" : "en-US",
    { style: "currency", currency: "EUR" }
  ).format(euros);
}

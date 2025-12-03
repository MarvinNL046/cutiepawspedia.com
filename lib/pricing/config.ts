/**
 * Pricing Configuration
 * All amounts in cents (EUR)
 */

// Lead pricing
export const DEFAULT_LEAD_PRICE_CENTS = 250; // €2.50 per lead (default)
export const PREMIUM_LEAD_PRICE_CENTS = 150; // €1.50 per lead (discount for premium places)

// Premium upgrade pricing
export const PREMIUM_UPGRADE_PRICE_CENTS = 1500; // €15.00 for premium upgrade

// Credit top-up packages
export const CREDIT_PACKAGES = [
  { id: "credits_20", amountCents: 2000, label: "€20", credits: 2000 },
  { id: "credits_50", amountCents: 5000, label: "€50", credits: 5000 },
  { id: "credits_100", amountCents: 10000, label: "€100", credits: 10000 },
] as const;

// Stripe configuration
export const STRIPE_CURRENCY = "eur";

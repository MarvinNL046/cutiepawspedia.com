/**
 * Ad Visibility Server-Side Helper
 *
 * Determines whether ads should be shown based on user auth state.
 * Part of A1: AdSense Integration + Ad-free Members
 *
 * Strategy:
 * - Anonymous visitors: See ads
 * - Logged-in users: Ad-free experience
 * - Future: Premium users could have additional ad-free benefits
 */

import "server-only";
import { stackServerApp } from "@/lib/auth/stack";

export interface AdVisibilityContext {
  /** Whether the user is currently logged in */
  isLoggedIn: boolean;
  /** Whether ads should be displayed to this user */
  showAds: boolean;
  /** Future: Whether user has premium ad-free subscription */
  isPremium: boolean;
  /** Whether ads are globally enabled via env */
  adsEnabled: boolean;
}

/**
 * Get ad visibility context for the current request (server-side)
 *
 * @returns AdVisibilityContext with all relevant flags
 */
export async function getAdVisibilityContext(): Promise<AdVisibilityContext> {
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  // If ads are globally disabled, short-circuit
  if (!adsEnabled) {
    return {
      isLoggedIn: false,
      showAds: false,
      isPremium: false,
      adsEnabled: false,
    };
  }

  // Check if user is logged in
  let isLoggedIn = false;
  const isPremium = false; // Future: check from database

  try {
    const user = await stackServerApp?.getUser();
    isLoggedIn = !!user;

  } catch {
    // Auth check failed, assume not logged in
    isLoggedIn = false;
  }

  return {
    isLoggedIn,
    showAds: !isLoggedIn, // Logged-in users get ad-free experience
    isPremium,
    adsEnabled,
  };
}

/**
 * Simple check for whether to show ads (server-side)
 * Use this when you only need the boolean
 */
export async function shouldShowAds(): Promise<boolean> {
  const context = await getAdVisibilityContext();
  return context.showAds;
}

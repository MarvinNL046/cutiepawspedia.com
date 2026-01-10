/**
 * Client-Side Ad Visibility Provider
 *
 * Determines ad visibility based on client-side auth state.
 * This replaces the server-side auth check to prevent SSR bailout issues.
 *
 * Benefits:
 * - No SSR bailout (allows proper 404 status codes)
 * - Ads show immediately for anonymous users
 * - Ads hide after auth state is determined for logged-in users
 */

"use client";

import { ReactNode, useMemo } from "react";
import { useUser } from "@stackframe/stack";
import { AdVisibilityProvider, type AdVisibility } from "./AdVisibilityContext";

interface AdVisibilityProviderClientProps {
  children: ReactNode;
}

/**
 * Client-side provider that determines ad visibility based on auth state
 * Uses StackAuth's useUser hook to check login status
 */
export function AdVisibilityProviderClient({ children }: AdVisibilityProviderClientProps) {
  // Check if ads are enabled globally
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  // Get user from StackAuth client-side
  // This hook is safe to call - it returns null/undefined when not logged in
  let user = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    user = useUser();
  } catch {
    // If StackAuth is not configured, user stays null
  }

  const isLoggedIn = !!user;

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue: AdVisibility = useMemo(
    () => ({
      showAds: !isLoggedIn && adsEnabled, // Show ads only for anonymous users when enabled
      isLoggedIn,
      adsEnabled,
    }),
    [isLoggedIn, adsEnabled]
  );

  return (
    <AdVisibilityProvider value={contextValue}>
      {children}
    </AdVisibilityProvider>
  );
}

/**
 * Ad Visibility Context
 *
 * Client-side context for ad visibility state.
 * Server components determine visibility and pass it down via this provider.
 * Part of A1: AdSense Integration + Ad-free Members
 */

"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface AdVisibility {
  /** Whether ads should be displayed */
  showAds: boolean;
  /** Whether user is logged in */
  isLoggedIn: boolean;
  /** Whether ads are enabled globally */
  adsEnabled: boolean;
}

const defaultContext: AdVisibility = {
  showAds: true, // Default to showing ads for anonymous users
  isLoggedIn: false,
  adsEnabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",
};

const AdVisibilityContext = createContext<AdVisibility>(defaultContext);

interface AdVisibilityProviderProps {
  value: AdVisibility;
  children: ReactNode;
}

/**
 * Provider component for ad visibility context
 * Use in layouts to pass server-determined visibility to client components
 */
export function AdVisibilityProvider({ value, children }: AdVisibilityProviderProps) {
  return (
    <AdVisibilityContext.Provider value={value}>
      {children}
    </AdVisibilityContext.Provider>
  );
}

/**
 * Hook to access ad visibility state
 * Use in ad components to determine whether to render
 */
export function useAdVisibility(): AdVisibility {
  return useContext(AdVisibilityContext);
}

/**
 * Hook to check if ads should be shown
 * Convenience wrapper around useAdVisibility
 */
export function useShouldShowAds(): boolean {
  const { showAds, adsEnabled } = useAdVisibility();
  return showAds && adsEnabled;
}

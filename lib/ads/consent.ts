/**
 * Cookie Consent Management
 *
 * GDPR-compliant consent management for advertising cookies.
 * Part of A1: AdSense Integration + Ad-free Members
 *
 * Consent States:
 * - null: Not yet decided (show banner)
 * - true: Accepted advertising cookies
 * - false: Declined advertising cookies
 *
 * Google Consent Mode v2 Integration:
 * - Sends consent signals to Google (ad_storage, analytics_storage)
 * - Required for AdSense in EU/EEA since March 2024
 */

"use client";

// Cookie name for consent storage
const CONSENT_COOKIE_NAME = "cookie_consent";
const CONSENT_COOKIE_DAYS = 365;

export type ConsentState = "granted" | "denied" | null;

export interface ConsentPreferences {
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
  timestamp: number;
}

/**
 * Get current consent state from cookie
 */
export function getConsentState(): ConsentState {
  if (typeof window === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!cookie) return null;

  const value = cookie.split("=")[1];
  if (value === "granted") return "granted";
  if (value === "denied") return "denied";
  return null;
}

/**
 * Get detailed consent preferences
 */
export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}_prefs=`));

  if (!cookie) return null;

  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  } catch {
    return null;
  }
}

/**
 * Set consent state and update Google Consent Mode
 */
export function setConsentState(
  state: "granted" | "denied",
  preferences?: Partial<ConsentPreferences>
): void {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setDate(expires.getDate() + CONSENT_COOKIE_DAYS);

  // Set main consent cookie
  document.cookie = `${CONSENT_COOKIE_NAME}=${state}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

  // Set detailed preferences cookie
  const prefs: ConsentPreferences = {
    analytics: preferences?.analytics ?? (state === "granted"),
    advertising: preferences?.advertising ?? (state === "granted"),
    functional: true, // Always allowed
    timestamp: Date.now(),
  };
  document.cookie = `${CONSENT_COOKIE_NAME}_prefs=${encodeURIComponent(JSON.stringify(prefs))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

  // Update Google Consent Mode v2
  updateGoogleConsent(state, prefs);

  // Dispatch event for other components to react
  window.dispatchEvent(new CustomEvent("consentUpdate", { detail: { state, preferences: prefs } }));
}

/**
 * Check if advertising consent has been given
 */
export function hasAdConsent(): boolean {
  const state = getConsentState();
  if (state === null) return false; // No consent given yet
  return state === "granted";
}

/**
 * Check if consent banner should be shown
 */
export function shouldShowConsentBanner(): boolean {
  return getConsentState() === null;
}

/**
 * Revoke consent (for settings page)
 */
export function revokeConsent(): void {
  if (typeof window === "undefined") return;

  // Delete consent cookies
  document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `${CONSENT_COOKIE_NAME}_prefs=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

  // Update Google Consent Mode to denied
  updateGoogleConsent("denied", { analytics: false, advertising: false, functional: true, timestamp: Date.now() });

  // Dispatch event
  window.dispatchEvent(new CustomEvent("consentUpdate", { detail: { state: null } }));
}

// ============================================================================
// Google Consent Mode v2 Integration
// ============================================================================

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Initialize Google Consent Mode with default denied state
 * Should be called before any Google scripts load
 */
export function initGoogleConsentMode(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;

  // Get existing consent state
  const state = getConsentState();
  const prefs = getConsentPreferences();

  // Set default consent (denied until user accepts)
  gtag("consent", "default", {
    ad_storage: state === "granted" && prefs?.advertising ? "granted" : "denied",
    ad_user_data: state === "granted" && prefs?.advertising ? "granted" : "denied",
    ad_personalization: state === "granted" && prefs?.advertising ? "granted" : "denied",
    analytics_storage: state === "granted" && prefs?.analytics ? "granted" : "denied",
    functionality_storage: "granted", // Always allowed for basic functionality
    personalization_storage: state === "granted" ? "granted" : "denied",
    security_storage: "granted", // Always allowed for security
    wait_for_update: 500, // Wait 500ms for consent update
  });
}

/**
 * Update Google Consent Mode after user choice
 */
function updateGoogleConsent(state: "granted" | "denied", prefs: ConsentPreferences): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    ad_storage: state === "granted" && prefs.advertising ? "granted" : "denied",
    ad_user_data: state === "granted" && prefs.advertising ? "granted" : "denied",
    ad_personalization: state === "granted" && prefs.advertising ? "granted" : "denied",
    analytics_storage: state === "granted" && prefs.analytics ? "granted" : "denied",
    personalization_storage: state === "granted" ? "granted" : "denied",
  });
}

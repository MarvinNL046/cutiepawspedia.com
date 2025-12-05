"use client";

import { useEffect, useCallback, useRef } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/**
 * Hook for reCAPTCHA v3 integration
 *
 * Usage:
 * const { executeRecaptcha, isLoaded } = useRecaptcha();
 *
 * const handleSubmit = async () => {
 *   const token = await executeRecaptcha("lead_form");
 *   // Send token to server for verification
 * };
 */
export function useRecaptcha() {
  const isLoadedRef = useRef(false);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    // Skip if no site key configured
    if (!RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA site key not configured");
      return;
    }

    // Skip if already loaded or loading
    if (isLoadedRef.current || isLoadingRef.current) {
      return;
    }

    // Check if script is already in DOM
    if (document.querySelector('script[src*="recaptcha"]')) {
      isLoadedRef.current = true;
      return;
    }

    isLoadingRef.current = true;

    // Load the reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isLoadedRef.current = true;
      isLoadingRef.current = false;
    };

    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script");
      isLoadingRef.current = false;
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Note: We don't remove the script because it might be used by other components
    };
  }, []);

  /**
   * Execute reCAPTCHA and get a token
   *
   * @param action - A descriptive action name (e.g., "lead_form", "contact")
   * @returns The reCAPTCHA token, or null if not available
   */
  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    // If not configured, return null (server will handle gracefully)
    if (!RECAPTCHA_SITE_KEY) {
      return null;
    }

    // Wait for grecaptcha to be available
    if (typeof window === "undefined" || !window.grecaptcha) {
      console.warn("reCAPTCHA not loaded yet");
      return null;
    }

    try {
      return new Promise((resolve) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
            resolve(token);
          } catch (error) {
            console.error("reCAPTCHA execution error:", error);
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      return null;
    }
  }, []);

  return {
    executeRecaptcha,
    isConfigured: !!RECAPTCHA_SITE_KEY,
  };
}

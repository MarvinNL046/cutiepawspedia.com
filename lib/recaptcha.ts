/**
 * reCAPTCHA v3 Utilities
 *
 * Provides invisible spam protection for forms.
 * reCAPTCHA v3 returns a score (0.0 - 1.0) where:
 * - 1.0 = very likely a good interaction
 * - 0.0 = very likely a bot
 *
 * Recommended threshold: 0.5 for most use cases
 */

// Environment variable validation
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Score threshold - below this is considered suspicious
export const RECAPTCHA_THRESHOLD = 0.5;

/**
 * Verify a reCAPTCHA token on the server side
 *
 * @param token - The reCAPTCHA token from the client
 * @param expectedAction - The action name to verify (prevents token reuse)
 * @returns Verification result with score and any errors
 */
export async function verifyRecaptcha(
  token: string,
  expectedAction?: string
): Promise<{
  success: boolean;
  score: number;
  action?: string;
  error?: string;
}> {
  // If reCAPTCHA is not configured, allow but log warning
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn("reCAPTCHA secret key not configured - skipping verification");
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, score: 0, error: "No reCAPTCHA token provided" };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = await response.json();

    // Log for debugging (remove in production if too noisy)
    console.log("reCAPTCHA verification result:", {
      success: data.success,
      score: data.score,
      action: data.action,
      hostname: data.hostname,
    });

    if (!data.success) {
      return {
        success: false,
        score: 0,
        error: `reCAPTCHA verification failed: ${data["error-codes"]?.join(", ") || "Unknown error"}`,
      };
    }

    // Verify action matches (prevents token reuse across different forms)
    if (expectedAction && data.action !== expectedAction) {
      return {
        success: false,
        score: data.score || 0,
        action: data.action,
        error: `Action mismatch: expected ${expectedAction}, got ${data.action}`,
      };
    }

    // Check score threshold
    if (data.score < RECAPTCHA_THRESHOLD) {
      return {
        success: false,
        score: data.score,
        action: data.action,
        error: `Score too low: ${data.score} (threshold: ${RECAPTCHA_THRESHOLD})`,
      };
    }

    return {
      success: true,
      score: data.score,
      action: data.action,
    };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return {
      success: false,
      score: 0,
      error: "Failed to verify reCAPTCHA token",
    };
  }
}

/**
 * Check if reCAPTCHA is configured
 */
export function isRecaptchaConfigured(): boolean {
  return !!(RECAPTCHA_SITE_KEY && RECAPTCHA_SECRET_KEY);
}

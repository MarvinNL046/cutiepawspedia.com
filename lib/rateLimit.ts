/**
 * Rate Limiting Utility
 *
 * Simple in-memory rate limiter for protecting endpoints from abuse.
 * Uses a sliding window approach with configurable limits and time windows.
 *
 * TODO: Replace with Redis-based limiter (Upstash) for production use:
 * - In-memory storage doesn't work across serverless instances
 * - Use @upstash/ratelimit with Redis for production
 */

export type RateLimitKey = {
  key: string; // e.g., `leads:${ip}` or `claims:${userId}`
  limit: number; // max requests
  windowMs: number; // rolling window in ms
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number; // Unix timestamp when the window resets
};

// In-memory storage for rate limits
// Structure: Map<key, { count: number; resetAt: number }>
const rateLimitStore = new Map<
  string,
  { count: number; resetAt: number; timestamps: number[] }
>();

// Cleanup interval to prevent memory leaks (every 5 minutes)
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let cleanupTimer: NodeJS.Timeout | null = null;

function startCleanup() {
  if (cleanupTimer) return;

  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, data] of rateLimitStore.entries()) {
      if (now > data.resetAt) {
        rateLimitStore.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);

  // Don't prevent Node from exiting
  cleanupTimer.unref();
}

// Start cleanup on module load
startCleanup();

/**
 * Check if a request is allowed under rate limiting rules
 *
 * @param args Rate limit configuration
 * @returns Result with allowed status and remaining requests
 */
export async function checkRateLimit(
  args: RateLimitKey
): Promise<RateLimitResult> {
  const { key, limit, windowMs } = args;
  const now = Date.now();

  // Get or create entry
  let entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    // Create new window
    entry = {
      count: 1,
      resetAt: now + windowMs,
      timestamps: [now],
    };
    rateLimitStore.set(key, entry);

    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: entry.resetAt,
    };
  }

  // Filter out old timestamps (sliding window)
  entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);

  // Check if under limit
  if (entry.timestamps.length < limit) {
    entry.timestamps.push(now);
    entry.count = entry.timestamps.length;

    return {
      allowed: true,
      remaining: limit - entry.timestamps.length,
      resetAt: entry.resetAt,
    };
  }

  // Rate limit exceeded
  return {
    allowed: false,
    remaining: 0,
    resetAt: entry.resetAt,
  };
}

/**
 * Extract client IP from request headers
 * Handles common proxy headers (X-Forwarded-For, etc.)
 */
export function getClientIP(request: Request): string {
  // Try various headers in order of preference
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // Take the first IP (client IP)
    return xForwardedFor.split(",")[0].trim();
  }

  const xRealIP = request.headers.get("x-real-ip");
  if (xRealIP) {
    return xRealIP.trim();
  }

  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  // Fallback to a generic identifier if no IP found
  return "unknown";
}

/**
 * Create a rate limiter for a specific endpoint
 * Returns a reusable function for checking rate limits
 */
export function createRateLimiter(config: {
  prefix: string;
  limit: number;
  windowMs: number;
}) {
  return async (identifier: string): Promise<RateLimitResult> => {
    return checkRateLimit({
      key: `${config.prefix}:${identifier}`,
      limit: config.limit,
      windowMs: config.windowMs,
    });
  };
}

// ============================================================================
// PRE-CONFIGURED RATE LIMITERS
// ============================================================================

// Leads: max 5 per 10 minutes per IP
export const leadsRateLimiter = createRateLimiter({
  prefix: "leads",
  limit: 5,
  windowMs: 10 * 60 * 1000, // 10 minutes
});

// Claims: max 3 per day per user/IP
export const claimsRateLimiter = createRateLimiter({
  prefix: "claims",
  limit: 3,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
});

// Premium upgrades: max 5 per day per business
export const premiumUpgradeRateLimiter = createRateLimiter({
  prefix: "premiumUpgrade",
  limit: 5,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
});

// Stripe checkout: max 10 per hour per business
export const stripeCheckoutRateLimiter = createRateLimiter({
  prefix: "stripeCheckout",
  limit: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
});

// Email subscription: max 3 per hour per IP
export const emailSubscriptionRateLimiter = createRateLimiter({
  prefix: "emailSubscription",
  limit: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
});

// Reviews: max 3 per hour per IP
export const reviewsRateLimiter = createRateLimiter({
  prefix: "reviews",
  limit: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
});

// ============================================================================
// RATE LIMIT RESPONSE HELPER
// ============================================================================

/**
 * Create a standardized 429 Too Many Requests response
 */
export function rateLimitExceededResponse(
  message: string = "Too many requests, please try again later."
) {
  return new Response(
    JSON.stringify({
      error: "Rate limit exceeded",
      message,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "60", // Suggest retry after 60 seconds
      },
    }
  );
}

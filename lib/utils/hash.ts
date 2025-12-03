/**
 * Hash Utilities
 *
 * Privacy-safe hashing functions for sensitive data
 */

import { createHash } from "crypto";

/**
 * Hash an IP address using SHA-256
 * This creates a privacy-safe identifier for spam detection
 * without storing the actual IP address
 */
export function hashIP(ip: string): string {
  // Add a salt for extra security
  const salt = process.env.IP_HASH_SALT || "cutiepawspedia-default-salt";
  return createHash("sha256")
    .update(ip + salt)
    .digest("hex");
}

/**
 * Hash any string using SHA-256
 */
export function hashString(str: string): string {
  return createHash("sha256").update(str).digest("hex");
}

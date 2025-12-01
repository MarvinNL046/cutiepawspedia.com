"use client";

import { useUser as useStackUser } from "@stackframe/stack";

// Check if Stack Auth is configured
const isAuthConfigured = Boolean(process.env.NEXT_PUBLIC_STACK_PROJECT_ID);

export type AuthUser = {
  displayName?: string | null;
  primaryEmail?: string | null;
} | null;

/**
 * Safe wrapper around Stack Auth's useUser hook
 * Returns null when Stack Auth is not configured
 */
export function useAuth(): AuthUser {
  // Only call useStackUser if auth is configured
  // This prevents errors when Stack Auth env vars are not set
  if (!isAuthConfigured) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useStackUser();
}

export { isAuthConfigured };

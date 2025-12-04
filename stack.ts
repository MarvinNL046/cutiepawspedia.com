/**
 * Root-level stack.ts re-export
 *
 * This file exists for backward compatibility with imports using @/stack
 * The actual implementation is in lib/auth/stack.ts
 */
export { stackServerApp, isStackAuthConfigured } from "./lib/auth/stack";

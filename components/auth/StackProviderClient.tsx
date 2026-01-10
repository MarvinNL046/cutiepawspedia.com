"use client";

/**
 * Client-Side Stack Auth Provider
 *
 * Wraps the app with Stack Auth's StackProvider using the client-side app.
 * This prevents SSR bailout that occurs when using the server app in layouts.
 *
 * The server app causes SSR bailout because it accesses cookies during
 * server-side rendering. By using the client app, auth state is determined
 * after hydration, allowing proper 404 status codes for non-existent pages.
 */

import { ReactNode } from "react";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@/lib/auth/stack-client";

interface StackProviderClientProps {
  children: ReactNode;
}

export function StackProviderClient({ children }: StackProviderClientProps) {
  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>
        {children}
      </StackTheme>
    </StackProvider>
  );
}

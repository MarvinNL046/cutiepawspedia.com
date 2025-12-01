import "server-only";
import { redirect } from "next/navigation";
import { stackServerApp, isStackAuthConfigured } from "./stack";
import { getUserByStackAuthId } from "@/db/queries";

export type AdminUser = {
  id: number;
  stackauthId: string;
  email: string;
  name: string | null;
  role: string;
};

export type AdminAuthResult =
  | { authorized: true; user: AdminUser }
  | { authorized: false; reason: "not_configured" | "not_authenticated" | "not_admin" };

/**
 * Check if the current user is an admin
 * Returns the admin user if authorized, otherwise returns the reason for denial
 */
export async function getAdminUser(): Promise<AdminAuthResult> {
  // Check if StackAuth is configured
  if (!isStackAuthConfigured || !stackServerApp) {
    return { authorized: false, reason: "not_configured" };
  }

  // Get current user from StackAuth
  const stackUser = await stackServerApp.getUser();

  if (!stackUser) {
    return { authorized: false, reason: "not_authenticated" };
  }

  // Get user from database to check role
  const dbUser = await getUserByStackAuthId(stackUser.id);

  if (!dbUser || dbUser.role !== "admin") {
    return { authorized: false, reason: "not_admin" };
  }

  return {
    authorized: true,
    user: {
      id: dbUser.id,
      stackauthId: dbUser.stackauthId,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role,
    },
  };
}

/**
 * Require admin access - redirects or throws if not authorized
 * Use this in admin pages and layouts
 */
export async function requireAdmin(locale: string = "en"): Promise<AdminUser> {
  const result = await getAdminUser();

  if (!result.authorized) {
    switch (result.reason) {
      case "not_configured":
        throw new Error("Authentication not configured");
      case "not_authenticated":
        redirect(`/handler/sign-in?after_auth_return_to=/${locale}/admin`);
      case "not_admin":
        redirect(`/${locale}`); // Redirect non-admins to homepage
    }
  }

  return result.user;
}

/**
 * Check if current user is admin without redirecting
 * Useful for conditional rendering
 */
export async function isAdmin(): Promise<boolean> {
  const result = await getAdminUser();
  return result.authorized;
}

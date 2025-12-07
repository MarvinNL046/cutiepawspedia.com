import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId } from "@/db/queries";
import { DashboardSidebar } from "@/components/dashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Dashboard Layout with Auth Protection
 *
 * - Requires authenticated user
 * - User must have role "business" or "admin"
 * - Provides sidebar navigation
 */
export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params;

  // Check if StackAuth is configured
  if (!stackServerApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-cpDark mb-2">Dashboard Unavailable</h1>
          <p className="text-slate-600">Authentication is not configured.</p>
        </div>
      </div>
    );
  }

  // Get current user from StackAuth
  const stackUser = await stackServerApp.getUser();

  // Redirect to sign-in if not authenticated
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard`);
  }

  // Get user from database to check role
  const dbUser = await getUserByStackAuthId(stackUser.id);

  // Check if user has business or admin role
  if (!dbUser || !["business", "admin"].includes(dbUser.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-cpDark mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-4">
            You need a business account to access the dashboard.
          </p>
          <p className="text-sm text-slate-500">
            If you own a business listed on CutiePawsPedia, please contact us to claim your listing.
          </p>
          <a
            href={`/${locale}/for-businesses`}
            className="inline-block mt-4 px-4 py-2 bg-cpPink text-white rounded-lg hover:bg-cpPink/90 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar locale={locale} />

      {/* Main Content */}
      <div className="pl-64 h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}

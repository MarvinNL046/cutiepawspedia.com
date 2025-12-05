import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, upsertUserFromStackAuth, getBusinessesForUser } from "@/db/queries";
import Link from "next/link";
import { Heart, Clock, User, Settings, Bell, Building2, ChevronRight, Plus, Shield } from "lucide-react";

interface AccountLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Account Layout with Auth Protection
 *
 * - Requires authenticated user (any role)
 * - Provides simple navigation for user account pages
 */
export default async function AccountLayout({
  children,
  params,
}: AccountLayoutProps) {
  const { locale } = await params;

  // Check if StackAuth is configured
  if (!stackServerApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-cpDark mb-2">Account Unavailable</h1>
          <p className="text-slate-600">Authentication is not configured.</p>
        </div>
      </div>
    );
  }

  // Get current user from StackAuth
  const stackUser = await stackServerApp.getUser();

  // Redirect to sign-in if not authenticated
  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/account/favorites`);
  }

  // Get user from database, or create if not exists
  let dbUser = await getUserByStackAuthId(stackUser.id);

  // Auto-sync user to database if authenticated but not in DB
  if (!dbUser) {
    dbUser = await upsertUserFromStackAuth({
      stackauthId: stackUser.id,
      email: stackUser.primaryEmail || "",
      name: stackUser.displayName,
    });
  }

  // If still no user after sync attempt, show error
  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-cpDark mb-2">Account Error</h1>
          <p className="text-slate-600">Unable to sync your account. Please try again.</p>
        </div>
      </div>
    );
  }

  // Fetch user's businesses
  const userBusinesses = await getBusinessesForUser(dbUser.id);

  const navItems = [
    {
      href: `/${locale}/account/favorites`,
      label: locale === "nl" ? "Opgeslagen" : "Saved Places",
      icon: Heart,
    },
    {
      href: `/${locale}/account/recent`,
      label: locale === "nl" ? "Recent Bekeken" : "Recently Viewed",
      icon: Clock,
    },
    {
      href: `/${locale}/account/profile`,
      label: locale === "nl" ? "Profiel" : "Profile",
      icon: User,
    },
    {
      href: `/${locale}/account/notifications`,
      label: locale === "nl" ? "Meldingen" : "Notifications",
      icon: Bell,
    },
    {
      href: "/handler/account-settings",
      label: locale === "nl" ? "Beveiliging" : "Security",
      icon: Settings,
      external: true, // StackAuth for password/2FA management
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}`}
                className="text-xl font-bold text-cpPink hover:opacity-80 transition-opacity"
              >
                CutiePawsPedia
              </Link>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">
                {locale === "nl" ? "Mijn Account" : "My Account"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {/* Admin Link - only for admins */}
              {dbUser.role === "admin" && (
                <Link
                  href={`/${locale}/admin`}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-600 rounded-full text-sm font-medium hover:bg-red-500/20 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}

              {/* Business Switch */}
              {userBusinesses.length > 0 ? (
                <Link
                  href={`/${locale}/dashboard/business/${userBusinesses[0].id}`}
                  className="flex items-center gap-2 px-3 py-1.5 bg-cpPink/10 text-cpPink rounded-full text-sm font-medium hover:bg-cpPink/20 transition-colors"
                >
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {locale === "nl" ? "Zakelijk Dashboard" : "Business Dashboard"}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href={`/${locale}/for-businesses`}
                  className="flex items-center gap-2 px-3 py-1.5 border border-cpPink text-cpPink rounded-full text-sm font-medium hover:bg-cpPink/10 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {locale === "nl" ? "Claim je bedrijf" : "Claim Business"}
                  </span>
                </Link>
              )}

              {/* User info */}
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-slate-400" />
                <span className="text-sm text-slate-600 hidden sm:inline">
                  {dbUser.name || dbUser.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 py-4 text-sm font-medium text-slate-600 hover:text-cpPink border-b-2 border-transparent hover:border-cpPink transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

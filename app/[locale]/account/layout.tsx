import { redirect } from "next/navigation";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, upsertUserFromStackAuth } from "@/db/queries";
import Link from "next/link";
import { Heart, Clock, User, Settings, Bell } from "lucide-react";

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
              <span className="text-slate-600">My Account</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-slate-400" />
              <span className="text-sm text-slate-600">
                {dbUser.name || dbUser.email}
              </span>
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

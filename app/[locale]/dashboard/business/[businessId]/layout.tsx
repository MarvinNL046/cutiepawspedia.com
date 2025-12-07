/**
 * Business Dashboard Layout - Auth guard and sidebar navigation
 */

import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { stackServerApp } from "@/lib/auth/stack";
import { getUserByStackAuthId, getBusinessByIdForUser, getBusinessesForUser } from "@/db/queries";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  CreditCard,
  ChevronLeft,
  LogOut,
  PawPrint,
  Star,
  Inbox,
  User,
  Crown,
  BarChart3,
  Home,
  Heart,
  Megaphone,
} from "lucide-react";
import { getPlan, type PlanKey } from "@/lib/plans/config";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { ThemeToggle, LanguageSwitcher } from "@/components/theme";

interface BusinessLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string; businessId: string }>;
}

export default async function BusinessLayout({
  children,
  params,
}: BusinessLayoutProps) {
  const { locale, businessId } = await params;
  const businessIdNum = parseInt(businessId, 10);

  // Check if StackAuth is configured
  if (!stackServerApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-cpCharcoal">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-foreground dark:text-cpCream mb-2">Dashboard Unavailable</h1>
          <p className="text-muted-foreground dark:text-cpCream/70">Authentication is not configured.</p>
        </div>
      </div>
    );
  }

  // Get current user from StackAuth
  const stackUser = await stackServerApp.getUser();

  if (!stackUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business/${businessId}`);
  }

  // Get user from database
  const dbUser = await getUserByStackAuthId(stackUser.id);

  if (!dbUser) {
    redirect(`/handler/sign-in?after_auth_return_to=/${locale}/dashboard/business/${businessId}`);
  }

  // Get the specific business with ownership check
  // Admin users (role === "admin") can access any business
  let business;
  if (dbUser.role === "admin") {
    // Admin can access any business - use regular getBusinessById
    const { getBusinessById } = await import("@/db/queries/businesses");
    business = await getBusinessById(businessIdNum);
  } else {
    // Regular users must own the business
    business = await getBusinessByIdForUser({ businessId: businessIdNum, userId: dbUser.id });
  }

  if (!business) {
    notFound();
  }

  // Get all businesses for the dropdown (for switching)
  const allBusinesses = dbUser.role === "admin"
    ? [] // Admins don't need the dropdown - they can access via admin panel
    : await getBusinessesForUser(dbUser.id);

  const labels = {
    en: {
      overview: "Overview",
      places: "My Places",
      reviews: "Reviews",
      inbox: "Inbox",
      leads: "Leads",
      analytics: "Analytics",
      plan: "Plan",
      advertising: "Advertising",
      credits: "Credits",
      myAccount: "My Account",
      signOut: "Sign Out",
      home: "Homepage",
      favorites: "My Favorites",
    },
    nl: {
      overview: "Overzicht",
      places: "Mijn Locaties",
      reviews: "Beoordelingen",
      inbox: "Inbox",
      leads: "Leads",
      analytics: "Statistieken",
      plan: "Abonnement",
      advertising: "Adverteren",
      credits: "Credits",
      myAccount: "Mijn Account",
      signOut: "Uitloggen",
      home: "Homepage",
      favorites: "Mijn Favorieten",
    },
    de: {
      overview: "Übersicht",
      places: "Meine Standorte",
      reviews: "Bewertungen",
      inbox: "Posteingang",
      leads: "Leads",
      analytics: "Statistiken",
      plan: "Abonnement",
      advertising: "Werbung",
      credits: "Guthaben",
      myAccount: "Mein Konto",
      signOut: "Abmelden",
      home: "Startseite",
      favorites: "Meine Favoriten",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  const navItems = [
    { href: "", label: t.overview, icon: LayoutDashboard, iconName: "LayoutDashboard" },
    { href: "/places", label: t.places, icon: Building2, iconName: "Building2" },
    { href: "/reviews", label: t.reviews, icon: Star, iconName: "Star" },
    { href: "/inbox", label: t.inbox, icon: Inbox, iconName: "Inbox" },
    { href: "/leads", label: t.leads, icon: MessageSquare, iconName: "MessageSquare" },
    { href: "/analytics", label: t.analytics, icon: BarChart3, iconName: "BarChart3" },
    { href: "/plan", label: t.plan, icon: Crown, iconName: "Crown" },
    { href: "/advertising", label: t.advertising, icon: Megaphone, iconName: "Megaphone" },
  ];

  // For mobile sidebar (serializable props)
  const mobileNavItems = navItems.map(({ href, label, iconName }) => ({
    href,
    label,
    icon: iconName,
  }));

  const planInfo = getPlan((business.planKey as PlanKey) || "FREE");

  return (
    <div className="fixed inset-0 z-[100] bg-background dark:bg-cpCharcoal flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden h-14 bg-card dark:bg-cpCharcoal border-b border-border dark:border-cpAmber/20 flex items-center justify-between px-4 flex-shrink-0">
        <MobileSidebar
          businessName={business.name}
          businessLogo={business.logo}
          planName={planInfo.name}
          navItems={mobileNavItems}
          labels={{
            myAccount: t.myAccount,
            signOut: t.signOut,
            home: t.home,
            favorites: t.favorites,
          }}
          locale={locale}
          businessId={businessId}
        />
        <div className="flex items-center gap-2">
          <PawPrint className="h-5 w-5 text-cpCoral" />
          <span className="font-bold text-foreground dark:text-cpCream text-sm">CutiePawsPedia</span>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher locale={locale} />
        </div>
      </header>

      {/* Content wrapper - flex row on desktop */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-card dark:bg-cpCharcoal border-r border-border dark:border-cpAmber/20 flex-col flex-shrink-0">
          {/* Logo */}
          <div className="h-16 flex items-center gap-2 px-4 border-b border-border dark:border-cpAmber/20">
            <div className="p-2 rounded-lg bg-cpCoral/10">
              <PawPrint className="h-5 w-5 text-cpCoral" />
            </div>
            <div>
              <span className="font-bold text-foreground dark:text-cpCream">CutiePawsPedia</span>
              <span className="text-xs text-muted-foreground dark:text-cpCream/60 block">Business Dashboard</span>
            </div>
          </div>

          {/* Business Selector (if multiple businesses) */}
          {allBusinesses.length > 1 && (
            <div className="p-4 border-b border-border dark:border-cpAmber/20">
              <BusinessSelector
                businesses={allBusinesses}
                currentBusinessId={businessIdNum}
                locale={locale}
              />
            </div>
          )}

          {/* Current Business Info */}
          <div className="p-4 border-b border-border dark:border-cpAmber/20">
            <div className="flex items-center gap-3">
              {business.logo ? (
                <img
                  src={business.logo}
                  alt={business.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-cpCoral/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-cpCoral" />
                </div>
              )}
              <div className="truncate">
                <p className="font-medium text-foreground dark:text-cpCream truncate">{business.name}</p>
                <p className="text-xs text-muted-foreground dark:text-cpCream/60">
                  {planInfo.name} plan
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <BusinessNavItems
              items={navItems}
              businessId={businessId}
              locale={locale}
            />
          </nav>

          {/* Quick Links */}
          <div className="p-4 border-t border-border dark:border-cpAmber/20 space-y-1">
            <Link href={`/${locale}`}>
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral">
                <Home className="h-4 w-4" />
                {t.home}
              </Button>
            </Link>
            <Link href={`/${locale}/account/favorites`}>
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral">
                <Heart className="h-4 w-4" />
                {t.favorites}
              </Button>
            </Link>
          </div>

          {/* Settings */}
          <div className="p-4 border-t border-border dark:border-cpAmber/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground dark:text-cpCream/60 uppercase tracking-wider">Settings</span>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border dark:border-cpAmber/20 space-y-1">
            <Link href="/handler/sign-out">
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground dark:text-cpCream/70 hover:text-red-600 dark:hover:text-red-400">
                <LogOut className="h-4 w-4" />
                {t.signOut}
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

// Client component for business selector dropdown
function BusinessSelector({
  businesses,
  currentBusinessId,
  locale,
}: {
  businesses: { id: number; name: string }[];
  currentBusinessId: number;
  locale: string;
}) {
  return (
    <form>
      <Select
        defaultValue={String(currentBusinessId)}
        name="businessId"
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {businesses.map((business) => (
            <SelectItem key={business.id} value={String(business.id)}>
              <Link
                href={`/${locale}/dashboard/business/${business.id}`}
                className="block w-full"
              >
                {business.name}
              </Link>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  );
}

// Server component for nav items - passes active state via data attribute
function BusinessNavItems({
  items,
  businessId,
  locale,
}: {
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
  businessId: string;
  locale: string;
}) {
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;
        const href = `/${locale}/dashboard/business/${businessId}${item.href}`;

        return (
          <Link key={item.href} href={href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3",
                "hover:bg-cpCoral/10 hover:text-cpCoral dark:hover:bg-cpCoral/20"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </>
  );
}

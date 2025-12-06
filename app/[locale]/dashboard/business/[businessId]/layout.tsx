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
} from "lucide-react";
import { getPlan, type PlanKey } from "@/lib/plans/config";

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
      credits: "Credits",
      myAccount: "My Account",
      signOut: "Sign Out",
    },
    nl: {
      overview: "Overzicht",
      places: "Mijn Locaties",
      reviews: "Beoordelingen",
      inbox: "Inbox",
      leads: "Leads",
      analytics: "Statistieken",
      plan: "Abonnement",
      credits: "Credits",
      myAccount: "Mijn Account",
      signOut: "Uitloggen",
    },
    de: {
      overview: "Übersicht",
      places: "Meine Standorte",
      reviews: "Bewertungen",
      inbox: "Posteingang",
      leads: "Leads",
      analytics: "Statistiken",
      plan: "Abonnement",
      credits: "Guthaben",
      myAccount: "Mein Konto",
      signOut: "Abmelden",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  const navItems = [
    { href: "", label: t.overview, icon: LayoutDashboard },
    { href: "/places", label: t.places, icon: Building2 },
    { href: "/reviews", label: t.reviews, icon: Star },
    { href: "/inbox", label: t.inbox, icon: Inbox },
    { href: "/leads", label: t.leads, icon: MessageSquare },
    { href: "/analytics", label: t.analytics, icon: BarChart3 },
    { href: "/plan", label: t.plan, icon: Crown },
    { href: "/credits", label: t.credits, icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-4 border-b">
          <div className="p-2 rounded-lg bg-cpPink/10">
            <PawPrint className="h-5 w-5 text-cpPink" />
          </div>
          <div>
            <span className="font-bold text-cpDark">CutiePawsPedia</span>
            <span className="text-xs text-slate-500 block">Business Dashboard</span>
          </div>
        </div>

        {/* Business Selector (if multiple businesses) */}
        {allBusinesses.length > 1 && (
          <div className="p-4 border-b">
            <BusinessSelector
              businesses={allBusinesses}
              currentBusinessId={businessIdNum}
              locale={locale}
            />
          </div>
        )}

        {/* Current Business Info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            {business.logo ? (
              <img
                src={business.logo}
                alt={business.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-cpPink/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-cpPink" />
              </div>
            )}
            <div className="truncate">
              <p className="font-medium text-cpDark truncate">{business.name}</p>
              <p className="text-xs text-slate-500">
                {getPlan((business.planKey as PlanKey) || "FREE").name} plan
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <BusinessNavItems
            items={navItems}
            businessId={businessId}
            locale={locale}
          />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t space-y-2">
          <Link href={`/${locale}/account/favorites`}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-cpPink">
              <User className="h-4 w-4" />
              {t.myAccount}
            </Button>
          </Link>
          <Link href="/handler/sign-out">
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-red-600">
              <LogOut className="h-4 w-4" />
              {t.signOut}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        {children}
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
                "hover:bg-cpPink/10 hover:text-cpPink"
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  PawPrint,
  Building2,
  LogOut,
  Home,
  Heart,
} from "lucide-react";

interface MobileSidebarProps {
  businessName: string;
  businessLogo?: string | null;
  planName: string;
  navItems: {
    href: string;
    label: string;
    icon: string;
  }[];
  labels: {
    myAccount: string;
    signOut: string;
    home: string;
    favorites: string;
  };
  locale: string;
  businessId: string;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard: require("lucide-react").LayoutDashboard,
  Building2: require("lucide-react").Building2,
  Star: require("lucide-react").Star,
  Inbox: require("lucide-react").Inbox,
  MessageSquare: require("lucide-react").MessageSquare,
  BarChart3: require("lucide-react").BarChart3,
  Crown: require("lucide-react").Crown,
  CreditCard: require("lucide-react").CreditCard,
};

export function MobileSidebar({
  businessName,
  businessLogo,
  planName,
  navItems,
  labels,
  locale,
  businessId,
}: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-card dark:bg-cpCharcoal border-r border-border dark:border-cpAmber/20">
        <SheetHeader className="h-16 flex flex-row items-center gap-2 px-4 border-b border-border dark:border-cpAmber/20">
          <div className="p-2 rounded-lg bg-cpCoral/10">
            <PawPrint className="h-5 w-5 text-cpCoral" />
          </div>
          <SheetTitle className="text-left">
            <span className="font-bold text-foreground dark:text-cpCream block">CutiePawsPedia</span>
            <span className="text-xs text-muted-foreground dark:text-cpCream/60 font-normal">Business Dashboard</span>
          </SheetTitle>
        </SheetHeader>

        {/* Business Info */}
        <div className="p-4 border-b border-border dark:border-cpAmber/20">
          <div className="flex items-center gap-3">
            {businessLogo ? (
              <img
                src={businessLogo}
                alt={businessName}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-cpCoral/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-cpCoral" />
              </div>
            )}
            <div className="truncate">
              <p className="font-medium text-foreground dark:text-cpCream truncate">{businessName}</p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/60">{planName} plan</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || Building2;
            return (
              <Link
                key={item.href}
                href={`/${locale}/dashboard/business/${businessId}${item.href}`}
                onClick={() => setOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 hover:bg-cpCoral/10 hover:text-cpCoral dark:hover:bg-cpCoral/20"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Quick Links */}
        <div className="p-4 border-t border-border dark:border-cpAmber/20 space-y-1">
          <Link href={`/${locale}`} onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral">
              <Home className="h-4 w-4" />
              {labels.home}
            </Button>
          </Link>
          <Link href={`/${locale}/account/favorites`} onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral">
              <Heart className="h-4 w-4" />
              {labels.favorites}
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border dark:border-cpAmber/20 space-y-1">
          <Link href="/handler/sign-out">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground dark:text-cpCream/70 hover:text-red-600 dark:hover:text-red-400">
              <LogOut className="h-4 w-4" />
              {labels.signOut}
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

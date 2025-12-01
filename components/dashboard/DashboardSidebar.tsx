"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  PawPrint,
} from "lucide-react";

interface DashboardSidebarProps {
  locale: string;
}

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/listings",
    label: "Listings",
    icon: Building2,
  },
  {
    href: "/dashboard/leads",
    label: "Leads",
    icon: MessageSquare,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function DashboardSidebar({ locale }: DashboardSidebarProps) {
  const pathname = usePathname();

  // Check if path matches (accounting for locale prefix)
  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    if (href === "/dashboard") {
      return pathname === fullPath;
    }
    return pathname.startsWith(fullPath);
  };

  return (
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

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={`/${locale}${item.href}`}>
              <Button
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  active && "bg-cpPink/10 text-cpPink hover:bg-cpPink/15"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Link href={`/${locale}`}>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500">
            <ChevronLeft className="h-4 w-4" />
            Back to Directory
          </Button>
        </Link>
        <Link href="/handler/sign-out">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-red-600">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </Link>
      </div>
    </aside>
  );
}

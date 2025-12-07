"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Building2,
  MessageSquare,
  BarChart3,
  ChevronLeft,
  LogOut,
  Shield,
  ClipboardCheck,
  Coins,
  ClipboardList,
  Brain,
  Camera,
  Activity,
} from "lucide-react";

interface AdminSidebarProps {
  locale: string;
}

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/claims",
    label: "Claims",
    icon: ClipboardCheck,
  },
  {
    href: "/admin/businesses",
    label: "Businesses",
    icon: Building2,
  },
  {
    href: "/admin/leads",
    label: "Leads",
    icon: MessageSquare,
  },
  {
    href: "/admin/credits",
    label: "Credits",
    icon: Coins,
  },
  {
    href: "/admin/audit",
    label: "Audit Logs",
    icon: ClipboardList,
  },
  {
    href: "/admin/photos",
    label: "Photos",
    icon: Camera,
  },
  {
    href: "/admin/data-quality",
    label: "Data Quality",
    icon: Activity,
  },
  {
    href: "/admin/ai",
    label: "AI Tools",
    icon: Brain,
  },
  {
    href: "/admin/content",
    label: "Content",
    icon: FileText,
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

export function AdminSidebar({ locale }: AdminSidebarProps) {
  const pathname = usePathname();

  // Check if path matches (accounting for locale prefix)
  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    if (href === "/admin") {
      return pathname === fullPath;
    }
    return pathname.startsWith(fullPath);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-slate-700">
        <div className="p-2 rounded-lg bg-cpCoral/20">
          <Shield className="h-5 w-5 text-cpCoral" aria-hidden="true" />
        </div>
        <div>
          <span className="font-bold text-white">CutiePawsPedia</span>
          <span className="text-xs text-slate-400 block">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={`/${locale}${item.href}`}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800",
                  active && "bg-cpCoral/20 text-cpCoral hover:bg-cpCoral/30 hover:text-cpCoral"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <Link href={`/${locale}`}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Back to Site
          </Button>
        </Link>
        <Link href="/handler/sign-out">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </Button>
        </Link>
      </div>
    </aside>
  );
}

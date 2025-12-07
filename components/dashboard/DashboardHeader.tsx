"use client";

import { useAuth } from "@/lib/auth/use-auth";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  businessId?: number;
  locale?: string;
}

export function DashboardHeader({
  title,
  description,
  businessId,
  locale = "en",
}: DashboardHeaderProps) {
  const user = useAuth();

  return (
    <header className="h-14 lg:h-16 border-b border-border dark:border-cpAmber/20 bg-card dark:bg-cpCharcoal flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
      <div className="min-w-0 flex-1">
        <h1 className="text-lg lg:text-xl font-semibold text-foreground dark:text-cpCream truncate">{title}</h1>
        {description && (
          <p className="text-xs lg:text-sm text-muted-foreground dark:text-cpCream/60 truncate hidden sm:block">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
        {/* Notifications */}
        {businessId && (
          <NotificationDropdown businessId={businessId} locale={locale} />
        )}

        {/* User info - hidden on mobile, shown on md+ */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground dark:text-cpCream">
              {user?.displayName || user?.primaryEmail?.split("@")[0] || "User"}
            </p>
            <Badge variant="outline" className="text-xs dark:border-cpAmber/30 dark:text-cpCream/80">
              Business
            </Badge>
          </div>
          <div className="h-9 w-9 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
            <User className="h-5 w-5 text-cpCoral" />
          </div>
        </div>

        {/* Mobile avatar only */}
        <div className="md:hidden h-8 w-8 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
          <User className="h-4 w-4 text-cpCoral" />
        </div>
      </div>
    </header>
  );
}

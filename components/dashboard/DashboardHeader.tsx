"use client";

import { useAuth } from "@/lib/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const user = useAuth();

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-semibold text-cpDark">{title}</h1>
        {description && (
          <p className="text-sm text-slate-500">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications (placeholder) */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-slate-500" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-cpPink rounded-full" />
        </Button>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-cpDark">
              {user?.displayName || user?.primaryEmail?.split("@")[0] || "User"}
            </p>
            <Badge variant="outline" className="text-xs">
              Business
            </Badge>
          </div>
          <div className="h-9 w-9 rounded-full bg-cpAqua/20 flex items-center justify-center">
            <User className="h-5 w-5 text-cpAqua" />
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCheck, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ImpersonationData } from "@/lib/auth/impersonation";

interface ImpersonationBannerProps {
  impersonation: ImpersonationData;
}

export function ImpersonationBanner({ impersonation }: ImpersonationBannerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStopImpersonation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/impersonate", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to stop impersonation");

      router.refresh();
    } catch (error) {
      console.error("Error stopping impersonation:", error);
      alert("Failed to stop impersonation");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate time remaining
  const startedAt = new Date(impersonation.startedAt);
  const expiresAt = new Date(startedAt.getTime() + 60 * 60 * 1000); // 1 hour
  const minutesRemaining = Math.max(
    0,
    Math.round((expiresAt.getTime() - Date.now()) / (60 * 1000))
  );

  return (
    <div className="bg-cpYellow text-slate-900 px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserCheck className="h-5 w-5" />
          <span className="font-medium">
            Viewing as: <strong>{impersonation.businessName}</strong>
          </span>
          <span className="text-sm opacity-75">
            ({minutesRemaining}m remaining)
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleStopImpersonation}
          disabled={isLoading}
          className="hover:bg-yellow-600/20 gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <X className="h-4 w-4" />
          )}
          Exit Impersonation
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserCheck, Loader2 } from "lucide-react";

interface ImpersonateButtonProps {
  businessId: number;
  locale: string;
}

export function ImpersonateButton({ businessId, locale }: ImpersonateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleImpersonate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to start impersonation");
      }

      // Refresh the page to show impersonation status
      router.refresh();
    } catch (error) {
      console.error("Impersonation error:", error);
      alert(error instanceof Error ? error.message : "Failed to start impersonation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleImpersonate}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <UserCheck className="h-4 w-4" />
      )}
      View as Business
    </Button>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronDown, Eye, CheckCircle, AlertCircle, Send, Sparkles } from "lucide-react";
import { updateLeadStatusAction } from "./actions";
import type { LeadStatus } from "@/db/queries/leads";

interface LeadStatusDropdownProps {
  leadId: number;
  businessId: number;
  currentStatus: LeadStatus;
  locale: string;
}

const statusConfig: Record<LeadStatus, {
  label: { en: string; nl: string; de: string };
  icon: React.ComponentType<{ className?: string }>;
  className: string;
}> = {
  new: {
    label: { en: "New", nl: "Nieuw", de: "Neu" },
    icon: Sparkles,
    className: "bg-cpCoral/20 text-cpCoral border-cpCoral dark:bg-cpCoral/30",
  },
  sent: {
    label: { en: "Sent", nl: "Verzonden", de: "Gesendet" },
    icon: Send,
    className: "bg-muted text-muted-foreground border-border dark:bg-cpSurface dark:text-cpCream/70 dark:border-cpAmber/30",
  },
  viewed: {
    label: { en: "Viewed", nl: "Bekeken", de: "Angesehen" },
    icon: Eye,
    className: "bg-cpAmber/20 text-cpAmber border-cpAmber dark:bg-cpAmber/30",
  },
  converted: {
    label: { en: "Converted", nl: "Geconverteerd", de: "Konvertiert" },
    icon: CheckCircle,
    className: "bg-green-500/10 text-green-600 border-green-500/30 dark:bg-green-500/20 dark:text-green-400",
  },
  spam: {
    label: { en: "Spam", nl: "Spam", de: "Spam" },
    icon: AlertCircle,
    className: "bg-red-500/10 text-red-500 border-red-500/30 dark:bg-red-500/20",
  },
};

export function LeadStatusDropdown({
  leadId,
  businessId,
  currentStatus,
  locale,
}: LeadStatusDropdownProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = (newStatus: LeadStatus) => {
    if (newStatus === currentStatus) return;

    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("leadId", String(leadId));
      formData.set("businessId", String(businessId));
      formData.set("status", newStatus);
      formData.set("locale", locale);

      const result = await updateLeadStatusAction(formData);

      if (!result.success) {
        setError(result.error || "Failed to update status");
      } else {
        router.refresh();
      }
    });
  };

  const config = statusConfig[currentStatus];
  const Icon = config.icon;
  const label = config.label[locale as keyof typeof config.label] || config.label.en;

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`gap-1 ${config.className}`}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Icon className="h-3 w-3" />
            )}
            {label}
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="dark:bg-cpSurface dark:border-cpAmber/20">
          {(Object.keys(statusConfig) as LeadStatus[]).map((status) => {
            const cfg = statusConfig[status];
            const StatusIcon = cfg.icon;
            const statusLabel = cfg.label[locale as keyof typeof cfg.label] || cfg.label.en;

            return (
              <DropdownMenuItem
                key={status}
                onClick={() => handleStatusChange(status)}
                className={status === currentStatus ? "bg-muted dark:bg-cpAmber/10" : "dark:text-cpCream dark:hover:bg-cpAmber/10"}
              >
                <StatusIcon className="h-4 w-4 mr-2" />
                {statusLabel}
                {status === currentStatus && (
                  <Badge variant="secondary" className="ml-auto text-xs dark:bg-cpAmber/20 dark:text-cpCream">
                    Current
                  </Badge>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && (
        <p className="text-xs text-red-500 mt-1 absolute -bottom-5 left-0">{error}</p>
      )}
    </div>
  );
}

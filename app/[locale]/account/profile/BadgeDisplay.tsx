"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

interface Badge {
  key: string;
  label: string;
  labelNl: string | null;
  description: string;
  descriptionNl: string | null;
  icon: string;
  category: string;
  awardedAt?: Date;
}

interface BadgeDisplayProps {
  badges: Badge[];
  locale: string;
  showDates?: boolean;
  dimmed?: boolean;
}

export function BadgeDisplay({ badges, locale, showDates, dimmed }: BadgeDisplayProps) {
  const t = useTranslations("profile");

  if (badges.length === 0) return null;

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => {
          const label = locale === "nl" && badge.labelNl ? badge.labelNl : badge.label;
          const description = locale === "nl" && badge.descriptionNl ? badge.descriptionNl : badge.description;

          return (
            <Tooltip key={badge.key}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-default",
                    dimmed
                      ? "bg-slate-100 text-slate-400"
                      : "bg-cpYellow/20 text-cpDark hover:bg-cpYellow/30",
                    getCategoryStyle(badge.category, dimmed)
                  )}
                >
                  <span className="text-base">{badge.icon}</span>
                  <span>{label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-slate-500">{description}</p>
                  {showDates && badge.awardedAt && (
                    <p className="text-xs text-slate-400">
                      {t("earnedOn")}{" "}
                      {new Date(badge.awardedAt).toLocaleDateString(locale === "nl" ? "nl-NL" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

function getCategoryStyle(category: string, dimmed?: boolean): string {
  if (dimmed) return "";

  switch (category) {
    case "special":
      return "bg-purple-100 text-purple-700 hover:bg-purple-200";
    case "reviewer":
      return "bg-amber-100 text-amber-700 hover:bg-amber-200";
    case "contributor":
      return "bg-green-100 text-green-700 hover:bg-green-200";
    case "business":
      return "bg-blue-100 text-blue-700 hover:bg-blue-200";
    default:
      return "bg-cpYellow/20 text-cpDark hover:bg-cpYellow/30";
  }
}

"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface TrustLevelInfo {
  level: number;
  name: string;
  nameNl: string | null;
  description: string;
  descriptionNl: string | null;
  minKarma: number;
  icon: string | null;
  color: string | null;
}

interface TrustLevelBadgeProps {
  trustLevel: number;
  trustLevelInfo: TrustLevelInfo | null;
  karmaPoints: number;
  nextLevel?: TrustLevelInfo | null;
  locale?: string;
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
}

const colorMap: Record<string, string> = {
  slate: "bg-slate-100 text-slate-700 border-slate-200",
  green: "bg-green-100 text-green-700 border-green-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
};

const sizeMap = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function TrustLevelBadge({
  trustLevel,
  trustLevelInfo,
  karmaPoints,
  nextLevel,
  locale = "en",
  showProgress = false,
  size = "md",
}: TrustLevelBadgeProps) {
  const name = locale === "nl" && trustLevelInfo?.nameNl
    ? trustLevelInfo.nameNl
    : trustLevelInfo?.name || `Level ${trustLevel}`;

  const description = locale === "nl" && trustLevelInfo?.descriptionNl
    ? trustLevelInfo.descriptionNl
    : trustLevelInfo?.description || "";

  const colorClass = colorMap[trustLevelInfo?.color || "slate"] || colorMap.slate;
  const icon = trustLevelInfo?.icon || "🌱";

  // Calculate progress to next level
  const progress = nextLevel && trustLevelInfo
    ? Math.min(100, Math.max(0,
        ((karmaPoints - trustLevelInfo.minKarma) / (nextLevel.minKarma - trustLevelInfo.minKarma)) * 100
      ))
    : 100;

  const karmaToNext = nextLevel
    ? Math.max(0, nextLevel.minKarma - karmaPoints)
    : 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex flex-col gap-1">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
                colorClass,
                sizeMap[size]
              )}
            >
              <span>{icon}</span>
              <span>{name}</span>
            </span>

            {showProgress && nextLevel && (
              <div className="w-full">
                <Progress value={progress} className="h-1.5" />
                <p className="text-[10px] text-slate-400 mt-0.5 text-center">
                  {karmaToNext} {locale === "nl" ? "punten tot volgend niveau" : "points to next level"}
                </p>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{icon} {name}</p>
            <p className="text-sm text-slate-500">{description}</p>
            <p className="text-xs text-slate-400">
              {karmaPoints} {locale === "nl" ? "karma punten" : "karma points"}
            </p>
            {nextLevel && (
              <p className="text-xs text-slate-400">
                {locale === "nl"
                  ? `${karmaToNext} punten nodig voor ${nextLevel.nameNl || nextLevel.name}`
                  : `${karmaToNext} points until ${nextLevel.name}`}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreHorizontal, RefreshCw, Eye, BarChart3, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DataQualityActionsProps {
  placeId: number;
  showRefreshButton?: boolean;
}

export function DataQualityActions({ placeId, showRefreshButton = true }: DataQualityActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const triggerRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`/api/admin/places/${placeId}/refresh`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to enqueue refresh");
      }

      const data = await response.json();

      if (data.isNew) {
        toast.success("Place added to refresh queue");
      } else {
        toast.info("Place already in refresh queue");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error("Failed to trigger refresh");
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const recalculateQuality = async () => {
    setIsRecalculating(true);
    try {
      const response = await fetch(`/api/admin/places/${placeId}/quality`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to recalculate quality");
      }

      const data = await response.json();
      toast.success(`Quality score updated: ${data.score}%`);

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error("Failed to recalculate quality");
      console.error(error);
    } finally {
      setIsRecalculating(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Prominent Force Refresh Button */}
      {showRefreshButton && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={triggerRefresh}
                disabled={isRefreshing || isPending}
                className="h-8 px-2"
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span className="sr-only md:not-sr-only md:ml-1 text-xs">Refresh</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Force refresh data from website</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* More Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending} className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!showRefreshButton && (
            <>
              <DropdownMenuItem onClick={triggerRefresh} disabled={isRefreshing}>
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Force Refresh
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={recalculateQuality} disabled={isRecalculating}>
            {isRecalculating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <BarChart3 className="h-4 w-4 mr-2" />
            )}
            Recalculate Score
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={`/admin/places/${placeId}`} target="_blank" rel="noopener noreferrer">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

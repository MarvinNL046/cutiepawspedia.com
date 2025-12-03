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
import { MoreHorizontal, RefreshCw, Eye, BarChart3 } from "lucide-react";
import { toast } from "sonner";

interface DataQualityActionsProps {
  placeId: number;
}

export function DataQualityActions({ placeId }: DataQualityActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const triggerRefresh = async () => {
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
    }
  };

  const recalculateQuality = async () => {
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
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={triggerRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Now
        </DropdownMenuItem>
        <DropdownMenuItem onClick={recalculateQuality}>
          <BarChart3 className="h-4 w-4 mr-2" />
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
  );
}

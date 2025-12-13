"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, CheckCircle, XCircle, Flag, Star, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ReviewModerationActionsProps {
  reviewId: number;
  currentStatus: string;
  isFeatured: boolean;
}

export function ReviewModerationActions({
  reviewId,
  currentStatus,
  isFeatured,
}: ReviewModerationActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const moderateReview = async (action: "approve" | "reject" | "flag" | "toggle_featured") => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update review");
      }

      toast.success(data.message || "Review updated");
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update review");
      console.error(error);
    }
  };

  const deleteReview = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete review");
      }

      toast.success("Review deleted");
      setShowDeleteDialog(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete review");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {currentStatus !== "published" && (
            <DropdownMenuItem onClick={() => moderateReview("approve")}>
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Approve
            </DropdownMenuItem>
          )}
          {currentStatus !== "rejected" && (
            <DropdownMenuItem onClick={() => moderateReview("reject")}>
              <XCircle className="h-4 w-4 mr-2 text-red-600" />
              Reject
            </DropdownMenuItem>
          )}
          {currentStatus !== "flagged" && (
            <DropdownMenuItem onClick={() => moderateReview("flag")}>
              <Flag className="h-4 w-4 mr-2 text-orange-600" />
              Flag for Review
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => moderateReview("toggle_featured")}>
            <Star className={`h-4 w-4 mr-2 ${isFeatured ? "fill-yellow-400 text-yellow-400" : ""}`} />
            {isFeatured ? "Remove Featured" : "Mark as Featured"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Review
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteReview}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

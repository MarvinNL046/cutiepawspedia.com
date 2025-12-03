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
import { MoreHorizontal, CheckCircle, XCircle, Flag, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PhotoModerationActionsProps {
  photoId: number;
  currentStatus: string;
}

type PhotoStatus = "pending" | "approved" | "rejected" | "flagged";

export function PhotoModerationActions({
  photoId,
  currentStatus,
}: PhotoModerationActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateStatus = async (newStatus: PhotoStatus) => {
    try {
      const response = await fetch(`/api/admin/photos/${photoId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update photo status");
      }

      toast.success(`Photo ${newStatus}`);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error("Failed to update photo status");
      console.error(error);
    }
  };

  const deletePhoto = async () => {
    try {
      const response = await fetch(`/api/admin/photos/${photoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }

      toast.success("Photo deleted");
      setShowDeleteDialog(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error("Failed to delete photo");
      console.error(error);
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
          {currentStatus !== "approved" && (
            <DropdownMenuItem onClick={() => updateStatus("approved")}>
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Approve
            </DropdownMenuItem>
          )}
          {currentStatus !== "rejected" && (
            <DropdownMenuItem onClick={() => updateStatus("rejected")}>
              <XCircle className="h-4 w-4 mr-2 text-red-500" />
              Reject
            </DropdownMenuItem>
          )}
          {currentStatus !== "flagged" && (
            <DropdownMenuItem onClick={() => updateStatus("flagged")}>
              <Flag className="h-4 w-4 mr-2 text-orange-500" />
              Flag for Review
            </DropdownMenuItem>
          )}
          {currentStatus !== "pending" && (
            <DropdownMenuItem onClick={() => updateStatus("pending")}>
              Reset to Pending
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Photo</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this photo? This action cannot be undone
              and will remove the photo from storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deletePhoto}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

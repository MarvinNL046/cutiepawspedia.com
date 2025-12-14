"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, Clock, Wrench, CheckCircle, XCircle, StickyNote, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeedbackStatusActionsProps {
  feedbackId: number;
  currentStatus: string;
  adminNotes: string | null;
}

async function updateFeedbackStatus(
  feedbackId: number,
  status: string,
  adminNotes?: string
) {
  const response = await fetch("/api/admin/feedback/status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ feedbackId, status, adminNotes }),
  });

  if (!response.ok) {
    throw new Error("Failed to update feedback status");
  }

  return response.json();
}

export function FeedbackStatusActions({
  feedbackId,
  currentStatus,
  adminNotes,
}: FeedbackStatusActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [notes, setNotes] = useState(adminNotes || "");

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateFeedbackStatus(feedbackId, newStatus);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleSaveNotes = async () => {
    try {
      await updateFeedbackStatus(feedbackId, currentStatus, notes);
      setShowNotesDialog(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Failed to save notes:", error);
      alert("Failed to save notes. Please try again.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => handleStatusChange("new")}
            disabled={currentStatus === "new"}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4 text-blue-500" />
            Mark as New
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleStatusChange("in_progress")}
            disabled={currentStatus === "in_progress"}
            className="flex items-center gap-2"
          >
            <Wrench className="h-4 w-4 text-yellow-500" />
            Mark In Progress
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleStatusChange("resolved")}
            disabled={currentStatus === "resolved"}
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4 text-green-500" />
            Mark Resolved
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleStatusChange("wont_fix")}
            disabled={currentStatus === "wont_fix"}
            className="flex items-center gap-2"
          >
            <XCircle className="h-4 w-4 text-slate-500" />
            Won&apos;t Fix
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setShowNotesDialog(true)}
            className="flex items-center gap-2"
          >
            <StickyNote className="h-4 w-4 text-cpAqua" />
            Add/Edit Notes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Notes</DialogTitle>
            <DialogDescription>
              Add internal notes about this feedback item. These notes are only visible to admins.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this feedback..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotesDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

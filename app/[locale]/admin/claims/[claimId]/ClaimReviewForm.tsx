"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { approveClaimAction, rejectClaimAction } from "../actions";

interface ClaimReviewFormProps {
  claimId: number;
  locale: string;
}

export function ClaimReviewForm({ claimId, locale }: ClaimReviewFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [adminNotes, setAdminNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

  const handleApprove = () => {
    setActionType("approve");
    setError(null);
    startTransition(async () => {
      const result = await approveClaimAction(claimId, adminNotes || undefined);
      if (result.success) {
        router.push(`/${locale}/admin/claims?status=pending`);
        router.refresh();
      } else {
        setError(result.error || "Failed to approve claim");
        setActionType(null);
      }
    });
  };

  const handleReject = () => {
    if (!adminNotes.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }
    setActionType("reject");
    setError(null);
    startTransition(async () => {
      const result = await rejectClaimAction(claimId, adminNotes);
      if (result.success) {
        router.push(`/${locale}/admin/claims?status=pending`);
        router.refresh();
      } else {
        setError(result.error || "Failed to reject claim");
        setActionType(null);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="adminNotes">Admin Notes</Label>
        <Textarea
          id="adminNotes"
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          placeholder="Add notes about your decision (required for rejection)..."
          className="mt-1.5"
          rows={3}
          disabled={isPending}
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Button
          onClick={handleApprove}
          disabled={isPending}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isPending && actionType === "approve" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Approving...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Claim
            </>
          )}
        </Button>
        <Button
          onClick={handleReject}
          disabled={isPending}
          variant="destructive"
          className="w-full"
        >
          {isPending && actionType === "reject" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Rejecting...
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 mr-2" />
              Reject Claim
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

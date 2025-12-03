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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MoreHorizontal,
  Eye,
  AlertTriangle,
  RefreshCcw,
  Loader2,
  Ban,
} from "lucide-react";
import Link from "next/link";
import { markLeadAsSpamAction, refundLeadAction } from "./actions";

interface Lead {
  id: number;
  placeId: number;
  businessId: number | null;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  status: string;
  priceCents: number | null;
  chargedAt: Date | null;
  placeName: string | null;
  placeSlug: string | null;
  businessName: string | null;
}

interface LeadActionsDropdownProps {
  lead: Lead;
  locale: string;
}

export function LeadActionsDropdown({ lead, locale }: LeadActionsDropdownProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showSpamDialog, setShowSpamDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isSpam = lead.status === "spam";
  const isCharged = lead.chargedAt && lead.priceCents;

  const handleMarkAsSpam = () => {
    setError(null);
    startTransition(async () => {
      const result = await markLeadAsSpamAction(lead.id, reason || undefined);
      if (result.success) {
        setShowSpamDialog(false);
        setReason("");
        router.refresh();
      } else {
        setError(result.error || "Failed to mark as spam");
      }
    });
  };

  const handleRefund = () => {
    if (!reason.trim()) {
      setError("Please provide a reason for the refund");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await refundLeadAction(lead.id, reason.trim());
      if (result.success) {
        setShowRefundDialog(false);
        setReason("");
        router.refresh();
      } else {
        setError(result.error || "Failed to refund lead");
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/${locale}/admin/leads/${lead.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </DropdownMenuItem>
          {lead.placeSlug && (
            <DropdownMenuItem asChild>
              <Link href={`/${locale}/${lead.placeSlug}`} target="_blank">
                <Eye className="h-4 w-4 mr-2" />
                View Place
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {!isSpam && (
            <DropdownMenuItem
              onClick={() => setShowSpamDialog(true)}
              className="text-red-600"
            >
              <Ban className="h-4 w-4 mr-2" />
              Mark as Spam
              {isCharged && " & Refund"}
            </DropdownMenuItem>
          )}
          {isCharged && !isSpam && (
            <DropdownMenuItem
              onClick={() => setShowRefundDialog(true)}
              className="text-amber-600"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refund Only
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Mark as Spam Dialog */}
      <Dialog open={showSpamDialog} onOpenChange={setShowSpamDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Mark Lead as Spam
            </DialogTitle>
            <DialogDescription>
              This will mark lead #{lead.id} from {lead.name} as spam.
              {isCharged && (
                <span className="block mt-2 font-medium text-green-600">
                  €{((lead.priceCents || 0) / 100).toFixed(2)} will be refunded to{" "}
                  {lead.businessName || "the business"}.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="spamReason">Reason (optional)</Label>
            <Textarea
              id="spamReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why is this lead spam?"
              className="mt-1.5"
              rows={2}
            />
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSpamDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleMarkAsSpam}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Ban className="h-4 w-4 mr-2" />
                  Mark as Spam
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refund Dialog */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCcw className="h-5 w-5 text-amber-500" />
              Refund Lead Charge
            </DialogTitle>
            <DialogDescription>
              Refund €{((lead.priceCents || 0) / 100).toFixed(2)} to{" "}
              {lead.businessName || "the business"} for lead #{lead.id}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="refundReason">Reason (required)</Label>
            <Textarea
              id="refundReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you refunding this lead?"
              className="mt-1.5"
              rows={2}
            />
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRefundDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-amber-600 hover:bg-amber-700"
              onClick={handleRefund}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refund €{((lead.priceCents || 0) / 100).toFixed(2)}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Minus } from "lucide-react";
import { adminAdjustCreditsAction } from "../businesses/actions";

interface AdminCreditAdjustmentFormProps {
  locale: string;
  prefilledBusinessId?: number;
}

export function AdminCreditAdjustmentForm({
  locale,
  prefilledBusinessId,
}: AdminCreditAdjustmentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [businessId, setBusinessId] = useState(prefilledBusinessId?.toString() || "");
  const [amount, setAmount] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const bizId = parseInt(businessId, 10);
    const amountCents = Math.round(parseFloat(amount) * 100);

    if (isNaN(bizId) || bizId <= 0) {
      setError("Please enter a valid business ID");
      return;
    }

    if (isNaN(amountCents) || amountCents <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!reason.trim()) {
      setError("Please provide a reason for this adjustment");
      return;
    }

    const finalAmount = operation === "add" ? amountCents : -amountCents;

    startTransition(async () => {
      const result = await adminAdjustCreditsAction({
        businessId: bizId,
        amountCents: finalAmount,
        reason: reason.trim(),
      });

      if (result.success) {
        setSuccess(true);
        setAmount("");
        setReason("");
        if (!prefilledBusinessId) {
          setBusinessId("");
        }
        router.refresh();
      } else {
        setError(result.error || "Failed to adjust credits");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="businessId">Business ID</Label>
        <Input
          id="businessId"
          type="number"
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
          placeholder="Enter business ID"
          disabled={isPending || !!prefilledBusinessId}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="operation">Operation</Label>
        <Select
          value={operation}
          onValueChange={(v) => setOperation(v as "add" | "subtract")}
          disabled={isPending}
        >
          <SelectTrigger id="operation" className="mt-1.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-green-600" />
                Add Credits
              </div>
            </SelectItem>
            <SelectItem value="subtract">
              <div className="flex items-center gap-2">
                <Minus className="h-4 w-4 text-red-600" />
                Subtract Credits
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="amount">Amount (€)</Label>
        <div className="relative mt-1.5">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            disabled={isPending}
            className="pl-7"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="reason">Reason</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for adjustment (required)..."
          disabled={isPending}
          className="mt-1.5"
          rows={2}
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md p-3">
          Credits adjusted successfully!
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className={
          operation === "add"
            ? "w-full bg-green-600 hover:bg-green-700"
            : "w-full bg-red-600 hover:bg-red-700"
        }
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : operation === "add" ? (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Add Credits
          </>
        ) : (
          <>
            <Minus className="h-4 w-4 mr-2" />
            Subtract Credits
          </>
        )}
      </Button>
    </form>
  );
}

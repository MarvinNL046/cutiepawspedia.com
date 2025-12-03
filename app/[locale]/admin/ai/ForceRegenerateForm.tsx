"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Zap, Loader2, CheckCircle, XCircle } from "lucide-react";
import { forceRegenerate } from "./actions";
import type { AiContentType } from "@/db/schema/ai";

interface ForceRegenerateFormProps {
  locale: string;
}

export function ForceRegenerateForm({ locale }: ForceRegenerateFormProps) {
  const [cacheKey, setCacheKey] = useState("");
  const [contentType, setContentType] = useState<AiContentType>("city");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const handleRegenerate = () => {
    if (!cacheKey.trim()) {
      setResult({ success: false, error: "Please enter a cache key" });
      return;
    }

    startTransition(async () => {
      const response = await forceRegenerate(locale, cacheKey.trim(), contentType);
      setResult(response);

      // Clear result after 5 seconds
      setTimeout(() => setResult(null), 5000);
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Content Type</label>
        <Select value={contentType} onValueChange={(v) => setContentType(v as AiContentType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="country">Country</SelectItem>
            <SelectItem value="city">City</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="place">Place</SelectItem>
            <SelectItem value="combo">Combo (Category + City)</SelectItem>
            <SelectItem value="best">Best (Rankings)</SelectItem>
            <SelectItem value="top">Top (Country-wide)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Cache Key</label>
        <Input
          placeholder="e.g., city:amsterdam:netherlands:nl"
          value={cacheKey}
          onChange={(e) => setCacheKey(e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Format: type:slug:parent:locale
        </p>
      </div>

      <div className="text-xs text-muted-foreground bg-slate-50 p-2 rounded-md space-y-1">
        <p className="font-medium">Key formats:</p>
        <ul className="space-y-0.5 font-mono">
          <li>country:netherlands:nl</li>
          <li>city:amsterdam:netherlands:nl</li>
          <li>category:veterinary:netherlands:nl</li>
          <li>place:pets-place:amsterdam:netherlands:nl</li>
          <li>combo:veterinary:amsterdam:netherlands:nl</li>
          <li>best:veterinary:netherlands:nl</li>
          <li>top:veterinary:netherlands:nl</li>
        </ul>
      </div>

      {/* Result Message */}
      {result && (
        <div
          className={`p-3 rounded-md flex items-center gap-2 ${
            result.success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {result.success ? (
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 flex-shrink-0" />
          )}
          <span className="text-sm">{result.message || result.error}</span>
        </div>
      )}

      <Button
        onClick={handleRegenerate}
        disabled={isPending || !cacheKey.trim()}
        className="w-full gap-2"
        variant="default"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Regenerating...
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            Force Regenerate
          </>
        )}
      </Button>
    </div>
  );
}

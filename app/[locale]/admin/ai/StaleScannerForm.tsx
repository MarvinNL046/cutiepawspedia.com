"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface StaleScannerFormProps {
  locale: string;
}

export function StaleScannerForm({ locale }: StaleScannerFormProps) {
  const router = useRouter();

  const handleScan = () => {
    router.push(`/${locale}/admin/ai?tab=stale`);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Finds content that is either:
      </p>
      <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
        <li>Marked as stale</li>
        <li>Has an outdated AI version</li>
        <li>Older than the staleness threshold</li>
      </ul>

      <Button onClick={handleScan} className="w-full gap-2" variant="outline">
        <Clock className="h-4 w-4" />
        Scan Stale Content
      </Button>
    </div>
  );
}

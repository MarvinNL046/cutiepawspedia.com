"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

interface MissingScannerFormProps {
  locale: string;
  currentLocale: string;
}

export function MissingScannerForm({ locale, currentLocale }: MissingScannerFormProps) {
  const router = useRouter();
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  const handleScan = () => {
    router.push(`/${locale}/admin/ai?tab=missing&scanLocale=${selectedLocale}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Content Locale</label>
        <Select value={selectedLocale} onValueChange={setSelectedLocale}>
          <SelectTrigger>
            <SelectValue placeholder="Select locale" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nl">Dutch (nl)</SelectItem>
            <SelectItem value="en">English (en)</SelectItem>
            <SelectItem value="de">German (de)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Scans cities, places, and categories to find entities without AI-generated content.
      </p>

      <Button onClick={handleScan} className="w-full gap-2">
        <Search className="h-4 w-4" />
        Scan Missing Content
      </Button>
    </div>
  );
}

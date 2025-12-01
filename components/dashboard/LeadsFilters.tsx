"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Loader2, Filter } from "lucide-react";
import { useState } from "react";
import { trackDashboardExport, trackDashboardFilter } from "@/lib/analytics";

interface LeadsFiltersProps {
  locale: string;
  listings: Array<{ id: number; name: string }>;
  currentListingId?: string;
  currentPeriod: string;
  totalLeads: number;
}

export function LeadsFilters({
  locale,
  listings,
  currentListingId,
  currentPeriod,
  totalLeads,
}: LeadsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExporting, setIsExporting] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Track filter change
    trackDashboardFilter({
      filterType: key as "listing" | "period",
      filterValue: value || "all",
      resultCount: totalLeads,
    });

    router.push(`/${locale}/dashboard/leads?${params.toString()}`);
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Build export URL with current filters
      const params = new URLSearchParams();
      if (currentListingId) params.set("listingId", currentListingId);
      if (currentPeriod && currentPeriod !== "all") params.set("period", currentPeriod);

      const exportUrl = `/api/dashboard/leads/export?${params.toString()}`;

      // Track export event
      trackDashboardExport({
        exportType: "leads_csv",
        filters: {
          listingId: currentListingId ? parseInt(currentListingId) : undefined,
          period: currentPeriod,
        },
        recordCount: totalLeads,
      });

      // Trigger download
      const response = await fetch(exportUrl);
      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export leads. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg">
      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="h-4 w-4 text-slate-500" />

        {/* Listing Filter */}
        <Select
          value={currentListingId || "all"}
          onValueChange={(value) => updateFilter("listingId", value)}
        >
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="All Listings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Listings</SelectItem>
            {listings.map((listing) => (
              <SelectItem key={listing.id} value={String(listing.id)}>
                {listing.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Period Filter */}
        <Select
          value={currentPeriod || "all"}
          onValueChange={(value) => updateFilter("period", value)}
        >
          <SelectTrigger className="w-[150px] bg-white">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Export Button */}
      <Button
        onClick={handleExport}
        disabled={isExporting || totalLeads === 0}
        variant="outline"
        className="gap-2"
      >
        {isExporting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Export CSV
          </>
        )}
      </Button>
    </div>
  );
}

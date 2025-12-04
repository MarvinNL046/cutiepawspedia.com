"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info, AlertTriangle, XCircle, CheckCircle, Zap } from "lucide-react";
import { FLAG_CATEGORIES, type EnrichmentFlag } from "@/lib/enrichment/flags";

interface EnrichmentFlagsDialogProps {
  flags: string[];
  placeName: string;
}

// Flag display configuration
const FLAG_CONFIG: Record<string, { label: string; description: string }> = {
  // Source indicators
  SCHEMA_ORG_FOUND: { label: "Schema.org", description: "Structured data found on website" },
  SCHEMA_ORG_RATING: { label: "Schema Rating", description: "Rating extracted from Schema.org" },
  SCHEMA_ORG_HOURS: { label: "Schema Hours", description: "Hours extracted from Schema.org" },
  SCHEMA_ORG_ADDRESS: { label: "Schema Address", description: "Address extracted from Schema.org" },
  SCHEMA_ORG_GEO: { label: "Schema Geo", description: "Coordinates extracted from Schema.org" },

  // Opening hours sources
  OPENING_HOURS_VIA_JINA: { label: "Hours via Jina", description: "Opening hours extracted using Jina AI" },
  OPENING_HOURS_VIA_REGEX: { label: "Hours via Regex", description: "Opening hours extracted using pattern matching" },
  OPENING_HOURS_VIA_TABLE: { label: "Hours via Table", description: "Opening hours extracted from table structure" },
  OPENING_HOURS_VIA_SCHEMA: { label: "Hours via Schema", description: "Opening hours extracted from Schema.org" },
  OPENING_HOURS_INCOMPLETE: { label: "Hours Incomplete", description: "Less than 5 days of opening hours" },
  OPENING_HOURS_LOW_CONFIDENCE: { label: "Hours Low Conf.", description: "Opening hours confidence below 60%" },

  // Rating sources
  RATING_VIA_GOOGLE: { label: "Google Rating", description: "Rating extracted from Google Reviews badge" },
  RATING_VIA_FACEBOOK: { label: "Facebook Rating", description: "Rating extracted from Facebook badge" },
  RATING_VIA_TRUSTPILOT: { label: "Trustpilot Rating", description: "Rating extracted from Trustpilot badge" },
  RATING_VIA_SCHEMA: { label: "Schema Rating", description: "Rating extracted from Schema.org" },
  RATING_VIA_STARS: { label: "Star Rating", description: "Rating extracted from star symbols" },
  RATING_VIA_TEXT: { label: "Text Rating", description: "Rating extracted from text patterns" },
  RATING_AGGREGATED: { label: "Aggregated Rating", description: "Rating combined from multiple sources" },

  // About section
  ABOUT_SECTION_FOUND: { label: "About Found", description: "About Us section found on website" },
  ABOUT_SECTION_SUMMARIZED: { label: "About Summarized", description: "About section was AI-summarized" },
  ABOUT_FACTS_EXTRACTED: { label: "Facts Extracted", description: "Business facts extracted from about section" },

  // Missing data warnings
  NO_ADDRESS: { label: "No Address", description: "Missing address information" },
  NO_PHONE: { label: "No Phone", description: "Missing phone number" },
  NO_WEBSITE: { label: "No Website", description: "Missing website URL" },
  NO_OPENING_HOURS: { label: "No Hours", description: "Missing opening hours" },
  NO_RATING: { label: "No Rating", description: "Missing rating information" },
  NO_REVIEWS: { label: "No Reviews", description: "No reviews available" },
  NO_PHOTOS: { label: "No Photos", description: "No photos available" },
  NO_DESCRIPTION: { label: "No Description", description: "Missing business description" },
  NO_EMAIL: { label: "No Email", description: "Missing email address" },
  NO_COORDINATES: { label: "No Coordinates", description: "Missing geographic coordinates" },

  // Stale data
  DATA_STALE_30_DAYS: { label: "Stale 30d", description: "Data not refreshed in 30 days" },
  DATA_STALE_90_DAYS: { label: "Stale 90d", description: "Data not refreshed in 90 days" },
  DATA_STALE_365_DAYS: { label: "Stale 1yr", description: "Data not refreshed in over a year" },
  NEVER_REFRESHED: { label: "Never Refreshed", description: "Data has never been refreshed" },

  // Website issues
  WEBSITE_UNREACHABLE: { label: "Site Unreachable", description: "Website could not be reached" },
  WEBSITE_REDIRECT: { label: "Site Redirect", description: "Website redirects to different domain" },
  WEBSITE_ERROR: { label: "Site Error", description: "Website returned an error" },
  WEBSITE_NO_CONTENT: { label: "No Content", description: "Website returned empty content" },

  // Business status
  POSSIBLY_CLOSED: { label: "Possibly Closed", description: "Business might be closed" },
  CONFIRMED_CLOSED: { label: "Confirmed Closed", description: "Business is confirmed closed" },
  STATUS_UNCERTAIN: { label: "Status Unknown", description: "Business status is uncertain" },

  // Enrichment status
  ENRICHMENT_FAILED: { label: "Enrichment Failed", description: "Data enrichment process failed" },
  ENRICHMENT_PARTIAL: { label: "Partial Enrichment", description: "Only some data was enriched" },
  ENRICHMENT_COMPLETE: { label: "Fully Enriched", description: "All available data was enriched" },
  MANUAL_REVIEW_NEEDED: { label: "Review Needed", description: "Manual review is required" },

  // Data conflicts
  CONFLICTING_HOURS: { label: "Hours Conflict", description: "Multiple conflicting opening hours found" },
  CONFLICTING_RATING: { label: "Rating Conflict", description: "Multiple conflicting ratings found" },
  CONFLICTING_ADDRESS: { label: "Address Conflict", description: "Multiple conflicting addresses found" },
};

function getFlagCategory(flag: string): "source" | "warning" | "error" | "status" | "conflict" | "unknown" {
  if ((FLAG_CATEGORIES.source as readonly string[]).includes(flag)) return "source";
  if ((FLAG_CATEGORIES.warning as readonly string[]).includes(flag)) return "warning";
  if ((FLAG_CATEGORIES.error as readonly string[]).includes(flag)) return "error";
  if ((FLAG_CATEGORIES.status as readonly string[]).includes(flag)) return "status";
  if ((FLAG_CATEGORIES.conflict as readonly string[]).includes(flag)) return "conflict";
  return "unknown";
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "source":
      return <Zap className="h-4 w-4 text-green-600" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    case "error":
      return <XCircle className="h-4 w-4 text-red-600" />;
    case "status":
      return <Info className="h-4 w-4 text-blue-600" />;
    case "conflict":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    default:
      return <Info className="h-4 w-4 text-gray-600" />;
  }
}

function getCategoryBadgeClass(category: string) {
  switch (category) {
    case "source":
      return "bg-green-100 text-green-700 border-green-200";
    case "warning":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "error":
      return "bg-red-100 text-red-700 border-red-200";
    case "status":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "conflict":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export function EnrichmentFlagsDialog({ flags, placeName }: EnrichmentFlagsDialogProps) {
  const [open, setOpen] = useState(false);

  // Group flags by category
  const groupedFlags = flags.reduce((acc, flag) => {
    const category = getFlagCategory(flag);
    if (!acc[category]) acc[category] = [];
    acc[category].push(flag);
    return acc;
  }, {} as Record<string, string[]>);

  const categoryOrder = ["source", "status", "warning", "error", "conflict", "unknown"];
  const categoryLabels: Record<string, string> = {
    source: "Data Sources",
    status: "Enrichment Status",
    warning: "Warnings",
    error: "Errors",
    conflict: "Data Conflicts",
    unknown: "Other",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <span className="mr-1">{flags.length}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enrichment Flags</DialogTitle>
          <DialogDescription>
            Data quality flags for {placeName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {categoryOrder.map((category) => {
            const categoryFlags = groupedFlags[category];
            if (!categoryFlags || categoryFlags.length === 0) return null;

            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  {getCategoryIcon(category)}
                  <h3 className="font-medium text-sm">{categoryLabels[category]}</h3>
                  <Badge variant="outline" className="text-xs">
                    {categoryFlags.length}
                  </Badge>
                </div>
                <div className="grid gap-2">
                  {categoryFlags.map((flag) => {
                    const config = FLAG_CONFIG[flag] || { label: flag, description: "No description" };
                    return (
                      <div
                        key={flag}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${getCategoryBadgeClass(category)}`}
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{config.label}</p>
                          <p className="text-xs opacity-80">{config.description}</p>
                        </div>
                        <code className="text-[10px] opacity-60 font-mono">{flag}</code>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {flags.length === 0 && (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              No quality flags
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

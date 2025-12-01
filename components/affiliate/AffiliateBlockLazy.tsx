"use client";

/**
 * Lazy-loaded AffiliateBlock wrapper
 *
 * PERFORMANCE: Dynamic import for code splitting
 * - AffiliateBlock imports 11 Lucide icons (~5KB each)
 * - Only loads when component enters viewport
 * - Reduces initial bundle size
 * - Shows loading skeleton while loading
 */

import dynamic from "next/dynamic";
import type { AffiliateType } from "./AffiliateBlock";

// Loading skeleton component
function AffiliateSkeleton({ variant = "card" }: { variant?: string }) {
  if (variant === "banner") {
    return (
      <div className="p-4 rounded-xl bg-slate-100 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200" />
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-100 animate-pulse">
        <div className="w-5 h-5 rounded bg-slate-200" />
        <div className="h-4 bg-slate-200 rounded flex-1" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white animate-pulse">
      <div className="p-4 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200" />
          <div className="h-5 bg-slate-200 rounded w-1/3" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="h-3 bg-slate-200 rounded w-3/4" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-lg border border-slate-100">
              <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dynamic import with loading state
const AffiliateBlock = dynamic(
  () => import("./AffiliateBlock").then((mod) => mod.AffiliateBlock),
  {
    loading: () => <AffiliateSkeleton />,
    ssr: true,
  }
);

const CategoryAffiliateBlock = dynamic(
  () => import("./AffiliateBlock").then((mod) => mod.CategoryAffiliateBlock),
  {
    loading: () => <AffiliateSkeleton />,
    ssr: true,
  }
);

// Export lazy versions
export {
  AffiliateBlock as AffiliateBlockLazy,
  CategoryAffiliateBlock as CategoryAffiliateBlockLazy,
  type AffiliateType,
};

/**
 * Province Category Page Loading Skeleton
 *
 * Shows a skeleton loader while the province category page loads.
 */

import { Card, CardContent } from "@/components/ui/card";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-cpSurface rounded ${className}`} />;
}

function PlaceCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-1 pt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProvinceCategoryLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb skeleton */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <span className="text-slate-300">/</span>
          <Skeleton className="h-4 w-20" />
          <span className="text-slate-300">/</span>
          <Skeleton className="h-4 w-24" />
          <span className="text-slate-300">/</span>
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-b from-cpAqua/10 to-background dark:from-cpAqua/5 dark:to-cpCharcoal border-b">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-2/3 md:w-1/2" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-gradient-to-b from-cpAqua/10 to-background border-b">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-background border-b shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-full hidden sm:block" />
            </div>
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <PlaceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="bg-muted/50 py-12 border-t">
        <div className="container mx-auto max-w-6xl px-4">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-8 w-40 rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}

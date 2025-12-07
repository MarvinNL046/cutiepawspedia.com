/**
 * Category Listing Page Loading Skeleton
 *
 * Shows a skeleton loader while the category listing page loads.
 */

import { Card, CardContent } from "@/components/ui/card";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-cpSurface rounded ${className}`} />;
}

function PlaceCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4" />
          ))}
          <Skeleton className="h-4 w-16 ml-2" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
    </Card>
  );
}

export default function CategoryListingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cpCream/30 to-white dark:from-cpDark dark:to-cpDark">
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

      <section className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-10 w-2/3 md:w-1/2" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-3/4 max-w-xl" />
        </div>

        {/* Filter/Sort Bar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Places Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <PlaceCardSkeleton key={i} />
              ))}
            </div>

            {/* Pagination skeleton */}
            <div className="flex justify-center gap-2 mt-8">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map skeleton */}
            <Card>
              <CardContent className="p-0">
                <Skeleton className="w-full h-[250px] rounded-lg" />
              </CardContent>
            </Card>

            {/* Related categories */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-5 w-32" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-md" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Affiliate block skeleton */}
            <Card>
              <div className="p-4 bg-slate-50 dark:bg-cpSurface/30">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
              <CardContent className="pt-4 space-y-3">
                <Skeleton className="h-3 w-full" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-3 rounded-lg border space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

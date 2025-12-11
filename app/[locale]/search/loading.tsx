/**
 * Search Page Loading Skeleton
 *
 * Shows a skeleton loader while search results are loading.
 */

import { Card, CardContent } from "@/components/ui/card";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-cpSurface rounded ${className}`} />;
}

function SearchResultSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <Skeleton className="w-full sm:w-48 h-40 sm:h-auto shrink-0" />
        <CardContent className="p-4 flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
            <Skeleton className="h-4 w-16 ml-2" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
          <div className="flex items-center gap-4 pt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-10 w-2/3 md:w-1/2" />
          <Skeleton className="h-5 w-48" />
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-12 flex-1 rounded-lg" />
          <Skeleton className="h-12 w-full sm:w-48 rounded-lg" />
          <Skeleton className="h-12 w-full sm:w-32 rounded-lg" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Results */}
          <div className="lg:col-span-3 space-y-4">
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-40 rounded-md" />
            </div>

            {/* Results list */}
            {[...Array(8)].map((_, i) => (
              <SearchResultSkeleton key={i} />
            ))}

            {/* Pagination */}
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
            {/* Map */}
            <Card>
              <CardContent className="p-0">
                <Skeleton className="w-full h-[250px] rounded-lg" />
              </CardContent>
            </Card>

            {/* Nearby cities */}
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

            {/* Popular categories */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-5 w-40" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
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

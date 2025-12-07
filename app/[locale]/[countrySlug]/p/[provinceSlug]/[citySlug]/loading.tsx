/**
 * City Page Loading Skeleton (Province-aware)
 *
 * Shows a skeleton loader while the city page loads.
 */

import { Card, CardContent } from "@/components/ui/card";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-cpSurface rounded ${className}`} />;
}

function CategoryCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function CityPageLoading() {
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
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <section className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-12 w-2/3 md:w-1/2" />
          <Skeleton className="h-5 w-full max-w-3xl" />
          <Skeleton className="h-5 w-3/4 max-w-2xl" />
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Popular Places Section */}
        <div className="mb-12">
          <Skeleton className="h-8 w-56 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-20 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <Skeleton className="h-8 w-40 mb-6" />
          <Skeleton className="w-full h-[400px] rounded-lg" />
        </div>

        {/* About Section */}
        <Card className="mb-8">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

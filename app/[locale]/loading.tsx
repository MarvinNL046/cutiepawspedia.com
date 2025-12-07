/**
 * Homepage Loading Skeleton
 *
 * Shows a skeleton loader while the homepage loads.
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
      </CardContent>
    </Card>
  );
}

function CategoryCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomepageLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cpCoral/10 via-cpCream/50 to-cpAmber/10 dark:from-cpDark dark:via-cpDark dark:to-cpDark py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Skeleton className="h-12 md:h-16 w-full max-w-xl mx-auto" />
            <Skeleton className="h-12 md:h-16 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto" />

            {/* Search Bar Skeleton */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Skeleton className="h-14 flex-1 rounded-xl" />
              <Skeleton className="h-14 w-full sm:w-40 rounded-xl" />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white dark:bg-cpDark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Skeleton className="h-8 w-48 mx-auto mb-3" />
            <Skeleton className="h-5 w-72 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Places Section */}
      <section className="py-12 bg-cpCream/30 dark:bg-cpSurface/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-56 mb-2" />
              <Skeleton className="h-5 w-72" />
            </div>
            <Skeleton className="h-10 w-32 rounded-lg hidden md:block" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <PlaceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-12 bg-white dark:bg-cpDark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Skeleton className="h-8 w-56 mx-auto mb-3" />
            <Skeleton className="h-5 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-32" />
                <CardContent className="p-3 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-cpCoral/5 dark:bg-cpCoral/10">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-5 w-full max-w-md mx-auto" />
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 w-full sm:w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

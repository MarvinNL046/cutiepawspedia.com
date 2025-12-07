/**
 * Blog Listing Page Loading Skeleton
 *
 * Shows a skeleton loader while the blog listing page loads.
 */

import { Card, CardContent } from "@/components/ui/card";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-cpSurface rounded ${className}`} />;
}

function BlogCardSkeleton({ featured = false }: { featured?: boolean }) {
  if (featured) {
    return (
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <Skeleton className="w-full h-64 md:h-full" />
          <CardContent className="p-6 space-y-4 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function BlogListingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cpCream/30 to-white dark:from-cpDark dark:to-cpDark">
      <section className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-12 w-48 mx-auto" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-5 w-3/4 max-w-xl mx-auto" />
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <BlogCardSkeleton featured />
        </div>

        {/* Categories filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>

        {/* Load More / Pagination */}
        <div className="flex justify-center mt-10">
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </section>
    </div>
  );
}

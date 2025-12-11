/**
 * Blog Post Page Loading Skeleton
 *
 * Shows a skeleton loader while the blog post loads.
 */

import { Card, CardContent } from "@/components/ui/card";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-cpSurface rounded ${className}`} />;
}

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb skeleton */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <span className="text-slate-300">/</span>
          <Skeleton className="h-4 w-12" />
          <span className="text-slate-300">/</span>
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <article className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Title */}
          <div className="mb-6 space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-3/4" />
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          {/* Featured Image */}
          <Skeleton className="w-full h-[400px] rounded-lg mb-8" />

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <Skeleton className="h-6 w-48 mt-8" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />

            <Skeleton className="h-6 w-56 mt-8" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            <Skeleton className="h-6 w-40 mt-8" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>

          {/* Share buttons */}
          <div className="flex items-center gap-4 mt-8">
            <Skeleton className="h-5 w-16" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full h-40" />
                  <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

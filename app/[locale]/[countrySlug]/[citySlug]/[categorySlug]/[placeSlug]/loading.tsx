/**
 * Place Detail Page Loading Skeleton
 *
 * Shows a skeleton loader while the place detail page is loading.
 * Automatically displayed by Next.js App Router during navigation.
 */

import { Card, CardContent, CardHeader } from "@/components/ui/card";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-cpSurface rounded ${className}`} />;
}

export default function PlaceDetailLoading() {
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
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery Skeleton */}
            <Card>
              <CardContent className="p-0">
                <Skeleton className="w-full h-[300px] md:h-[400px] rounded-t-lg" />
              </CardContent>
            </Card>

            {/* Title & Badge Section */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5" />
                  ))}
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* About Section Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>

            {/* Services Section Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-cpSurface/30">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-36" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Skeleton key={j} className="h-4 w-4" />
                        ))}
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Contact Card Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </CardContent>
            </Card>

            {/* Business Snapshot Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-36" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Map Skeleton */}
            <Card>
              <CardContent className="p-0">
                <Skeleton className="w-full h-[200px] rounded-lg" />
              </CardContent>
            </Card>

            {/* Lead Form Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-44" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-24 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </CardContent>
            </Card>

            {/* Affiliate Block Skeleton */}
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

            {/* Claim CTA Skeleton */}
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

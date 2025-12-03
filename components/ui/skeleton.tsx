/**
 * Skeleton Component
 *
 * PERFORMANCE: Used for CLS prevention and loading states
 * - Consistent skeleton styling across the app
 * - Prevents layout shift by reserving space
 * - Smooth pulse animation
 */

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton (CSS value or number for pixels) */
  width?: string | number;
  /** Height of the skeleton (CSS value or number for pixels) */
  height?: string | number;
  /** Whether to render as a circle (for avatars) */
  circle?: boolean;
}

export function Skeleton({
  className,
  width,
  height,
  circle,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200 dark:bg-slate-700",
        circle ? "rounded-full" : "rounded-md",
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
}

/**
 * Pre-built skeleton variants for common use cases
 */

/** Text skeleton - for single lines of text */
export function SkeletonText({
  lines = 1,
  className,
  ...props
}: { lines?: number } & Omit<SkeletonProps, "height">) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          className={i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"}
          {...props}
        />
      ))}
    </div>
  );
}

/** Card skeleton - for card-like content */
export function SkeletonCard({
  className,
  showImage = true,
  ...props
}: { showImage?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-4 space-y-4 animate-pulse",
        className
      )}
      {...props}
    >
      {showImage && <Skeleton height={160} className="w-full rounded-lg" />}
      <div className="space-y-2">
        <Skeleton height={20} className="w-3/4" />
        <Skeleton height={16} className="w-1/2" />
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}

/** Avatar skeleton - for user/profile images */
export function SkeletonAvatar({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <Skeleton width={size} height={size} circle className={className} />;
}

/** PlaceCard skeleton - matches PlaceCard layout */
export function SkeletonPlaceCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-4 space-y-3 animate-pulse",
        className
      )}
    >
      {/* Header with title and rating */}
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton height={20} className="w-3/4" />
          <Skeleton height={16} className="w-1/3" />
        </div>
        <Skeleton width={60} height={20} />
      </div>
      {/* Description */}
      <div className="space-y-2">
        <Skeleton height={14} className="w-full" />
        <Skeleton height={14} className="w-4/5" />
      </div>
      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton width={14} height={14} />
          <Skeleton height={14} className="w-2/3" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton width={14} height={14} />
          <Skeleton height={14} className="w-1/3" />
        </div>
      </div>
      {/* Categories */}
      <div className="flex gap-2">
        <Skeleton width={60} height={22} />
        <Skeleton width={50} height={22} />
      </div>
    </div>
  );
}

/** Grid of place card skeletons */
export function SkeletonPlaceGrid({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonPlaceCard key={i} />
      ))}
    </div>
  );
}

export default Skeleton;

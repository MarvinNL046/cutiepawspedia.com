"use client";

/**
 * Optimized Image Component
 *
 * PERFORMANCE: Wrapper around Next.js Image with sensible defaults
 * - Lazy loading by default
 * - Blur placeholder support
 * - Automatic width/height from aspect ratio
 * - Prevents layout shift with explicit dimensions
 * - WebP/AVIF automatic conversion
 */

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string; // Make alt required
  aspectRatio?: "square" | "video" | "portrait" | "wide" | number;
  fallback?: React.ReactNode;
  showSkeleton?: boolean;
}

// Aspect ratio presets
const aspectRatios = {
  square: 1,
  video: 16 / 9,
  portrait: 3 / 4,
  wide: 21 / 9,
};

export function OptimizedImage({
  alt,
  aspectRatio,
  className,
  fallback,
  showSkeleton = true,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Calculate aspect ratio padding
  const ratio =
    typeof aspectRatio === "number"
      ? aspectRatio
      : aspectRatio
      ? aspectRatios[aspectRatio]
      : undefined;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    onLoad?.(e as Parameters<NonNullable<ImageProps["onLoad"]>>[0]);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(e);
  };

  // Show fallback on error
  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={
        ratio
          ? {
              aspectRatio: ratio,
            }
          : undefined
      }
    >
      {/* Loading skeleton */}
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}

      <Image
        alt={alt}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

/**
 * Avatar Image - Optimized for user/business avatars
 */
export function AvatarImage({
  src,
  alt,
  size = 40,
  className,
}: {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    // Fallback to initials
    const initials = alt
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-cpCoral/20 text-cpCoral font-semibold",
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full object-cover", className)}
      onError={() => setHasError(true)}
    />
  );
}

/**
 * Place Image - Optimized for business/place photos
 */
export function PlaceImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    // Fallback placeholder
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-cpCoral/20 to-cpAqua/20",
          className
        )}
      >
        <span className="text-4xl">🐾</span>
      </div>
    );
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
      priority={priority}
      onError={() => setHasError(true)}
    />
  );
}

export { OptimizedImage as default };

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

export interface CommunityPhoto {
  id: number;
  url: string;
  width?: number | null;
  height?: number | null;
  altText?: string | null;
  reviewId: number;
  createdAt: string;
}

interface CommunityPhotosProps {
  photos: CommunityPhoto[];
  placeName: string;
  maxVisible?: number;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CommunityPhotos({
  photos,
  placeName,
  maxVisible = 6,
  className,
}: CommunityPhotosProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Only show approved photos (should already be filtered, but just in case)
  const visiblePhotos = useMemo(() => photos.slice(0, maxVisible), [photos, maxVisible]);
  const hasMore = photos.length > maxVisible;
  const moreCount = photos.length - maxVisible;

  if (photos.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  };

  return (
    <>
      <div className={cn("space-y-3", className)}>
        {/* Header */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Camera className="h-4 w-4" />
          <span>Community Photos ({photos.length})</span>
        </div>

        {/* Photo Grid */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-muted">
          {visiblePhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-muted hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={photo.url}
                alt={photo.altText || `Photo of ${placeName}`}
                fill
                className="object-cover"
                sizes="96px"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                <ZoomIn className="h-5 w-5 text-white" />
              </div>
            </button>
          ))}

          {/* "More" button */}
          {hasMore && (
            <button
              type="button"
              className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => openLightbox(maxVisible)}
            >
              <div className="text-center">
                <span className="block text-lg font-semibold">+{moreCount}</span>
                <span className="text-xs text-muted-foreground">more</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent
          className="max-w-4xl p-0 bg-black/95 border-none"
          onKeyDown={handleKeyDown}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Photo Gallery</DialogTitle>
            <DialogDescription>
              Photo {currentIndex + 1} of {photos.length} from {placeName}
            </DialogDescription>
          </DialogHeader>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>

          {/* Navigation buttons */}
          {photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
                <span className="sr-only">Previous photo</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
                <span className="sr-only">Next photo</span>
              </Button>
            </>
          )}

          {/* Main image */}
          <div className="relative w-full aspect-[4/3] min-h-[300px]">
            {photos[currentIndex] && (
              <Image
                src={photos[currentIndex].url}
                alt={photos[currentIndex].altText || `Photo of ${placeName}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            )}
          </div>

          {/* Photo counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

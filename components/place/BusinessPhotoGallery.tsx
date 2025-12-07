"use client";

/**
 * Business Photo Gallery Component
 *
 * Displays business photos in a responsive grid with lightbox functionality.
 * Shows primary photo first, then additional photos.
 */

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessPhoto {
  id: number;
  url: string;
  isPrimary: boolean;
  altText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
}

interface BusinessPhotoGalleryProps {
  photos: BusinessPhoto[];
  placeName: string;
  locale: string;
}

const labels = {
  en: {
    photos: "Photos",
    viewAll: "View all",
    photo: "Photo",
    of: "of",
    close: "Close",
  },
  nl: {
    photos: "Foto's",
    viewAll: "Bekijk alle",
    photo: "Foto",
    of: "van",
    close: "Sluiten",
  },
  de: {
    photos: "Fotos",
    viewAll: "Alle ansehen",
    photo: "Foto",
    of: "von",
    close: "Schließen",
  },
};

export function BusinessPhotoGallery({
  photos,
  placeName,
  locale,
}: BusinessPhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const t = labels[locale as keyof typeof labels] || labels.en;

  if (!photos || photos.length === 0) {
    return null;
  }

  // Sort photos: primary first, then by natural order
  const sortedPhotos = [...photos].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return 0;
  });

  const primaryPhoto = sortedPhotos[0];
  const additionalPhotos = sortedPhotos.slice(1, 5); // Show max 4 additional photos in grid
  const hasMorePhotos = sortedPhotos.length > 5;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? sortedPhotos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === sortedPhotos.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") setLightboxOpen(false);
  };

  return (
    <>
      {/* Photo Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground dark:text-cpCream flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-cpCoral" />
            {t.photos}
          </h3>
          {sortedPhotos.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openLightbox(0)}
              className="text-cpCoral hover:text-cpCoral/80 dark:hover:bg-cpCoral/10"
            >
              {t.viewAll} ({sortedPhotos.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 rounded-lg overflow-hidden">
          {/* Primary photo - larger on left */}
          <div
            className={cn(
              "relative cursor-pointer overflow-hidden",
              additionalPhotos.length > 0 ? "col-span-2 row-span-2" : "col-span-4 aspect-video"
            )}
            onClick={() => openLightbox(0)}
          >
            <div className={cn(
              "relative w-full h-full",
              additionalPhotos.length > 0 ? "aspect-square" : "aspect-video"
            )}>
              <Image
                src={primaryPhoto.url}
                alt={primaryPhoto.altText || `${placeName} - Primary photo`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Additional photos - grid on right */}
          {additionalPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative aspect-square cursor-pointer overflow-hidden"
              onClick={() => openLightbox(index + 1)}
            >
              <Image
                src={photo.url}
                alt={photo.altText || `${placeName} - Photo ${index + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Show "more photos" overlay on last visible photo */}
              {hasMorePhotos && index === additionalPhotos.length - 1 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    +{sortedPhotos.length - 5}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none"
          onKeyDown={handleKeyDown}
        >
          <div className="relative flex items-center justify-center min-h-[60vh]">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">{t.close}</span>
            </Button>

            {/* Previous button */}
            {sortedPhotos.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-10 text-white hover:bg-white/20"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {/* Current photo */}
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              <Image
                src={sortedPhotos[currentIndex].url}
                alt={sortedPhotos[currentIndex].altText || `${placeName} - Photo ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="95vw"
              />
            </div>

            {/* Next button */}
            {sortedPhotos.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-10 text-white hover:bg-white/20"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Photo counter and caption */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <Badge variant="secondary" className="mb-2">
                {t.photo} {currentIndex + 1} {t.of} {sortedPhotos.length}
              </Badge>
              {sortedPhotos[currentIndex].caption && (
                <p className="text-white text-sm mt-2 px-4">
                  {sortedPhotos[currentIndex].caption}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { useState, useCallback, useRef } from "react";
import { X, ImagePlus, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { REVIEW_PHOTO_CONFIG } from "@/lib/storage/reviewPhotos";

// ============================================================================
// TYPES
// ============================================================================

export interface PhotoPreview {
  id: string; // Unique local ID for this preview
  file: File;
  preview: string; // Object URL for preview
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  uploadedKey?: string; // Storage key after upload
}

interface PhotoUploaderProps {
  photos: PhotoPreview[];
  onPhotosChange: (photos: PhotoPreview[]) => void;
  maxPhotos?: number;
  disabled?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PhotoUploader({
  photos,
  onPhotosChange,
  maxPhotos = REVIEW_PHOTO_CONFIG.MAX_PHOTOS_PER_REVIEW,
  disabled = false,
}: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAddMore = photos.length < maxPhotos;

  // Generate unique ID for each photo
  const generateId = () => `photo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  // Validate a file
  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > REVIEW_PHOTO_CONFIG.MAX_FILE_SIZE) {
      return `File too large. Maximum size is ${REVIEW_PHOTO_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB`;
    }

    // Check MIME type
    if (
      !REVIEW_PHOTO_CONFIG.ALLOWED_MIME_TYPES.includes(
        file.type as (typeof REVIEW_PHOTO_CONFIG.ALLOWED_MIME_TYPES)[number]
      )
    ) {
      return `Invalid file type. Allowed: ${REVIEW_PHOTO_CONFIG.ALLOWED_MIME_TYPES.map((t) =>
        t.replace("image/", "")
      ).join(", ")}`;
    }

    return null;
  };

  // Handle file selection
  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const availableSlots = maxPhotos - photos.length;
      const filesToAdd = fileArray.slice(0, availableSlots);

      const newPhotos: PhotoPreview[] = filesToAdd.map((file) => {
        const error = validateFile(file);
        return {
          id: generateId(),
          file,
          preview: URL.createObjectURL(file),
          status: error ? "error" : "pending",
          error: error || undefined,
        };
      });

      onPhotosChange([...photos, ...newPhotos]);
    },
    [photos, maxPhotos, onPhotosChange]
  );

  // Remove a photo
  const removePhoto = useCallback(
    (id: string) => {
      const photo = photos.find((p) => p.id === id);
      if (photo) {
        // Revoke object URL to prevent memory leaks
        URL.revokeObjectURL(photo.preview);
      }
      onPhotosChange(photos.filter((p) => p.id !== id));
    },
    [photos, onPhotosChange]
  );

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled || !canAddMore) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [disabled, canAddMore, handleFiles]
  );

  // Click to select files
  const handleClick = () => {
    if (!disabled && canAddMore) {
      fileInputRef.current?.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // Reset input so same file can be selected again
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {/* Photo previews */}
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative w-20 h-20 rounded-lg overflow-hidden border bg-muted"
            >
              <Image
                src={photo.preview}
                alt="Review photo preview"
                fill
                className="object-cover"
              />

              {/* Status overlay */}
              {photo.status === "uploading" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                </div>
              )}

              {photo.status === "error" && (
                <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
              )}

              {photo.status === "success" && (
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              {/* Remove button */}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-5 w-5 rounded-full"
                onClick={() => removePhoto(photo.id)}
                disabled={photo.status === "uploading"}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove photo</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone / Add button */}
      {canAddMore && (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
            isDragging && "border-primary bg-primary/5",
            !isDragging && "border-muted-foreground/25 hover:border-primary/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={REVIEW_PHOTO_CONFIG.ALLOWED_MIME_TYPES.join(",")}
            multiple
            className="sr-only"
            onChange={handleFileInputChange}
            disabled={disabled}
          />

          <div className="flex flex-col items-center gap-2">
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium text-primary">Click to upload</span>{" "}
              <span className="text-muted-foreground">or drag and drop</span>
            </div>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, WebP up to {REVIEW_PHOTO_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB
            </p>
          </div>
        </div>
      )}

      {/* Photo count */}
      <p className="text-xs text-muted-foreground">
        {photos.length}/{maxPhotos} photos
        {photos.some((p) => p.status === "error") && (
          <span className="text-red-500 ml-2">
            {photos.filter((p) => p.status === "error").length} failed
          </span>
        )}
      </p>
    </div>
  );
}

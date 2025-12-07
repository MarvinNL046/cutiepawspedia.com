/**
 * Review Photos Configuration (Client-Safe)
 *
 * This file contains only the configuration constants for review photos.
 * It's safe to import in client components (no Node.js dependencies).
 */

export const REVIEW_PHOTO_CONFIG = {
  // Maximum file size in bytes (5MB)
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  // Maximum photos per review
  MAX_PHOTOS_PER_REVIEW: 5,
  // Allowed MIME types
  ALLOWED_MIME_TYPES: ["image/jpeg", "image/png", "image/webp"] as const,
  // Maximum dimensions (will be resized if larger)
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1920,
  // JPEG quality for compression
  JPEG_QUALITY: 85,
  // Storage path prefix
  STORAGE_PREFIX: "review_photos",
} as const;

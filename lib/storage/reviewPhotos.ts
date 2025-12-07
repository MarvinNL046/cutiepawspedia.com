/**
 * Review Photos Storage Utilities
 *
 * Specialized utilities for handling review photo uploads.
 * Includes validation, key generation, and image processing stubs.
 *
 * NOTE: For client components, import REVIEW_PHOTO_CONFIG from
 * "@/lib/storage/reviewPhotosConfig" instead to avoid Node.js dependencies.
 */

import { v4 as uuidv4 } from "uuid";
import { getStorage } from "./index";
import type { UploadResult } from "./types";
import { REVIEW_PHOTO_CONFIG } from "./reviewPhotosConfig";

// Re-export config for backwards compatibility
export { REVIEW_PHOTO_CONFIG } from "./reviewPhotosConfig";

// ============================================================================
// TYPES
// ============================================================================

export interface ReviewPhotoUploadInput {
  file: Buffer | Blob;
  mimeType: string;
  placeId: number;
  reviewId: number;
  userId: number;
}

export interface ReviewPhotoUploadResult extends UploadResult {
  storageKey: string;
}

export interface ValidationError {
  code: "FILE_TOO_LARGE" | "INVALID_MIME_TYPE" | "TOO_MANY_PHOTOS";
  message: string;
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate a file before upload
 */
export function validateReviewPhoto(
  file: Buffer | Blob,
  mimeType: string
): ValidationError | null {
  // Check file size
  const size = file instanceof Blob ? file.size : file.length;
  if (size > REVIEW_PHOTO_CONFIG.MAX_FILE_SIZE) {
    return {
      code: "FILE_TOO_LARGE",
      message: `File size exceeds ${REVIEW_PHOTO_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    };
  }

  // Check MIME type
  if (
    !REVIEW_PHOTO_CONFIG.ALLOWED_MIME_TYPES.includes(
      mimeType as (typeof REVIEW_PHOTO_CONFIG.ALLOWED_MIME_TYPES)[number]
    )
  ) {
    return {
      code: "INVALID_MIME_TYPE",
      message: `Invalid file type. Allowed: ${REVIEW_PHOTO_CONFIG.ALLOWED_MIME_TYPES.join(", ")}`,
    };
  }

  return null;
}

// ============================================================================
// KEY GENERATION
// ============================================================================

/**
 * Generate a unique storage key for a review photo
 * Format: review_photos/{placeId}/{reviewId}/{uuid}.{ext}
 */
export function generateStorageKey(
  placeId: number,
  reviewId: number,
  mimeType: string
): string {
  const uuid = uuidv4();
  const ext = getExtensionFromMimeType(mimeType);
  return `${REVIEW_PHOTO_CONFIG.STORAGE_PREFIX}/${placeId}/${reviewId}/${uuid}.${ext}`;
}

/**
 * Get file extension from MIME type
 */
function getExtensionFromMimeType(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  return map[mimeType] || "jpg";
}

// ============================================================================
// UPLOAD
// ============================================================================

/**
 * Upload a review photo
 */
export async function uploadReviewPhoto(
  input: ReviewPhotoUploadInput
): Promise<ReviewPhotoUploadResult> {
  const { file, mimeType, placeId, reviewId } = input;

  // Validate
  const validationError = validateReviewPhoto(file, mimeType);
  if (validationError) {
    throw new Error(validationError.message);
  }

  // Generate storage key
  const storageKey = generateStorageKey(placeId, reviewId, mimeType);

  // Get storage provider
  const storage = getStorage();

  // Convert Blob to Buffer if needed
  let buffer: Buffer;
  if (file instanceof Blob) {
    const arrayBuffer = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  } else {
    buffer = file;
  }

  // TODO: Image processing (resize, compress) - requires sharp
  // const processedBuffer = await processImage(buffer, mimeType);

  // Upload
  const result = await storage.upload(storageKey, buffer, {
    contentType: mimeType,
    cacheControl: "public, max-age=31536000, immutable",
    metadata: {
      placeId: String(placeId),
      reviewId: String(reviewId),
    },
  });

  return {
    ...result,
    storageKey,
  };
}

/**
 * Delete a review photo
 */
export async function deleteReviewPhoto(storageKey: string): Promise<void> {
  const storage = getStorage();
  await storage.delete(storageKey);
}

/**
 * Get public URL for a review photo
 */
export function getReviewPhotoUrl(storageKey: string): string {
  const storage = getStorage();
  return storage.getPublicUrl(storageKey);
}

// ============================================================================
// IMAGE PROCESSING (STUB)
// ============================================================================

/**
 * Process image (resize, compress)
 *
 * TODO: Implement with sharp when needed
 * npm install sharp @types/sharp
 */
// async function processImage(
//   buffer: Buffer,
//   mimeType: string
// ): Promise<Buffer> {
//   const sharp = (await import("sharp")).default;
//
//   let image = sharp(buffer);
//
//   // Resize if too large
//   const metadata = await image.metadata();
//   const { width, height } = metadata;
//
//   if (width && height) {
//     if (width > REVIEW_PHOTO_CONFIG.MAX_WIDTH || height > REVIEW_PHOTO_CONFIG.MAX_HEIGHT) {
//       image = image.resize(REVIEW_PHOTO_CONFIG.MAX_WIDTH, REVIEW_PHOTO_CONFIG.MAX_HEIGHT, {
//         fit: "inside",
//         withoutEnlargement: true,
//       });
//     }
//   }
//
//   // Convert to JPEG with compression
//   if (mimeType === "image/png" || mimeType === "image/webp") {
//     return image.jpeg({ quality: REVIEW_PHOTO_CONFIG.JPEG_QUALITY }).toBuffer();
//   }
//
//   return image.jpeg({ quality: REVIEW_PHOTO_CONFIG.JPEG_QUALITY }).toBuffer();
// }

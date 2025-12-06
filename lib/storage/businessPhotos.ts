/**
 * Business Photos Storage Utilities
 *
 * Specialized utilities for handling business photo uploads.
 * Photos are owned/uploaded by the business owner, separate from UGC review photos.
 * Photo limits are enforced based on subscription plan.
 */

import { v4 as uuidv4 } from "uuid";
import { getStorage } from "./index";
import type { UploadResult } from "./types";
import { type PlanKey, getPlanFeatures } from "@/lib/plans/config";

// ============================================================================
// CONSTANTS
// ============================================================================

export const BUSINESS_PHOTO_CONFIG = {
  // Maximum file size in bytes (10MB - higher for businesses)
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  // Allowed MIME types
  ALLOWED_MIME_TYPES: ["image/jpeg", "image/png", "image/webp"] as const,
  // Maximum dimensions (will be resized if larger)
  MAX_WIDTH: 2400,
  MAX_HEIGHT: 2400,
  // JPEG quality for compression
  JPEG_QUALITY: 90,
  // Storage path prefix
  STORAGE_PREFIX: "business_photos",
} as const;

// ============================================================================
// TYPES
// ============================================================================

export interface BusinessPhotoUploadInput {
  file: Buffer | Blob;
  mimeType: string;
  placeId: number;
  businessId: number;
  userId: number;
  altText?: string;
  caption?: string;
}

export interface BusinessPhotoUploadResult extends UploadResult {
  storageKey: string;
  width?: number;
  height?: number;
  sizeBytes: number;
}

export interface ValidationError {
  code:
    | "FILE_TOO_LARGE"
    | "INVALID_MIME_TYPE"
    | "TOO_MANY_PHOTOS"
    | "PLAN_LIMIT_EXCEEDED"
    | "NOT_AUTHORIZED";
  message: string;
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Get max photos allowed for a plan
 */
export function getMaxPhotosForPlan(planKey: PlanKey): number {
  return getPlanFeatures(planKey).maxPhotos;
}

/**
 * Validate a file before upload
 */
export function validateBusinessPhoto(
  file: Buffer | Blob,
  mimeType: string
): ValidationError | null {
  // Check file size
  const size = file instanceof Blob ? file.size : file.length;
  if (size > BUSINESS_PHOTO_CONFIG.MAX_FILE_SIZE) {
    return {
      code: "FILE_TOO_LARGE",
      message: `File size exceeds ${BUSINESS_PHOTO_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    };
  }

  // Check MIME type
  if (
    !BUSINESS_PHOTO_CONFIG.ALLOWED_MIME_TYPES.includes(
      mimeType as (typeof BUSINESS_PHOTO_CONFIG.ALLOWED_MIME_TYPES)[number]
    )
  ) {
    return {
      code: "INVALID_MIME_TYPE",
      message: `Invalid file type. Allowed: ${BUSINESS_PHOTO_CONFIG.ALLOWED_MIME_TYPES.join(", ")}`,
    };
  }

  return null;
}

/**
 * Validate photo count against plan limit
 */
export function validatePhotoCount(
  currentCount: number,
  planKey: PlanKey
): ValidationError | null {
  const maxPhotos = getMaxPhotosForPlan(planKey);

  if (maxPhotos === 0) {
    return {
      code: "PLAN_LIMIT_EXCEEDED",
      message: "Photo uploads are not available on the Free plan. Please upgrade to Starter or higher.",
    };
  }

  if (currentCount >= maxPhotos) {
    return {
      code: "TOO_MANY_PHOTOS",
      message: `Maximum ${maxPhotos} photos allowed on your plan. Please delete some photos or upgrade your plan.`,
    };
  }

  return null;
}

// ============================================================================
// KEY GENERATION
// ============================================================================

/**
 * Generate a unique storage key for a business photo
 * Format: business_photos/{businessId}/{placeId}/{uuid}.{ext}
 */
export function generateStorageKey(
  businessId: number,
  placeId: number,
  mimeType: string
): string {
  const uuid = uuidv4();
  const ext = getExtensionFromMimeType(mimeType);
  return `${BUSINESS_PHOTO_CONFIG.STORAGE_PREFIX}/${businessId}/${placeId}/${uuid}.${ext}`;
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
 * Upload a business photo
 */
export async function uploadBusinessPhoto(
  input: BusinessPhotoUploadInput
): Promise<BusinessPhotoUploadResult> {
  const { file, mimeType, placeId, businessId, userId } = input;

  // Validate file
  const validationError = validateBusinessPhoto(file, mimeType);
  if (validationError) {
    throw new Error(validationError.message);
  }

  // Generate storage key
  const storageKey = generateStorageKey(businessId, placeId, mimeType);

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

  // Get file size
  const sizeBytes = buffer.length;

  // TODO: Image processing (resize, compress) - requires sharp
  // const { buffer: processedBuffer, width, height } = await processImage(buffer, mimeType);

  // Upload
  const result = await storage.upload(storageKey, buffer, {
    contentType: mimeType,
    cacheControl: "public, max-age=31536000, immutable",
    metadata: {
      businessId: String(businessId),
      placeId: String(placeId),
      uploadedBy: String(userId),
    },
  });

  return {
    ...result,
    storageKey,
    sizeBytes,
  };
}

/**
 * Delete a business photo
 */
export async function deleteBusinessPhoto(storageKey: string): Promise<void> {
  const storage = getStorage();
  await storage.delete(storageKey);
}

/**
 * Get public URL for a business photo
 */
export function getBusinessPhotoUrl(storageKey: string): string {
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
// interface ProcessedImage {
//   buffer: Buffer;
//   width: number;
//   height: number;
// }
//
// async function processImage(
//   buffer: Buffer,
//   mimeType: string
// ): Promise<ProcessedImage> {
//   const sharp = (await import("sharp")).default;
//
//   let image = sharp(buffer);
//   const metadata = await image.metadata();
//   let { width, height } = metadata;
//
//   // Resize if too large
//   if (width && height) {
//     if (width > BUSINESS_PHOTO_CONFIG.MAX_WIDTH || height > BUSINESS_PHOTO_CONFIG.MAX_HEIGHT) {
//       image = image.resize(BUSINESS_PHOTO_CONFIG.MAX_WIDTH, BUSINESS_PHOTO_CONFIG.MAX_HEIGHT, {
//         fit: "inside",
//         withoutEnlargement: true,
//       });
//       const resized = await image.metadata();
//       width = resized.width;
//       height = resized.height;
//     }
//   }
//
//   // Convert to JPEG with compression
//   const processedBuffer = await image.jpeg({ quality: BUSINESS_PHOTO_CONFIG.JPEG_QUALITY }).toBuffer();
//
//   return {
//     buffer: processedBuffer,
//     width: width || 0,
//     height: height || 0,
//   };
// }

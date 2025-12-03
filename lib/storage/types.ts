/**
 * Storage Abstraction Types
 *
 * Generic storage interface to support multiple backends:
 * - Local filesystem (development)
 * - AWS S3 / S3-compatible (DigitalOcean Spaces, Cloudflare R2, etc.)
 * - Vercel Blob Storage
 */

export interface StorageFile {
  key: string; // Unique storage key (path-like)
  url: string; // Public URL to access the file
  size: number; // File size in bytes
  contentType: string; // MIME type
  metadata?: Record<string, string>; // Custom metadata
}

export interface UploadOptions {
  contentType: string;
  metadata?: Record<string, string>;
  cacheControl?: string;
  // For image uploads
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  contentType: string;
  width?: number;
  height?: number;
}

export interface StorageProvider {
  /**
   * Upload a file to storage
   * @param key - Storage key (path-like, e.g., "review_photos/123/uuid.jpg")
   * @param data - File data (Buffer, Blob, or base64 string)
   * @param options - Upload options
   */
  upload(
    key: string,
    data: Buffer | Blob | string,
    options: UploadOptions
  ): Promise<UploadResult>;

  /**
   * Delete a file from storage
   * @param key - Storage key
   */
  delete(key: string): Promise<void>;

  /**
   * Get a signed URL for temporary access (for private files)
   * @param key - Storage key
   * @param expiresIn - URL expiry time in seconds
   */
  getSignedUrl?(key: string, expiresIn: number): Promise<string>;

  /**
   * Get public URL for a file
   * @param key - Storage key
   */
  getPublicUrl(key: string): string;

  /**
   * Check if a file exists
   * @param key - Storage key
   */
  exists(key: string): Promise<boolean>;

  /**
   * List files with a prefix
   * @param prefix - Key prefix to filter by
   */
  list?(prefix: string): Promise<StorageFile[]>;
}

export type StorageProviderType = "local" | "s3" | "vercel";

export interface StorageConfig {
  provider: StorageProviderType;
  // Local filesystem options
  localPath?: string;
  localBaseUrl?: string;
  // S3 options
  s3Bucket?: string;
  s3Region?: string;
  s3Endpoint?: string; // For S3-compatible services
  s3AccessKeyId?: string;
  s3SecretAccessKey?: string;
  // Vercel options
  vercelBlobToken?: string;
  // CDN prefix (optional - for custom domains)
  cdnPrefix?: string;
}

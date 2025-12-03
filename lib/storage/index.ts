/**
 * Storage Factory
 *
 * Creates storage provider instances based on configuration.
 * Defaults to local storage in development, S3 in production.
 */

import { join } from "path";
import type { StorageProvider, StorageConfig, StorageProviderType } from "./types";
import { LocalStorageProvider } from "./providers/local";
import { S3StorageProvider } from "./providers/s3";

// Re-export types
export * from "./types";

// Default configuration from environment
const defaultConfig: StorageConfig = {
  provider: (process.env.STORAGE_PROVIDER as StorageProviderType) || "local",
  // Local
  localPath: process.env.STORAGE_LOCAL_PATH || join(process.cwd(), "public", "uploads"),
  localBaseUrl: process.env.STORAGE_LOCAL_URL || "/uploads",
  // S3
  s3Bucket: process.env.STORAGE_S3_BUCKET,
  s3Region: process.env.STORAGE_S3_REGION || "eu-central-1",
  s3Endpoint: process.env.STORAGE_S3_ENDPOINT,
  s3AccessKeyId: process.env.STORAGE_S3_ACCESS_KEY_ID,
  s3SecretAccessKey: process.env.STORAGE_S3_SECRET_ACCESS_KEY,
  // CDN
  cdnPrefix: process.env.STORAGE_CDN_PREFIX,
};

/**
 * Create a storage provider based on configuration
 */
export function createStorageProvider(config: Partial<StorageConfig> = {}): StorageProvider {
  const mergedConfig = { ...defaultConfig, ...config };

  switch (mergedConfig.provider) {
    case "local":
      return new LocalStorageProvider({
        basePath: mergedConfig.localPath!,
        baseUrl: mergedConfig.localBaseUrl!,
      });

    case "s3":
      if (!mergedConfig.s3Bucket || !mergedConfig.s3AccessKeyId || !mergedConfig.s3SecretAccessKey) {
        throw new Error("S3 storage requires bucket, accessKeyId, and secretAccessKey");
      }
      return new S3StorageProvider({
        bucket: mergedConfig.s3Bucket,
        region: mergedConfig.s3Region!,
        endpoint: mergedConfig.s3Endpoint,
        accessKeyId: mergedConfig.s3AccessKeyId,
        secretAccessKey: mergedConfig.s3SecretAccessKey,
        cdnPrefix: mergedConfig.cdnPrefix,
      });

    case "vercel":
      // TODO: Implement Vercel Blob Storage provider
      throw new Error("Vercel Blob storage not yet implemented");

    default:
      throw new Error(`Unknown storage provider: ${mergedConfig.provider}`);
  }
}

// Singleton instance for convenience
let _storageInstance: StorageProvider | null = null;

/**
 * Get the default storage provider instance
 */
export function getStorage(): StorageProvider {
  if (!_storageInstance) {
    _storageInstance = createStorageProvider();
  }
  return _storageInstance;
}

/**
 * Reset the storage instance (useful for testing)
 */
export function resetStorage(): void {
  _storageInstance = null;
}

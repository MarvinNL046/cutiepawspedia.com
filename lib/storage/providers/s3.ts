/**
 * S3-Compatible Storage Provider
 *
 * Works with:
 * - AWS S3
 * - DigitalOcean Spaces
 * - Cloudflare R2
 * - MinIO
 * - Any S3-compatible storage
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { StorageProvider, UploadOptions, UploadResult, StorageFile } from "../types";

export interface S3StorageOptions {
  bucket: string;
  region: string;
  endpoint?: string; // Custom endpoint for S3-compatible services
  accessKeyId: string;
  secretAccessKey: string;
  cdnPrefix?: string; // Optional CDN URL prefix
}

export class S3StorageProvider implements StorageProvider {
  private bucket: string;
  private region: string;
  private endpoint?: string;
  private cdnPrefix?: string;
  private client: S3Client;

  constructor(options: S3StorageOptions) {
    this.bucket = options.bucket;
    this.region = options.region;
    this.endpoint = options.endpoint;
    this.cdnPrefix = options.cdnPrefix;

    // Initialize S3 client
    this.client = new S3Client({
      region: options.region,
      endpoint: options.endpoint,
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
      // For Cloudflare R2, we need to force path style
      forcePathStyle: !!options.endpoint,
    });
  }

  async upload(
    key: string,
    data: Buffer | Blob | string,
    options: UploadOptions
  ): Promise<UploadResult> {
    // Convert data to Buffer
    let buffer: Buffer;
    if (Buffer.isBuffer(data)) {
      buffer = data;
    } else if (typeof data === "string") {
      // Assume base64 encoded string
      buffer = Buffer.from(data, "base64");
    } else if (data instanceof Blob) {
      const arrayBuffer = await data.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      throw new Error("Unsupported data type for upload");
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: options.contentType,
      CacheControl: options.cacheControl || "public, max-age=31536000",
      Metadata: options.metadata,
    });

    await this.client.send(command);

    return {
      key,
      url: this.getPublicUrl(key),
      size: buffer.length,
      contentType: options.contentType,
    };
  }

  async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.client.send(command);
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return await getSignedUrl(this.client, command, { expiresIn });
  }

  getPublicUrl(key: string): string {
    if (this.cdnPrefix) {
      // Use CDN URL (e.g., https://cdn.cutiepawspedia.com)
      return `${this.cdnPrefix}/${key}`;
    }

    if (this.endpoint) {
      // Cloudflare R2 and other S3-compatible services
      // For R2 with public bucket, use the public URL format
      // The endpoint is typically https://<account_id>.r2.cloudflarestorage.com
      // But public URLs are https://pub-<hash>.r2.dev/<key> or custom domain

      // If endpoint contains r2.cloudflarestorage.com, it's private API endpoint
      // We need to use a different public URL or CDN
      if (this.endpoint.includes("r2.cloudflarestorage.com")) {
        // For R2, the public URL should be configured via cdnPrefix
        // Fall back to endpoint-based URL (won't work for public access without cdnPrefix)
        console.warn("R2 storage: No cdnPrefix configured. Public URLs may not work. Set STORAGE_CDN_PREFIX.");
        return `${this.endpoint}/${this.bucket}/${key}`;
      }

      // Other S3-compatible services (DigitalOcean Spaces, MinIO, etc.)
      return `${this.endpoint}/${this.bucket}/${key}`;
    }

    // Standard AWS S3
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  async exists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      await this.client.send(command);
      return true;
    } catch (error: unknown) {
      // Check if it's a "not found" error
      if (error && typeof error === "object" && "name" in error) {
        const errorName = (error as { name: string }).name;
        if (errorName === "NotFound" || errorName === "NoSuchKey") {
          return false;
        }
      }
      throw error;
    }
  }

  async list(prefix: string): Promise<StorageFile[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: prefix,
    });

    const response = await this.client.send(command);

    return (
      response.Contents?.map((obj) => ({
        key: obj.Key!,
        url: this.getPublicUrl(obj.Key!),
        size: obj.Size!,
        contentType: "application/octet-stream", // S3 list doesn't return content type
      })) || []
    );
  }
}

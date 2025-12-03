/**
 * Local Filesystem Storage Provider
 *
 * For development and testing. Stores files in the public directory.
 * NOT recommended for production - use S3/Vercel/Netlify instead.
 */

import { existsSync, mkdirSync, writeFileSync, unlinkSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import type { StorageProvider, UploadOptions, UploadResult, StorageFile } from "../types";

export interface LocalStorageOptions {
  basePath: string; // Absolute path to storage directory (e.g., /app/public/uploads)
  baseUrl: string; // Base URL for public access (e.g., /uploads or https://cdn.example.com/uploads)
}

export class LocalStorageProvider implements StorageProvider {
  private basePath: string;
  private baseUrl: string;

  constructor(options: LocalStorageOptions) {
    this.basePath = options.basePath;
    this.baseUrl = options.baseUrl.replace(/\/$/, ""); // Remove trailing slash

    // Ensure base directory exists
    if (!existsSync(this.basePath)) {
      mkdirSync(this.basePath, { recursive: true });
    }
  }

  async upload(
    key: string,
    data: Buffer | Blob | string,
    options: UploadOptions
  ): Promise<UploadResult> {
    const filePath = join(this.basePath, key);
    const dirPath = dirname(filePath);

    // Ensure directory exists
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    // Convert data to Buffer
    let buffer: Buffer;
    if (Buffer.isBuffer(data)) {
      buffer = data;
    } else if (data instanceof Blob) {
      const arrayBuffer = await data.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else if (typeof data === "string") {
      // Assume base64
      buffer = Buffer.from(data, "base64");
    } else {
      throw new Error("Unsupported data type");
    }

    // Write file
    writeFileSync(filePath, buffer);

    return {
      key,
      url: this.getPublicUrl(key),
      size: buffer.length,
      contentType: options.contentType,
    };
  }

  async delete(key: string): Promise<void> {
    const filePath = join(this.basePath, key);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  getPublicUrl(key: string): string {
    return `${this.baseUrl}/${key}`;
  }

  async exists(key: string): Promise<boolean> {
    const filePath = join(this.basePath, key);
    return existsSync(filePath);
  }

  async list(prefix: string): Promise<StorageFile[]> {
    const dirPath = join(this.basePath, prefix);
    if (!existsSync(dirPath)) {
      return [];
    }

    const files: StorageFile[] = [];
    const entries = readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isFile()) {
        const key = join(prefix, entry.name);
        const filePath = join(this.basePath, key);
        const stats = statSync(filePath);

        files.push({
          key,
          url: this.getPublicUrl(key),
          size: stats.size,
          contentType: this.guessContentType(entry.name),
        });
      }
    }

    return files;
  }

  private guessContentType(filename: string): string {
    const ext = filename.split(".").pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      svg: "image/svg+xml",
      pdf: "application/pdf",
    };
    return mimeTypes[ext || ""] || "application/octet-stream";
  }
}

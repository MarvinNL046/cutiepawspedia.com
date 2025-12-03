/**
 * JSON File IO Helper
 *
 * Provides type-safe read/write operations for JSON files with:
 * - Automatic directory creation
 * - Pretty-printed output
 * - Error handling
 */

import * as fs from "fs/promises";
import * as path from "path";

/**
 * Read and parse a JSON file
 * @param filePath - Absolute or relative file path
 * @returns Parsed JSON data or null if file doesn't exist or is invalid
 */
export async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // File doesn't exist - this is expected in many cases
      return null;
    }
    // Log other errors (permission issues, invalid JSON, etc.)
    console.error(`Error reading JSON file ${filePath}:`, error);
    return null;
  }
}

/**
 * Write data to a JSON file
 * Creates parent directories if they don't exist
 * @param filePath - Absolute or relative file path
 * @param data - Data to write (will be serialized to JSON)
 */
export async function writeJson(filePath: string, data: unknown): Promise<void> {
  // Ensure parent directory exists
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  // Write with pretty formatting (2 spaces)
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, content, "utf-8");
}

/**
 * Check if a JSON file exists
 * @param filePath - File path to check
 * @returns true if file exists and is readable
 */
export async function jsonExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Append an item to a JSON array file
 * Creates the file with an empty array if it doesn't exist
 * @param filePath - File path
 * @param item - Item to append
 */
export async function appendToJsonArray<T>(
  filePath: string,
  item: T
): Promise<void> {
  const existing = await readJson<T[]>(filePath);
  const array = existing ?? [];
  array.push(item);
  await writeJson(filePath, array);
}

/**
 * Update a specific field in a JSON object file
 * Creates the file if it doesn't exist
 * @param filePath - File path
 * @param updates - Partial object with fields to update
 */
export async function updateJsonFields<T extends Record<string, unknown>>(
  filePath: string,
  updates: Partial<T>
): Promise<T> {
  const existing = await readJson<T>(filePath);
  const merged = { ...existing, ...updates } as T;
  await writeJson(filePath, merged);
  return merged;
}

/**
 * Delete a JSON file if it exists
 * @param filePath - File path to delete
 * @returns true if file was deleted, false if it didn't exist
 */
export async function deleteJson(filePath: string): Promise<boolean> {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

/**
 * Get file stats for a JSON file
 * @param filePath - File path
 * @returns File stats or null if file doesn't exist
 */
export async function getJsonStats(
  filePath: string
): Promise<{ size: number; modifiedAt: Date } | null> {
  try {
    const stats = await fs.stat(filePath);
    return {
      size: stats.size,
      modifiedAt: stats.mtime,
    };
  } catch {
    return null;
  }
}

/**
 * Read multiple JSON files in parallel
 * @param filePaths - Array of file paths
 * @returns Map of file path to parsed data (null for missing/invalid files)
 */
export async function readJsonBatch<T>(
  filePaths: string[]
): Promise<Map<string, T | null>> {
  const results = await Promise.all(
    filePaths.map(async (fp) => ({
      path: fp,
      data: await readJson<T>(fp),
    }))
  );

  return new Map(results.map((r) => [r.path, r.data]));
}

/**
 * Write multiple JSON files in parallel
 * @param files - Array of { path, data } objects
 */
export async function writeJsonBatch(
  files: Array<{ path: string; data: unknown }>
): Promise<void> {
  await Promise.all(files.map((f) => writeJson(f.path, f.data)));
}

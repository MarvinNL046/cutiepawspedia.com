#!/usr/bin/env npx tsx
/**
 * Check slugs for a specific business
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { neon } from "@neondatabase/serverless";

function loadEnvFromFile(envPath: string): void {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex);
        let value = trimmed.slice(eqIndex + 1);
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnvFromFile(path.join(process.cwd(), ".env"));
loadEnvFromFile(path.join(process.cwd(), ".env.local"));

const searchTerm = process.argv[2] || "maxi zoo";

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  const rows = await sql`
    SELECT p.slug, p.name, p.address, c.name as city
    FROM places p
    JOIN cities c ON p.city_id = c.id
    WHERE p.name ILIKE ${'%' + searchTerm + '%'}
    ORDER BY c.name, p.slug
  `;

  console.log(`\nResults for "${searchTerm}":`);
  console.log("=".repeat(80));
  rows.forEach(r => console.log(`${r.city.padEnd(20)} ${r.slug.padEnd(35)} ${r.address || '(no address)'}`));
  console.log("=".repeat(80));
  console.log(`Total: ${rows.length}`);
}

main().catch(console.error);

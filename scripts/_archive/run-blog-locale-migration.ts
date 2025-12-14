/**
 * Run Blog Locale Migration
 *
 * Adds DE and FR locale fields to blog tables (categories, tags, posts)
 */

import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
  override: true,
});

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function runMigration() {
  console.log("🌐 Running blog DE/FR locale migration...\n");

  // Blog Categories - Add DE/FR fields
  console.log("📁 Adding DE/FR fields to blog_categories...");
  await sql`
    ALTER TABLE "blog_categories"
    ADD COLUMN IF NOT EXISTS "name_de" varchar(100),
    ADD COLUMN IF NOT EXISTS "name_fr" varchar(100),
    ADD COLUMN IF NOT EXISTS "description_de" text,
    ADD COLUMN IF NOT EXISTS "description_fr" text,
    ADD COLUMN IF NOT EXISTS "meta_title_de" varchar(60),
    ADD COLUMN IF NOT EXISTS "meta_title_fr" varchar(60),
    ADD COLUMN IF NOT EXISTS "meta_description_de" varchar(160),
    ADD COLUMN IF NOT EXISTS "meta_description_fr" varchar(160)
  `;
  console.log("✅ blog_categories updated\n");

  // Blog Tags - Add DE/FR fields
  console.log("🏷️ Adding DE/FR fields to blog_tags...");
  await sql`
    ALTER TABLE "blog_tags"
    ADD COLUMN IF NOT EXISTS "name_de" varchar(100),
    ADD COLUMN IF NOT EXISTS "name_fr" varchar(100)
  `;
  console.log("✅ blog_tags updated\n");

  // Blog Posts - Add DE/FR fields
  console.log("📝 Adding DE/FR fields to blog_posts...");
  await sql`
    ALTER TABLE "blog_posts"
    ADD COLUMN IF NOT EXISTS "title_de" varchar(255),
    ADD COLUMN IF NOT EXISTS "title_fr" varchar(255),
    ADD COLUMN IF NOT EXISTS "excerpt_de" text,
    ADD COLUMN IF NOT EXISTS "excerpt_fr" text,
    ADD COLUMN IF NOT EXISTS "content_de" text,
    ADD COLUMN IF NOT EXISTS "content_fr" text,
    ADD COLUMN IF NOT EXISTS "meta_title_de" varchar(60),
    ADD COLUMN IF NOT EXISTS "meta_title_fr" varchar(60),
    ADD COLUMN IF NOT EXISTS "meta_description_de" varchar(160),
    ADD COLUMN IF NOT EXISTS "meta_description_fr" varchar(160)
  `;
  console.log("✅ blog_posts updated\n");

  console.log("✅ Migration complete!");
}

runMigration().catch(console.error);

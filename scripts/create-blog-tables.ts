#!/usr/bin/env npx tsx
/**
 * Create Blog Tables
 *
 * Creates the blog database tables directly via SQL.
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

async function main() {
  console.log("🚀 Creating blog tables...\n");

  // Create enum
  console.log("Creating blog_post_status enum...");
  await sql`
    DO $$ BEGIN
      CREATE TYPE blog_post_status AS ENUM ('draft', 'published', 'archived');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `;

  // Create blog_categories table
  console.log("Creating blog_categories table...");
  await sql`
    CREATE TABLE IF NOT EXISTS blog_categories (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      name_en VARCHAR(100) NOT NULL,
      name_nl VARCHAR(100),
      description_en TEXT,
      description_nl TEXT,
      icon VARCHAR(50),
      color VARCHAR(20),
      sort_order INTEGER DEFAULT 0 NOT NULL,
      is_active BOOLEAN DEFAULT true NOT NULL,
      meta_title_en VARCHAR(60),
      meta_title_nl VARCHAR(60),
      meta_description_en VARCHAR(160),
      meta_description_nl VARCHAR(160),
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  // Create blog_tags table
  console.log("Creating blog_tags table...");
  await sql`
    CREATE TABLE IF NOT EXISTS blog_tags (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      name_en VARCHAR(100) NOT NULL,
      name_nl VARCHAR(100),
      post_count INTEGER DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  // Create blog_posts table
  console.log("Creating blog_posts table...");
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      author_name VARCHAR(100),
      category_id INTEGER REFERENCES blog_categories(id) ON DELETE SET NULL,
      status blog_post_status DEFAULT 'draft' NOT NULL,
      featured_image VARCHAR(500),
      featured_image_alt VARCHAR(255),
      title_en VARCHAR(255) NOT NULL,
      excerpt_en TEXT,
      content_en TEXT NOT NULL,
      title_nl VARCHAR(255),
      excerpt_nl TEXT,
      content_nl TEXT,
      meta_title_en VARCHAR(60),
      meta_description_en VARCHAR(160),
      meta_title_nl VARCHAR(60),
      meta_description_nl VARCHAR(160),
      reading_time_minutes INTEGER DEFAULT 5,
      view_count INTEGER DEFAULT 0 NOT NULL,
      published_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  // Create blog_post_tags junction table
  console.log("Creating blog_post_tags table...");
  await sql`
    CREATE TABLE IF NOT EXISTS blog_post_tags (
      post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
      tag_id INTEGER NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
      PRIMARY KEY (post_id, tag_id)
    )
  `;

  // Create indexes
  console.log("Creating indexes...");
  await sql`CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug)`;
  await sql`CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status)`;
  await sql`CREATE INDEX IF NOT EXISTS blog_posts_category_id_idx ON blog_posts(category_id)`;
  await sql`CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at)`;
  await sql`CREATE INDEX IF NOT EXISTS blog_posts_author_id_idx ON blog_posts(author_id)`;
  await sql`CREATE INDEX IF NOT EXISTS blog_post_tags_tag_id_idx ON blog_post_tags(tag_id)`;

  console.log("\n✅ Blog tables created successfully!");

  // Show tables
  const tables = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name LIKE 'blog%'
    ORDER BY table_name
  `;
  console.log("\nBlog tables in database:");
  tables.forEach((t: { table_name: string }) => console.log(`  - ${t.table_name}`));
}

main().catch(console.error);

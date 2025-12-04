/**
 * Add missing database columns for reviews table
 * Run with: npx tsx scripts/add-missing-columns.ts
 */
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  console.log("Adding missing columns to reviews table...\n");

  // Create the review_status enum if it doesn't exist
  try {
    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'review_status') THEN
          CREATE TYPE review_status AS ENUM('pending', 'published', 'rejected', 'flagged');
        END IF;
      END $$
    `;
    console.log("✅ review_status enum ready");
  } catch (e) {
    console.log("⚠️ review_status enum:", (e as Error).message);
  }

  // All columns that should exist in reviews table based on schema
  const columnsToAdd = [
    { name: "business_id", type: "integer" },
    { name: "title", type: "varchar(255)" },
    { name: "body", type: "text" },
    { name: "locale", type: "varchar(10) DEFAULT 'en' NOT NULL" },
    { name: "status", type: "review_status DEFAULT 'pending' NOT NULL" },
    { name: "is_featured", type: "boolean DEFAULT false NOT NULL" },
    { name: "visit_date", type: "date" },
    { name: "ip_hash", type: "varchar(64)" },
    { name: "updated_at", type: "timestamp DEFAULT now() NOT NULL" },
  ];

  for (const col of columnsToAdd) {
    try {
      await sql.query(`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}`);
      console.log(`✅ Added ${col.name} column`);
    } catch (e) {
      console.log(`⚠️ ${col.name}:`, (e as Error).message);
    }
  }

  // Migrate existing comment data to body column if needed
  try {
    await sql`UPDATE reviews SET body = COALESCE(comment, '') WHERE body IS NULL`;
    console.log("✅ Migrated comment data to body");
  } catch (e) {
    console.log("⚠️ comment migration:", (e as Error).message);
  }

  // Add foreign key constraint for business_id
  try {
    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'reviews_business_id_businesses_id_fk'
        ) THEN
          ALTER TABLE reviews ADD CONSTRAINT reviews_business_id_businesses_id_fk
          FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE SET NULL;
        END IF;
      END $$
    `;
    console.log("✅ Added business_id foreign key");
  } catch (e) {
    console.log("⚠️ FK constraint:", (e as Error).message);
  }

  // Add last_review_at to places table
  try {
    await sql`ALTER TABLE places ADD COLUMN IF NOT EXISTS last_review_at timestamp`;
    console.log("✅ Added last_review_at to places");
  } catch (e) {
    console.log("⚠️ last_review_at:", (e as Error).message);
  }

  // Create indexes
  const indexes = [
    "CREATE INDEX IF NOT EXISTS reviews_business_id_idx ON reviews(business_id)",
    "CREATE INDEX IF NOT EXISTS reviews_status_idx ON reviews(status)",
  ];

  for (const idx of indexes) {
    try {
      await sql.query(idx);
      console.log(`✅ ${idx.includes("business_id") ? "business_id" : "status"} index ready`);
    } catch (e) {
      console.log(`⚠️ index:`, (e as Error).message);
    }
  }

  // Verify columns exist
  const columns = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'reviews'
    ORDER BY ordinal_position
  `;

  console.log("\n📋 Current reviews table columns:");
  columns.forEach(c => console.log(`   - ${c.column_name}`));

  console.log("\n✅ Done!");
}

main().catch(console.error);

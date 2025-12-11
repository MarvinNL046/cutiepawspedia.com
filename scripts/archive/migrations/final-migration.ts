import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config();

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log("🚀 Running D1 migration with template literals...\n");

  // Check existing columns
  const existingCols = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'places'
  `;
  const colNames = existingCols.map(c => c.column_name);
  console.log(`Existing columns: ${colNames.length}`);

  // Add columns one by one using template literals
  if (!colNames.includes('data_quality_score')) {
    console.log("Adding data_quality_score...");
    await sql`ALTER TABLE places ADD COLUMN data_quality_score INTEGER DEFAULT 0`;
    console.log("✅ data_quality_score added");
  } else {
    console.log("⏭️ data_quality_score exists");
  }

  if (!colNames.includes('data_quality_flags')) {
    console.log("Adding data_quality_flags...");
    await sql`ALTER TABLE places ADD COLUMN data_quality_flags JSONB`;
    console.log("✅ data_quality_flags added");
  } else {
    console.log("⏭️ data_quality_flags exists");
  }

  if (!colNames.includes('last_refreshed_at')) {
    console.log("Adding last_refreshed_at...");
    await sql`ALTER TABLE places ADD COLUMN last_refreshed_at TIMESTAMP`;
    console.log("✅ last_refreshed_at added");
  } else {
    console.log("⏭️ last_refreshed_at exists");
  }

  if (!colNames.includes('status')) {
    console.log("Adding status...");
    // First make sure enum exists
    try {
      await sql`CREATE TYPE place_status AS ENUM ('active', 'temporarily_closed', 'permanently_closed', 'unknown')`;
    } catch (e) {
      // Enum probably already exists
    }
    await sql`ALTER TABLE places ADD COLUMN status place_status DEFAULT 'active'`;
    console.log("✅ status added");
  } else {
    console.log("⏭️ status exists");
  }

  if (!colNames.includes('status_last_checked_at')) {
    console.log("Adding status_last_checked_at...");
    await sql`ALTER TABLE places ADD COLUMN status_last_checked_at TIMESTAMP`;
    console.log("✅ status_last_checked_at added");
  } else {
    console.log("⏭️ status_last_checked_at exists");
  }

  // Add indexes
  console.log("\n📋 Adding indexes...");
  try { await sql`CREATE INDEX places_data_quality_score_idx ON places(data_quality_score)`; console.log("✅ places_data_quality_score_idx"); } catch(e) { console.log("⏭️ places_data_quality_score_idx exists"); }
  try { await sql`CREATE INDEX places_status_idx ON places(status)`; console.log("✅ places_status_idx"); } catch(e) { console.log("⏭️ places_status_idx exists"); }
  try { await sql`CREATE INDEX places_last_refreshed_at_idx ON places(last_refreshed_at)`; console.log("✅ places_last_refreshed_at_idx"); } catch(e) { console.log("⏭️ places_last_refreshed_at_idx exists"); }
  try { await sql`CREATE INDEX place_refresh_jobs_place_id_idx ON place_refresh_jobs(place_id)`; console.log("✅ place_refresh_jobs_place_id_idx"); } catch(e) { console.log("⏭️ place_refresh_jobs_place_id_idx exists"); }
  try { await sql`CREATE INDEX place_refresh_jobs_status_idx ON place_refresh_jobs(status)`; console.log("✅ place_refresh_jobs_status_idx"); } catch(e) { console.log("⏭️ place_refresh_jobs_status_idx exists"); }

  // Verify
  console.log("\n🔍 Final verification...");
  const newCols = await sql`
    SELECT column_name, data_type FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'places'
    AND column_name IN ('data_quality_score', 'data_quality_flags', 'last_refreshed_at', 'status', 'status_last_checked_at')
    ORDER BY column_name
  `;

  console.log("\nD1 columns verified:");
  for (const c of newCols) {
    console.log(`   ✅ ${c.column_name}: ${c.data_type}`);
  }

  // Test query
  console.log("\n📊 Testing data query...");
  const sample = await sql`SELECT id, name, data_quality_score, status FROM places LIMIT 3`;
  console.log("Sample data:", JSON.stringify(sample, null, 2));

  console.log("\n✅ Migration complete!\n");
}

migrate().catch(console.error);

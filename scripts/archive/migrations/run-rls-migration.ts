import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config();

const sql = neon(process.env.DATABASE_URL as string);

async function runMigration() {
  console.log("🚀 Running RLS context migration...\n");

  // Create helper functions using template literals
  try {
    await sql`
      CREATE OR REPLACE FUNCTION app_user_id()
      RETURNS integer
      LANGUAGE sql
      STABLE
      AS $$
        SELECT NULLIF(current_setting('app.user_id', true), '')::integer;
      $$
    `;
    console.log("✅ Created function: app_user_id");
  } catch (e: any) {
    console.error("❌ Error creating app_user_id:", e.message);
  }

  try {
    await sql`
      CREATE OR REPLACE FUNCTION app_user_role()
      RETURNS text
      LANGUAGE sql
      STABLE
      AS $$
        SELECT NULLIF(current_setting('app.user_role', true), '');
      $$
    `;
    console.log("✅ Created function: app_user_role");
  } catch (e: any) {
    console.error("❌ Error creating app_user_role:", e.message);
  }

  try {
    await sql`
      CREATE OR REPLACE FUNCTION app_business_id()
      RETURNS integer
      LANGUAGE sql
      STABLE
      AS $$
        SELECT NULLIF(current_setting('app.business_id', true), '')::integer;
      $$
    `;
    console.log("✅ Created function: app_business_id");
  } catch (e: any) {
    console.error("❌ Error creating app_business_id:", e.message);
  }

  try {
    await sql`
      CREATE OR REPLACE FUNCTION is_admin()
      RETURNS boolean
      LANGUAGE sql
      STABLE
      AS $$
        SELECT current_setting('app.user_role', true) = 'admin';
      $$
    `;
    console.log("✅ Created function: is_admin");
  } catch (e: any) {
    console.error("❌ Error creating is_admin:", e.message);
  }

  try {
    await sql`
      CREATE OR REPLACE FUNCTION is_authenticated()
      RETURNS boolean
      LANGUAGE sql
      STABLE
      AS $$
        SELECT NULLIF(current_setting('app.user_id', true), '') IS NOT NULL;
      $$
    `;
    console.log("✅ Created function: is_authenticated");
  } catch (e: any) {
    console.error("❌ Error creating is_authenticated:", e.message);
  }

  // Verify functions exist
  console.log("\n📋 Verifying functions...");
  const result = await sql`
    SELECT routine_name FROM information_schema.routines
    WHERE routine_schema = 'public'
    AND routine_name IN ('app_user_id', 'app_user_role', 'app_business_id', 'is_admin', 'is_authenticated')
    ORDER BY routine_name
  `;

  console.log(
    "Functions in database:",
    result.map((r) => r.routine_name).join(", ")
  );

  // Test the functions
  console.log("\n🧪 Testing functions...");

  // Test with context set
  await sql`SELECT set_config('app.user_id', '123', false)`;
  await sql`SELECT set_config('app.user_role', 'admin', false)`;
  await sql`SELECT set_config('app.business_id', '456', false)`;

  const testResult = await sql`
    SELECT
      app_user_id() as user_id,
      app_user_role() as role,
      app_business_id() as business_id,
      is_admin() as is_admin,
      is_authenticated() as is_authenticated
  `;

  console.log("Test result with context:", testResult[0]);

  // Test empty context (each call is a new connection, so context is already reset)
  const emptyResult = await sql`
    SELECT
      app_user_id() as user_id,
      app_user_role() as role,
      app_business_id() as business_id,
      is_admin() as is_admin,
      is_authenticated() as is_authenticated
  `;

  console.log("Result without context:", emptyResult[0]);

  console.log("\n✅ RLS context migration complete!");
}

runMigration().catch(console.error);

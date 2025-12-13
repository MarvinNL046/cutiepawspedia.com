require("dotenv").config();

const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function testConnection() {
  console.log("Testing Neon database connection...\n");

  try {
    const start = Date.now();
    const result = await sql`SELECT version()`;
    const duration = Date.now() - start;

    console.log("✅ Connection successful!");
    console.log(`⏱️  Response time: ${duration}ms`);
    console.log(`📦 PostgreSQL: ${result[0].version.split(' ').slice(0, 2).join(' ')}`);

    // Test a simple query
    const countResult = await sql`SELECT COUNT(*) as count FROM places`;
    console.log(`📊 Total places in database: ${countResult[0].count}`);

  } catch (error) {
    console.error("❌ Connection failed!");
    console.error(`Error: ${error.message}`);
    if (error.code) console.error(`Code: ${error.code}`);
  }
}

testConnection();

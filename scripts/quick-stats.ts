import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config({ override: true });

const sql = neon(process.env.DATABASE_URL as string);

async function main() {
  const stats = await sql`
    SELECT
      COUNT(*)::int as total,
      COUNT(CASE WHEN lat IS NOT NULL THEN 1 END)::int as with_coords,
      COUNT(CASE WHEN scraped_content->>'aboutUs' IS NOT NULL THEN 1 END)::int as with_content,
      COUNT(CASE WHEN scraped_content->>'coordinatesEnrichedAt' IS NOT NULL THEN 1 END)::int as coords_script,
      COUNT(CASE WHEN phone IS NOT NULL AND phone != '' THEN 1 END)::int as with_phone
    FROM places
  `;
  const s = stats[0] as any;
  const total = s.total;

  console.log("╔══════════════════════════════════════════╗");
  console.log("║      CUTIEPAWSPEDIA DATABASE STATS       ║");
  console.log("╠══════════════════════════════════════════╣");
  console.log(`║ Total places:        ${String(total).padStart(6)}             ║`);
  console.log("╠══════════════════════════════════════════╣");
  console.log(`║ With coordinates:    ${String(s.with_coords).padStart(6)} (${(s.with_coords/total*100).toFixed(1).padStart(5)}%)   ║`);
  console.log(`║   └─ Via coord script: ${String(s.coords_script).padStart(5)}            ║`);
  console.log(`║ With content:        ${String(s.with_content).padStart(6)} (${(s.with_content/total*100).toFixed(1).padStart(5)}%)   ║`);
  console.log(`║ With phone:          ${String(s.with_phone).padStart(6)} (${(s.with_phone/total*100).toFixed(1).padStart(5)}%)   ║`);
  console.log("╚══════════════════════════════════════════╝");
}

main().catch(console.error);

/**
 * Script to sync is_premium status for all businesses based on their plans
 *
 * Run with: npx tsx scripts/sync-premium-status.ts
 *
 * PRO and ELITE plans get is_premium = true
 * FREE and STARTER plans get is_premium = false
 */

import "dotenv/config";
import { syncAllPremiumStatuses } from "../lib/plans/syncPremiumStatus";

async function main() {
  console.log("Starting premium status sync for all businesses...\n");

  const result = await syncAllPremiumStatuses();

  if (result.success) {
    console.log("\n✅ Sync completed successfully!");
    console.log(`   Businesses processed: ${result.businessesProcessed}`);
    console.log(`   Total places updated: ${result.totalPlacesUpdated}`);
  } else {
    console.error("\n❌ Sync failed!");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Script error:", error);
  process.exit(1);
});

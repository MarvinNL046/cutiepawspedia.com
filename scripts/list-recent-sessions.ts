/**
 * List recent Stripe checkout sessions
 */

import Stripe from "stripe";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local", override: true });
if (!process.env.STRIPE_SECRET_KEY) {
  dotenv.config({ path: ".env" });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-11-17.clover" });

async function listSessions() {
  console.log("\n📋 Recent Stripe checkout sessions:\n");

  const sessions = await stripe.checkout.sessions.list({
    limit: 10,
  });

  for (const session of sessions.data) {
    const created = new Date(session.created * 1000).toLocaleString();
    console.log(`ID: ${session.id}`);
    console.log(`  Created: ${created}`);
    console.log(`  Status: ${session.payment_status}`);
    console.log(`  Email: ${session.customer_email || session.customer_details?.email || "N/A"}`);
    console.log(`  Type: ${session.metadata?.type || "unknown"}`);
    console.log(`  Business: ${session.metadata?.businessName || "N/A"}`);
    console.log("");
  }
}

listSessions();

/**
 * Debug SERP API response - using local search (tbm=lcl)
 */

import "dotenv/config";

const CONFIG = {
  serpApiUrl: "https://api.brightdata.com/request",
  serpZone: "serp_cutiepaws",
};

async function testSerpApi() {
  const apiKey = process.env.BRIGHTDATA_API_KEY;
  if (!apiKey) {
    throw new Error("BRIGHTDATA_API_KEY not set");
  }

  // Use local search (tbm=lcl) like discover-places.ts
  const query = "Medisch Centrum voor Dieren Amsterdam";
  const searchUrl = `https://www.google.nl/search?q=${encodeURIComponent(query)}&tbm=lcl&hl=nl&gl=nl&num=5`;

  console.log("Testing query:", query);
  console.log("Search URL:", searchUrl);
  console.log("");

  const response = await fetch(CONFIG.serpApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      zone: CONFIG.serpZone,
      url: searchUrl,
      format: "json",
    }),
  });

  console.log("Response status:", response.status);

  const data = await response.json();
  console.log("\n=== Full API Response Keys ===");
  console.log("Top-level keys:", Object.keys(data));

  // Check if we have a wrapper response
  if (data.body) {
    console.log("\n=== Wrapper detected - parsing body ===");
    let parsedBody = data.body;
    if (typeof data.body === 'string') {
      parsedBody = JSON.parse(data.body);
    }
    console.log("Body keys:", Object.keys(parsedBody));

    if (parsedBody.local_results) {
      console.log("\n=== local_results ===");
      console.log("Count:", parsedBody.local_results.length);
      if (parsedBody.local_results.length > 0) {
        console.log("First result keys:", Object.keys(parsedBody.local_results[0]));
        console.log("First result:", JSON.stringify(parsedBody.local_results[0], null, 2));
      }
    }

    console.log("\n=== Full Body (truncated) ===");
    console.log(JSON.stringify(parsedBody, null, 2).substring(0, 5000));
  } else {
    // Direct response
    if (data.local_results) {
      console.log("\n=== local_results ===");
      console.log("Count:", data.local_results.length);
      if (data.local_results.length > 0) {
        console.log("First result keys:", Object.keys(data.local_results[0]));
        console.log("First result:", JSON.stringify(data.local_results[0], null, 2));
      }
    }

    console.log("\n=== Full Response (truncated) ===");
    console.log(JSON.stringify(data, null, 2).substring(0, 5000));
  }
}

testSerpApi().catch(console.error);

/**
 * Test: Fetch Google Maps reviews via BrightData Web Unlocker
 * Using PROXY method (not API endpoint)
 */

import dotenv from "dotenv";
dotenv.config({ override: true });

import { neon } from "@neondatabase/serverless";
import https from "https";
import http from "http";

async function testUnlockerProxy() {
  const customerId = process.env.BRIGHTDATA_CUSTOMER_ID;
  const apiKey = process.env.BRIGHTDATA_API_KEY;
  const zone = process.env.BRIGHTDATA_ZONE || "mcp_unlocker";

  if (!customerId || !apiKey) {
    console.error("BRIGHTDATA_CUSTOMER_ID or BRIGHTDATA_API_KEY not set");
    process.exit(1);
  }

  // Get a place with CID from DB
  const sql = neon(process.env.DATABASE_URL!);
  const places = await sql`
    SELECT p.id, p.name, p.google_cid, ci.name as city_name
    FROM places p
    JOIN cities ci ON p.city_id = ci.id
    WHERE p.google_cid IS NOT NULL
    LIMIT 1
  `;

  if (places.length === 0) {
    console.error("No places with CID found");
    process.exit(1);
  }

  const place = places[0];
  console.log("Testing with:", place.name);
  console.log("City:", place.city_name);
  console.log("CID:", place.google_cid);
  console.log("Zone:", zone);

  // Google Maps URL with CID
  const mapsUrl = `https://www.google.com/maps?cid=${place.google_cid}`;
  console.log("\nGoogle Maps URL:", mapsUrl);

  console.log("\n" + "=".repeat(60));
  console.log("Testing BrightData Web Unlocker via PROXY...");
  console.log("=".repeat(60));

  // BrightData proxy credentials
  const proxyHost = "brd.superproxy.io";
  const proxyPort = 33335;
  const proxyAuth = `brd-customer-${customerId}-zone-${zone}:${apiKey}`;

  try {
    // Method 1: Use fetch with proxy-agent (if available)
    // Method 2: Use Node.js http(s) module with proxy

    const html = await fetchViaProxy(mapsUrl, proxyHost, proxyPort, proxyAuth);

    console.log("\nResponse length:", html.length);

    // Look for review-related content in HTML
    const reviewPatterns = [
      { name: "review keyword", pattern: /review/gi },
      { name: "rating keyword", pattern: /rating/gi },
      { name: "sterren (Dutch)", pattern: /sterren/gi },
      { name: "beoordeling (Dutch)", pattern: /beoordeling/gi },
      { name: "JSON review text", pattern: /"text":"([^"]{20,200})"/g },
      { name: "aria-label review", pattern: /aria-label="[^"]*review/gi },
      { name: "star rating", pattern: /\d+[.,]\d+\s*(stars?|sterren)/gi },
    ];

    console.log("\n=== PATTERN MATCHES ===");
    for (const { name, pattern } of reviewPatterns) {
      const matches = html.match(pattern);
      if (matches) {
        console.log(`${name}: ${matches.length} matches`);
        if (matches.length <= 5) {
          matches.forEach((m, i) => console.log(`  ${i + 1}. ${m.substring(0, 100)}`));
        }
      }
    }

    // Look for JSON data blocks
    const jsonBlocks = html.match(/\[\[.*?\]\]/g);
    if (jsonBlocks) {
      console.log(`\nFound ${jsonBlocks.length} potential JSON blocks`);
    }

    // Show a sample of the HTML
    console.log("\n=== HTML SAMPLE (first 5000 chars) ===");
    console.log(html.substring(0, 5000));

    // Look for structured data
    if (html.includes('"reviews"') || html.includes('"review"')) {
      console.log("\n🎉 REVIEWS DATA FOUND IN HTML!");
    }

    // Look for specific Google Maps review structures
    if (html.includes('data-review-id')) {
      console.log("\n🎉 Found data-review-id attributes!");
    }

  } catch (error) {
    console.log("Error:", (error as Error).message);
  }

  process.exit(0);
}

function fetchViaProxy(
  targetUrl: string,
  proxyHost: string,
  proxyPort: number,
  proxyAuth: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = new URL(targetUrl);

    // CONNECT tunnel request for HTTPS
    const connectReq = http.request({
      host: proxyHost,
      port: proxyPort,
      method: "CONNECT",
      path: `${url.hostname}:443`,
      headers: {
        "Proxy-Authorization": `Basic ${Buffer.from(proxyAuth).toString("base64")}`,
        Host: `${url.hostname}:443`,
      },
    });

    connectReq.on("connect", (res, socket) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Proxy CONNECT failed: ${res.statusCode}`));
        return;
      }

      // Now make HTTPS request through the tunnel
      const tlsSocket = require("tls").connect(
        {
          socket: socket,
          servername: url.hostname,
        },
        () => {
          // Send HTTP request
          const req = `GET ${url.pathname}${url.search} HTTP/1.1\r\n` +
            `Host: ${url.hostname}\r\n` +
            `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\r\n` +
            `Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\n` +
            `Accept-Language: nl-NL,nl;q=0.9,en;q=0.8\r\n` +
            `Connection: close\r\n\r\n`;

          tlsSocket.write(req);
        }
      );

      let data = "";
      tlsSocket.on("data", (chunk: Buffer) => {
        data += chunk.toString();
      });

      tlsSocket.on("end", () => {
        // Parse HTTP response
        const bodyStart = data.indexOf("\r\n\r\n");
        if (bodyStart !== -1) {
          resolve(data.substring(bodyStart + 4));
        } else {
          resolve(data);
        }
      });

      tlsSocket.on("error", reject);
    });

    connectReq.on("error", reject);
    connectReq.setTimeout(60000, () => {
      connectReq.destroy();
      reject(new Error("Proxy connection timeout"));
    });

    connectReq.end();
  });
}

testUnlockerProxy();

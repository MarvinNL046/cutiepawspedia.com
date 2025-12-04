#!/usr/bin/env npx tsx
/**
 * Enrichment Module Test Script - D1.1.10
 *
 * Tests all enrichment modules with real URLs and local test content.
 * Run with: npx tsx scripts/test-enrichment.ts
 *
 * Options:
 *   --url=<url>    Test a specific URL with all extractors
 *   --verbose      Show detailed output
 *   --jina-only    Only test Jina AI-powered extraction
 */

import "dotenv/config";
import { parseOpeningHours, toSimpleFormat, generateTextFromHours } from "@/lib/enrichment/parseOpeningHours";
import { parseRatings } from "@/lib/enrichment/parseRatings";
import { extractAboutSection } from "@/lib/enrichment/extractAboutSection";
import { extractSchemaOrg, schemaOrgToInternalHours } from "@/lib/enrichment/extractSchemaOrg";
import { ENRICHMENT_FLAGS, generateEnrichmentFlags } from "@/lib/enrichment/flags";

// ============================================================================
// CONFIGURATION
// ============================================================================

const JINA_API_KEY = process.env.JINA_API_KEY;
const VERBOSE = process.argv.includes("--verbose");
const JINA_ONLY = process.argv.includes("--jina-only");
const SPECIFIC_URL = process.argv.find((arg) => arg.startsWith("--url="))?.split("=")[1];

// Test URLs - real Dutch pet-related businesses
const TEST_URLS = [
  "https://www.dierenkliniekamsterdam.nl",
  "https://www.trimsalon-petsmile.nl",
  "https://www.pets-place.nl",
  "https://www.dierenartsenpraktijkoudorp.nl",
  "https://www.hondentrimsalon-amsterdam.nl",
];

// ============================================================================
// TEST DATA
// ============================================================================

const TEST_CONTENT = {
  dutchOpeningHours: `
    Openingstijden
    Maandag: 09:00 - 17:00
    Dinsdag: 09:00 - 17:00
    Woensdag: 09:00 - 12:00
    Donderdag: 09:00 - 17:00
    Vrijdag: 09:00 - 17:00
    Zaterdag: 10:00 - 14:00
    Zondag: Gesloten
  `,

  englishOpeningHours: `
    Opening Hours
    Monday: 9:00 AM - 5:00 PM
    Tuesday: 9:00 AM - 5:00 PM
    Wednesday: 9:00 AM - 12:00 PM
    Thursday: 9:00 AM - 5:00 PM
    Friday: 9:00 AM - 5:00 PM
    Saturday: 10:00 AM - 2:00 PM
    Sunday: Closed
  `,

  germanOpeningHours: `
    Öffnungszeiten
    Montag: 09:00 - 17:00
    Dienstag: 09:00 - 17:00
    Mittwoch: 09:00 - 12:00
    Donnerstag: 09:00 - 17:00
    Freitag: 09:00 - 17:00
    Samstag: 10:00 - 14:00
    Sonntag: Geschlossen
  `,

  tableOpeningHours: `
    | Dag | Open | Dicht |
    |-----|------|-------|
    | Maandag | 09:00 | 17:00 |
    | Dinsdag | 09:00 | 17:00 |
    | Woensdag | 09:00 | 17:00 |
  `,

  ratingContent: `
    We zijn trots op onze 4.8/5 sterren rating op Google Reviews.
    ★★★★★ Uitstekend beoordeeld door onze klanten.
    Trustpilot score: 4.7
    Facebook: 4.5 sterren (150 beoordelingen)
  `,

  aboutContent: `
    Over Ons

    Welkom bij Dierenkliniek Amsterdam! Sinds 1985 bieden wij hoogwaardige
    veterinaire zorg voor uw huisdieren. Ons team van 12 ervaren dierenartsen
    is gespecialiseerd in chirurgie, tandheelkunde en preventieve zorg.

    Wij zijn winnaar van de "Beste Dierenkliniek 2023" award.

    Onze Diensten
    - Algemene consulten
    - Chirurgie
    - Tandheelkunde
  `,

  schemaOrgHtml: `
    <html>
    <head>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "VeterinaryCare",
      "name": "Dierenkliniek Amsterdam",
      "description": "Gespecialiseerde veterinaire zorg sinds 1985",
      "telephone": "+31 20 123 4567",
      "email": "info@dierenkliniek.nl",
      "url": "https://www.dierenkliniek.nl",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Prinsengracht 123",
        "addressLocality": "Amsterdam",
        "postalCode": "1015 DT",
        "addressCountry": "NL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 52.3667,
        "longitude": 4.8945
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "245",
        "bestRating": "5"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "14:00"
        }
      ]
    }
    </script>
    </head>
    <body></body>
    </html>
  `,
};

// ============================================================================
// TEST RUNNERS
// ============================================================================

async function testOpeningHours() {
  console.log("\n" + "=".repeat(60));
  console.log("📅 OPENING HOURS PARSER TESTS");
  console.log("=".repeat(60));

  const testCases = [
    { name: "Dutch", content: TEST_CONTENT.dutchOpeningHours },
    { name: "English", content: TEST_CONTENT.englishOpeningHours },
    { name: "German", content: TEST_CONTENT.germanOpeningHours },
    { name: "Table format", content: TEST_CONTENT.tableOpeningHours },
  ];

  for (const testCase of testCases) {
    console.log(`\n🧪 Testing ${testCase.name}...`);

    try {
      const result = await parseOpeningHours({ content: testCase.content });

      console.log(`   ✅ Source: ${result.source}`);
      console.log(`   ✅ Confidence: ${result.confidence}%`);
      console.log(`   ✅ Language: ${result.detectedLanguage}`);
      console.log(`   ✅ Days found: ${Object.keys(result.hours).length}`);

      if (VERBOSE) {
        console.log(`   📋 Hours:`);
        const simple = toSimpleFormat(result.hours);
        for (const [day, hours] of Object.entries(simple)) {
          console.log(`      ${day}: ${hours}`);
        }
      }

      if (result.warnings?.length) {
        console.log(`   ⚠️ Warnings: ${result.warnings.join(", ")}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
    }
  }
}

async function testRatings() {
  console.log("\n" + "=".repeat(60));
  console.log("⭐ RATING PARSER TESTS");
  console.log("=".repeat(60));

  console.log("\n🧪 Testing rating extraction...");

  try {
    const result = parseRatings({ content: TEST_CONTENT.ratingContent });

    console.log(`   ✅ Rating: ${result.rating}/5`);
    console.log(`   ✅ Review count: ${result.reviewCount || "Unknown"}`);
    console.log(`   ✅ Source: ${result.source}`);
    console.log(`   ✅ Confidence: ${result.confidence}%`);

    if (result.platformRatings?.length) {
      console.log(`   📊 Platform ratings:`);
      for (const pr of result.platformRatings) {
        console.log(`      - ${pr.platform}: ${pr.rating}/5`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error}`);
  }
}

async function testAboutSection() {
  console.log("\n" + "=".repeat(60));
  console.log("📝 ABOUT SECTION EXTRACTOR TESTS");
  console.log("=".repeat(60));

  console.log("\n🧪 Testing about section extraction...");

  try {
    const result = await extractAboutSection({ content: TEST_CONTENT.aboutContent });

    if (result) {
      console.log(`   ✅ Found: ${result.length} characters`);
      console.log(`   ✅ Language: ${result.language}`);
      console.log(`   ✅ Confidence: ${result.confidence}%`);
      console.log(`   ✅ Source header: "${result.sourceHeader}"`);

      if (result.facts) {
        console.log(`   📋 Facts extracted:`);
        if (result.facts.foundedYear) {
          console.log(`      - Founded: ${result.facts.foundedYear}`);
        }
        if (result.facts.employeeCount) {
          console.log(`      - Employees: ${result.facts.employeeCount}`);
        }
        if (result.facts.specializations?.length) {
          console.log(`      - Specializations: ${result.facts.specializations.join(", ")}`);
        }
        if (result.facts.awards?.length) {
          console.log(`      - Awards: ${result.facts.awards.join(", ")}`);
        }
      }

      if (VERBOSE) {
        console.log(`   📝 Full text preview:`);
        console.log(`      "${result.fullText.substring(0, 200)}..."`);
      }
    } else {
      console.log(`   ⚠️ No about section found`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error}`);
  }
}

async function testSchemaOrg() {
  console.log("\n" + "=".repeat(60));
  console.log("🏷️ SCHEMA.ORG EXTRACTOR TESTS");
  console.log("=".repeat(60));

  console.log("\n🧪 Testing Schema.org extraction...");

  try {
    const result = extractSchemaOrg(TEST_CONTENT.schemaOrgHtml);

    if (result) {
      console.log(`   ✅ Type: ${result.type}`);
      console.log(`   ✅ Source: ${result.source}`);
      console.log(`   ✅ Confidence: ${result.confidence}%`);

      if (result.business) {
        console.log(`   📋 Business data:`);
        console.log(`      - Name: ${result.business.name}`);
        console.log(`      - Phone: ${result.business.telephone}`);
        console.log(`      - Email: ${result.business.email}`);
      }

      if (result.aggregateRating) {
        console.log(`   ⭐ Rating: ${result.aggregateRating.ratingValue}/5 (${result.aggregateRating.reviewCount} reviews)`);
      }

      if (result.address) {
        console.log(`   📍 Address: ${result.address.streetAddress}, ${result.address.postalCode} ${result.address.addressLocality}`);
      }

      if (result.geo) {
        console.log(`   🌍 Coordinates: ${result.geo.latitude}, ${result.geo.longitude}`);
      }

      if (result.openingHours?.length) {
        console.log(`   📅 Opening hours specs: ${result.openingHours.length}`);
        const internal = schemaOrgToInternalHours(result.openingHours);
        if (VERBOSE) {
          for (const [day, hours] of Object.entries(internal)) {
            console.log(`      ${day}: ${hours.opens} - ${hours.closes}`);
          }
        }
      }
    } else {
      console.log(`   ⚠️ No Schema.org data found`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error}`);
  }
}

async function testFlags() {
  console.log("\n" + "=".repeat(60));
  console.log("🏁 ENRICHMENT FLAGS TESTS");
  console.log("=".repeat(60));

  console.log("\n🧪 Testing flag generation...");

  const testResult = {
    hasSchemaOrg: true,
    schemaOrgFields: ["rating", "hours", "address"],
    openingHoursSource: "schema" as const,
    openingHoursConfidence: 95,
    openingHoursDayCount: 6,
    ratingSource: "google",
    hasAboutSection: true,
    aboutSummarized: false,
    aboutFactsCount: 3,
    websiteStatus: "ok" as const,
    enrichmentStatus: "complete" as const,
  };

  const flags = generateEnrichmentFlags(testResult);

  console.log(`   ✅ Generated ${flags.length} flags:`);
  for (const flag of flags) {
    console.log(`      - ${flag}`);
  }
}

async function testLiveUrl(url: string) {
  console.log("\n" + "=".repeat(60));
  console.log(`🌐 LIVE URL TEST: ${url}`);
  console.log("=".repeat(60));

  if (!JINA_API_KEY) {
    console.log("   ❌ JINA_API_KEY not set in environment");
    return;
  }

  console.log("\n🔄 Fetching content via Jina...");

  try {
    const response = await fetch(`https://r.jina.ai/${encodeURIComponent(url)}`, {
      headers: {
        Authorization: `Bearer ${JINA_API_KEY}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log(`   ❌ Jina fetch failed: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    const content = data.content || data.text || "";
    const html = data.html || "";

    console.log(`   ✅ Content length: ${content.length} chars`);

    // Test opening hours
    console.log("\n📅 Opening Hours:");
    const hoursResult = await parseOpeningHours({
      content,
      jinaApiKey: JINA_API_KEY,
      websiteUrl: url,
    });

    if (Object.keys(hoursResult.hours).length > 0) {
      console.log(`   ✅ Found ${Object.keys(hoursResult.hours).length} days`);
      console.log(`   ✅ Source: ${hoursResult.source}, Confidence: ${hoursResult.confidence}%`);
      if (VERBOSE) {
        const simple = toSimpleFormat(hoursResult.hours);
        for (const [day, hours] of Object.entries(simple)) {
          console.log(`      ${day}: ${hours}`);
        }
      }
    } else {
      console.log(`   ⚠️ No opening hours found`);
    }

    // Test ratings
    console.log("\n⭐ Ratings:");
    const ratingResult = parseRatings({ content, html });

    if (ratingResult.rating) {
      console.log(`   ✅ Rating: ${ratingResult.rating}/5`);
      console.log(`   ✅ Source: ${ratingResult.source}`);
      if (ratingResult.platformRatings?.length) {
        for (const pr of ratingResult.platformRatings) {
          console.log(`      - ${pr.platform}: ${pr.rating}/5`);
        }
      }
    } else {
      console.log(`   ⚠️ No rating found`);
    }

    // Test about section
    console.log("\n📝 About Section:");
    const aboutResult = await extractAboutSection({ content, html });

    if (aboutResult) {
      console.log(`   ✅ Found ${aboutResult.length} chars`);
      console.log(`   ✅ Language: ${aboutResult.language}`);
      if (aboutResult.facts && Object.keys(aboutResult.facts).length > 0) {
        console.log(`   ✅ Facts extracted: ${Object.keys(aboutResult.facts).length}`);
      }
      if (VERBOSE && aboutResult.fullText) {
        console.log(`   📝 Preview: "${aboutResult.fullText.substring(0, 150)}..."`);
      }
    } else {
      console.log(`   ⚠️ No about section found`);
    }

    // Test Schema.org
    console.log("\n🏷️ Schema.org:");
    if (html) {
      const schemaResult = extractSchemaOrg(html);

      if (schemaResult) {
        console.log(`   ✅ Type: ${schemaResult.type}`);
        console.log(`   ✅ Source: ${schemaResult.source}`);
        if (schemaResult.business?.name) {
          console.log(`   ✅ Name: ${schemaResult.business.name}`);
        }
        if (schemaResult.aggregateRating) {
          console.log(`   ✅ Rating: ${schemaResult.aggregateRating.ratingValue}/5`);
        }
      } else {
        console.log(`   ⚠️ No Schema.org data found`);
      }
    } else {
      console.log(`   ⚠️ No HTML available for Schema.org extraction`);
    }

  } catch (error) {
    console.log(`   ❌ Error: ${error}`);
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║          D1.1 ENRICHMENT MODULE TEST SUITE                 ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  if (SPECIFIC_URL) {
    // Test specific URL only
    await testLiveUrl(SPECIFIC_URL);
  } else if (JINA_ONLY) {
    // Only test with live URLs
    console.log("\n🌐 Testing with live URLs (JINA_ONLY mode)...");
    for (const url of TEST_URLS.slice(0, 2)) {
      await testLiveUrl(url);
    }
  } else {
    // Run all local tests
    await testOpeningHours();
    await testRatings();
    await testAboutSection();
    await testSchemaOrg();
    await testFlags();

    // Optionally test one live URL
    if (JINA_API_KEY) {
      console.log("\n🌐 Testing with one live URL...");
      await testLiveUrl(TEST_URLS[0]);
    } else {
      console.log("\n⚠️ JINA_API_KEY not set - skipping live URL tests");
      console.log("   Set JINA_API_KEY in .env to enable live testing");
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ ALL TESTS COMPLETED");
  console.log("=".repeat(60));
}

main().catch(console.error);

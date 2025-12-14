import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

async function check() {
  // Check places WITH ratings
  const withRating = await sql`
    SELECT id, name, website, avg_rating, review_count, scraped_content
    FROM places
    WHERE avg_rating > 0
    ORDER BY avg_rating DESC
    LIMIT 10
  `;

  console.log("=== PLACES WITH RATINGS ===\n");
  for (const p of withRating) {
    console.log(`--- ${p.name} ---`);
    console.log(`Website: ${p.website}`);
    console.log(`DB Rating: ${p.avg_rating}, Reviews: ${p.review_count}`);

    if (p.scraped_content) {
      const content = p.scraped_content;
      console.log(`Scraped rating: ${content.googleRating}`);
      console.log(`Scraped reviews: ${content.googleReviewCount}`);
      console.log(`Rating source: ${content.ratingSource}`);
      console.log(`Rating confidence: ${content.ratingConfidence}`);
      if (content.platformRatings?.length) {
        console.log(`Platform ratings: ${JSON.stringify(content.platformRatings)}`);
      }
    }
    console.log("");
  }

  // Check places with GOOD aboutUs (>200 chars, not HTML-only)
  const withGoodAbout = await sql`
    SELECT id, name, scraped_content
    FROM places
    WHERE scraped_content IS NOT NULL
      AND scraped_content->>'aboutUs' IS NOT NULL
      AND length(scraped_content->>'aboutUs') > 200
    LIMIT 5
  `;

  console.log("\n=== PLACES WITH GOOD ABOUT-US (>200 chars) ===\n");
  for (const p of withGoodAbout) {
    console.log(`--- ${p.name} ---`);
    if (p.scraped_content?.aboutUs) {
      const aboutUs = p.scraped_content.aboutUs;
      const preview = aboutUs.substring(0, 300);
      const isHtml = /^\[?!\[|^#|^\*/.test(aboutUs.trim());
      console.log(`Length: ${aboutUs.length}, HTML-like: ${isHtml}`);
      console.log(`Preview: ${preview}...`);
    }
    console.log("");
  }
}

check().catch(console.error);

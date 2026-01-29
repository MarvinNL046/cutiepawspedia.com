import { NextResponse } from "next/server";

const baseUrl = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

// Dutch pillars
const pillarsNl = [
  {
    slug: "hondenverzorging",
    articles: ["hoe-vaak-hond-uitlaten", "beste-hondenborstels", "hondennagels-knippen", "tanden-poetsen-hond", "hond-baden-tips"],
  },
  {
    slug: "kattenverzorging",
    articles: ["kattenbak-training-kitten", "katten-borstelen", "kattennagels-knippen", "beste-kattenbakken", "langhaar-katten-verzorgen"],
  },
  {
    slug: "dierengezondheid",
    articles: ["vaccinaties-honden", "vaccinaties-katten", "vlooien-teken-huisdieren", "ontwormen-hond-kat", "wanneer-naar-dierenarts"],
  },
  {
    slug: "huisdiervoeding",
    articles: ["beste-hondenvoer", "kattenvoer-nat-vs-droog", "huisdier-afvallen", "giftig-voedsel-honden-katten", "barf-dieet-honden"],
  },
  {
    slug: "huisdiertraining",
    articles: ["puppytraining-basis", "zindelijkheidstraining-puppy", "hondengedragsproblemen", "clicker-training", "hond-alleen-thuis"],
  },
  {
    slug: "professionele-diensten",
    articles: ["trimsalon-kiezen", "dierenarts-vinden", "dierenpension-vs-oppas", "hondenuitlaatservice", "dierengedragstherapeut"],
  },
  {
    slug: "reizen-met-huisdieren",
    articles: ["reizen-hond-auto", "vliegen-met-huisdier", "huisdiervriendelijke-vakantiehuizen", "hondenstranden-nederland", "buitenland-reizen-huisdier"],
  },
  {
    slug: "puppies-kittens",
    articles: ["puppy-kopen-tips", "kitten-aanschaffen", "eerste-week-puppy", "kitten-socialiseren", "puppy-proof-huis"],
  },
  {
    slug: "senior-huisdieren",
    articles: ["oudere-hond-verzorgen", "katten-op-leeftijd", "artritis-huisdieren", "dementie-honden-katten", "afscheid-huisdier"],
  },
  {
    slug: "huisdiergedrag",
    articles: ["hond-blaft-veel", "katten-krabben-meubels", "agressie-honden", "angst-huisdieren", "meerdere-huisdieren"],
  },
];

// English pillars
const pillarsEn = [
  {
    slug: "dog-care",
    articles: ["how-often-walk-dog", "best-dog-brushes", "trimming-dog-nails", "brushing-dog-teeth", "bathing-dog-tips"],
  },
  {
    slug: "cat-care",
    articles: ["litter-box-training-kitten", "brushing-cats", "trimming-cat-nails", "best-litter-boxes", "long-hair-cat-care"],
  },
  {
    slug: "pet-health",
    articles: ["dog-vaccinations", "cat-vaccinations", "fleas-ticks-pets", "deworming-dogs-cats", "when-to-see-vet"],
  },
  {
    slug: "pet-nutrition",
    articles: ["best-dog-food", "wet-vs-dry-cat-food", "pet-weight-loss", "toxic-foods-dogs-cats", "barf-diet-dogs"],
  },
  {
    slug: "pet-training",
    articles: ["puppy-training-basics", "potty-training-puppy", "dog-behaviour-problems", "clicker-training", "dog-home-alone"],
  },
  {
    slug: "professional-services",
    articles: ["choosing-groomer", "finding-vet", "pet-boarding-vs-sitter", "dog-walking-service", "pet-behaviourist"],
  },
  {
    slug: "travelling-with-pets",
    articles: ["car-travel-dog", "flying-with-pet", "pet-friendly-holiday-homes", "dog-beaches-netherlands", "travelling-abroad-pet"],
  },
  {
    slug: "puppies-kittens",
    articles: ["buying-puppy-tips", "getting-kitten", "first-week-puppy", "kitten-socialisation", "puppy-proofing-home"],
  },
  {
    slug: "senior-pets",
    articles: ["caring-older-dog", "senior-cat-care", "arthritis-pets", "dementia-dogs-cats", "saying-goodbye-pet"],
  },
  {
    slug: "pet-behaviour",
    articles: ["dog-barking-too-much", "cats-scratching-furniture", "dog-aggression", "anxiety-pets", "multiple-pets"],
  },
];

export async function GET(): Promise<NextResponse> {
  const now = new Date().toISOString().split("T")[0];

  const urls: string[] = [];

  // Dutch gids pages
  urls.push(`
    <url>
      <loc>${baseUrl}/nl/gids</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`);

  for (const pillar of pillarsNl) {
    urls.push(`
    <url>
      <loc>${baseUrl}/nl/gids/${pillar.slug}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`);

    for (const article of pillar.articles) {
      urls.push(`
    <url>
      <loc>${baseUrl}/nl/gids/${pillar.slug}/${article}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`);
    }
  }

  // English guide pages
  urls.push(`
    <url>
      <loc>${baseUrl}/en/guide</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`);

  for (const pillar of pillarsEn) {
    urls.push(`
    <url>
      <loc>${baseUrl}/en/guide/${pillar.slug}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`);

    for (const article of pillar.articles) {
      urls.push(`
    <url>
      <loc>${baseUrl}/en/guide/${pillar.slug}/${article}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

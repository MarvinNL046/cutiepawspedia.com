/**
 * Robots.txt Generator
 *
 * CACHING STRATEGY: Static with Long TTL
 * - Cache-Control: 24 hours - robots.txt rarely changes
 * - Blocks crawl traps (search params, API routes)
 * - Allows Googlebot/Bingbot with no delay
 * - ALLOWS AI bots for discovery (llms.txt provided)
 */

import { NextResponse } from "next/server";

// Static generation - robots.txt content is predictable
export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate once per day

const BASE_URL = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

export async function GET() {
  const robotsTxt = `# CutiePawsPedia Robots.txt
# https://cutiepawspedia.com
#
# AI Discovery: We provide llms.txt for AI assistants
# See: ${BASE_URL}/llms.txt (summary)
# See: ${BASE_URL}/llms-full.txt (detailed)

User-agent: *
Allow: /

# Disallow internal/admin paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Disallow search pages with parameters (prevent crawl traps)
Disallow: /*?q=*
Disallow: /*?sort=*
Disallow: /*?page=*
Disallow: /*?map=*

# Allow specific API endpoints for SEO
Allow: /api/og/

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# LLMs.txt for AI assistants
# https://llmstxt.org/
LLMsTxt: ${BASE_URL}/llms.txt

# Google-specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing-specific rules
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# AI Assistants - ALLOWED for discovery and user queries
# We want AI assistants to help users find pet services
User-agent: GPTBot
Allow: /
Crawl-delay: 2

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /
Crawl-delay: 2

User-agent: anthropic-ai
Allow: /
Crawl-delay: 2

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /
Crawl-delay: 2

User-agent: Bytespider
Allow: /
Crawl-delay: 5

# Block aggressive scrapers/training-only bots
User-agent: CCBot
Disallow: /

User-agent: GPTBot-Extended
Disallow: /
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

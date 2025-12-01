import { NextResponse } from "next/server";

const BASE_URL = process.env.APP_BASE_URL || "https://cutiepawspedia.com";

export async function GET() {
  const robotsTxt = `# CutiePawsPedia Robots.txt
# https://cutiepawspedia.com

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

# Google-specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing-specific rules
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Block AI training bots (optional - can be removed if you want to allow)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

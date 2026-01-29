import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

const intlMiddleware = createMiddleware({
  // Supported locales
  locales,

  // Default locale when none is detected
  defaultLocale,

  // Always show locale prefix in URL (e.g., /nl/about, /de/about)
  localePrefix: 'always',

  // Disable cookie-based locale detection to allow ISR caching
  localeDetection: false,

  // Disable NEXT_LOCALE cookie to prevent "private, no-cache" headers
  localeCookie: false,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Remove any cache-busting headers that prevent ISR/CDN caching
  // next-intl middleware can set cookies or headers that force dynamic rendering
  response.headers.delete('set-cookie');

  return response;
};

export const config = {
  // Match all pathnames except:
  // - API routes (/api/*)
  // - Static files (_next/static/*, _next/image/*, favicon.ico, etc.)
  // - Sitemap files (sitemap.xml, sitemap-*.xml)
  // - Robot.txt, ads.txt, llms.txt
  matcher: [
    // Match all pathnames except for specific patterns
    // Using separate patterns for better clarity
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|ads.txt|llms.txt|llms-full.txt|sitemap.*\\.xml$|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};

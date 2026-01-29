import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';

export default createMiddleware({
  // Supported locales
  locales,

  // Default locale when none is detected
  defaultLocale,

  // Always show locale prefix in URL (e.g., /nl/about, /de/about)
  localePrefix: 'always',

  // Disable cookie-based locale detection to allow ISR caching
  // Locale is already determined by URL prefix (/nl/, /en/, etc.)
  localeDetection: false,

  // Disable NEXT_LOCALE cookie - it forces "private, no-cache, no-store"
  // on all responses, completely breaking Vercel CDN caching and ISR
  localeCookie: false,
});

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

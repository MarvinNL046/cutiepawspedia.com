import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';

export default createMiddleware({
  // Supported locales
  locales,

  // Default locale when none is detected
  defaultLocale,

  // Always show locale prefix in URL (e.g., /nl/about, /de/about)
  localePrefix: 'always',

  // Locale detection from Accept-Language header
  localeDetection: true,
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

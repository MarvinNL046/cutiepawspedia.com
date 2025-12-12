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
  // - Sitemap files
  // - Robot.txt
  matcher: [
    // Match all pathnames except for specific patterns
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)).*)',
  ],
};

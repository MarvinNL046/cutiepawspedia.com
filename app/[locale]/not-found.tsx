/**
 * 404 Not Found Page
 *
 * This page is shown when a route is not found within a locale.
 * It properly returns HTTP 404 status for SEO.
 *
 * Note: This is a Server Component that renders independently from the layout.
 * It does NOT have access to NextIntlClientProvider context.
 */

import Link from "next/link";

// Self-contained 404 page that doesn't rely on context
export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center space-y-6">
          {/* Animated Paw Icon */}
          <div className="text-8xl animate-bounce">
            🐾
          </div>

          {/* 404 Text */}
          <h1 className="text-6xl md:text-8xl font-bold text-orange-500 dark:text-orange-400">
            404
          </h1>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Oeps! Pagina niet gevonden
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Deze pagina bestaat niet of is verplaatst.
              Misschien kan een van onze trouwe viervoeters je helpen de weg terug te vinden?
            </p>
          </div>

          {/* Action Buttons - Using simple anchor tags to avoid context issues */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Naar homepage
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Zoeken
            </Link>
          </div>

          {/* Fun Fact */}
          <div className="pt-8 text-sm text-gray-500 dark:text-gray-500">
            <p>Wist je dat? Honden kunnen tot 1.000 verschillende gezichtsuitdrukkingen herkennen!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

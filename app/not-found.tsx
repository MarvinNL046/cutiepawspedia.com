/**
 * Global 404 Not Found Page
 *
 * This page is shown when a route is not found at the root level.
 * It properly returns HTTP 404 status for SEO.
 */

import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center space-y-6">
            {/* Animated Paw Icon */}
            <div className="text-8xl animate-bounce">
              🐾
            </div>

            {/* 404 Text */}
            <h1 className="text-6xl md:text-8xl font-bold text-orange-500">
              404
            </h1>

            {/* Message */}
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Page Not Found
              </h2>
              <p className="text-gray-600 text-lg">
                This page doesn&apos;t exist or has been moved.
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

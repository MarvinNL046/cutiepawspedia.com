"use client";

/**
 * Global Error Boundary
 *
 * Catches and displays errors that occur at the root level.
 * This is a client component required by Next.js.
 */

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center space-y-6">
            {/* Error Icon */}
            <div className="text-8xl">
              ⚠️
            </div>

            {/* Error Text */}
            <h1 className="text-4xl md:text-5xl font-bold text-orange-500">
              Error
            </h1>

            {/* Message */}
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Something went wrong
              </h2>
              <p className="text-gray-600 text-lg">
                We couldn&apos;t load this page. Please try again or go back to the homepage.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Homepage
              </Link>
            </div>

            {/* Error digest */}
            {error.digest && (
              <p className="text-xs text-gray-400 pt-4">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}

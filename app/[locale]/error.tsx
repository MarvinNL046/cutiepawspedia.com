"use client";

/**
 * Error Boundary for Locale Routes
 *
 * Catches and displays errors that occur during rendering.
 * This is a client component required by Next.js.
 */

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-cpCream/30 via-background to-cpCoral/5 dark:from-cpDark dark:via-cpDark dark:to-cpDark">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <AlertTriangle className="h-20 w-20 text-cpCoral" />
          </div>

          {/* Error Text */}
          <h1 className="text-4xl md:text-5xl font-bold text-cpCoral dark:text-cpCoral/80">
            Oeps!
          </h1>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Er ging iets mis
            </h2>
            <p className="text-muted-foreground text-lg">
              We konden deze pagina niet laden. Probeer het opnieuw of ga terug naar de homepage.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={reset} size="lg" className="gap-2">
              <RefreshCw className="h-5 w-5" />
              Probeer opnieuw
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/">
                <Home className="h-5 w-5" />
                Naar homepage
              </Link>
            </Button>
          </div>

          {/* Error digest for debugging */}
          {error.digest && (
            <p className="text-xs text-muted-foreground/60 pt-4">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

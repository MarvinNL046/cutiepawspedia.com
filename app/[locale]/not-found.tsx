/**
 * 404 Not Found Page
 *
 * This page is shown when a route is not found.
 * It properly returns HTTP 404 status for SEO.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-cpCream/30 via-background to-cpCoral/5 dark:from-cpDark dark:via-cpDark dark:to-cpDark">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center space-y-6">
          {/* Animated Paw Icon */}
          <div className="text-8xl animate-bounce">
            🐾
          </div>

          {/* 404 Text */}
          <h1 className="text-6xl md:text-8xl font-bold text-cpCoral dark:text-cpCoral/80">
            404
          </h1>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Oeps! Pagina niet gevonden
            </h2>
            <p className="text-muted-foreground text-lg">
              Deze pagina bestaat niet of is verplaatst.
              Misschien kan een van onze trouwe viervoeters je helpen de weg terug te vinden?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="h-5 w-5" />
                Naar homepage
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/search">
                <Search className="h-5 w-5" />
                Zoeken
              </Link>
            </Button>
          </div>

          {/* Back Link - using browser's back function via JS in href */}
          <div className="pt-4">
            <a
              href="javascript:history.back()"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Ga terug naar vorige pagina
            </a>
          </div>

          {/* Fun Fact */}
          <div className="pt-8 text-sm text-muted-foreground">
            <p>Wist je dat? Honden kunnen tot 1.000 verschillende gezichtsuitdrukkingen herkennen!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

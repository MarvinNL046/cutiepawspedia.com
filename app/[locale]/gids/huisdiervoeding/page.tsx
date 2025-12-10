import type { Metadata } from "next";
import Link from "next/link";
import { UtensilsCrossed, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Huisdiervoeding Gids | Het beste voer voor je hond of kat",
  description: "Alles over voeding voor huisdieren: hondenvoer, kattenvoer, BARF-dieet en giftige voedingsmiddelen.",
  keywords: "huisdiervoeding, hondenvoer, kattenvoer, BARF, giftig voedsel honden katten",
};

const articles = [
  { slug: "beste-hondenvoer", title: "Het beste hondenvoer van 2024", description: "Vergelijk de beste hondenvoermerken" },
  { slug: "kattenvoer-nat-vs-droog", title: "Natvoer vs droogvoer voor katten", description: "Welke voeding is het beste?" },
  { slug: "huisdier-afvallen", title: "Helpen je huisdier afvallen", description: "Tips voor een gezond gewicht" },
  { slug: "giftig-voedsel-honden-katten", title: "Giftig voedsel voor honden en katten", description: "Wat mag je huisdier absoluut niet eten?" },
  { slug: "barf-dieet-honden", title: "BARF-dieet voor honden", description: "Alles over rauw voer voor je hond" },
];

export default function HuisdiervoedingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpCoral/10 to-transparent dark:from-cpCoral/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/nl/gids" className="inline-flex items-center gap-2 text-cpCoral hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar gids
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpCoral/10 rounded-xl"><UtensilsCrossed className="w-8 h-8 text-cpCoral" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Huisdiervoeding</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">Het beste voer voor je hond of kat.</p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/nl/gids/huisdiervoeding/${article.slug}`}
                className="group block bg-card dark:bg-cpCharcoal/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors">{article.title}</h2>
                    <p className="text-muted-foreground dark:text-cpCream/70 mt-1">{article.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cpCoral group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

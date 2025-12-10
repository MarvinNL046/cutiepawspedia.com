import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Senior Huisdieren Gids | Zorg voor oudere honden en katten",
  description: "Speciale zorg voor oudere huisdieren: artritis, dementie, voeding en afscheid nemen.",
  keywords: "oudere hond, katten op leeftijd, artritis huisdieren, dementie hond, afscheid huisdier",
};

const articles = [
  { slug: "oudere-hond-verzorgen", title: "Een oudere hond verzorgen", description: "Speciale aandacht voor senioren" },
  { slug: "katten-op-leeftijd", title: "Katten op leeftijd", description: "Zorg voor je oudere kat" },
  { slug: "artritis-huisdieren", title: "Artritis bij huisdieren", description: "Herkennen en behandelen van gewrichtspijn" },
  { slug: "dementie-honden-katten", title: "Dementie bij honden en katten", description: "Cognitieve disfunctie herkennen" },
  { slug: "afscheid-huisdier", title: "Afscheid nemen van je huisdier", description: "Een moeilijke maar liefdevolle keuze" },
];

export default function SeniorHuisdierenPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAmber/10 to-transparent dark:from-cpAmber/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/nl/gids" className="inline-flex items-center gap-2 text-cpAmber hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar gids
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAmber/10 rounded-xl"><Clock className="w-8 h-8 text-cpAmber" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Senior Huisdieren</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">Speciale zorg voor oudere honden en katten.</p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/nl/gids/senior-huisdieren/${article.slug}`}
                className="group block bg-card dark:bg-cpCharcoal/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpAmber/40 transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground dark:text-cpCream group-hover:text-cpAmber transition-colors">{article.title}</h2>
                    <p className="text-muted-foreground dark:text-cpCream/70 mt-1">{article.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cpAmber group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

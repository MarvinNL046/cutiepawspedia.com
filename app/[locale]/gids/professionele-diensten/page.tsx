import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Professionele Huisdierdiensten | Vind de beste zorg voor je huisdier",
  description: "Tips voor het vinden van de beste dierenarts, trimsalon, hondenuitlaatservice en meer.",
  keywords: "dierenarts vinden, trimsalon, hondenuitlaatservice, dierenpension, dierengedragstherapeut",
};

const articles = [
  { slug: "trimsalon-kiezen", title: "De juiste trimsalon kiezen", description: "Waar let je op bij een trimsalon?" },
  { slug: "dierenarts-vinden", title: "Een goede dierenarts vinden", description: "Tips voor het kiezen van een dierenarts" },
  { slug: "dierenpension-vs-oppas", title: "Dierenpension of oppas thuis?", description: "Vergelijk de opties voor vakantieperiodes" },
  { slug: "hondenuitlaatservice", title: "Hondenuitlaatservice kiezen", description: "Vind betrouwbare hondenuitlaters" },
  { slug: "dierengedragstherapeut", title: "Wanneer een gedragstherapeut?", description: "Professionele hulp voor gedragsproblemen" },
];

export default function ProfessioneleDienstenPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAmber/10 to-transparent dark:from-cpAmber/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/nl/gids" className="inline-flex items-center gap-2 text-cpAmber hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar gids
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAmber/10 rounded-xl"><Briefcase className="w-8 h-8 text-cpAmber" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Professionele Diensten</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">Vind de beste professionals voor je huisdier.</p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/nl/gids/professionele-diensten/${article.slug}`}
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

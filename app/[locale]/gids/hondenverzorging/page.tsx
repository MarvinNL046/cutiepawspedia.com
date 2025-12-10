import type { Metadata } from "next";
import Link from "next/link";
import { Dog, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Hondenverzorging Gids | Tips voor de beste zorg voor je hond",
  description: "Complete gids voor hondenverzorging: vachtverzorging, nagels knippen, tanden poetsen, en meer. Praktische tips van experts.",
  keywords: "hondenverzorging, hond verzorgen, hond borstelen, hondennagels knippen, tanden poetsen hond",
};

const articles = [
  { slug: "hoe-vaak-hond-uitlaten", title: "Hoe vaak moet je een hond uitlaten?", description: "Ontdek de perfecte uitlaatfrequentie voor jouw hond" },
  { slug: "beste-hondenborstels", title: "De beste hondenborstels voor elke vachttype", description: "Kies de juiste borstel voor jouw hond" },
  { slug: "hondennagels-knippen", title: "Hondennagels knippen: complete handleiding", description: "Stap-voor-stap instructies voor veilig nagels knippen" },
  { slug: "tanden-poetsen-hond", title: "Tanden poetsen bij je hond", description: "Voorkom gebitsproblemen met dagelijkse tandverzorging" },
  { slug: "hond-baden-tips", title: "Hond baden: tips en trucs", description: "Alles over het baden van je hond" },
];

export default function HondenverzorgingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpCoral/10 to-transparent dark:from-cpCoral/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/nl/gids" className="inline-flex items-center gap-2 text-cpCoral hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar gids
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpCoral/10 rounded-xl"><Dog className="w-8 h-8 text-cpCoral" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Hondenverzorging</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Alles wat je moet weten over het verzorgen van je hond. Van dagelijkse verzorging tot speciale tips.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/nl/gids/hondenverzorging/${article.slug}`}
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

import type { Metadata } from "next";
import Link from "next/link";
import { Cat, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Kattenverzorging Gids | Tips voor de beste zorg voor je kat",
  description: "Complete gids voor kattenverzorging: vachtverzorging, kattenbak, nagels knippen en meer.",
  keywords: "kattenverzorging, kat verzorgen, kattenbak, katten borstelen, kattennagels",
};

const articles = [
  { slug: "kattenbak-training-kitten", title: "Kattenbak training voor kittens", description: "Leer je kitten snel en stressvrij de kattenbak te gebruiken" },
  { slug: "katten-borstelen", title: "Katten borstelen: de complete gids", description: "Alles over vachtverzorging voor je kat" },
  { slug: "kattennagels-knippen", title: "Kattennagels knippen", description: "Veilig en stressvrij nagels knippen bij je kat" },
  { slug: "beste-kattenbakken", title: "De beste kattenbakken van 2024", description: "Vergelijk de populairste kattenbakken" },
  { slug: "langhaar-katten-verzorgen", title: "Langharige katten verzorgen", description: "Speciale tips voor langhaar rassen" },
];

export default function KattenverzorgingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAqua/10 to-transparent dark:from-cpAqua/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/nl/gids" className="inline-flex items-center gap-2 text-cpAqua hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar gids
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAqua/10 rounded-xl"><Cat className="w-8 h-8 text-cpAqua" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Kattenverzorging</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">Complete gids voor de verzorging van je kat.</p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/nl/gids/kattenverzorging/${article.slug}`}
                className="group block bg-card dark:bg-cpCharcoal/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpAqua/40 transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground dark:text-cpCream group-hover:text-cpAqua transition-colors">{article.title}</h2>
                    <p className="text-muted-foreground dark:text-cpCream/70 mt-1">{article.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cpAqua group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

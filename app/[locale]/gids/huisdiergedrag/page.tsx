import type { Metadata } from "next";
import Link from "next/link";
import { Brain, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Huisdiergedrag Gids | Begrijp en verbeter het gedrag van je huisdier",
  description: "Expert tips over huisdiergedrag: blaffen, krabben, agressie, angst en meerdere huisdieren.",
  keywords: "hond blaft veel, katten krabben, agressie hond, angst huisdieren, meerdere huisdieren",
};

const articles = [
  { slug: "hond-blaft-veel", title: "Mijn hond blaft veel", description: "Oorzaken en oplossingen voor overmatig blaffen" },
  { slug: "katten-krabben-meubels", title: "Katten krabben aan meubels", description: "Voorkom krabschade in huis" },
  { slug: "agressie-honden", title: "Agressie bij honden", description: "Herkennen en aanpakken van agressief gedrag" },
  { slug: "angst-huisdieren", title: "Angst bij huisdieren", description: "Help je angstige hond of kat" },
  { slug: "meerdere-huisdieren", title: "Meerdere huisdieren in huis", description: "Tips voor een harmonieus huishouden" },
];

export default function HuisdiergedragPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpCoral/10 to-transparent dark:from-cpCoral/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/nl/gids" className="inline-flex items-center gap-2 text-cpCoral hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar gids
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpCoral/10 rounded-xl"><Brain className="w-8 h-8 text-cpCoral" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Huisdiergedrag</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">Begrijp en verbeter het gedrag van je huisdier.</p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/nl/gids/huisdiergedrag/${article.slug}`}
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

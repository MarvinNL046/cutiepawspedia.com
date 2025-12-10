import type { Metadata } from "next";
import Link from "next/link";
import { Plane, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Reizen met Huisdieren | Tips voor vakanties met je hond of kat",
  description: "Alles over reizen met je huisdier: autoreizen, vliegen, vakantiehuizen en hondenstranden.",
  keywords: "reizen met hond, vliegen met huisdier, hondenstranden nederland, huisdiervriendelijke vakantiehuizen",
};

const articles = [
  { slug: "reizen-hond-auto", title: "Reizen met je hond in de auto", description: "Veilig en comfortabel autorijden met je hond" },
  { slug: "vliegen-met-huisdier", title: "Vliegen met je huisdier", description: "Regels en tips voor vliegreizen" },
  { slug: "huisdiervriendelijke-vakantiehuizen", title: "Huisdiervriendelijke vakantiehuizen", description: "Vind de perfecte accommodatie" },
  { slug: "hondenstranden-nederland", title: "Hondenstranden in Nederland", description: "De beste stranden voor honden" },
  { slug: "buitenland-reizen-huisdier", title: "Naar het buitenland met je huisdier", description: "Documentatie en regels per land" },
];

export default function ReizenMetHuisdierenPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpCoral/10 to-transparent dark:from-cpCoral/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/nl/gids" className="inline-flex items-center gap-2 text-cpCoral hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar gids
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpCoral/10 rounded-xl"><Plane className="w-8 h-8 text-cpCoral" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Reizen met Huisdieren</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">Tips voor vakanties en reizen met je huisdier.</p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/nl/gids/reizen-met-huisdieren/${article.slug}`}
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

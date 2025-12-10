import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Huisdiertraining Gids | Effectieve trainingstips voor je hond",
  description: "Leer je hond trainen met onze expert tips: puppytraining, zindelijkheid, gedragsproblemen en meer.",
  keywords: "hondentraining, puppytraining, clicker training, gedragsproblemen hond, zindelijkheidstraining",
};

const articles = [
  { slug: "puppytraining-basis", title: "Puppytraining: de basis", description: "Start goed met je nieuwe puppy" },
  { slug: "zindelijkheidstraining-puppy", title: "Zindelijkheidstraining voor puppy's", description: "Je puppy snel zindelijk krijgen" },
  { slug: "hondengedragsproblemen", title: "Hondengedragsproblemen oplossen", description: "Veelvoorkomende problemen en oplossingen" },
  { slug: "clicker-training", title: "Clicker training voor honden", description: "Effectieve trainingsmethode uitgelegd" },
  { slug: "hond-alleen-thuis", title: "Je hond alleen thuis laten", description: "Voorkom verlatingsangst" },
];

export default function HuisdiertrainingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAqua/10 to-transparent dark:from-cpAqua/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/nl/gids" className="inline-flex items-center gap-2 text-cpAqua hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar gids
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAqua/10 rounded-xl"><GraduationCap className="w-8 h-8 text-cpAqua" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Huisdiertraining</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">Effectieve trainingsmethoden voor je hond.</p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/nl/gids/huisdiertraining/${article.slug}`}
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

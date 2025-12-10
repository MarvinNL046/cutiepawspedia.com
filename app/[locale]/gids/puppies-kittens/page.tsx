import type { Metadata } from "next";
import Link from "next/link";
import { Baby, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Puppies & Kittens Gids | Tips voor nieuwe huisdierbezitters",
  description: "Alles voor nieuwe baasjes: puppy kopen, kitten aanschaffen, de eerste week thuis en socialisatie.",
  keywords: "puppy kopen, kitten aanschaffen, puppy proof, kitten socialiseren, eerste week puppy",
  alternates: {
    languages: {
      "nl": "/nl/gids/puppies-kittens",
      "en": "/en/guide/puppies-kittens",
    },
  },
};

const articles = [
  { slug: "puppy-kopen-tips", title: "Een puppy kopen: waar let je op?", description: "Tips voor het vinden van een gezonde puppy" },
  { slug: "kitten-aanschaffen", title: "Een kitten aanschaffen", description: "Wat moet je weten voor je een kitten neemt?" },
  { slug: "eerste-week-puppy", title: "De eerste week met je puppy", description: "Stap-voor-stap handleiding voor nieuwe baasjes" },
  { slug: "kitten-socialiseren", title: "Kitten socialiseren", description: "Zo krijg je een zelfverzekerde kat" },
  { slug: "puppy-proof-huis", title: "Je huis puppy-proof maken", description: "Maak je huis veilig voor je nieuwe puppy" },
];

export default function PuppiesKittensPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAmber/10 to-transparent dark:from-cpAmber/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/nl/gids" className="inline-flex items-center gap-2 text-cpAmber hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Terug naar gids
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAmber/10 rounded-xl"><Baby className="w-8 h-8 text-cpAmber" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Puppies & Kittens</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} artikelen</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Alles voor nieuwe puppy- en kitten baasjes.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/nl/gids/puppies-kittens/${article.slug}`}
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

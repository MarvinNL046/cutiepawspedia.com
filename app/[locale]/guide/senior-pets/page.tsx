import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Senior Pets Guide | Caring for Older Dogs and Cats",
  description: "Complete guide for senior pet care: older dog care, senior cat care, arthritis, dementia, and end-of-life decisions.",
  keywords: "senior dog care, older cat care, pet arthritis, pet dementia, saying goodbye pet",
  alternates: {
    languages: {
      "nl": "/nl/gids/senior-huisdieren",
      "en": "/en/guide/senior-pets",
    },
  },
};

const articles = [
  { slug: "caring-older-dog", title: "Caring for Your Older Dog", description: "Complete senior dog care guide" },
  { slug: "senior-cat-care", title: "Senior Cat Care Guide", description: "Caring for ageing cats" },
  { slug: "arthritis-pets", title: "Arthritis in Pets: Symptoms and Treatment", description: "Managing pet arthritis" },
  { slug: "dementia-dogs-cats", title: "Dementia in Dogs and Cats", description: "Recognising and managing pet dementia" },
  { slug: "saying-goodbye-pet", title: "Saying Goodbye to Your Pet", description: "End-of-life decisions and grief" },
];

export default function SeniorPetsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAqua/10 to-transparent dark:from-cpAqua/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpAqua hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAqua/10 rounded-xl"><Clock className="w-8 h-8 text-cpAqua" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Senior Pets</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about caring for older pets. From health management to quality of life.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/senior-pets/${article.slug}`}
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

import type { Metadata } from "next";
import Link from "next/link";
import { Cat, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Cat Care Guide | Tips for the Best Care for Your Cat",
  description: "Complete cat care guide: grooming, litter box training, nail trimming, and more. Expert advice for cat owners.",
  keywords: "cat care, cat grooming, litter box training, cat nail trimming, long hair cat care",
  alternates: {
    languages: {
      "nl": "/nl/gids/kattenverzorging",
      "en": "/en/guide/cat-care",
    },
  },
};

const articles = [
  { slug: "litter-box-training-kitten", title: "How to Litter Box Train Your Kitten", description: "Complete guide to litter box training" },
  { slug: "brushing-cats", title: "How to Brush Your Cat Properly", description: "Tips for effective cat grooming" },
  { slug: "trimming-cat-nails", title: "How to Trim Your Cat's Nails Safely", description: "Step-by-step nail trimming guide" },
  { slug: "best-litter-boxes", title: "Best Litter Boxes for Every Cat", description: "Find the perfect litter box for your cat" },
  { slug: "long-hair-cat-care", title: "Long Hair Cat Grooming and Care", description: "Special care tips for long-haired cats" },
];

export default function CatCarePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAmber/10 to-transparent dark:from-cpAmber/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpAmber hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAmber/10 rounded-xl"><Cat className="w-8 h-8 text-cpAmber" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Cat Care</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about caring for your cat. From daily grooming to special tips.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/cat-care/${article.slug}`}
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

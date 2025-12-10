import type { Metadata } from "next";
import Link from "next/link";
import { Dog, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Dog Care Guide | Tips for the Best Care for Your Dog",
  description: "Complete dog care guide: coat care, nail trimming, teeth brushing, and more. Practical tips from experts.",
  keywords: "dog care, dog grooming, dog brushing, dog nail trimming, brushing dog teeth",
  alternates: {
    languages: {
      "nl": "/nl/gids/hondenverzorging",
      "en": "/en/guide/dog-care",
    },
  },
};

const articles = [
  { slug: "how-often-walk-dog", title: "How Often Should You Walk Your Dog?", description: "Discover the perfect walking frequency for your dog" },
  { slug: "best-dog-brushes", title: "Best Dog Brushes for Every Coat Type", description: "Choose the right brush for your dog" },
  { slug: "trimming-dog-nails", title: "How to Trim Your Dog's Nails Safely", description: "Step-by-step instructions for safe nail trimming" },
  { slug: "brushing-dog-teeth", title: "How to Brush Your Dog's Teeth", description: "Prevent dental problems with daily dental care" },
  { slug: "bathing-dog-tips", title: "Dog Bathing Tips and Best Practices", description: "Everything about bathing your dog" },
];

export default function DogCarePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpCoral/10 to-transparent dark:from-cpCoral/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpCoral hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpCoral/10 rounded-xl"><Dog className="w-8 h-8 text-cpCoral" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Dog Care</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about caring for your dog. From daily grooming to special tips.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/dog-care/${article.slug}`}
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

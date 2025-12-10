import type { Metadata } from "next";
import Link from "next/link";
import { Baby, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Puppies & Kittens Guide | New Pet Owner Essentials",
  description: "Complete guide for new pet owners: buying a puppy, getting a kitten, first week tips, socialisation, and puppy-proofing your home.",
  keywords: "buying puppy, getting kitten, puppy first week, kitten socialisation, puppy proofing home",
  alternates: {
    languages: {
      "nl": "/nl/gids/puppies-kittens",
      "en": "/en/guide/puppies-kittens",
    },
  },
};

const articles = [
  { slug: "buying-puppy-tips", title: "Tips for Buying a Puppy", description: "What to know before getting a puppy" },
  { slug: "getting-kitten", title: "Getting a Kitten: What You Need to Know", description: "Complete kitten buying guide" },
  { slug: "first-week-puppy", title: "Your Puppy's First Week at Home", description: "Surviving the first week" },
  { slug: "kitten-socialisation", title: "Kitten Socialisation Guide", description: "Raise a confident cat" },
  { slug: "puppy-proofing-home", title: "How to Puppy-Proof Your Home", description: "Keep your puppy safe" },
];

export default function PuppiesKittensPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAmber/10 to-transparent dark:from-cpAmber/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpAmber hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAmber/10 rounded-xl"><Baby className="w-8 h-8 text-cpAmber" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Puppies & Kittens</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about puppies and kittens. From choosing to caring for your new pet.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/puppies-kittens/${article.slug}`}
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

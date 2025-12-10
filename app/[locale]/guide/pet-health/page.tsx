import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Health Guide | Essential Health Tips for Your Pet",
  description: "Complete pet health guide: vaccinations, flea prevention, deworming, and when to see the vet. Expert veterinary advice.",
  keywords: "pet health, dog vaccinations, cat vaccinations, fleas ticks, deworming pets, when to see vet",
  alternates: {
    languages: {
      "nl": "/nl/gids/dierengezondheid",
      "en": "/en/guide/pet-health",
    },
  },
};

const articles = [
  { slug: "dog-vaccinations", title: "Essential Dog Vaccinations Guide", description: "Everything about vaccinating your dog" },
  { slug: "cat-vaccinations", title: "Essential Cat Vaccinations Guide", description: "Everything about vaccinating your cat" },
  { slug: "fleas-ticks-pets", title: "Fleas and Ticks Prevention for Pets", description: "Protect your pet from parasites" },
  { slug: "deworming-dogs-cats", title: "Deworming Your Dog and Cat", description: "Complete guide to deworming pets" },
  { slug: "when-to-see-vet", title: "When to Take Your Pet to the Vet", description: "Know when to seek veterinary care" },
];

export default function PetHealthPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAqua/10 to-transparent dark:from-cpAqua/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpAqua hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAqua/10 rounded-xl"><Heart className="w-8 h-8 text-cpAqua" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Pet Health</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about keeping your pet healthy. From vaccinations to emergency care.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/pet-health/${article.slug}`}
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

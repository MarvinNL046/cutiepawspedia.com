import type { Metadata } from "next";
import Link from "next/link";
import { Brain, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Behaviour Guide | Understanding Your Pet",
  description: "Complete guide to pet behaviour: barking, scratching, aggression, anxiety, and living with multiple pets. Expert behaviour advice.",
  keywords: "dog behaviour, cat behaviour, pet aggression, pet anxiety, multiple pets",
  alternates: {
    languages: {
      "nl": "/nl/gids/huisdiergedrag",
      "en": "/en/guide/pet-behaviour",
    },
  },
};

const articles = [
  { slug: "dog-barking-too-much", title: "Why Your Dog Barks Too Much and How to Stop It", description: "Stop excessive barking" },
  { slug: "cats-scratching-furniture", title: "How to Stop Cats Scratching Furniture", description: "Save your furniture" },
  { slug: "dog-aggression", title: "Understanding and Managing Dog Aggression", description: "Deal with aggressive behaviour" },
  { slug: "anxiety-pets", title: "Anxiety in Pets: Signs and Solutions", description: "Help your anxious pet" },
  { slug: "multiple-pets", title: "Living with Multiple Pets", description: "Multi-pet household tips" },
];

export default function PetBehaviourPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpCoral/10 to-transparent dark:from-cpCoral/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpCoral hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpCoral/10 rounded-xl"><Brain className="w-8 h-8 text-cpCoral" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Pet Behaviour</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about pet behaviour. From understanding to managing common issues.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/pet-behaviour/${article.slug}`}
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

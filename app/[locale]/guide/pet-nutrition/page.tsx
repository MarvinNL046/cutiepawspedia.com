import type { Metadata } from "next";
import Link from "next/link";
import { Utensils, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Nutrition Guide | Feeding Your Pet the Right Way",
  description: "Complete pet nutrition guide: best dog food, cat food, weight management, and toxic foods to avoid. Expert dietary advice.",
  keywords: "pet nutrition, best dog food, cat food, pet diet, toxic foods pets, BARF diet",
  alternates: {
    languages: {
      "nl": "/nl/gids/huisdiervoeding",
      "en": "/en/guide/pet-nutrition",
    },
  },
};

const articles = [
  { slug: "best-dog-food", title: "Best Dog Food: Complete Guide", description: "Find the perfect food for your dog" },
  { slug: "wet-vs-dry-cat-food", title: "Wet vs Dry Cat Food: Which is Better", description: "Compare cat food types" },
  { slug: "pet-weight-loss", title: "How to Help Your Pet Lose Weight", description: "Safe weight loss tips for pets" },
  { slug: "toxic-foods-dogs-cats", title: "Toxic Foods for Dogs and Cats", description: "Foods to never feed your pet" },
  { slug: "barf-diet-dogs", title: "BARF Diet for Dogs: Complete Guide", description: "Everything about raw feeding" },
];

export default function PetNutritionPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpCoral/10 to-transparent dark:from-cpCoral/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpCoral hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpCoral/10 rounded-xl"><Utensils className="w-8 h-8 text-cpCoral" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Pet Nutrition</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about feeding your pet. From choosing the right food to healthy diets.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/pet-nutrition/${article.slug}`}
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

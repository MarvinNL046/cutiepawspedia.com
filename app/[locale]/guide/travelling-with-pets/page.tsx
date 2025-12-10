import type { Metadata } from "next";
import Link from "next/link";
import { Plane, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Travelling with Pets Guide | Travel Safely with Your Pet",
  description: "Complete guide to travelling with pets: car travel, flying, pet-friendly holidays, dog beaches, and international travel.",
  keywords: "travelling with pets, flying with pet, pet-friendly holidays, dog beaches, EU pet passport",
  alternates: {
    languages: {
      "nl": "/nl/gids/reizen-met-huisdieren",
      "en": "/en/guide/travelling-with-pets",
    },
  },
};

const articles = [
  { slug: "car-travel-dog", title: "Travelling with Your Dog by Car", description: "Safe car travel tips for dogs" },
  { slug: "flying-with-pet", title: "Flying with Your Pet: Complete Guide", description: "Everything about air travel with pets" },
  { slug: "pet-friendly-holiday-homes", title: "Pet-Friendly Holiday Homes in the Netherlands", description: "Find the perfect holiday spot" },
  { slug: "dog-beaches-netherlands", title: "Dog Beaches in the Netherlands", description: "Best beaches for dogs" },
  { slug: "travelling-abroad-pet", title: "Travelling Abroad with Your Pet", description: "International pet travel guide" },
];

export default function TravellingWithPetsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpCoral/10 to-transparent dark:from-cpCoral/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpCoral hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpCoral/10 rounded-xl"><Plane className="w-8 h-8 text-cpCoral" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Travelling with Pets</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about travelling with your pet. From local trips to international adventures.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/travelling-with-pets/${article.slug}`}
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

import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Pet Services Guide | Find the Right Care",
  description: "Complete guide to professional pet services: choosing groomers, finding vets, pet boarding, dog walking, and behaviourists.",
  keywords: "pet groomer, find vet, pet boarding, dog walking service, pet behaviourist",
  alternates: {
    languages: {
      "nl": "/nl/gids/professionele-diensten",
      "en": "/en/guide/professional-services",
    },
  },
};

const articles = [
  { slug: "choosing-groomer", title: "How to Choose a Pet Groomer", description: "Find the perfect groomer for your pet" },
  { slug: "finding-vet", title: "How to Find the Right Vet", description: "Choose the best veterinarian" },
  { slug: "pet-boarding-vs-sitter", title: "Pet Boarding vs Pet Sitter: Which is Best", description: "Compare your options" },
  { slug: "dog-walking-service", title: "Dog Walking Services: What to Know", description: "Everything about dog walkers" },
  { slug: "pet-behaviourist", title: "When to See a Pet Behaviourist", description: "Get professional behaviour help" },
];

export default function ProfessionalServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAqua/10 to-transparent dark:from-cpAqua/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpAqua hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAqua/10 rounded-xl"><Briefcase className="w-8 h-8 text-cpAqua" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Professional Services</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about professional pet services. Find the right care for your pet.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/professional-services/${article.slug}`}
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

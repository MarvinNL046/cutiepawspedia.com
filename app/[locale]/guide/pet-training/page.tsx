import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Training Guide | Train Your Dog Like a Pro",
  description: "Complete pet training guide: puppy training, potty training, behaviour problems, and clicker training. Expert tips for dog owners.",
  keywords: "dog training, puppy training, potty training, clicker training, dog behaviour problems",
  alternates: {
    languages: {
      "nl": "/nl/gids/huisdiertraining",
      "en": "/en/guide/pet-training",
    },
  },
};

const articles = [
  { slug: "puppy-training-basics", title: "Puppy Training Basics: Complete Guide", description: "Start training your puppy right" },
  { slug: "potty-training-puppy", title: "How to Potty Train Your Puppy", description: "Complete housebreaking guide" },
  { slug: "dog-behaviour-problems", title: "Common Dog Behaviour Problems and Solutions", description: "Fix unwanted behaviours" },
  { slug: "clicker-training", title: "Clicker Training for Dogs: Step by Step", description: "Master positive reinforcement" },
  { slug: "dog-home-alone", title: "Teaching Your Dog to Stay Home Alone", description: "Prevent separation anxiety" },
];

export default function PetTrainingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cpAmber/10 to-transparent dark:from-cpAmber/5 border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Link href="/en/guide" className="inline-flex items-center gap-2 text-cpAmber hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cpAmber/10 rounded-xl"><GraduationCap className="w-8 h-8 text-cpAmber" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-cpCream">Pet Training</h1>
              <p className="text-muted-foreground dark:text-cpCream/70">{articles.length} articles</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80">
            Everything you need to know about training your dog. From basic commands to advanced techniques.
          </p>
        </div>
      </section>
      <section className="bg-background dark:bg-cpCharcoal py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.slug} href={`/en/guide/pet-training/${article.slug}`}
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

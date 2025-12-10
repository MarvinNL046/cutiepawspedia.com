import type { Metadata } from "next";
import Link from "next/link";
import { Book, ChevronRight, Dog, Cat, Heart, Stethoscope, UtensilsCrossed, GraduationCap, Briefcase, Plane, Baby, Clock, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Care Guide | Complete Care Guides for Dogs and Cats",
  description: "Discover everything about pet care: from nutrition and health to training and behaviour. Practical tips and advice for dog owners and cat lovers.",
  keywords: "pet guide, dog care, cat care, pet tips, pet health, pet training",
  alternates: {
    languages: {
      "nl": "/nl/gids",
      "en": "/en/guide",
    },
  },
  openGraph: {
    title: "Pet Care Guide | CutiePawsPedia",
    description: "Complete care guides for dogs and cats. From puppy to senior, everything you need to know.",
    type: "website",
  },
};

const pillars = [
  {
    slug: "dog-care",
    title: "Dog Care",
    description: "Everything about caring for your dog: coat care, nail trimming, teeth brushing and more.",
    icon: Dog,
    color: "cpCoral",
    articles: 5,
  },
  {
    slug: "cat-care",
    title: "Cat Care",
    description: "Complete guide to cat care: from litter box training to coat maintenance.",
    icon: Cat,
    color: "cpAqua",
    articles: 5,
  },
  {
    slug: "pet-health",
    title: "Pet Health",
    description: "Important information about vaccinations, prevention and when to visit the vet.",
    icon: Stethoscope,
    color: "cpAmber",
    articles: 5,
  },
  {
    slug: "pet-nutrition",
    title: "Pet Nutrition",
    description: "The best food for your pet: from premium kibble to BARF diets.",
    icon: UtensilsCrossed,
    color: "cpCoral",
    articles: 5,
  },
  {
    slug: "pet-training",
    title: "Pet Training",
    description: "Effective training methods for puppies and adult dogs.",
    icon: GraduationCap,
    color: "cpAqua",
    articles: 5,
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    description: "How to find the best vet, groomer or dog walking service?",
    icon: Briefcase,
    color: "cpAmber",
    articles: 5,
  },
  {
    slug: "travelling-with-pets",
    title: "Travelling with Pets",
    description: "Tips for travelling with your dog or cat, from car trips to flights.",
    icon: Plane,
    color: "cpCoral",
    articles: 5,
  },
  {
    slug: "puppies-kittens",
    title: "Puppies & Kittens",
    description: "Everything for new pet owners: from purchase to the first weeks at home.",
    icon: Baby,
    color: "cpAqua",
    articles: 5,
  },
  {
    slug: "senior-pets",
    title: "Senior Pets",
    description: "Special care for older dogs and cats, including health advice.",
    icon: Clock,
    color: "cpAmber",
    articles: 5,
  },
  {
    slug: "pet-behaviour",
    title: "Pet Behaviour",
    description: "Understand and improve your pet's behaviour with our expert guides.",
    icon: Brain,
    color: "cpCoral",
    articles: 5,
  },
];

export default function GuidePage() {
  return (
    <>
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Pet Care Guide",
            "description": "Complete care guides for dogs and cats",
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/20 mb-6">
              <Book className="w-4 h-4 text-cpCoral" />
              <span className="text-sm font-medium text-cpCoral">50+ Articles</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              The Complete <span className="gradient-text-coral">Pet Care Guide</span>
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 max-w-2xl mx-auto">
              Practical tips and expert advice for the best care for your dog or cat.
              From puppy to senior, we help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-background dark:bg-cpCharcoal py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.slug}
                  href={`/en/guide/${pillar.slug}`}
                  className="group bg-card dark:bg-cpCharcoal/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${pillar.color}/10 mb-4`}>
                    <Icon className={`w-6 h-6 text-${pillar.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                    {pillar.title}
                  </h2>
                  <p className="text-muted-foreground dark:text-cpCream/70 text-sm mb-4">
                    {pillar.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cpCoral font-medium">{pillar.articles} articles</span>
                    <ChevronRight className="w-5 h-5 text-cpCoral group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cpCoral/5 dark:bg-cpCoral/10 py-16 border-t border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Heart className="w-12 h-12 text-cpCoral mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Find the best care for your pet
          </h2>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-8 max-w-2xl mx-auto">
            Besides our guides, you can also find the best vets, groomers and other
            pet services in your area.
          </p>
          <Link
            href="/en/netherlands"
            className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
          >
            View all pet services
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

/**
 * SEO Landing Page: Deworming Your Dog and Cat
 * Pillar: Pet Health (English)
 * Target: Pet owners seeking deworming guidance
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Calendar, AlertTriangle, CheckCircle, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Deworming Your Dog and Cat 2025 | Complete Schedule & Treatment Guide",
  description: "Everything you need to know about deworming pets: types of worms, symptoms, treatment schedule, costs, and prevention. Protect your dog, cat, and family from parasitic infections.",
  keywords: [
    "deworming dogs",
    "deworming cats",
    "dog worms symptoms",
    "cat worms treatment",
    "puppy deworming schedule",
    "kitten deworming",
    "roundworms",
    "tapeworms pets"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/pet-health/deworming-dogs-cats',
      'nl': '/nl/gids/dierengezondheid/ontwormen-hond-kat',
    },
  },
  openGraph: {
    title: "Deworming Your Dog and Cat 2025",
    "description": "Complete guide to deworming: types, symptoms, schedule, and treatment options for dogs and cats.",
    type: "article",
  },
};

export default function DewormingDogsCats() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Pet Health</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Deworming Your Dog and Cat: Complete Schedule & Treatment Guide
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Intestinal worms are common parasites that can seriously affect your pet's health and even transmit to humans. Learn which worms affect dogs and cats, how to recognise symptoms, and the proper deworming schedule to keep your pets and family safe.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🩺 Concerned your pet may have worms?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/united-kingdom">
                Find a veterinarian for treatment →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Nearly all puppies and kittens are born with or quickly acquire roundworms. Adult pets can contract worms from contaminated soil, prey animals, fleas, or other infected pets. Left untreated, worms can cause malnutrition, anaemia, and in severe cases, death.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This comprehensive guide covers the types of worms that affect dogs and cats, symptoms to watch for, deworming schedules for puppies, kittens, and adults, treatment options, and how to prevent reinfection.
          </p>
        </section>

        {/* Types of Worms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Activity className="h-7 w-7 text-cpCoral" />
            Types of Intestinal Worms in Dogs and Cats
          </h2>

          <div className="space-y-4 mb-6">
            {/* Roundworms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">1</span>
                Roundworms (Toxocara)
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Most common parasite in puppies and kittens. Looks like spaghetti (7-15cm long).
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Transmission:</strong> Mother to puppies/kittens (before birth or through milk), contaminated soil, infected prey</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Symptoms:</strong> Pot-bellied appearance, diarrhoea, vomiting (sometimes with visible worms), poor coat, weight loss</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Human risk:</strong> Yes - can cause visceral larva migrans (especially in children)</span>
                </li>
              </ul>
            </div>

            {/* Tapeworms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">2</span>
                Tapeworms (Dipylidium)
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Flat, segmented worms that look like grains of rice around the anus or in faeces.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Transmission:</strong> Swallowing infected fleas (most common), eating infected rodents or raw meat</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Symptoms:</strong> Rice-like segments near anus or in faeces, scooting bottom, weight loss, increased appetite</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Human risk:</strong> Low (only through swallowing infected fleas)</span>
                </li>
              </ul>
            </div>

            {/* Hookworms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">3</span>
                Hookworms (Ancylostoma)
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Tiny worms (1-2cm) that attach to the intestinal wall and suck blood. More common in dogs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Transmission:</strong> Mother to puppies, contaminated soil (larvae penetrate skin), ingestion</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Symptoms:</strong> Bloody or dark tar-like diarrhoea, anaemia (pale gums), lethargy, weight loss</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Human risk:</strong> Yes - can cause cutaneous larva migrans (skin rash)</span>
                </li>
              </ul>
            </div>

            {/* Whipworms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">4</span>
                Whipworms (Trichuris) - Dogs Only
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Thread-like worms (4-7cm) that live in the large intestine. Rare in cats.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Transmission:</strong> Contaminated soil (eggs survive for years)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Symptoms:</strong> Bloody diarrhoea, weight loss, anaemia (in severe cases)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Human risk:</strong> Very low</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground dark:text-cpCream">
                <strong>Zoonotic Risk:</strong> Some worms can transmit to humans, especially children who play in contaminated soil or sandpits. Always wash hands after handling pets, clean up faeces immediately, and cover sandpits when not in use.
              </p>
            </div>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Signs Your Pet May Have Worms
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Common Symptoms:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Visible worms in faeces or vomit</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Rice-like segments near anus (tapeworms)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Pot-bellied appearance (especially puppies/kittens)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Diarrhoea or bloody stools</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Weight loss despite normal appetite</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Dull coat or poor condition</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Scooting bottom along the floor</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Vomiting or coughing (severe roundworms)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Important:</strong> Many pets with worms show NO symptoms, especially adult dogs and cats with light infections. This is why regular preventative deworming is essential.
            </p>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Suspect Your Pet Has Worms?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get a faecal test and appropriate treatment from a veterinarian near you.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/united-kingdom">
                Find veterinary care now →
              </Link>
            </Button>
          </div>
        </section>

        {/* Deworming Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-cpCoral" />
            Deworming Schedule: Puppies, Kittens & Adults
          </h2>

          <div className="space-y-6">
            {/* Puppies */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Puppies (Dogs)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>2, 4, 6, 8, 12 weeks:</strong> Deworm every 2 weeks from 2-12 weeks of age</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>4, 5, 6 months:</strong> Monthly deworming until 6 months old</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>After 6 months:</strong> Switch to adult schedule (every 3 months)</span>
                </li>
              </ul>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3 mt-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Why so often?</strong> Puppies are highly susceptible to roundworms and can become reinfected quickly through their environment.</p>
              </div>
            </div>

            {/* Kittens */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Kittens (Cats)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>2, 4, 6, 8 weeks:</strong> Deworm every 2 weeks from 2-8 weeks of age</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>3, 4, 5, 6 months:</strong> Monthly deworming until 6 months old</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>After 6 months:</strong> Switch to adult schedule based on lifestyle</span>
                </li>
              </ul>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3 mt-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Note:</strong> Kittens contract roundworms through mother's milk, making early deworming critical.</p>
              </div>
            </div>

            {/* Adult Dogs */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Adult Dogs</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Every 3 months (4x per year):</strong> Standard recommendation for all adult dogs</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>High-risk dogs:</strong> Monthly if they hunt, eat raw meat, or have flea infestations</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Low-risk dogs:</strong> Some vets recommend twice yearly for indoor-only dogs (discuss with your vet)</span>
                </li>
              </ul>
            </div>

            {/* Adult Cats */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Adult Cats</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Outdoor cats:</strong> Every 3 months (4x per year) - hunt prey and roam</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Indoor-outdoor cats:</strong> Every 3-4 months based on outdoor exposure</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Strictly indoor cats:</strong> Every 6 months (2x per year) - lower risk but still recommended</span>
                </li>
              </ul>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3 mt-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Tapeworm Note:</strong> If your cat has fleas, they likely have tapeworms too. Deworm after treating fleas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Options */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Deworming Treatment Options
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Broad-Spectrum Wormers</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Treat multiple worm types at once (roundworms, hookworms, whipworms).
              </p>
              <p className="text-xs text-foreground dark:text-cpCream"><strong>Examples:</strong> Drontal, Panacur, Milbemax</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Tapeworm-Specific</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Required separately as most broad-spectrum wormers don't kill tapeworms.
              </p>
              <p className="text-xs text-foreground dark:text-cpCream"><strong>Examples:</strong> Praziquantel (Droncit)</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Prescription Preventatives</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Monthly tablets that prevent heartworm AND treat intestinal worms.
              </p>
              <p className="text-xs text-foreground dark:text-cpCream"><strong>Examples:</strong> Heartgard Plus, Interceptor Plus</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Over-the-Counter Options</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Available without prescription but may be less effective than vet products.
              </p>
              <p className="text-xs text-foreground dark:text-cpCream"><strong>Recommendation:</strong> Use vet-prescribed wormers for guaranteed effectiveness</p>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>💊 Important:</strong> Always dose by weight and use species-specific products. Never use dog wormers on cats without veterinary approval.
            </p>
          </div>
        </section>

        {/* Costs */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Deworming Costs: What to Expect
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Puppy/Kitten Deworming</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£5-£15</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Per dose. Needs 6-8 doses in first 6 months (£30-£120 total).</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Adult Broad-Spectrum</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£8-£20</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Per dose (quarterly = £32-£80/year). Vet products more expensive but more effective.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Faecal Test</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£20-£40</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Recommended if symptoms present. Identifies exact worm type.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Combination Products</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£15-£30</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Monthly preventatives that cover worms + fleas + ticks (more cost-effective).</p>
            </div>
          </div>
        </section>

        {/* Prevention Tips */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Preventing Worm Infestations
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Top Prevention Strategies:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Maintain regular deworming schedule:</strong> Follow the age-appropriate schedule recommended by your vet</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Control fleas:</strong> Use monthly flea prevention to prevent tapeworms</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Pick up faeces immediately:</strong> Prevents environmental contamination and reinfection</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Prevent hunting and scavenging:</strong> Stop pets from eating rodents or raw meat</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Good hygiene:</strong> Wash hands after handling pets, clean litter boxes daily, cover sandpits</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Deworm new pets:</strong> Always deworm newly adopted pets before bringing them home</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            More About Pet Health
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/pet-health/fleas-ticks-pets" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Fleas and Ticks Prevention</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete parasite control guide →</p>
            </Link>
            <Link href="/en/guide/pet-health/dog-vaccinations" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Essential Dog Vaccinations</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Vaccination schedule and guide →</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I see worms in my pet's faeces?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Sometimes, yes. Roundworms look like spaghetti (white/cream, 7-15cm long) and may be visible in vomit or faeces. Tapeworms shed rice-like segments that appear around the anus or in fresh faeces. However, hookworms and whipworms are too small to see, and many worm infections show no visible signs. A faecal test at your vet is the only way to definitively diagnose worms.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Do indoor pets really need regular deworming?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, though less frequently than outdoor pets. Indoor pets can contract worms from fleas (which carry tapeworms), mice or insects that enter the home, or contaminated soil on your shoes. Indoor cats that never go outside can be dewormed twice yearly, while indoor dogs should still be dewormed quarterly. Discuss your pet's specific risk factors with your vet.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is it safe to deworm pregnant or nursing pets?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, but only with specific wormers approved for pregnancy. Pregnant dogs should be dewormed at mating, 45 days into pregnancy, and during nursing. Pregnant cats should be dewormed before mating and during pregnancy under veterinary supervision. This prevents transmission to puppies/kittens. Always consult your vet for safe products and proper dosing during pregnancy.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can humans catch worms from pets?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, some worms are zoonotic (transmissible to humans). Roundworms and hookworms pose the highest risk, especially to children who play in contaminated soil or sandpits. Toxocara roundworms can cause visceral larva migrans (organ damage) or ocular larva migrans (eye damage) in humans. Prevent transmission by: washing hands after handling pets, cleaning up faeces immediately, covering sandpits, and keeping pets on regular deworming schedules.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need deworming treatment or advice for your pet?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en/united-kingdom">
                Find veterinary services →
              </Link>
            </Button>
          </div>
        </section>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Deworming Your Dog and Cat: Complete Schedule & Treatment Guide",
            "description": "Everything you need to know about deworming pets: types of worms, symptoms, treatment schedule, costs, and prevention.",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cutiepawspedia.com/logo.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/en/guide/pet-health/deworming-dogs-cats"
            }
          })
        }}
      />
    </div>
  );
}

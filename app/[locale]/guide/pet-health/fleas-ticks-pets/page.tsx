/**
 * SEO Landing Page: Fleas and Ticks Prevention for Pets
 * Pillar: Pet Health (English)
 * Target: Pet owners seeking flea and tick prevention guidance
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Bug, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Fleas and Ticks Prevention for Pets 2025 | Treatment & Control Guide",
  description: "Complete guide to preventing and treating fleas and ticks on dogs and cats. Learn about prevention methods, treatment options, life cycles, and year-round protection strategies.",
  keywords: [
    "flea prevention pets",
    "tick prevention dogs cats",
    "flea treatment",
    "tick removal",
    "flea medication",
    "flea collar",
    "flea shampoo",
    "how to get rid of fleas"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/pet-health/fleas-ticks-pets',
      'nl': '/nl/gids/dierengezondheid/vlooien-teken-huisdieren',
    },
  },
  openGraph: {
    title: "Fleas and Ticks Prevention for Pets 2025",
    description: "Everything you need to know about preventing and treating fleas and ticks on your dog or cat.",
    type: "article",
  },
};

export default function FleasTicksPets() {
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
            Fleas and Ticks Prevention for Pets: Complete Treatment & Control Guide
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Fleas and ticks aren't just annoying—they can transmit serious diseases to your pets and family. Learn how to prevent, identify, and eliminate these parasites with proven methods and year-round protection strategies.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🐾 Concerned about fleas or ticks on your pet?
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
            A single flea can lay up to 50 eggs per day, and ticks can transmit Lyme disease in as little as 24-48 hours. Understanding how to prevent and treat these parasites is essential for your pet's health and your family's safety.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This comprehensive guide covers everything from recognising an infestation to choosing the right prevention method, treating active infestations, and protecting your home year-round.
          </p>
        </section>

        {/* Understanding Fleas vs Ticks */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Bug className="h-7 w-7 text-cpCoral" />
            Fleas vs Ticks: Know Your Enemy
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Fleas */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bug className="h-6 w-6 text-cpCoral" />
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream">Fleas</h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Tiny, fast-moving insects that feed on blood and can jump up to 150 times their body length.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Size:</strong> 1-2mm long, dark brown, wingless</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Life Cycle:</strong> Egg → Larva → Pupa → Adult (14-21 days in ideal conditions)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Reproduction:</strong> Up to 50 eggs per day (2,000+ in lifetime)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Diseases:</strong> Tapeworms, anaemia (especially in young animals), flea allergy dermatitis</span>
                </li>
              </ul>
            </div>

            {/* Ticks */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-cpAmber" />
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream">Ticks</h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Slow-moving parasites that burrow their heads into skin and feed for days.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Size:</strong> 2-10mm (up to 1cm when engorged), oval-shaped, 8 legs</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Life Cycle:</strong> Egg → Larva → Nymph → Adult (can take 2-3 years)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Reproduction:</strong> One female can lay 3,000-5,000 eggs</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Diseases:</strong> Lyme disease, anaplasmosis, ehrlichiosis, Rocky Mountain spotted fever</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground dark:text-cpCream">
                <strong>Important:</strong> By the time you see one flea on your pet, there are likely hundreds of eggs, larvae, and pupae in your home. 95% of a flea infestation exists in the environment, not on your pet.
              </p>
            </div>
          </div>
        </section>

        {/* Signs of Infestation */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-cpCoral" />
            Signs Your Pet Has Fleas or Ticks
          </h2>

          <div className="space-y-6">
            {/* Flea Symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Signs of Fleas:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span><strong>Excessive scratching, biting, or licking:</strong> Especially around tail base, belly, and hind legs</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span><strong>Flea dirt (black specks):</strong> Dried blood that turns red when wet—use a flea comb on white paper to check</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span><strong>Hair loss or red, irritated skin:</strong> Especially in allergic pets</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span><strong>Pale gums:</strong> In severe infestations, especially puppies/kittens (sign of anaemia)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span><strong>Tiny jumping insects:</strong> Visible when parting fur, especially on light-coloured pets</span>
                </li>
              </ul>
            </div>

            {/* Tick Symptoms */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Signs of Ticks:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">✓</span>
                  <span><strong>Visible tick attached to skin:</strong> Feel for bumps when petting (common areas: head, ears, neck, paws, armpits)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">✓</span>
                  <span><strong>Head shaking or scratching at ears:</strong> Ticks love warm, hidden areas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">✓</span>
                  <span><strong>Lethargy or loss of appetite:</strong> May indicate tick-borne disease</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">✓</span>
                  <span><strong>Lameness or joint pain:</strong> Sign of Lyme disease (develops 2-5 months after bite)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">✓</span>
                  <span><strong>Fever:</strong> Often accompanies tick-borne illness</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Think Your Pet Has Fleas or Ticks?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get professional help from a veterinarian who can prescribe the most effective treatment.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/united-kingdom">
                Find veterinary care near you →
              </Link>
            </Button>
          </div>
        </section>

        {/* Prevention Methods */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Shield className="h-7 w-7 text-cpCoral" />
            Prevention Methods: Which is Best for Your Pet?
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Prevention is far easier and cheaper than treating an infestation. Here are the main options:
          </p>

          <div className="space-y-4 mb-6">
            {/* Topical Treatments */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Topical Spot-On Treatments</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Liquid medication applied monthly to the skin between shoulder blades. Kills fleas and ticks on contact.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <p className="text-xs font-bold text-foreground dark:text-cpCream mb-1">Pros:</p>
                      <p className="text-xs text-muted-foreground dark:text-cpCream/70">• Fast-acting (kills within 24 hours)<br/>• Waterproof after 24-48 hours<br/>• Cost-effective</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                      <p className="text-xs font-bold text-foreground dark:text-cpCream mb-1">Cons:</p>
                      <p className="text-xs text-muted-foreground dark:text-cpCream/70">• Greasy spot for 24-48 hours<br/>• Can't bathe pet for 48 hours<br/>• Some pets lick it off</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground dark:text-cpCream"><strong>Popular Brands:</strong> Frontline, Advantage, Revolution</p>
                </div>
              </div>
            </div>

            {/* Oral Medications */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Oral Chewable Tablets</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Flavoured tablets given monthly (or every 3 months). Kills fleas and ticks when they bite.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <p className="text-xs font-bold text-foreground dark:text-cpCream mb-1">Pros:</p>
                      <p className="text-xs text-muted-foreground dark:text-cpCream/70">• No mess or residue<br/>• Can bathe immediately<br/>• Very effective<br/>• Child-safe (no skin contact)</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                      <p className="text-xs font-bold text-foreground dark:text-cpCream mb-1">Cons:</p>
                      <p className="text-xs text-muted-foreground dark:text-cpCream/70">• More expensive<br/>• Requires prescription<br/>• Some pets won't eat tablets</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground dark:text-cpCream"><strong>Popular Brands:</strong> Bravecto (3 months), NexGard, Simparica</p>
                </div>
              </div>
            </div>

            {/* Flea Collars */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Flea and Tick Collars</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Collar releases chemicals that repel and kill fleas/ticks for up to 8 months.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <p className="text-xs font-bold text-foreground dark:text-cpCream mb-1">Pros:</p>
                      <p className="text-xs text-muted-foreground dark:text-cpCream/70">• Long-lasting (6-8 months)<br/>• Convenient<br/>• Waterproof</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                      <p className="text-xs font-bold text-foreground dark:text-cpCream mb-1">Cons:</p>
                      <p className="text-xs text-muted-foreground dark:text-cpCream/70">• Skin irritation in some pets<br/>• Not safe for children to touch<br/>• Can get caught on objects</p>
                    </div>
                  </div>
                  <p className="text-xs text-foreground dark:text-cpCream"><strong>Popular Brands:</strong> Seresto, Scalibor</p>
                </div>
              </div>
            </div>

            {/* Sprays & Shampoos */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Sprays, Shampoos & Natural Remedies</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Kill fleas on contact but provide no long-term protection. Best for active infestations.
                  </p>
                  <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Use for:</strong> Immediate relief during active infestation, then switch to monthly prevention. Natural remedies (neem oil, diatomaceous earth) are less effective than veterinary products.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>💡 Vet Recommendation:</strong> Oral chewables (like Bravecto or NexGard) are currently the gold standard for effectiveness, convenience, and safety. Always consult your vet before starting any prevention method.
            </p>
          </div>
        </section>

        {/* How to Remove a Tick */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            How to Safely Remove a Tick
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Step-by-Step Removal:</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/80">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral text-white flex items-center justify-center text-xs font-bold">1</span>
                <span><strong>Use fine-tipped tweezers or a tick removal tool:</strong> Grasp the tick as close to the skin as possible (at the head, not the body).</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/80">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral text-white flex items-center justify-center text-xs font-bold">2</span>
                <span><strong>Pull straight up with steady pressure:</strong> Don't twist or jerk—this can break off the head.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/80">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral text-white flex items-center justify-center text-xs font-bold">3</span>
                <span><strong>Clean the bite area:</strong> Use antiseptic on both the bite site and your hands.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/80">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral text-white flex items-center justify-center text-xs font-bold">4</span>
                <span><strong>Dispose of the tick:</strong> Seal in tape or a container with alcohol. Never crush with fingers.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground dark:text-cpCream/80">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral text-white flex items-center justify-center text-xs font-bold">5</span>
                <span><strong>Monitor your pet:</strong> Watch for signs of illness (lethargy, fever, lameness) for 2-3 months.</span>
              </li>
            </ol>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground dark:text-cpCream">
                <strong>Never use:</strong> Petroleum jelly, nail polish, matches, or alcohol to "suffocate" the tick. These methods don't work and can cause the tick to regurgitate bacteria into the wound.
              </p>
            </div>
          </div>
        </section>

        {/* Treating Your Home */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Treating Your Home for Flea Infestation
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Remember: 95% of a flea infestation lives in your home (carpets, bedding, furniture), not on your pet. You must treat both simultaneously.
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">7-Day Home Treatment Plan:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">Day 1:</span>
                <span><strong>Vacuum thoroughly:</strong> All carpets, rugs, furniture, crevices. Dispose of vacuum bag immediately.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">Day 1:</span>
                <span><strong>Wash all bedding:</strong> Pet beds, blankets, your bedding, throws—hot water (60°C+).</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">Day 1-2:</span>
                <span><strong>Apply flea spray to home:</strong> Use veterinary-approved household flea spray on carpets and furniture.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">Day 3, 7, 14:</span>
                <span><strong>Repeat vacuuming:</strong> Every 2-3 days for 2 weeks to remove newly hatched fleas.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">Ongoing:</span>
                <span><strong>Maintain prevention:</strong> Keep your pet on monthly flea prevention year-round.</span>
              </li>
            </ul>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Timeline:</strong> It takes 2-4 months to fully eliminate a flea infestation from your home due to the flea life cycle. Be patient and consistent with treatment.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            More About Pet Health
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/pet-health/deworming-dogs-cats" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Deworming Your Dog and Cat</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Parasite prevention guide →</p>
            </Link>
            <Link href="/en/guide/pet-health/when-to-see-vet" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">When to Take Your Pet to the Vet</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Warning signs to watch for →</p>
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
                Do indoor pets need flea prevention?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes! Fleas can enter your home on your clothing, shoes, or through open doors/windows. Other pets, rodents, or even visiting pets can introduce fleas. Indoor pets may not need tick prevention if they truly never go outside, but year-round flea prevention is recommended for all pets.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I use dog flea treatment on my cat?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                NEVER! Dog flea products (especially those containing permethrin or pyrethrin) can be FATAL to cats. Cats metabolise chemicals differently than dogs. Always use species-specific products labelled for cats only. If you have both dogs and cats, keep them separated for 24 hours after applying dog treatments.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How long does it take to get rid of fleas?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Adult fleas on your pet die within 24-48 hours of treatment, but flea eggs and pupae in your home can take 2-4 months to fully eliminate. You may see new fleas hatching during this time—this is normal. Continue monthly prevention and home cleaning for at least 3 months to break the life cycle completely.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What time of year are fleas and ticks worst?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Fleas thrive in warm, humid conditions (spring through autumn), but can survive year-round indoors thanks to central heating. Ticks are most active in spring (April-May) and autumn (September-November). However, with climate change and mild winters, vets now recommend year-round prevention for both parasites.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need professional advice on flea and tick prevention?
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
            "headline": "Fleas and Ticks Prevention for Pets: Complete Treatment & Control Guide",
            "description": "Complete guide to preventing and treating fleas and ticks on dogs and cats. Learn about prevention methods, treatment options, and year-round protection.",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-health/fleas-ticks-pets"
            }
          })
        }}
      />
    </div>
  );
}

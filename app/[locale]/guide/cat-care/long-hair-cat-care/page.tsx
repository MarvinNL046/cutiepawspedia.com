/**
 * SEO Landing Page: Long Hair Cat Grooming and Care
 * Pillar: Cat Care (Pillar 2)
 * Target: English-speaking owners of long-haired cats
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cat, Sparkles, CheckCircle2, AlertTriangle, Scissors, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Long Hair Cat Grooming and Care: Complete Guide 2025",
  description: "Master long-haired cat care with our expert grooming guide. Learn daily brushing routines, mat prevention, bathing tips, and seasonal care for Persian, Maine Coon, and Ragdoll cats.",
  keywords: [
    "long hair cat care",
    "Persian cat grooming",
    "Maine Coon care",
    "long haired cat grooming",
    "prevent cat matting",
    "fluffy cat care",
    "Ragdoll grooming",
    "long hair cat brushing"
  ],
  alternates: {
    canonical: "https://cutiepawspedia.com/en/guide/cat-care/long-hair-cat-care",
    languages: {
      'en': "https://cutiepawspedia.com/en/guide/cat-care/long-hair-cat-care",
      'nl': "https://cutiepawspedia.com/nl/gids/kattenverzorging/langhaar-katten-verzorgen"
    }
  },
  openGraph: {
    title: "Long Hair Cat Grooming and Care: Complete Guide",
    description: "Expert grooming tips for long-haired cat breeds. Prevent matting and keep your fluffy cat healthy.",
    type: "article",
  },
};

export default function LongHairCatCare() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Cat className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Cat Care</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Long Hair Cat Grooming and Care: Complete Guide
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Long-haired cats are stunning but require dedicated grooming to prevent painful matting and maintain coat health. Learn the daily routines, tools, and techniques that keep Persian, Maine Coon, Ragdoll, and other fluffy breeds looking their best.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              ✂️ Struggling with matted fur or grooming challenges?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=grooming">
                Find professional cat groomers →
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
            Long-haired cats are among the most beautiful felines, but their luxurious coats demand significantly more care than short-haired breeds. Without proper daily grooming, long hair quickly becomes matted, causing skin irritation, pain, and potential health issues.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This comprehensive guide covers everything you need to know: daily brushing routines, the right tools for different coat types, mat prevention and removal, bathing techniques, and seasonal care considerations for long-haired breeds.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Time commitment:</strong> Expect to spend 10-15 minutes daily grooming a long-haired cat. This is non-negotiable for breeds like Persians, Himalayans, and Maine Coons.
            </p>
          </div>
        </section>

        {/* Breeds */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Cat className="h-7 w-7 text-cpCoral" />
            Long-Haired Cat Breeds
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Ultra-Long Hair (Highest Maintenance)</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Persian:</strong> Dense, silky coat, daily grooming essential, prone to matting around face and legs</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Himalayan:</strong> Persian-type coat with colorpoint pattern, same high-maintenance needs</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Chinchilla:</strong> Thick undercoat, requires expert grooming technique</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Long Hair (Moderate-High Maintenance)</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Maine Coon:</strong> Water-resistant coat, less prone to matting but needs daily brushing</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Ragdoll:</strong> Semi-long silky coat, moderate matting risk, easier to maintain than Persian</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Norwegian Forest Cat:</strong> Double coat with water-repellent guard hairs, seasonal shedding</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Siberian:</strong> Triple-layered coat, heavy seasonal shedding in spring/autumn</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Turkish Angora:</strong> Fine, silky coat without undercoat - easier to maintain</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Essential Tools */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Scissors className="h-7 w-7 text-cpCoral" />
            Essential Grooming Tools
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">1. Metal Comb (Wide and Fine-Toothed)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Primary tool for long-haired cats.</strong> Wide teeth for initial detangling, fine teeth for checking for hidden mats and finishing. Stainless steel is best - doesn't create static.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Use wide teeth first to remove tangles</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Follow with fine teeth to ensure no mats missed</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Essential for facial area grooming</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">2. Slicker Brush</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Fine wire bristles bent at angles. Perfect for removing loose undercoat and preventing mats. Use gently - can scratch skin if pressed too hard. Self-cleaning versions save time.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">3. Undercoat Rake or De-Shedder</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Removes dead undercoat hair that causes matting. Use 1-2 times per week during shedding season (spring/autumn). NOT for daily use - can damage coat if overused.
              </p>
              <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Warning:</strong> Don't use on Angoras or other breeds without thick undercoats</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">4. Mat Splitter or Mat Rake</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Sharp blades that slice through mats vertically. Safer than scissors. Essential for Persian and Himalayan owners. Use with extreme caution near skin.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">5. Grooming Spray (Detangler)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Light conditioning spray makes brushing easier and reduces static. Spray lightly before brushing sessions. Choose cat-safe, unscented formula.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">6. Pet-Safe Scissors (Round-Tipped)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                For trimming fur around paws, bottom, and sanitary areas. Round tips prevent accidental injury. Only use if confident - otherwise leave to professional groomers.
              </p>
            </div>
          </div>
        </section>

        {/* Daily Routine */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-cpCoral" />
            Daily Grooming Routine
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Step 1: Choose a Calm Time (5 minutes)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                After meals or when cat is naturally relaxed. Make it a pleasant routine with treats. Never force grooming when cat is agitated.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Step 2: Initial Check and Detangle (3 minutes)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Feel for any new mats or tangles. Focus on high-risk areas: behind ears, armpits, belly, inner thighs, base of tail. Gently work through tangles with wide-toothed comb.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Technique:</strong> Hold mat base with fingers, comb from tip toward base to avoid pulling skin</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Step 3: Brush with Slicker Brush (5 minutes)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Work in sections: back, sides, chest, legs, tail. Brush in direction of hair growth. Use gentle strokes - you're removing loose hair, not scratching skin.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70"><strong>Order:</strong> Back → Sides → Chest → Front legs → Belly (if tolerated) → Back legs → Tail</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Step 4: Comb Through (2 minutes)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Run fine-toothed comb through entire coat. If comb catches, there's still a mat. This final check ensures no tangles were missed.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Step 5: Facial and Paw Care (2 minutes)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Gently comb around face, especially under chin and behind ears. Check between paw pads for stuck litter or fur balls. Trim if needed.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Persian owners:</strong> Daily eye cleaning with damp cotton wool to prevent tear staining</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Step 6: Reward and Check (1 minute)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Give treats and praise. Run hands over coat to check for lumps, bumps, or skin issues. This daily health check can detect problems early.
              </p>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4 mt-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Total time:</strong> 15-20 minutes daily for ultra-long coats, 10-15 minutes for moderate long hair. Consistency prevents mat formation - missing even 2-3 days can result in tangles.
            </p>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Matted Fur or Overwhelmed by Grooming?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Professional groomers can remove severe mats, teach you proper technique, and provide regular maintenance grooming.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=grooming">
                Find expert groomers near you →
              </Link>
            </Button>
          </div>
        </section>

        {/* Mat Prevention */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-cpCoral" />
            Mat Prevention and Removal
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">High-Risk Mat Zones</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">Check these areas DAILY:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Behind ears:</strong> Friction from scratching causes tangles</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Armpits (front and back legs):</strong> Movement creates mats</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Belly and groin:</strong> Lying down compresses fur</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Base of tail:</strong> High oil production area</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Hind leg "trousers":</strong> Litter box contact causes tangles</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Small Mat Removal (DO)</h3>
              <ol className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral font-bold min-w-5">1.</span>
                  <span>Sprinkle mat with cornstarch or grooming powder</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral font-bold min-w-5">2.</span>
                  <span>Gently pull mat apart with fingers, working from outside toward centre</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral font-bold min-w-5">3.</span>
                  <span>Use wide-toothed comb to work through loosened fur</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral font-bold min-w-5">4.</span>
                  <span>Hold skin taut to prevent pulling</span>
                </li>
              </ol>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Severe Mat Removal (DON'T)</h3>
              <p className="text-sm text-foreground dark:text-cpCream mb-3">
                <strong>NEVER attempt to cut mats with scissors yourself.</strong> Skin underneath is paper-thin and easy to cut. One mistake can require stitches.
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Mats close to skin or larger than a 20p coin require professional grooming. Options:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Professional groomer:</strong> Can safely shave mats with clippers</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Vet clinic:</strong> For severe matting requiring sedation</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertTriangle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>"Lion cut":</strong> Full body shave leaving mane - grows back in 3-6 months</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bathing */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Bathing Long-Haired Cats
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              <strong>Frequency:</strong> Every 4-6 weeks for Persians and Himalayans; every 2-3 months for Maine Coons and Ragdolls; as needed for other long-haired breeds.
            </p>

            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 mt-4">Critical Pre-Bath Rule:</h3>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground dark:text-cpCream">
                <strong>ALWAYS brush completely BEFORE bathing.</strong> Water makes existing mats tighter and nearly impossible to remove. Fully detangle first.
              </p>
            </div>

            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Bathing Process:</h3>
            <ol className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral font-bold min-w-5">1.</span>
                <span>Use cat-specific shampoo (human shampoo damages coat pH)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral font-bold min-w-5">2.</span>
                <span>Water temperature: lukewarm (test on your wrist)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral font-bold min-w-5">3.</span>
                <span>Wet thoroughly, apply diluted shampoo, work into lather</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral font-bold min-w-5">4.</span>
                <span>Rinse completely - residual shampoo causes skin irritation</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral font-bold min-w-5">5.</span>
                <span>Towel dry gently (no rubbing - causes tangles)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral font-bold min-w-5">6.</span>
                <span>Use low-heat hairdryer while brushing (some cats tolerate this, others don't)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral font-bold min-w-5">7.</span>
                <span>Brush again once completely dry to prevent mat formation</span>
              </li>
            </ol>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-3">
              <p className="text-xs text-foreground dark:text-cpCream"><strong>Alternative:</strong> Many owners use professional groomers for bathing - they have proper equipment and experience handling resistant cats.</p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Cat Care Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/cat-care/brushing-cats" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">How to Brush Your Cat Properly</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">General brushing guide →</p>
            </Link>
            <Link href="/en/guide/cat-care/trimming-cat-nails" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">How to Trim Your Cat's Nails Safely</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete nail care →</p>
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
                Can I shave my long-haired cat for summer?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Generally not recommended unless medically necessary or severely matted. A cat's coat actually provides insulation from both heat and cold. Shaving can cause sunburn, skin irritation, and sometimes the coat grows back different texture or colour. Instead, increase brushing frequency during summer to remove excess undercoat. Exception: "lion cuts" for Persian cats living in very hot climates or those with chronic matting issues - consult your vet first.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How much grooming is too much?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Daily brushing for 10-20 minutes is ideal and not excessive. However, aggressive or prolonged brushing (over 30 minutes) can cause brush burn, remove too much coat, and stress your cat. Signs of over-grooming: bald patches, red irritated skin, cat becoming aggressive during grooming. Quality technique matters more than duration - gentle, consistent daily sessions beat occasional marathon grooming.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My Persian cat has tear stains. How do I remove them?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Daily facial cleaning with damp cotton wool or special tear stain wipes. Wipe from inner corner outward. For stubborn stains, use commercial tear stain remover formulated for cats. Prevention is key: clean daily to prevent build-up. Excessive tearing can indicate blocked tear ducts or eye infection - if persistent despite cleaning, see your vet. Some Persians require tear duct flushing procedure by vet. Never use bleach-based human products.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I take my long-haired cat to a professional groomer?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Even with daily home grooming, professional grooming every 6-8 weeks is beneficial for ultra-long breeds like Persians. Professionals can: reach areas you can't (sanitary trim), safely remove stubborn mats, provide deep cleaning baths, trim fur pads between toes, and catch skin issues early. Think of it as maintenance - like a car service. Regular professional grooming plus your daily brushing keeps coat in optimal condition and prevents emergency mat removal situations.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need professional grooming or more cat care advice?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en">
                Explore all services →
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
            "headline": "Long Hair Cat Grooming and Care: Complete Guide",
            "description": "Master long-haired cat care with our expert grooming guide. Learn daily brushing routines, mat prevention, bathing tips, and seasonal care for Persian, Maine Coon, and Ragdoll cats.",
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
              "@id": "https://cutiepawspedia.com/en/guide/cat-care/long-hair-cat-care"
            }
          })
        }}
      />
    </div>
  );
}

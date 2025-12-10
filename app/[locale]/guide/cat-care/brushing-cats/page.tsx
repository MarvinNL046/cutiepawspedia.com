/**
 * SEO Landing Page: How to Brush Your Cat Properly
 * Pillar: Cat Care (Pillar 2)
 * Target: English-speaking cat owners learning grooming
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cat, Sparkles, Heart, CheckCircle2, AlertCircle, Scissors } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Brush Your Cat Properly: Complete Grooming Guide 2025",
  description: "Learn the right way to brush your cat with expert techniques for short and long-haired cats. Reduce shedding, prevent matting, and make grooming enjoyable for your feline.",
  keywords: [
    "how to brush a cat",
    "cat brushing guide",
    "cat grooming tips",
    "reduce cat shedding",
    "brush long haired cat",
    "cat grooming tools",
    "prevent matting cats",
    "cat brush types"
  ],
  alternates: {
    canonical: "https://cutiepawspedia.com/en/guide/cat-care/brushing-cats",
    languages: {
      'en': "https://cutiepawspedia.com/en/guide/cat-care/brushing-cats",
      'nl': "https://cutiepawspedia.com/nl/gids/kattenverzorging/katten-borstelen"
    }
  },
  openGraph: {
    title: "How to Brush Your Cat Properly: Complete Grooming Guide",
    description: "Expert cat brushing techniques to reduce shedding, prevent matting, and bond with your feline friend.",
    type: "article",
  },
};

export default function BrushingCats() {
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
            How to Brush Your Cat Properly: Complete Grooming Guide
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Regular brushing keeps your cat's coat healthy, reduces shedding, prevents painful matting, and strengthens your bond. Learn the techniques that work for every coat type.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              ✂️ Need professional grooming for your cat?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=grooming">
                Find cat groomers near you →
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
            While cats are meticulous self-groomers, they still need your help to maintain a healthy coat. Regular brushing removes dead hair, distributes natural oils, prevents hairballs, and gives you valuable bonding time with your feline friend.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            The key to successful cat brushing is using the right tools, choosing the right frequency for your cat's coat type, and making the experience positive. This guide covers everything you need to know.
          </p>
        </section>

        {/* Brush Types */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Scissors className="h-7 w-7 text-cpCoral" />
            Choosing the Right Brush
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">1. Slicker Brush</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> All coat types, especially medium to long hair
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Fine wire bristles bent at angles to penetrate thick coats</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Removes loose undercoat, prevents matting, and reduces shedding</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Use gently - can scratch skin if pressed too hard</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">2. Metal Comb</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> Long-haired cats, checking for mats, final grooming
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Wide and narrow tooth options for different areas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Perfect for facial area, tail, and detecting hidden tangles</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Essential tool for Persian, Maine Coon, and other long-haired breeds</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">3. Bristle Brush</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> Short-haired cats, finishing touch, distributing oils
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Natural or nylon bristles that smooth and shine the coat</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Great for cats who dislike metal brushes</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Ideal for sensitive cats and kittens</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">4. De-shedding Tool (FURminator style)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> Heavy shedding periods, undercoat removal
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Removes up to 90% of loose undercoat hair</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Use ONLY once or twice weekly - overuse can damage coat</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <AlertCircle className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>Not suitable for cats without undercoat (Siamese, Burmese, etc.)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">5. Grooming Glove</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> Cats who hate traditional brushes, bonding time
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Rubber nubs that feel like petting</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Perfect for nervous or brush-shy cats</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Less effective than brushes but better than nothing</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-cpCoral" />
            Step-by-Step Brushing Technique
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Choose the Right Time</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Brush when your cat is relaxed - after a meal or play session. Never force an agitated cat. Start with short 5-minute sessions and gradually increase duration.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Best times:</strong> After meals, during quiet evening time, when cat is already lounging</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Start with Petting</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Begin with gentle strokes using your hand. This helps your cat relax and associate brushing time with positive attention. Talk softly and maintain a calm environment.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Tip:</strong> Place treats nearby as positive reinforcement</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Brush in the Direction of Hair Growth</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Always brush with the grain, from head to tail. Use long, gentle strokes. Start with areas your cat enjoys being touched: head, cheeks, chin, and back.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Brushing order:</strong> Head → Neck → Back → Sides → Legs → Tail → Belly (if tolerated)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Pay Special Attention to Problem Areas</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Focus on mat-prone zones: behind ears, armpits, belly, and lower back near tail. Use a comb to gently work through any tangles. Never pull or yank.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Mat prevention:</strong> Check these areas daily for long-haired cats</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">5</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Finish with Praise and Treats</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    End on a positive note. Give treats, verbal praise, or playtime. This creates a positive association with brushing. If cat becomes agitated, stop and try again later.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Building tolerance:</strong> Gradually increase session length over weeks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Struggling with Matted Fur or Grooming Challenges?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Professional cat groomers can help with difficult mats, lion cuts, and teaching you proper technique.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=grooming">
                Find professional groomers →
              </Link>
            </Button>
          </div>
        </section>

        {/* Brushing Frequency */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            How Often Should You Brush?
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Short-Haired Cats</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Frequency:</strong> 1-2 times per week
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                <strong>Breeds:</strong> British Shorthair, Burmese, Russian Blue, American Shorthair, Siamese
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Short-haired cats are low-maintenance but still benefit from weekly brushing to remove loose hair and distribute oils. Increase to daily during heavy shedding seasons (spring and autumn).
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Medium-Haired Cats</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Frequency:</strong> 2-3 times per week
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                <strong>Breeds:</strong> Ragdoll, Turkish Angora, Somali, American Curl
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Medium coats can develop tangles if neglected. Regular brushing prevents mats and reduces hairballs. Daily brushing during moulting season.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Long-Haired Cats</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Frequency:</strong> Daily brushing essential
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                <strong>Breeds:</strong> Persian, Maine Coon, Norwegian Forest Cat, Himalayan
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Daily brushing is non-negotiable for long-haired breeds. Missing even 2-3 days can result in painful mats that require professional grooming or shaving.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Hairless Cats</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Frequency:</strong> Weekly bathing instead
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                <strong>Breeds:</strong> Sphynx, Peterbald, Donskoy
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Hairless cats don't need brushing but require weekly baths with gentle wipes to remove oil buildup. Ear cleaning is also essential.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Benefits of Regular Brushing
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Reduces Shedding</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Removes loose hair before it ends up on furniture and clothes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Prevents Hairballs</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Less loose hair ingested during self-grooming</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Distributes Natural Oils</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Creates shiny, healthy coat and reduces dry skin</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Prevents Matting</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Avoids painful tangles that pull on skin</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Health Monitoring</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Helps detect lumps, skin issues, fleas, or ticks early</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Bonding Time</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Strengthens relationship through positive physical contact</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Cat Care Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/cat-care/long-hair-cat-care" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Long Hair Cat Grooming and Care</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete guide for fluffy cats →</p>
            </Link>
            <Link href="/en/guide/cat-care/trimming-cat-nails" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">How to Trim Your Cat's Nails Safely</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Step-by-step nail care →</p>
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
                My cat hates being brushed. What can I do?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Start very slowly with short 30-second sessions. Use a grooming glove that feels like petting. Offer high-value treats during and after. Brush only their favourite areas initially (usually head and chin). Never force it - stop if they become stressed. Build up tolerance gradually over weeks. Some cats prefer being brushed with a damp cloth or rubber grooming mitt instead of traditional brushes.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How do I remove mats without cutting the fur?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                For small, loose mats: sprinkle with cornstarch, gently work fingers through the mat to separate hairs, then use a wide-toothed comb. Work from the outside of the mat inward. For tight mats close to skin: DO NOT CUT WITH SCISSORS (high risk of cutting skin). Use professional mat splitters or take to a groomer. Severe matting may require sedation and shaving by a vet. Prevention through daily brushing is far easier than mat removal.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I bathe my cat before or after brushing?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Always brush BEFORE bathing. Brushing removes loose hair and works out tangles - water makes mats tighter and harder to remove. Thoroughly brush your cat, then bathe if needed (most cats don't require baths). After bathing, brush again once the coat is completely dry to prevent new tangles from forming as the fur dries.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is it normal for my cat to shed more during certain seasons?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, completely normal. Cats typically shed heavily twice a year: spring (losing winter coat) and autumn (preparing for winter). Indoor cats may shed year-round due to artificial lighting and heating affecting their natural cycle. Increase brushing frequency during these periods - daily brushing during heavy shed can dramatically reduce loose hair around your home.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need more cat care advice or grooming services?
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
            "headline": "How to Brush Your Cat Properly: Complete Grooming Guide",
            "description": "Learn the right way to brush your cat with expert techniques for short and long-haired cats. Reduce shedding, prevent matting, and make grooming enjoyable.",
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
              "@id": "https://cutiepawspedia.com/en/guide/cat-care/brushing-cats"
            }
          })
        }}
      />
    </div>
  );
}

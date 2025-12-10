/**
 * SEO Landing Page: How to Litter Box Train Your Kitten
 * Pillar: Cat Care (Pillar 2)
 * Target: English-speaking cat owners training kittens
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cat, CheckCircle2, AlertTriangle, Home, Sparkles, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Litter Box Train Your Kitten: Complete Guide 2025",
  description: "Master kitten litter box training with our step-by-step guide. Learn timing, placement, common mistakes, and troubleshooting tips for successful toilet training.",
  keywords: [
    "litter box training kitten",
    "kitten toilet training",
    "how to train kitten litter box",
    "kitten not using litter box",
    "litter box placement",
    "kitten training tips",
    "house train kitten",
    "litter box problems"
  ],
  alternates: {
    canonical: "https://cutiepawspedia.com/en/guide/cat-care/litter-box-training-kitten",
    languages: {
      'en': "https://cutiepawspedia.com/en/guide/cat-care/litter-box-training-kitten",
      'nl': "https://cutiepawspedia.com/nl/gids/kattenverzorging/kattenbak-training-kitten"
    }
  },
  openGraph: {
    title: "How to Litter Box Train Your Kitten: Complete Guide",
    description: "Step-by-step kitten litter box training guide with expert tips and troubleshooting advice.",
    type: "article",
  },
};

export default function LitterBoxTrainingKitten() {
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
            How to Litter Box Train Your Kitten: Complete Guide
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Training your kitten to use a litter box is usually straightforward, but success depends on the right setup, timing, and patience. Learn the proven methods that work every time.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🐱 Need professional advice for your kitten's behaviour?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=training">
                Find cat trainers near you →
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
            Good news: most kittens instinctively understand how to use a litter box by around 3-4 weeks of age. They learn from their mother and have a natural inclination to bury their waste. Your job is simply to provide the right environment and reinforce positive habits.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This comprehensive guide covers everything from choosing the right litter box setup to troubleshooting common problems. Whether you have an 8-week-old kitten or an older rescue, these techniques will help establish reliable litter box habits.
          </p>
        </section>

        {/* The Essentials */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-cpCoral" />
            Essential Supplies for Success
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">1. The Right Litter Box</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Size:</strong> Large enough for kitten to turn around easily (minimum 1.5x kitten's length)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Sides:</strong> Low enough for easy entry (under 6cm for young kittens)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Type:</strong> Uncovered box initially (kittens may be scared of enclosed boxes)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">2. Litter Type</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Clumping clay litter:</strong> Most popular, easy to clean (safe for kittens 8+ weeks)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Non-clumping:</strong> Safer for very young kittens who might ingest litter</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Depth:</strong> 5-7cm deep - enough to dig but not overwhelming</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Scent:</strong> Unscented is best (cats have sensitive noses)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">3. Location, Location, Location</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Quiet area:</strong> Away from loud appliances, foot traffic, and the kitten's food</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Easy access:</strong> No stairs or obstacles for young kittens</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Multiple boxes:</strong> At least one per floor in multi-storey homes</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Privacy:</strong> Not too hidden, but not in main living areas</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Expert tip:</strong> The "plus one" rule - have one more litter box than the number of cats. For one kitten, have two boxes in different locations.
            </p>
          </div>
        </section>

        {/* Step-by-Step Training */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Clock className="h-7 w-7 text-cpCoral" />
            Step-by-Step Training Process
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Introduction (Day 1)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Place your kitten in the litter box within 30 minutes of arriving home. Let them sniff and explore. Gently take their paw and make a digging motion (don't force it). Keep sessions calm and positive.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>What to expect:</strong> Most kittens will naturally start digging and may use the box immediately</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Timing is Everything (Week 1)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Place kitten in litter box at key times: after waking up, after eating, after play sessions, and when you notice sniffing/circling behaviour. Kittens typically need to eliminate 15-30 minutes after meals.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Signs they need to go:</strong> Sniffing ground, circling, meowing, squatting, scratching at floor</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Positive Reinforcement (Ongoing)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Praise quietly when kitten uses the box correctly. A gentle "good girl/boy" is enough - don't startle them mid-use. NEVER punish for accidents. Clean accidents with enzyme cleaner to remove scent markers.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Important:</strong> Don't disturb kitten while they're using the box - let them finish in peace</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Maintenance Routine (Daily)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Scoop waste twice daily (morning and evening). Completely change litter and wash box with mild soap weekly. Cats are fastidious - a dirty box is the #1 reason for litter box avoidance.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Cleanliness rule:</strong> If you can smell the box, it's too dirty for your cat</p>
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
              Need Expert Advice for Your Kitten?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Find experienced cat behaviourists and trainers who can help with litter box problems and kitten socialisation.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Browse cat trainers in your area →
              </Link>
            </Button>
          </div>
        </section>

        {/* Common Problems */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-cpCoral" />
            Troubleshooting Common Problems
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Problem: Kitten Using Floor Instead of Box</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3"><strong>Possible causes:</strong></p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Box too dirty - scoop more frequently</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Box in wrong location - move to quieter spot</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Sides too high - switch to lower-sided box</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span>Medical issue - consult vet if persistent</span>
                </li>
              </ul>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Solution:</strong> Place kitten in box every hour during waking time, especially after meals. Temporarily confine to small room with box until habit established.</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Problem: Kitten Plays in Litter but Won't Eliminate</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                This is normal exploratory behaviour. Don't discourage it completely. Wait until kitten shows signs of needing to go (sniffing, circling), then place them in the box. They'll make the connection.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Problem: Kitten Eliminates Right Next to Box</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                This suggests the kitten understands the location but has an issue with the box itself. Try different litter type, ensure box is large enough, check for cleanliness, or try uncovered box if currently covered.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Problem: Suddenly Stopped Using Litter Box</h3>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-lg p-4 mb-3">
                <p className="text-sm text-foreground dark:text-cpCream">
                  <strong>Vet visit required:</strong> Sudden litter box avoidance can indicate urinary tract infection, constipation, or other medical issues. Schedule vet appointment within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            What to Expect: Training Timeline
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-cpCoral font-bold min-w-24">Week 1:</span>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Frequent accidents normal as kitten learns. Place in box 6-8 times daily. Success rate improves each day.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cpCoral font-bold min-w-24">Week 2:</span>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Most kittens consistently using box. Occasional accidents when distracted by play. Continue reinforcement.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cpCoral font-bold min-w-24">Week 3-4:</span>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Fully trained for most kittens. Accidents rare and usually due to medical issues or dirty box. Habit fully established.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cpCoral font-bold min-w-24">Older kittens:</span>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">12+ weeks old typically train faster (3-7 days). Better bladder control and previous exposure to litter.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            More Cat Care Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/cat-care/best-litter-boxes" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Best Litter Boxes for Every Cat</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Choosing the perfect litter box →</p>
            </Link>
            <Link href="/en/guide/cat-care/brushing-cats" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">How to Brush Your Cat Properly</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete grooming guide →</p>
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
                At what age can kittens use a litter box?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Kittens can start using a litter box as early as 3-4 weeks old. By 8 weeks (adoption age), most kittens have already learnt basic litter box habits from their mother. However, you'll still need to reinforce the behaviour in their new home environment.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How many litter boxes do I need for one kitten?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                The general rule is one litter box per cat, plus one extra. For a single kitten, have two boxes, ideally on different floors or in different rooms. This prevents accidents when one box is dirty or if the kitten can't reach their usual box in time.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I use clumping litter for kittens?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Clumping litter is safe for kittens 8 weeks and older. For younger kittens (under 8 weeks), use non-clumping litter as they may try to eat the litter and clumping varieties can cause digestive blockages. Always supervise very young kittens initially.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Why is my kitten eating litter?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Litter eating (pica) in kittens can indicate nutritional deficiency, anaemia, or curiosity. Switch to non-clumping, natural litter temporarily. If behaviour persists beyond 2 weeks or kitten seems unwell, consult your vet for blood tests. Most kittens grow out of this behaviour by 12 weeks.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I use a covered or uncovered litter box?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Start with an uncovered box for kittens. Covered boxes can trap odours (which cats dislike), and some kittens feel trapped or scared inside them. Once your kitten is confidently using an open box, you can experiment with a covered option if desired, but many cats prefer open boxes throughout their lives.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Looking for more kitten care advice and professional services?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en">
                Explore all pet services →
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
            "headline": "How to Litter Box Train Your Kitten: Complete Guide",
            "description": "Master kitten litter box training with our step-by-step guide. Learn timing, placement, common mistakes, and troubleshooting tips for successful toilet training.",
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
              "@id": "https://cutiepawspedia.com/en/guide/cat-care/litter-box-training-kitten"
            }
          })
        }}
      />
    </div>
  );
}

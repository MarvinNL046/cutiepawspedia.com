/**
 * SEO Landing Page: Best Litter Boxes for Every Cat
 * Pillar: Cat Care (Pillar 2)
 * Target: English-speaking cat owners choosing litter boxes
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cat, Home, CheckCircle2, Star, Box, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Litter Boxes for Every Cat: Complete Buying Guide 2025",
  description: "Find the perfect litter box for your cat. Compare types, sizes, features, and prices. Expert reviews of top-rated covered, self-cleaning, and large litter boxes.",
  keywords: [
    "best litter box",
    "cat litter box reviews",
    "self-cleaning litter box",
    "large litter box",
    "covered litter box",
    "automatic litter box",
    "litter box comparison",
    "best litter box for cats"
  ],
  alternates: {
    canonical: "https://cutiepawspedia.com/en/guide/cat-care/best-litter-boxes",
    languages: {
      'en': "https://cutiepawspedia.com/en/guide/cat-care/best-litter-boxes",
      'nl': "https://cutiepawspedia.com/nl/gids/kattenverzorging/beste-kattenbakken"
    }
  },
  openGraph: {
    title: "Best Litter Boxes for Every Cat: Complete Buying Guide",
    description: "Expert litter box reviews and recommendations for every cat and budget.",
    type: "article",
  },
};

export default function BestLitterBoxes() {
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
            Best Litter Boxes for Every Cat: Complete Buying Guide
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Choosing the right litter box is crucial for your cat's comfort and your home's cleanliness. Compare types, features, and find the perfect fit for your feline's needs and habits.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🏠 Need professional help with litter box issues?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=training">
                Find cat behaviourists near you →
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
            The litter box is your cat's bathroom, and getting it wrong can lead to avoidance, accidents, and stress. With hundreds of options available, from basic trays to high-tech self-cleaning systems, choosing the right one depends on your cat's size, age, preferences, and your lifestyle.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This guide covers every litter box type, key features to consider, and recommendations for specific situations - whether you have kittens, senior cats, large breeds, or multiple cats.
          </p>
        </section>

        {/* Key Factors */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Box className="h-7 w-7 text-cpCoral" />
            Key Factors When Choosing a Litter Box
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">1. Size Matters</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Rule of thumb:</strong> Litter box should be 1.5x your cat's length (nose to base of tail)
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Small cats/kittens:</strong> 40x30cm minimum</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Average cats:</strong> 50x40cm ideal</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Large breeds (Maine Coon, Ragdoll):</strong> 60x50cm+ essential</span>
                </li>
              </ul>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3 mt-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Critical:</strong> Bigger is always better. Most litter box problems stem from boxes that are too small.</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">2. Entry Height</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Kittens:</strong> Under 5cm for easy access</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Adult healthy cats:</strong> 10-15cm standard</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Senior cats/arthritis:</strong> Under 10cm or low-entry design</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">3. Covered vs. Uncovered</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-2">Covered (Hooded)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">Pros:</p>
                  <ul className="space-y-1 mb-3">
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Contains odours better for you</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>More privacy</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Reduces litter scatter</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">Cons:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Traps odours for cat</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Some cats feel trapped</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Harder to clean</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-2">Uncovered (Open)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">Pros:</p>
                  <ul className="space-y-1 mb-3">
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Better ventilation</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Easier to clean</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Most cats prefer it</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">Cons:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>More visible to guests</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Litter tracks more</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-muted-foreground dark:text-cpCream/70">
                      <span className="text-cpCoral mt-0.5">•</span>
                      <span>Less privacy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Litter Boxes */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Star className="h-7 w-7 text-cpCoral" />
            Types of Litter Boxes Reviewed
          </h2>

          <div className="space-y-6">
            {/* Standard Open */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream">Standard Open Tray</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                  <span className="text-sm font-bold text-cpAmber">4.5/5</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> Most cats, first-time owners, multi-cat households
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Simple rectangular plastic tray with low sides. The most popular and versatile option. Easy to clean, affordable, and preferred by most cats. Available in various sizes.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-foreground dark:text-cpCream mb-1">Pros</p>
                  <ul className="space-y-1">
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✓ Excellent ventilation</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✓ Easy to scoop</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✓ Affordable (£10-25)</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✓ Cat acceptance rate over 90%</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground dark:text-cpCream mb-1">Cons</p>
                  <ul className="space-y-1">
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✗ Litter tracking</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✗ No odour containment</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✗ Not aesthetically pleasing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* High-Sided */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream">High-Sided Box</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                  <span className="text-sm font-bold text-cpAmber">4.3/5</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> Cats who kick litter, stand-up urinators, messy cats
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Similar to standard but with 25-35cm tall walls. Prevents litter spray while maintaining open-top benefits. Great compromise between covered and open styles.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Price range:</strong> £20-40 | <strong>Recommended for:</strong> Large breeds, vigorous diggers</p>
              </div>
            </div>

            {/* Self-Cleaning */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream">Automatic Self-Cleaning</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                  <span className="text-sm font-bold text-cpAmber">4.0/5</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> Busy owners, multiple cats, those who travel frequently
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Automated rake or rotating mechanism cleans litter after each use. Deposits waste into sealed drawer. WiFi-enabled models send phone alerts. Premium investment that saves daily scooping time.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70 mb-2"><strong>Popular brands:</strong> Litter-Robot, PetSafe ScoopFree, CatGenie</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-foreground dark:text-cpCream mb-1">Pros</p>
                  <ul className="space-y-1">
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✓ Minimal maintenance</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✓ Always clean for cat</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✓ Odour control</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✓ Health tracking (some models)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground dark:text-cpCream mb-1">Cons</p>
                  <ul className="space-y-1">
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✗ Expensive (£300-600)</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✗ Noise can scare some cats</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✗ Requires electricity</li>
                    <li className="text-xs text-muted-foreground dark:text-cpCream/70">✗ Potential mechanical failures</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Top-Entry */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream">Top-Entry Box</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                  <span className="text-sm font-bold text-cpAmber">3.8/5</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> Litter tracking prevention, dogs who eat cat litter, small spaces
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Cat enters through hole in lid. Significantly reduces litter tracking. Modern designs look like furniture. Not suitable for senior cats or kittens.
              </p>
              <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Warning:</strong> 10-15% of cats refuse to use top-entry boxes. Have backup ready.</p>
              </div>
            </div>

            {/* Furniture Style */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground dark:text-cpCream">Furniture-Style Concealed Box</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-cpAmber text-cpAmber" />
                  <span className="text-sm font-bold text-cpAmber">3.5/5</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Best for:</strong> Aesthetic-conscious owners, open-plan living, hiding litter box
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Litter box hidden inside cabinet that looks like side table or planter. Cat enters through decorative opening. Premium price for premium aesthetics.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70"><strong>Price:</strong> £80-250 | <strong>Note:</strong> Poor ventilation can trap odours</p>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Litter Box Problems? Get Expert Help
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Cat behaviourists can diagnose litter box avoidance and recommend solutions specific to your cat's needs.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Find behaviourist near you →
              </Link>
            </Button>
          </div>
        </section>

        {/* Buying Guide */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Zap className="h-7 w-7 text-cpCoral" />
            Quick Buying Guide
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">For Kittens (8-16 weeks)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Small open tray with low sides (under 5cm). Upgrade to adult size at 6 months.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">For Large Breeds (Maine Coon, Ragdoll, Norwegian Forest)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Extra-large open box (60x50cm minimum) or storage container converted to litter box.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">For Senior Cats (10+ years)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Low-entry open box (under 10cm) with ramp if needed. Avoid top-entry or covered boxes.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">For Multiple Cats</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">One box per cat PLUS one extra. Multiple large open boxes or one self-cleaning unit.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">For Small Apartments</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Top-entry box or furniture-style concealed box. Prioritise odour control and space efficiency.</p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Cat Care Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/cat-care/litter-box-training-kitten" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">How to Litter Box Train Your Kitten</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete training guide →</p>
            </Link>
            <Link href="/en/guide/cat-care/brushing-cats" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">How to Brush Your Cat Properly</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Grooming essentials →</p>
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
                How many litter boxes do I need for two cats?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Three litter boxes. The formula is one per cat plus one extra. For two cats: 2 + 1 = 3 boxes. This prevents territorial issues, reduces queuing, and ensures clean boxes are always available. Place them in different locations - not all in one room.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Are self-cleaning litter boxes worth the money?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                For most owners, yes - but with caveats. They save 5-10 minutes daily of scooping, maintain consistent cleanliness (cats are happier), and some models track health metrics. However, they're expensive (£300-600), require electricity, can malfunction, and some cats are scared of the noise. Best for multiple cats or busy schedules. Always have a backup standard box during the transition period.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My cat won't use the new litter box. What should I do?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Never remove the old box immediately. Place new box next to old one. Transfer some used litter from old to new box (scent familiarity). Wait until cat uses new box consistently for 1-2 weeks before removing old box. If cat still refuses after 2 weeks, the new box type may not suit them - try a different style. Cats are creatures of habit and resist change.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Do covered litter boxes reduce odour?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                For humans, yes - you smell less from outside the box. For cats, no - the enclosed space traps odours, making it MORE unpleasant for them. This can lead to litter box avoidance. If you need odour control, use high-quality clumping litter, scoop twice daily, and consider an air purifier nearby. Covered boxes are more about human preference than odour management.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need more cat care advice or professional services?
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
            "headline": "Best Litter Boxes for Every Cat: Complete Buying Guide",
            "description": "Find the perfect litter box for your cat. Compare types, sizes, features, and prices. Expert reviews of top-rated covered, self-cleaning, and large litter boxes.",
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
              "@id": "https://cutiepawspedia.com/en/guide/cat-care/best-litter-boxes"
            }
          })
        }}
      />
    </div>
  );
}

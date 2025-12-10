/**
 * SEO Landing Page: How to Trim Your Cat's Nails Safely
 * Pillar: Cat Care (Pillar 2)
 * Target: English-speaking cat owners learning nail care
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cat, Scissors, AlertTriangle, CheckCircle2, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Trim Your Cat's Nails Safely: Step-by-Step Guide 2025",
  description: "Learn safe cat nail trimming techniques with our expert guide. Prevent scratches, protect furniture, and keep your cat comfortable with proper nail care.",
  keywords: [
    "how to trim cat nails",
    "cat nail clipping guide",
    "trim cat claws safely",
    "cat nail care",
    "prevent cat scratching",
    "cat nail trimmer",
    "cut cat nails",
    "cat quick bleeding"
  ],
  alternates: {
    canonical: "https://cutiepawspedia.com/en/guide/cat-care/trimming-cat-nails",
    languages: {
      'en': "https://cutiepawspedia.com/en/guide/cat-care/trimming-cat-nails",
      'nl': "https://cutiepawspedia.com/nl/gids/kattenverzorging/kattennagels-knippen"
    }
  },
  openGraph: {
    title: "How to Trim Your Cat's Nails Safely: Step-by-Step Guide",
    description: "Master safe cat nail trimming with expert techniques and troubleshooting tips.",
    type: "article",
  },
};

export default function TrimmingCatNails() {
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
            How to Trim Your Cat's Nails Safely: Step-by-Step Guide
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Regular nail trimming keeps your cat comfortable, protects your furniture, and prevents painful overgrowth. Learn the safe, stress-free technique that works for even the most resistant cats.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              ✂️ Prefer professional nail trimming?
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
            Trimming your cat's nails doesn't have to be a wrestling match. With the right technique, tools, and patience, you can safely trim your cat's nails at home. Most cats can learn to tolerate - and some even enjoy - regular nail trimming sessions.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This comprehensive guide covers everything from choosing the right nail clippers to handling an uncooperative cat, understanding feline nail anatomy, and what to do if you accidentally cause bleeding.
          </p>
        </section>

        {/* Why Trim */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Shield className="h-7 w-7 text-cpCoral" />
            Why Nail Trimming is Important
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Prevents Painful Overgrowth</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Long nails can curl into paw pads, causing infection and pain</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Protects Furniture</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Reduces damage to sofas, curtains, and carpets</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Reduces Scratching Injuries</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Safer for children, other pets, and yourself</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Prevents Snags</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Stops nails catching in fabrics, causing tears or injury</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Senior Cat Health</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Older cats can't retract claws properly - regular trimming essential</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Indoor Cat Care</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Indoor cats lack natural wear from outdoor surfaces</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Note:</strong> Declawing is NOT an alternative. It's a painful amputation procedure banned in many countries and causes lifelong problems. Regular nail trimming is humane, safe, and easy.
            </p>
          </div>
        </section>

        {/* Tools Needed */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Scissors className="h-7 w-7 text-cpCoral" />
            Essential Tools You'll Need
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">1. Cat Nail Clippers</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Three main types:</strong>
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Scissor-type:</strong> Most popular, provides good control, resembles small scissors with curved blades</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Guillotine-type:</strong> Nail fits through hole, blade slides across - good for experienced users</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Plier-type:</strong> Similar to human nail clippers but larger - easiest for beginners</span>
                </li>
              </ul>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3 mt-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Recommendation:</strong> Start with scissor-type clippers - most versatile and easiest to see what you're cutting</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">2. Styptic Powder or Cornstarch</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                For stopping bleeding if you accidentally cut the quick (blood vessel inside nail). Keep readily available:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Styptic powder (most effective)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Cornstarch or flour (home alternative)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>A bar of soap (press nail into soap to seal)</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">3. Treats and Rewards</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                High-value treats your cat loves. Create positive associations with nail trimming through immediate rewards after each successful nail.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">4. Optional: Helper or Towel</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                For difficult cats:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>A second person to gently hold cat</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Towel for gentle "burrito" wrapping (expose one paw at a time)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Nail Anatomy */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Understanding Cat Nail Anatomy
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">The Quick (Blood Vessel)</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  Pink area visible through translucent nails. Contains nerves and blood vessels. Cutting this causes pain and bleeding.
                </p>
                <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                  <p className="text-xs text-foreground dark:text-cpCream"><strong>White/Light-coloured nails:</strong> Quick is easy to see as pink centre</p>
                  <p className="text-xs text-foreground dark:text-cpCream mt-1"><strong>Dark/Black nails:</strong> Quick is hidden - trim only the very tip, be extra cautious</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">The Nail Tip</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Sharp, curved end beyond the quick. This is what you trim - usually just 1-2mm of the tip.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Dewclaws</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  "Thumbs" on inner side of front legs. These don't touch the ground and need regular trimming as they can grow into the paw pad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Clock className="h-7 w-7 text-cpCoral" />
            Step-by-Step Trimming Process
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Prepare and Desensitise (Week 1)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Don't trim on day one. Spend a week getting your cat comfortable with paw handling. Touch paws gently during petting sessions. Gently press paw pads to extend nails. Give treats immediately after paw touching. Do this daily for 5-10 minutes.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Goal:</strong> Cat remains calm while you hold and manipulate paws</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Choose the Right Moment</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Trim when cat is sleepy or relaxed - after a meal or play session. Never when they're energetic or agitated. Sit in good lighting where you can clearly see the nails.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Best times:</strong> Evening when cat is drowsy, after exercise when calm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Position Your Cat Comfortably</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Cat on your lap or table. Some cats prefer sitting facing away from you. Others tolerate lying on their side. Experiment to find what works. Keep sessions short initially - even one or two nails is success!
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Pro tip:</strong> Don't attempt all 18 nails in one session if cat is stressed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Extend the Nail</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Gently press paw pad between thumb and finger. This extends the nail out from its sheath. Hold firmly but gently - cat will pull away if it hurts.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Technique:</strong> Thumb on pad, finger on top of toe, gentle squeeze</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">5</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Identify the Quick and Cut</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Look for the pink quick in light nails. Cut 2mm BEFORE the quick starts. For dark nails, trim only the sharp tip. Cut at a slight angle following the natural curve. Make one clean cut - don't "nibble" or crush.
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Critical rule:</strong> Less is more. You can always trim more next time. Better too long than cutting the quick.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">6</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Reward and Repeat</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Give treat immediately after each nail. Praise calmly. If cat tolerates it, move to next nail. Stop if they become agitated - you can finish later or tomorrow.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Success strategy:</strong> First session = front paws only. Build up to all four over time.</p>
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
              Cat Won't Let You Near Their Paws?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Professional groomers and vets are experienced with difficult cats and can safely trim nails while you watch and learn.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=grooming">
                Book professional nail trimming →
              </Link>
            </Button>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-cpCoral" />
            Troubleshooting Common Problems
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">I Cut the Quick and It's Bleeding!</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">Don't panic. This happens to everyone eventually.</p>
              <ol className="space-y-2 mb-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral font-bold min-w-5">1.</span>
                  <span>Stay calm - cat will pick up on your anxiety</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral font-bold min-w-5">2.</span>
                  <span>Dip nail in styptic powder or press into cornstarch/flour</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral font-bold min-w-5">3.</span>
                  <span>Apply gentle pressure for 30 seconds</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral font-bold min-w-5">4.</span>
                  <span>Give extra treats and comfort</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral font-bold min-w-5">5.</span>
                  <span>End session on positive note - don't continue trimming</span>
                </li>
              </ol>
              <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream">Bleeding should stop within 5 minutes. If it doesn't, or nail continues bleeding after 15 minutes, contact your vet.</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">My Cat Absolutely Refuses - Fights, Scratches, and Hides</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">Some cats are extremely resistant. Options:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>One nail per day approach:</strong> Trim just one nail daily. Takes 18 days for full pedicure but zero stress</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>When sleeping:</strong> Some owners successfully trim nails while cat is deeply asleep</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Professional groomer:</strong> Experienced in handling difficult cats, can often do it faster</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>Vet visit:</strong> For extreme cases, nails can be trimmed under light sedation</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Nail Splits or Cracks When I Cut</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                This indicates dull clippers or wrong cutting technique. Replace your clippers (they should be sharp), ensure you're cutting perpendicular to the nail, not at an angle, and make one clean cut rather than multiple small ones.
              </p>
            </div>
          </div>
        </section>

        {/* Frequency */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            How Often Should You Trim?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-cpCoral font-bold min-w-32">Most cats:</span>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Every 2-4 weeks (front paws grow faster than back)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cpCoral font-bold min-w-32">Outdoor cats:</span>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Every 4-6 weeks (natural wear on rough surfaces)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cpCoral font-bold min-w-32">Indoor cats:</span>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Every 2-3 weeks (minimal natural wear)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cpCoral font-bold min-w-32">Senior cats:</span>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Every 2-3 weeks (nails grow faster, less active scratching)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cpCoral font-bold min-w-32">Check by:</span>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Listening for clicking sounds when cat walks, checking if nails catch in fabrics</p>
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
            <Link href="/en/guide/cat-care/brushing-cats" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">How to Brush Your Cat Properly</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete grooming guide →</p>
            </Link>
            <Link href="/en/guide/cat-care/long-hair-cat-care" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Long Hair Cat Grooming and Care</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Special care for fluffy cats →</p>
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
                Can I use human nail clippers on my cat?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Not recommended. Human clippers can crush and split cat nails rather than making a clean cut. Cat-specific clippers are designed for the shape and thickness of feline nails. They're inexpensive and last for years - worth the small investment for cleaner cuts and less discomfort for your cat.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Do I need to trim my cat's back claws?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, but less frequently. Back claws grow slower and cats often wear them down naturally through scratching. Check them monthly and trim if they're sharp or long. Back claws are typically easier to trim as cats are less protective of their hind paws. Don't forget the dewclaws on front paws - these need regular trimming as they don't touch the ground.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                At what age should I start trimming kitten nails?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Start handling paws and getting kittens used to the process from 8 weeks old. You can begin actual trimming around 12-16 weeks. Younger is better for training - kittens adapt more easily than adult cats who've never experienced nail trimming. Even if nails don't need trimming yet, practise the process with treats to build positive associations early.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Will nail trimming stop my cat from scratching furniture?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                No, scratching is natural cat behaviour for marking territory and stretching muscles. Trimmed nails reduce damage but won't eliminate the behaviour. Combine regular nail trimming with appropriate scratching posts, furniture protectors, and training. Trimmed nails mean less destruction but cats will still scratch - it's instinctive and healthy.
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
            "headline": "How to Trim Your Cat's Nails Safely: Step-by-Step Guide",
            "description": "Learn safe cat nail trimming techniques with our expert guide. Prevent scratches, protect furniture, and keep your cat comfortable with proper nail care.",
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
              "@id": "https://cutiepawspedia.com/en/guide/cat-care/trimming-cat-nails"
            }
          })
        }}
      />
    </div>
  );
}

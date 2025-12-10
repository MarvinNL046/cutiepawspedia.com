import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kitten Socialisation Guide | Building Confidence 2024",
  description: "Essential guide to kitten socialisation. Learn how to raise a confident, well-adjusted cat through proper early experiences, handling, and environmental exposure.",
  keywords: "kitten socialisation, kitten behavior, kitten training, confident cat, kitten development",
  alternates: {
    languages: {
      "nl": "/nl/gids/puppies-kittens/kitten-socialiseren",
      "en": "/en/guide/puppies-kittens/kitten-socialisation",
    },
  },
  openGraph: {
    title: "Kitten Socialisation Guide | Raising a Confident, Happy Cat",
    description: "Master kitten socialisation with our comprehensive guide. Build confidence and prevent behaviour problems.",
  },
};

export default function KittenSocialisationPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpCoral/10 via-cpAmber/10 to-cpAqua/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 border border-cpCoral/30 text-cpCoral text-sm font-medium mb-6">
              <span>🐱</span>
              Behaviour Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Kitten Socialisation Guide
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              The first few months of a kitten's life are crucial for development. Learn how to properly socialise your kitten to ensure they grow into a confident, well-adjusted, and happy adult cat.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpCoral/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Need professional cat behaviour advice?
              </p>
              <Button
                asChild
                className="bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/en/search?category=veterinary">Find cat behaviourists near you →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Kitten Socialisation Guide | Building Confidence",
              description: "Comprehensive guide to kitten socialisation, covering critical periods, techniques, and building confidence.",
              author: {
                "@type": "Organization",
                name: "CutiePawsPedia",
              },
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString(),
            }),
          }}
        />

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-cpAmber/10 border-l-4 border-cpAmber rounded-r-xl p-6 mb-12">
            <p className="text-lg text-foreground dark:text-cpCream m-0">
              Proper socialisation shapes your kitten's personality, confidence, and behaviour for life. Kittens who receive positive early experiences develop into friendly, adaptable cats. Those who don't may become fearful, aggressive, or anxious. This guide helps you navigate this critical developmental window.
            </p>
          </div>

          {/* Section 1: Critical period */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              The Critical Socialisation Window
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              The most important period for kitten socialisation is <strong>2-7 weeks of age</strong>, with a secondary sensitive period extending to <strong>14 weeks</strong>. During this time, kittens are most receptive to new experiences and form lasting impressions.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Developmental Timeline:
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🍼 2-3 Weeks: Neonatal Period</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Kittens begin to see and hear. Primary socialisation with mother and littermates starts. Gentle human handling can begin.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">👶 3-9 Weeks: Primary Socialisation</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Critical window! Introduce varied positive experiences: different people, gentle sounds, surfaces, and handling. Kittens learn from mother and siblings.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🌟 9-14 Weeks: Extended Socialisation</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Still highly receptive. Continue introducing new experiences. Fear responses begin to develop, so keep experiences positive.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🐱 14+ Weeks: Juvenile Period</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Socialisation still possible but requires more patience. Personality solidifying. Continue positive reinforcement and gradual exposure.
                </p>
              </div>
            </div>

            <div className="bg-cpAqua/10 rounded-xl p-6 border border-cpAqua/30">
              <p className="font-semibold text-cpAqua mb-2">💡 Important Note:</p>
              <p className="text-sm text-foreground dark:text-cpCream/80 m-0">
                Whilst the early weeks are critical, socialisation doesn't stop at 14 weeks. Continue positive experiences throughout your cat's life to maintain confidence and adaptability.
              </p>
            </div>
          </section>

          {/* Section 2: Handling and touch */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Handling and Touch Socialisation
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Getting your kitten comfortable with handling prepares them for vet visits, grooming, and medication administration throughout their life.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Daily Handling Exercises:
            </h3>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li>
                <strong>Paw touches</strong> - Gently hold and manipulate paws, touch between toes. Prepares for nail trimming.
              </li>
              <li>
                <strong>Ear examination</strong> - Carefully lift and look inside ears. Essential for future cleaning and health checks.
              </li>
              <li>
                <strong>Mouth handling</strong> - Lift lips to see teeth, gently touch gums. Crucial for dental care.
              </li>
              <li>
                <strong>Body brushing</strong> - Use a soft brush daily, even for short-haired kittens. Builds tolerance for grooming.
              </li>
              <li>
                <strong>Belly touches</strong> - Stroke belly and flanks gently. Many cats are sensitive here; early positive exposure helps.
              </li>
              <li>
                <strong>Restraint practice</strong> - Brief, gentle holding in different positions. Mimics vet examinations.
              </li>
            </ul>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Handling Rules:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-red-600 dark:text-red-300 m-0">
                <li>Always be gentle - never force or restrain roughly</li>
                <li>Keep sessions short (2-5 minutes) and positive</li>
                <li>End on a good note with treats or play</li>
                <li>Stop if kitten shows distress (hissing, scratching, trying to flee)</li>
                <li>Never punish resistance - build trust gradually</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Environmental exposure */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Environmental Socialisation
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Expose your kitten to various sights, sounds, surfaces, and situations in a controlled, positive way.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Experiences to Introduce:
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">👥 Different People</h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                  <li>• Men, women, children</li>
                  <li>• Different ages and appearances</li>
                  <li>• People in hats, glasses, uniforms</li>
                  <li>• Varied voices and energy levels</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🔊 Household Sounds</h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                  <li>• Vacuum cleaner, washing machine</li>
                  <li>• Doorbell, phone ringing</li>
                  <li>• TV, music, conversations</li>
                  <li>• Kitchen appliances</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🏠 Different Surfaces</h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                  <li>• Carpet, hardwood, tile</li>
                  <li>• Grass (when vaccinated)</li>
                  <li>• Cardboard, paper, fabric</li>
                  <li>• Cat tree textures</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🎯 Objects & Movement</h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                  <li>• Moving toys, balls, feathers</li>
                  <li>• Boxes, bags, tunnels</li>
                  <li>• Cat carrier (make positive!)</li>
                  <li>• Household items moving</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Gradual Exposure Technique:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li><strong>Start at low intensity</strong> - Introduce new stimulus at minimal level (distant sound, brief sight)</li>
              <li><strong>Pair with positive</strong> - Treats, play, or affection during exposure</li>
              <li><strong>Watch body language</strong> - Relaxed? Continue. Fearful? Reduce intensity</li>
              <li><strong>Gradually increase</strong> - Slowly make stimulus more prominent as kitten becomes comfortable</li>
              <li><strong>Repeat regularly</strong> - Consistency builds confidence</li>
            </ol>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpAmber/20 to-cpAqua/20 rounded-2xl shadow-md p-8 border border-cpAmber/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Behavioural concerns with your kitten?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Professional advice can help address issues early. Find experienced vets and cat behaviourists.
              </p>
              <Button
                asChild
                className="bg-cpAmber text-cpCharcoal rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/en/search?category=veterinary">Find specialists →</Link>
              </Button>
            </div>
          </div>

          {/* Section 4: Social with other animals */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Socialising with Other Animals
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              If you have or plan to have multiple pets, introduce them carefully during the critical socialisation period.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              With Other Cats:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Littermates</strong> - Ideally, keep kittens with siblings until 12 weeks. They learn bite inhibition and social cues</li>
              <li><strong>Adult cats</strong> - Gradual introduction with scent swapping first, then visual contact through barriers</li>
              <li><strong>Supervised interaction</strong> - Allow brief, positive meetings with retreat options available</li>
              <li><strong>Resource abundance</strong> - Multiple litter trays, food bowls, beds to prevent competition</li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              With Dogs:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Controlled meetings</strong> - Dog on lead, kitten in safe space initially</li>
              <li><strong>Positive associations</strong> - Treats for both animals during calm interactions</li>
              <li><strong>Escape routes</strong> - Ensure kitten can reach high places dogs can't access</li>
              <li><strong>Never force</strong> - Allow relationship to develop at their pace</li>
            </ul>
          </section>

          {/* Section 5: Building confidence */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Building Confidence and Preventing Fear
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Confident kittens become resilient, adaptable adult cats. Here's how to nurture that confidence:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🎮 Interactive Play</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Daily play sessions (10-15 minutes, 2-3 times daily) with wand toys. Allows kitten to "hunt" successfully, building confidence and providing exercise.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🏔️ Environmental Enrichment</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Cat trees, window perches, hiding boxes, and puzzle feeders. Variety prevents boredom and encourages exploration.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">✅ Positive Reinforcement</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Reward brave behaviour with treats, play, or praise. Never punish fear - it intensifies anxiety.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🛡️ Safe Retreat Spaces</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Provide hiding spots where kitten can retreat when overwhelmed. Feeling safe builds overall confidence.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🎯 Challenge and Success</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Gradually introduce mild challenges (new toys, slight elevation changes) that kitten can overcome. Success builds self-assurance.
                </p>
              </div>
            </div>
          </section>

          {/* Common mistakes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Common Socialisation Mistakes to Avoid
            </h2>

            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
                <p className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Overwhelming Too Quickly</p>
                <p className="text-sm text-red-600 dark:text-red-300 m-0">
                  Don't introduce too many new experiences at once. Take it slow, watch for stress signals (flattened ears, hiding, hissing).
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
                <p className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Forcing Interaction</p>
                <p className="text-sm text-red-600 dark:text-red-300 m-0">
                  Never force a frightened kitten to interact. This creates negative associations and can lead to lasting fear or aggression.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
                <p className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Inconsistent Handling</p>
                <p className="text-sm text-red-600 dark:text-red-300 m-0">
                  Sporadic or rough handling creates uncertainty. Be consistent, gentle, and predictable in all interactions.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
                <p className="font-bold text-red-700 dark:text-red-400 mb-2">❌ Skipping the Carrier</p>
                <p className="text-sm text-red-600 dark:text-red-300 m-0">
                  Make the carrier a positive space from day one. Feed treats inside, let kitten explore voluntarily. Don't wait until the first vet visit.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Is it too late to socialise my 6-month-old kitten?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  No, but it requires more patience. Whilst the critical window has closed, cats can still learn new behaviours and overcome fears with gradual, positive exposure. Progress may be slower, but improvement is definitely possible with consistent effort.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  My kitten is scared of visitors. What should I do?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Start with calm, cat-savvy friends visiting briefly. Have visitors ignore the kitten initially - let curiosity bring them out. Use treats to create positive associations. Provide hiding spots so kitten feels safe. Gradually increase visitor frequency and duration as confidence grows.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  How long should socialisation sessions be?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Keep sessions short - 5-10 minutes for handling exercises, 10-15 minutes for play. Young kittens tire quickly. Multiple short, positive sessions throughout the day are more effective than one long session. Always end on a positive note before kitten shows stress.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Should I socialise my indoor cat?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Absolutely! Indoor cats still need socialisation for vet visits, visitors, household changes, and general confidence. They benefit from varied experiences, different people, and environmental enrichment. Well-socialised indoor cats are less stressed and more adaptable to changes.
                </div>
              </details>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/en/guide/puppies-kittens/getting-kitten"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  Getting a kitten: complete guide →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Everything you need to know before bringing your kitten home.
                </p>
              </Link>
              <Link
                href="/en/guide/cat-care"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  Cat care essentials →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Comprehensive guide to caring for your cat at every life stage.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 rounded-2xl shadow-md p-8 border border-cpAqua/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Need professional cat care services?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Find veterinarians, cat behaviourists, and specialist services near you.
            </p>
            <Button
              asChild
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
            >
              <Link href="/en/search">Find cat care experts →</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

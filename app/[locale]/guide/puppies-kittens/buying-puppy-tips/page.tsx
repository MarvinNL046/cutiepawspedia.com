import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Buying a Puppy: What You Need to Know | Complete Guide 2024",
  description: "Planning to buy a puppy? Discover essential tips for choosing a breeder, understanding costs, and preparing your home. Find trusted vets and trainers near you.",
  keywords: "buying a puppy, puppy purchase, choosing a breeder, puppy tips, first puppy, puppy costs",
  alternates: {
    languages: {
      "nl": "/nl/gids/puppies-kittens/puppy-kopen-tips",
      "en": "/en/guide/puppies-kittens/buying-puppy-tips",
    },
  },
  openGraph: {
    title: "Buying a Puppy: Complete Guide - What You Need to Know",
    description: "Everything you need to know before buying a puppy. Find the best breeders and veterinarians near you.",
  },
};

export default function BuyingPuppyTipsPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpCoral/10 via-cpAmber/10 to-cpAqua/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 border border-cpCoral/30 text-cpCoral text-sm font-medium mb-6">
              <span>🐕</span>
              Complete Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Buying a Puppy: What You Need to Know
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              Buying a puppy is a major decision. Discover everything you need to know about breeder selection, costs, preparation, and the first weeks together.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpCoral/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Looking for a veterinarian for puppy vaccinations?
              </p>
              <Button
                asChild
                className="bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/en/search?category=veterinary">Find a vet near you →</Link>
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
              headline: "Buying a Puppy: What You Need to Know | Complete Guide",
              description: "Comprehensive guide to buying a puppy, from breeder selection to costs and preparation.",
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
              Bringing a puppy home is a wonderful experience, but it requires careful preparation.
              From choosing the right breeder to understanding all the costs - this guide helps you make the best
              decision for you and your future four-legged friend.
            </p>
          </div>

          {/* Section 1: Why a puppy? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Why Buy a Puppy?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Before you start searching for a puppy, it's important to ask yourself <strong>why</strong> you
              want a puppy. Adopting an adult dog can also be a great option, but a puppy offers unique advantages:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Train from the start</strong> - You can train and socialise your puppy according to your preferences</li>
              <li><strong>Behavioural history</strong> - You know exactly what the pup has experienced from a young age</li>
              <li><strong>Longer time together</strong> - A puppy means potentially 10-15 years of growing together</li>
              <li><strong>Building bonds</strong> - The bond you build from puppyhood is often very strong</li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80">
              However, remember: puppies require <strong>lots of time, energy, and patience</strong>. They need to be
              house-trained, learn to be alone, be trained, and receive plenty of attention. Are you willing to make that investment?
            </p>
          </section>

          {/* Section 2: Choose the right breed */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 1: Choose the Right Breed
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Every dog breed has unique characteristics, energy levels, and needs. It's crucial to choose a breed
              that fits your lifestyle, living situation, and experience.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Important Considerations:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🏃 Energy Level</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Border Collies and Huskies need lots of exercise. Bulldogs and Basset Hounds are calmer.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">📏 Size</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Large dogs need more space and higher costs (food, vet). Small dogs fit better in flats.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">✂️ Grooming</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Some breeds (Poodles, Yorkshire Terriers) need regular grooming. Others shed heavily.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">👨‍👩‍👧‍👦 Family-Friendly</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Golden Retrievers and Labradors are known as family dogs. Some breeds are less patient with children.
                </p>
              </div>
            </div>

            <div className="bg-cpAqua/10 rounded-xl p-6 border border-cpAqua/30 mb-6">
              <p className="font-semibold text-cpAqua mb-2">💡 Pro Tip:</p>
              <p className="text-sm text-foreground dark:text-cpCream/80 m-0">
                Talk to multiple breeders and owners of the breed you're considering. Visit a dog show or breed specialists
                to get a realistic picture of the temperament and needs.
              </p>
            </div>
          </section>

          {/* Section 3: Find a reputable breeder */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 2: Find a Reputable Breeder
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              A good breeder is crucial for your puppy's health and wellbeing. Unfortunately, there are also unreliable
              breeders and puppy mills. Here's how to recognise a serious breeder:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Characteristics of a Good Breeder:
            </h3>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li>
                <strong>Registered with breed association</strong> - Member of an official breed club or kennel club
              </li>
              <li>
                <strong>Health screenings</strong> - Parents tested for breed-specific conditions (hip dysplasia, eye tests)
              </li>
              <li>
                <strong>You can visit</strong> - You can see the puppies and mother dog in their environment
              </li>
              <li>
                <strong>Asks questions</strong> - A good breeder wants to know if you can provide a suitable home
              </li>
              <li>
                <strong>Introduction meeting</strong> - There's at least one visit before you take the puppy home
              </li>
              <li>
                <strong>Papers and vaccinations</strong> - Puppy has pedigree, microchip, and first vaccinations
              </li>
              <li>
                <strong>After-care</strong> - The breeder remains available for questions and advice after purchase
              </li>
            </ul>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Red Flags - Beware of:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-red-600 dark:text-red-300 m-0">
                <li>Breeders who breed multiple breeds simultaneously</li>
                <li>You can't see the mother dog</li>
                <li>Puppies delivered at neutral location (car park, station)</li>
                <li>No health screenings or pedigree</li>
                <li>Puppies younger than 8 weeks</li>
                <li>Breeder doesn't ask questions about your situation</li>
                <li>Unrealistically low prices</li>
              </ul>
            </div>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpAmber/20 to-cpAqua/20 rounded-2xl shadow-md p-8 border border-cpAmber/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Found your puppy? Sign up for puppy classes!
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Socialisation and training are essential in the first months. Find professional dog trainers near you.
              </p>
              <Button
                asChild
                className="bg-cpAmber text-cpCharcoal rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/en/search?category=training">View puppy classes →</Link>
              </Button>
            </div>
          </div>

          {/* Section 4: Puppy costs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 3: Understand the Costs
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Buying a puppy isn't just the purchase price. Total costs in the first year can add up significantly.
              Here's a realistic overview:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-card dark:bg-cpSurface/50 rounded-xl overflow-hidden">
                <thead className="bg-cpCoral/20">
                  <tr>
                    <th className="text-left p-4 font-bold text-foreground dark:text-cpCream">Cost Item</th>
                    <th className="text-right p-4 font-bold text-foreground dark:text-cpCream">One-time</th>
                    <th className="text-right p-4 font-bold text-foreground dark:text-cpCream">Per year</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground dark:text-cpCream/80">
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Puppy purchase price</td>
                    <td className="text-right p-4">£800 - £2000</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">First supplies (bed, bowls, toys, lead)</td>
                    <td className="text-right p-4">£150 - £300</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Veterinary (vaccinations, microchip, check-ups)</td>
                    <td className="text-right p-4">£200 - £350</td>
                    <td className="text-right p-4">£150 - £300</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Dog food (depending on breed)</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">£300 - £800</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Puppy classes / training</td>
                    <td className="text-right p-4">£150 - £400</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Insurance</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">£150 - £400</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Grooming / care</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">£0 - £600</td>
                  </tr>
                  <tr className="border-t-2 border-cpCoral bg-cpCoral/10 font-bold">
                    <td className="p-4 text-foreground dark:text-cpCream">TOTAL FIRST YEAR</td>
                    <td className="text-right p-4 text-foreground dark:text-cpCream" colSpan={2}>£1,750 - £5,150</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
              * Prices are indicative and may vary by breed, region, and personal choices.
              Larger breeds generally have higher costs for food and veterinary care.
            </p>
          </section>

          {/* Section 5: Preparation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 4: Prepare Your Home
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Before your puppy comes home, your house must be puppy-proofed. Young dogs are curious and chew everything.
              Here's a checklist:
            </p>

            <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
              Essential Supplies:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Dog bed or crate</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Safe place to sleep and rest</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Food and water bowls</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Preferably stainless steel or ceramic</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Puppy food</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Use the same brand as the breeder initially</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Collar and lead</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Adjustable, puppy grows fast!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Toys</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">For chewing, cuddling, and playing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">House-training pads</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">First weeks indoors</p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground dark:text-cpCream/80">
              <strong>Read also:</strong>{" "}
              <Link href="/en/guide/puppies-kittens/puppy-proofing-home" className="text-cpCoral hover:text-cpCoral/80 underline">
                Puppy-proofing: making your home safe for a puppy
              </Link>
            </p>
          </section>

          {/* Section 6: First day */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 5: The First Day Home
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              The first day is exciting for you and your puppy. The pup enters a completely new environment, away from mother
              and littermates. Here are tips to make it go smoothly:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li>
                <strong>Collect your puppy in the morning</strong> - This gives them the whole day to adjust before night
              </li>
              <li>
                <strong>Let them explore quietly</strong> - No fuss or lots of people. Give the pup time to explore
              </li>
              <li>
                <strong>Establish a routine</strong> - Fixed times for eating, sleeping, and going outside
              </li>
              <li>
                <strong>Be patient with house-training</strong> - Accidents happen. Reward desired behaviour, don't punish
              </li>
              <li>
                <strong>Provide a safe space</strong> - A crate or bed where they can rest
              </li>
            </ol>

            <p className="text-muted-foreground dark:text-cpCream/80">
              <strong>Read more:</strong>{" "}
              <Link href="/en/guide/puppies-kittens/first-week-puppy" className="text-cpCoral hover:text-cpCoral/80 underline">
                First week with your new puppy: day-by-day guide
              </Link>
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  What's the best age to buy a puppy?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Puppies must be at least 8 weeks old before being separated from their mother. The ideal age
                  is between 8 and 12 weeks. During this period, they're highly socialisable and learn quickly. Some breeders
                  keep puppies until 10-12 weeks to better prepare them.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  How much does a puppy cost on average?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  The purchase price of a pedigree dog ranges from £800 to £2000, depending on breed, breeder, and bloodline.
                  Popular breeds are often more expensive. Additionally, expect £1000-£3000 in extra costs in the first year
                  (vet, supplies, training, insurance).
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Should I buy a pedigree dog or crossbreed?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Both have pros and cons. Pedigree dogs have predictable appearance and temperament but may have breed-specific
                  health problems. Crossbreeds are often healthier due to genetic diversity, but temperament and size
                  are less predictable. Choose based on your preferences and lifestyle, not just price.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  How do I know if a breeder is reputable?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  A reputable breeder lets you visit, shows the mother dog and living environment, has pedigree and
                  health screenings of parents, asks questions about your situation, and offers after-care. Be alert to red
                  flags like multiple breeds at once, no visiting allowed, or delivery at neutral location.
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
                href="/en/guide/puppies-kittens/first-week-puppy"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  First week with your new puppy →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Day-by-day guide for the first seven days with your puppy at home.
                </p>
              </Link>
              <Link
                href="/en/guide/puppies-kittens/puppy-proofing-home"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  Puppy-proofing your home →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Make your home safe for a curious puppy with this checklist.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 rounded-2xl shadow-md p-8 border border-cpAqua/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Ready for your new puppy?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Find groomers, veterinarians, dog trainers, and more near you.
            </p>
            <Button
              asChild
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
            >
              <Link href="/en/search">Discover all pet services →</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

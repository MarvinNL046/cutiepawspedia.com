import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Getting a Kitten: What You Need to Know | Complete Guide 2024",
  description: "Planning to get a kitten? Learn about choosing a breeder, kitten care essentials, costs, and preparing your home. Find trusted vets and cat care services.",
  keywords: "getting a kitten, kitten adoption, kitten care, first kitten, kitten tips, kitten costs",
  alternates: {
    languages: {
      "nl": "/nl/gids/puppies-kittens/kitten-aanschaffen",
      "en": "/en/guide/puppies-kittens/getting-kitten",
    },
  },
  openGraph: {
    title: "Getting a Kitten: Complete Guide - Everything You Need to Know",
    description: "Essential guide to getting a kitten. From choosing the right breed to preparing your home and first-year costs.",
  },
};

export default function GettingKittenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpCoral/10 via-cpAmber/10 to-cpAqua/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 border border-cpCoral/30 text-cpCoral text-sm font-medium mb-6">
              <span>🐱</span>
              Complete Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Getting a Kitten: What You Need to Know
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              Welcoming a kitten into your home is an exciting journey. Discover everything about breed selection, essential supplies, costs, and creating the perfect environment for your new feline friend.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpCoral/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Need a vet for kitten vaccinations and health checks?
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
              headline: "Getting a Kitten: What You Need to Know | Complete Guide",
              description: "Comprehensive guide to getting a kitten, from breed selection to essential care and preparation.",
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
              Bringing a kitten home is a delightful experience filled with playfulness and affection. However, it requires thoughtful preparation to ensure your new companion thrives. This comprehensive guide covers everything from choosing the right kitten to creating a safe, loving environment.
            </p>
          </div>

          {/* Section 1: Why a kitten? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Why Get a Kitten?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Before searching for a kitten, consider <strong>why</strong> you want one. Whilst adult cat adoption is also wonderful, kittens offer unique advantages:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Bond from the start</strong> - Building a relationship from kittenhood creates a strong, lasting bond</li>
              <li><strong>Socialisation control</strong> - You can shape their social skills and behaviour patterns early</li>
              <li><strong>Health transparency</strong> - You know their complete medical history from day one</li>
              <li><strong>Adaptability</strong> - Kittens adapt more easily to new homes, families, and other pets</li>
              <li><strong>Playful energy</strong> - Experience the joy of kitten antics and playful behaviour</li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80">
              Remember: kittens need <strong>time, patience, and consistent care</strong>. They require litter training, play stimulation, regular feeding, and proper socialisation. Are you ready for this commitment?
            </p>
          </section>

          {/* Section 2: Choose the right breed */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 1: Choose the Right Breed or Mix
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Different cat breeds have distinct personalities, care needs, and characteristics. Whether you choose a pedigree or mixed-breed kitten, understanding these traits helps ensure a good match.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Key Considerations:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🎯 Activity Level</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Bengals and Abyssinians are highly active. Persians and Ragdolls prefer a calmer lifestyle.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">✂️ Grooming Needs</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Long-haired breeds need daily brushing. Short-haired cats require minimal grooming.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">💬 Vocalisation</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Siamese cats are very vocal. British Shorthairs tend to be quieter.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">👨‍👩‍👧‍👦 Sociability</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Maine Coons are friendly and social. Some breeds prefer quieter households.
                </p>
              </div>
            </div>

            <div className="bg-cpAqua/10 rounded-xl p-6 border border-cpAqua/30 mb-6">
              <p className="font-semibold text-cpAqua mb-2">💡 Pro Tip:</p>
              <p className="text-sm text-foreground dark:text-cpCream/80 m-0">
                Visit cat shows or chat with breed enthusiasts to learn about temperament and care requirements. Mixed-breed kittens from shelters can make equally wonderful companions with fewer health issues.
              </p>
            </div>
          </section>

          {/* Section 3: Where to get a kitten */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 2: Choose Where to Get Your Kitten
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              You have several options for getting a kitten. Each has advantages and considerations:
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Reputable Breeder:
            </h3>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Health guarantees</strong> - Kittens tested for genetic conditions, vaccinated, and microchipped</li>
              <li><strong>Known lineage</strong> - Understanding of parents' health and temperament</li>
              <li><strong>Breed standards</strong> - Pedigree documentation and predictable traits</li>
              <li><strong>Early socialisation</strong> - Kittens raised in home environment with human interaction</li>
              <li><strong>Breeder support</strong> - Ongoing advice and guidance throughout the cat's life</li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Animal Shelter or Rescue:
            </h3>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Save a life</strong> - Give a homeless kitten a loving home</li>
              <li><strong>Lower cost</strong> - Usually includes vaccinations, microchip, and neutering</li>
              <li><strong>Variety</strong> - Many breeds and mixed breeds available</li>
              <li><strong>Professional assessment</strong> - Shelters evaluate kitten personalities and health</li>
              <li><strong>Support services</strong> - Advice on integration and behaviour</li>
            </ul>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Red Flags - Avoid:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-red-600 dark:text-red-300 m-0">
                <li>Pet shops sourcing from kitten mills</li>
                <li>Breeders who won't let you visit</li>
                <li>Kittens younger than 8 weeks being sold</li>
                <li>No health records or vaccination proof</li>
                <li>Mother cat not present or visible</li>
                <li>Unsanitary living conditions</li>
                <li>Unusually low prices (too good to be true)</li>
              </ul>
            </div>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpAmber/20 to-cpAqua/20 rounded-2xl shadow-md p-8 border border-cpAmber/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Kitten coming home soon? Get supplies ready!
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Find quality pet shops and cat care specialists near you for all your kitten's needs.
              </p>
              <Button
                asChild
                className="bg-cpAmber text-cpCharcoal rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/en/search?category=pet-shops">Find pet shops →</Link>
              </Button>
            </div>
          </div>

          {/* Section 4: Essential supplies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 3: Gather Essential Supplies
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Before your kitten arrives, prepare your home with these essential items:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🍽️</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Food and water bowls</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Ceramic or stainless steel, shallow for whisker comfort</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚽</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Litter tray and litter</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">One per cat plus one extra, low sides for kittens</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🥘</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Kitten food</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">High-quality kitten formula, same brand as previous home initially</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🛏️</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Bed and blankets</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Cosy, washable bedding in quiet location</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎾</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Toys</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Interactive toys, balls, feather wands for play</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🪵</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Scratching post</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Tall, sturdy post to protect furniture</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Cat carrier</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">For vet visits and travel, secure and well-ventilated</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🪮</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Grooming supplies</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Brush, nail clippers, and grooming glove</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Costs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 4: Understand the Costs
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Owning a kitten involves ongoing financial commitment. Here's a realistic breakdown:
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
                    <td className="p-4">Kitten adoption/purchase</td>
                    <td className="text-right p-4">£50 - £1500</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Initial supplies (bowls, bed, litter tray, toys)</td>
                    <td className="text-right p-4">£100 - £200</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Veterinary (vaccinations, microchip, neutering)</td>
                    <td className="text-right p-4">£150 - £300</td>
                    <td className="text-right p-4">£100 - £200</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Food (high-quality kitten food)</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">£200 - £500</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Cat litter</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">£100 - £200</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Pet insurance</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">£100 - £300</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Grooming (professional for long-haired breeds)</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">£0 - £300</td>
                  </tr>
                  <tr className="border-t-2 border-cpCoral bg-cpCoral/10 font-bold">
                    <td className="p-4 text-foreground dark:text-cpCream">TOTAL FIRST YEAR</td>
                    <td className="text-right p-4 text-foreground dark:text-cpCream" colSpan={2}>£800 - £3,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
              * Costs vary based on breed, location, and individual choices. Pedigree kittens typically cost more upfront but ongoing costs are similar.
            </p>
          </section>

          {/* Section 6: First days */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Step 5: The First Days at Home
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              The first few days are crucial for helping your kitten settle in successfully:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li>
                <strong>Start in one room</strong> - Let your kitten explore a small, safe space before introducing the whole home
              </li>
              <li>
                <strong>Show the litter tray</strong> - Place kitten in tray after meals and naps to encourage use
              </li>
              <li>
                <strong>Maintain feeding schedule</strong> - Keep the same food and feeding times as previous home
              </li>
              <li>
                <strong>Provide hiding spots</strong> - Kittens need places to retreat and feel secure
              </li>
              <li>
                <strong>Gentle interaction</strong> - Let kitten approach you; avoid forcing contact initially
              </li>
              <li>
                <strong>Establish routine</strong> - Consistent feeding, play, and sleep times help adjustment
              </li>
            </ol>

            <p className="text-muted-foreground dark:text-cpCream/80">
              <strong>Read more:</strong>{" "}
              <Link href="/en/guide/puppies-kittens/kitten-socialisation" className="text-cpCoral hover:text-cpCoral/80 underline">
                Kitten socialisation: building confidence and good behaviour
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
                  At what age should I get a kitten?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Kittens should stay with their mother until at least 8 weeks old, ideally 12 weeks. This crucial period allows them to learn social skills, proper eating habits, and litter tray use from their mother and siblings.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Should I get one kitten or two?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Two kittens from the same litter often work well together, providing companionship and play whilst you're at work. However, single kittens can thrive with sufficient human interaction and stimulation. Consider your lifestyle, budget, and ability to provide attention.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  What vaccinations does my kitten need?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Kittens typically need vaccinations against feline infectious enteritis, cat flu, and feline leukaemia virus. The first vaccination is usually at 8-9 weeks, with a second dose 3-4 weeks later. Annual boosters maintain protection. Consult your vet for a personalised schedule.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  When should I have my kitten neutered?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Most vets recommend neutering between 4-6 months of age, before sexual maturity. Early neutering prevents unwanted pregnancies, reduces roaming behaviour, and can prevent certain health issues. Discuss timing with your vet based on your kitten's individual development.
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
                href="/en/guide/puppies-kittens/kitten-socialisation"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  Kitten socialisation guide →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Essential techniques for raising a confident, well-adjusted cat.
                </p>
              </Link>
              <Link
                href="/en/guide/cat-care"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  Complete cat care guide →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Everything you need to know about caring for your cat.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 rounded-2xl shadow-md p-8 border border-cpAqua/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Ready to welcome your kitten?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Find veterinarians, pet shops, cat groomers, and more near you.
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

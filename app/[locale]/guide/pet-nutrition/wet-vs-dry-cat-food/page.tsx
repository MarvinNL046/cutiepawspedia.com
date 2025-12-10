import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Droplets, Scale, Info, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Wet vs Dry Cat Food: Which is Better for Your Cat? (2024 Guide)",
  description: "Compare wet and dry cat food: benefits, drawbacks, cost, and which is best for your cat's health. Expert analysis with feeding recommendations.",
  keywords: "wet cat food, dry cat food, cat nutrition, cat food comparison, best cat food, kitten food",
  alternates: {
    languages: {
      "nl": "/nl/gids/huisdiervoeding/kattenvoer-nat-vs-droog",
      "en": "/en/guide/pet-nutrition/wet-vs-dry-cat-food",
    },
  },
  openGraph: {
    title: "Wet vs Dry Cat Food: Which is Better for Your Cat?",
    description: "Complete comparison of wet and dry cat food. Make the best choice for your feline friend's health and happiness.",
  },
};

export default function WetVsDryCatFoodPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Schema.org Article markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Wet vs Dry Cat Food: Which is Better for Your Cat? Complete Guide 2024",
            "description": "Compare wet and dry cat food benefits, drawbacks, and find out which is best for your cat's specific needs.",
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
            "datePublished": "2024-12-08",
            "dateModified": "2024-12-08"
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 border border-cpCoral/30 dark:border-cpAmber/20 mb-6">
            <Scale className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Cat Nutrition Comparison
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Wet vs Dry Cat Food: <span className="text-cpCoral">Which is Better?</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            One of the most common questions cat owners ask is whether to feed wet food, dry food, or a combination of both. The truth? There's no one-size-fits-all answer. Each type has distinct advantages and disadvantages, and the best choice depends on your cat's age, health, lifestyle, and personal preferences.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm mb-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Need professional nutrition advice for your cat?
            </p>
            <Link
              href="/en/search?category=veterinary"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Find a Veterinarian Near You →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Quick Comparison Table */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Quick Comparison: Wet vs Dry Cat Food
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20">
              <thead className="bg-cpCoral/10 dark:bg-cpCoral/5">
                <tr>
                  <th className="px-6 py-4 text-left text-foreground dark:text-cpCream font-bold">Factor</th>
                  <th className="px-6 py-4 text-left text-foreground dark:text-cpCream font-bold">Wet Food</th>
                  <th className="px-6 py-4 text-left text-foreground dark:text-cpCream font-bold">Dry Food</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-cpAmber/20">
                {[
                  { factor: "Moisture Content", wet: "70-80%", dry: "6-10%" },
                  { factor: "Hydration", wet: "Excellent", dry: "Minimal" },
                  { factor: "Palatability", wet: "Very high", dry: "Moderate" },
                  { factor: "Cost per serving", wet: "££-£££", dry: "£" },
                  { factor: "Dental benefits", wet: "None", dry: "Moderate" },
                  { factor: "Shelf life (opened)", wet: "1-2 days", dry: "4-6 weeks" },
                  { factor: "Calorie density", wet: "Lower", dry: "Higher" },
                  { factor: "Convenience", wet: "Moderate", dry: "High" },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-cpCoral/5 dark:hover:bg-cpCoral/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground dark:text-cpCream">{row.factor}</td>
                    <td className="px-6 py-4 text-muted-foreground dark:text-cpCream/80">{row.wet}</td>
                    <td className="px-6 py-4 text-muted-foreground dark:text-cpCream/80">{row.dry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 1: Wet Cat Food - Deep Dive */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Wet Cat Food: Benefits and Drawbacks
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-cpCoral/10 dark:from-blue-900/10 dark:to-cpCoral/5 rounded-2xl p-8 border border-blue-200 dark:border-blue-800/30 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8 text-blue-500" />
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream">
                Why Wet Food is Excellent for Cats
              </h3>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80">
              Cats evolved as desert animals with low thirst drive. Wet food mirrors their natural prey's moisture content (70-80% water), making it biologically appropriate.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream">
              Benefits of Wet Cat Food:
            </h3>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    1. Superior Hydration
                  </h4>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Contains 70-80% water, helping prevent urinary tract infections, kidney disease, and crystals/stones. Essential for cats who don't drink enough water.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    2. Weight Management
                  </h4>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Lower calorie density means cats feel full with fewer calories. Ideal for overweight cats or those prone to obesity.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    3. Higher Protein Content
                  </h4>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Typically contains more animal protein and less carbohydrates than dry food. Cats are obligate carnivores and thrive on protein-rich diets.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    4. Highly Palatable
                  </h4>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Strong aroma and texture make it irresistible to fussy eaters. Excellent for senior cats, sick cats, or those with reduced appetite.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    5. Easier to Digest
                  </h4>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    High moisture content aids digestion and reduces constipation. Beneficial for cats with digestive sensitivities or senior cats.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream">
              Drawbacks of Wet Cat Food:
            </h3>

            <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-200 dark:border-red-800/30">
              <ul className="space-y-3">
                {[
                  "More expensive per serving (£1-3 per can vs £0.20-0.50 per serving of dry)",
                  "Shorter shelf life once opened (1-2 days refrigerated)",
                  "Requires refrigeration and careful storage",
                  "No dental benefits (doesn't clean teeth)",
                  "Can be messier and smell stronger",
                  "Less convenient for free-feeding or extended periods",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-red-800 dark:text-red-300">
                    <span className="text-lg">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Dry Cat Food - Deep Dive */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Dry Cat Food: Benefits and Drawbacks
          </h2>

          <div className="space-y-4 mb-6">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream">
              Benefits of Dry Cat Food:
            </h3>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    1. Cost-Effective
                  </h4>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Significantly cheaper per serving. High-quality dry food costs £0.20-0.50 per serving vs £1-3 for wet food.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    2. Convenience
                  </h4>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Long shelf life (4-6 weeks after opening), perfect for free-feeding, and ideal for busy owners or multi-day trips.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    3. Dental Benefits
                  </h4>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Crunching kibble provides mild abrasive action that reduces tartar build-up. Some dental-specific formulas offer enhanced benefits.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    4. Calorie-Dense
                  </h4>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Higher calorie density beneficial for underweight cats, very active cats, or outdoor cats in cold climates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream">
              Drawbacks of Dry Cat Food:
            </h3>

            <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-200 dark:border-red-800/30">
              <ul className="space-y-3">
                {[
                  "Very low moisture content (6-10%) - doesn't support hydration",
                  "Higher carbohydrate content than cats naturally need",
                  "Can contribute to obesity if free-fed without portion control",
                  "Less palatable for picky eaters",
                  "May increase risk of urinary tract problems in susceptible cats",
                  "Lower protein content (per weight) compared to wet food",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-red-800 dark:text-red-300">
                    <span className="text-lg">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Which is Better? */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            So Which is Better: Wet or Dry?
          </h2>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 border border-cpCoral/20 dark:border-cpAmber/20 mb-6">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              The Answer: It Depends on Your Cat
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 text-lg leading-relaxed">
              There's no universal "better" option. The ideal choice depends on your cat's age, health status, weight, activity level, and individual preferences. Many veterinarians recommend a combination of both to maximise benefits.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                Choose Primarily Wet Food If Your Cat:
              </h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li>✓ Is prone to urinary tract infections or kidney disease</li>
                <li>✓ Doesn't drink enough water</li>
                <li>✓ Is overweight or needs to lose weight</li>
                <li>✓ Is a senior cat with reduced appetite</li>
                <li>✓ Has dental problems making kibble difficult</li>
                <li>✓ Is recovering from illness</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                Choose Primarily Dry Food If Your Cat:
              </h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li>✓ Is underweight and needs calorie-dense food</li>
                <li>✓ Is very active or lives outdoors in cold climate</li>
                <li>✓ Drinks plenty of water throughout the day</li>
                <li>✓ Requires free-feeding due to owner's schedule</li>
                <li>✓ Has good dental health and benefits from crunchy kibble</li>
                <li>✓ You have budget constraints (dry is more economical)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: The Best Approach - Combination Feeding */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            The Best Approach: Combination Feeding
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Many veterinarians recommend feeding both wet and dry food to combine the benefits of each. This approach is often called "combination feeding" or "mixed feeding".
          </p>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Recommended Feeding Strategies:
            </h3>

            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-4">
                <h4 className="font-bold text-foreground dark:text-cpCream mb-2">
                  Strategy 1: Wet Morning, Dry Evening
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Feed wet food in the morning for hydration and satiety, leave dry food available during the day for snacking. Good for working owners.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-4">
                <h4 className="font-bold text-foreground dark:text-cpCream mb-2">
                  Strategy 2: Primarily Wet with Dry Supplement
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  75% wet food, 25% dry food. Maximises hydration benefits while providing dental advantages and convenience.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-4">
                <h4 className="font-bold text-foreground dark:text-cpCream mb-2">
                  Strategy 3: 50/50 Split
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Equal amounts of wet and dry. Balanced approach offering benefits of both types.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-4">
                <h4 className="font-bold text-foreground dark:text-cpCream mb-2">
                  Strategy 4: Dry Base with Wet Topper
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Feed mainly dry food with a spoonful of wet food on top. Budget-friendly way to add moisture and palatability.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/30 dark:border-cpAmber/20">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
                  Important: Adjust Total Calories
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  When combining wet and dry food, ensure you're not overfeeding. Reduce portions of each to maintain appropriate daily calorie intake. Consult feeding guidelines on packaging or ask your veterinarian.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Special Considerations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Special Considerations by Life Stage
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                Kittens (0-12 months)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Need high-calorie, nutrient-dense food for rapid growth. Both wet and dry kitten formulas work well.
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                <strong>Recommendation:</strong> Combination feeding with kitten-specific formulas. Wet food 2-3 times daily plus dry food available for grazing.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                Adult Cats (1-7 years)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Healthy adults can thrive on either wet, dry, or combination feeding based on individual needs.
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                <strong>Recommendation:</strong> Assess your cat's hydration, weight, and preferences. Combination feeding offers the most flexibility.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                Senior Cats (7+ years)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Often need more moisture, easier-to-chew food, and lower calories. Kidney health becomes priority.
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                <strong>Recommendation:</strong> Primarily wet food (70-80%) for hydration and kidney support. Add dry food if dental health is good.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                Overweight Cats
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Wet food's lower calorie density helps create satiety with fewer calories. Essential for weight loss.
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                <strong>Recommendation:</strong> Primarily wet food with controlled portions. Avoid free-feeding dry food.
              </p>
              <Link
                href="/en/guide/pet-nutrition/pet-weight-loss"
                className="inline-block mt-3 text-cpCoral hover:underline font-medium text-sm"
              >
                Read our complete pet weight loss guide →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section 2 */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need Personalised Nutrition Advice?
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Every cat is unique. Find veterinarians and pet nutritionists near you for personalised feeding recommendations.
              </p>
              <Link
                href="/en/search?category=veterinary"
                className="inline-block bg-white text-cpCoral hover:bg-white/90 rounded-2xl px-8 py-4 font-semibold shadow-lg hover:-translate-y-1 transition-transform"
              >
                Find Veterinary Services →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Can I mix wet and dry food in the same bowl?",
                a: "Yes, you can mix them together. However, dry food absorbs moisture from wet food and becomes soggy, which some cats dislike. Many owners prefer to feed them separately."
              },
              {
                q: "How long can wet cat food sit out?",
                a: "Maximum 4 hours at room temperature. After that, bacteria can grow. Refrigerate opened cans and use within 1-2 days."
              },
              {
                q: "Is it OK to only feed dry food?",
                a: "While cats can survive on dry food alone, it's not ideal for all cats. Ensure your cat drinks plenty of water and monitor for urinary issues. Combination feeding is generally healthier."
              },
              {
                q: "Why is wet cat food so expensive?",
                a: "Wet food contains 70-80% water, making it heavier and more expensive to produce, package, and transport. You're essentially paying for water content and higher meat quality."
              },
              {
                q: "Can I leave dry food out all day?",
                a: "Yes, but free-feeding can lead to obesity. Measured portions are healthier. If you must free-feed, use a puzzle feeder to slow consumption."
              },
              {
                q: "Should I warm up wet cat food?",
                a: "Yes! Room temperature or slightly warm wet food is more aromatic and appealing to cats. Warm refrigerated food for 10-15 seconds in the microwave or let it sit out for 15 minutes."
              },
            ].map((faq, index) => (
              <details key={index} className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-medium text-foreground dark:text-cpCream">
                  {faq.q}
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground dark:text-slate-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Articles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Pet Nutrition Guides
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Best Dog Food: Complete Guide",
                desc: "Everything you need to know about choosing quality dog nutrition.",
                href: "/en/guide/pet-nutrition/best-dog-food"
              },
              {
                title: "Toxic Foods for Dogs and Cats",
                desc: "Essential safety guide: foods that are dangerous for your pets.",
                href: "/en/guide/pet-nutrition/toxic-foods-dogs-cats"
              },
              {
                title: "How to Help Your Pet Lose Weight",
                desc: "Safe and effective weight loss strategies for overweight pets.",
                href: "/en/guide/pet-nutrition/pet-weight-loss"
              },
              {
                title: "BARF Diet for Dogs",
                desc: "Complete guide to raw feeding for dogs.",
                href: "/en/guide/pet-nutrition/barf-diet-dogs"
              },
            ].map((article, index) => (
              <Link key={index} href={article.href}>
                <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-lg hover:border-cpCoral/40 transition-all group">
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-slate-400 mb-3">
                    {article.desc}
                  </p>
                  <span className="text-cpCoral text-sm font-medium">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-8 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Find Pet Services Near You
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6 max-w-2xl mx-auto">
              Discover trusted veterinarians, pet shops, and nutrition consultants in your area.
            </p>
            <Link
              href="/en/search"
              className="inline-block bg-cpCoral text-white rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Browse Pet Services →
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

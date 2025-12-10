import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Award, TrendingUp, Info, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Dog Food: Complete Guide to Choosing Quality Dog Nutrition 2024",
  description: "Discover the best dog food brands, ingredients to look for, and how to choose quality nutrition for your dog. Expert guide with comparison and feeding tips.",
  keywords: "best dog food, quality dog food, dog nutrition, dog food brands, healthy dog food, puppy food",
  alternates: {
    languages: {
      "nl": "/nl/gids/huisdiervoeding/beste-hondenvoer",
      "en": "/en/guide/pet-nutrition/best-dog-food",
    },
  },
  openGraph: {
    title: "Best Dog Food: Complete Guide to Quality Dog Nutrition",
    description: "Expert guide to choosing the best dog food. Compare brands, understand ingredients, and find the perfect nutrition for your dog.",
  },
};

export default function BestDogFoodPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Schema.org Article markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best Dog Food: Complete Guide to Choosing Quality Dog Nutrition 2024",
            "description": "Discover the best dog food brands, ingredients to look for, and how to choose quality nutrition for your dog.",
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
            <Award className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Expert Nutrition Guide
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Best Dog Food: Complete Guide to <span className="text-cpCoral">Quality Nutrition</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Choosing the best dog food is one of the most important decisions you'll make for your furry friend's health and longevity. With hundreds of brands claiming to be "the best", how do you know what's truly high-quality nutrition? This comprehensive guide breaks down everything you need to know about dog food ingredients, brands, and feeding strategies.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm mb-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Find trusted pet shops and veterinarians near you for nutrition advice
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
        {/* Section 1: What Makes Dog Food "The Best"? */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            What Makes Dog Food "The Best"?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            The best dog food isn't necessarily the most expensive or the most heavily marketed brand. Quality dog nutrition is defined by several key factors that directly impact your dog's health, energy levels, and lifespan.
          </p>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    High-Quality Protein Sources
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    The first ingredient should be a named meat source (chicken, beef, lamb, fish) - not meat by-products or unnamed protein. Quality proteins support muscle development, healthy coat, and immune function.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Complete and Balanced Nutrition
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Look for AAFCO (Association of American Feed Control Officials) or FEDIAF (European Pet Food Industry Federation) certification. This ensures the food meets minimum nutritional requirements for dogs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Minimal Fillers and Additives
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Avoid excessive corn, wheat, soy, and artificial colours or preservatives. The best dog foods use whole grains, vegetables, and natural preservatives like vitamin E (tocopherols).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                    Life Stage Appropriate
                  </h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Puppies, adults, and senior dogs have different nutritional needs. Choose food formulated for your dog's specific life stage and activity level.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Top Ingredients to Look For */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Top Ingredients to Look For in Dog Food
          </h2>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 border border-cpCoral/20 dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Quality Ingredient Checklist:
            </h3>
            <ul className="space-y-3">
              {[
                "Named meat protein (chicken, beef, lamb, salmon) as first ingredient",
                "Whole grains (brown rice, oatmeal, barley) or grain-free alternatives",
                "Vegetables and fruits (sweet potatoes, carrots, blueberries)",
                "Omega-3 fatty acids (fish oil, flaxseed) for coat and joint health",
                "Probiotics and prebiotics for digestive health",
                "Glucosamine and chondroitin for joint support (especially for large breeds)",
                "Natural preservatives (vitamin E, rosemary extract)",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3: Red Flags - Ingredients to Avoid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Red Flags: Ingredients to Avoid
          </h2>

          <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-200 dark:border-red-800/30 mb-6">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-4">
              Avoid These Ingredients:
            </h3>
            <ul className="space-y-2">
              {[
                "Meat by-products or unnamed meat sources ('animal meal', 'meat meal')",
                "Excessive corn, wheat, or soy (common allergens and low nutritional value)",
                "Artificial colours (Blue 2, Red 40, Yellow 5 & 6)",
                "Artificial preservatives (BHA, BHT, ethoxyquin)",
                "Excessive salt or sugar content",
                "Rendered fat (generic 'animal fat' without named source)",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-red-800 dark:text-red-300">
                  <span className="text-lg">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 4: Types of Dog Food - Dry vs Wet vs Raw */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Types of Dog Food: Dry, Wet, or Raw?
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                Dry Kibble (Most Popular)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Convenient, affordable, and helps clean teeth. Best for most dogs when high-quality brands are chosen.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-2">Pros:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• Most economical option</li>
                    <li>• Long shelf life</li>
                    <li>• Promotes dental health</li>
                    <li>• Easy portion control</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400 mb-2">Cons:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• Lower moisture content</li>
                    <li>• Can contain more preservatives</li>
                    <li>• Less palatable for picky eaters</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                Wet/Canned Food
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Higher moisture content and palatability. Excellent for hydration and picky eaters.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-2">Pros:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• 70-80% moisture content</li>
                    <li>• Highly palatable</li>
                    <li>• Good for hydration</li>
                    <li>• Easier to digest</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400 mb-2">Cons:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• More expensive per serving</li>
                    <li>• Shorter shelf life once opened</li>
                    <li>• Less dental benefits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                Raw Food (BARF Diet)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Biologically appropriate raw food. Requires careful planning and veterinary guidance.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-2">Pros:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• Maximum nutrient retention</li>
                    <li>• Natural enzymes intact</li>
                    <li>• Shinier coat and healthier skin</li>
                    <li>• Better dental health</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400 mb-2">Cons:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• Bacterial contamination risk</li>
                    <li>• Time-consuming preparation</li>
                    <li>• Expensive</li>
                    <li>• Requires expert guidance</li>
                  </ul>
                </div>
              </div>
              <Link
                href="/en/guide/pet-nutrition/barf-diet-dogs"
                className="inline-block mt-4 text-cpCoral hover:underline font-medium"
              >
                Learn more about BARF diet for dogs →
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: How to Choose the Right Dog Food for Your Dog */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            How to Choose the Right Dog Food for Your Dog
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Every dog is unique. What works for one may not work for another. Consider these factors when choosing dog food:
          </p>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                1. Age and Life Stage
              </h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Puppies (0-12 months):</strong> Need higher protein and fat for growth. Choose puppy-specific formulas.</li>
                <li><strong>Adults (1-7 years):</strong> Balanced maintenance formula with moderate protein and fat.</li>
                <li><strong>Seniors (7+ years):</strong> Lower calories, joint support, easily digestible ingredients.</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                2. Size and Breed
              </h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Small breeds:</strong> Higher metabolism, need calorie-dense food with small kibble size.</li>
                <li><strong>Large breeds:</strong> Need glucosamine for joints, controlled calcium for bone health.</li>
                <li><strong>Giant breeds:</strong> Slow growth formula to prevent skeletal issues.</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                3. Activity Level
              </h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Highly active dogs:</strong> Performance formulas with higher protein and fat.</li>
                <li><strong>Moderate activity:</strong> Standard maintenance formulas.</li>
                <li><strong>Low activity/indoor dogs:</strong> Weight management formulas with lower calories.</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                4. Health Conditions
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                If your dog has health issues, consult your veterinarian. Specialised diets are available for:
              </p>
              <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80">
                <li>• Allergies and sensitivities (limited ingredient diets)</li>
                <li>• Weight management (low-calorie formulas)</li>
                <li>• Kidney or liver disease (prescription diets)</li>
                <li>• Digestive issues (easily digestible formulas)</li>
                <li>• Joint problems (high glucosamine content)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Top-Rated Dog Food Brands */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Top-Rated Dog Food Brands (2024)
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Based on ingredient quality, nutritional value, and customer reviews, these brands consistently rank among the best:
          </p>

          <div className="space-y-4">
            {[
              {
                name: "Orijen",
                type: "Premium",
                highlight: "85% meat protein, biologically appropriate",
                price: "£££"
              },
              {
                name: "Acana",
                type: "Premium",
                highlight: "High meat content, regional ingredients",
                price: "£££"
              },
              {
                name: "Royal Canin",
                type: "Veterinary Recommended",
                highlight: "Breed-specific and therapeutic formulas",
                price: "££"
              },
              {
                name: "Hill's Science Diet",
                type: "Veterinary Recommended",
                highlight: "Science-backed nutrition, prescription options",
                price: "££"
              },
              {
                name: "Wellness Core",
                type: "Premium Grain-Free",
                highlight: "High protein, grain-free, natural ingredients",
                price: "££"
              },
              {
                name: "Taste of the Wild",
                type: "Grain-Free",
                highlight: "Novel proteins, affordable premium option",
                price: "££"
              },
            ].map((brand, index) => (
              <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground dark:text-cpCream">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-cpCoral font-medium">{brand.type}</p>
                  </div>
                  <span className="text-cpAmber font-bold">{brand.price}</span>
                </div>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  {brand.highlight}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/30 dark:border-cpAmber/20 mt-6">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
                  Important Note:
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  The "best" brand varies by individual dog. What works brilliantly for one dog may not suit another. Always consult your veterinarian before making significant dietary changes, especially if your dog has health conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Feeding Guidelines and Portion Control */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Feeding Guidelines and Portion Control
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Even the best dog food can lead to health problems if fed incorrectly. Proper portion control is crucial for maintaining a healthy weight.
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
              General Feeding Guidelines:
            </h3>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>• <strong>Follow package recommendations</strong> as a starting point, then adjust based on your dog's body condition</li>
              <li>• <strong>Feed puppies 3-4 times daily</strong> until 6 months old</li>
              <li>• <strong>Adult dogs: 2 meals per day</strong> is optimal for digestion and energy levels</li>
              <li>• <strong>Measure portions accurately</strong> using a measuring cup or scale</li>
              <li>• <strong>Account for treats</strong> - they should be no more than 10% of daily calories</li>
              <li>• <strong>Monitor body condition</strong> - you should be able to feel ribs easily but not see them prominently</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
              Is Your Dog Overweight?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Over 50% of dogs in developed countries are overweight or obese. Excess weight leads to diabetes, joint problems, and shortened lifespan.
            </p>
            <Link
              href="/en/guide/pet-nutrition/pet-weight-loss"
              className="inline-block text-cpCoral hover:underline font-medium"
            >
              Read our complete guide to pet weight loss →
            </Link>
          </div>
        </section>

        {/* Section 8: Transitioning to New Dog Food */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            How to Transition to New Dog Food
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Sudden food changes can cause digestive upset. Follow this 7-day transition schedule:
          </p>

          <div className="space-y-3">
            {[
              { days: "Days 1-2", old: "75%", new: "25%" },
              { days: "Days 3-4", old: "50%", new: "50%" },
              { days: "Days 5-6", old: "25%", new: "75%" },
              { days: "Day 7+", old: "0%", new: "100%" },
            ].map((stage, index) => (
              <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground dark:text-cpCream">{stage.days}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground dark:text-cpCream/70">
                      Old food: <strong className="text-foreground dark:text-cpCream">{stage.old}</strong>
                    </span>
                    <span className="text-muted-foreground dark:text-cpCream/70">
                      New food: <strong className="text-cpCoral">{stage.new}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/30 dark:border-cpAmber/20 mt-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/80">
              <strong>Watch for digestive issues:</strong> If your dog experiences vomiting, diarrhoea, or loss of appetite during the transition, slow down the process or consult your veterinarian.
            </p>
          </div>
        </section>

        {/* CTA Section 2 */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Need Professional Nutrition Advice?
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Find trusted veterinarians and pet nutritionists near you who can provide personalised feeding recommendations for your dog.
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
                q: "Is grain-free dog food better?",
                a: "Not necessarily. Grain-free is beneficial for dogs with grain allergies, but most dogs tolerate grains well. Recent studies have linked some grain-free diets to heart disease (DCM), so consult your vet before switching."
              },
              {
                q: "Should I feed my dog once or twice a day?",
                a: "Twice daily is generally recommended for adult dogs. It prevents bloat, maintains stable energy levels, and reduces hunger-related behaviour problems. Puppies need 3-4 meals daily."
              },
              {
                q: "Can I mix wet and dry dog food?",
                a: "Yes! Many owners combine both for palatability and hydration benefits. Just ensure total calories remain appropriate for your dog's needs."
              },
              {
                q: "How long does dog food stay fresh?",
                a: "Dry kibble: 6 weeks after opening (store in airtight container). Wet food: 3-5 days refrigerated after opening. Always check expiration dates."
              },
              {
                q: "Should I buy expensive dog food?",
                a: "Price doesn't always equal quality, but premium brands typically use better ingredients. Focus on ingredient quality rather than price. Mid-range brands often offer excellent nutrition without premium prices."
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
            Related Nutrition Guides
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Wet vs Dry Cat Food: Which is Better?",
                desc: "Compare wet and dry cat food to find the best option for your feline friend.",
                href: "/en/guide/pet-nutrition/wet-vs-dry-cat-food"
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
                title: "BARF Diet for Dogs: Complete Guide",
                desc: "Everything you need to know about raw feeding for dogs.",
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

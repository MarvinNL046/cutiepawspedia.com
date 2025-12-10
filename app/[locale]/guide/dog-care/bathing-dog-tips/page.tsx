import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Droplets, AlertTriangle, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Dog Bathing Tips and Best Practices | Complete Washing Guide",
  description: "Master dog bathing with our complete guide. Learn proper techniques, product selection, frequency recommendations, and tips for anxious dogs.",
  keywords: "dog bathing tips, how to bathe a dog, dog shampoo, wash dog properly, dog grooming bath, bathing anxious dogs",
  alternates: {
    canonical: "/en/guide/dog-care/bathing-dog-tips",
    languages: {
      en: "/en/guide/dog-care/bathing-dog-tips",
      nl: "/nl/gids/hondenverzorging/hond-baden-tips",
    },
  },
  openGraph: {
    title: "Dog Bathing Tips and Best Practices | Complete Washing Guide",
    description: "Expert guide to bathing your dog. Learn proper techniques, product selection, and tips for making bath time stress-free for you and your dog.",
    url: "/en/guide/dog-care/bathing-dog-tips",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function BathingDogTipsPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Dog Bathing Tips and Best Practices | Complete Washing Guide",
            description: "Master dog bathing with our complete guide. Learn proper techniques, product selection, frequency recommendations, and tips for anxious dogs.",
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
            publisher: {
              "@type": "Organization",
              name: "CutiePawsPedia",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            datePublished: "2025-01-08",
            dateModified: "2025-01-08",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 dark:border-cpCoral/20 mb-6">
            <Droplets className="w-4 h-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Grooming Essentials</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight">
            Dog Bathing Tips and Best Practices
          </h1>
          <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
            Transform bath time from stressful to enjoyable with our comprehensive guide. Learn proper washing techniques, product selection, and expert tips for keeping your dog clean, healthy, and happy.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-background dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Introduction */}
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Bathing your dog is an essential part of grooming that keeps their coat clean, skin healthy, and removes dirt, allergens, and odours. However, bathing too frequently or using incorrect products and techniques can damage your dog's coat and skin. Finding the right balance is key to maintaining optimal coat condition.
            </p>

            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-8">
              This comprehensive guide covers everything you need to know about bathing your dog, from choosing the right products to mastering proper techniques and dealing with bath-averse dogs. Whether you have a tiny Chihuahua or a giant Newfoundland, these tips will help make bath time easier and more effective.
            </p>

            {/* CTA #1 - Primary */}
            <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20 rounded-2xl p-6 border-l-4 border-cpCoral mb-12">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                🛁 Prefer Professional Dog Bathing?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Find professional groomers offering full bathing and grooming services. Perfect for large dogs, difficult coats, or if you simply want expert care.
              </p>
              <Link
                href="/en/search?category=grooming"
                className="inline-flex items-center gap-2 bg-cpCoral text-white px-6 py-3 rounded-xl font-semibold hover:bg-cpCoral/90 transition-all"
              >
                Find Groomers Near You
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* How Often to Bathe */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              How Often Should You Bathe Your Dog?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              One of the most common questions dog owners ask is about bathing frequency. The answer depends on several factors including coat type, lifestyle, skin condition, and individual needs.
            </p>

            <div className="bg-gradient-to-br from-cpAmber/5 to-cpCoral/5 dark:from-cpAmber/10 dark:to-cpCoral/10 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/30 mb-8">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
                General Bathing Frequency Guidelines
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">Most Dogs: Every 4-8 Weeks</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      This is the sweet spot for most dogs with normal skin and activity levels. Monthly bathing maintains cleanliness without stripping natural oils.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cpAmber flex items-center justify-center text-cpCharcoal font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">Active/Outdoor Dogs: Every 2-4 Weeks</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Dogs who swim, play in mud, or spend lots of time outdoors may need more frequent bathing. Use a gentle, moisturising shampoo to prevent dryness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">Short-Haired Breeds: Every 8-12 Weeks</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Dogs with short, smooth coats (Beagles, Boxers, Dalmatians) often need less frequent bathing. Brushing and spot cleaning can extend time between baths.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cpAmber flex items-center justify-center text-cpCharcoal font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">Oily Coat Breeds: Every 1-2 Weeks</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Breeds like Basset Hounds and Cocker Spaniels naturally produce more oil and may need weekly bathing to prevent odour and skin issues.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral flex items-center justify-center text-white font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">Skin Conditions: As Prescribed</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Dogs with allergies, seborrhoea, or other skin conditions may need medicated baths on a specific schedule recommended by your vet (often 2-3 times weekly).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-2xl p-6 border-l-4 border-red-500 mb-12">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                Warning: Don't Over-Bathe!
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Bathing too frequently strips the natural oils from your dog's coat and skin, leading to dryness, irritation, and paradoxically, even more odour as the skin overproduces oil to compensate. Unless your vet recommends otherwise, avoid bathing more than once weekly.
              </p>
            </div>

            {/* Essential Bathing Supplies */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Essential Dog Bathing Supplies
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Having the right supplies makes bathing easier, more effective, and more enjoyable for both you and your dog.
            </p>

            <div className="space-y-6 mb-12">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
                  1. Dog-Specific Shampoo (Essential)
                </h3>
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-lg p-4 mb-4 border-l-4 border-red-500">
                  <p className="text-sm font-bold text-foreground dark:text-cpCream mb-1">
                    ⚠️ NEVER use human shampoo on dogs!
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Human shampoo has the wrong pH for dog skin (ours is acidic ~5.5, theirs is neutral ~7.5) and will disrupt their skin barrier, causing dryness, irritation, and potential infections.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">General Purpose Shampoo</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Gentle, pH-balanced formula for regular bathing. Look for natural ingredients like oatmeal or aloe vera for sensitive skin.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Medicated Shampoo</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      For specific skin conditions (antifungal, antibacterial, anti-itch). Only use as directed by your vet.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Whitening Shampoo</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      For white or light-colored coats. Brightens and removes staining. Use sparingly as they can be drying.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Deodorising Shampoo</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      For dogs prone to odour. Contains odour-neutralising ingredients rather than just fragrances.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  2. Conditioner (Optional but Recommended)
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Dog conditioner helps detangle long coats, adds shine, and moisturises skin. Essential for breeds with long, silky, or curly coats. Leave-in conditioners work well for daily detangling between baths.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  3. Towels and Drying Equipment
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span><strong>Absorbent towels:</strong> Have at least 2-3 large, highly absorbent towels ready</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span><strong>Microfibre towels:</strong> Super absorbent and quick-drying, great for efficient water removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span><strong>Pet dryer (optional):</strong> Speeds up drying for thick-coated breeds. Use on low heat to avoid burns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span><strong>Air drying:</strong> Fine for most dogs in warm weather, just brush whilst drying to prevent matting</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  4. Other Helpful Items
                </h3>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">→</span>
                    <span>Non-slip bath mat for safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">→</span>
                    <span>Handheld shower attachment or jug</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">→</span>
                    <span>Cotton balls for ears (prevent water entry)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">→</span>
                    <span>Brush or comb for pre-bath grooming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">→</span>
                    <span>Treats for positive reinforcement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">→</span>
                    <span>Old clothes you don't mind getting wet!</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA #2 - Secondary */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-12">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                🛒 Shop for Bathing Supplies
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-4">
                Find pet supply shops offering quality dog shampoos, conditioners, towels, and grooming accessories. Get expert product recommendations.
              </p>
              <Link
                href="/en/search?category=pet-shops"
                className="inline-flex items-center gap-2 text-cpCoral font-semibold hover:text-cpCoral/80 transition-colors"
              >
                Browse Pet Supply Shops
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Step-by-Step Bathing Guide */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Step-by-Step Dog Bathing Guide
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Follow these professional steps for a thorough, effective bath that keeps your dog clean and comfortable.
            </p>

            <div className="space-y-6 mb-12">
              {[
                {
                  step: 1,
                  title: "Pre-Bath Preparation",
                  content: "Brush your dog thoroughly before bathing to remove loose fur, tangles, and mats. Wet mats become tighter and nearly impossible to remove. Place cotton balls gently in ears to prevent water entry. Gather all supplies within arm's reach.",
                },
                {
                  step: 2,
                  title: "Choose the Right Location",
                  content: "Small dogs: kitchen sink or laundry tub. Medium dogs: bathtub with non-slip mat. Large dogs: walk-in shower, large tub, or outdoor hose in warm weather. Ensure good drainage and comfortable temperature.",
                },
                {
                  step: 3,
                  title: "Wet Thoroughly with Lukewarm Water",
                  content: "Test water temperature on your wrist - it should feel comfortably warm, not hot. Use a handheld sprayer or jug to wet your dog from neck to tail, working the water down to the skin. Avoid spraying directly in face, ears, or eyes.",
                },
                {
                  step: 4,
                  title: "Apply and Lather Shampoo",
                  content: "Apply shampoo along the back and work into a lather, massaging down to the skin. Work systematically: back, sides, chest, legs, belly, and finally tail. For the head, use a damp cloth with a small amount of diluted shampoo, carefully avoiding eyes and ears.",
                },
                {
                  step: 5,
                  title: "Let Shampoo Sit (If Medicated)",
                  content: "For medicated shampoos, follow vet instructions for contact time (usually 5-10 minutes). This allows active ingredients to work. Regular shampoos can be rinsed immediately after lathering.",
                },
                {
                  step: 6,
                  title: "Rinse Thoroughly",
                  content: "This is the most important step! Rinse until water runs completely clear and no suds remain. Leftover shampoo causes skin irritation and attracts dirt. Pay special attention to armpits, belly, and between toes where residue hides.",
                },
                {
                  step: 7,
                  title: "Apply Conditioner (If Using)",
                  content: "Apply conditioner to coat (avoiding face), massage in, and let sit for 2-3 minutes. Rinse thoroughly. Conditioner helps detangle and adds shine, especially beneficial for long-coated breeds.",
                },
                {
                  step: 8,
                  title: "Final Rinse Check",
                  content: "Do one more complete rinse to ensure absolutely no product remains. Run your hands through the coat - it should feel clean and squeaky, not slippery or soapy.",
                },
                {
                  step: 9,
                  title: "Squeeze Out Excess Water",
                  content: "Use your hands to gently squeeze excess water from legs, tail, and body before your dog shakes (they will shake!). This minimises the spray radius of the inevitable shake-off.",
                },
                {
                  step: 10,
                  title: "Towel Dry Thoroughly",
                  content: "Wrap your dog in an absorbent towel and gently squeeze (don't rub) to remove water. Use multiple dry towels if needed. For long coats, pat dry in the direction of hair growth to prevent tangling.",
                },
                {
                  step: 11,
                  title: "Complete Drying",
                  content: "Air dry in a warm room, or use a pet dryer on low heat setting (never hot). Brush whilst drying to prevent mats from forming. Keep your dog indoors until completely dry, especially in cold weather.",
                },
                {
                  step: 12,
                  title: "Post-Bath Grooming",
                  content: "Once fully dry, give a final brush to remove any loosened fur and distribute natural oils. Remove cotton balls from ears. Reward with treats and praise for good behaviour!",
                },
              ].map((item) => (
                <div key={item.step} className="bg-gradient-to-r from-cpCoral/5 to-transparent dark:from-cpCoral/10 border-l-4 border-cpCoral rounded-r-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cpCoral to-cpAmber flex items-center justify-center text-white font-bold text-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-cpCream/80">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips for Difficult Dogs */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Bathing Anxious or Difficult Dogs
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Many dogs dislike baths, but these techniques can help make the experience more positive:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: "Start Young and Go Slow",
                  desc: "Introduce bathing early in puppyhood with short, positive sessions. Even if they don't need a full bath, get them used to water, the tub, and the process gradually with lots of treats.",
                },
                {
                  title: "Use High-Value Treats",
                  desc: "Have a helper feed continuous treats throughout the bath, or use a lick mat with peanut butter stuck to the tub wall. This creates positive associations with bath time.",
                },
                {
                  title: "Tire Them Out First",
                  desc: "Take your dog for a long walk or play session before bath time. A tired dog is generally calmer and more compliant during grooming.",
                },
                {
                  title: "Consider a Grooming Table",
                  desc: "For small dogs, a raised grooming table with a restraint loop can make bathing easier and safer. The height change often calms dogs who feel vulnerable at ground level.",
                },
                {
                  title: "Try Dry Shampoo",
                  desc: "Between full baths, waterless foam or dry shampoos can freshen your dog without the stress of water. Particularly useful for anxious dogs or quick clean-ups.",
                },
                {
                  title: "Seek Professional Help",
                  desc: "If your dog becomes extremely stressed despite your best efforts, professional groomers have experience handling difficult dogs and proper facilities. Sometimes it's worth the cost.",
                },
              ].map((tip, index) => (
                <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Common Bathing Mistakes */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Common Dog Bathing Mistakes to Avoid
            </h2>

            <div className="space-y-4 mb-12">
              {[
                {
                  mistake: "Using Human Shampoo",
                  why: "Wrong pH level damages skin barrier, causes dryness and irritation",
                  fix: "Always use dog-specific shampoo formulated for their skin pH",
                },
                {
                  mistake: "Not Rinsing Enough",
                  why: "Shampoo residue causes itching, irritation, and attracts dirt",
                  fix: "Rinse until water runs completely clear, then rinse again",
                },
                {
                  mistake: "Water Too Hot or Cold",
                  why: "Hot water burns, cold water stresses - both make dogs hate baths",
                  fix: "Use lukewarm water that feels comfortable on your wrist",
                },
                {
                  mistake: "Bathing Too Frequently",
                  why: "Strips natural oils, leading to dry skin and overactive oil glands",
                  fix: "Follow breed-specific guidelines, usually monthly for most dogs",
                },
                {
                  mistake: "Skipping Pre-Bath Brushing",
                  why: "Wet mats tighten and become nearly impossible to remove",
                  fix: "Always brush thoroughly before bathing, especially long-coated dogs",
                },
                {
                  mistake: "Getting Water in Ears",
                  why: "Trapped water causes painful ear infections",
                  fix: "Use cotton balls in ears, avoid spraying head, check ears after bath",
                },
                {
                  mistake: "Not Drying Completely",
                  why: "Damp skin promotes bacterial/fungal growth, especially in skin folds",
                  fix: "Dry thoroughly, especially armpits, ears, and between toes",
                },
                {
                  mistake: "Bathing When Matted",
                  why: "Water makes existing mats worse and nearly impossible to brush out",
                  fix: "Remove all mats before bathing, or see a professional groomer",
                },
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-2xl p-5 border-l-4 border-red-500">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    ❌ Mistake: {item.mistake}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                    <strong>Why it's bad:</strong> {item.why}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                    ✓ Do this instead: {item.fix}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA #3 - Bottom */}
            <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Make Bath Time Stress-Free
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Professional groomers have the right equipment, products, and expertise to bathe your dog safely and efficiently. Perfect for large breeds, anxious dogs, or when you need expert care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/en/search?category=grooming"
                  className="inline-flex items-center justify-center gap-2 bg-white text-cpCoral px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg"
                >
                  <TrendingUp className="w-5 h-5" />
                  Find Professional Groomers
                </Link>
                <Link
                  href="/en/guide/dog-care"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all border-2 border-white/40"
                >
                  More Dog Care Tips
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Conclusion */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Final Thoughts
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Bathing your dog doesn't have to be a dreaded chore. With the right supplies, proper technique, and a patient approach, bath time can become a bonding experience that keeps your dog clean, healthy, and comfortable. The key is finding the right balance - frequent enough to maintain cleanliness and skin health, but not so often that you strip essential oils.
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Remember that every dog is different. Some love water and happily jump in the tub, whilst others need careful desensitisation and patience. Start young if possible, always use positive reinforcement, and don't be afraid to seek professional help if your dog becomes extremely stressed.
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              If you notice skin issues like excessive itching, redness, flaking, or unusual odour even with regular bathing, consult your veterinarian. These can indicate underlying skin conditions that require veterinary treatment rather than just bathing.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-border dark:border-cpAmber/20">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
              Related Dog Care Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/en/guide/dog-care/best-dog-brushes" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                  Best Dog Brushes
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Find the perfect brush for your dog's coat type
                </p>
              </Link>
              <Link href="/en/guide/dog-care/trimming-dog-nails" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                  Trimming Dog Nails
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Learn how to safely trim your dog's nails at home
                </p>
              </Link>
              <Link href="/en/guide/dog-care/how-often-walk-dog" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                  How Often to Walk Your Dog
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Complete guide to dog walking frequency
                </p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

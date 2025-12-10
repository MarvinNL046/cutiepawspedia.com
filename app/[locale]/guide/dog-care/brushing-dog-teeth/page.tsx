import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, AlertCircle, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Brush Your Dog's Teeth | Complete Dental Care Guide",
  description: "Learn how to brush your dog's teeth properly with our step-by-step guide. Discover the best toothbrushes, toothpaste, and techniques for optimal canine dental health.",
  keywords: "brush dog teeth, dog dental care, dog toothbrush, dog toothpaste, canine dental health, prevent dog tooth decay",
  alternates: {
    canonical: "/en/guide/dog-care/brushing-dog-teeth",
    languages: {
      en: "/en/guide/dog-care/brushing-dog-teeth",
      nl: "/nl/gids/hondenverzorging/tanden-poetsen-hond",
    },
  },
  openGraph: {
    title: "How to Brush Your Dog's Teeth | Complete Dental Care Guide",
    description: "Expert guide to dog dental care. Learn proper brushing techniques, product recommendations, and tips for maintaining your dog's oral health.",
    url: "/en/guide/dog-care/brushing-dog-teeth",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function BrushingDogTeethPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How to Brush Your Dog's Teeth | Complete Dental Care Guide",
            description: "Learn how to brush your dog's teeth properly with our step-by-step guide. Discover the best toothbrushes, toothpaste, and techniques for optimal canine dental health.",
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
      <section className="relative bg-gradient-to-br from-cpAmber/10 via-cpCoral/5 to-transparent dark:from-cpAmber/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAmber/10 dark:bg-cpAmber/20 border border-cpAmber/30 dark:border-cpAmber/20 mb-6">
            <Heart className="w-4 h-4 text-cpAmber" />
            <span className="text-sm font-medium text-cpAmber">Preventive Health Care</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight">
            How to Brush Your Dog's Teeth
          </h1>
          <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
            Master the essential skill of canine dental care with our comprehensive guide. Learn proper brushing techniques, product selection, and daily routines to keep your dog's teeth healthy for life.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-background dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Introduction */}
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Dental disease is one of the most common health problems in dogs, affecting over 80% of dogs by age three. Yet it's also one of the most preventable. Regular tooth brushing is the single most effective way to maintain your dog's dental health, prevent painful dental disease, and avoid costly veterinary procedures.
            </p>

            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-8">
              Whilst many dog owners feel intimidated by the idea of brushing their dog's teeth, it's actually a simple habit that takes just a few minutes daily once your dog is accustomed to it. This comprehensive guide will walk you through everything you need to know about canine dental care.
            </p>

            {/* CTA #1 - Primary */}
            <div className="bg-gradient-to-br from-cpAmber/10 to-cpCoral/10 dark:from-cpAmber/20 dark:to-cpCoral/20 rounded-2xl p-6 border-l-4 border-cpAmber mb-12">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                🦷 Need Professional Dental Cleaning?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Find veterinary clinics offering professional dental cleanings and oral health assessments. Protect your dog from dental disease with expert care.
              </p>
              <Link
                href="/en/search?category=veterinary"
                className="inline-flex items-center gap-2 bg-cpAmber text-cpCharcoal px-6 py-3 rounded-xl font-semibold hover:bg-cpAmber/90 transition-all"
              >
                Find Veterinary Dentists
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Why Dental Care Matters */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Why Dog Dental Care Is Critical
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Poor dental health affects more than just your dog's mouth. Dental disease can lead to serious systemic health problems and significantly impact quality of life.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">💔</span>
                  Heart, Liver, Kidney Damage
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Bacteria from infected gums enter the bloodstream and can damage vital organs, particularly the heart, liver, and kidneys. This can shorten your dog's lifespan by 1-3 years.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">😣</span>
                  Chronic Pain
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Dental disease causes persistent pain that many dogs silently endure. Infected teeth, inflamed gums, and tooth decay are as painful for dogs as they are for humans.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🦴</span>
                  Tooth Loss and Bone Damage
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Advanced periodontal disease destroys the bone supporting teeth, leading to tooth loss. Severe cases can cause jaw fractures, especially in small breeds.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Costly Veterinary Bills
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Professional dental cleanings under anaesthesia cost £200-500. Tooth extractions add £50-200 per tooth. Prevention through daily brushing costs pennies per day.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-2xl p-6 border-l-4 border-red-500 mb-12">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-500" />
                Signs of Dental Disease in Dogs
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-4">
                Watch for these warning signs:
              </p>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Bad breath (halitosis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Yellow or brown tartar buildup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Red, swollen, or bleeding gums</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Difficulty eating or chewing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Pawing at mouth or face rubbing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Excessive drooling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Loose or missing teeth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Reduced appetite or weight loss</span>
                </li>
              </ul>
            </div>

            {/* Choosing the Right Tools */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Essential Dog Dental Care Products
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Using the right products makes brushing easier, more effective, and safer for your dog. Here's what you need:
            </p>

            <div className="space-y-6 mb-12">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
                  1. Dog Toothpaste (Essential)
                </h3>
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-lg p-4 mb-4 border-l-4 border-red-500">
                  <p className="text-sm font-bold text-foreground dark:text-cpCream mb-1">
                    ⚠️ NEVER use human toothpaste on dogs!
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Human toothpaste contains xylitol and fluoride, both toxic to dogs. Always use toothpaste specifically formulated for dogs.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Dog toothpaste comes in flavours dogs love (chicken, beef, peanut butter) and is safe to swallow. It contains enzymes that help break down plaque and freshen breath.
                </p>
                <div className="text-sm text-cpCoral font-medium">
                  💰 Popular brands: Virbac C.E.T., Arm & Hammer, Petrodex (£5-12)
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
                  2. Dog Toothbrush (Choose Based on Size)
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Finger Brush</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Soft silicone brush that fits over your finger. Great for puppies and small dogs, or introducing tooth brushing. More control but less reach.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Standard Dog Toothbrush</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Angled handle with soft bristles in various sizes. Best for most dogs. Choose size based on dog's mouth size (small/medium/large).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Dual-Ended Brush</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Two brush heads of different sizes. Versatile option if you have multiple dogs or want options for different teeth areas.
                    </p>
                  </div>
                </div>
                <div className="text-sm text-cpCoral font-medium">
                  💰 Cost: £3-10. Replace every 3 months or when bristles fray.
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
                  3. Optional: Dental Wipes and Rinses
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                  Dental wipes are good for dogs who won't tolerate a brush, though they're less effective than brushing. Dental rinses can be added to water for additional protection but don't replace brushing.
                </p>
                <div className="text-sm text-cpCoral font-medium">
                  💰 Dental wipes: £6-10 | Dental rinses: £8-15
                </div>
              </div>
            </div>

            {/* CTA #2 - Secondary */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-12">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                🛍️ Shop for Dental Care Products
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-4">
                Browse pet supply shops offering dog toothbrushes, toothpaste, dental chews, and more. Find quality products recommended by veterinarians.
              </p>
              <Link
                href="/en/search?category=pet-shops"
                className="inline-flex items-center gap-2 text-cpCoral font-semibold hover:text-cpCoral/80 transition-colors"
              >
                Find Pet Supply Shops
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Training Your Dog */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Getting Your Dog Comfortable with Tooth Brushing
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              The key to successful tooth brushing is gradual desensitisation. Don't rush the process - taking a week or two to build comfort will pay off with years of stress-free brushing.
            </p>

            <div className="space-y-6 mb-12">
              {[
                {
                  week: "Days 1-2",
                  title: "Mouth Touch Acclimation",
                  content: "Gently lift your dog's lips and touch their teeth and gums with your finger for a few seconds. Reward with treats and praise. Repeat several times daily. Build positive associations with mouth handling.",
                },
                {
                  week: "Days 3-4",
                  title: "Introduce Toothpaste Taste",
                  content: "Let your dog lick toothpaste from your finger. Most dogs love the flavour! Continue touching mouth whilst rewarding. This creates positive association with the toothpaste.",
                },
                {
                  week: "Days 5-6",
                  title: "Finger Brushing with Paste",
                  content: "Apply toothpaste to your finger and gently rub along the gumline and teeth for 10-20 seconds. Focus on the outer surfaces of teeth. Reward heavily after each session.",
                },
                {
                  week: "Days 7-10",
                  title: "Introduce the Toothbrush",
                  content: "Let your dog sniff and lick the toothbrush with toothpaste. Then gently brush a few teeth for 5-10 seconds. Gradually increase duration. Always end on a positive note with treats.",
                },
                {
                  week: "Days 11+",
                  title: "Full Brushing Routine",
                  content: "Work up to brushing all teeth for 30-60 seconds total. Focus on outer surfaces where plaque accumulates most. Make it part of daily routine at the same time each day.",
                },
              ].map((step, index) => (
                <div key={index} className="bg-gradient-to-r from-cpCoral/5 to-transparent dark:from-cpCoral/10 border-l-4 border-cpCoral rounded-r-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="px-3 py-1 rounded-full bg-cpCoral text-white text-sm font-bold">
                        {step.week}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-cpCream/80">
                        {step.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Proper Brushing Technique */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Proper Brushing Technique
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Once your dog is comfortable with the process, follow these steps for effective brushing:
            </p>

            <div className="bg-gradient-to-br from-cpAmber/5 to-cpCoral/5 dark:from-cpAmber/10 dark:to-cpCoral/10 rounded-2xl p-8 border border-cpAmber/20 dark:border-cpAmber/30 mb-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cpAmber to-cpCoral flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Choose the Right Time</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Brush when your dog is calm - perhaps after a walk or play session. Make it part of the daily routine at the same time each day (many people brush before bedtime).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cpAmber to-cpCoral flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Position Your Dog Comfortably</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Sit beside your dog or have them in your lap if small. Use a gentle but confident approach. If your dog seems stressed, take a break and try again later.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cpAmber to-cpCoral flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Apply Toothpaste and Start Brushing</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Apply pea-sized amount of toothpaste to brush. Gently lift your dog's lip and start with the large canine teeth. Use gentle circular motions at a 45-degree angle to the gumline.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cpAmber to-cpCoral flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Focus on Outer Surfaces</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Concentrate on the outer tooth surfaces where plaque accumulates most. The tongue naturally cleans inner surfaces, so those are less critical. Work systematically: upper right, upper left, lower right, lower left.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cpAmber to-cpCoral flex items-center justify-center text-white font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Pay Attention to Back Teeth</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      The large molars at the back accumulate the most plaque and tartar. Don't skip these even though they're harder to reach. Use your finger to gently pull back the cheek for better access.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cpAmber to-cpCoral flex items-center justify-center text-white font-bold">
                    6
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Reward and Praise</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Finish with enthusiastic praise and a small treat (not immediately - wait 30 minutes to let toothpaste work). Your positive energy helps build good associations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Frequency and Timing */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              How Often Should You Brush?
            </h2>

            <div className="bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-green-900/10 rounded-2xl p-6 border-l-4 border-green-500 mb-8">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                ✅ Ideal: Daily Brushing
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                Plaque hardens into tartar within 24-48 hours. Daily brushing prevents this hardening, keeping teeth clean and preventing dental disease. This is the gold standard recommended by veterinary dentists.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cpAmber/5 to-cpCoral/5 dark:from-cpAmber/10 dark:to-cpCoral/10 rounded-2xl p-6 border-l-4 border-cpAmber mb-8">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                ⚡ Minimum: 3-4 Times Per Week
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80">
                If daily brushing isn't possible, aim for at least three to four times per week. This still provides significant benefits, though not as comprehensive as daily brushing. Consistency is key.
              </p>
            </div>

            {/* Additional Dental Care */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Complementary Dental Care Methods
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Whilst brushing is most effective, these additional methods support overall dental health:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: "Dental Chews and Treats",
                  desc: "Look for products with the VOHC (Veterinary Oral Health Council) seal. These are proven to reduce plaque and tartar. Use daily but don't rely on them alone - they're supplements to brushing, not replacements.",
                },
                {
                  title: "Dental Diet",
                  desc: "Prescription dental diets have larger kibble pieces with special texture that mechanically cleans teeth as your dog chews. Ask your vet about brands like Hill's t/d or Royal Canin Dental.",
                },
                {
                  title: "Dental Toys",
                  desc: "Rubber toys with ridges and nubs can help massage gums and scrape teeth during play. Avoid very hard items like antlers or bones that can fracture teeth.",
                },
                {
                  title: "Professional Cleanings",
                  desc: "Even with diligent home care, most dogs benefit from professional dental cleaning every 1-3 years. Your vet will assess frequency based on breed and dental health.",
                },
                {
                  title: "Water Additives",
                  desc: "Dental water additives create an antibacterial environment in the mouth. Choose products with the VOHC seal. These are helpful additions but don't replace brushing.",
                },
                {
                  title: "Raw Bones (with Caution)",
                  desc: "Large raw bones can help clean teeth naturally, but carry risks (broken teeth, choking, bacterial contamination). Consult your vet before offering and always supervise.",
                },
              ].map((method, index) => (
                <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    {method.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA #3 - Bottom */}
            <div className="bg-gradient-to-br from-cpAmber via-cpAmber/90 to-cpCoral rounded-2xl p-8 text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-cpCharcoal mb-3">
                Protect Your Dog's Dental Health
              </h3>
              <p className="text-cpCharcoal/80 mb-6 max-w-2xl mx-auto">
                Find veterinarians offering dental assessments, cleanings, and advice. Early intervention prevents painful dental disease and costly treatments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/en/search?category=veterinary"
                  className="inline-flex items-center justify-center gap-2 bg-cpCharcoal text-cpCream px-8 py-4 rounded-xl font-bold hover:bg-cpCharcoal/90 transition-all shadow-lg"
                >
                  <TrendingUp className="w-5 h-5" />
                  Find Veterinarians
                </Link>
                <Link
                  href="/en/guide/dog-care"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 text-cpCharcoal px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all border-2 border-cpCharcoal/20"
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
              Brushing your dog's teeth is one of the most impactful things you can do for their long-term health and happiness. Whilst it may seem daunting at first, with patience, the right tools, and gradual training, most dogs learn to tolerate or even enjoy the routine.
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Remember that dental disease is painful, progressive, and completely preventable. Just a few minutes of daily brushing can prevent years of pain, preserve your dog's teeth well into their senior years, and save thousands in veterinary bills. The investment in time and effort now pays lifelong dividends.
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              If your dog already has signs of dental disease, schedule a veterinary dental assessment before starting home brushing. Your vet may recommend professional cleaning first to create a healthy baseline, then you can maintain that health through daily brushing.
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
              <Link href="/en/guide/dog-care/bathing-dog-tips" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                  Dog Bathing Tips
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Complete guide to bathing your dog properly
                </p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

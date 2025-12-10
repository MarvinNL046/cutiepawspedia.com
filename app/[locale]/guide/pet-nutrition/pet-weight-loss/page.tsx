import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, TrendingDown, AlertTriangle, Info, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Help Your Pet Lose Weight Safely: Complete Guide 2024",
  description: "Safe and effective weight loss strategies for overweight dogs and cats. Expert diet tips, exercise plans, and portion control for healthy pet weight management.",
  keywords: "pet weight loss, overweight dog, overweight cat, pet diet, pet exercise, healthy pet weight",
  alternates: {
    languages: {
      "nl": "/nl/gids/huisdiervoeding/huisdier-afvallen",
      "en": "/en/guide/pet-nutrition/pet-weight-loss",
    },
  },
  openGraph: {
    title: "How to Help Your Pet Lose Weight Safely: Complete Guide",
    description: "Evidence-based strategies for safe pet weight loss. Help your dog or cat achieve a healthy weight and live longer.",
  },
};

export default function PetWeightLossPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Schema.org Article markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Help Your Pet Lose Weight Safely: Complete Guide 2024",
            "description": "Safe and effective weight loss strategies for overweight dogs and cats with expert diet and exercise recommendations.",
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
            <TrendingDown className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Pet Health & Weight Management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            How to Help Your Pet <span className="text-cpCoral">Lose Weight Safely</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Over 50% of dogs and cats in developed countries are overweight or obese. Excess weight isn't just a cosmetic issue—it significantly reduces your pet's quality of life and lifespan. The good news? With the right approach, most pets can safely achieve a healthy weight and enjoy a longer, more active life.
          </p>

          {/* Warning Box */}
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/30 dark:border-cpAmber/20 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
                  Always Consult Your Veterinarian First
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Before starting any weight loss programme, have your pet examined by a veterinarian to rule out underlying health conditions and create a safe, tailored plan.
                </p>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Find veterinarians specialising in pet nutrition and weight management
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
        {/* Section 1: Is Your Pet Overweight? */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Is Your Pet Overweight? How to Tell
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Many pet owners don't realise their pet is overweight. Use this simple Body Condition Score (BCS) test to assess your pet:
          </p>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 border border-cpCoral/20 dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              The Rib Test (Most Reliable)
            </h3>
            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-4">
                <p className="text-sm font-bold text-green-600 dark:text-green-400 mb-2">✓ Ideal Weight:</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  You can <strong>feel ribs easily</strong> with gentle pressure, but can't see them prominently. Visible waist when viewed from above. Tucked abdomen when viewed from side.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-4">
                <p className="text-sm font-bold text-cpAmber mb-2">⚠ Overweight:</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Ribs are <strong>difficult to feel</strong> under fat layer. No visible waist. Abdominal fat pad present. Waddling gait.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-4">
                <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">✗ Obese:</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Ribs <strong>cannot be felt</strong> due to thick fat. Massive fat deposits on chest, spine, and tail base. Abdominal distension. Difficulty breathing or walking.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream">
              Additional Warning Signs:
            </h3>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>✓ Reluctance to exercise or play</li>
              <li>✓ Difficulty jumping or climbing stairs</li>
              <li>✓ Excessive panting or breathing difficulty</li>
              <li>✓ Sleeping more than usual</li>
              <li>✓ Visible fat deposits on chest or back</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Health Risks of Pet Obesity */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Why Pet Weight Matters: Serious Health Risks
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Excess weight isn't just uncomfortable—it dramatically increases the risk of serious diseases and can reduce your pet's lifespan by 2-3 years.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Diabetes",
                desc: "Obesity is the leading risk factor for Type 2 diabetes in cats and dogs. Requires lifelong insulin treatment."
              },
              {
                title: "Joint Disease & Arthritis",
                desc: "Extra weight puts enormous stress on joints, leading to painful arthritis and reduced mobility."
              },
              {
                title: "Heart Disease",
                desc: "Excess fat forces the heart to work harder, increasing risk of heart failure and high blood pressure."
              },
              {
                title: "Respiratory Problems",
                desc: "Fat around chest and neck makes breathing difficult, especially during exercise or in hot weather."
              },
              {
                title: "Liver Disease",
                desc: "Fatty liver disease (hepatic lipidosis) in cats can be life-threatening."
              },
              {
                title: "Cancer",
                desc: "Overweight pets have higher rates of certain cancers, including bladder and breast cancer."
              },
              {
                title: "Shorter Lifespan",
                desc: "Studies show overweight pets live 2-3 years less than their healthy-weight counterparts."
              },
              {
                title: "Reduced Quality of Life",
                desc: "Less energy for play, difficulty grooming, heat intolerance, and overall discomfort."
              },
            ].map((risk, index) => (
              <div key={index} className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-200 dark:border-red-800/30">
                <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">{risk.title}</h4>
                <p className="text-sm text-red-800 dark:text-red-300">{risk.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Causes of Pet Obesity */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            What Causes Pet Obesity?
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                1. Overfeeding (Most Common Cause)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                Many owners feed based on package recommendations without considering their pet's actual activity level or inadvertently feed too much by estimating portions.
              </p>
              <p className="text-sm text-cpCoral font-medium">
                Solution: Measure portions accurately using a measuring cup or scale.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                2. Too Many Treats
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                Treats can add up to 20-30% extra calories daily. Many owners underestimate treat calories.
              </p>
              <p className="text-sm text-cpCoral font-medium">
                Solution: Limit treats to 10% of daily calories. Use vegetables (carrots, green beans) as low-calorie alternatives.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                3. Lack of Exercise
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                Modern pets are far less active than their ancestors. Indoor cats and under-exercised dogs burn minimal calories.
              </p>
              <p className="text-sm text-cpCoral font-medium">
                Solution: Daily exercise - 30-60 minutes for dogs, 15-20 minutes interactive play for cats.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                4. Spaying/Neutering
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                Altered pets have 20-30% lower metabolic rate and may become less active.
              </p>
              <p className="text-sm text-cpCoral font-medium">
                Solution: Reduce food portions by 20-25% after spaying/neutering and increase exercise.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                5. Medical Conditions (Less Common)
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                Hypothyroidism, Cushing's disease, or other hormonal imbalances can cause weight gain.
              </p>
              <p className="text-sm text-cpCoral font-medium">
                Solution: Rule out medical causes with veterinary examination and blood tests.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Safe Weight Loss Strategy */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Safe Weight Loss Strategy: The Complete Plan
          </h2>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 border border-cpCoral/20 dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Safe Weight Loss Goals:
            </h3>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li><strong>Dogs:</strong> 1-2% of body weight per week (e.g., 200-400g per week for a 20kg dog)</li>
              <li><strong>Cats:</strong> 0.5-1% of body weight per week (e.g., 25-50g per week for a 5kg cat)</li>
              <li><strong>Timeline:</strong> Expect 6-12 months for significant weight loss</li>
              <li><strong>Danger:</strong> Rapid weight loss can cause liver failure in cats (hepatic lipidosis)</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Step 1: Calculate Target Weight
              </h3>
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  Work with your veterinarian to determine your pet's ideal body weight based on breed, age, and body frame.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  <strong>Example:</strong> If your Labrador currently weighs 40kg but ideal weight is 32kg, you need to lose 8kg safely over 8-16 months.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Step 2: Reduce Caloric Intake
              </h3>
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Feed calories based on <strong>target weight</strong>, not current weight:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      <strong>Dogs:</strong> 70 x (target weight in kg)^0.75 = daily calories
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      <strong>Cats:</strong> 50-60 calories per kg of target weight
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Use <strong>weight management food</strong> (lower calories, higher satiety)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Consider <strong>wet food</strong> (lower calorie density, higher satiety)
                    </span>
                  </li>
                </ul>
                <Link
                  href="/en/guide/pet-nutrition/wet-vs-dry-cat-food"
                  className="inline-block mt-4 text-cpCoral hover:underline font-medium text-sm"
                >
                  Learn about wet vs dry food for weight management →
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Step 3: Increase Physical Activity
              </h3>
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Exercise is crucial for maintaining muscle mass during weight loss:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-3">For Dogs:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                      <li>• Daily walks: Start 15 mins, build to 45-60 mins</li>
                      <li>• Swimming (excellent for joint health)</li>
                      <li>• Interactive play: fetch, tug-of-war</li>
                      <li>• Slow jogging (if no joint issues)</li>
                      <li>• Dog sports: agility, flyball</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-3">For Cats:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                      <li>• Interactive toys: laser pointer, feather wand</li>
                      <li>• 2-3 play sessions daily (10-15 mins each)</li>
                      <li>• Cat trees for climbing</li>
                      <li>• Food puzzles and treat balls</li>
                      <li>• Outdoor enclosures (catios)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Step 4: Monitor and Adjust Weekly
              </h3>
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Weigh pet weekly at the same time of day
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Record weight in a journal or app
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Adjust food portions if weight loss stalls
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/80">
                      Monthly vet check-ups during weight loss
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Common Weight Loss Mistakes to Avoid
          </h2>

          <div className="space-y-4">
            {[
              {
                mistake: "Reducing food too drastically",
                why: "Can cause nutrient deficiencies, muscle loss, and in cats, life-threatening liver disease.",
                fix: "Gradual reduction of 20-30% maximum. Use weight management food."
              },
              {
                mistake: "Not measuring food portions",
                why: "Eyeballing portions often leads to overfeeding by 30-50%.",
                fix: "Use measuring cups or a kitchen scale. Be precise."
              },
              {
                mistake: "Giving in to begging",
                why: "Begging is learned behaviour, not hunger. Reinforces the cycle.",
                fix: "Ignore begging completely. Provide scheduled meals and stick to them."
              },
              {
                mistake: "Free-feeding (leaving food out all day)",
                why: "Impossible to control portions and encourages grazing.",
                fix: "Switch to scheduled meals (2-3 times daily for dogs, 2-4 for cats)."
              },
              {
                mistake: "Forgetting to count treat calories",
                why: "A single large dog biscuit can be 100+ calories (10-15% of daily intake).",
                fix: "Use tiny training treats or vegetables. Account for ALL treats in daily calories."
              },
              {
                mistake: "Whole family not on board",
                why: "One person sneaking treats undermines the entire plan.",
                fix: "Family meeting: everyone must commit to the weight loss plan."
              },
            ].map((item, index) => (
              <div key={index} className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border-l-4 border-red-500">
                <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">
                  ✗ {item.mistake}
                </h4>
                <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                  <strong>Why it's a problem:</strong> {item.why}
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  <strong>✓ How to fix it:</strong> {item.fix}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section 2 */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Professional Weight Loss Support
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Work with veterinary professionals who can create a personalised weight loss plan and monitor your pet's progress.
              </p>
              <Link
                href="/en/search?category=veterinary"
                className="inline-block bg-white text-cpCoral hover:bg-white/90 rounded-2xl px-8 py-4 font-semibold shadow-lg hover:-translate-y-1 transition-transform"
              >
                Find Veterinary Nutritionists →
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
                q: "How long should pet weight loss take?",
                a: "Safe weight loss takes 6-12 months for most pets. Losing 1-2% of body weight per week (dogs) or 0.5-1% (cats) is ideal. Never rush weight loss, especially in cats, as it can cause fatal liver disease."
              },
              {
                q: "Can I use human diet food for my pet?",
                a: "No. Human diet foods often lack essential nutrients pets need and may contain ingredients harmful to pets. Always use veterinary-approved pet food."
              },
              {
                q: "My pet acts starving all the time. Should I feed more?",
                a: "No. Overweight pets often have larger stomachs and are accustomed to overeating. The begging will decrease over 2-3 weeks as they adjust. Increase vegetables for volume without calories."
              },
              {
                q: "Is weight management food worth the extra cost?",
                a: "Yes. Weight management foods have higher protein and fibre for satiety, lower calories, and balanced nutrients. They make weight loss safer and more effective."
              },
              {
                q: "My pet has arthritis. Can they still exercise?",
                a: "Yes! Low-impact exercise like swimming, short frequent walks, or gentle play is crucial. Consult your vet about pain management to make exercise comfortable."
              },
              {
                q: "Will my pet's skin sag after weight loss?",
                a: "Gradual weight loss usually allows skin to shrink naturally. Rapid weight loss may cause loose skin, especially in previously obese pets. This is cosmetic and doesn't affect health."
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
                title: "Best Dog Food: Complete Guide",
                desc: "Choose quality nutrition that supports healthy weight management.",
                href: "/en/guide/pet-nutrition/best-dog-food"
              },
              {
                title: "Wet vs Dry Cat Food",
                desc: "Wet food's lower calorie density can help with weight loss.",
                href: "/en/guide/pet-nutrition/wet-vs-dry-cat-food"
              },
              {
                title: "Toxic Foods for Dogs and Cats",
                desc: "Avoid dangerous foods while managing your pet's diet.",
                href: "/en/guide/pet-nutrition/toxic-foods-dogs-cats"
              },
              {
                title: "BARF Diet for Dogs",
                desc: "Raw feeding can support healthy weight with proper portioning.",
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
              Discover trusted veterinarians, pet nutritionists, and fitness services in your area.
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

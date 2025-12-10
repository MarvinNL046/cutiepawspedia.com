/**
 * SEO Landing Page: Senior Cat Care Guide
 * Pillar: Senior Pets (Senior-pets)
 * Target: English-speaking pet owners with ageing cats
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Droplet, Scale, Moon, Stethoscope, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Senior Cat Care Guide: Complete Care for Ageing Cats 2025",
  description: "Expert senior cat care: when cats become seniors, health monitoring, nutrition, common conditions and quality of life. Help your elderly cat thrive.",
  keywords: [
    "senior cat care",
    "older cat health",
    "ageing cat symptoms",
    "elderly cat nutrition",
    "senior cat veterinary care",
    "geriatric cat care",
    "old cat kidney disease",
    "senior cat behaviour changes"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/senior-pets/senior-cat-care',
      'nl': '/nl/gids/senior-pets/katten-op-leeftijd',
    },
  },
  openGraph: {
    title: "Senior Cat Care Guide: Complete Care for Ageing Cats",
    description: "Everything you need to know about caring for your senior cat: health monitoring, nutrition, common conditions and quality of life.",
    type: "article",
  },
};

export default function SeniorCatCare() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Senior Pets</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Senior Cat Care: Your Complete Guide to Ageing Cats
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Cats are masters at hiding illness, making senior cat care especially important. Learn to recognise age-related changes, monitor health and provide the best care for your elderly feline companion.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🏥 Senior cat health concerns?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=veterinary">
                Find a Feline Specialist Vet Near You →
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
            With advances in veterinary care and nutrition, cats are living longer than ever - many reaching 15-20 years or more. However, this longevity means more cats experience age-related health conditions that require attentive care and monitoring.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Cats are considered "senior" from around 11 years old, and "geriatric" from 15 years onwards. This guide covers everything you need to know about caring for your ageing cat, from nutrition and health monitoring to managing common senior cat conditions.
          </p>
        </section>

        {/* When is a Cat Considered Senior? */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Moon className="h-7 w-7 text-cpCoral" />
            Life Stages of Cats
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-12 h-8 rounded-lg bg-cpCoral/20 text-cpCoral flex items-center justify-center font-bold text-sm">0-1</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Kitten</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Rapid growth and development phase</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-12 h-8 rounded-lg bg-cpAmber/20 text-cpAmber flex items-center justify-center font-bold text-sm">1-6</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Young Adult</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Prime years with peak health and activity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-12 h-8 rounded-lg bg-cpCoral/20 text-cpCoral flex items-center justify-center font-bold text-sm">7-10</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Mature Adult</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Early signs of ageing may appear (equivalent to human 40s-50s)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-12 h-8 rounded-lg bg-cpAmber/20 text-cpAmber flex items-center justify-center font-bold text-sm">11-14</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Senior</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Increased risk of age-related diseases (equivalent to human 60s-70s)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-12 h-8 rounded-lg bg-cpCoral/20 text-cpCoral flex items-center justify-center font-bold text-sm">15+</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Geriatric</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Requires specialized senior care and monitoring (equivalent to human 75+)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Did you know?</strong> Indoor cats typically live 12-18 years, with many reaching their early 20s. The oldest recorded cat lived to 38 years!
            </p>
          </div>
        </section>

        {/* Common Senior Cat Health Conditions */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Stethoscope className="h-7 w-7 text-cpCoral" />
            Common Health Conditions in Senior Cats
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Understanding these conditions helps you spot warning signs early, when treatment is most effective:
          </p>

          <div className="space-y-6">
            {/* Chronic Kidney Disease */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <Droplet className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Chronic Kidney Disease (CKD)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Affects 30-40% of cats over 10 years old. Kidneys gradually lose function, unable to filter blood effectively.
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Warning Signs:</p>
                    <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-1">
                      <li>• Increased drinking and urination</li>
                      <li>• Weight loss despite normal or increased appetite</li>
                      <li>• Poor coat condition</li>
                      <li>• Vomiting and decreased appetite (advanced stages)</li>
                    </ul>
                  </div>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Management:</strong> Special kidney diet, medication, subcutaneous fluids. Early detection through blood tests is crucial - kidney damage isn't reversible but progression can be slowed significantly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hyperthyroidism */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Hyperthyroidism</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Overactive thyroid gland producing excessive hormone. Very common in cats over 10 years (affects 10% of senior cats).
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Warning Signs:</p>
                    <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-1">
                      <li>• Weight loss despite ravenous appetite</li>
                      <li>• Hyperactivity, restlessness or aggression</li>
                      <li>• Increased drinking and urination</li>
                      <li>• Vomiting or diarrhoea</li>
                      <li>• Poor coat condition</li>
                    </ul>
                  </div>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Treatment:</strong> Daily medication, radioactive iodine therapy (curative), or surgical removal of thyroid gland. Very treatable if caught early - blood test confirms diagnosis.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Diabetes */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <Scale className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Diabetes Mellitus</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Inability to regulate blood sugar levels. More common in overweight cats and males.
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Warning Signs:</p>
                    <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-1">
                      <li>• Increased drinking and urination</li>
                      <li>• Increased appetite with weight loss</li>
                      <li>• Lethargy and weakness</li>
                      <li>• Plantigrade stance (walking on hocks)</li>
                    </ul>
                  </div>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Management:</strong> Insulin injections twice daily, low-carbohydrate diet, weight management. Some cats achieve remission with proper treatment and diet. Regular blood glucose monitoring essential.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dental Disease */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Dental Disease</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Affects 70% of cats over 3 years, worsening with age. Causes pain, difficulty eating, and bacteria can spread to heart and kidneys.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Prevention:</strong> Annual dental check-ups, professional cleaning under anaesthesia when needed. Home dental care (brushing, dental treats) helps but can't replace professional care.</p>
              </div>
            </div>

            {/* Arthritis */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Arthritis (Degenerative Joint Disease)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                90% of cats over 12 years have arthritic changes on X-rays. Cats hide pain well, so changes are subtle.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Signs:</strong> Reduced jumping, reluctance to use stairs, sleeping in different places, reduced grooming (especially rear end), stiffness after rest. See our detailed arthritis guide.</p>
              </div>
            </div>

            {/* Cancer */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Cancer</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Leading cause of death in senior cats. Common types include lymphoma, mammary tumours, and squamous cell carcinoma.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Early detection:</strong> Monthly check for lumps, monitor for unexplained weight loss, changes in appetite, difficulty swallowing or breathing. Earlier diagnosis = better treatment outcomes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Worried About Your Senior Cat's Health?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Book a senior cat health check with a feline specialist for expert care and peace of mind.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=veterinary">
                Find Cat Specialist Vets →
              </Link>
            </Button>
          </div>
        </section>

        {/* Senior Cat Nutrition */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Nutrition for Senior Cats
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Nutritional needs change as cats age. Key considerations:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral mt-0.5 flex-shrink-0 text-lg">•</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">High-Quality Protein</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Senior cats need MORE protein (not less) to maintain muscle mass. Look for 35-45% protein from quality sources.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral mt-0.5 flex-shrink-0 text-lg">•</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Lower Phosphorus (for kidney health)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Restricted phosphorus helps slow kidney disease progression. Prescription kidney diets contain 0.3-0.5% phosphorus.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral mt-0.5 flex-shrink-0 text-lg">•</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Increased Moisture</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Wet food (70-80% moisture) helps prevent dehydration and supports kidney function. Add water to food if needed.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral mt-0.5 flex-shrink-0 text-lg">•</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Joint Support</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Glucosamine, chondroitin and omega-3s support joint health. Look for foods with added EPA/DHA from fish oil.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral mt-0.5 flex-shrink-0 text-lg">•</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Easily Digestible</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Senior digestive systems are less efficient. Choose highly digestible proteins and avoid fillers.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Important:</strong> Cats with diagnosed conditions (kidney disease, diabetes, hyperthyroidism) need prescription diets. Consult your vet before changing food for senior cats.
            </p>
          </div>
        </section>

        {/* Monitoring Your Senior Cat */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Health Monitoring Checklist
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Monthly Home Checks:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">□</span>
                <span>Weight (use bathroom scales - weigh yourself, then with cat, subtract difference)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">□</span>
                <span>Body condition (can you feel ribs easily? Visible waist?)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">□</span>
                <span>Litter box habits (frequency, urine volume, stool consistency)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">□</span>
                <span>Water intake (refill bowl same time daily, note how much consumed)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">□</span>
                <span>Appetite and eating behaviour</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">□</span>
                <span>Mobility (jumping, stair use, grooming reach)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">□</span>
                <span>Lumps or skin changes (run hands over entire body)</span>
              </li>
            </ul>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Veterinary Check-ups:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Every 6 months:</strong> Physical examination, weight, blood pressure</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Annually:</strong> Blood tests (kidney function, thyroid, liver, blood sugar), urinalysis</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>As needed:</strong> Dental examination and cleaning, X-rays for mobility issues</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Senior Pet Care Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/senior-pets/arthritis-pets" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Arthritis in Cats</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Recognising and managing feline arthritis →</p>
            </Link>
            <Link href="/en/guide/senior-pets/dementia-dogs-cats" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Dementia in Cats</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Cognitive dysfunction syndrome in senior cats →</p>
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
                When should I switch to senior cat food?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Around 11 years old for most cats, though some may benefit earlier if they're less active or have specific health conditions. Senior foods typically have controlled calories, higher protein, lower phosphorus and added joint support. If your cat has diagnosed kidney disease, diabetes or hyperthyroidism, they'll need a prescription diet tailored to their condition. Always transition gradually over 7-10 days.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How can I tell if my cat is in pain?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Cats are expert at hiding pain. Look for: reduced activity, sleeping more, reluctance to jump or climb, decreased grooming (especially rear end), eating less, hiding more, or personality changes (aggression or withdrawal). Changed litter box habits (going outside box, difficulty getting in/out) often indicate pain. Any sudden behaviour change warrants a vet check.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Why is my senior cat drinking so much water?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Increased drinking (polydipsia) is a key warning sign of kidney disease, diabetes and hyperthyroidism - the three most common senior cat conditions. Normal water intake is approximately 50ml per kg body weight daily. If your cat is drinking noticeably more, or the water bowl needs refilling more frequently, book a vet appointment promptly. Early diagnosis significantly improves outcomes for all these conditions.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How often should senior cats visit the vet?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Every 6 months for cats 11-14 years old, and potentially every 3-4 months for geriatric cats (15+) or those with chronic conditions. Annual blood tests are crucial for early detection of kidney disease, hyperthyroidism and diabetes. Many age-related conditions can be managed effectively if caught early, but become serious if left untreated. The cost of preventive care is significantly less than treating advanced disease.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need more advice on senior pet care and services?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en/search">
                Explore All Pet Services →
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
            "headline": "Senior Cat Care Guide: Complete Care for Ageing Cats",
            "description": "Expert senior cat care covering health monitoring, common conditions, nutrition and quality of life for elderly cats.",
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
              "@id": "https://cutiepawspedia.com/en/guide/senior-pets/senior-cat-care"
            }
          })
        }}
      />
    </div>
  );
}

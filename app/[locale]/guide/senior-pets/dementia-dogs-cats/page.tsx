/**
 * SEO Landing Page: Dementia in Dogs and Cats
 * Pillar: Senior Pets (Senior-pets)
 * Target: English-speaking pet owners with cognitively declining pets
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Moon, Calendar, Home, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Dementia in Dogs and Cats: Signs, Stages & Management 2025",
  description: "Complete guide to pet dementia (cognitive dysfunction syndrome): recognise symptoms, understand progression and manage care. Help your senior pet with dementia.",
  keywords: [
    "dementia in dogs",
    "dementia in cats",
    "canine cognitive dysfunction",
    "feline cognitive dysfunction",
    "senior pet dementia symptoms",
    "dog dementia stages",
    "cat dementia signs",
    "pet dementia treatment",
    "sundowner syndrome pets"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/senior-pets/dementia-dogs-cats',
      'nl': '/nl/gids/senior-pets/dementie-honden-katten',
    },
  },
  openGraph: {
    title: "Dementia in Dogs and Cats: Signs, Stages & Management",
    description: "Recognise cognitive dysfunction in senior pets and learn how to provide supportive care for pets with dementia.",
    type: "article",
  },
};

export default function DementiaInPets() {
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
            Dementia in Dogs and Cats: Recognition and Care
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Cognitive dysfunction syndrome (CDS) - commonly called pet dementia - affects many senior animals. Learn to recognise the signs, understand disease progression and provide compassionate care.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🧠 Concerned about cognitive changes in your pet?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=veterinary">
                Consult a Vet About Senior Pet Care →
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
            Cognitive dysfunction syndrome (CDS) is a progressive neurological condition similar to Alzheimer's disease in humans. It affects approximately 14-35% of dogs over 8 years old and 28% of cats aged 11-14 years, rising to over 50% in pets older than 15 years.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Whilst dementia can't be cured, early recognition and intervention can slow progression and significantly improve quality of life. Many behaviours attributed to "normal ageing" are actually signs of cognitive decline that could benefit from treatment.
          </p>
        </section>

        {/* What is CDS */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Brain className="h-7 w-7 text-cpCoral" />
            What is Cognitive Dysfunction Syndrome?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              CDS is caused by physical changes in the brain including:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span>Accumulation of beta-amyloid protein (similar to Alzheimer's)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span>Reduced blood flow and oxygen to the brain</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span>Brain shrinkage (atrophy)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span>Loss of neurons and reduced neurotransmitter function</span>
              </li>
            </ul>
            <p className="text-sm text-foreground dark:text-cpCream italic">
              These changes lead to altered behaviour, memory loss, confusion and changes in sleep-wake cycles.
            </p>
          </div>
        </section>

        {/* DISHAA Signs */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Recognising Dementia: The DISHAA Signs
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Veterinarians use the acronym <strong>DISHAA</strong> to identify cognitive dysfunction:
          </p>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border-l-4 border-cpCoral p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">D</span>
                Disorientation
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Getting stuck in corners or behind furniture</li>
                <li>• Staring at walls or into space</li>
                <li>• Walking aimlessly or in circles</li>
                <li>• Not recognising familiar people or places</li>
                <li>• Going to wrong side of door to be let out</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border-l-4 border-cpAmber p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center text-sm font-bold">I</span>
                Interactions (changed social behaviour)
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Less interest in greeting family members</li>
                <li>• Reduced response to petting or commands</li>
                <li>• Seeking attention less (or more) than usual</li>
                <li>• Irritability or aggression (unusual for pet)</li>
                <li>• Confusion about other pets in household</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border-l-4 border-cpCoral p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">S</span>
                Sleep-Wake Cycles
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Awake and restless at night (sundowner syndrome)</li>
                <li>• Pacing, vocalising or wandering at night</li>
                <li>• Sleeping more during the day</li>
                <li>• Reversed day-night schedule</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border-l-4 border-cpAmber p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center text-sm font-bold">H</span>
                House Soiling
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Toileting indoors despite being housetrained</li>
                <li>• Forgetting to signal need to go out</li>
                <li>• Not remembering where litter tray is (cats)</li>
                <li>• Loss of awareness that they've toileted</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border-l-4 border-cpCoral p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">A</span>
                Activity (changes in activity level)
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Reduced interest in toys, play or activities</li>
                <li>• Decreased exploration and curiosity</li>
                <li>• Repetitive behaviours (pacing, licking)</li>
                <li>• Staring at nothing for extended periods</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border-l-4 border-cpAmber p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center text-sm font-bold">A</span>
                Anxiety
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Increased fear or anxiety</li>
                <li>• Vocalising more (whining, howling, meowing)</li>
                <li>• Separation anxiety (even in short absences)</li>
                <li>• Trembling or panting without cause</li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4 mt-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Important:</strong> These symptoms can also indicate other medical conditions (pain, sensory loss, organ disease). Always consult your vet for proper diagnosis before assuming dementia.
            </p>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Notice Cognitive Changes in Your Pet?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Early intervention can slow progression. Book a senior pet assessment today.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=veterinary">
                Find Vets Near You →
              </Link>
            </Button>
          </div>
        </section>

        {/* Management */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Lightbulb className="h-7 w-7 text-cpCoral" />
            Managing Cognitive Dysfunction
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Whilst dementia is progressive and incurable, treatment can improve symptoms and quality of life:
          </p>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">1. Medication</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Selegiline (Anipryl, Selgian):</strong> Licensed for canine cognitive dysfunction. Increases dopamine levels in the brain. 60-70% of dogs show improvement within 2-4 weeks.
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                <strong>Propentofylline (Vivitonin):</strong> Improves blood flow to the brain. May help cats and dogs.
              </p>
              <p className="text-xs text-foreground dark:text-cpCream italic">
                Some vets prescribe anti-anxiety medication to help with sundowner syndrome and night-time distress.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">2. Therapeutic Diets</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Prescription diets enriched with antioxidants, omega-3 fatty acids and medium-chain triglycerides support brain health.
              </p>
              <p className="text-xs text-foreground dark:text-cpCream">
                <strong>Examples:</strong> Hills b/d, Purina Pro Plan Neurocare
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">3. Supplements</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• <strong>Omega-3 fatty acids (DHA/EPA):</strong> Support brain cell membranes</li>
                <li>• <strong>Antioxidants (Vitamins E, C):</strong> Reduce oxidative damage</li>
                <li>• <strong>SAMe:</strong> May improve cognitive function</li>
                <li>• <strong>Ginkgo Biloba:</strong> Improves blood flow (limited evidence)</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">4. Environmental Enrichment</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Gentle mental stimulation (puzzle feeders, sniffing games)</li>
                <li>• Regular gentle exercise within abilities</li>
                <li>• Consistent routine and predictable environment</li>
                <li>• Social interaction with family</li>
                <li>• Novel experiences in small doses</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">5. Home Modifications</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Night lights to reduce disorientation</li>
                <li>• Consistent furniture placement (don't rearrange)</li>
                <li>• Multiple water bowls in different locations</li>
                <li>• Easy access to food, water, bed and litter tray</li>
                <li>• Block off stairs or dangerous areas</li>
                <li>• Soft bedding in familiar locations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sundowner Syndrome */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Moon className="h-7 w-7 text-cpCoral" />
            Managing Sundowner Syndrome
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Many pets with dementia experience increased confusion, restlessness and vocalisation in the evening and night - called sundowner syndrome.
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Strategies to Help:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">✓</span>
                <span>Increase daytime activity and exercise (prevents excess daytime sleeping)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">✓</span>
                <span>Feed main meal in evening (full stomach promotes sleep)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">✓</span>
                <span>Provide dim night lights to reduce disorientation</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">✓</span>
                <span>Calming music or white noise</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">✓</span>
                <span>DAP diffusers (Dog Appeasing Pheromone) or Feliway (cats)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">✓</span>
                <span>Speak to vet about medication if severe (melatonin, trazodone, gabapentin)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Senior Pet Care
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/senior-pets/caring-older-dog" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Caring for Your Older Dog</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete senior dog health guide →</p>
            </Link>
            <Link href="/en/guide/senior-pets/senior-cat-care" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Senior Cat Care</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Health monitoring for ageing cats →</p>
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
                Can dementia in pets be prevented?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                There's no guaranteed prevention, but risk can be reduced through: lifelong mental stimulation and learning, regular exercise, high-quality diet rich in antioxidants and omega-3s, maintaining healthy weight, treating chronic health conditions promptly, and regular vet check-ups to catch issues early. Think of it like brain health in humans - an active, stimulated brain ages better.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How quickly does dementia progress in pets?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Progression varies significantly between individuals. Some pets decline slowly over 2-3 years with mild symptoms, whilst others deteriorate more rapidly. Early intervention with medication, diet and environmental management can slow progression. Regular monitoring helps track changes and adjust care accordingly. Most pets with dementia can enjoy good quality of life for months to years with appropriate support.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is house soiling always a sign of dementia?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                No. House soiling in senior pets can indicate many conditions: urinary tract infections, kidney disease, diabetes, arthritis (pain prevents getting to litter box/outside), inflammatory bowel disease, or medication side effects. Always rule out medical causes first before attributing to dementia. Your vet will need to perform physical examination, urine tests and possibly blood tests to determine the cause.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                When is it time to consider euthanasia?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                This deeply personal decision should be made with your vet's guidance. Consider euthanasia when your pet has more bad days than good, medication no longer helps, they're in distress that can't be relieved, they've stopped eating/drinking, or quality of life is poor despite all interventions. Use quality of life scales (available online) to help assess objectively. Remember, letting go when quality of life has declined is a final act of love and kindness.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need more senior pet care advice and support?
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
            "headline": "Dementia in Dogs and Cats: Signs, Stages & Management",
            "description": "Complete guide to recognising and managing cognitive dysfunction syndrome in senior pets. Symptoms, treatment and supportive care.",
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
              "@id": "https://cutiepawspedia.com/en/guide/senior-pets/dementia-dogs-cats"
            }
          })
        }}
      />
    </div>
  );
}

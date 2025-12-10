/**
 * SEO Landing Page: Caring for Your Older Dog
 * Pillar: Senior Pets (Senior-pets)
 * Target: English-speaking pet owners with ageing dogs
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Stethoscope, Utensils, Activity, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Caring for Your Older Dog: Complete Senior Dog Guide 2025",
  description: "Expert guide to senior dog care: nutrition, exercise, health checks, mobility support and quality of life. Help your ageing dog thrive in their golden years.",
  keywords: [
    "senior dog care",
    "older dog health",
    "ageing dog nutrition",
    "senior dog exercise",
    "old dog symptoms",
    "senior dog veterinary care",
    "geriatric dog care",
    "caring for elderly dogs"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/senior-pets/caring-older-dog',
      'nl': '/nl/gids/senior-pets/oudere-hond-verzorgen',
    },
  },
  openGraph: {
    title: "Caring for Your Older Dog: Complete Senior Dog Guide",
    description: "Expert advice on nutrition, exercise, health monitoring and quality of life for your senior dog.",
    type: "article",
  },
};

export default function CaringOlderDog() {
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
            Caring for Your Older Dog: A Complete Guide
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            As your faithful companion enters their golden years, their needs change. Learn how to provide the best possible care for your senior dog to ensure comfort, health and happiness.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🏥 Looking for senior dog veterinary care?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=veterinary">
                Find a Senior Dog Specialist Near You →
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
            Dogs are typically considered "senior" from around 7 years of age, though this varies by breed and size. Large breeds age faster and may be considered senior from 5-6 years, whilst smaller breeds can remain sprightly until 10-12 years. Understanding your dog's changing needs is key to providing excellent senior care.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This comprehensive guide covers nutrition, exercise, health monitoring, mobility support and quality of life considerations for older dogs. With the right care, your senior dog can enjoy many happy, comfortable years.
          </p>
        </section>

        {/* When is a Dog Considered Senior? */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-cpCoral" />
            When is a Dog Considered Senior?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral/20 text-cpCoral flex items-center justify-center font-bold text-sm">G</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Giant Breeds (Great Dane, Mastiff)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Senior from 5-6 years | Average lifespan 8-10 years</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpAmber/20 text-cpAmber flex items-center justify-center font-bold text-sm">L</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Large Breeds (Labrador, German Shepherd)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Senior from 6-8 years | Average lifespan 10-13 years</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral/20 text-cpCoral flex items-center justify-center font-bold text-sm">M</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Medium Breeds (Cocker Spaniel, Beagle)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Senior from 7-9 years | Average lifespan 12-14 years</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpAmber/20 text-cpAmber flex items-center justify-center font-bold text-sm">S</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Small Breeds (Chihuahua, Yorkshire Terrier)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Senior from 9-12 years | Average lifespan 14-16+ years</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Important:</strong> These are guidelines only. Individual dogs age at different rates depending on genetics, lifestyle, diet and overall health throughout their life.
            </p>
          </div>
        </section>

        {/* Senior Dog Nutrition */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Utensils className="h-7 w-7 text-cpCoral" />
            Nutrition for Senior Dogs
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            As dogs age, their metabolism slows and nutritional requirements change. Senior dog food should be:
          </p>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Lower in Calories</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Senior dogs are less active and have slower metabolisms. Reduce calories by 20-30% to prevent obesity, which exacerbates arthritis and heart disease.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Tip:</strong> Monitor body condition monthly - you should be able to feel ribs easily but not see them prominently.</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Higher in Quality Protein</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Muscle mass decreases with age. Look for 25-30% protein from quality sources (chicken, fish, lamb) to maintain muscle and support organ function.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Note:</strong> Dogs with kidney disease may need restricted protein - consult your vet before changing diet.</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Joint Support Supplements</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Glucosamine, chondroitin and omega-3 fatty acids support joint health and reduce inflammation. Many senior foods include these, or they can be added separately.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Dosage:</strong> Typical dose is 20mg glucosamine per kg body weight daily. Effects take 4-8 weeks to show.</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Easy to Digest</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Senior dogs often have sensitive digestion. Choose foods with prebiotics, probiotics and easily digestible ingredients. Consider smaller, more frequent meals.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Dental health:</strong> Soften kibble with warm water if dental disease makes chewing difficult, or switch to wet food.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Exercise and Mobility */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Activity className="h-7 w-7 text-cpCoral" />
            Exercise and Mobility for Older Dogs
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Regular, gentle exercise is crucial for maintaining muscle mass, joint flexibility and mental stimulation. Adapt your routine to your dog's abilities:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Shorter, More Frequent Walks</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Three 15-20 minute walks are better than one 60-minute walk. This prevents overexertion and joint stiffness.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Low-Impact Activities</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Swimming is excellent for arthritic dogs - provides exercise without joint stress. Hydrotherapy pools offer supervised sessions.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Mental Stimulation</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Puzzle feeders, sniffing games and gentle training keep minds active when physical exercise is limited.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Mobility Aids</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Harnesses, ramps for cars/stairs, orthopaedic beds and non-slip flooring help dogs with arthritis or weakness.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Warning signs of overexertion:</strong> Excessive panting, limping during or after walks, reluctance to continue, or extended rest periods needed afterwards.
            </p>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Concerned About Your Senior Dog's Health?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Book a senior dog health check with a trusted veterinarian in your area for peace of mind.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=veterinary">
                Find Vets Specialising in Senior Dogs →
              </Link>
            </Button>
          </div>
        </section>

        {/* Health Monitoring */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Stethoscope className="h-7 w-7 text-cpCoral" />
            Health Monitoring and Veterinary Care
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Senior dogs should have veterinary check-ups every 6 months (instead of annually) to catch age-related issues early:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Common Senior Dog Health Conditions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-cpCoral pl-4">
                <p className="font-semibold text-foreground dark:text-cpCream">Arthritis and Joint Disease</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-1">Affects 80% of dogs over 8 years. Signs: stiffness, difficulty rising, reluctance to jump or climb stairs.</p>
              </div>
              <div className="border-l-4 border-cpAmber pl-4">
                <p className="font-semibold text-foreground dark:text-cpCream">Dental Disease</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-1">Causes pain, infection and affects heart/kidney health. Annual dental cleaning and daily brushing prevent issues.</p>
              </div>
              <div className="border-l-4 border-cpCoral pl-4">
                <p className="font-semibold text-foreground dark:text-cpCream">Kidney Disease</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-1">Common in older dogs. Blood tests detect early changes before symptoms appear.</p>
              </div>
              <div className="border-l-4 border-cpAmber pl-4">
                <p className="font-semibold text-foreground dark:text-cpCream">Heart Disease</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-1">Listen for new heart murmurs, watch for coughing, rapid breathing or reduced exercise tolerance.</p>
              </div>
              <div className="border-l-4 border-cpCoral pl-4">
                <p className="font-semibold text-foreground dark:text-cpCream">Cancer</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-1">Check for lumps monthly. Not all lumps are cancerous, but early detection significantly improves outcomes.</p>
              </div>
              <div className="border-l-4 border-cpAmber pl-4">
                <p className="font-semibold text-foreground dark:text-cpCream">Cognitive Dysfunction (Dementia)</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-1">Disorientation, sleep changes, house soiling, anxiety. See our detailed guide on canine dementia.</p>
              </div>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Senior Dog Blood Tests</h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Annual blood tests check kidney function, liver enzymes, blood sugar and thyroid levels. This "senior profile" detects issues before symptoms develop, when treatment is most effective.
            </p>
            <p className="text-xs text-foreground dark:text-cpCream italic">
              Cost: £60-£120 depending on tests included. Many practices offer senior health check packages.
            </p>
          </div>
        </section>

        {/* Quality of Life */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Brain className="h-7 w-7 text-cpCoral" />
            Maintaining Quality of Life
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            The goal of senior dog care is to maximise comfort, happiness and quality time together. Consider:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Pain Management</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Don't assume pain is "just old age". NSAIDs, joint supplements, physiotherapy and even acupuncture can significantly improve comfort. Discuss options with your vet.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Home Adaptations</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Orthopaedic beds, raised food/water bowls, ramps instead of stairs, night lights for vision loss, and non-slip rugs help senior dogs navigate safely.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Routine and Security</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Senior dogs benefit from consistent routines. They may become more anxious with change, so maintain familiar schedules and environments where possible.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Grooming and Hygiene</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Senior dogs may need more frequent grooming, nail trims and baths as mobility decreases. Regular grooming also lets you check for lumps, sores or skin issues.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Senior Pet Care Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/senior-pets/arthritis-pets" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Arthritis in Pets</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Symptoms, treatment and pain management →</p>
            </Link>
            <Link href="/en/guide/senior-pets/dementia-dogs-cats" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Dementia in Dogs and Cats</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Recognising and managing cognitive decline →</p>
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
                What age should I switch to senior dog food?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Switch to senior food when your dog becomes less active and begins to gain weight, typically around 7 years for medium breeds, 5-6 years for large breeds, and 9-10 years for small breeds. Your vet can advise based on body condition and activity level. Gradual transition over 7-10 days prevents digestive upset.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How much exercise does a senior dog need?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Most senior dogs benefit from 30-60 minutes total exercise daily, split into 2-3 shorter walks. The key is consistency and adapting to your dog's individual abilities. Watch for signs of fatigue: excessive panting, slowing down, or reluctance to continue. Some days they'll manage more, others less - let them set the pace.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Are joint supplements effective for senior dogs?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, for many dogs. Glucosamine and chondroitin help maintain cartilage, whilst omega-3 fatty acids reduce inflammation. Clinical studies show 60-70% of dogs with arthritis improve with supplements. Effects take 4-8 weeks to show, and quality varies between brands - look for veterinary-approved products with guaranteed potency.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How often should senior dogs see the vet?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Every 6 months is recommended for senior dogs, rather than the annual check-up for younger adults. This allows early detection of age-related conditions like kidney disease, diabetes or dental problems. Annual blood tests help monitor organ function. Between check-ups, contact your vet promptly if you notice any concerning changes in behaviour, appetite or mobility.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Looking for more pet care advice and trusted services?
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
            "headline": "Caring for Your Older Dog: Complete Senior Dog Guide",
            "description": "Expert guide to senior dog care covering nutrition, exercise, health checks, mobility support and quality of life for ageing dogs.",
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
              "@id": "https://cutiepawspedia.com/en/guide/senior-pets/caring-older-dog"
            }
          })
        }}
      />
    </div>
  );
}

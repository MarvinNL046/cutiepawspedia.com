/**
 * SEO Landing Page: Arthritis in Pets - Symptoms and Treatment
 * Pillar: Senior Pets (Senior-pets)
 * Target: English-speaking pet owners concerned about pet mobility
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Pill, Home, AlertTriangle, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Arthritis in Pets: Symptoms, Treatment & Pain Management 2025",
  description: "Complete guide to pet arthritis: recognise symptoms in dogs and cats, treatment options, pain relief and home management. Help your arthritic pet live comfortably.",
  keywords: [
    "arthritis in dogs",
    "arthritis in cats",
    "pet arthritis symptoms",
    "osteoarthritis pets",
    "joint pain dogs",
    "joint pain cats",
    "arthritis treatment pets",
    "pet mobility issues",
    "senior pet joint care"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/senior-pets/arthritis-pets',
      'nl': '/nl/gids/senior-pets/artritis-huisdieren',
    },
  },
  openGraph: {
    title: "Arthritis in Pets: Symptoms, Treatment & Pain Management",
    description: "Comprehensive guide to recognising and managing arthritis in dogs and cats. Treatment options and home care strategies.",
    type: "article",
  },
};

export default function ArthritisPets() {
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
            Arthritis in Pets: Symptoms and Treatment
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Arthritis affects millions of pets, causing pain and reduced mobility. Learn to recognise the signs, understand treatment options and help your pet live comfortably despite joint disease.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🏥 Concerned about your pet's mobility?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=veterinary">
                Find a Vet for Arthritis Assessment →
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
            Arthritis (osteoarthritis or degenerative joint disease) is one of the most common conditions affecting senior pets. It's estimated that 80% of dogs over 8 years old and 90% of cats over 12 have arthritic changes, though many cases go undiagnosed because pets are masters at hiding pain.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Whilst arthritis can't be cured, it can be managed effectively with a combination of medication, lifestyle changes and supportive care. Early recognition and treatment significantly improve quality of life and slow disease progression.
          </p>
        </section>

        {/* What is Arthritis */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            What is Arthritis in Pets?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Arthritis is inflammation and deterioration of the joints. In a healthy joint, smooth cartilage cushions the bones where they meet, allowing pain-free movement. With arthritis:
            </p>
            <ol className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral text-white flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Cartilage breaks down and becomes rough</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral text-white flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Bones rub together causing inflammation and pain</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral text-white flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">The joint becomes stiff, swollen and painful to move</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cpCoral text-white flex items-center justify-center text-xs font-bold">4</span>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">New bone forms around the joint (bone spurs), worsening stiffness</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Most commonly affected joints:</strong> Hips, knees (stifles), elbows, shoulders, lower back and wrists (carpus). Large breed dogs often develop hip and elbow arthritis, whilst cats commonly have arthritis in the spine and elbows.
            </p>
          </div>
        </section>

        {/* Recognising Arthritis */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-cpCoral" />
            Recognising Arthritis: Signs and Symptoms
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Pets rarely yelp or limp constantly with arthritis. Instead, look for subtle behaviour changes:
          </p>

          <div className="space-y-6">
            {/* Dogs */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                🐕 Arthritis Signs in Dogs
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-3">
                  <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Stiffness, especially after rest</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Takes a while to "warm up" after lying down, worse in cold weather or mornings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-3">
                  <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Reluctance to exercise or play</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Shorter walks, not wanting to fetch, reluctance to run</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-3">
                  <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Difficulty with stairs, jumping or getting in car</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Hesitating before stairs, needing help into car, refusing to jump onto furniture</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-3">
                  <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Limping or favouring a leg</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">May be subtle or intermittent, often worse after exercise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-3">
                  <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Personality changes</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Irritability, withdrawal, less tolerant of handling or other pets</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-3">
                  <span className="text-cpCoral mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Licking, chewing or biting joints</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Often focused on hips, elbows or paws</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cats */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                🐈 Arthritis Signs in Cats
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-cpAmber/5 dark:bg-cpAmber/10 rounded-lg p-3">
                  <span className="text-cpAmber mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Reduced jumping or climbing</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Not jumping onto favourite perches, avoiding stairs, sleeping in lower places</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpAmber/5 dark:bg-cpAmber/10 rounded-lg p-3">
                  <span className="text-cpAmber mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Difficulty using litter tray</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Toileting outside the box (can't climb in), perching on edge to avoid stepping in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpAmber/5 dark:bg-cpAmber/10 rounded-lg p-3">
                  <span className="text-cpAmber mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Poor grooming, matted coat</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Especially rear end and tail - can't reach to groom due to stiffness</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpAmber/5 dark:bg-cpAmber/10 rounded-lg p-3">
                  <span className="text-cpAmber mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Overgrown claws</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Not scratching/climbing enough to naturally wear claws down</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpAmber/5 dark:bg-cpAmber/10 rounded-lg p-3">
                  <span className="text-cpAmber mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Reduced activity</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Sleeping more, less playful, reduced hunting/patrolling behaviour</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpAmber/5 dark:bg-cpAmber/10 rounded-lg p-3">
                  <span className="text-cpAmber mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream text-sm">Behaviour changes</p>
                    <p className="text-xs text-muted-foreground dark:text-cpCream/70">Hiding more, aggression when touched, reluctance to be picked up</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-2xl p-6 mt-6">
            <p className="text-sm text-foreground dark:text-cpCream font-semibold mb-2">⚠️ Important:</p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Many owners attribute these changes to "just getting old" and don't seek treatment. But pain is NOT a normal part of ageing. If you've noticed any of these signs, your pet likely has arthritis and could benefit from treatment.
            </p>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Think Your Pet Has Arthritis?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Book an assessment with a vet. Early diagnosis means earlier pain relief and better quality of life.
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

        {/* Treatment Options */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Pill className="h-7 w-7 text-cpCoral" />
            Treatment Options for Pet Arthritis
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Effective arthritis management uses a multimodal approach - combining several strategies for best results:
          </p>

          <div className="space-y-6">
            {/* Pain Medication */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">1. Pain Medication (NSAIDs)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Non-steroidal anti-inflammatory drugs (NSAIDs) are the cornerstone of arthritis treatment. They reduce inflammation and pain.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4 space-y-2">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Dogs:</strong> Metacam, Rimadyl, Previcox, Onsior - usually given daily</p>
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Cats:</strong> Metacam (licensed for long-term use in Europe), Onsior - given 2-3 times weekly or daily</p>
                <p className="text-xs text-muted-foreground dark:text-cpCream/70 italic mt-2">Requires initial blood tests and regular monitoring (every 6-12 months) to check kidney and liver function.</p>
              </div>
            </div>

            {/* Joint Supplements */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">2. Joint Supplements</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Support cartilage health and reduce inflammation. Work best when started early and given long-term.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Glucosamine & Chondroitin:</strong> Building blocks for cartilage repair</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Omega-3 Fatty Acids (Fish Oil):</strong> Reduce inflammation naturally</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Green-Lipped Mussel:</strong> Natural anti-inflammatory with omega-3s and glucosamine</span>
                </li>
              </ul>
            </div>

            {/* Weight Management */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">3. Weight Management</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Every extra kilogram adds 4kg of pressure on joints. Weight loss is one of the most effective arthritis treatments.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Studies show:</strong> Dogs losing just 6-8% of body weight show measurable improvement in mobility and pain within 2 months. For a 30kg dog, that's only 2kg weight loss!</p>
              </div>
            </div>

            {/* Exercise Modification */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">4. Exercise Modification</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Regular gentle exercise maintains muscle mass and joint flexibility. Avoid high-impact activities.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Short, frequent walks (3x 15-20 min better than 1x 60 min)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Swimming or hydrotherapy (excellent low-impact exercise)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-red-600 mt-0.5">✗</span>
                  <span>Ball chasing, jumping, rough play with other dogs</span>
                </li>
              </ul>
            </div>

            {/* Additional Therapies */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">5. Additional Therapies</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Physiotherapy:</strong> Exercises to strengthen muscles supporting joints</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Acupuncture:</strong> Can provide pain relief for some pets</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Laser Therapy:</strong> Reduces inflammation and promotes healing</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Stem Cell Therapy:</strong> Emerging treatment showing promise</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Home Management */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Home className="h-7 w-7 text-cpCoral" />
            Home Management for Arthritic Pets
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Simple home modifications make a huge difference to comfort and independence:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">🛏️ Orthopaedic Bedding</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Memory foam beds support joints and relieve pressure points. Place in warm, draft-free areas. Heated beds soothe stiff joints in winter.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">🚗 Ramps and Steps</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Use ramps for cars, sofas or beds. Pet steps help cats reach high places. Prevents painful jumping and reduces injury risk.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">🏠 Non-Slip Flooring</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Rugs or yoga mats on slippery floors prevent falls and give confidence. Nail trims help grip (overgrown nails worsen slipping).
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">🍽️ Raised Food Bowls</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Elevate bowls to chest height (dogs) or shoulder height (cats). Reduces neck and back strain during eating.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">📦 Low-Entry Litter Trays (Cats)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Cut down one side or use trays with low entry. Prevents litter box avoidance due to pain climbing in.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">🎽 Support Harnesses</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Help lift and support hind end during walks or stairs. Reduces strain on painful joints.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Senior Pet Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/senior-pets/caring-older-dog" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Caring for Your Older Dog</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete senior dog care guide →</p>
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
                Can arthritis be cured in pets?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                No, arthritis is a progressive, degenerative condition that can't be cured. However, it can be managed very effectively with medication, supplements, weight management and lifestyle modifications. Many arthritic pets live comfortably for years with proper treatment. The key is early diagnosis and consistent management to slow progression and maintain quality of life.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Are NSAIDs safe for long-term use in pets?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, when used appropriately under veterinary supervision. Modern veterinary NSAIDs are designed for long-term use. Your vet will perform blood tests before starting treatment and monitor kidney/liver function every 6-12 months. Most pets tolerate NSAIDs well for years. Never give human pain medication (paracetamol, ibuprofen) to pets - these are toxic. Always use vet-prescribed medication.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Do joint supplements really work?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Clinical studies show 60-70% of pets with arthritis improve with glucosamine, chondroitin and omega-3 supplements. They work best when started early (at first signs of arthritis) and given long-term. Effects take 4-8 weeks to show. Quality matters - choose veterinary-approved brands with guaranteed potency. Supplements work alongside (not instead of) pain medication for moderate to severe arthritis.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I stop exercising my arthritic pet?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                No! Regular gentle exercise is crucial for maintaining muscle mass, joint flexibility and preventing weight gain. The key is modifying exercise: shorter, more frequent sessions rather than long intense ones. Swimming and hydrotherapy are excellent low-impact options. Avoid high-impact activities like ball chasing or jumping. Let your pet set the pace and watch for signs of fatigue or pain increase.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need more pet health advice and veterinary services?
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
            "headline": "Arthritis in Pets: Symptoms, Treatment & Pain Management",
            "description": "Complete guide to recognising and managing arthritis in dogs and cats. Treatment options, pain relief and home care strategies.",
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
              "@id": "https://cutiepawspedia.com/en/guide/senior-pets/arthritis-pets"
            }
          })
        }}
      />
    </div>
  );
}

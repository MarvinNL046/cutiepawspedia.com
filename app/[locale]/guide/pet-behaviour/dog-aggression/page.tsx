import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Understanding and Managing Dog Aggression | Expert Guide",
  description: "Comprehensive guide to dog aggression: types, causes, warning signs, and proven management strategies. Learn when to seek professional help and how to keep everyone safe.",
  keywords: "dog aggression, aggressive dog, dog behaviour, dog biting, reactive dog, fear aggression, resource guarding, dog training, dog behaviourist",
  alternates: {
    languages: {
      'en': '/en/guide/pet-behaviour/dog-aggression',
      'nl': '/nl/gids/huisdiergedrag/agressie-honden',
    },
  },
  openGraph: {
    title: "Understanding and Managing Dog Aggression",
    description: "Expert guidance on identifying dog aggression types, understanding causes, and implementing safe management strategies. Find certified behaviourists near you.",
    type: "article",
  },
};

export default function DogAggressionPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpCoral/10 via-cpAmber/10 to-cpAqua/10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-8 md:p-12 border border-border dark:border-cpAmber/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 border border-cpCoral/30 mb-6">
              <span className="text-2xl">⚠️</span>
              <span className="text-sm font-medium text-foreground">Aggression Specialist</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Understanding and Managing Dog Aggression
            </h1>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
              Dog aggression is serious but treatable. Understand the different types, identify warning signs, and learn evidence-based management strategies to keep everyone safe whilst addressing the underlying causes.
            </p>
            <Button
              size="lg"
              className="bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform shadow-lg"
              asChild
            >
              <Link href="/en/united-kingdom">
                Find certified behaviourists →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3">⚠️ Critical Safety Notice</h3>
            <p className="text-red-800 dark:text-red-300 mb-3">
              Aggression is a complex behaviour problem that can result in serious injury. This guide provides educational information only. If your dog has bitten, lunged at, or shown aggression towards people or other animals:
            </p>
            <ul className="space-y-2 text-red-800 dark:text-red-300">
              <li>• Seek immediate professional help from a certified dog behaviourist or veterinary behaviourist</li>
              <li>• Do NOT attempt behaviour modification without professional guidance</li>
              <li>• Implement safety management protocols immediately (muzzle training, physical barriers, avoiding triggers)</li>
              <li>• Never punish aggressive behaviour - this typically makes aggression worse</li>
            </ul>
          </div>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
            Aggression is one of the most common reasons dogs are surrendered to shelters or euthanised - yet it's often preventable and treatable. Most aggressive behaviour stems from fear, anxiety, or inadequate socialisation rather than "dominance" or "bad" dogs. Understanding the root cause is the first step to effective management. This guide will help you recognise aggression types, interpret warning signs, and implement safe protocols whilst working with professionals to address the underlying issues.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Types of Dog Aggression
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Fear-Based Aggression
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            The most common type - dogs aggress when frightened with no escape route available.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Triggers:</strong> Unfamiliar people, loud noises, veterinary visits, grooming, being cornered</li>
            <li><strong>Body language:</strong> Ears back, tail tucked, cowering, whale eye (showing whites), trembling</li>
            <li><strong>Progression:</strong> Freeze → growl → snap → bite (if earlier warnings ignored)</li>
            <li><strong>Why it happens:</strong> Poor socialisation, traumatic experience, genetic predisposition</li>
            <li><strong>Prognosis:</strong> Highly treatable with systematic desensitisation and counter-conditioning</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Resource Guarding
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Protecting valued resources from perceived threats - natural behaviour that becomes problematic.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Common resources:</strong> Food bowls, high-value treats, toys, sleeping spots, people, locations</li>
            <li><strong>Warning signs:</strong> Stiffening over object, eating faster, growling, snapping when approached</li>
            <li><strong>Severity spectrum:</strong> Mild (growling) to severe (bite and hold)</li>
            <li><strong>Prevention:</strong> Trade-up games, hand-feeding, positive associations with approach</li>
            <li><strong>Treatment:</strong> Gradual desensitisation - never force or punish</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Territorial Aggression
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Defending home, garden, car, or owner's space from perceived intruders.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Typical scenarios:</strong> Postman, delivery drivers, visitors to home, other dogs passing garden</li>
            <li><strong>Characteristics:</strong> Intense barking, lunging at windows/fences, hackles raised</li>
            <li><strong>Reinforcement cycle:</strong> Person approaches → dog barks → person leaves → dog thinks it worked!</li>
            <li><strong>Management:</strong> Block visual access, positive associations with visitors, systematic desensitisation</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Dog-to-Dog Aggression
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Reactivity or aggression specifically towards other dogs - often fear or frustration-based.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Causes:</strong> Poor socialisation, traumatic experience with dogs, barrier frustration, fear</li>
            <li><strong>On-lead reactivity:</strong> Frustrated greeting (wants to play but can't reach) looks like aggression</li>
            <li><strong>Off-lead behaviour:</strong> May be completely friendly off-lead but reactive on-lead</li>
            <li><strong>Same-sex aggression:</strong> More common between same-sex dogs, especially intact males</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            5. Predatory Aggression
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Hunting behaviour directed at small animals, sometimes children - doesn't look like typical aggression.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Characteristics:</strong> Silent stalking, intense focus, chase without warning growls</li>
            <li><strong>Triggers:</strong> Running children, cyclists, small animals, quick movements</li>
            <li><strong>High-risk breeds:</strong> Terriers, sighthounds, herding breeds with high prey drive</li>
            <li><strong>Management:</strong> Extremely difficult to modify - prevention and management critical</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            6. Pain-Induced Aggression
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-3">Always Rule Out Medical Causes:</h4>
            <p className="text-blue-800 dark:text-blue-300 mb-3">
              Sudden onset aggression, especially in previously friendly dogs, often indicates pain or illness:
            </p>
            <ul className="space-y-2 text-blue-800 dark:text-blue-300">
              <li>• Arthritis, hip dysplasia, dental disease (painful when touched)</li>
              <li>• Ear infections (aggression when head touched)</li>
              <li>• Neurological issues, brain tumours (personality changes)</li>
              <li>• Hypothyroidism (linked to increased aggression)</li>
            </ul>
            <p className="text-blue-800 dark:text-blue-300 mt-4 font-medium">
              Veterinary examination is MANDATORY before behaviour modification for any aggression case.
            </p>
          </div>

          {/* CTA Middle */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpAmber/10 rounded-2xl p-8 my-12 border border-cpAqua/30">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🎓</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  Professional Behaviour Assessment Essential
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Certified dog behaviourists can accurately diagnose aggression type, identify triggers, assess bite risk, and create safe, effective behaviour modification plans.
                </p>
                <Button
                  className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
                  asChild
                >
                  <Link href="/en/united-kingdom">
                    Find aggression specialists in your area →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Warning Signs and Body Language
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Early Warning Signs (Intervene Here!)
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Freeze/stillness:</strong> Dog suddenly goes completely still - about to escalate</li>
            <li><strong>Hard stare:</strong> Intense, unblinking eye contact - assessing threat</li>
            <li><strong>Whale eye:</strong> Showing whites of eyes whilst looking away - stressed and conflicted</li>
            <li><strong>Lip licking, yawning:</strong> Stress signals (not tiredness) - escalating anxiety</li>
            <li><strong>Turning away, avoiding:</strong> Dog trying to remove themselves - give them space!</li>
            <li><strong>Low growl:</strong> Clear warning - "back off, I'm uncomfortable"</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Immediate Threat Signals
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Raised hackles:</strong> Hair standing up along back/neck - high arousal</li>
            <li><strong>Ears pinned back:</strong> Fear aggression vs ears forward (offensive aggression)</li>
            <li><strong>Snarling/showing teeth:</strong> Final warning before bite</li>
            <li><strong>Stiff body, weight forward:</strong> Ready to lunge or attack</li>
            <li><strong>Tail high and stiff:</strong> (Not wagging - stiff helicopter = highly aroused aggression)</li>
          </ul>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 rounded-2xl p-6 mb-8 border border-cpCoral/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Never Punish Warning Signs!</h4>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Growling, snarling, and showing teeth are COMMUNICATION - your dog is saying "I'm uncomfortable, please back off." Punishing these warnings teaches dogs to skip warnings and go straight to biting. A dog who bites "without warning" usually had their warnings punished away.
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80">
              <strong>Correct response:</strong> Remove dog from situation, identify trigger, work on desensitisation with professional.
            </p>
          </div>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Immediate Safety Management
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Safety Protocols While Getting Professional Help
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Avoid triggers completely:</strong> No exposure to situations causing aggression whilst waiting for behaviourist</li>
            <li><strong>Muzzle training:</strong> Basket muzzle allows panting/drinking whilst preventing bites - make it positive!</li>
            <li><strong>Management tools:</strong> Baby gates, crates, separate rooms to prevent access to triggers</li>
            <li><strong>Lead and harness:</strong> Secure control in public - never off-lead if dog-aggressive</li>
            <li><strong>Yellow ribbon/vest:</strong> "Needs space" signals to alert others</li>
            <li><strong>Inform visitors:</strong> Clear communication - "please don't approach/pet my dog"</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            What NOT to Do
          </h3>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3">These Methods Make Aggression WORSE:</h4>
            <ul className="space-y-2 text-red-800 dark:text-red-300">
              <li>• <strong>Alpha rolls, dominance training:</strong> Outdated, dangerous, increases fear and aggression</li>
              <li>• <strong>Shock collars:</strong> Cause fear, anxiety, and unpredictable aggression - banned in many countries</li>
              <li>• <strong>Flooding:</strong> Forcing dog into feared situation - traumatic and ineffective</li>
              <li>• <strong>Physical punishment:</strong> Hitting, kicking, scruff shaking - teaches dog humans are dangerous</li>
              <li>• <strong>Yelling/confrontation:</strong> Escalates arousal, makes situation more volatile</li>
            </ul>
          </div>

          {/* Section 4 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Treatment Approaches (Always with Professional Guidance)
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Systematic Desensitisation and Counter-Conditioning
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            The gold standard for aggression treatment:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Step 1:</strong> Identify exact triggers and threshold (distance/intensity where dog starts reacting)</li>
            <li><strong>Step 2:</strong> Expose dog to trigger BELOW threshold (far enough away they stay calm)</li>
            <li><strong>Step 3:</strong> Pair trigger with amazing rewards (trigger appears = incredible treats)</li>
            <li><strong>Step 4:</strong> Very gradually decrease distance/increase intensity over weeks/months</li>
            <li><strong>Step 5:</strong> Dog forms new association: trigger predicts good things, not threats</li>
            <li><strong>Critical:</strong> Must stay below threshold - one over-threshold exposure can undo weeks of work</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Medication-Assisted Behaviour Modification
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            For severe cases, medication can support behaviour modification:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>SSRIs (Prozac/Fluoxetine):</strong> Reduce baseline anxiety, make training more effective</li>
            <li><strong>Fast-acting meds (Trazodone):</strong> Situational anxiety for vet visits, grooming</li>
            <li><strong>Important:</strong> Medication alone doesn't fix aggression - must combine with behaviour modification</li>
            <li><strong>Prescription required:</strong> Veterinary behaviourist or vet experienced with behaviour cases</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            When to Consider Rehoming or Euthanasia
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Incredibly difficult decision, but sometimes necessary for safety. Honest discussion with veterinary behaviourist needed when: (1) Severe aggression with history of bites causing significant injury, (2) Unpredictable aggression with no identifiable triggers, (3) Aggression towards children in household where management impossible, (4) Owner unable to implement safety protocols or afford treatment, (5) Quality of life severely compromised for dog (constant stress/anxiety). This is a last resort after exhausting professional treatment options.
          </p>

          {/* Internal Links */}
          <div className="bg-cpCoral/10 border border-cpCoral/30 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Related behaviour and training topics:
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/en/guide/pet-behaviour/anxiety-pets" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Anxiety in Pets: Signs and Solutions
                </Link>
              </li>
              <li>
                <Link href="/en/guide/pet-behaviour/dog-barking-too-much" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Why Your Dog Barks Too Much and How to Stop It
                </Link>
              </li>
              <li>
                <Link href="/en/guide/pet-training/socialisation-puppies" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Puppy Socialisation: Critical Period and Best Practices
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Frequently Asked Questions About Dog Aggression
          </h2>

          <div className="space-y-4 mb-12">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can aggressive dogs be rehabilitated?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Yes, many aggressive dogs can be successfully rehabilitated with professional help, but success depends on several factors: type of aggression (fear-based has better prognosis than predatory), severity and bite history, underlying causes, owner commitment to management and training, and professional guidance quality. Realistic expectations are important - "rehabilitation" often means managing triggers and reducing reactivity rather than "curing" aggression completely. With consistent work, most dogs show significant improvement within 3-6 months, though some require lifelong management.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is aggression always dominance-related?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                No! The "dominance theory" has been thoroughly debunked by modern animal behaviour science. Studies show most aggression stems from fear, anxiety, frustration, or inadequate socialisation - NOT a desire to dominate humans. Dogs don't try to become "pack leader" - this outdated concept causes harmful training methods. What looks like "dominance" (resource guarding, territorial behaviour) is actually defensive behaviour protecting valued resources. Understanding true causes (fear, anxiety, pain) leads to effective, humane treatment. Dominance-based punishment makes aggression worse by increasing fear and anxiety.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I get a second dog to help with my aggressive dog's behaviour?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Absolutely NOT - this is a common mistake that usually makes things worse. Adding a second dog to a household with an aggressive dog creates multiple problems: (1) Existing dog's stress increases (new competition for resources), (2) Aggressive behaviour may escalate or transfer to new dog, (3) New dog may learn aggressive behaviour from existing dog (social learning), (4) Owner now has two dogs to manage instead of focusing on one's rehabilitation. Always resolve aggression issues before considering adding another pet. A stable, well-adjusted dog is a prerequisite for multi-dog households, not a treatment for an aggressive one.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What's the difference between a dog trainer and a behaviourist?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Critical distinction for aggression cases! Dog trainers teach obedience and skills (sit, stay, recall). Behaviourists specialise in problem behaviours like aggression, anxiety, and fears. For aggression, seek: (1) Veterinary Behaviourist (vet with behaviour specialisation - can prescribe medication), (2) Certified Applied Animal Behaviourist (CAAB/ACAAB - advanced degree in behaviour), or (3) Certified Professional Dog Trainer - Knowledge Assessed (CPDT-KA) with aggression experience. Avoid trainers using dominance theory, punishment, or aversive tools. Ask about qualifications, methods (should be force-free), and aggression case experience before hiring.
              </div>
            </details>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              ⚠️ Safety First, Always
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional Help for Dog Aggression
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Certified behaviourists can safely assess your dog, identify triggers, and create evidence-based behaviour modification plans for lasting improvement.
            </p>
            <Button
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl"
              asChild
            >
              <Link href="/en/united-kingdom">
                Discover all pet services →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Understanding and Managing Dog Aggression",
            "description": "Comprehensive guide to dog aggression types, causes, warning signs, and evidence-based management strategies. Learn when to seek professional help.",
            "image": "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=1200",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-behaviour/dog-aggression"
            }
          })
        }}
      />
    </div>
  );
}

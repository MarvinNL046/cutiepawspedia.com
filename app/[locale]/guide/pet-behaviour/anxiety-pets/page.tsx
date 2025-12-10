import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Anxiety in Pets: Signs and Solutions | Expert Guide",
  description: "Recognise anxiety in dogs and cats with expert guidance on symptoms, causes, and evidence-based treatment options. Learn how to help your anxious pet feel safe and secure.",
  keywords: "pet anxiety, dog anxiety, cat anxiety, separation anxiety, noise phobia, anxious pet, pet stress, calming techniques, anxiety medication",
  alternates: {
    languages: {
      'en': '/en/guide/pet-behaviour/anxiety-pets',
      'nl': '/nl/gids/huisdiergedrag/angst-huisdieren',
    },
  },
  openGraph: {
    title: "Anxiety in Pets: Signs and Solutions",
    description: "Help your anxious pet with expert advice on recognising symptoms, understanding causes, and implementing effective treatment strategies. Find behaviourists near you.",
    type: "article",
  },
};

export default function AnxietyPetsPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpAqua/10 via-cpAmber/10 to-cpCoral/10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-8 md:p-12 border border-border dark:border-cpAmber/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAqua/10 border border-cpAqua/30 mb-6">
              <span className="text-2xl">💙</span>
              <span className="text-sm font-medium text-foreground">Anxiety Specialist</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Anxiety in Pets: Signs and Solutions
            </h1>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
              Your pet doesn't have to live in fear. Learn to recognise anxiety symptoms in dogs and cats, understand what causes it, and discover proven treatment approaches to help your pet feel safe and confident.
            </p>
            <Button
              size="lg"
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform shadow-lg"
              asChild
            >
              <Link href="/en/united-kingdom">
                Find behaviourists near you →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
            Anxiety disorders affect an estimated 30-40% of dogs and 20-25% of cats - yet many cases go unrecognised because pets can't tell us they're struggling. Chronic anxiety significantly impacts quality of life, causing physical health problems and behavioural issues. The good news? Anxiety is highly treatable with proper identification and intervention. This guide will help you recognise anxiety symptoms, understand causes, and implement evidence-based solutions to help your pet feel secure and calm.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Recognising Anxiety in Dogs
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Behavioural Signs of Canine Anxiety
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Excessive barking or whining:</strong> Especially when alone or in stressful situations</li>
            <li><strong>Destructive behaviour:</strong> Chewing furniture, scratching doors/windows (particularly near exits)</li>
            <li><strong>House soiling:</strong> Despite being house-trained, accidents occur when anxious</li>
            <li><strong>Compulsive behaviours:</strong> Tail chasing, excessive licking (causing hot spots), pacing</li>
            <li><strong>Panting/drooling:</strong> When not hot or exercised - sign of stress</li>
            <li><strong>Trembling/shaking:</strong> Fear response to triggers like thunderstorms, fireworks</li>
            <li><strong>Hiding/escape attempts:</strong> Seeking confined spaces, trying to flee situations</li>
            <li><strong>Aggression:</strong> Fear-based snapping, growling when cornered or overwhelmed</li>
            <li><strong>Loss of appetite:</strong> Too stressed to eat in anxiety-provoking situations</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Physical Signs (Subtle but Important)
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Whale eye:</strong> Showing whites of eyes whilst looking away</li>
            <li><strong>Ears pinned back:</strong> Flattened against head</li>
            <li><strong>Tail tucked:</strong> Between legs, rigid posture</li>
            <li><strong>Lip licking, yawning:</strong> Stress signals (not hunger or tiredness)</li>
            <li><strong>Dilated pupils:</strong> Increased arousal and stress response</li>
            <li><strong>Sweaty paws:</strong> Dogs sweat through paw pads when anxious</li>
            <li><strong>Raised hackles:</strong> Hair standing up along back - high arousal</li>
          </ul>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Recognising Anxiety in Cats
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Feline Anxiety Symptoms (Often Missed!)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Cats hide anxiety better than dogs, making it harder to recognise:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Inappropriate urination/defecation:</strong> Most common sign - avoiding litter box</li>
            <li><strong>Over-grooming:</strong> Bald patches, skin lesions from excessive licking</li>
            <li><strong>Hiding excessively:</strong> Under beds, in cupboards for prolonged periods</li>
            <li><strong>Aggression:</strong> Hissing, swatting, biting - especially when handled</li>
            <li><strong>Decreased appetite:</strong> Stress suppresses eating - can lead to fatty liver disease</li>
            <li><strong>Increased vocalisation:</strong> Excessive meowing, yowling (especially at night)</li>
            <li><strong>Scratching furniture:</strong> Increased territorial marking when stressed</li>
            <li><strong>Freezing/immobility:</strong> Complete stillness when anxious (not relaxation!)</li>
            <li><strong>Dilated pupils, flattened ears:</strong> Physical stress indicators</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-3">Medical Rule-Out Essential</h4>
            <p className="text-blue-800 dark:text-blue-300 mb-3">
              Many anxiety symptoms overlap with medical conditions. Always see a vet first to rule out:
            </p>
            <ul className="space-y-2 text-blue-800 dark:text-blue-300">
              <li>• Hyperthyroidism (cats - causes increased vocalisation, anxiety-like behaviour)</li>
              <li>• Pain/arthritis (causes avoidance behaviours that mimic anxiety)</li>
              <li>• Cognitive dysfunction (senior pets - confusion appears similar to anxiety)</li>
              <li>• Neurological conditions (can cause behaviour changes)</li>
            </ul>
            <p className="text-blue-800 dark:text-blue-300 mt-4 font-medium">
              Veterinary examination is mandatory before treating as purely behavioural anxiety.
            </p>
          </div>

          {/* CTA Middle */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 rounded-2xl p-8 my-12 border border-cpCoral/30">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🎓</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  Professional Anxiety Assessment
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Certified behaviourists can accurately diagnose anxiety type, identify triggers, and create comprehensive treatment plans combining behaviour modification with appropriate management strategies.
                </p>
                <Button
                  className="bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
                  asChild
                >
                  <Link href="/en/united-kingdom">
                    Find anxiety specialists →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Common Types of Pet Anxiety
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Separation Anxiety
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Extreme distress when separated from owner - true panic disorder, not naughtiness.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Symptoms:</strong> Destruction near exits, continuous barking/howling, toileting indoors, excessive drooling</li>
            <li><strong>Begins:</strong> Immediately or within 30 minutes of departure</li>
            <li><strong>Risk factors:</strong> Rescue dogs, over-attachment, traumatic separation, pandemic puppies</li>
            <li><strong>Not just boredom:</strong> True separation anxiety is distress-based, not attention-seeking</li>
            <li><strong>Treatment:</strong> Systematic desensitisation to alone time + possible medication</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Noise Phobias
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Extreme fear of loud sounds - can escalate over time if untreated.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Common triggers:</strong> Thunderstorms, fireworks, construction noise, gunshots</li>
            <li><strong>Symptoms:</strong> Trembling, panting, hiding, escape attempts, destructive behaviour</li>
            <li><strong>Progression:</strong> Often worsens each exposure - early intervention critical</li>
            <li><strong>Management:</strong> Safe space, white noise, calming supplements, systematic desensitisation</li>
            <li><strong>Medication:</strong> Fast-acting anti-anxiety meds for severe cases (prescribed before event)</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Social Anxiety
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Fear of people, other animals, or unfamiliar environments.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Causes:</strong> Poor socialisation (critical period: 3-14 weeks puppies, 2-7 weeks kittens)</li>
            <li><strong>Symptoms:</strong> Hiding from visitors, fear aggression, trembling around strangers</li>
            <li><strong>Prevention:</strong> Extensive, positive socialisation during critical period</li>
            <li><strong>Treatment:</strong> Gradual exposure therapy, building confidence through training</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Environmental Anxiety (Cats Especially)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Stress from changes in environment or routine - cats are particularly sensitive.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Triggers:</strong> House moves, renovations, new furniture, new pets, new baby</li>
            <li><strong>Symptoms:</strong> House soiling, over-grooming, hiding, decreased appetite</li>
            <li><strong>Cat-specific:</strong> Territory-based anxiety in multi-cat households (not enough resources)</li>
            <li><strong>Management:</strong> Gradual changes, pheromone diffusers, maintaining routine, environmental enrichment</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            5. Generalised Anxiety Disorder
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Chronic anxiety without specific triggers - baseline nervous/fearful temperament. Often genetic component. Requires long-term management with behaviour modification, environmental management, and frequently medication. These pets benefit greatly from predictable routines and confidence-building training.
          </p>

          {/* Section 4 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Treatment Approaches for Pet Anxiety
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Behaviour Modification (Foundation of Treatment)
          </h3>

          <div className="bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 rounded-2xl p-6 mb-8 border border-cpAqua/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Systematic Desensitisation Protocol:</h4>
            <ol className="space-y-3 text-muted-foreground dark:text-cpCream/80">
              <li><strong>1. Identify triggers:</strong> What specifically causes anxiety? List everything</li>
              <li><strong>2. Establish threshold:</strong> Distance/intensity where pet stays calm (sub-threshold)</li>
              <li><strong>3. Controlled exposure:</strong> Expose to trigger BELOW threshold with amazing rewards</li>
              <li><strong>4. Counter-conditioning:</strong> Trigger predicts good things (treats, play, calm praise)</li>
              <li><strong>5. Gradual progression:</strong> Very slowly increase intensity over weeks/months</li>
              <li><strong>6. Never flood:</strong> Forcing into feared situation is traumatic and counterproductive</li>
            </ol>
            <p className="text-muted-foreground dark:text-cpCream/80 mt-4">
              <strong>Timeline:</strong> Significant improvement typically 6-12 weeks, but varies by severity and consistency.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Environmental Management
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Safe spaces:</strong> Crate training (dogs), hiding boxes/high perches (cats)</li>
            <li><strong>Routine consistency:</strong> Same feeding times, walks, play sessions daily</li>
            <li><strong>Enrichment:</strong> Puzzle feeders, interactive toys, appropriate exercise</li>
            <li><strong>Pheromone therapy:</strong> Adaptil (dogs), Feliway (cats) - calming pheromones</li>
            <li><strong>White noise:</strong> Masks triggering sounds, creates calming environment</li>
            <li><strong>Anxiety wraps:</strong> Thundershirt, TTouch wraps - gentle pressure calms some pets</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Supplements and Natural Products
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Evidence-based supplements for mild-moderate anxiety (discuss with vet first):
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>L-theanine:</strong> Amino acid promoting calm, found in green tea (Anxitane, Solliquin)</li>
            <li><strong>Alpha-casozepine:</strong> Milk protein with calming properties (Zylkene)</li>
            <li><strong>CBD oil:</strong> Some evidence for anxiety reduction - quality and dosing critical</li>
            <li><strong>Melatonin:</strong> Helpful for noise phobias and sleep-related anxiety</li>
            <li><strong>Omega-3 fatty acids:</strong> Support brain health, may reduce anxiety</li>
            <li><strong>Caution:</strong> Not regulated like medication - quality varies, interactions possible</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Prescription Medication
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            For moderate to severe anxiety - prescribed by vet or veterinary behaviourist:
          </p>

          <div className="bg-gradient-to-br from-cpAmber/10 to-cpCoral/10 rounded-2xl p-6 mb-8 border border-cpAmber/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Common Anxiety Medications:</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground dark:text-cpCream mb-2">Long-term (Daily Maintenance):</p>
                <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80 ml-4">
                  <li>• <strong>Fluoxetine (Prozac):</strong> SSRI for generalised anxiety, separation anxiety</li>
                  <li>• <strong>Clomipramine (Clomicalm):</strong> Tricyclic for separation anxiety, compulsive behaviours</li>
                  <li>• <strong>Sertraline (Zoloft):</strong> SSRI alternative to fluoxetine</li>
                  <li>• <strong>Timeline:</strong> 4-6 weeks to full effect, lifelong for some pets</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground dark:text-cpCream mb-2">Situational (Event-Based):</p>
                <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80 ml-4">
                  <li>• <strong>Trazodone:</strong> Fast-acting for vet visits, grooming, travel, thunderstorms</li>
                  <li>• <strong>Gabapentin:</strong> Anxiety + pain relief, useful for stressful vet procedures</li>
                  <li>• <strong>Alprazolam (Xanax):</strong> Severe panic episodes (used cautiously)</li>
                  <li>• <strong>Timing:</strong> Give 1-2 hours before anticipated stressor</li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground dark:text-cpCream/80 mt-4 font-medium">
              Important: Medication most effective when combined with behaviour modification, not alone.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            5. Training for Confidence Building
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Positive reinforcement training:</strong> Successful learning builds confidence</li>
            <li><strong>Trick training:</strong> Fun, low-pressure learning boosts self-assurance</li>
            <li><strong>Nosework/scent games:</strong> Natural behaviour, confidence-building, mentally tiring</li>
            <li><strong>Relaxation protocols:</strong> Teach calm settling in various environments</li>
            <li><strong>Choice and control:</strong> Allow pet to choose approach/retreat - empowering</li>
          </ul>

          {/* Section 5 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Special Considerations for Different Anxiety Types
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Separation Anxiety Protocol
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Step 1:</strong> Downplay departures/arrivals - no emotional goodbyes</li>
            <li><strong>Step 2:</strong> Practice mini-departures (30 seconds) with high-value treat puzzle</li>
            <li><strong>Step 3:</strong> Gradually increase duration ONLY when pet remains calm</li>
            <li><strong>Step 4:</strong> Vary departure cues (sometimes put shoes on but don't leave)</li>
            <li><strong>Step 5:</strong> Consider doggy daycare/pet sitter during desensitisation process</li>
            <li><strong>Timeline:</strong> 8-16 weeks for significant progress in moderate cases</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Noise Phobia Management
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Preparation:</strong> Create safe den (interior room, no windows, white noise)</li>
            <li><strong>Pre-event medication:</strong> Give trazodone/gabapentin 2 hours before expected noise</li>
            <li><strong>During event:</strong> Stay calm yourself, allow pet to hide, don't force interaction</li>
            <li><strong>Desensitisation:</strong> Use recorded sounds at very low volume + treats daily</li>
            <li><strong>Never comfort fearful behaviour:</strong> Act normally - comfort can reinforce fear</li>
          </ul>

          {/* Internal Links */}
          <div className="bg-cpAqua/10 border border-cpAqua/30 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Related behaviour topics:
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/en/guide/pet-behaviour/dog-aggression" className="text-cpCoral hover:text-cpAmber transition-colors font-medium">
                  → Understanding and Managing Dog Aggression
                </Link>
              </li>
              <li>
                <Link href="/en/guide/pet-behaviour/multiple-pets" className="text-cpCoral hover:text-cpAmber transition-colors font-medium">
                  → Living with Multiple Pets Successfully
                </Link>
              </li>
              <li>
                <Link href="/en/guide/pet-behaviour/dog-barking-too-much" className="text-cpCoral hover:text-cpAmber transition-colors font-medium">
                  → Why Your Dog Barks Too Much and How to Stop It
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Frequently Asked Questions About Pet Anxiety
          </h2>

          <div className="space-y-4 mb-12">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How long does anxiety treatment take to work?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Timeline varies by anxiety type and treatment approach. Medication: SSRIs take 4-6 weeks for full effect, fast-acting meds work within 1-2 hours. Behaviour modification: Noticeable improvement typically 6-8 weeks with consistent work, significant progress 3-6 months. Severe cases may require 6-12 months or ongoing management. Key factors affecting timeline: severity of anxiety, consistency of treatment, underlying causes, owner compliance. Quick fixes don't exist - anxiety treatment requires patience, consistency, and often a multi-modal approach combining medication, behaviour modification, and environmental management.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Will medication change my pet's personality?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                No - properly prescribed anti-anxiety medication doesn't change personality, it removes the anxiety that was preventing your pet from being themselves. Think of it like glasses for someone with poor vision - glasses don't change who they are, they help them see clearly. Common misconception: "My dog will be a zombie" - this indicates wrong medication or wrong dosage. Correctly medicated anxious pets become MORE playful, social, and engaged because they're not constantly stressed. They're the same personality, just finally able to relax and enjoy life. If your pet seems overly sedated, contact your vet - dosage likely needs adjustment.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I comfort my pet when they're anxious?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Complex answer - yes AND no. You cannot reinforce fear itself (emotions aren't trainable), BUT you can reinforce anxious behaviours. Best approach: Act calm and confident yourself (pets take emotional cues from you), allow them to seek comfort if they want (don't force interaction), provide safe space to retreat, don't make a big fuss or use overly excited/sympathetic voice. Do: Remain calm, offer safe den, use normal voice. Don't: Excessive petting/treats during panic, dramatic soothing ("Oh poor baby!"), forcing interaction. During thunderstorms: If they want to hide, let them. Sitting nearby quietly = supportive. Dramatic comforting = can worsen anxiety.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can anxiety cause physical health problems?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Absolutely - chronic anxiety has serious physical health consequences. Common issues: Gastrointestinal problems (diarrhoea, inflammatory bowel disease), weakened immune system (increased infections), skin problems (hot spots from licking, hair loss), urinary issues (stress cystitis in cats), cardiovascular stress (elevated heart rate, blood pressure), decreased appetite leading to weight loss, sleep disturbances affecting overall health. Cats specifically: Feline idiopathic cystitis (painful bladder inflammation) often stress-related, fatty liver disease if stopped eating due to anxiety. This is why treating anxiety isn't just behavioural - it's essential for physical health and longevity.
              </div>
            </details>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-cpAqua via-cpAqua/90 to-cpAmber py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              💙 Help Your Pet Feel Safe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional Anxiety Treatment Plans
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Certified behaviourists create customised anxiety treatment protocols combining behaviour modification, environmental management, and medication when appropriate.
            </p>
            <Button
              size="lg"
              className="bg-white text-cpAqua hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl"
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
            "headline": "Anxiety in Pets: Signs and Solutions",
            "description": "Comprehensive guide to recognising and treating pet anxiety. Expert advice on symptoms, causes, and evidence-based treatment approaches for dogs and cats.",
            "image": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-behaviour/anxiety-pets"
            }
          })
        }}
      />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Living with Multiple Pets: Introduction and Harmony Guide",
  description: "Expert guide to successfully introducing and managing multiple pets. Learn how to introduce dogs, cats, or mixed species whilst maintaining peace and preventing conflict.",
  keywords: "multiple pets, introducing pets, multi-pet household, dog and cat together, second dog, second cat, pet introduction, harmony pets",
  alternates: {
    languages: {
      'en': '/en/guide/pet-behaviour/multiple-pets',
      'nl': '/nl/gids/huisdiergedrag/meerdere-huisdieren',
    },
  },
  openGraph: {
    title: "Living with Multiple Pets: Introduction and Harmony",
    description: "Step-by-step guidance for introducing new pets and maintaining harmony in multi-pet households. Evidence-based strategies that actually work.",
    type: "article",
  },
};

export default function MultiplePetsPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpAmber/10 via-cpCoral/10 to-cpAqua/10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-8 md:p-12 border border-border dark:border-cpAmber/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAmber/10 border border-cpAmber/30 mb-6">
              <span className="text-2xl">🏡</span>
              <span className="text-sm font-medium text-foreground">Multi-Pet Specialist</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Living with Multiple Pets: Introduction and Harmony
            </h1>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
              Adding a second pet? Learn the proper way to introduce dogs, cats, or mixed species to create a harmonious multi-pet household. From first meeting to daily management, get it right from the start.
            </p>
            <Button
              size="lg"
              className="bg-cpAmber text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform shadow-lg"
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
            Multi-pet households can be wonderfully enriching - pets provide companionship for each other, engage in play, and share their lives together. But rushed or improper introductions can lead to years of conflict, stress, and even aggression. The first impression matters enormously. Whether you're introducing two dogs, two cats, or a dog and cat, following species-specific protocols dramatically increases success rates. This comprehensive guide covers every scenario with step-by-step instructions for peaceful coexistence.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Before You Begin: Critical Considerations
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Assessing Compatibility
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Not all pets are suited for multi-pet households. Consider carefully:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Current pet's temperament:</strong> Social? Tolerant of other animals? Any history of aggression?</li>
            <li><strong>Age and energy matching:</strong> Rambunctious puppy + arthritic senior = stress for both</li>
            <li><strong>Personality compatibility:</strong> Dominant + dominant = conflict; shy + confident often works</li>
            <li><strong>Breed characteristics:</strong> High prey drive breeds (terriers, sighthounds) risk with cats/small pets</li>
            <li><strong>Space requirements:</strong> Each pet needs personal space, hiding spots, escape routes</li>
            <li><strong>Resource capacity:</strong> Can you afford vet care, food, time for multiple pets?</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Timing Matters
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-3">Wait for the Right Time:</h4>
            <ul className="space-y-2 text-blue-800 dark:text-blue-300">
              <li>• <strong>Minimum 6 months:</strong> After first pet fully settled, trained, bonded to you</li>
              <li>• <strong>Stable household:</strong> Not during house moves, job changes, pregnancy, major stress</li>
              <li>• <strong>First pet healthy:</strong> Medical issues resolved, not elderly/fragile</li>
              <li>• <strong>Training complete:</strong> First pet responds reliably to basic commands</li>
              <li>• <strong>Behavioural issues addressed:</strong> Resolve aggression, anxiety, separation issues first</li>
            </ul>
            <p className="text-blue-800 dark:text-blue-300 mt-4 font-medium">
              Rushing introductions during stressful periods dramatically increases failure risk.
            </p>
          </div>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Scenario 1: Introducing Two Dogs
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Step 1: Neutral Territory First Meeting
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            NEVER introduce dogs at home first - your current dog's territory.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Location:</strong> Neutral park, quiet street, or large open space</li>
            <li><strong>Setup:</strong> Two handlers, both dogs on lead, start 10-15 metres apart</li>
            <li><strong>Parallel walking:</strong> Walk same direction, maintaining distance whilst dogs observe each other</li>
            <li><strong>Body language check:</strong> Loose, wiggly bodies = good; stiff, intense staring = too close</li>
            <li><strong>Gradual approach:</strong> Slowly decrease distance over 10-15 minutes</li>
            <li><strong>Brief greeting:</strong> Allow sniffing (3-5 seconds), then redirect with "let's go!" and walk away</li>
            <li><strong>Multiple meetings:</strong> Repeat 2-3 neutral meetings before home introduction</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Step 2: Positive Associations
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>High-value treats:</strong> Presence of other dog = amazing rewards</li>
            <li><strong>Keep sessions short:</strong> 5-10 minutes first time, end on positive note</li>
            <li><strong>Reward calm behaviour:</strong> Sniffing ground, looking away, loose body language</li>
            <li><strong>Interrupt tension early:</strong> Stiffness, prolonged staring - create distance immediately</li>
            <li><strong>Build gradually:</strong> Each meeting slightly longer, closer proximity</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Step 3: Home Introduction
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Only after multiple successful neutral meetings:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Pre-preparation:</strong> Remove food bowls, toys, high-value items from access</li>
            <li><strong>New dog explores first:</strong> Current dog outside whilst new dog explores house</li>
            <li><strong>Swap scents:</strong> New dog's bed to current dog's area and vice versa</li>
            <li><strong>Bring together outdoors:</strong> In garden/yard first, still on leads</li>
            <li><strong>Indoor supervision:</strong> 30 minutes on-lead together indoors, then off-lead if calm</li>
            <li><strong>First week protocol:</strong> Constant supervision when together, separate when unsupervised</li>
            <li><strong>Individual resources:</strong> Separate feeding areas, beds, toys for each dog</li>
          </ul>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3">Warning Signs - Stop Introduction:</h4>
            <ul className="space-y-2 text-red-800 dark:text-red-300">
              <li>• Stiff, tense body language with intense staring</li>
              <li>• Hackles raised, tail high and rigid</li>
              <li>• Lip curling, growling, air snapping</li>
              <li>• Relentless pursuing/chasing without play breaks</li>
              <li>• One dog showing fear (cowering, trying to escape)</li>
              <li>• Resource guarding escalation (over toys, food, space, you)</li>
            </ul>
            <p className="text-red-800 dark:text-red-300 mt-4 font-medium">
              If you see these: separate dogs, go back to earlier steps, consider professional behaviourist.
            </p>
          </div>

          {/* CTA Middle */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 rounded-2xl p-8 my-12 border border-cpAqua/30">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🎯</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  Professional Introduction Support
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  A behaviourist can supervise initial introductions, identify early warning signs, and guide you through the process for risky combinations or reactive pets.
                </p>
                <Button
                  className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
                  asChild
                >
                  <Link href="/en/united-kingdom">
                    Find behaviourists in your area →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Scenario 2: Introducing Two Cats
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Step 1: Complete Isolation and Scent Exchange (1-2 weeks)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Cats are territorial - introductions MUST be slow. No shortcuts!
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Separate room:</strong> New cat in own room with litter tray, food, water, hiding spots</li>
            <li><strong>No visual contact:</strong> Door closed - scent exchange only this phase</li>
            <li><strong>Daily scent swaps:</strong> Rub cloth on both cats, place near feeding areas</li>
            <li><strong>Room rotation:</strong> Swap cats between rooms so they explore each other's scent</li>
            <li><strong>Feed near door:</strong> Both cats fed on opposite sides of door (positive association)</li>
            <li><strong>Duration:</strong> Minimum 7-10 days, longer if either cat shows stress</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Step 2: Visual Contact Through Barrier (1-2 weeks)
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Baby gate method:</strong> Install gate so cats can see but not reach each other</li>
            <li><strong>Feeding sessions:</strong> Feed both cats near gate - rewards proximity</li>
            <li><strong>Play near barrier:</strong> Interactive toys on both sides creates positive association</li>
            <li><strong>Monitor body language:</strong> Relaxed, curious = progressing; hissing, hiding = need more time</li>
            <li><strong>Gradual habituation:</strong> Sessions start 5 minutes, build to 30+ minutes</li>
            <li><strong>Don't rush:</strong> 1-3 weeks at this stage is normal - patience prevents problems</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Step 3: Supervised Physical Contact
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>First meeting:</strong> 5-10 minutes only, then separate again</li>
            <li><strong>Distractions ready:</strong> Treats, toys, laser pointer to redirect tension</li>
            <li><strong>Escape routes:</strong> Both cats can retreat to safe spaces (high perches, hiding boxes)</li>
            <li><strong>No forced interaction:</strong> Let cats approach at their own pace</li>
            <li><strong>Build duration:</strong> Increase time together by 5-10 minutes each successful session</li>
            <li><strong>Separate when unsupervised:</strong> First month, separate when you're out</li>
          </ul>

          <div className="bg-gradient-to-br from-cpAmber/10 to-cpCoral/10 rounded-2xl p-6 mb-8 border border-cpAmber/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Essential Resources Rule: N + 1</h4>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              For harmonious multi-cat households, provide:
            </p>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>• <strong>Litter trays:</strong> Number of cats + 1 (2 cats = 3 trays in different locations)</li>
              <li>• <strong>Food bowls:</strong> Separate feeding stations to prevent competition</li>
              <li>• <strong>Water bowls:</strong> Multiple locations throughout house</li>
              <li>• <strong>Scratching posts:</strong> Minimum one per cat, at entry points and sleeping areas</li>
              <li>• <strong>Sleeping spots:</strong> High perches, low hideaways, heated beds - variety</li>
              <li>• <strong>Play resources:</strong> Enough toys for everyone plus individual play sessions</li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80 mt-4">
              <strong>Why:</strong> Reduces competition, prevents territorial disputes, allows personal space.
            </p>
          </div>

          {/* Section 4 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Scenario 3: Introducing Dog and Cat
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Pre-Introduction: Test Prey Drive
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Critical safety step - some dogs have too high prey drive for cat cohabitation:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Test setup:</strong> Dog sees cat through fence/baby gate (cat safe, can't be reached)</li>
            <li><strong>Green light signs:</strong> Curiosity, sniffing, looking away, responds to your cues</li>
            <li><strong>Red flag signs:</strong> Intense fixation, whining, lunging, ignoring all commands</li>
            <li><strong>High-risk breeds:</strong> Terriers, sighthounds, some herding breeds - extra caution</li>
            <li><strong>Professional assessment:</strong> If dog shows intense prey drive, get behaviourist evaluation</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Step 1: Isolation and Scent Exchange (like cats)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Start with complete separation, scent swapping, feeding near barrier. Duration: 1-2 weeks.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Step 2: Visual Contact with Barrier
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Dog on lead:</strong> Always - full control to prevent chasing</li>
            <li><strong>Cat behind gate:</strong> Can observe dog safely, escape to hiding spot</li>
            <li><strong>Reward calm behaviour:</strong> Treat dog for looking at cat calmly, then looking back at you</li>
            <li><strong>Teach "watch me":</strong> Dog focuses on you, not cat - heavily reward</li>
            <li><strong>Build duration:</strong> Sessions from 5 minutes to 20+ minutes over days/weeks</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Step 3: Controlled Physical Introduction
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Dog restrained:</strong> On lead, you have full control</li>
            <li><strong>Cat free:</strong> Can move, has escape routes (high cat trees, shelves)</li>
            <li><strong>Keep dog calm:</strong> Reward heavily for calm behaviour around cat</li>
            <li><strong>No chasing allowed:</strong> Interrupt immediately any stalking/chasing behaviour</li>
            <li><strong>Short sessions:</strong> 5-10 minutes initially, build gradually</li>
            <li><strong>Never alone together:</strong> First 2-3 months minimum - separate when unsupervised</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Safety Measures for Dog-Cat Households
          </h3>
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAqua/10 rounded-2xl p-6 mb-8 border border-cpCoral/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Permanent Safety Setup:</h4>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>• <strong>Cat safe zones:</strong> Baby gates creating dog-free areas</li>
              <li>• <strong>High escape routes:</strong> Cat trees, wall shelves, tops of furniture</li>
              <li>• <strong>Litter tray location:</strong> In dog-proof area (dogs eating cat litter is common!)</li>
              <li>• <strong>Feeding separation:</strong> Cat fed on counter/high surface, dog can't access</li>
              <li>• <strong>Consider muzzle:</strong> For dogs with high prey drive during introduction phase</li>
            </ul>
          </div>

          {/* Section 5 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Daily Management in Multi-Pet Households
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Resource Distribution
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Feeding protocols:</strong> Separate locations, feed simultaneously, monitor for resource guarding</li>
            <li><strong>Toy management:</strong> Enough for everyone, remove if conflict arises, rotate to maintain interest</li>
            <li><strong>Individual attention:</strong> Daily one-on-one time with each pet separately</li>
            <li><strong>Space allocation:</strong> Each pet gets personal resting area respected by others</li>
            <li><strong>No favouritism:</strong> Vary who gets attention first to prevent hierarchy issues</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Conflict Management
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Small disagreements are normal, but know when to intervene:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Normal:</strong> Brief growls (boundary setting), play that looks rough but voluntary, short chase</li>
            <li><strong>Intervene:</strong> Extended chasing, one pet fearful/hiding, injuries, escalating tension</li>
            <li><strong>How:</strong> Distract with noise/treats, use barriers (never grab fighting animals), timeout separately</li>
            <li><strong>Post-conflict:</strong> Identify trigger, prevent repeat scenarios, manage environment better</li>
            <li><strong>Persistent issues:</strong> Consult behaviourist - may need formal behaviour modification plan</li>
          </ul>

          {/* Internal Links */}
          <div className="bg-cpAmber/10 border border-cpAmber/30 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Related behaviour topics:
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/en/guide/pet-behaviour/dog-aggression" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Understanding and Managing Dog Aggression
                </Link>
              </li>
              <li>
                <Link href="/en/guide/pet-behaviour/anxiety-pets" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Anxiety in Pets: Signs and Solutions
                </Link>
              </li>
              <li>
                <Link href="/en/guide/pet-behaviour/cats-scratching-furniture" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → How to Stop Cats Scratching Furniture
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Frequently Asked Questions About Multiple Pets
          </h2>

          <div className="space-y-4 mb-12">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How long until my pets become friends?
                <span className="text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Highly variable - from weeks to months, sometimes longer. Some pets become best friends within a month, others tolerate each other after 6 months, and some maintain respectful distance permanently. Important: "Success" isn't necessarily cuddle buddies - it's peaceful coexistence without stress. Goals: (1) No aggression or fear, (2) Both pets relaxed in same space, (3) Minimal conflict over resources. Timeline factors: species combination (dogs faster than cats), personalities, age difference, introduction quality. Dogs: typically 1-3 months. Cats: 2-6 months minimum. Dog-cat: 3-6 months. Respect individual pace - rushing creates problems.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I speed up the introduction process?
                <span className="text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                NO - this is the number one mistake in multi-pet households. Rushing introductions is the primary cause of long-term relationship failure. A bad first impression can create months or years of conflict that's difficult to undo. What you "save" in time now, you'll lose tenfold in fixing problems later. With cats especially, the complete process can take 2-3 months - this is NORMAL and necessary. Each step builds positive associations and prevents fear/aggression from developing. Think of it like building a foundation - cutting corners creates an unstable structure. Patience now = peaceful coexistence for years to come.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                They're fighting - should I separate them permanently?
                <span className="text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Depends on severity and context. Minor squabbles (brief growls, short standoffs, no injuries) are normal boundary-setting - manage triggers, don't separate. Serious fights (injuries, prolonged attacks, one pet terrified, escalating frequency) require immediate separation and professional assessment. Action plan: (1) Separate immediately for safety, (2) Identify what triggered the fight, (3) Vet check for injuries and pain (pain causes aggression), (4) Consult certified behaviourist for assessment. Sometimes incompatible pets need permanent separation or rehoming - this is the responsible choice when safety compromised. Professional can determine if relationship salvageable or if separation best for all involved.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I introduce a puppy/kitten to a senior pet?
                <span className="text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Yes, but requires extra consideration and management. Young animals have boundless energy and can overwhelm, annoy, or stress senior pets (especially those with arthritis or health issues). Success strategies: (1) Vet check for senior first - ensure no pain conditions that would make interactions difficult, (2) Enforce mandatory rest periods - puppy/kitten in separate area so senior gets peace, (3) Limit interaction time initially - short, positive sessions only, (4) Protect senior's resources - food, favourite sleeping spots, ensure they're not bullied, (5) Tire youngster out separately - exercise/play before senior interactions, (6) Respect senior's pace - never force interaction, let them control distance. Sometimes a young, active companion rejuvenates a senior. Sometimes it's too stressful. Monitor senior for signs of stress (hiding more, appetite loss, increased irritability).
              </div>
            </details>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-cpAmber via-cpAmber/90 to-cpCoral py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              🏡 Harmonious Multi-Pet Home
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional Pet Introduction Support
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Behaviourists can supervise introductions, prevent common mistakes, and guide you through the process for challenging combinations or reactive pets.
            </p>
            <Button
              size="lg"
              className="bg-white text-cpAmber hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl"
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
            "headline": "Living with Multiple Pets: Introduction and Harmony",
            "description": "Comprehensive guide to introducing and managing multiple pets. Step-by-step protocols for dogs, cats, and mixed species with evidence-based strategies.",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-behaviour/multiple-pets"
            }
          })
        }}
      />
    </div>
  );
}

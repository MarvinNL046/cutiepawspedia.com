import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Why Your Dog Barks Too Much and How to Stop It | CutiePawsPedia",
  description: "Discover why dogs bark excessively and proven methods to reduce barking. Expert guidance on understanding your dog's communication and training techniques that work.",
  keywords: "dog barking, excessive barking, stop dog barking, dog training, barking behaviour, nuisance barking, dog communication, bark control",
  alternates: {
    languages: {
      'en': '/en/guide/pet-behaviour/dog-barking-too-much',
      'nl': '/nl/gids/huisdiergedrag/hond-blaft-veel',
    },
  },
  openGraph: {
    title: "Why Your Dog Barks Too Much and How to Stop It",
    description: "Expert advice on reducing excessive barking. Understanding causes and proven training techniques. Find professional dog trainers near you.",
    type: "article",
  },
};

export default function DogBarkingPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpCoral/10 via-cpAmber/10 to-cpAqua/10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-8 md:p-12 border border-border dark:border-cpAmber/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 border border-cpCoral/30 mb-6">
              <span className="text-2xl">🔊</span>
              <span className="text-sm font-medium text-foreground">Barking Behaviour Expert</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Why Your Dog Barks Too Much and How to Stop It
            </h1>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
              Excessive barking driving you mad? Understand why your dog barks and discover proven training methods to reduce nuisance barking whilst maintaining healthy communication.
            </p>
            <Button
              size="lg"
              className="bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform shadow-lg"
              asChild
            >
              <Link href="/en/united-kingdom">
                Find a dog trainer near you →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
            Barking is natural dog behaviour - it's how they communicate excitement, fear, boredom, and territorial warnings. But when barking becomes excessive, it signals an underlying issue that needs addressing. Whether you're dealing with alert barking at every passerby or attention-seeking barking at 3am, this guide will help you identify causes and implement effective solutions. Let's turn that noisy nightmare into peaceful coexistence.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Understanding Why Dogs Bark Excessively
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Alert/Territorial Barking
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            The most common type - dogs bark to defend their territory from perceived intruders.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Triggers:</strong> Doorbell, people walking past windows, delivery drivers, other dogs outside</li>
            <li><strong>Characteristics:</strong> Rapid, continuous barking; often at the same location (window, fence line)</li>
            <li><strong>Body language:</strong> Alert posture, ears forward, focused stare towards trigger</li>
            <li><strong>Why it's excessive:</strong> Over-vigilance, lack of confidence, reinforced behaviour</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Attention-Seeking Barking
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Your dog has learned that barking gets your attention - even if it's negative attention.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Triggers:</strong> You working, watching TV, talking to someone, eating food</li>
            <li><strong>Characteristics:</strong> Single barks or short bursts, pauses to see your reaction, escalates if ignored</li>
            <li><strong>Body language:</strong> Eyes on you, sometimes bringing toys, wagging tail</li>
            <li><strong>Why it's excessive:</strong> You've accidentally rewarded it by responding (even saying "Quiet!" is attention)</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Boredom/Frustration Barking
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Under-stimulated dogs bark to release pent-up energy and frustration.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Triggers:</strong> Left alone for long periods, insufficient exercise, lack of mental stimulation</li>
            <li><strong>Characteristics:</strong> Repetitive, monotonous barking for extended periods</li>
            <li><strong>Associated behaviours:</strong> Destructive chewing, digging, pacing, escape attempts</li>
            <li><strong>High-risk breeds:</strong> Working breeds (Border Collies, Huskies, German Shepherds) need jobs!</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Separation Anxiety Barking
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Distress barking when left alone - this is an anxiety disorder requiring specialised treatment.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Characteristics:</strong> Begins immediately or shortly after you leave, continuous, high-pitched</li>
            <li><strong>Other signs:</strong> Destruction near exits, toileting indoors, excessive drooling, self-harm</li>
            <li><strong>Important:</strong> This is NOT naughtiness - it's genuine panic requiring professional help</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            5. Fear/Anxiety Barking
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Barking at things that frighten them: thunderstorms, fireworks, unfamiliar people, other dogs.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            6. Medical/Age-Related Barking
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-3">When to see a vet first:</h4>
            <ul className="space-y-2 text-blue-800 dark:text-blue-300">
              <li>• Sudden increase in barking (could indicate pain, cognitive decline, hearing loss)</li>
              <li>• Senior dogs developing night barking (canine cognitive dysfunction)</li>
              <li>• Barking with other behavioural changes (aggression, confusion, house soiling)</li>
              <li>• Obsessive barking at nothing (could be neurological)</li>
            </ul>
            <p className="text-blue-800 dark:text-blue-300 mt-4 font-medium">
              Always rule out medical causes before assuming it's purely behavioural.
            </p>
          </div>

          {/* CTA Middle */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpAmber/10 rounded-2xl p-8 my-12 border border-cpAqua/30">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🎓</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  Professional Behaviour Assessment
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  A certified dog behaviourist can identify your dog's specific triggers and create a customised training plan for lasting results.
                </p>
                <Button
                  className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
                  asChild
                >
                  <Link href="/en/united-kingdom">
                    Find behaviour specialists in your area →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            How to Stop Excessive Barking: Proven Methods
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Foundation: Meet Basic Needs First
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Before any training, ensure your dog is:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Physically exercised:</strong> Minimum 1-2 hours daily (breed dependent). Tired dogs bark less</li>
            <li><strong>Mentally stimulated:</strong> Puzzle toys, sniff walks, training sessions, interactive play</li>
            <li><strong>Not in pain:</strong> Vet check to rule out medical causes</li>
            <li><strong>On consistent routine:</strong> Dogs thrive on predictability</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Training Method 1: Ignore Attention-Seeking Barking
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            For dogs barking for attention:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Complete non-reaction:</strong> No eye contact, no speaking, no touching whilst barking</li>
            <li><strong>Turn away:</strong> Physically turn your back or leave the room</li>
            <li><strong>Wait for silence:</strong> Even 2 seconds of quiet counts</li>
            <li><strong>Immediately reward quiet:</strong> Treat, praise, attention the MOMENT they stop</li>
            <li><strong>Expect extinction burst:</strong> Barking will get worse before it gets better (they're testing if it still works)</li>
            <li><strong>Consistency is everything:</strong> Everyone in household must follow the same rule</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Training Method 2: Teach "Quiet" Command
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Step-by-step process:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Allow 2-3 barks:</strong> Let them alert you (acknowledging their job)</li>
            <li><strong>Say "Quiet" once:</strong> Calm, firm voice (not shouting - that's joining in!)</li>
            <li><strong>Wait for pause:</strong> Even 1 second of silence initially</li>
            <li><strong>Reward immediately:</strong> High-value treat + praise</li>
            <li><strong>Practice with setup situations:</strong> Have someone ring doorbell whilst you train</li>
            <li><strong>Gradually increase duration:</strong> From 1 second silence to 5, then 10, then 30 seconds</li>
            <li><strong>Add hand signal:</strong> Finger to lips helps reinforce the command</li>
          </ol>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Training Method 3: Desensitisation for Alert Barking
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Reduce reactivity to triggers:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Identify triggers:</strong> List everything that makes them bark</li>
            <li><strong>Controlled exposure:</strong> Use recordings (doorbell sounds, dog barking videos) at LOW volume</li>
            <li><strong>Counter-conditioning:</strong> Trigger happens = amazing treats appear</li>
            <li><strong>Gradually increase intensity:</strong> Louder sounds, closer proximity, more realistic scenarios</li>
            <li><strong>Manage environment:</strong> Block window access, white noise machines, curtains closed</li>
            <li><strong>Redirect attention:</strong> Train "Go to your mat" as alternative to window watching</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Training Method 4: Exercise and Enrichment Protocol
          </h3>
          <div className="bg-gradient-to-br from-cpAmber/10 to-cpCoral/10 rounded-2xl p-6 mb-8 border border-cpAmber/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Daily Routine for Boredom Barkers:</h4>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>• <strong>Morning:</strong> 30-60 min walk + 10 min training session</li>
              <li>• <strong>Midday:</strong> Puzzle feeder or frozen Kong for lunch</li>
              <li>• <strong>Afternoon:</strong> Mental stimulation (scent work, hide treats, trick training)</li>
              <li>• <strong>Evening:</strong> 30-60 min walk + interactive play + chew time</li>
              <li>• <strong>Throughout day:</strong> Rotate toys, scatter feeding, sniff mats</li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80 mt-4">
              <strong>Remember:</strong> A tired dog is a quiet dog. Mental exercise tires them as much as physical.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            What NOT to Do
          </h3>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3">These methods make barking worse:</h4>
            <ul className="space-y-2 text-red-800 dark:text-red-300">
              <li>• <strong>Shouting at your dog:</strong> They think you're joining in the barking</li>
              <li>• <strong>Shock collars:</strong> Cause fear, anxiety, and can increase aggression (banned in many countries)</li>
              <li>• <strong>Debarking surgery:</strong> Cruel, doesn't address cause, can cause medical complications</li>
              <li>• <strong>Punishment after the fact:</strong> Dogs don't connect punishment with earlier barking</li>
              <li>• <strong>Inconsistency:</strong> Sometimes allowing barking, sometimes punishing it - creates confusion</li>
            </ul>
          </div>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Specific Solutions for Different Scenarios
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Barking at Delivery Drivers
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Problem: Driver appears → dog barks → driver leaves → dog thinks barking worked!</li>
            <li><strong>Solution:</strong> Ask friendly driver to wait whilst you reward quiet behaviour (breaks the reinforcement cycle)</li>
            <li>Train "go to bed" command when doorbell rings - reward heavily for staying there</li>
            <li>Management: Keep dog in separate room during expected deliveries</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Barking When Left Alone
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>First distinguish: Boredom vs separation anxiety (install pet camera to see behaviour)</li>
            <li><strong>Boredom solution:</strong> Puzzle toys, frozen Kongs, doggy daycare, dog walker</li>
            <li><strong>Separation anxiety:</strong> Requires systematic desensitisation protocol - work with certified behaviourist</li>
            <li>Never punish when you return - they won't connect it with earlier barking</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Barking at Other Dogs on Walks
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Often frustration (wants to play) or fear-based reactivity</li>
            <li><strong>Management:</strong> Cross street, create distance, walk at quieter times initially</li>
            <li><strong>Training:</strong> "Watch me" command, reward focus on you instead of other dog</li>
            <li><strong>Counter-conditioning:</strong> See dog = amazing treats (change emotional response)</li>
            <li>Consider reactive dog training classes - specialised group setting</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Early Morning/Night Barking
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Rule out medical first (bladder infection, cognitive decline in seniors)</li>
            <li>Ensure late evening toilet break and early morning routine consistency</li>
            <li>Blackout curtains if triggered by sunrise/activity outside</li>
            <li>White noise machine to mask outside sounds</li>
            <li>Never reward by letting them out/feeding - reinforces the behaviour</li>
          </ul>

          {/* Internal Links */}
          <div className="bg-cpAmber/10 border border-cpAmber/30 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Related behaviour topics that can help:
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/en/guide/pet-behaviour/anxiety-pets" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Anxiety in Pets: Signs and Solutions
                </Link>
              </li>
              <li>
                <Link href="/en/guide/pet-behaviour/dog-aggression" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Understanding and Managing Dog Aggression
                </Link>
              </li>
              <li>
                <Link href="/en/guide/pet-training/basic-commands" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Essential Dog Training Commands Every Owner Should Know
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Frequently Asked Questions About Dog Barking
          </h2>

          <div className="space-y-4 mb-12">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How long does it take to stop excessive barking?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                This varies hugely depending on cause, duration of the behaviour, and training consistency. Attention-seeking barking can improve in 1-2 weeks with perfect consistency. Fear-based or territorial barking may take 2-3 months of desensitisation work. The longer a behaviour has been reinforced, the longer it takes to change. Consistency from all family members is absolutely crucial - one person giving in can undo weeks of progress.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Are anti-bark collars effective and safe?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Spray collars and ultrasonic devices may temporarily suppress barking but don't address the underlying cause - the moment the collar comes off, barking often returns. Shock collars cause fear and anxiety and are banned in many countries. These are quick fixes that ignore why your dog is barking. It's far more effective (and ethical) to address the root cause through training and management. Think of it like taking painkillers for a broken leg - treats the symptom, not the problem.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My neighbours are complaining - what should I do?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                First, acknowledge their concern and let them know you're working on it. Install a pet camera to understand when/why your dog barks when you're out. Immediately implement management strategies: doggy daycare, dog walker midday, puzzle feeders, white noise machine. Start formal training with a certified behaviourist who can create a structured plan. Keep neighbours updated on your progress - most people are understanding if they see you're taking action. Consider a written note explaining you're aware and actively addressing the issue.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I let my dog bark sometimes?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Yes! Barking is natural communication - you don't want to eliminate it entirely. Allow 2-3 alert barks when someone approaches your property (they're doing their job as watchdog). The key is teaching them to stop on command. Think of it as "Thank you for letting me know, but I've got this now." Never punish all barking - you'll create an anxious, confused dog who doesn't know when communication is appropriate. The goal is controlled, appropriate barking, not a silent dog.
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
              🔇 Peace and Quiet Awaits
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional Help for Persistent Barking
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              A certified dog behaviourist can identify your dog's specific triggers and create a customised training plan for lasting results.
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
            "headline": "Why Your Dog Barks Too Much and How to Stop It",
            "description": "Expert guidance on understanding excessive dog barking and proven training methods to reduce nuisance barking whilst maintaining healthy communication.",
            "image": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-behaviour/dog-barking-too-much"
            }
          })
        }}
      />
    </div>
  );
}

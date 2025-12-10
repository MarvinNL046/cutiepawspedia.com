/**
 * SEO Landing Page: Common Dog Behaviour Problems and Solutions
 * Pillar: Pet Training
 * Target: English-speaking dog owners dealing with behavioural issues
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Brain, CheckCircle, Heart, Lightbulb, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Common Dog Behaviour Problems and Solutions: Expert Guide 2025",
  description: "Solve common dog behaviour issues like excessive barking, chewing, jumping, aggression, and separation anxiety. Evidence-based solutions from certified trainers.",
  keywords: [
    "dog behaviour problems",
    "dog training issues",
    "stop dog barking",
    "dog chewing furniture",
    "dog jumping on people",
    "dog aggression solutions",
    "separation anxiety dogs",
    "fix bad dog behaviour"
  ],
  alternates: {
    canonical: "https://cutiepawspedia.com/en/guide/pet-training/dog-behaviour-problems",
    languages: {
      "nl": "https://cutiepawspedia.com/nl/gids/hondentraining/hondengedragsproblemen",
      "en": "https://cutiepawspedia.com/en/guide/pet-training/dog-behaviour-problems"
    }
  },
  openGraph: {
    title: "Common Dog Behaviour Problems and Solutions: Expert Guide",
    description: "Evidence-based solutions for barking, chewing, jumping, aggression, and more. Stop unwanted behaviours effectively.",
    type: "article",
    url: "https://cutiepawspedia.com/en/guide/pet-training/dog-behaviour-problems"
  },
};

export default function DogBehaviourProblems() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Pet Training</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Common Dog Behaviour Problems and Solutions
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Every dog displays unwanted behaviours at some point. The good news? Most behaviour problems can be solved with proper training, patience, and understanding the root cause. Learn evidence-based solutions to the most common issues.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🐕 Struggling with serious behaviour issues?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=training">
                Find certified behaviourists near you →
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
            Understanding why your dog behaves a certain way is the first step to fixing it. Dogs don't misbehave to spite you—they're communicating needs, responding to their environment, or simply haven't been taught what's expected.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This guide covers the 8 most common behaviour problems, their underlying causes, and proven step-by-step solutions. We'll also discuss when to seek professional help and how to prevent problems before they start.
          </p>
        </section>

        {/* When to Seek Professional Help */}
        <section className="mb-12">
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800/50 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Seek Immediate Professional Help For:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span><strong>Aggression:</strong> Biting, lunging, growling at people or other animals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span><strong>Severe separation anxiety:</strong> Self-harm, destruction, panic attacks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span><strong>Resource guarding:</strong> Protecting food/toys with aggression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span><strong>Compulsive behaviours:</strong> Tail chasing, excessive licking, self-mutilation</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-3">
              These issues require a certified behaviourist or veterinary behaviourist. Don't wait—early intervention prevents escalation.
            </p>
          </div>
        </section>

        {/* 8 Common Problems */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Lightbulb className="h-7 w-7 text-cpAmber" />
            8 Common Behaviour Problems (And How to Fix Them)
          </h2>

          <div className="space-y-8">
            {/* Problem 1: Excessive Barking */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">1</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">Excessive Barking</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                    Barking is natural communication, but excessive barking disrupts households and annoys neighbours.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Common Causes:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• Boredom or lack of exercise</li>
                    <li>• Alert/territorial barking (doorbell, passing people)</li>
                    <li>• Attention-seeking behaviour</li>
                    <li>• Fear or anxiety</li>
                    <li>• Separation distress</li>
                  </ul>
                </div>

                <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Solutions:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Increase exercise & mental stimulation:</strong> Tired dogs bark less. Add daily walks, puzzle toys, training sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Teach "Quiet" command:</strong> Wait for pause in barking, say "Quiet," reward silence immediately. Build duration gradually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Remove triggers:</strong> Close curtains if barking at passers-by, use white noise for sound-sensitive dogs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Don't reinforce barking:</strong> Ignore attention-seeking barks. Only give attention when dog is quiet</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Problem 2: Destructive Chewing */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">2</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">Destructive Chewing</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                    Chewed furniture, shoes, and belongings are frustrating but preventable with the right approach.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Common Causes:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• Puppy teething (3-6 months old)</li>
                    <li>• Boredom or excess energy</li>
                    <li>• Separation anxiety</li>
                    <li>• Exploring their environment (especially young dogs)</li>
                  </ul>
                </div>

                <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Solutions:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Provide appropriate chew toys:</strong> Kongs, rubber toys, dental chews. Rotate toys to maintain interest</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Management is key:</strong> Don't leave valuables accessible. Use baby gates, crates, or puppy-proofed rooms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Catch them in the act:</strong> Redirect to appropriate toy, reward heavily when they chew it instead</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Exercise exhaustion:</strong> Long walks, fetch games, training sessions before alone time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Problem 3: Jumping on People */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">3</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">Jumping on People</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                    Dogs jump to greet at face level. Cute in puppies, dangerous with large adults.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Why Dogs Jump:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• Excitement and greeting behaviour</li>
                    <li>• Seeking attention (which they get, even if negative)</li>
                    <li>• Trying to reach your face (instinctive greeting)</li>
                  </ul>
                </div>

                <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Solutions:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Teach incompatible behaviour:</strong> Train "Sit" for greetings. Reinforce sitting = getting attention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Remove reward for jumping:</strong> Turn away, fold arms, ignore completely. No eye contact, touch, or talking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Reward four on floor:</strong> The instant all paws are down, give enthusiastic praise and treats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Consistency is crucial:</strong> Everyone must follow the same rules—no exceptions for visitors or children</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Problem 4: Pulling on Lead */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">4</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">Pulling on Lead</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                    Walking should be enjoyable, not a tug-of-war. Loose-lead walking is teachable at any age.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Step-by-Step Training:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Stop when they pull:</strong> The instant lead goes tight, stop walking. Stand still like a tree</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Wait for slack:</strong> Don't move until dog releases tension. May take 30+ seconds initially</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Reward loose lead:</strong> When lead is slack, say "Yes!" and give treat. Resume walking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Be patient & consistent:</strong> Early walks may take 20 minutes to go 50 metres. Progress accelerates with practice</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Problem 5: Separation Anxiety */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">5</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">Separation Anxiety</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                    True separation anxiety is distressing for dogs and requires systematic desensitisation.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Signs of Separation Anxiety:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>• Destructive behaviour only when alone</li>
                    <li>• Excessive barking/howling when left</li>
                    <li>• House soiling despite being housetrained</li>
                    <li>• Pacing, drooling, panting, escape attempts</li>
                    <li>• Following you room-to-room constantly</li>
                  </ul>
                </div>

                <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Solutions:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Gradual desensitisation:</strong> Start with 30 seconds alone, build to minutes, then hours over weeks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Create positive associations:</strong> Special treat-stuffed Kong only given when you leave</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Low-key departures/arrivals:</strong> Don't make leaving/coming home dramatic events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Consider medication:</strong> For severe cases, vet-prescribed anxiety medication can help during training</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800/50">
                  <p className="text-xs text-foreground dark:text-cpCream">
                    <strong>Important:</strong> Severe separation anxiety requires professional help. Don't struggle alone—consult a veterinary behaviourist.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 6: Digging */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">6</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">Digging</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                    Natural behaviour for many breeds but frustrating when it destroys your garden.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Solutions:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Provide a digging zone:</strong> Sandbox or designated area where digging is allowed. Bury treats/toys to encourage use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Increase exercise:</strong> Tired dogs dig less. Add long walks, fetch, or agility training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Supervision:</strong> Don't leave dog unsupervised in areas they dig. Redirect when you catch them</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Problem 7: Begging at Table */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">7</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">Begging at the Table</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                    Dogs beg because it works. Stop reinforcing and the behaviour will fade.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Solutions:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Never feed from table:</strong> Not even once. One success reinforces weeks of begging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Teach "Place" command:</strong> Train dog to go to bed/mat during meals. Reward staying there</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Feed before your meal:</strong> Full dogs are less interested in begging</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Problem 8: Counter Surfing */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">8</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">Counter Surfing (Stealing Food)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                    Dogs steal food because it's rewarding. Prevention is easier than correction.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-cpCream mb-2">Solutions:</p>
                  <ul className="text-xs text-muted-foreground dark:text-cpCream/70 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Management first:</strong> Don't leave food accessible. Clear counters, push items back, close kitchen doors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Train "Leave It":</strong> Practise impulse control exercises with increasing temptation levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                      <span><strong>Booby trap safely:</strong> Upside-down baking tray at edge of counter (falls when touched, scares dog)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Need Expert Help with Behaviour Issues?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Certified behaviourists can assess your dog's specific issues and create a customised training plan for lasting results.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Find certified dog behaviourists →
              </Link>
            </Button>
          </div>
        </section>

        {/* Prevention Tips */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-cpCoral" />
            Prevention: Stop Problems Before They Start
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Adequate exercise:</strong> 30-120 minutes daily depending on breed, age, and energy level. Mental stimulation counts too!</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Consistent training:</strong> Work on commands 5-10 minutes daily. Reinforcement prevents backsliding</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Early socialisation:</strong> Expose puppies to diverse experiences during critical period (3-14 weeks)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Environmental management:</strong> Set your dog up for success by controlling their environment</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Regular health checks:</strong> Pain and illness cause behaviour changes. Annual vet visits catch issues early</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Positive reinforcement:</strong> Reward-based training builds confidence and strengthens your bond</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Training Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/pet-training/puppy-training-basics" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Puppy Training Basics</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Foundation training guide →</p>
            </Link>
            <Link href="/en/guide/pet-training/dog-home-alone" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Teaching Your Dog to Stay Home Alone</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Prevent separation anxiety →</p>
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
                Why did my dog's behaviour suddenly change?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Sudden behaviour changes often indicate medical issues. Pain, illness, cognitive decline, or hormonal changes can alter behaviour dramatically. Schedule a vet visit to rule out health problems before assuming it's purely behavioural. Other causes include environmental changes (new home, new pet, family member leaving), fear from a traumatic event, or reaching sexual maturity (6-18 months).
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can you train an old dog to stop bad habits?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Absolutely! "You can't teach an old dog new tricks" is a myth. Older dogs can learn—it just may take longer if the behaviour is deeply ingrained. The key is consistency, patience, and finding the right motivation (high-value treats, favourite toys). Start with easier behaviours to build confidence, then tackle harder habits. Professional trainers can accelerate progress significantly.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is punishment ever appropriate for bad behaviour?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Modern, evidence-based training focuses on positive reinforcement rather than punishment. Punishment can damage your relationship, create fear/anxiety, and often doesn't teach what you actually want. Instead of punishing unwanted behaviour, redirect to a desired behaviour and reward that. For example, rather than yelling when your dog jumps, ignore the jumping and reward sitting. This teaches what TO do, not just what NOT to do.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How long does it take to fix a behaviour problem?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                It depends on the behaviour, how long it's been happening, and consistency of training. Simple habits like jumping may improve in 1-2 weeks with consistent training. Complex issues like separation anxiety can take 3-6 months of systematic work. The "3-3-3 rule" suggests noticeable improvement after 3 days, significant progress after 3 weeks, and full adjustment after 3 months. Consistency is everything—one week of perfect training can be undone by one weekend of inconsistency.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Connect with certified trainers who specialise in behaviour modification
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Browse dog training experts →
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
            "headline": "Common Dog Behaviour Problems and Solutions: Expert Guide",
            "description": "Solve common dog behaviour issues like excessive barking, chewing, jumping, aggression, and separation anxiety. Evidence-based solutions from certified trainers.",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-training/dog-behaviour-problems"
            }
          })
        }}
      />
    </div>
  );
}

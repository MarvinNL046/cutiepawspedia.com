/**
 * SEO Landing Page: Teaching Your Dog to Stay Home Alone
 * Pillar: Pet Training
 * Target: English-speaking dog owners preventing/solving separation anxiety
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Heart, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Teaching Your Dog to Stay Home Alone: Prevent Separation Anxiety",
  description: "Step-by-step guide to teaching dogs independence and preventing separation anxiety. Gradual training methods, crate training tips, and solutions to destructive behaviours.",
  keywords: [
    "dog home alone",
    "teach dog to be alone",
    "dog separation anxiety",
    "prevent separation anxiety",
    "dog independence training",
    "leaving dog alone",
    "dog home alone training",
    "stop dog separation anxiety"
  ],
  alternates: {
    canonical: "https://cutiepawspedia.com/en/guide/pet-training/dog-home-alone",
    languages: {
      "nl": "https://cutiepawspedia.com/nl/gids/hondentraining/hond-alleen-thuis",
      "en": "https://cutiepawspedia.com/en/guide/pet-training/dog-home-alone"
    }
  },
  openGraph: {
    title: "Teaching Your Dog to Stay Home Alone: Prevent Separation Anxiety",
    description: "Complete training guide for teaching dogs independence. Prevent separation anxiety with gradual desensitisation and positive methods.",
    type: "article",
    url: "https://cutiepawspedia.com/en/guide/pet-training/dog-home-alone"
  },
};

export default function DogHomeAlone() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Home className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Pet Training</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Teaching Your Dog to Stay Home Alone
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Every dog needs to learn independence and feel comfortable when left alone. This comprehensive guide provides proven methods for preventing separation anxiety and teaching your dog that being home alone is safe, calm, and stress-free.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🏠 Struggling with separation anxiety?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=training">
                Find separation anxiety specialists →
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
            Dogs are social animals who naturally prefer company, but they must learn to cope with alone time. Without proper training, some dogs develop separation anxiety—a serious condition causing extreme distress when separated from their owners.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            The good news: with gradual, systematic training starting from puppyhood (or when you first adopt), you can teach your dog that alone time is normal, safe, and temporary. This guide covers prevention strategies, training protocols, and solutions for existing separation issues.
          </p>
        </section>

        {/* Separation Anxiety vs Normal Distress */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-cpAmber" />
            Separation Anxiety vs. Normal Alone-Time Distress
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            It's important to distinguish between true separation anxiety and normal adjustment behaviours. The approach differs significantly.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Normal Alone-Time Adjustment:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>Mild whining for 5-15 minutes after departure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>Settling down within 30 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>Occasional accidents whilst learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>Some mild chewing on appropriate toys</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>Improves with consistent training</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-300 dark:border-red-800/50 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-4">True Separation Anxiety:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Destructive behaviour (doors, windows, furniture)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Continuous barking/howling entire time alone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>House soiling despite being housetrained</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Excessive drooling, panting, pacing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Self-harm (broken teeth, injured paws from escape attempts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Panic symptoms starting with pre-departure cues</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <p className="text-xs text-foreground dark:text-cpCream font-semibold">
                  If your dog shows true separation anxiety symptoms, consult a veterinary behaviourist immediately. This guide covers prevention and mild cases only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prevention: Starting from Day One */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Prevention: Building Independence from Day One
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Prevention is infinitely easier than treatment. Start independence training as soon as you bring your puppy or newly adopted dog home.
          </p>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">1. Create a Safe Space (Crate or Quiet Room)</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Dogs feel secure in den-like spaces. A properly introduced crate or designated room becomes a calm retreat, not a punishment.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                <ul className="space-y-2 text-xs text-muted-foreground dark:text-cpCream/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Feed all meals in the crate/room</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Give special long-lasting treats only in this space (Kong, chews)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Practice short durations whilst you're home (5 mins → 10 mins → 30 mins)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Never use crate for punishment or time-outs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Leave crate door open when not training—let them choose to rest there</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">2. Practise Mini-Separations Whilst Home</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Your dog doesn't need to follow you everywhere. Teach independence by creating barriers even when you're home.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                <ul className="space-y-2 text-xs text-muted-foreground dark:text-cpCream/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Use baby gates to separate rooms whilst you cook, shower, work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Give a stuffed Kong when you create separation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Ignore whining—only give attention when quiet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Gradually increase duration: 5 mins → 15 mins → 30 mins → 1 hour</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">3. Make Departures and Arrivals Low-Key</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Emotional, dramatic goodbyes increase anxiety. Treat leaving and returning as no big deal.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                <p className="text-xs font-semibold text-foreground dark:text-cpCream mb-2">DON'T:</p>
                <ul className="space-y-1 text-xs text-muted-foreground dark:text-cpCream/70 mb-3">
                  <li>❌ Long goodbyes with hugs and reassuring talk</li>
                  <li>❌ Enthusiastic greetings when you return</li>
                  <li>❌ Giving attention immediately upon arrival</li>
                </ul>
                <p className="text-xs font-semibold text-foreground dark:text-cpCream mb-2">DO:</p>
                <ul className="space-y-1 text-xs text-muted-foreground dark:text-cpCream/70">
                  <li>✓ Leave calmly without fuss (just walk out)</li>
                  <li>✓ Ignore your dog for first 5-10 minutes after returning</li>
                  <li>✓ Give calm, quiet attention only after they've settled</li>
                </ul>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">4. Randomise Pre-Departure Cues</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Dogs learn to associate keys, shoes, jackets with you leaving. Break these patterns.
              </p>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                <ul className="space-y-2 text-xs text-muted-foreground dark:text-cpCream/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Pick up keys, put on jacket, then sit on sofa instead of leaving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Do "fake departures"—go to car, come back in 30 seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Vary your routine—sometimes leave in pyjamas, sometimes in work clothes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Practise departure cues randomly throughout the day without actually leaving</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Need Expert Help with Separation Anxiety?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Certified behaviourists can create personalised training plans and, in severe cases, work with your vet on medication-assisted behaviour modification.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Find separation anxiety specialists →
              </Link>
            </Button>
          </div>
        </section>

        {/* Gradual Desensitisation Protocol */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Clock className="h-7 w-7 text-cpAmber" />
            Gradual Desensitisation Training Protocol
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            This systematic approach builds your dog's tolerance to being alone. Start at a level your dog can handle with zero stress, then gradually increase difficulty. Never rush—progress too fast causes setbacks.
          </p>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Week 1-2: Out of Sight Practice (30 seconds - 5 minutes)</h3>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Step into another room for 30 seconds, return calmly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>If dog is calm, gradually increase: 1 min → 2 mins → 5 mins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Practise 5-10 times daily at varying intervals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Return before any stress signals (whining, pacing, scratching)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Week 3-4: Indoor Departures (5-15 minutes)</h3>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Go to front door, open and close it (don't leave yet)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Step outside for 5 seconds, come back in</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Gradually increase: 30 secs → 1 min → 5 mins → 10 mins → 15 mins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Add variability: sometimes 2 mins, sometimes 10 mins (keeps them guessing)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Week 5-6: Car Departures (15-30 minutes)</h3>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Get in car, start engine, turn off, come back inside (30 seconds)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Drive to end of street, return (2 minutes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Actual short trips: 5 mins → 10 mins → 20 mins → 30 mins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Use pet camera to monitor—watch for stress signals remotely</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Week 7-8: Extended Absences (30 mins - 2 hours)</h3>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Build to 30 mins → 45 mins → 1 hour → 90 mins → 2 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Provide mental stimulation: frozen Kongs, puzzle feeders, snuffle mats</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Ensure exercise before you leave (tired dog = calmer dog)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Continue monitoring behaviour—look for signs of stress</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">5</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Week 9+: Full Work Day Duration (2-8 hours)</h3>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Slowly extend to 3 hours → 4 hours → 6 hours → full work day</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>For dogs under 6 months, arrange midday breaks (walker, neighbour, daycare)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Adult dogs can manage 8 hours, but 4-6 hours is ideal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cpCoral">→</span>
                        <span>Continue environmental enrichment: TV/radio, window views, interactive toys</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 mt-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Critical success factors:</strong> (1) Never push too fast—if your dog shows stress, go back to previous successful level, (2) Practise daily for consistency, (3) Always return before stress escalates, (4) Use high-value enrichment (frozen Kongs, special chews) only during alone time. This timeline is a guide—some dogs progress faster, others need more time. Individualise based on your dog's responses.
            </p>
          </div>
        </section>

        {/* Helpful Tools */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-cpCoral" />
            Helpful Tools & Environmental Enrichment
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Food Puzzle Toys (Mental Stimulation):</h3>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                  <li>• <strong>Frozen Kongs:</strong> Fill with peanut butter, yoghurt, or wet food. Freeze overnight. Lasts 30-60 mins</li>
                  <li>• <strong>Snuffle mats:</strong> Hide kibble in fabric strips—engages natural foraging behaviour</li>
                  <li>• <strong>Puzzle feeders:</strong> Slow feeders, treat-dispensing balls, interactive food puzzles</li>
                  <li>• <strong>Lick mats:</strong> Spread with soft food, freeze. Calming licking behaviour reduces stress</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Calming Aids:</h3>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                  <li>• <strong>Adaptil (DAP) diffusers:</strong> Synthetic dog appeasing pheromone, proven anxiety reducer</li>
                  <li>• <strong>Calming music:</strong> Classical music or dog-specific playlists (Through a Dog's Ear, iCalmPet)</li>
                  <li>• <strong>White noise:</strong> Masks scary outside sounds (traffic, neighbours, thunderstorms)</li>
                  <li>• <strong>TV/radio:</strong> Familiar voices provide comfort (dog TV channels available)</li>
                  <li>• <strong>ThunderShirt:</strong> Anxiety wrap applies gentle pressure (like swaddling for babies)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Monitoring Tools:</h3>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                  <li>• <strong>Pet cameras:</strong> Furbo, Petcube allow you to watch, talk, and dispense treats remotely</li>
                  <li>• <strong>Video recording:</strong> Record sessions to analyse behaviour patterns and stress signals</li>
                  <li>• <strong>Sound monitoring:</strong> Some cameras alert you to barking/whining so you can intervene</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Exercise & Enrichment:</h3>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                  <li>• <strong>Pre-departure exercise:</strong> 30-60 min walk/play before you leave = tired, calmer dog</li>
                  <li>• <strong>Dog daycare:</strong> 1-3 days/week provides socialisation and exhaustion</li>
                  <li>• <strong>Dog walker:</strong> Midday break for exercise and bathroom needs</li>
                  <li>• <strong>Rotating toys:</strong> Swap toys weekly to maintain novelty and interest</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Troubleshooting Common Problems
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My dog was fine before, but suddenly developed separation anxiety
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70 space-y-2">
                <p>Sudden onset can be triggered by: (1) Major life changes (moving house, new baby, owner's schedule change), (2) Traumatic event whilst alone (thunderstorm, break-in), (3) Medical issues causing pain/discomfort, (4) Cognitive decline in senior dogs.</p>
                <p><strong>Solution:</strong> Visit vet first to rule out medical causes. Then start gradual desensitisation protocol from beginning. Consider temporary use of daycare or sitter whilst training. Maintain consistency—don't abandon progress by leaving dog for long periods before they're ready.</p>
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Progress was good, then my dog regressed. What happened?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70 space-y-2">
                <p>Regressions are normal and usually mean you moved too fast. Common causes: (1) Jumping difficulty levels too quickly, (2) Leaving dog alone too long before ready, (3) Scary event during alone time, (4) Inconsistent training schedule.</p>
                <p><strong>Solution:</strong> Go back to previous successful level for 3-5 days. Rebuild confidence before progressing again. Regression doesn't erase all progress—you'll rebuild faster than the first time. Be patient and consistent.</p>
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My dog destroys things when I leave, but only certain items
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70 space-y-2">
                <p>If destruction focuses on items that smell like you (shoes, pillows, remote controls), this indicates separation distress rather than boredom. Your scent provides comfort, so they seek it out.</p>
                <p><strong>Solution:</strong> (1) Remove access to these items during training, (2) Provide "legal" items with your scent (old t-shirt in their bed), (3) Increase interactive toys and enrichment, (4) Work through gradual desensitisation protocol, (5) Consider leaving recently worn clothing item in crate/safe space.</p>
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can medication help with separation anxiety?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70 space-y-2">
                <p>For severe separation anxiety, medication can be extremely helpful when combined with behaviour modification. Anti-anxiety medication reduces stress enough for dog to learn during training. It's not a standalone solution—training is still essential.</p>
                <p><strong>Common medications:</strong> Clomipramine (Clomicalm), Fluoxetine (Prozac), Alprazolam (for situational anxiety). Must be prescribed by vet. Usually used for 6-12 months whilst completing training programme, then gradually weaned off. Consult veterinary behaviourist for best results.</p>
              </div>
            </details>
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
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Foundation training for puppies →</p>
            </Link>
            <Link href="/en/guide/pet-training/dog-behaviour-problems" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Common Behaviour Problems</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Solutions to common issues →</p>
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
                How long can dogs be left alone?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Adult dogs (over 1 year) can typically handle 4-6 hours alone, with 8 hours being the maximum for most. Puppies under 6 months need breaks every 2-4 hours for toilet needs and cannot be crated longer than their age in months plus one hour. Senior dogs may need more frequent breaks. Breed, individual temperament, and training all affect tolerance. Even dogs comfortable alone shouldn't be left for 8+ hours regularly—it's not fair to their physical or mental wellbeing.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I get another dog to keep my dog company?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Generally not recommended as a solution for separation anxiety. Dogs with separation anxiety are attached to you, not seeking general companionship. A second dog may even develop anxiety by learning from the first. Plus, you'll have double the training, costs, and care needs. Exception: Some dogs genuinely just need canine companionship and do better with a friend. But fix separation anxiety first, then consider adding a second dog if you want one for the right reasons.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Will crate training help or make separation anxiety worse?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                When done correctly, crate training helps by providing a safe den. Many dogs feel more secure in crates than loose in house. However, forcing a dog with existing severe separation anxiety into a crate can worsen panic and cause injury from escape attempts. Introduce crate gradually and positively first. If your dog shows extreme distress in crate (drooling, breaking teeth, self-harm), they need freedom with baby gates/safe room instead. Work with behaviourist to determine best setup for your dog.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My dog is fine when I'm home but panics when alone. How do I fix this?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                This is classic separation anxiety. The solution is gradual desensitisation starting from zero. Follow the 8-week protocol outlined above. Key points: (1) Never leave dog alone longer than they can handle without stress, (2) Build duration gradually—seconds to minutes to hours over weeks/months, (3) Make departures boring, returns calm, (4) Provide high-value enrichment only during alone time, (5) Exercise before departures. If severe, consult veterinary behaviourist about medication-assisted training. Expect 2-6 months of consistent work for lasting improvement.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need personalised help training your dog to stay home alone?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Find certified behaviourists →
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
            "headline": "Teaching Your Dog to Stay Home Alone: Prevent Separation Anxiety",
            "description": "Step-by-step guide to teaching dogs independence and preventing separation anxiety. Gradual training methods, crate training tips, and solutions to destructive behaviours.",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-training/dog-home-alone"
            }
          })
        }}
      />
    </div>
  );
}

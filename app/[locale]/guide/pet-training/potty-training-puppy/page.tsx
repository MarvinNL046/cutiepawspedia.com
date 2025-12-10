/**
 * SEO Landing Page: How to Potty Train Your Puppy
 * Pillar: Pet Training
 * Target: English-speaking pet owners struggling with housebreaking
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Clock, CheckCircle, AlertTriangle, Calendar, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Potty Train Your Puppy: Complete Housebreaking Guide 2025",
  description: "Master puppy potty training with our proven step-by-step guide. Learn schedules, crate training, accident cleanup, and solutions to common problems for fast results.",
  keywords: [
    "potty training puppy",
    "how to potty train a puppy",
    "housebreaking puppy",
    "puppy toilet training",
    "house train puppy fast",
    "puppy potty schedule",
    "stop puppy accidents",
    "puppy pee training"
  ],
  alternates: {
    canonical: "https://cutiepawspedia.com/en/guide/pet-training/potty-training-puppy",
    languages: {
      "nl": "https://cutiepawspedia.com/nl/gids/hondentraining/zindelijkheidstraining-puppy",
      "en": "https://cutiepawspedia.com/en/guide/pet-training/potty-training-puppy"
    }
  },
  openGraph: {
    title: "How to Potty Train Your Puppy: Complete Housebreaking Guide",
    description: "Proven potty training methods with schedules, crate training tips, and solutions to common accidents.",
    type: "article",
    url: "https://cutiepawspedia.com/en/guide/pet-training/potty-training-puppy"
  },
};

export default function PottyTrainingPuppy() {
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
            How to Potty Train Your Puppy: Complete Housebreaking Guide
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Potty training is one of the most important—and sometimes frustrating—aspects of raising a puppy. This comprehensive guide provides proven methods, realistic schedules, and expert solutions to help you successfully housebreak your puppy.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🏠 Need professional help with puppy training?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=training">
                Find puppy training experts near you →
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
            Most puppies can be fully housetrained by 4-6 months old, but it requires consistency, patience, and understanding of your puppy's natural behaviour. Accidents will happen—it's part of the learning process. The key is establishing a routine your puppy can rely on.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This guide covers everything from understanding when puppies can hold their bladder, creating an effective potty schedule, using crate training correctly, dealing with accidents, and troubleshooting common problems.
          </p>
        </section>

        {/* Understanding Puppy Bladder Control */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Clock className="h-7 w-7 text-cpCoral" />
            Understanding Puppy Bladder Control
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border border-cpAmber/30 dark:border-cpAmber/20 rounded-2xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-semibold mb-3">
              The "Month Plus One" Rule
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              A puppy can typically hold their bladder for one hour per month of age, plus one. For example:
            </p>
            <div className="bg-white dark:bg-cpCharcoal/50 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span><strong>2 months old:</strong> 3 hours maximum (2+1)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span><strong>3 months old:</strong> 4 hours maximum (3+1)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span><strong>4 months old:</strong> 5 hours maximum (4+1)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span><strong>6 months old:</strong> 7-8 hours (approaching adult capacity)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Important:</strong> This is a guideline, not a rule. Smaller breeds may need more frequent breaks. Never leave a young puppy alone longer than they can physically hold it—this sets them up for failure and slows training progress.
            </p>
          </div>
        </section>

        {/* The Perfect Potty Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-cpAmber" />
            The Perfect Potty Training Schedule
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Consistency is everything. Take your puppy out at these critical times:
          </p>

          <div className="space-y-6">
            {/* Critical Potty Times */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Critical Potty Times (Never Skip These!):</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream">First thing in the morning</p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">Immediately after waking up, every day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream">After every meal</p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">Within 5-30 minutes of eating</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream">After every nap</p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">Puppies always need to go after sleeping</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream">After playtime or excitement</p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">Active play stimulates the bladder</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream">After drinking water</p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">Especially important after large drinks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream">Right before bedtime</p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">Last chance before overnight crating</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground dark:text-cpCream">Every 1-2 hours when awake</p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/70">For puppies under 3 months old</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Daily Schedule */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Sample Schedule (8-12 Week Old Puppy):</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-4 p-2 bg-cpAmber/5 dark:bg-cpAmber/5 rounded">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">6:00 AM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70">Wake up → <strong>Outside immediately</strong></span>
                </div>
                <div className="flex gap-4 p-2">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">6:15 AM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70">Breakfast → <strong>Outside 15 mins after eating</strong></span>
                </div>
                <div className="flex gap-4 p-2 bg-cpAmber/5 dark:bg-cpAmber/5 rounded">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">8:00 AM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70"><strong>Outside</strong> (preventive)</span>
                </div>
                <div className="flex gap-4 p-2">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">9:30 AM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70">After nap → <strong>Outside</strong></span>
                </div>
                <div className="flex gap-4 p-2 bg-cpAmber/5 dark:bg-cpAmber/5 rounded">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">11:00 AM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70"><strong>Outside</strong> (preventive)</span>
                </div>
                <div className="flex gap-4 p-2">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">12:00 PM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70">Lunch → <strong>Outside 15 mins after</strong></span>
                </div>
                <div className="flex gap-4 p-2 bg-cpAmber/5 dark:bg-cpAmber/5 rounded">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">2:00 PM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70">After nap → <strong>Outside</strong></span>
                </div>
                <div className="flex gap-4 p-2">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">4:00 PM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70"><strong>Outside</strong> (preventive)</span>
                </div>
                <div className="flex gap-4 p-2 bg-cpAmber/5 dark:bg-cpAmber/5 rounded">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">5:30 PM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70">Dinner → <strong>Outside 15 mins after</strong></span>
                </div>
                <div className="flex gap-4 p-2">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">7:00 PM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70">After play → <strong>Outside</strong></span>
                </div>
                <div className="flex gap-4 p-2 bg-cpAmber/5 dark:bg-cpAmber/5 rounded">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">9:00 PM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70"><strong>Outside</strong> (preventive)</span>
                </div>
                <div className="flex gap-4 p-2">
                  <span className="flex-shrink-0 w-20 font-semibold text-cpCoral">10:30 PM</span>
                  <span className="text-muted-foreground dark:text-cpCream/70">Final potty break → <strong>Outside</strong> → Bedtime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Struggling with Potty Training Accidents?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Professional trainers can identify the root cause and create a customised training plan for your puppy's specific needs.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Find expert puppy trainers →
              </Link>
            </Button>
          </div>
        </section>

        {/* Step-by-Step Training Method */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Target className="h-7 w-7 text-cpCoral" />
            Step-by-Step Potty Training Method
          </h2>

          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Choose a Designated Potty Spot</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Always take your puppy to the same spot in your garden. The scent will cue them that this is the right place to go.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Pro tip:</strong> Use a specific phrase like "Go potty" or "Do your business" every time. Your puppy will eventually associate the phrase with the action.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Take Puppy Outside on Lead</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Use a lead to prevent them from wandering and getting distracted. Go directly to the potty spot.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Important:</strong> This is not playtime. Keep interactions boring until they've done their business.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Wait Patiently (5-10 Minutes)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Stand still and wait. Don't interact too much. Let them sniff around and find the right spot.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>If nothing happens:</strong> Take them back inside, watch closely, and try again in 10-15 minutes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Praise Immediately and Enthusiastically</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    The moment they finish, give massive praise and a high-value treat. Make it a party!
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Timing is crucial:</strong> Reward within 2-3 seconds of them finishing, not when you go back inside. They need to connect the reward with the action.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">5</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Supervise Closely Indoors</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Between potty breaks, keep your puppy where you can see them at all times. Use baby gates or keep them in the same room.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Watch for signals:</strong> Sniffing the floor, circling, whining, walking to the door. React immediately—don't wait!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Crate Training for Potty Training */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Using Crate Training to Speed Up Potty Training
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Crate training is one of the most effective tools for housebreaking because dogs naturally avoid soiling their sleeping area.
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Crate Training Basics:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Right size:</strong> Crate should be just large enough for puppy to stand, turn around, and lie down. Too large and they'll use one end as a toilet.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Make it positive:</strong> Feed meals in crate, give special treats/toys only in crate, never use as punishment.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Overnight success:</strong> Most puppies won't soil their crate at night, making overnight training easier than daytime.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>When you can't supervise:</strong> Crate your puppy for short periods (1-2 hours max for young puppies) when you're busy.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                <span><strong>Always potty first:</strong> Take puppy outside immediately before crating and immediately after releasing from crate.</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground dark:text-cpCream">
                <strong>Warning:</strong> Never leave a puppy crated longer than they can hold their bladder. This forces them to soil their crate and undermines the training process.
              </p>
            </div>
          </div>
        </section>

        {/* Dealing with Accidents */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-cpAmber" />
            How to Handle Accidents (Without Ruining Progress)
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 text-green-600 dark:text-green-400">✓ DO This When Accidents Happen:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span><strong>If you catch them in the act:</strong> Interrupt calmly with "Oops!" or "Outside!", carry them to potty spot, praise if they finish there</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span><strong>Clean thoroughly:</strong> Use enzymatic cleaner (not ammonia-based) to eliminate odours completely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span><strong>Reflect on your routine:</strong> Were you not watching closely enough? Did you miss a scheduled potty break?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span><strong>Increase supervision:</strong> More accidents = need for closer monitoring and more frequent potty breaks</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 text-red-600 dark:text-red-400">✗ DON'T Do These Things:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Punish after the fact:</strong> If you didn't catch them in the act (within 2 seconds), they won't understand what they're being punished for</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Rub their nose in it:</strong> This outdated method is cruel and ineffective, only teaches fear</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Yell or hit:</strong> Creates fear and anxiety, makes puppy scared to potty in front of you (leading to hidden accidents)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Give up on schedule:</strong> Inconsistency will only prolong the training process</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Troubleshooting Common Problems */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Troubleshooting Common Potty Training Problems
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My puppy keeps having accidents in the same spot
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70 space-y-2">
                <p>This indicates incomplete odour removal. Dogs return to spots they can smell.</p>
                <p><strong>Solution:</strong> Use enzymatic cleaner specifically designed for pet urine (Nature's Miracle, Rocco & Roxie). Regular household cleaners don't eliminate the scent. Block access to that area for 1-2 weeks whilst retraining. Consider using a blacklight to find all affected areas.</p>
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Puppy won't go outside but has accidents indoors
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70 space-y-2">
                <p>They may be distracted, scared, or haven't learned that outside is the right place yet.</p>
                <p><strong>Solution:</strong> Stay outside longer (15-20 minutes). Bring a familiar toy or treat. Choose a quiet spot away from scary noises/activity. Try different times of day. Some puppies prefer going before or after walks, not during. Reward heavily when they do go outside—make it the best thing ever!</p>
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Puppy was doing well but suddenly regressed
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70 space-y-2">
                <p>Regression can be caused by stress, illness, or giving too much freedom too soon.</p>
                <p><strong>Solution:</strong> Rule out medical issues first (UTI, parasites). Review what changed recently—new person, schedule change, moving house? Go back to basics: more frequent potty breaks, closer supervision, smaller freedom zones. Don't give up—regressions are normal, especially around 4-6 months during adolescence.</p>
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Puppy pees when greeting people or when excited
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70 space-y-2">
                <p>This is submissive/excitement urination, not a training issue. It's involuntary and puppies usually outgrow it.</p>
                <p><strong>Solution:</strong> Don't punish—it will make it worse. Keep greetings calm and low-key. Crouch down rather than looming over puppy. Let visitors ignore puppy for first 5 minutes. Take puppy outside immediately before guests arrive. Most puppies outgrow this by 6-12 months as they gain bladder control and confidence.</p>
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
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete guide to training fundamentals →</p>
            </Link>
            <Link href="/en/guide/pet-training/dog-behaviour-problems" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Dog Behaviour Problems</h3>
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
                How long does it take to potty train a puppy?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Most puppies are reliably housetrained by 4-6 months old with consistent training. However, every puppy is different. Smaller breeds often take longer due to smaller bladders. Some puppies "get it" within a few weeks, whilst others need several months. The key factors are consistency, patience, and your puppy's age/breed. Don't expect perfection before 6 months—occasional accidents are normal.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I use puppy pads or go straight to outdoor training?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                This depends on your situation. Outdoor training from the start is fastest and clearest for your puppy. Use puppy pads only if: (1) You live in a high-rise flat with limited outdoor access, (2) Your puppy isn't fully vaccinated and you don't have a private garden, (3) You physically cannot take puppy out frequently. If using pads, gradually move them closer to the door, then outside. Be aware this adds an extra training step—teaching puppy that indoors is now wrong.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What's the best enzymatic cleaner for puppy accidents?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Top-rated enzymatic cleaners include Nature's Miracle, Rocco & Roxie Professional Strength, Simple Solution, and Puracy. The key is using a true enzymatic cleaner, not just a regular floor cleaner with fragrance. Enzymatic cleaners break down urine proteins and eliminate odour at the molecular level. Avoid ammonia-based cleaners—they smell like urine to dogs and attract them back to the same spot. Always saturate the area thoroughly and let it air dry.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I potty train a puppy whilst working full-time?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                It's challenging but possible with the right setup. Options include: (1) Hiring a dog walker/sitter for midday breaks, (2) Coming home during lunch, (3) Using a puppy playpen with puppy pads for when you're gone (transition to outdoor-only gradually), (4) Doggy daycare, (5) Taking time off during initial training weeks. Young puppies cannot hold it for 8+ hours, so you must arrange midday relief. Expect slower progress than someone home all day, but it's definitely achievable.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need personalised guidance for your puppy's potty training challenges?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Connect with certified trainers →
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
            "headline": "How to Potty Train Your Puppy: Complete Housebreaking Guide",
            "description": "Master puppy potty training with our proven step-by-step guide. Learn schedules, crate training, accident cleanup, and solutions to common problems for fast results.",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-training/potty-training-puppy"
            }
          })
        }}
      />
    </div>
  );
}

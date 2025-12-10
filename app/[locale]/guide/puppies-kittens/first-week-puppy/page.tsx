import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Your Puppy's First Week at Home | Day-by-Day Guide 2024",
  description: "Comprehensive day-by-day guide for your puppy's first week. Learn about feeding schedules, house-training, sleep routines, and essential care tips.",
  keywords: "puppy first week, new puppy care, puppy schedule, house-training puppy, puppy routine",
  alternates: {
    languages: {
      "nl": "/nl/gids/puppies-kittens/eerste-week-puppy",
      "en": "/en/guide/puppies-kittens/first-week-puppy",
    },
  },
  openGraph: {
    title: "Your Puppy's First Week at Home | Complete Day-by-Day Guide",
    description: "Everything you need to know for a successful first week with your new puppy. Feeding, training, and settling-in tips.",
  },
};

export default function FirstWeekPuppyPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpCoral/10 via-cpAmber/10 to-cpAqua/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 border border-cpCoral/30 text-cpCoral text-sm font-medium mb-6">
              <span>🐕</span>
              Day-by-Day Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Your Puppy's First Week at Home
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              The first week with your new puppy is exciting and challenging. This comprehensive day-by-day guide helps you navigate feeding, house-training, sleep schedules, and bonding during these crucial first days.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpCoral/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Need professional puppy training advice?
              </p>
              <Button
                asChild
                className="bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/en/search?category=training">Find dog trainers near you →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Your Puppy's First Week at Home | Day-by-Day Guide",
              description: "Complete day-by-day guide for your puppy's first week, covering feeding, house-training, and settling in.",
              author: {
                "@type": "Organization",
                name: "CutiePawsPedia",
              },
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString(),
            }),
          }}
        />

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-cpAmber/10 border-l-4 border-cpAmber rounded-r-xl p-6 mb-12">
            <p className="text-lg text-foreground dark:text-cpCream m-0">
              Congratulations on your new puppy! The first week is crucial for establishing routines, building trust, and setting the foundation for good behaviour. This guide walks you through each day with practical tips and realistic expectations.
            </p>
          </div>

          {/* Before bringing puppy home */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Before Bringing Your Puppy Home
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Preparation makes the transition smoother for everyone:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Puppy-proof your home</strong> - Remove hazards, secure cables, and store toxic substances safely</li>
              <li><strong>Set up a safe space</strong> - Designated area with bed, water, and toys where puppy feels secure</li>
              <li><strong>Stock essentials</strong> - Food, bowls, collar, lead, toys, cleaning supplies for accidents</li>
              <li><strong>Choose a vet</strong> - Register with a local veterinarian before arrival</li>
              <li><strong>Plan time off</strong> - Try to be home for at least the first few days</li>
            </ul>
          </section>

          {/* Day 1 */}
          <section className="mb-12">
            <div className="bg-cpCoral/10 rounded-xl p-6 border border-cpCoral/30 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
                Day 1: Arrival Day
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-0">
                <strong>Focus:</strong> Gentle introduction, establishing basics, keeping calm
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              What to Expect:
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Your puppy may be overwhelmed, confused, or even distressed. This is completely normal - they've just left everything familiar. Some puppies are confident and curious; others are timid and scared.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Your Action Plan:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Quiet introduction</strong> - Keep arrival calm; limit visitors and loud noises</li>
              <li><strong>Show the toileting area</strong> - Take puppy outside immediately upon arrival</li>
              <li><strong>Introduce safe space</strong> - Show them their bed, crate, or designated area</li>
              <li><strong>First meal</strong> - Feed same food as breeder at usual time; small portions to avoid upset stomach</li>
              <li><strong>Gentle exploration</strong> - Allow puppy to explore one or two rooms under supervision</li>
              <li><strong>Establish toilet routine</strong> - Take outside every 1-2 hours, after meals, and after naps</li>
              <li><strong>First night preparation</strong> - Set up sleeping area; expect whimpering (more on this below)</li>
            </ul>

            <div className="bg-cpAqua/10 rounded-xl p-6 border border-cpAqua/30">
              <p className="font-semibold text-cpAqua mb-2">💡 Day 1 Tip:</p>
              <p className="text-sm text-foreground dark:text-cpCream/80 m-0">
                Resist the urge to overcompensate with excessive play or treats. Your puppy needs time to adjust. Keep things low-key and predictable.
              </p>
            </div>
          </section>

          {/* Days 2-3 */}
          <section className="mb-12">
            <div className="bg-cpAmber/10 rounded-xl p-6 border border-cpAmber/30 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
                Days 2-3: Establishing Routine
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-0">
                <strong>Focus:</strong> Consistent schedule, house-training, positive associations
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              What to Expect:
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Puppy begins to settle slightly but may still be anxious. House-training accidents are normal. Sleep patterns might be irregular. Appetite should improve if it was low on Day 1.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Recommended Daily Schedule:
            </h3>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-6">
              <ul className="space-y-3 text-muted-foreground dark:text-cpCream/80">
                <li><strong>7:00 AM</strong> - Wake up, toilet break, breakfast</li>
                <li><strong>7:30 AM</strong> - Toilet break, short play session (10-15 mins)</li>
                <li><strong>8:00 AM</strong> - Nap time in crate or bed</li>
                <li><strong>10:00 AM</strong> - Toilet break, training session (5-10 mins)</li>
                <li><strong>12:00 PM</strong> - Toilet break, lunch, play</li>
                <li><strong>1:00 PM</strong> - Nap time</li>
                <li><strong>3:00 PM</strong> - Toilet break, playtime, exploration</li>
                <li><strong>5:00 PM</strong> - Toilet break, dinner</li>
                <li><strong>6:00 PM</strong> - Short walk (if vaccinations allow), training</li>
                <li><strong>8:00 PM</strong> - Calm playtime, last toilet break</li>
                <li><strong>10:00 PM</strong> - Bedtime in crate/bed</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic mb-6">
              * Adjust times to suit your lifestyle but maintain consistency. Puppies need 15-20 hours of sleep per day.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Your Action Plan:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li><strong>Consistent toilet routine</strong> - Take outside every 2 hours and immediately after eating/sleeping</li>
              <li><strong>Reward good behaviour</strong> - Praise and treats for toileting outside</li>
              <li><strong>Short training sessions</strong> - Start with name recognition and "sit" (5-10 minutes, 2-3 times daily)</li>
              <li><strong>Supervised exploration</strong> - Gradually introduce more rooms</li>
              <li><strong>Crate training begins</strong> - Feed meals in crate, make it a positive space</li>
            </ul>
          </section>

          {/* Days 4-5 */}
          <section className="mb-12">
            <div className="bg-cpCoral/10 rounded-xl p-6 border border-cpCoral/30 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
                Days 4-5: Building Confidence
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-0">
                <strong>Focus:</strong> Socialisation begins, continued routine, bonding activities
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              What to Expect:
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Puppy is more comfortable and showing personality. May test boundaries. Energy levels increase. Better understanding of toilet routine (though accidents still happen).
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Your Action Plan:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li><strong>Introduce new experiences</strong> - Different surfaces, gentle sounds, household items</li>
              <li><strong>Positive visitors</strong> - Allow calm, dog-savvy friends to meet puppy (ensure they're gentle)</li>
              <li><strong>Handling exercises</strong> - Gently touch paws, ears, mouth to prepare for vet visits and grooming</li>
              <li><strong>Name game</strong> - Practice calling puppy's name with rewards</li>
              <li><strong>Alone time practice</strong> - Short periods (5-10 mins) in crate whilst you're in another room</li>
            </ul>
          </section>

          {/* Days 6-7 */}
          <section className="mb-12">
            <div className="bg-cpAqua/10 rounded-xl p-6 border border-cpAqua/30 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
                Days 6-7: Week One Complete
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-0">
                <strong>Focus:</strong> Reviewing progress, planning ahead, celebrating successes
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              What to Expect:
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Puppy has settled into routine. Shows enthusiasm at meal times. Recognises you as caregiver. Still learning bladder control but improving. Sleeps better at night.
            </p>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Your Action Plan:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>First vet check-up</strong> - Schedule for week 1 or 2 if not yet done</li>
              <li><strong>Review routine</strong> - What's working? What needs adjusting?</li>
              <li><strong>Training progression</strong> - Add "come" and "down" commands if puppy has mastered "sit"</li>
              <li><strong>Socialization planning</strong> - Research puppy classes (start after vaccinations complete)</li>
              <li><strong>Gradual alone time</strong> - Increase to 15-20 minutes if puppy is coping well</li>
            </ul>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpAmber/20 to-cpAqua/20 rounded-2xl shadow-md p-8 border border-cpAmber/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Ready for puppy classes?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Professional training helps establish good habits early. Find accredited trainers near you.
              </p>
              <Button
                asChild
                className="bg-cpAmber text-cpCharcoal rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/en/search?category=training">Find puppy classes →</Link>
              </Button>
            </div>
          </div>

          {/* Common challenges */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Common First Week Challenges
            </h2>

            <div className="space-y-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpCoral mb-3">😢 Crying at Night</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Why:</strong> Puppy misses littermates and mother, feels alone and scared.
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Solution:</strong> Place crate near your bed initially. Use a ticking clock and warm blanket to mimic littermates. Resist the urge to take puppy into your bed (sets precedent). Gradually move crate to final location over 2-3 weeks.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpCoral mb-3">💧 House-Training Accidents</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Why:</strong> Puppies can't hold bladder/bowels long. Need frequent toilet breaks.
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Solution:</strong> Take outside every 1-2 hours, after meals, after sleep, and after play. Praise immediately when they toilet outside. Clean accidents with enzyme cleaner (not ammonia-based). Never punish - it creates fear.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpCoral mb-3">😰 Separation Anxiety</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Why:</strong> Puppy becomes overly attached and panics when you leave.
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Solution:</strong> Start with very short absences (2-5 minutes). Don't make arrivals/departures dramatic. Leave puppy with engaging toy (Kong with treats). Gradually increase duration. Consider professional help if severe.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpCoral mb-3">🦷 Excessive Biting/Mouthing</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Why:</strong> Normal puppy behaviour; exploring world with mouth, teething discomfort.
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>Solution:</strong> Redirect to appropriate chew toys. Yelp "ouch!" and withdraw attention when biting occurs. Provide frozen carrots or special teething toys. Never use hands as toys.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  How long before my puppy sleeps through the night?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Most puppies can sleep through the night (6-8 hours) by 12-16 weeks old. Very young puppies (8-10 weeks) may need a midnight toilet break. Avoid giving water 2 hours before bed and ensure a final toilet break just before sleep.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  When can I take my puppy for walks?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Wait until one week after your puppy's final vaccination (usually around 16 weeks). Before this, carry them to different locations to experience sights and sounds, but don't let them walk on ground where other dogs have been. This protects against diseases like parvovirus.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Is it normal for my puppy to be very sleepy?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Yes! Puppies need 15-20 hours of sleep per day. They typically have short bursts of energy followed by long naps. However, if your puppy is lethargic, won't eat, or seems unwell, contact your vet immediately.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  How often should I feed my puppy?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  8-12 weeks: 4 meals per day. 3-6 months: 3 meals per day. 6+ months: 2 meals per day. Always feed puppy-specific food with appropriate portion sizes based on breed and weight. Stick to regular times to aid house-training.
                </div>
              </details>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/en/guide/puppies-kittens/buying-puppy-tips"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  Tips for buying a puppy →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Everything you need to know before bringing your puppy home.
                </p>
              </Link>
              <Link
                href="/en/guide/puppies-kittens/puppy-proofing-home"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  Puppy-proofing your home →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Make your home safe for a curious, energetic puppy.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 rounded-2xl shadow-md p-8 border border-cpAqua/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Need expert puppy care advice?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Find veterinarians, trainers, and puppy care specialists near you.
            </p>
            <Button
              asChild
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
            >
              <Link href="/en/search">Discover pet services →</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

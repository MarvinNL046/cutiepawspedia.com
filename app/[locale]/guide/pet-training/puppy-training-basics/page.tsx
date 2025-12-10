/**
 * SEO Landing Page: Puppy Training Basics
 * Pillar: Pet Training
 * Target: English-speaking pet owners seeking comprehensive puppy training guidance
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Heart, CheckCircle, Star, AlertCircle, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Puppy Training Basics: Complete Guide to Raising a Well-Behaved Dog",
  description: "Master puppy training with our complete guide: socialisation, basic commands, crate training, and common mistakes. Start your puppy's journey right from day one.",
  keywords: [
    "puppy training basics",
    "how to train a puppy",
    "puppy training tips",
    "basic puppy commands",
    "puppy socialisation",
    "new puppy training",
    "puppy obedience training",
    "puppy training schedule"
  ],
  alternates: {
    canonical: "https://cutiepawspedia.com/en/guide/pet-training/puppy-training-basics",
    languages: {
      "nl": "https://cutiepawspedia.com/nl/gids/hondentraining/puppytraining-basis",
      "en": "https://cutiepawspedia.com/en/guide/pet-training/puppy-training-basics"
    }
  },
  openGraph: {
    title: "Puppy Training Basics: Complete Guide to Raising a Well-Behaved Dog",
    description: "Master puppy training with our complete guide covering socialisation, basic commands, and essential training techniques.",
    type: "article",
    url: "https://cutiepawspedia.com/en/guide/pet-training/puppy-training-basics"
  },
};

export default function PuppyTrainingBasics() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Pet Training</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Puppy Training Basics: Complete Guide to Raising a Well-Behaved Dog
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Bringing home a new puppy is exciting, but proper training from day one is essential for a happy, well-adjusted companion. Learn the fundamentals of puppy training and set your furry friend up for lifelong success.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🐾 Need professional help with puppy training?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=training">
                Find certified dog trainers near you →
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
            The first few months of your puppy's life are critical for their development. Proper training during this time establishes the foundation for good behaviour, prevents future problems, and strengthens the bond between you and your dog.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This comprehensive guide covers everything you need to know about puppy training, from when to start, essential commands, socialisation techniques, and common mistakes to avoid. Whether you've just brought home your first puppy or you're a seasoned owner, these evidence-based training methods will help you raise a confident, well-mannered companion.
          </p>
        </section>

        {/* When to Start */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Clock className="h-7 w-7 text-cpCoral" />
            When to Start Puppy Training
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border border-cpAmber/30 dark:border-cpAmber/20 rounded-2xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-semibold mb-3">
              The Critical Socialisation Period: 3-14 Weeks
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              Puppies are most receptive to learning and new experiences during this window. Start training as soon as you bring your puppy home (typically 8 weeks old).
            </p>
            <div className="bg-white dark:bg-cpCharcoal/50 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>8-10 weeks:</strong> Basic name recognition, simple commands, gentle handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>10-12 weeks:</strong> Socialisation with people, dogs, and environments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>12-16 weeks:</strong> More complex commands, leash training, impulse control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span><strong>16+ weeks:</strong> Advanced training, distraction work, real-world practice</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Remember:</strong> It's never too late to start training, but early training prevents bad habits from forming and makes learning easier for both you and your puppy.
            </p>
          </div>
        </section>

        {/* 5 Essential Commands */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Star className="h-7 w-7 text-cpAmber" />
            5 Essential Commands Every Puppy Should Learn
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            These foundational commands form the basis of all future training and are essential for your puppy's safety and your peace of mind.
          </p>

          <div className="space-y-6">
            {/* Command 1: Name Recognition */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Name Recognition</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Before any command training, your puppy needs to learn their name and associate it with good things.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream mb-2"><strong>How to teach it:</strong></p>
                    <ul className="space-y-1 text-xs text-muted-foreground dark:text-cpCream/70">
                      <li>• Say your puppy's name in a happy, upbeat tone</li>
                      <li>• When they look at you, immediately give praise and a treat</li>
                      <li>• Practice 10-15 times per day in short sessions</li>
                      <li>• Gradually add distractions as they improve</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Command 2: Sit */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Sit</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    The most fundamental command, "sit" helps with impulse control and polite behaviour.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream mb-2"><strong>Training steps:</strong></p>
                    <ul className="space-y-1 text-xs text-muted-foreground dark:text-cpCream/70">
                      <li>• Hold a treat close to your puppy's nose</li>
                      <li>• Move your hand up, allowing their head to follow and bottom to lower</li>
                      <li>• Once in sitting position, say "Sit", give the treat and praise</li>
                      <li>• Repeat 5-10 times, then practice without treat lure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Command 3: Come/Recall */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Come (Recall)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    A reliable recall can save your dog's life. Start teaching this from day one.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream mb-2"><strong>Training method:</strong></p>
                    <ul className="space-y-1 text-xs text-muted-foreground dark:text-cpCream/70">
                      <li>• Start indoors with no distractions</li>
                      <li>• Say "Come!" in an excited, happy voice and run backward</li>
                      <li>• Reward heavily when they reach you (treats + praise)</li>
                      <li>• Never punish your puppy when they come to you</li>
                      <li>• Gradually practice in more distracting environments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Command 4: Stay */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Stay</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Teaches impulse control and patience, essential for safety and good manners.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream mb-2"><strong>Progressive training:</strong></p>
                    <ul className="space-y-1 text-xs text-muted-foreground dark:text-cpCream/70">
                      <li>• Ask your puppy to "Sit"</li>
                      <li>• Put your hand up (stop signal) and say "Stay"</li>
                      <li>• Wait 2-3 seconds, then reward</li>
                      <li>• Gradually increase duration and distance</li>
                      <li>• Release with a consistent word like "Okay" or "Free"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Command 5: Leave It */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold text-lg">5</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Leave It</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Prevents your puppy from picking up dangerous items or chasing things they shouldn't.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream mb-2"><strong>Step-by-step:</strong></p>
                    <ul className="space-y-1 text-xs text-muted-foreground dark:text-cpCream/70">
                      <li>• Place a treat in your closed fist</li>
                      <li>• When puppy sniffs/licks, say "Leave it"</li>
                      <li>• Wait until they pull away, then reward from other hand</li>
                      <li>• Progress to treats on the floor, then toys/food</li>
                      <li>• Practice in real-life scenarios (dropped food, etc.)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Struggling with Puppy Training?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Professional trainers can help accelerate your puppy's learning and address specific challenges. Find certified experts in your area.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Browse dog trainers and classes →
              </Link>
            </Button>
          </div>
        </section>

        {/* Socialisation */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            Puppy Socialisation: Why It's Critical
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Proper socialisation during the critical period (3-14 weeks) prevents fearfulness, aggression, and anxiety later in life. Expose your puppy to diverse experiences in a positive, controlled manner.
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Socialisation Checklist:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-cpCoral mb-2">People & Animals:</p>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Different ages (children, adults, elderly)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Various appearances (hats, uniforms, beards)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Friendly dogs (vaccinated, well-behaved)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Other animals (cats, horses, livestock)</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-cpCoral mb-2">Environments & Experiences:</p>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Different surfaces (grass, concrete, gravel, metal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Various sounds (traffic, appliances, thunder)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Car rides, vet visits, grooming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                    <span>Busy places (parks, cafés, shops)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Safety first:</strong> Until fully vaccinated, avoid areas where unknown dogs frequent. Carry your puppy or use controlled puppy classes. Consult your vet about safe socialisation practices.
            </p>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertCircle className="h-7 w-7 text-cpAmber" />
            7 Common Puppy Training Mistakes to Avoid
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">1. Inconsistent Rules</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                All family members must enforce the same rules. If one person allows jumping while another doesn't, your puppy will be confused and training will fail.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">2. Using Punishment Instead of Positive Reinforcement</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Yelling, hitting, or rubbing noses in accidents damages trust and causes fear. Focus on rewarding good behaviour instead of punishing bad behaviour.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">3. Training Sessions That Are Too Long</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Puppies have short attention spans. Keep training sessions to 5-10 minutes, multiple times per day. End on a positive note before they lose focus.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">4. Skipping Socialisation Due to Vaccination Concerns</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                The critical socialisation window closes at 14 weeks, often before vaccinations are complete. Use safe methods like puppy classes, carrying your puppy, or meeting vaccinated dogs.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">5. Repeating Commands</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Say "Sit" once, wait 2-3 seconds, then help your puppy into position if needed. Repeating commands teaches them to ignore you until you've said it multiple times.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">6. Moving Too Fast</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Master each command in a distraction-free environment before adding challenges. Training in small, successful steps prevents frustration for both of you.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">7. Not Making Training Fun</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Training should be enjoyable for your puppy. Use enthusiasm, play, and high-value treats. If it feels like a chore, your puppy will disengage.
              </p>
            </div>
          </div>
        </section>

        {/* Training Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-cpCoral" />
            Sample Daily Training Schedule (8-12 Weeks)
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-cpCoral">7:00 AM</div>
                <div className="flex-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <strong>Morning routine:</strong> Potty break, breakfast, 5-min training (name recognition, sit)
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-cpCoral">9:00 AM</div>
                <div className="flex-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <strong>Play & socialisation:</strong> Gentle play, handle paws/ears, introduce new sounds/objects
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-cpCoral">11:00 AM</div>
                <div className="flex-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <strong>Training session:</strong> 5-min recall practice, crate training
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-cpCoral">1:00 PM</div>
                <div className="flex-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <strong>Midday:</strong> Lunch, potty break, nap time
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-cpCoral">3:00 PM</div>
                <div className="flex-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <strong>Afternoon training:</strong> 5-min leash practice, "leave it" exercises
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-cpCoral">5:00 PM</div>
                <div className="flex-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <strong>Evening:</strong> Dinner, potty, 5-min "stay" practice, calm activities before bed
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-cpCoral">10:00 PM</div>
                <div className="flex-1 text-sm text-muted-foreground dark:text-cpCream/70">
                  <strong>Bedtime:</strong> Final potty break, settle in crate/bed, quiet time
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Training Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/pet-training/potty-training-puppy" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">How to Potty Train Your Puppy</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete housebreaking guide with schedules →</p>
            </Link>
            <Link href="/en/guide/pet-training/clicker-training" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Clicker Training for Dogs</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Step-by-step clicker training methods →</p>
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
                At what age should I start training my puppy?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Start training as soon as you bring your puppy home, typically around 8 weeks old. The critical socialisation period is 3-14 weeks, so early training during this window has the greatest impact on your dog's lifelong behaviour. Basic commands, name recognition, and gentle handling can begin immediately.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How long should puppy training sessions be?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Keep training sessions short and sweet: 5-10 minutes for young puppies (8-12 weeks), gradually increasing to 15-20 minutes as they mature. Multiple short sessions throughout the day are more effective than one long session. Always end on a positive note before your puppy loses focus or becomes frustrated.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I use treats for training?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes! Treats are highly effective training tools, especially for puppies. Use small, soft, high-value treats that your puppy loves. Once a behaviour is learned, gradually reduce treat frequency by rewarding intermittently, but always maintain verbal praise and affection. Adjust meal portions to account for training treats to prevent overfeeding.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My puppy won't focus during training. What should I do?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                If your puppy is distracted, try these strategies: (1) Train in a quiet, distraction-free environment initially, (2) Use higher-value treats to increase motivation, (3) Keep sessions shorter (3-5 minutes), (4) Train when puppy is slightly hungry, not overfed, (5) Make training more playful and energetic, (6) Ensure your puppy has had adequate exercise before training. If problems persist, consult a professional trainer.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Looking for professional puppy training classes or one-on-one coaching?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en/search?category=training">
                Explore dog training services →
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
            "headline": "Puppy Training Basics: Complete Guide to Raising a Well-Behaved Dog",
            "description": "Master puppy training with our complete guide: socialisation, basic commands, crate training, and common mistakes. Start your puppy's journey right from day one.",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-training/puppy-training-basics"
            }
          })
        }}
      />
    </div>
  );
}

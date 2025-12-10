/**
 * SEO Landing Page: Saying Goodbye to Your Pet
 * Pillar: Senior Pets (Senior-pets)
 * Target: English-speaking pet owners facing end-of-life decisions
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, CloudRain, Star, Scale, Home, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Saying Goodbye to Your Pet: End of Life Guide 2025",
  description: "Compassionate guide to pet euthanasia, end-of-life decisions and grief support. Making difficult choices with love and dignity for your beloved companion.",
  keywords: [
    "pet euthanasia",
    "saying goodbye to pet",
    "when to put dog down",
    "when to put cat down",
    "pet end of life",
    "pet quality of life",
    "pet grief support",
    "losing a pet",
    "pet euthanasia at home"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/senior-pets/saying-goodbye-pet',
      'nl': '/nl/gids/senior-pets/afscheid-huisdier',
    },
  },
  openGraph: {
    title: "Saying Goodbye to Your Pet: End of Life Guide",
    description: "Compassionate guidance on pet euthanasia, quality of life assessment and coping with pet loss.",
    type: "article",
  },
};

export default function SayingGoodbyePet() {
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
            Saying Goodbye to Your Pet
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Making the decision to say goodbye to a beloved companion is one of the most difficult responsibilities of pet ownership. This guide offers compassionate support through quality of life assessment, end-of-life options and coping with grief.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              💙 Need compassionate end-of-life care for your pet?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/search?category=veterinary">
                Find Vets Offering End-of-Life Services →
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
            The bond between humans and their pets is profound. When facing the end of your pet's life, whether through terminal illness, old age or declining quality of life, the decision to let go can feel overwhelming. This guide aims to help you navigate this difficult time with compassion, clarity and love.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Remember: choosing euthanasia to prevent suffering is not giving up on your pet - it's a final act of love and the last gift you can give them.
          </p>
        </section>

        {/* Quality of Life Assessment */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Scale className="h-7 w-7 text-cpCoral" />
            Assessing Quality of Life
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            The HHHHHMM Quality of Life Scale helps objectively assess your pet's wellbeing. Score each category 0-10 (0=terrible, 10=excellent):
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <div className="space-y-4">
              <div className="border-l-4 border-cpCoral pl-4">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Hurt (Pain)</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Is pain well-controlled? Can they breathe comfortably? Are they showing signs of distress?</p>
              </div>
              <div className="border-l-4 border-cpAmber pl-4">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Hunger</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Is your pet eating enough? Do you need to hand-feed or force-feed? Are they interested in favourite foods?</p>
              </div>
              <div className="border-l-4 border-cpCoral pl-4">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Hydration</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Are they drinking adequate water? Is dehydration managed with subcutaneous fluids?</p>
              </div>
              <div className="border-l-4 border-cpAmber pl-4">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Hygiene</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Can they keep themselves clean? Are you managing incontinence? Are pressure sores developing?</p>
              </div>
              <div className="border-l-4 border-cpCoral pl-4">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Happiness</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Do they express joy? Respond to family? Show interest in anything? Wag tail/purr?</p>
              </div>
              <div className="border-l-4 border-cpAmber pl-4">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-1">Mobility</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Can they stand and walk without falling? Are mobility aids effective? Can they reach food/water/toilet?</p>
              </div>
              <div className="border-l-4 border-cpCoral pl-4">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-1">More Good Days than Bad</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Count good versus bad days this week. Are bad days becoming more frequent?</p>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
              <strong>Scoring Guide:</strong>
            </p>
            <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
              <li>• <strong>Score 35+:</strong> Acceptable quality of life</li>
              <li>• <strong>Score 20-35:</strong> Borderline - consider very carefully</li>
              <li>• <strong>Score below 20:</strong> Quality of life is poor - discuss euthanasia with your vet</li>
            </ul>
          </div>
        </section>

        {/* When to Consider Euthanasia */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            When to Consider Euthanasia
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            There's no perfect "right time" but these factors indicate quality of life has significantly declined:
          </p>

          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-300 dark:border-red-800/50 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Clear Indicators:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <li>• Chronic pain that can't be adequately controlled</li>
                <li>• Difficulty breathing despite treatment</li>
                <li>• Refusal to eat or drink for several days</li>
                <li>• Incontinence causing distress or skin problems</li>
                <li>• Inability to stand or walk</li>
                <li>• More bad days than good days</li>
                <li>• Loss of interest in everything they once enjoyed</li>
                <li>• Seizures that can't be controlled</li>
                <li>• Terminal diagnosis with suffering</li>
              </ul>
            </div>

            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5">
              <p className="text-sm text-foreground dark:text-cpCream mb-3">
                <strong>A useful guideline:</strong> Choose three to five things your pet loves most (walks, treats, greeting you, watching birds, playing). When they've lost interest in three or more, quality of life has significantly declined.
              </p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
                "Better a week too early than a day too late" - many vets and pet owners believe preventing suffering is more important than extending life at any cost.
              </p>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Need Guidance on End-of-Life Decisions?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Speak with a compassionate vet who can help you assess quality of life and discuss options.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/search?category=veterinary">
                Find Compassionate Vets →
              </Link>
            </Button>
          </div>
        </section>

        {/* The Euthanasia Process */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-7 w-7 text-cpCoral" />
            The Euthanasia Process
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Understanding what happens can ease anxiety and help you prepare:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Sedation (Optional but Recommended)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Your pet receives a sedative injection to help them relax and become drowsy (5-10 minutes). This makes the experience peaceful and allows time for final goodbyes.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Euthanasia Solution</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">An overdose of anaesthetic is given (usually into a vein). Your pet falls into a deep sleep within seconds, then their heart stops. It's quick and painless.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream mb-1">Confirmation</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">The vet checks for heartbeat and breathing to confirm death. You can stay as long as you need.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4 mb-6">
            <h3 className="font-semibold text-foreground dark:text-cpCream mb-3">What You Might Notice:</h3>
            <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
              <li>• Eyes remain open (this is normal)</li>
              <li>• Possible muscle twitches or deep breath (reflex, not pain)</li>
              <li>• Possible release of bladder/bowels (relaxation of muscles)</li>
              <li>• Body may feel heavy or go limp</li>
            </ul>
            <p className="text-xs text-foreground dark:text-cpCream mt-3 italic">These are all normal physiological responses - your pet feels nothing.</p>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Home className="h-5 w-5 text-cpCoral" />
              At-Home Euthanasia
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Many vets offer home euthanasia services. Benefits include:
            </p>
            <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
              <li>• No stressful car journey for your pet</li>
              <li>• Familiar, comfortable surroundings</li>
              <li>• Privacy for your family to grieve</li>
              <li>• Other pets can say goodbye</li>
              <li>• More time - no waiting room pressure</li>
            </ul>
            <p className="text-xs text-foreground dark:text-cpCream mt-3">
              Home visits typically cost £100-£200 more than clinic appointments but many families find the peace and dignity worth every penny.
            </p>
          </div>
        </section>

        {/* After Death */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            After Death: Your Options
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Individual Cremation</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Your pet is cremated alone and their ashes are returned to you in a casket or urn.
              </p>
              <p className="text-xs text-foreground dark:text-cpCream italic">Cost: £100-£300 depending on size</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Communal Cremation</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Your pet is cremated with others. Ashes are not returned but are scattered in memorial gardens.
              </p>
              <p className="text-xs text-foreground dark:text-cpCream italic">Cost: £30-£100 depending on size</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Home Burial</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Legal in your own garden (check local regulations). Bury at least 3 feet deep, away from water sources.
              </p>
              <p className="text-xs text-foreground dark:text-cpCream italic">Consider: Future house moves, garden access</p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Pet Cemetery</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                Dedicated pet cemeteries offer burial plots with headstones and ongoing maintenance.
              </p>
              <p className="text-xs text-foreground dark:text-cpCream italic">Cost: £500+ for plot and burial</p>
            </div>
          </div>
        </section>

        {/* Grief Support */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <CloudRain className="h-7 w-7 text-cpCoral" />
            Coping with Grief
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Grief for a pet is real, valid and can be as intense as grieving a human. Allow yourself to feel:
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Healthy Grieving:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li>• Allow yourself to cry and feel sadness</li>
              <li>• Talk about your pet - share memories and stories</li>
              <li>• Create a memorial (photo album, paw print, plant a tree)</li>
              <li>• Maintain routines for other pets in the household</li>
              <li>• Don't rush to "get over it" - grief has no timeline</li>
              <li>• Join pet loss support groups (online or in-person)</li>
              <li>• Consider counselling if grief is overwhelming</li>
            </ul>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-5 mb-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Common Grief Reactions:</h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              Sadness, anger, guilt ("did I do the right thing?"), denial, searching behaviour (looking for pet), physical symptoms (fatigue, insomnia, loss of appetite). All are normal parts of grief.
            </p>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-cpCoral" />
              Pet Loss Support Resources
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
              <li>• <strong>Blue Cross Pet Bereavement Support:</strong> Free confidential helpline</li>
              <li>• <strong>Ralph Site:</strong> Pet loss support and online community</li>
              <li>• <strong>Your Vet Practice:</strong> Many offer grief counselling or referrals</li>
              <li>• <strong>Pet Loss Support Groups:</strong> Search online for local groups</li>
            </ul>
          </div>
        </section>

        {/* When to Get Another Pet */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            When to Welcome Another Pet
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              There's no "right" time. Some people need time to grieve, others find comfort in a new companion quickly. Trust your feelings.
            </p>
            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-4">
              <p className="text-sm text-foreground dark:text-cpCream mb-2">
                <strong>You might be ready when:</strong>
              </p>
              <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                <li>• You can think of your lost pet with more smiles than tears</li>
                <li>• You're excited about a new pet, not trying to replace the old one</li>
                <li>• You have emotional energy to bond with a new animal</li>
                <li>• Your lifestyle suits a new pet's needs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            Related Senior Pet Care
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/senior-pets/caring-older-dog" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Caring for Your Older Dog</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete senior dog health guide →</p>
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
                How do I know if I'm making the decision too soon?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Discuss quality of life honestly with your vet. Use the HHHHHMM scale. Most pet owners agonise over this decision precisely because they love their pet deeply - if you're worried about "too soon", you're likely being very thoughtful. The veterinary consensus is "better a week too early than a day too late" - preventing suffering is paramount. Many owners later wish they'd made the decision sooner to spare their pet additional suffering.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I stay with my pet during euthanasia?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                This is entirely personal. Many people find comfort in being there, providing reassurance in their pet's final moments. Others find it too distressing and prefer to say goodbye beforehand. Your vet and veterinary nurses are experienced and will care for your pet compassionately whether you're there or not. Do what feels right for you - there's no wrong choice, and your pet won't know the difference.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is it normal to feel guilty after euthanasia?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, guilt is an extremely common grief reaction. You might question if the timing was right, if you did enough, if you made the decision for the right reasons. This guilt doesn't mean you made the wrong decision - it means you cared deeply. Remember: you made the decision out of love, to prevent suffering. That's the greatest gift you could give. If guilt persists, pet loss counselling can help process these feelings.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How do I help children cope with pet loss?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Be honest using age-appropriate language. Avoid euphemisms like "put to sleep" (can cause fear of sleep). Say "died" or "no longer alive". Allow children to express emotions and ask questions. Include them in decisions if appropriate (saying goodbye, memorial). Reassure them the pet's death wasn't their fault. Children's grief may be intermittent - they may seem fine then suddenly sad. Create positive memories together - photo albums, planting a memorial tree, writing a letter to the pet.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need support or more pet care resources?
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
            "headline": "Saying Goodbye to Your Pet: End of Life Guide",
            "description": "Compassionate guide to pet euthanasia, quality of life assessment, end-of-life options and coping with pet loss and grief.",
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
              "@id": "https://cutiepawspedia.com/en/guide/senior-pets/saying-goodbye-pet"
            }
          })
        }}
      />
    </div>
  );
}

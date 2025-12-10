/**
 * SEO Landing Page: Essential Dog Vaccinations Guide
 * Pillar: Pet Health (English)
 * Target: Dog owners seeking vaccination guidance
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Syringe, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Essential Dog Vaccinations Guide 2025 | Complete Schedule & Costs",
  description: "Everything you need to know about dog vaccinations: core vaccines, puppy schedule, costs, side effects, and when to vaccinate. Keep your dog protected with our complete guide.",
  keywords: [
    "dog vaccinations",
    "puppy vaccination schedule",
    "core dog vaccines",
    "dog vaccination costs",
    "rabies vaccine dogs",
    "parvo vaccine",
    "distemper vaccine",
    "when to vaccinate puppy"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/pet-health/dog-vaccinations',
      'nl': '/nl/gids/dierengezondheid/vaccinaties-honden',
    },
  },
  openGraph: {
    title: "Essential Dog Vaccinations Guide 2025",
    description: "Complete guide to dog vaccinations: schedule, costs, and what your puppy needs to stay healthy.",
    type: "article",
  },
};

export default function DogVaccinations() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Pet Health</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            Essential Dog Vaccinations Guide: Complete Schedule & Costs
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Vaccinations are your dog's first line of defence against serious diseases. Learn which vaccines your puppy or adult dog needs, when to get them, and what to expect at each appointment.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🏥 Need to book a vaccination appointment?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/united-kingdom">
                Find a veterinarian near you →
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
            Vaccinations protect your dog from potentially fatal diseases like parvovirus, distemper, and rabies. Understanding which vaccines your dog needs and when they need them is crucial for responsible pet ownership.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This comprehensive guide covers core and non-core vaccines, the puppy vaccination schedule, adult booster shots, costs, and potential side effects. By the end, you'll know exactly how to keep your furry friend protected.
          </p>
        </section>

        {/* Core vs Non-Core Vaccines */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Syringe className="h-7 w-7 text-cpCoral" />
            Core vs Non-Core Vaccines: What's the Difference?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Core Vaccines */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-cpCoral" />
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream">Core Vaccines</h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Essential for all dogs regardless of lifestyle. These protect against severe, often fatal diseases.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Distemper:</strong> Viral disease affecting respiratory, nervous, and gastrointestinal systems</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Parvovirus:</strong> Highly contagious, causes severe vomiting and bloody diarrhoea</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Adenovirus (Hepatitis):</strong> Liver disease that can be fatal</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Rabies:</strong> Fatal disease affecting the nervous system (legally required in many countries)</span>
                </li>
              </ul>
            </div>

            {/* Non-Core Vaccines */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-cpAmber" />
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream">Non-Core Vaccines</h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Based on your dog's lifestyle, location, and risk factors. Discuss with your vet.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Bordetella (Kennel Cough):</strong> Recommended for dogs in daycare, grooming, or boarding</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Leptospirosis:</strong> Bacterial disease spread through wildlife urine</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Lyme Disease:</strong> For dogs in tick-endemic areas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Canine Influenza:</strong> For dogs frequently around other dogs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Important:</strong> Your vet will help determine which non-core vaccines your dog needs based on their individual risk assessment.
            </p>
          </div>
        </section>

        {/* Puppy Vaccination Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-cpCoral" />
            Puppy Vaccination Schedule: Week by Week
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Puppies receive antibodies from their mother's milk, but this protection fades between 6-16 weeks. That's why a series of vaccinations is crucial during this vulnerable period.
          </p>

          <div className="space-y-4 mb-6">
            {/* 6-8 Weeks */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">6-8 Weeks: First Vaccination</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    <strong>DHPP Vaccine:</strong> Distemper, Hepatitis (Adenovirus), Parvovirus, Parainfluenza
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream">This is usually the first shot your puppy receives from the breeder or shelter before coming home.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 10-12 Weeks */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">10-12 Weeks: Second Round</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    <strong>DHPP Booster</strong> + Optional: Leptospirosis, Bordetella, Lyme (depending on risk)
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream">Discuss lifestyle factors with your vet to determine which optional vaccines your puppy needs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 14-16 Weeks */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">14-16 Weeks: Final Puppy Shot</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    <strong>DHPP Final Booster</strong> + <strong>Rabies Vaccine</strong> (first dose)
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream">After this round, your puppy is considered fully vaccinated and can safely socialise with other dogs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground dark:text-cpCream">
                <strong>Important:</strong> Keep your puppy away from public areas, dog parks, and unvaccinated dogs until two weeks after their final vaccination. Puppies are highly vulnerable to diseases during this period.
              </p>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Protect Your Dog?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Book a vaccination appointment with a trusted veterinarian in your area.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/united-kingdom">
                Find veterinary clinics near you →
              </Link>
            </Button>
          </div>
        </section>

        {/* Adult Dog Boosters */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Adult Dog Booster Vaccinations
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Vaccinations don't end after puppyhood. Adult dogs need regular booster shots to maintain immunity against diseases.
          </p>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Typical Booster Schedule:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>DHPP Booster:</strong> Every 1-3 years (your vet will advise based on lifestyle and risk)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Rabies Booster:</strong> Every 1-3 years (depending on local laws and vaccine type)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Bordetella:</strong> Every 6-12 months (for dogs in high-risk environments)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Leptospirosis:</strong> Annually (if at risk)</span>
              </li>
            </ul>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>New Research:</strong> Some core vaccines may provide longer immunity than previously thought. Discuss titre testing with your vet as an alternative to automatic boosters.
            </p>
          </div>
        </section>

        {/* Costs */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Dog Vaccination Costs: What to Expect
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Puppy Vaccination Package</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£50-£100</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Per visit (typically 3 visits total). Includes DHPP and consultation.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Rabies Vaccine</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£30-£60</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">First dose and boosters. Required for travel and legally mandated in some areas.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Annual Booster</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£40-£80</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Includes health check and core vaccine boosters.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Optional Vaccines</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£20-£50</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Each additional vaccine (Bordetella, Lepto, Lyme) costs extra.</p>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>💡 Money-Saving Tip:</strong> Many vets offer wellness plans or vaccination packages that bundle puppy shots, health checks, and preventative care at a discounted rate.
            </p>
          </div>
        </section>

        {/* Side Effects */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Vaccine Side Effects: What to Watch For
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Most dogs experience no side effects from vaccinations. However, mild reactions are possible and usually resolve within 24-48 hours.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800/50 rounded-xl p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Normal Reactions (Common)
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Mild lethargy for 24 hours</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Slight swelling at injection site</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Reduced appetite</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Low-grade fever</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Mild discomfort or tenderness</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-xl p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Serious Reactions (Rare - Call Vet)
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Facial swelling or hives</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Difficulty breathing</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Vomiting or diarrhoea (severe or persistent)</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Collapse or weakness</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Seizures</li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>When to call the vet:</strong> If symptoms last more than 48 hours or you notice any serious reactions, contact your veterinarian immediately.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            More About Pet Health
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/pet-health/cat-vaccinations" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Essential Cat Vaccinations</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">What vaccines does your cat need? →</p>
            </Link>
            <Link href="/en/guide/pet-health/when-to-see-vet" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">When to Take Your Pet to the Vet</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Recognise warning signs →</p>
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
                Can I skip vaccinations if my dog stays indoors?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                No. Even indoor dogs should receive core vaccinations. Diseases like parvovirus can be carried on your shoes and clothing. Rabies vaccination is legally required in many areas regardless of lifestyle. However, your vet may recommend against certain non-core vaccines for truly indoor-only dogs.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What if my dog misses a booster shot?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Contact your vet as soon as possible. Depending on how late you are, your dog may need to restart the vaccination series from the beginning. Immunity can wane over time, leaving your dog vulnerable to disease. It's better to be slightly early than late for boosters.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Are vaccinations safe for senior dogs?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, but senior dogs (7+ years) may benefit from a more tailored vaccination schedule. Your vet might recommend titre testing to check existing immunity levels before automatically giving boosters. Senior dogs with certain health conditions may need special consideration, so always discuss your dog's individual health status with your vet.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What is titre testing and should I use it?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Titre testing measures your dog's antibody levels to determine if they still have immunity to certain diseases. It's an alternative to automatic boosters, especially for core vaccines. However, it costs more than vaccination (£80-£150) and isn't available for all vaccines (e.g., rabies still requires legal boosters regardless of titre results).
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Need more information about pet health and veterinary services?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en/united-kingdom">
                Discover all pet services →
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
            "headline": "Essential Dog Vaccinations Guide: Complete Schedule & Costs",
            "description": "Everything you need to know about dog vaccinations: core vaccines, puppy schedule, costs, side effects, and when to vaccinate.",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-health/dog-vaccinations"
            }
          })
        }}
      />
    </div>
  );
}

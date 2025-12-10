/**
 * SEO Landing Page: Essential Cat Vaccinations Guide
 * Pillar: Pet Health (English)
 * Target: Cat owners seeking vaccination guidance
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Syringe, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Essential Cat Vaccinations Guide 2025 | Schedule, Costs & Types",
  description: "Complete guide to cat vaccinations: core and non-core vaccines, kitten schedule, indoor vs outdoor cat needs, costs, and side effects. Keep your cat healthy and protected.",
  keywords: [
    "cat vaccinations",
    "kitten vaccination schedule",
    "core cat vaccines",
    "cat vaccination costs",
    "feline leukemia vaccine",
    "rabies vaccine cats",
    "indoor cat vaccines",
    "FVRCP vaccine"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/pet-health/cat-vaccinations',
      'nl': '/nl/gids/dierengezondheid/vaccinaties-katten',
    },
  },
  openGraph: {
    title: "Essential Cat Vaccinations Guide 2025",
    description: "Everything you need to know about cat vaccinations: schedule, costs, and what your kitten needs.",
    type: "article",
  },
};

export default function CatVaccinations() {
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
            Essential Cat Vaccinations Guide: Schedule, Costs & Types
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            Vaccinations protect your cat from deadly diseases like feline leukaemia, rabies, and upper respiratory infections. Whether you have an indoor or outdoor cat, understanding which vaccines they need is essential for their long-term health.
          </p>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              🐱 Time to book your cat's vaccination?
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
            Cats are masters at hiding illness, which makes preventative care even more critical. Vaccinations are your cat's first line of defence against serious, often fatal diseases.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            This guide covers everything you need to know: core vs non-core vaccines, the kitten vaccination schedule, boosters for adult cats, special considerations for indoor cats, costs, and potential side effects.
          </p>
        </section>

        {/* Core vs Non-Core Vaccines */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Syringe className="h-7 w-7 text-cpCoral" />
            Core vs Non-Core Vaccines for Cats
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Core Vaccines */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-cpCoral" />
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream">Core Vaccines</h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Recommended for ALL cats, regardless of whether they go outdoors.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>FVRCP (3-in-1):</strong> Feline Viral Rhinotracheitis (FVR), Calicivirus (C), and Panleukopenia (P)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Panleukopenia:</strong> Often fatal viral infection affecting blood cells and intestines</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Calicivirus:</strong> Respiratory infection causing fever, mouth ulcers, and pneumonia</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Rhinotracheitis:</strong> Herpes virus causing severe respiratory disease</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">•</span>
                  <span><strong>Rabies:</strong> Fatal disease affecting the nervous system (legally required in many regions)</span>
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
                Based on your cat's lifestyle and risk factors. Discuss with your vet.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Feline Leukaemia (FeLV):</strong> Recommended for outdoor cats and kittens, virus weakens immune system</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Feline Immunodeficiency Virus (FIV):</strong> For high-risk cats (outdoor, multi-cat households with FIV+ cats)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Bordetella:</strong> For cats in shelters, boarding, or multi-cat environments</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpAmber mt-0.5">•</span>
                  <span><strong>Chlamydia:</strong> For cats in multi-cat households with known infections</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Important:</strong> Even strictly indoor cats need core vaccines. Viruses can enter your home on shoes, clothing, or through open doors/windows.
            </p>
          </div>
        </section>

        {/* Kitten Vaccination Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-cpCoral" />
            Kitten Vaccination Schedule: Complete Timeline
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Kittens receive maternal antibodies from nursing, but this protection fades around 8-12 weeks. A series of vaccinations ensures continuous protection during this vulnerable period.
          </p>

          <div className="space-y-4 mb-6">
            {/* 6-8 Weeks */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">6-8 Weeks: First FVRCP</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    <strong>FVRCP Vaccine:</strong> Protects against panleukopenia, calicivirus, and rhinotracheitis
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream">This is usually administered by the breeder, shelter, or your vet at the first health check.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 10-12 Weeks */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">10-12 Weeks: Second FVRCP + FeLV (Optional)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    <strong>FVRCP Booster</strong> + Optional: First FeLV dose (feline leukaemia)
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream">FeLV is recommended for all kittens, even if they'll be indoor-only. You can discontinue boosters later if they remain indoors.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 14-16 Weeks */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">14-16 Weeks: Final Kitten Vaccines</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    <strong>FVRCP Final Booster</strong> + <strong>Rabies Vaccine</strong> + FeLV Booster (if started)
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream">After this series, your kitten is fully vaccinated and can socialise safely with other vaccinated cats.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1 Year */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">12-16 Months: First Annual Booster</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    <strong>FVRCP Booster</strong> + <strong>Rabies Booster</strong> + FeLV (if applicable)
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream">This booster ensures long-term immunity. After this, boosters are typically every 1-3 years.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground dark:text-cpCream">
                <strong>Important:</strong> Keep your kitten isolated from unvaccinated cats and outdoor areas until two weeks after their final vaccination. Kittens are extremely vulnerable to diseases during this period.
              </p>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Protect Your Cat Today
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Find a trusted veterinarian in your area to book your cat's vaccination appointment.
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

        {/* Indoor vs Outdoor Cats */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Indoor Cats vs Outdoor Cats: Vaccine Differences
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Indoor Cats</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span><strong>Core vaccines:</strong> FVRCP and Rabies (required)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span><strong>FeLV:</strong> Only as kitten, then discontinue if truly indoor-only</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✗</span>
                  <span>FIV, Bordetella, Chlamydia typically not needed</span>
                </li>
              </ul>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Remember:</strong> Indoor cats still need core vaccines as diseases can enter via shoes, clothing, or escapes.</p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Outdoor/Indoor-Outdoor Cats</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span><strong>Core vaccines:</strong> FVRCP and Rabies (essential)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span><strong>FeLV:</strong> Highly recommended, especially for cats under 3 years</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                  <span className="text-cpCoral mt-0.5">✓</span>
                  <span>FIV if high risk of cat fights</span>
                </li>
              </ul>
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                <p className="text-xs text-foreground dark:text-cpCream"><strong>Higher Risk:</strong> Outdoor cats have increased exposure to diseases from wildlife, other cats, and the environment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Adult Cat Boosters */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Adult Cat Booster Schedule
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-4">Typical Booster Schedule:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>FVRCP Booster:</strong> Every 1-3 years (many vets now recommend 3-year intervals for low-risk cats)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Rabies Booster:</strong> Every 1-3 years depending on local laws and vaccine type</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground dark:text-cpCream/80">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>FeLV Booster:</strong> Annually for outdoor cats; discontinue for strictly indoor cats after initial series</span>
              </li>
            </ul>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>New Guidelines:</strong> Many veterinary organisations now recommend longer intervals between boosters (up to 3 years) for low-risk, indoor cats. Discuss with your vet.
            </p>
          </div>
        </section>

        {/* Costs */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Cat Vaccination Costs: What to Expect
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Kitten Vaccination Package</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£45-£90</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Per visit (typically 3-4 visits). Includes FVRCP and consultation.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Rabies Vaccine</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£25-£55</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">First dose and boosters. Legally required in many regions.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">FeLV Vaccine</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£30-£60</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Per dose. Two doses required initially, then annual boosters for outdoor cats.</p>
            </div>
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Annual Booster</h3>
              <p className="text-2xl font-bold text-cpCoral mb-2">£40-£75</p>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Includes health check and core vaccine boosters.</p>
            </div>
          </div>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl border border-cpCoral/30 dark:border-cpCoral/20 p-4">
            <p className="text-sm text-foreground dark:text-cpCream">
              <strong>💡 Money-Saving Tip:</strong> Look for kitten wellness packages that bundle vaccinations, microchipping, and spaying/neutering at a discounted rate.
            </p>
          </div>
        </section>

        {/* Side Effects */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Vaccine Side Effects in Cats
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            Most cats tolerate vaccinations well with minimal side effects. However, it's important to monitor your cat for 24-48 hours after vaccination.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800/50 rounded-xl p-5">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Normal Reactions (Common)
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Mild lethargy for 24-48 hours</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Small lump at injection site (may last weeks)</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Reduced appetite</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Mild fever</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Sneezing (after intranasal vaccines)</li>
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
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Vomiting or diarrhoea (severe)</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Collapse or extreme lethargy</li>
                <li className="text-sm text-muted-foreground dark:text-cpCream/70">• Injection site lump growing after 3 months</li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Injection-Site Sarcomas:</strong> Extremely rare (1 in 10,000 cats) but serious. Monitor any lump at the injection site - if it persists beyond 3 months, grows larger, or exceeds 2cm, contact your vet immediately.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            More About Pet Health
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/pet-health/dog-vaccinations" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Essential Dog Vaccinations</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Complete dog vaccination guide →</p>
            </Link>
            <Link href="/en/guide/pet-health/deworming-dogs-cats" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Deworming Your Dog and Cat</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Schedule and best practices →</p>
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
                Do indoor cats really need vaccinations?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes! Even strictly indoor cats need core vaccines (FVRCP and Rabies). Viruses like panleukopenia can survive in the environment for months and enter your home on shoes, clothing, or even insects. Additionally, cats can escape unexpectedly, and rabies vaccination is legally required in many regions regardless of lifestyle.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Should I vaccinate my cat for FeLV if they're indoor-only?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                It's recommended to give the initial FeLV series to all kittens, even indoor-only ones, as a precaution. Once your cat reaches adulthood and you're certain they'll remain indoors, you can discuss discontinuing FeLV boosters with your vet. If your cat ever goes outdoors or lives with FeLV-positive cats, they should continue annual FeLV vaccinations.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I over-vaccinate my cat?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Yes, unnecessary vaccinations can potentially increase the risk of side effects. That's why modern protocols recommend extending booster intervals to every 3 years for low-risk, indoor cats. Titre testing (measuring antibody levels) can help determine if your cat still has immunity before automatically giving boosters. Discuss an individualised vaccination plan with your vet.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What should I do if my cat has a reaction to a vaccine?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Mild lethargy and reduced appetite for 24-48 hours are normal. However, if your cat experiences facial swelling, difficulty breathing, severe vomiting, or collapse, seek emergency veterinary care immediately. For future vaccinations, inform your vet about the reaction - they may recommend pre-medicating with antihistamines or spreading out vaccines to reduce risk.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Looking for more pet health information and veterinary services?
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
            "headline": "Essential Cat Vaccinations Guide: Schedule, Costs & Types",
            "description": "Complete guide to cat vaccinations: core and non-core vaccines, kitten schedule, indoor vs outdoor cat needs, costs, and side effects.",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-health/cat-vaccinations"
            }
          })
        }}
      />
    </div>
  );
}

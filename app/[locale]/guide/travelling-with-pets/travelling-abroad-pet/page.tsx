/**
 * SEO Landing Page: Travelling Abroad with Your Pet
 * Pillar: Travelling with Pets
 * Locale: English (en)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Globe, FileText, AlertTriangle, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Travelling Abroad with Your Pet: Complete Checklist (2025) | CutiePawsPedia",
  description: "Everything you need to know about international pet travel. EU Pet Passport, vaccinations, country requirements, and essential documentation for stress-free travel.",
  keywords: "travelling abroad with pet, EU pet passport, international pet travel, pet travel requirements, taking dog abroad, pet vaccinations travel",
  alternates: {
    canonical: "/en/guide/travelling-with-pets/travelling-abroad-pet",
    languages: {
      'en': '/en/guide/travelling-with-pets/travelling-abroad-pet',
      'nl': '/nl/gids/reizen-met-huisdieren/buitenland-reizen-huisdier',
    },
  },
  openGraph: {
    title: "Travelling Abroad with Your Pet: Complete Checklist",
    description: "Comprehensive guide to international pet travel. Documentation, health requirements, and country-specific rules.",
    type: "article",
    locale: "en_GB",
  },
};

export default function TravellingAbroadPetPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Globe className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Travelling with Pets</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Travelling Abroad with Your Pet: Essential Guide
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            Planning an international trip with your dog or cat? Proper preparation is essential for smooth border crossings and stress-free travel. This complete guide covers EU Pet Passports, required vaccinations, country-specific regulations, and everything you need to know before departing.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Essential: Pre-Travel Vet Consultation
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  Book a vet appointment at least 4 weeks before travel for passport, vaccinations, and health checks.
                </p>
                <Button asChild className="bg-cpCoral text-white rounded-xl hover:-translate-y-1 transition-transform">
                  <Link href="/en/netherlands">
                    Find a Veterinarian →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">

        {/* EU Pet Passport */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <FileText className="h-8 w-8 text-cpCoral" />
            EU Pet Passport: Your Essential Document
          </h2>

          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border-l-4 border-cpCoral rounded-r-xl p-6 mb-6">
            <h3 className="font-semibold text-foreground dark:text-cpCream mb-3">
              What is an EU Pet Passport?
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-4">
              The EU Pet Passport is an official document allowing cats, dogs, and ferrets to travel freely within the European Union. It contains your pet's identification details, rabies vaccination records, and veterinary contact information.
            </p>
            <p className="text-xs text-muted-foreground dark:text-cpCream/70">
              <strong>Important:</strong> Only authorised veterinarians can issue EU Pet Passports. Contact your vet to arrange one.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">1.</span> Microchip (First Step)
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Your pet must have an ISO 11784/11785 compliant microchip before any vaccinations. The microchip number is recorded in the passport. If your pet already has a microchip, verify it's ISO-compliant.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">2.</span> Rabies Vaccination
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-3">
                Rabies vaccination is mandatory and must be administered <strong>after</strong> microchipping. The vaccination becomes valid 21 days after the first dose. Valid for 1-3 years depending on vaccine type.
              </p>
              <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-lg p-4 text-sm">
                <p className="text-foreground dark:text-cpCream/90 font-medium mb-1">⏰ Timing is Critical</p>
                <p className="text-muted-foreground dark:text-cpCream/70">
                  You cannot travel until 21 days after the first rabies vaccination. Plan accordingly - this is the most common reason for travel delays!
                </p>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">3.</span> Passport Issuance
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Once microchipped and vaccinated, your vet issues the EU Pet Passport. It records all required information and remains valid for life (as long as vaccinations are kept up to date). Cost: typically €35-€75.
              </p>
            </div>
          </div>
        </section>

        {/* General Requirements */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            General Requirements for EU Travel
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral" />
                </div>
                <h3 className="font-bold text-foreground dark:text-cpCream">Dogs & Cats</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>ISO-compliant microchip</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>Valid rabies vaccination (21+ days old)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>EU Pet Passport</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>Health certificate (some countries)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpCoral">•</span>
                  <span>Max 5 pets per person for non-commercial travel</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cpAmber/10 dark:bg-cpAmber/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-cpAmber" />
                </div>
                <h3 className="font-bold text-foreground dark:text-cpCream">Country-Specific Rules</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-cpAmber">!</span>
                  <span><strong>UK:</strong> Tapeworm treatment 1-5 days before entry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpAmber">!</span>
                  <span><strong>Ireland/Malta/Finland:</strong> Tapeworm treatment required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpAmber">!</span>
                  <span><strong>Spain:</strong> Additional vaccinations recommended</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cpAmber">!</span>
                  <span><strong>Denmark:</strong> Banned breed restrictions apply</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Can't Take Your Pet Abroad?
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Find trusted pet hotels and boarding facilities for safe care while you're away.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/en/netherlands">
              Find Pet Hotels →
            </Link>
          </Button>
        </div>

        {/* Popular Destinations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-cpCoral" />
            Popular Destinations: Specific Requirements
          </h2>

          <div className="space-y-4">
            {/* France */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🇫🇷</span>
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">France</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-cpCoral font-medium mb-2">Requirements:</p>
                  <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80">
                    <li>✓ EU Pet Passport</li>
                    <li>✓ Rabies vaccination</li>
                    <li>✓ Microchip</li>
                    <li>✓ Must be over 3 months old</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cpCoral font-medium mb-2">Notes:</p>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Very pet-friendly country. Most beaches allow dogs outside summer season. Many restaurants welcome well-behaved pets.
                  </p>
                </div>
              </div>
            </div>

            {/* Germany */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🇩🇪</span>
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">Germany</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-cpCoral font-medium mb-2">Requirements:</p>
                  <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80">
                    <li>✓ EU Pet Passport</li>
                    <li>✓ Rabies vaccination</li>
                    <li>✓ Microchip</li>
                    <li>⚠️ Breed restrictions in some states</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cpCoral font-medium mb-2">Notes:</p>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Some states (Bavaria, Brandenburg) have banned breed lists. Check specific state regulations for Pit Bulls, Staffordshires, etc.
                  </p>
                </div>
              </div>
            </div>

            {/* Belgium */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🇧🇪</span>
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">Belgium</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-cpCoral font-medium mb-2">Requirements:</p>
                  <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80">
                    <li>✓ EU Pet Passport</li>
                    <li>✓ Rabies vaccination</li>
                    <li>✓ Microchip</li>
                    <li>✓ Dogs must be on lead in public</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cpCoral font-medium mb-2">Notes:</p>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Close neighbour with similar rules to Netherlands. Many pet-friendly accommodations and beaches along the coast.
                  </p>
                </div>
              </div>
            </div>

            {/* United Kingdom */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🇬🇧</span>
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">United Kingdom (Post-Brexit)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-cpCoral font-medium mb-2">Requirements:</p>
                  <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80">
                    <li>✓ EU Pet Passport (still accepted)</li>
                    <li>✓ Rabies vaccination</li>
                    <li>✓ Microchip</li>
                    <li>✓ Tapeworm treatment (1-5 days before entry)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cpCoral font-medium mb-2">Notes:</p>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Tapeworm treatment must be administered by a vet and recorded in passport. UK accepts EU Pet Passports issued before 01/01/2021.
                  </p>
                </div>
              </div>
            </div>

            {/* Spain */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🇪🇸</span>
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">Spain</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-cpCoral font-medium mb-2">Requirements:</p>
                  <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80">
                    <li>✓ EU Pet Passport</li>
                    <li>✓ Rabies vaccination</li>
                    <li>✓ Microchip</li>
                    <li>⚠️ Consider leishmaniasis prevention</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cpCoral font-medium mb-2">Notes:</p>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Leishmaniasis is present in Spain. Consult your vet about preventive treatment. Very pet-friendly culture with many dog-friendly beaches and restaurants.
                  </p>
                </div>
              </div>
            </div>

            {/* Italy */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🇮🇹</span>
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">Italy</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-cpCoral font-medium mb-2">Requirements:</p>
                  <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80">
                    <li>✓ EU Pet Passport</li>
                    <li>✓ Rabies vaccination</li>
                    <li>✓ Microchip</li>
                    <li>⚠️ Lead and muzzle required on transport</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cpCoral font-medium mb-2">Notes:</p>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    Dogs must wear muzzles on public transport (though rarely enforced). Many cities have dog-friendly piazzas. Check local beach rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Travel Checklist */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Pre-Travel Checklist (4-8 Weeks Before)
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
            <ul className="space-y-3">
              {[
                { weeks: "8 weeks", task: "Research destination country requirements and breed restrictions" },
                { weeks: "6-8 weeks", task: "Book vet appointment for microchip (if needed) and rabies vaccination" },
                { weeks: "6 weeks", task: "Apply for EU Pet Passport (if you don't have one)" },
                { weeks: "4 weeks", task: "Verify rabies vaccination is valid and will remain so for entire trip" },
                { weeks: "3-4 weeks", task: "Book pet-friendly accommodation and transport" },
                { weeks: "2 weeks", task: "Final vet check-up and obtain health certificate if required" },
                { weeks: "1-5 days", task: "Tapeworm treatment (UK, Ireland, Finland, Malta, Norway)" },
                { weeks: "1 week", task: "Prepare travel kit: food, water, medication, documents, toys" },
                { weeks: "Departure day", task: "Check all documents, ensure microchip works, bring comfort items" }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-medium text-cpCoral text-sm">{item.weeks} before:</span>
                    <span className="text-sm text-muted-foreground dark:text-cpCream/80 ml-2">{item.task}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Important Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Essential Travel Tips
          </h2>

          <div className="space-y-4">
            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    Always Carry Physical Documents
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Border officials require original physical copies. Bring: EU Pet Passport, health certificates, proof of ownership, and emergency vet contact details. Keep digital backups separately.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    Verify Return Requirements
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Some countries require additional treatments before returning to Netherlands (especially from rabies-risk countries). Check requirements for both outbound AND return journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 border-l-4 border-cpAmber">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-cpAmbar flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                    Travel Insurance for Pets
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Consider pet travel insurance covering emergency vet treatment abroad, trip cancellation, and lost pet recovery. European Health Insurance doesn't cover pets!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Read Also
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/en/guide/travelling-with-pets/flying-with-pet"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                ✈️ Flying with Your Pet
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Complete guide to air travel with pets →
              </p>
            </Link>

            <Link
              href="/en/guide/travelling-with-pets/car-travel-dog"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🚗 Car Travel with Dogs
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Safe car travel for international trips →
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How long does it take to get an EU Pet Passport?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                The passport can be issued immediately after microchipping and rabies vaccination. However, you cannot travel until 21 days after the first rabies vaccination. Plan at least 4-6 weeks before travel to allow for appointments and the 21-day waiting period.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I travel to non-EU countries with my pet?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Yes, but requirements vary significantly. Non-EU countries often require additional health certificates, blood tests, and import permits. Some countries have lengthy quarantine periods. Research specific country requirements at least 3-6 months in advance.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What happens if I don't have proper documentation at the border?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Your pet can be refused entry, quarantined at your expense, or sent back to the country of origin. In serious cases, pets can be confiscated. Never risk travelling without proper documentation - it's not worth the stress and potential harm to your pet.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Are there age restrictions for pet travel?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Pets must be at least 15 weeks old to travel within the EU (12 weeks for microchip + 21 days for rabies vaccination to become valid). Airlines often have stricter rules - many require puppies/kittens to be 4+ months old. Very young and very old pets may struggle with travel stress.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Get Your Pet Travel-Ready
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Find veterinarians near you for EU Pet Passports, vaccinations, and pre-travel health checks.
          </p>
          <Button asChild size="lg" className="bg-white text-cpCoral hover:bg-white/90 rounded-xl">
            <Link href="/en/netherlands">
              Find Veterinarians →
            </Link>
          </Button>
        </div>
      </article>

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Travelling Abroad with Your Pet: Essential Guide",
            "description": "Complete guide to international pet travel. EU Pet Passport, vaccinations, country requirements, and essential documentation.",
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
            "inLanguage": "en-GB"
          })
        }}
      />
    </div>
  );
}

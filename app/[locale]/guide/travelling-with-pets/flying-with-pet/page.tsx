/**
 * SEO Landing Page: Flying with Your Pet
 * Pillar: Travelling with Pets
 * Locale: English (en)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Plane, AlertCircle, Euro, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Flying with Your Pet: Complete Guide & Costs (2025) | CutiePawsPedia",
  description: "Everything about flying with your dog or cat. Airlines comparison, costs, cabin vs cargo, and essential tips for stress-free pet air travel.",
  keywords: "flying with pet, pet air travel, dog on plane, cat on plane, airline pet policy, pet travel costs",
  alternates: {
    canonical: "/en/guide/travelling-with-pets/flying-with-pet",
    languages: {
      'en': '/en/guide/travelling-with-pets/flying-with-pet',
      'nl': '/nl/gids/reizen-met-huisdieren/vliegen-met-huisdier',
    },
  },
  openGraph: {
    title: "Flying with Your Pet: Complete Guide & Costs",
    description: "Comprehensive guide to air travel with pets. Compare airlines, understand costs, and prepare your pet for flying.",
    type: "article",
    locale: "en_GB",
  },
};

export default function FlyingWithPetPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Plane className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Travelling with Pets</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Flying with Your Pet: Complete Guide for Air Travel
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            Planning to fly with your dog or cat? This comprehensive guide covers everything from airline policies and costs to preparation tips and health requirements. Learn how to make air travel safe and stress-free for your beloved pet.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Pre-Flight Vet Check Essential
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  Book a veterinary consultation before flying. Get health certificates and travel advice.
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

        {/* Cabin vs Cargo */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Cabin vs Cargo: What's the Difference?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* In Cabin */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-2 border-cpCoral/30 dark:border-cpCoral/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <span className="text-xl">🛋️</span>
                </div>
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">
                  In Cabin (Preferred)
                </h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Your pet travels with you under the seat in an approved carrier. Best option for small pets.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Pet stays with you throughout flight</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Less stressful for small pets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Usually max 8kg (pet + carrier)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Limited availability - book early</span>
                </li>
              </ul>
            </div>

            {/* In Cargo */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cpAmber/10 dark:bg-cpAmber/20 flex items-center justify-center">
                  <span className="text-xl">📦</span>
                </div>
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">
                  In Cargo Hold
                </h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Larger pets travel in a pressurised, temperature-controlled cargo hold in an IATA-approved crate.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">For medium to large dogs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Safe and temperature controlled</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Can be stressful for anxious pets</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Not suitable for extreme weather</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber rounded-r-xl p-6">
            <p className="text-sm text-foreground dark:text-cpCream/90">
              <strong>Important:</strong> Brachycephalic breeds (flat-faced dogs like Pugs, Bulldogs, Persian cats) are often banned from cargo due to breathing difficulties at altitude. Always check your airline's breed restrictions.
            </p>
          </div>
        </section>

        {/* Airline Comparison */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Euro className="h-8 w-8 text-cpCoral" />
            Popular Airlines: Costs & Policies
          </h2>

          <div className="space-y-4 mb-6">
            {/* KLM */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">KLM Royal Dutch Airlines</h3>
                <span className="text-cpCoral font-semibold">€75-€150</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li>✓ Cabin: Max 8kg (pet + carrier), €75-€150 per flight</li>
                <li>✓ Cargo: Available for larger pets, price varies by weight and route</li>
                <li>✓ Good pet-friendly reputation</li>
              </ul>
            </div>

            {/* Lufthansa */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">Lufthansa</h3>
                <span className="text-cpCoral font-semibold">€40-€300</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li>✓ Cabin: Max 8kg, from €40 (Europe) to €110 (intercontinental)</li>
                <li>✓ Cargo: Available, prices from €100-€300 depending on size</li>
                <li>✓ Strict IATA crate requirements</li>
              </ul>
            </div>

            {/* British Airways */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">British Airways</h3>
                <span className="text-orange-600 font-semibold">Cargo Only</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li>⚠️ No cabin travel for pets</li>
                <li>✓ Cargo via IAG Cargo service</li>
                <li>✓ Comprehensive pet travel service available</li>
              </ul>
            </div>

            {/* EasyJet / Ryanair */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground dark:text-cpCream text-lg">EasyJet / Ryanair</h3>
                <span className="text-red-600 font-semibold">Not Allowed</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li>❌ No pets allowed (except assistance dogs)</li>
                <li>Consider alternative airlines for pet travel</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
            Note: Prices and policies subject to change. Always verify current requirements with your airline before booking.
          </p>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Can't Take Your Pet? Find Trusted Care
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            If flying with your pet isn't feasible, discover reliable pet hotels and boarding facilities.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/en/netherlands">
              Find Pet Hotels →
            </Link>
          </Button>
        </div>

        {/* Documents Required */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <FileText className="h-8 w-8 text-cpCoral" />
            Essential Documents & Health Requirements
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">1.</span> EU Pet Passport
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Required for travel within the EU. Contains vaccination records, microchip details, and pet identification. Issued by your veterinarian after microchipping and rabies vaccination.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">2.</span> Health Certificate
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Airlines require a veterinary health certificate issued within 10 days of travel. Confirms your pet is fit to fly and free from contagious diseases.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">3.</span> Rabies Vaccination
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Must be at least 21 days old before travel. Valid for 1-3 years depending on vaccine type. Essential for international travel.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">4.</span> Microchip
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                ISO 11784/11785 compliant microchip required. Must be implanted before rabies vaccination. Ensure registration details are current.
              </p>
            </div>
          </div>
        </section>

        {/* Preparation Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            How to Prepare Your Pet for Flying
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3">
                6-8 Weeks Before Flight
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Book your flight and reserve pet space (limited spots available)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Research destination country's import requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Purchase airline-approved carrier (IATA standards)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Start crate training - make carrier a positive space</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3">
                1-2 Weeks Before Flight
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Vet check-up and obtain health certificate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Confirm all vaccinations are up to date</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Attach identification tags to carrier and collar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Discuss anti-anxiety medication with vet if needed</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3">
                Day of Flight
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Light meal 4-6 hours before departure (avoid full stomach)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Good walk/play session before airport</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Arrive early - pet check-in takes extra time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span>Place familiar blanket and toy in carrier</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Safety Tips for Flying with Pets
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 border-l-4 border-cpAmber">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">Avoid sedation:</strong>
                  <span className="text-muted-foreground dark:text-cpCream/80 text-sm block mt-1">
                    Most airlines and vets advise against sedation. It can affect breathing and blood pressure at altitude. Consult your vet.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">Book direct flights:</strong>
                  <span className="text-muted-foreground dark:text-cpCream/80 text-sm block mt-1">
                    Minimise stress and risk of lost pets during transfers. Direct routes are always safer.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">Weather considerations:</strong>
                  <span className="text-muted-foreground dark:text-cpCream/80 text-sm block mt-1">
                    Avoid flying in extreme heat or cold. Airlines may refuse cargo pets if temperatures exceed safe limits.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">Travel insurance:</strong>
                  <span className="text-muted-foreground dark:text-cpCream/80 text-sm block mt-1">
                    Consider pet travel insurance covering medical emergencies and trip cancellations.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Internal links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Read Also
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/en/guide/travelling-with-pets/travelling-abroad-pet"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🌍 Travelling Abroad with Pets
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Complete checklist for international pet travel and documentation →
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
                Safe car travel tips and legal requirements →
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
                How much does it cost to fly with a pet?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Costs vary by airline and destination. In-cabin typically ranges from €40-€150 for European flights. Cargo transport costs €100-€300+ depending on pet size and distance. Always book early as pet spaces are limited.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is it safe for my pet to fly in cargo?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Yes, when properly prepared. Cargo holds are pressurised and temperature-controlled. However, it can be stressful for anxious pets. Not recommended for brachycephalic breeds, very young/old pets, or extreme weather conditions.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I sedate my pet for flying?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Most airlines and veterinarians advise against sedation. Sedatives can affect breathing and cardiovascular function at high altitudes, increasing risk. Instead, focus on proper crate training and natural calming methods. Always consult your vet.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What documents do I need to fly with my pet?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                You'll need: EU Pet Passport (for EU travel), veterinary health certificate (within 10 days of travel), proof of rabies vaccination (at least 21 days old), and microchip registration. Requirements vary by destination country - always check specific regulations.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Find Trusted Veterinarians for Travel Prep
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Get your pet flight-ready with health checks and travel certificates from local vets.
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
            "headline": "Flying with Your Pet: Complete Guide & Costs",
            "description": "Comprehensive guide to air travel with pets. Compare airlines, understand costs, cabin vs cargo, and prepare your pet for flying.",
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

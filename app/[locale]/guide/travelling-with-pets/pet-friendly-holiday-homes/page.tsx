/**
 * SEO Landing Page: Pet-Friendly Holiday Homes in the Netherlands
 * Pillar: Travelling with Pets
 * Locale: English (en)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Home, MapPin, Heart, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pet-Friendly Holiday Homes Netherlands: Best Places (2025) | CutiePawsPedia",
  description: "Discover the best pet-friendly holiday homes, cottages and accommodations in the Netherlands. Dog-friendly beaches, forests, and complete travel guide.",
  keywords: "pet friendly holiday homes, dog friendly accommodation Netherlands, holiday with dog, pet friendly cottages, dog beaches Netherlands",
  alternates: {
    canonical: "/en/guide/travelling-with-pets/pet-friendly-holiday-homes",
    languages: {
      'en': '/en/guide/travelling-with-pets/pet-friendly-holiday-homes',
      'nl': '/nl/gids/reizen-met-huisdieren/huisdiervriendelijke-vakantiehuizen',
    },
  },
  openGraph: {
    title: "Pet-Friendly Holiday Homes in the Netherlands: Complete Guide",
    description: "Find perfect pet-friendly accommodation for your holiday. From coastal cottages to forest cabins.",
    type: "article",
    locale: "en_GB",
  },
};

export default function PetFriendlyHolidayHomesPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Home className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Travelling with Pets</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Pet-Friendly Holiday Homes in the Netherlands
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            Planning a holiday with your dog or cat in the Netherlands? Discover the best pet-friendly holiday homes, cottages, and accommodations. From coastal properties near dog beaches to forest cabins perfect for hiking - find your ideal pet-friendly getaway.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Need Care for Your Pet During Holiday?
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  If your pet can't join you, find trusted pet hotels and boarding near you.
                </p>
                <Button asChild className="bg-cpCoral text-white rounded-xl hover:-translate-y-1 transition-transform">
                  <Link href="/en/netherlands">
                    Find Pet Hotels →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">

        {/* Top Regions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-cpCoral" />
            Best Regions for Pet-Friendly Holidays
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Zeeland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <span className="text-2xl">🏖️</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream">Zeeland</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-cpAmber text-cpAmber" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Perfect for beach-loving dogs! Numerous dog beaches, coastal walks, and pet-friendly restaurants.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">12+ designated dog beaches</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Domburg, Cadzand, Renesse</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Many pet-friendly terraces</span>
                </li>
              </ul>
            </div>

            {/* Veluwe */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <span className="text-2xl">🌲</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream">Veluwe</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-cpAmber text-cpAmber" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Ideal for active dogs! Endless forests, heathlands, and nature trails for hiking adventures.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">1000+ km of walking trails</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Off-leash areas available</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Wildlife spotting opportunities</span>
                </li>
              </ul>
            </div>

            {/* North Holland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <span className="text-2xl">🏝️</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream">North Holland</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-cpAmber text-cpAmber" />
                    ))}
                    <Star className="w-3 h-3 text-cpAmber" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Best of both worlds - dunes, beaches, and charming villages. Perfect for varied holidays.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Bergen, Schoorl, Texel</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Beautiful dune landscapes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Cultural attractions nearby</span>
                </li>
              </ul>
            </div>

            {/* Friesland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center">
                  <span className="text-2xl">⛵</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream">Friesland</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-cpAmber text-cpAmber" />
                    ))}
                    <Star className="w-3 h-3 text-cpAmber" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Water paradise with lakes, islands, and countryside. Peaceful and spacious for dogs to explore.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Frisian Islands dog-friendly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Quiet, less crowded areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">Boating with dogs possible</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What to Look For */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            What to Look for in Pet-Friendly Accommodation
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">1.</span> Fenced Garden
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Secure outdoor space where your dog can play safely off-leash. Check fence height if you have an energetic jumper. Ideal for toilet breaks and outdoor relaxation.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">2.</span> Pet Policies & Fees
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Understand pet fees (typically €25-€75 per stay for cleaning), number of pets allowed, size/breed restrictions, and damage deposit requirements. Always book directly to confirm pet policy.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmbar/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">3.</span> Location & Nearby Facilities
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Proximity to dog beaches, forests, walking trails, and pet-friendly restaurants. Check distance to nearest veterinarian. Avoid accommodations near busy roads for safety.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">4.</span> Pet Amenities
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Best properties offer water bowls, dog beds, towels for wet paws, and waste bags. Some luxury options include welcome treats, toys, and pet-sitting services.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">5.</span> Indoor Flooring
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                Tiled or wooden floors are easier to clean than carpets. Important if your dog tends to bring in sand, mud, or has accidents. Check house rules about dogs on furniture.
              </p>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Pre-Holiday Vet Check
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Ensure your pet is fit for travel with a vet check-up. Update vaccinations and get travel advice.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/en/netherlands">
              Find Veterinarians →
            </Link>
          </Button>
        </div>

        {/* Booking Platforms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Search className="h-8 w-8 text-cpCoral" />
            Where to Find Pet-Friendly Accommodation
          </h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground dark:text-cpCream">Booking.com</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-cpCoral/10 text-cpCoral">Popular</span>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                Filter by "pets allowed" to find thousands of pet-friendly options. Clear pet policies and guest reviews mention pet-friendliness.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                Tip: Look for "Pet-friendly" badge and read recent reviews from pet owners
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground dark:text-cpCream">BringFido</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-cpCoral/10 text-cpCoral">Pet Specialist</span>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                Dedicated pet travel platform with verified pet-friendly listings. Includes dog-friendly beaches, restaurants, and activities.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                Tip: Excellent for finding truly dog-friendly experiences, not just accommodation
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground dark:text-cpCream">Landal GreenParks</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-cpCoral/10 text-cpCoral">Netherlands Focused</span>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                Multiple holiday parks across Netherlands with designated pet-friendly accommodations. Forests, beaches, and nature nearby.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                Tip: Many parks have off-leash dog areas and pet washing facilities
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground dark:text-cpCream">Airbnb</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-cpCoral/10 text-cpCoral">Flexible</span>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                Use "Pets allowed" filter for unique homes and apartments. Message hosts about specific pet needs before booking.
              </p>
              <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                Tip: Hosts often share local dog-walking routes and pet-friendly spots
              </p>
            </div>
          </div>
        </section>

        {/* Packing Checklist */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Holiday Packing Checklist for Pets
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Food and treats (bring extra)",
                "Water and travel bowl",
                "Lead, collar, and ID tag",
                "Pet passport and vaccination records",
                "Bed or blanket from home",
                "Favourite toys",
                "Grooming supplies",
                "Waste bags",
                "First aid kit for pets",
                "Any medication needed",
                "Towels for wet/muddy paws",
                "Contact details for local vet"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/80">{item}</span>
                </div>
              ))}
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
              href="/en/guide/travelling-with-pets/dog-beaches-netherlands"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🏖️ Dog Beaches in Netherlands
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Complete guide to the best dog-friendly beaches →
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
                Safe car travel tips for your holiday journey →
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
                How much do pet-friendly holiday homes cost?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Pet fees typically range from €25-€75 per stay for cleaning and damage insurance. The accommodation itself costs the same as non-pet properties. Some luxury properties charge up to €150 for pets but include amenities like dog beds and welcome packages.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Are there size or breed restrictions?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                This varies by property. Many allow dogs up to 25kg. Some ban certain breeds (often fighting dogs or aggressive breeds). Always check specific property policies. Holiday parks tend to be more flexible than hotels.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I bring multiple pets?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Most properties allow 1-2 pets maximum. Larger holiday homes may accept 3+ pets with prior arrangement. Expect additional fees for each pet. Always confirm before booking to avoid issues at check-in.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What are the house rules for pets?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Common rules: dogs not allowed on furniture/beds (unless specified), must be cleaned up after, can't be left alone for extended periods, must be kept on lead in communal areas. Some properties require pets to sleep in specific areas.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Find Pet Services Near Your Holiday Destination
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Locate veterinarians, pet shops, and emergency services near your accommodation.
          </p>
          <Button asChild size="lg" className="bg-white text-cpCoral hover:bg-white/90 rounded-xl">
            <Link href="/en/netherlands">
              Search by Location →
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
            "headline": "Pet-Friendly Holiday Homes in the Netherlands: Complete Guide",
            "description": "Discover the best pet-friendly holiday homes, cottages and accommodations in the Netherlands. Complete guide with tips and recommendations.",
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

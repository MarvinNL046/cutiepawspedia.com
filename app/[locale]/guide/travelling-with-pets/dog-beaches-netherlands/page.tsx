/**
 * SEO Landing Page: Dog Beaches in the Netherlands
 * Pillar: Travelling with Pets
 * Locale: English (en)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Waves, MapPin, Heart, Sun, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dog Beaches Netherlands: Best Locations & Rules (2025) | CutiePawsPedia",
  description: "Complete guide to dog beaches in Netherlands. Find the best dog-friendly beaches in Zeeland, North Holland & more. Rules, seasons, and facilities.",
  keywords: "dog beaches Netherlands, hondenstrand Nederland, dog friendly beaches, Zeeland dog beach, Scheveningen dogs, beach with dog",
  alternates: {
    canonical: "/en/guide/travelling-with-pets/dog-beaches-netherlands",
    languages: {
      'en': '/en/guide/travelling-with-pets/dog-beaches-netherlands',
      'nl': '/nl/gids/reizen-met-huisdieren/hondenstranden-nederland',
    },
  },
  openGraph: {
    title: "Dog Beaches in the Netherlands: Complete Guide 2025",
    description: "Discover the best dog-friendly beaches across Netherlands. Rules, facilities, and seasonal information.",
    type: "article",
    locale: "en_GB",
  },
};

export default function DogBeachesNetherlandsPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Waves className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Travelling with Pets</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Dog Beaches in the Netherlands: Complete Guide
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            The Netherlands offers dozens of beautiful dog beaches where your four-legged friend can run, swim, and play freely. From the shores of Zeeland to the Wadden Islands - discover the best dog-friendly beaches, seasonal rules, and facilities for a perfect beach day.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Beach Holiday with Your Dog?
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  Find pet-friendly accommodation near the best dog beaches in the Netherlands.
                </p>
                <Button asChild className="bg-cpCoral text-white rounded-xl hover:-translate-y-1 transition-transform">
                  <Link href="/en/guide/travelling-with-pets/pet-friendly-holiday-homes">
                    Find Holiday Homes →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">

        {/* Beach Rules */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            General Rules for Dog Beaches
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber rounded-r-xl p-6 mb-6">
            <h3 className="font-semibold text-foreground dark:text-cpCream mb-3">
              Seasonal Regulations
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-4">
              Most beaches have seasonal restrictions. Understanding these helps you plan your visit and avoid fines.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Sun className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">May 1 - October 1 (Summer Season):</strong>
                  <p className="text-muted-foreground dark:text-cpCream/80 mt-1">
                    Dogs often banned on main beaches 09:00-19:00. Designated dog beaches remain accessible year-round.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sun className="h-5 w-5 text-cpAqua flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">October 1 - May 1 (Winter Season):</strong>
                  <p className="text-muted-foreground dark:text-cpCream/80 mt-1">
                    Most beaches allow dogs everywhere, often off-leash. Perfect time for beach walks!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h4 className="font-semibold text-foreground dark:text-cpCream mb-3">✓ Generally Allowed</h4>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Year-round access to dog beaches</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Off-leash in designated areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Swimming and playing in water</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Early morning/evening on regular beaches</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h4 className="font-semibold text-foreground dark:text-cpCream mb-3">✗ Usually Not Allowed</h4>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Leaving waste unattended (€90 fine)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Aggressive or uncontrolled dogs</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Summer daytime on regular beaches</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Protected dune and nature areas</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Top Dog Beaches */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-cpCoral" />
            Best Dog Beaches by Region
          </h2>

          <div className="space-y-6">
            {/* Zeeland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🏖️</span>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream text-xl">Zeeland</h3>
                  <p className="text-sm text-cpCoral">Most dog-friendly province</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-cpCoral/30 pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Domburg Dog Beach</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                    Wide sandy beach with excellent facilities. Dog shower, waste bins, and nearby parking. Popular but spacious.
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                    <strong>Location:</strong> Southern end of Domburg beach | <strong>Facilities:</strong> Shower, bins, café nearby
                  </p>
                </div>

                <div className="border-l-2 border-cpCoral/30 pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Cadzand Dog Beach</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                    One of the longest dog beaches in Netherlands. Quiet, spacious, perfect for energetic dogs. Close to Belgian border.
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                    <strong>Location:</strong> Near Cadzand-Bad | <strong>Facilities:</strong> Large parking, waste bins, beach café
                  </p>
                </div>

                <div className="border-l-2 border-cpCoral/30 pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Renesse Dog Beach</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                    Family-friendly with shallow water ideal for dogs learning to swim. Clean facilities and pet-friendly terraces nearby.
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                    <strong>Location:</strong> West of Renesse centre | <strong>Facilities:</strong> Shower, parking, restaurants
                  </p>
                </div>
              </div>
            </div>

            {/* North Holland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🌊</span>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream text-xl">North Holland</h3>
                  <p className="text-sm text-cpCoral">Dunes and diverse beaches</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-cpCoral/30 pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Scheveningen Dog Beach</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                    Located near The Hague, very accessible. Can get crowded on weekends but excellent facilities and beach pavilions.
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                    <strong>Location:</strong> North of Scheveningen harbour | <strong>Facilities:</strong> Full amenities, parking, dog-friendly cafés
                  </p>
                </div>

                <div className="border-l-2 border-cpCoral/30 pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Bergen aan Zee Dog Beach</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                    Beautiful dune landscape, quieter than Scheveningen. Lovely coastal walks combined with beach time.
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                    <strong>Location:</strong> North end of Bergen aan Zee | <strong>Facilities:</strong> Basic amenities, nature trails
                  </p>
                </div>

                <div className="border-l-2 border-cpCoral/30 pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Texel Dog Beaches</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                    Multiple dog beaches on this Wadden island. De Koog and Paal 17 most popular. Ferry accessible, great for weekend trips.
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                    <strong>Location:</strong> Various locations on Texel | <strong>Facilities:</strong> Varies by location, generally good
                  </p>
                </div>
              </div>
            </div>

            {/* South Holland */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🏝️</span>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream text-xl">South Holland</h3>
                  <p className="text-sm text-cpCoral">Urban beaches with facilities</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-cpCoral/30 pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Kijkduin Dog Beach</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                    Close to The Hague, well-maintained with modern facilities. Parking easily accessible, lots of dog owners community.
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                    <strong>Location:</strong> Kijkduin, The Hague | <strong>Facilities:</strong> Showers, bins, ample parking
                  </p>
                </div>

                <div className="border-l-2 border-cpCoral/30 pl-4">
                  <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Hoek van Holland Dog Beach</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                    Long stretch perfect for ball games and running. Less crowded than The Hague beaches. Great for active dogs.
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-cpCream/70">
                    <strong>Location:</strong> North of Hoek van Holland | <strong>Facilities:</strong> Basic facilities, large area
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Coastal Holiday with Your Dog
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Find pet-friendly holiday homes near these beautiful beaches for your perfect seaside escape.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/en/guide/travelling-with-pets/pet-friendly-holiday-homes">
              Find Beach Accommodations →
            </Link>
          </Button>
        </div>

        {/* Beach Etiquette */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Beach Etiquette for Dog Owners
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🚮</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Always Clean Up</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Bring waste bags and use designated bins. Leaving dog waste can result in €90 fines and ruins the beach for everyone. No exceptions!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">👀</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Keep Dogs Under Control</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Even on off-leash beaches, ensure your dog responds to commands. Not all dogs are friendly - give others space. Recall training essential.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💧</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Bring Fresh Water</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Seawater can make dogs sick. Bring drinking water and a bowl. Prevent excessive saltwater intake which causes vomiting and diarrhoea.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">☀️</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Protect from Sun & Heat</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Bring shade (umbrella or tent) for hot days. Dogs can't cool down like humans. Limit midday beach time in summer. Watch for heat exhaustion.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🐚</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Rinse After Swimming</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Use dog showers (available at many beaches) to rinse salt and sand. Prevents skin irritation and keeps your car clean. Dry ears thoroughly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Bring */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Dog Beach Essentials Checklist
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Waste bags (bring extra)",
                "Fresh drinking water & bowl",
                "Towels for drying",
                "Lead (for walking to/from beach)",
                "Shade (umbrella or beach tent)",
                "Dog-safe sunscreen (nose/ears)",
                "Floating toy for water play",
                "First aid kit",
                "Snacks and treats",
                "Identification tag on collar"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 list-none">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/80">{item}</span>
                </li>
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
              href="/en/guide/travelling-with-pets/pet-friendly-holiday-homes"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🏠 Pet-Friendly Holiday Homes
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Find accommodation near these beautiful beaches →
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
                Safe travel tips for your beach trip →
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
                When can dogs go to the beach in Netherlands?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Designated dog beaches are accessible year-round. From October 1 to May 1, most regular beaches also allow dogs. During summer (May 1 - October 1), dogs are typically banned from regular beaches between 09:00-19:00, but dog beaches remain open.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Are dogs allowed off-leash on dog beaches?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Most designated dog beaches allow off-leash play, but your dog must be under voice control. Always check local signage as rules vary. During winter, more beaches allow off-leash walking. Keep your dog on lead if they don't respond reliably to recall.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is seawater safe for dogs to drink?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                No, seawater can make dogs sick. The high salt content causes vomiting, diarrhoea, and dehydration. Always bring fresh drinking water and a bowl. Discourage your dog from drinking seawater and monitor for signs of salt poisoning.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What's the fine for not cleaning up after my dog?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Failing to clean up dog waste results in a €90 fine in most Dutch municipalities. Some beach areas have higher fines up to €140. Enforcement officers patrol popular beaches regularly, especially during summer. Always carry waste bags.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Plan Your Perfect Beach Holiday
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Find pet-friendly accommodations, veterinarians, and services near Netherlands' best beaches.
          </p>
          <Button asChild size="lg" className="bg-white text-cpCoral hover:bg-white/90 rounded-xl">
            <Link href="/en/netherlands">
              Search Pet Services →
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
            "headline": "Dog Beaches in the Netherlands: Complete Guide 2025",
            "description": "Complete guide to dog beaches in Netherlands. Best locations, rules, facilities, and seasonal information for beach visits with your dog.",
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

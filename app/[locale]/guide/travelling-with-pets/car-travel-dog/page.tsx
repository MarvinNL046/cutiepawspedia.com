/**
 * SEO Landing Page: Travelling with Your Dog by Car
 * Pillar: Travelling with Pets
 * Locale: English (en)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Car, Shield, AlertTriangle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Travelling with Your Dog by Car: Safe Travel Tips (2025) | CutiePawsPedia",
  description: "Discover how to travel safely with your dog by car. Practical tips for dog seat belts, crates, and long journeys. Find pet hotels for your holiday.",
  keywords: "dog car travel, travelling with dog, dog seat belt, dog crate, car seat dog, safe dog travel",
  alternates: {
    canonical: "/en/guide/travelling-with-pets/car-travel-dog",
    languages: {
      'en': '/en/guide/travelling-with-pets/car-travel-dog',
      'nl': '/nl/gids/reizen-met-huisdieren/reizen-hond-auto',
    },
  },
  openGraph: {
    title: "Travelling with Your Dog by Car: Complete Safety Guide",
    description: "Everything you need to know about safe car travel with your dog. From legal requirements to practical tips.",
    type: "article",
    locale: "en_GB",
  },
};

export default function CarTravelDogPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 mb-6">
            <Car className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Travelling with Pets</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Travelling with Your Dog by Car: Tips for a Safe Journey
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8 leading-relaxed">
            Safe and comfortable car travel with your dog requires proper preparation. This complete guide helps you transport your dog correctly, from legal requirements to practical tips for long road trips.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpCoral/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cpCoral/10 dark:bg-cpCoral/20 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-cpCoral" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Going on Holiday with Your Dog?
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                  Find a reliable pet hotel near you for when your dog can't come along.
                </p>
                <Button asChild className="bg-cpCoral text-white rounded-xl hover:-translate-y-1 transition-transform">
                  <Link href="/en/netherlands">
                    Find a Pet Hotel →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">

        {/* Legal Requirements */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-cpCoral" />
            Legal Requirements for Dogs in Cars
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber rounded-r-xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 leading-relaxed mb-4">
              In the Netherlands, it's legally required to properly secure your dog in the car. According to Article 5.2.38 of the Vehicle Regulations, an animal must not hinder the driver or pose a danger. A loose dog in the car can result in a fine of €140.
            </p>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              More important than the fine: an unsecured dog can be seriously injured in an accident or even fly through the windscreen.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-4">
            Approved Safety Methods:
          </h3>

          <ul className="space-y-3 mb-6">
            {[
              "Car crate or travel cage in the boot",
              "Dog seat belt or harness with belt attachment",
              "Partition between rear seat and boot",
              "Special car seat for small dogs"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground dark:text-cpCream/80">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Comparing the Best Options */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Car Crate, Seat Belt, or Partition?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Car Crate */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
                🏠 Car Crate
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Safest option for medium to large dogs. Gives your dog their own space.
              </p>
              <div className="text-sm space-y-2">
                <p className="text-green-600 dark:text-green-400">✓ Maximum safety</p>
                <p className="text-green-600 dark:text-green-400">✓ Comfortable for dog</p>
                <p className="text-orange-600 dark:text-orange-400">− Takes up space</p>
              </div>
            </div>

            {/* Seat Belt */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
                🦺 Dog Seat Belt
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Practical for smaller dogs or short trips. Look for crash-test certification.
              </p>
              <div className="text-sm space-y-2">
                <p className="text-green-600 dark:text-green-400">✓ Space-saving</p>
                <p className="text-green-600 dark:text-green-400">✓ Affordable</p>
                <p className="text-orange-600 dark:text-orange-400">− Less safe in crash</p>
              </div>
            </div>

            {/* Partition */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3">
                🔲 Boot Partition
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
                Ideal for multiple dogs or very large dogs. The boot becomes a dog space.
              </p>
              <div className="text-sm space-y-2">
                <p className="text-green-600 dark:text-green-400">✓ For large dogs</p>
                <p className="text-green-600 dark:text-green-400">✓ Multiple dogs possible</p>
                <p className="text-orange-600 dark:text-orange-400">− Less comfortable</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
            Tip: Choose a system tested according to ECE R17 or similar crash test standards for maximum safety.
          </p>
        </section>

        {/* Secondary CTA */}
        <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 mb-12 border border-cpCoral/20">
          <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
            Dog Can't Come on Holiday?
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Discover reliable veterinarians near you for a travel check before your holiday.
          </p>
          <Button asChild variant="outline" className="border-cpCoral text-cpCoral hover:bg-cpCoral hover:text-white rounded-xl">
            <Link href="/en/netherlands">
              View Veterinarians →
            </Link>
          </Button>
        </div>

        {/* Tips for Long Journeys */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Tips for Long Car Journeys with Your Dog
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">1.</span> Plan Regular Breaks
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Take a break every 2 hours for at least 15 minutes. Let your dog relieve themselves, drink water, and move around. This prevents stress and car sickness. Use an extendable lead for safety at service stations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">2.</span> Don't Feed Too Much Beforehand
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Feed your dog a light meal 2-3 hours before departure. A full stomach can lead to car sickness. Provide plenty of water, but not too much just before leaving. Take a travel water bowl for long trips.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">3.</span> Ensure Good Ventilation
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Dogs can overheat quickly. Set the air conditioning to a comfortable temperature (not too cold) and ensure plenty of fresh air. NEVER leave your dog alone in a parked car, not even 'just for a minute'.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">4.</span> Gradually Accustom Your Dog to the Car
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                Start with short trips and gradually build up. Make the car positive with treats and toys. Some dogs experience stress or car sickness - practise this in advance and consult your vet about anti-nausea medication if needed.
              </p>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Checklist: What to Bring
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
            <ul className="grid md:grid-cols-2 gap-3">
              {[
                "Water and travel water bowl",
                "Familiar blanket or cushion",
                "Waste bags",
                "Lead and spare lead",
                "Favourite toy",
                "Any medication",
                "Pet passport and vaccination record",
                "Dog tag with contact details",
                "Towel (for wet paws)",
                "Snacks and chews for entertainment"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Car Sickness */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            What to Do About Car Sickness?
          </h2>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 mb-6 border-l-4 border-cpAmber">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">
                  Recognise the Signs
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 text-sm mb-3">
                  Car sickness is especially common in young dogs and can improve with age. Signs include: excessive drooling, restlessness, whining, yawning, or vomiting.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span>Let your dog face forward instead of sideways</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span>Open a window for fresh air</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span>Consider medication from your vet (Cerenia)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cpCoral">•</span>
                    <span>Use ginger biscuits as a natural remedy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Internal links */}
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
                Everything about rules, costs, and tips for flying with your dog or cat →
              </p>
            </Link>

            <Link
              href="/en/guide/travelling-with-pets/travelling-abroad-pet"
              className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
            >
              <h3 className="font-semibold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                🌍 Travelling Abroad
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Checklist for travelling abroad with your pet →
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
                Can my dog travel loose in the car?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                No, a loose dog in the car is not allowed in the Netherlands and can result in a fine of €140. More importantly: it's dangerous for your dog and other passengers in an accident or sudden braking.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What's the safest way to transport my dog?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                A crash-test certified car crate in the boot is the safest option. For smaller dogs, a good seat belt with harness can also work, provided it meets safety standards such as ECE R17.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How often should I take breaks during a long journey?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Take a break at least every 2 hours for 15-20 minutes. Let your dog relieve themselves, drink water, and move around. In hot weather or with young/old dogs, hourly breaks are recommended.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I give something for car sickness?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                Yes, consult your vet about anti-nausea medication such as Cerenia. Natural alternatives include ginger biscuits or CBD oil (in consultation with your vet). It's also important to gradually accustom your dog to car travel.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Discover All Pet Services Near You
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            From pet hotels to dog trainers: find trusted professionals for your pet.
          </p>
          <Button asChild size="lg" className="bg-white text-cpCoral hover:bg-white/90 rounded-xl">
            <Link href="/en/netherlands">
              View All Services →
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
            "headline": "Travelling with Your Dog by Car: Tips for a Safe Journey",
            "description": "Complete guide for safe car travel with your dog. Legal requirements, best transport options, and practical tips for long trips.",
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

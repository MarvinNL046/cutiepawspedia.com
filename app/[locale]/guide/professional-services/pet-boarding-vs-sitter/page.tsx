import { Metadata } from "next";
import Link from "next/link";
import { Home, Hotel, CheckCircle2, AlertCircle, Star, MapPin, Scale, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Boarding vs Pet Sitter: Which is Best? | CutiePawsPedia",
  description: "Compare pet boarding and pet sitting services. Discover pros, cons, costs, and which option is best for your pet's needs when you travel.",
  alternates: {
    languages: {
      'nl': '/nl/gids/professionele-diensten/dierenpension-vs-oppas',
      'en': '/en/guide/professional-services/pet-boarding-vs-sitter',
    },
  },
  openGraph: {
    title: "Pet Boarding vs Pet Sitter: Which is Best?",
    description: "Complete comparison of pet boarding facilities and pet sitters. Find the right care solution for your pet while you're away.",
    type: "article",
  },
};

export default function PetBoardingVsSitterPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpAmber/10 via-cpCoral/5 to-transparent border-b border-border dark:border-cpAmber/20 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpAmber/10 dark:bg-cpAmber/20 rounded-xl">
              <Scale className="h-8 w-8 text-cpAmber" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground dark:text-cpCream">
              Pet Boarding vs Pet Sitter: Which is Best?
            </h1>
          </div>
          <p className="text-xl text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Planning a holiday or business trip? Choosing between pet boarding facilities and pet sitters depends on your pet's personality, health needs, and your budget. Let's compare both options.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpCoral/10 dark:bg-cpCoral/5">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground dark:text-cpCream mb-4">
            Find trusted pet care services in your area
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/en/search?category=boarding"
              className="inline-flex items-center gap-2 bg-cpAmber text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Hotel className="h-5 w-5" />
              Find Pet Boarding
            </Link>
            <Link
              href="/en/search?category=pet-sitting"
              className="inline-flex items-center gap-2 bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Home className="h-5 w-5" />
              Find Pet Sitters
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Quick Comparison */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Quick Comparison
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pet Boarding */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-8 shadow-md border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <Hotel className="h-8 w-8 text-cpAmber" />
                <h3 className="text-2xl font-bold text-foreground dark:text-cpCream">Pet Boarding</h3>
              </div>
              <p className="text-muted-foreground dark:text-cpCream/70 mb-4">
                Professional facilities where your pet stays with other animals, supervised by trained staff.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/70">24/7 professional supervision</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/70">Socialisation opportunities</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/70">Structured activities and routines</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/70">Emergency vet care often available</span>
                </div>
              </div>
            </div>

            {/* Pet Sitting */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-8 shadow-md border border-border dark:border-cpAmber/20">
              <div className="flex items-center gap-3 mb-4">
                <Home className="h-8 w-8 text-cpAqua" />
                <h3 className="text-2xl font-bold text-foreground dark:text-cpCream">Pet Sitting</h3>
              </div>
              <p className="text-muted-foreground dark:text-cpCream/70 mb-4">
                A professional comes to your home or their home to care for your pet in a home environment.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/70">Familiar home environment</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/70">One-on-one attention</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/70">Less stressful for anxious pets</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground dark:text-cpCream/70">Home security (mail, plants, etc.)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="mb-12 bg-card dark:bg-cpSurface/50 rounded-2xl p-8 shadow-md border border-border dark:border-cpAmber/20">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Detailed Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border dark:border-cpAmber/20">
                  <th className="pb-3 text-foreground dark:text-cpCream">Factor</th>
                  <th className="pb-3 text-cpAmber">Pet Boarding</th>
                  <th className="pb-3 text-cpAqua">Pet Sitting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-cpAmber/10">
                <tr>
                  <td className="py-3 font-medium text-foreground dark:text-cpCream">Environment</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">New facility with other pets</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">Your home or sitter's home</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-foreground dark:text-cpCream">Attention</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">Shared among multiple pets</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">Dedicated one-on-one</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-foreground dark:text-cpCream">Socialisation</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">High (if pet-friendly)</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">Low to none</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-foreground dark:text-cpCream">Cost (per day)</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">£15-£35 for dogs, £10-£20 for cats</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">£20-£50 depending on visits</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-foreground dark:text-cpCream">Best For</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">Social pets, longer trips</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">Anxious pets, senior pets, cats</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-foreground dark:text-cpCream">Medical Care</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">Often on-site or nearby vet</td>
                  <td className="py-3 text-muted-foreground dark:text-cpCream/70">Sitter arranges vet visit if needed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Choose Boarding */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Hotel className="h-8 w-8 text-cpAmber" />
            When Pet Boarding is Best
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Your Pet Loves Socialising",
                desc: "Dogs who enjoy playing with other dogs thrive in boarding facilities with supervised playgroups and social activities."
              },
              {
                title: "You're Away for Extended Periods",
                desc: "For holidays longer than a week, boarding facilities provide consistent care and routine without relying on a sitter's availability."
              },
              {
                title: "You Want Professional Supervision",
                desc: "Facilities have trained staff, structured schedules, and often veterinary care on-site or nearby for peace of mind."
              },
              {
                title: "Your Pet Needs Special Care",
                desc: "Many boarding facilities can administer medication, provide special diets, and handle pets with specific health requirements."
              },
              {
                title: "You Prefer a Controlled Environment",
                desc: "Boarding facilities maintain clean, secure environments with safety protocols and insurance coverage."
              },
              {
                title: "You Have Multiple Pets",
                desc: "Some facilities offer discounts for multiple pets and can keep siblings or bonded pairs together."
              }
            ].map((item, index) => (
              <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 shadow-sm border border-border dark:border-cpAmber/20">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-cpAmber" />
                  {item.title}
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="my-16 bg-gradient-to-br from-cpAmber/10 to-cpCoral/10 dark:from-cpAmber/5 dark:to-cpCoral/5 rounded-2xl p-8 text-center border border-border dark:border-cpAmber/20">
          <h3 className="text-2xl font-display font-bold text-foreground dark:text-cpCream mb-4">
            Find Pet Boarding Facilities Near You
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/70 mb-6 max-w-2xl mx-auto">
            Browse trusted pet boarding facilities, read reviews, and compare services to find the perfect place for your pet.
          </p>
          <Link
            href="/en/search?category=boarding"
            className="inline-flex items-center gap-2 bg-cpAmber text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Browse Boarding Facilities
          </Link>
        </section>

        {/* When to Choose Pet Sitting */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Home className="h-8 w-8 text-cpAqua" />
            When Pet Sitting is Best
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Your Pet is Anxious or Nervous",
                desc: "Pets who get stressed in new environments or around other animals do much better in their familiar home setting."
              },
              {
                title: "You Have a Cat",
                desc: "Cats are particularly territorial and typically prefer staying in their own home rather than being transported to a boarding facility."
              },
              {
                title: "Senior or Special Needs Pets",
                desc: "Older pets or those with mobility issues, chronic conditions, or anxiety benefit from the comfort and routine of home."
              },
              {
                title: "You Want Home Security",
                desc: "Pet sitters can water plants, collect mail, rotate lights, and make your home look occupied while you're away."
              },
              {
                title: "Multiple Pets of Different Species",
                desc: "If you have cats, dogs, birds, or small animals, a pet sitter can care for all of them at once in your home."
              },
              {
                title: "You Prefer Personalised Care",
                desc: "Pet sitters provide undivided attention, maintain your pet's exact routine, and offer updates with photos and videos."
              }
            ].map((item, index) => (
              <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 shadow-sm border border-border dark:border-cpAmber/20">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-cpAqua" />
                  {item.title}
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Questions to Ask */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Essential Questions to Ask
          </h2>
          <div className="space-y-6">
            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 border border-cpAmber/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3">For Boarding Facilities:</h3>
              <ul className="space-y-2">
                {[
                  "What is the staff-to-pet ratio?",
                  "How much exercise and playtime does my pet get daily?",
                  "Are pets separated by size and temperament?",
                  "What happens if my pet becomes ill or injured?",
                  "Can I visit the facility before booking?",
                  "What vaccination requirements do you have?",
                  "Do you have cameras for live monitoring?",
                  "What's included in the daily rate?"
                ].map((question, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/70">{question}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-xl p-6 border border-cpAqua/20">
              <h3 className="font-semibold text-foreground dark:text-cpCream mb-3">For Pet Sitters:</h3>
              <ul className="space-y-2">
                {[
                  "Are you insured and bonded?",
                  "Do you have pet first aid training?",
                  "How many visits per day are included?",
                  "Will you be the only person caring for my pet?",
                  "Can you provide references from other clients?",
                  "How will you handle emergencies?",
                  "Do you have backup if you're unavailable?",
                  "Will you send updates and photos?"
                ].map((question, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cpAqua flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground dark:text-cpCream/70">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Red Flags */}
        <section className="mb-12 bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
            Warning Signs for Both Options
          </h2>
          <ul className="space-y-3">
            {[
              "No proof of insurance, licensing, or certifications",
              "Unwilling to provide references or contact information for previous clients",
              "Vague or evasive answers about care procedures and emergency protocols",
              "No vaccination requirements (increases disease risk in boarding)",
              "Facilities that refuse site visits or transparency",
              "Significantly cheaper than market rates (often indicates poor care)",
              "Negative reviews mentioning sick, injured, or neglected pets",
              "No written contract or agreement outlining services and responsibilities",
              "Pushy sales tactics or pressure to book immediately",
              "Poor communication or unresponsiveness before booking"
            ].map((flag, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-foreground dark:text-cpCream">{flag}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Internal Links */}
        <section className="mb-12 bg-cpCoral/5 dark:bg-cpCoral/5 rounded-2xl p-6 border border-cpCoral/20">
          <h3 className="font-semibold text-foreground dark:text-cpCream mb-4">Related Articles:</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/en/guide/professional-services/finding-vet" className="text-cpAqua hover:text-cpCoral hover:underline">
                → How to Find the Right Vet for Your Pet
              </Link>
            </li>
            <li>
              <Link href="/en/guide/professional-services/dog-walking-service" className="text-cpAqua hover:text-cpCoral hover:underline">
                → Dog Walking Services: What You Need to Know
              </Link>
            </li>
            <li>
              <Link href="/en/guide/professional-services/choosing-groomer" className="text-cpAqua hover:text-cpCoral hover:underline">
                → How to Choose a Pet Groomer
              </Link>
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How much does pet boarding cost compared to pet sitting?",
                a: "Pet boarding typically costs £15-£35 per day for dogs and £10-£20 for cats. Pet sitting ranges from £20-£50 per day depending on number of visits (usually 1-3 visits daily). Longer stays often get discounted rates. Pet sitting may be more expensive but offers personalised care."
              },
              {
                q: "Can I try a practice stay at a boarding facility?",
                a: "Many facilities offer day care or short trial stays so your pet can get comfortable with the environment. This is highly recommended for first-time boarders to reduce anxiety and ensure your pet adjusts well."
              },
              {
                q: "What if my pet needs medication?",
                a: "Both boarding facilities and pet sitters can administer medication, but confirm this during booking. Provide written instructions, proper dosage, and enough medication for the entire stay plus extra days."
              },
              {
                q: "Is it safe to leave house keys with a pet sitter?",
                a: "Reputable pet sitters are insured, bonded, and have been background-checked. Ask for references and verify their credentials. Many sitters use lockboxes or smart locks for added security. Never hire someone without proper vetting."
              },
              {
                q: "What should I pack for boarding?",
                a: "Bring your pet's food (enough for the stay), medications, vaccination records, favourite toys or blanket (with scent of home), and emergency contact information. Label everything with your pet's name."
              },
              {
                q: "How do I prepare my pet for boarding or sitting?",
                a: "Gradually prepare your pet: arrange meet-and-greets with sitters or facility tours, practice short separations, keep vaccinations current, ensure ID tags and microchips are updated, and maintain normal routines before departure."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 shadow-sm group border border-border dark:border-cpAmber/20">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <CheckCircle2 className="h-5 w-5 text-cpCoral group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-muted-foreground dark:text-cpCream/70 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 bg-gradient-to-r from-cpCoral to-cpAqua rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Find Trusted Pet Care Services Today
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Explore pet boarding facilities and professional pet sitters in your area. Compare services, read reviews, and book with confidence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/en/search?category=boarding"
              className="inline-flex items-center gap-2 bg-white text-cpAmber rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Browse Pet Boarding
            </Link>
            <Link
              href="/en/search?category=pet-sitting"
              className="inline-flex items-center gap-2 bg-white text-cpAqua rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Browse Pet Sitters
            </Link>
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
            "headline": "Pet Boarding vs Pet Sitter: Which is Best?",
            "description": "Compare pet boarding and pet sitting services. Discover pros, cons, costs, and which option is best for your pet's needs when you travel.",
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
            "datePublished": "2024-12-08",
            "dateModified": "2024-12-08",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/en/guide/professional-services/pet-boarding-vs-sitter"
            },
            "inLanguage": "en",
            "keywords": ["pet boarding", "pet sitting", "pet care", "boarding vs sitting", "pet hotel"]
          })
        }}
      />
    </main>
  );
}

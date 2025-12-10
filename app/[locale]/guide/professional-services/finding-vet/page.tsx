import { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, CheckCircle2, AlertCircle, Star, MapPin, Clock, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Find the Right Vet: Complete Guide | CutiePawsPedia",
  description: "Expert guide to finding the best veterinarian for your pet. Learn what to look for, questions to ask, and how to choose quality veterinary care.",
  alternates: {
    languages: {
      'nl': '/nl/gids/professionele-diensten/dierenarts-vinden',
      'en': '/en/guide/professional-services/finding-vet',
    },
  },
  openGraph: {
    title: "How to Find the Right Vet: Complete Guide",
    description: "Discover how to find the best veterinarian for your pet. Expert tips, checklist, and what to look for in quality veterinary care.",
    type: "article",
  },
};

export default function FindingVetPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpAqua/10 via-cpCoral/5 to-transparent border-b border-border dark:border-cpAmber/20 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpAqua/10 dark:bg-cpAqua/20 rounded-xl">
              <Stethoscope className="h-8 w-8 text-cpAqua" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground dark:text-cpCream">
              How to Find the Right Vet
            </h1>
          </div>
          <p className="text-xl text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Choosing the right veterinarian is one of the most important decisions you'll make for your pet's health and wellbeing. Learn what to look for and how to find quality veterinary care.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpCoral/10 dark:bg-cpCoral/5">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground dark:text-cpCream mb-4">
            Looking for a trusted veterinarian in your area?
          </p>
          <Link
            href="/en/search?category=veterinary"
            className="inline-flex items-center gap-2 bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MapPin className="h-5 w-5" />
            Find Vets Near You
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Why choosing the right vet matters */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Heart className="h-8 w-8 text-cpCoral" />
            Why Your Choice of Vet Matters
          </h2>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
            Your veterinarian will be your partner in keeping your pet healthy throughout their life. From routine vaccinations and check-ups to emergency care and end-of-life decisions, you need a vet you can trust completely.
          </p>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
            A good vet doesn't just treat illness—they provide preventive care, nutritional advice, behavioural guidance, and emotional support during difficult times. The relationship you build with your vet can significantly impact your pet's quality of life.
          </p>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Studies show that pets who receive regular veterinary care live longer, healthier lives. Finding the right vet early means establishing a medical history and building trust before emergencies arise.
          </p>
        </section>

        {/* Checklist Section */}
        <section className="mb-12 bg-card dark:bg-cpSurface/50 rounded-2xl p-8 shadow-md border border-border dark:border-cpAmber/20">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Essential Checklist: What to Look For
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Qualifications and Accreditation",
                desc: "Verify the vet is registered with the Royal College of Veterinary Surgeons (RCVS). Check if they have additional certifications or special interests relevant to your pet's needs."
              },
              {
                title: "Location and Accessibility",
                desc: "Choose a practice within 15-20 minutes of your home for emergencies. Check if they have adequate parking and wheelchair accessibility if needed."
              },
              {
                title: "Opening Hours and Emergency Care",
                desc: "Confirm opening hours fit your schedule. Ask about after-hours emergency coverage—do they provide it themselves or refer to an emergency clinic?"
              },
              {
                title: "Range of Services",
                desc: "Ensure they offer the services you need: vaccinations, dental care, surgery, diagnostics (X-ray, blood tests), and specialist referrals when necessary."
              },
              {
                title: "Modern Facilities and Equipment",
                desc: "Visit the practice to assess cleanliness, modern equipment, and overall organisation. A well-maintained practice indicates professional standards."
              },
              {
                title: "Communication Style",
                desc: "The vet should listen to your concerns, explain diagnoses clearly, discuss treatment options, and answer questions patiently. Good communication is vital."
              },
              {
                title: "Approach to Your Pet",
                desc: "Observe how the vet handles your pet. They should be gentle, calm, and use fear-free or low-stress handling techniques. Your pet's comfort matters."
              },
              {
                title: "Transparent Pricing",
                desc: "The practice should provide clear estimates for procedures, explain costs upfront, and discuss payment options or pet insurance acceptance."
              },
              {
                title: "Team Continuity",
                desc: "Ask if you can see the same vet for appointments to build continuity of care. Seeing the same vet helps with accurate diagnosis and trust."
              },
              {
                title: "Reviews and Reputation",
                desc: "Read online reviews, ask local pet owners, and check the practice's social media. Look for consistent positive feedback about care quality and compassion."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-background dark:bg-cpCharcoal rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-cpAqua flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">{item.title}</h3>
                  <p className="text-muted-foreground dark:text-cpCream/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Questions to Ask */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Award className="h-8 w-8 text-cpAmber" />
            Important Questions to Ask
          </h2>
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 mb-6 border border-cpAmber/20">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">What are your emergency procedures?</strong>
                  <p className="text-muted-foreground dark:text-cpCream/70 mt-1">Understand what happens if your pet needs urgent care outside office hours.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">Do you have experience with my pet's breed or species?</strong>
                  <p className="text-muted-foreground dark:text-cpCream/70 mt-1">Some breeds have specific health concerns; experience matters.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">What diagnostic equipment do you have on-site?</strong>
                  <p className="text-muted-foreground dark:text-cpCream/70 mt-1">In-house X-ray, ultrasound, and lab testing mean faster diagnoses.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">How do you handle referrals to specialists?</strong>
                  <p className="text-muted-foreground dark:text-cpCream/70 mt-1">Access to specialist care (cardiology, oncology, orthopaedics) is important.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">What is your approach to preventive care?</strong>
                  <p className="text-muted-foreground dark:text-cpCream/70 mt-1">Look for vets who prioritise prevention through regular check-ups and health plans.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-foreground dark:text-cpCream">Do you accept pet insurance?</strong>
                  <p className="text-muted-foreground dark:text-cpCream/70 mt-1">Many practices work directly with insurers to simplify claims.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="my-16 bg-gradient-to-br from-cpCoral/10 to-cpAqua/10 dark:from-cpCoral/5 dark:to-cpAqua/5 rounded-2xl p-8 text-center border border-border dark:border-cpAmber/20">
          <h3 className="text-2xl font-display font-bold text-foreground dark:text-cpCream mb-4">
            Compare Vets in Your Area
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/70 mb-6 max-w-2xl mx-auto">
            Browse veterinary practices, read reviews from other pet owners, and find the perfect vet for your furry friend.
          </p>
          <Link
            href="/en/search?category=veterinary"
            className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Browse Veterinary Practices
          </Link>
        </section>

        {/* First Visit Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Making the Most of Your First Visit
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Bring Medical Records",
                desc: "Bring any existing medical records, vaccination certificates, and a list of current medications. This helps the vet understand your pet's history."
              },
              {
                title: "Prepare Your Questions",
                desc: "Write down questions about diet, behaviour, preventive care, or any concerns. A good vet welcomes questions and provides thorough answers."
              },
              {
                title: "Observe the Environment",
                desc: "Notice the cleanliness, organisation, and how staff interact with pets and owners. The atmosphere should be calm and professional."
              },
              {
                title: "Assess Communication",
                desc: "Pay attention to how the vet explains things. Do they use plain language? Do they seem rushed or attentive? Communication style matters."
              },
              {
                title: "Watch Pet Interaction",
                desc: "Observe how your pet reacts to the vet and staff. While some nervousness is normal, your pet should be handled gently and compassionately."
              },
              {
                title: "Discuss Costs Upfront",
                desc: "Don't hesitate to ask about costs for treatments, procedures, or ongoing care. A transparent practice will provide clear estimates."
              }
            ].map((tip, index) => (
              <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 shadow-sm border border-border dark:border-cpAmber/20">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-cpAmber" />
                  {tip.title}
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/70">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Red Flags */}
        <section className="mb-12 bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
            Warning Signs to Watch For
          </h2>
          <ul className="space-y-3">
            {[
              "The practice is consistently dirty or disorganised",
              "Staff are rude, dismissive, or impatient with you or your pet",
              "The vet rushes through appointments without listening to your concerns",
              "Costs are unclear or you receive unexpected charges without explanation",
              "Your pet shows extreme fear or distress at the practice",
              "The vet discourages questions or second opinions",
              "Emergency protocols are vague or non-existent",
              "Multiple negative reviews mention the same issues (poor care, high costs, misdiagnosis)",
              "The vet pushes unnecessary treatments or products aggressively",
              "No clear policy on continuing education or staying current with veterinary medicine"
            ].map((flag, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-foreground dark:text-cpCream">{flag}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Internal Links */}
        <section className="mb-12 bg-cpAqua/5 dark:bg-cpAqua/5 rounded-2xl p-6 border border-cpAqua/20">
          <h3 className="font-semibold text-foreground dark:text-cpCream mb-4">Related Articles:</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/en/guide/professional-services/choosing-groomer" className="text-cpCoral hover:text-cpAqua hover:underline">
                → How to Choose a Pet Groomer: Complete Guide
              </Link>
            </li>
            <li>
              <Link href="/en/guide/professional-services/pet-boarding-vs-sitter" className="text-cpCoral hover:text-cpAqua hover:underline">
                → Pet Boarding vs Pet Sitter: Which is Best?
              </Link>
            </li>
            <li>
              <Link href="/en/guide/professional-services/dog-walking-service" className="text-cpCoral hover:text-cpAqua hover:underline">
                → Dog Walking Services: What You Need to Know
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
                q: "How often should I take my pet to the vet?",
                a: "Healthy adult pets should have annual check-ups. Puppies and kittens need more frequent visits for vaccinations (every 3-4 weeks until 16 weeks old). Senior pets (7+ years for dogs, 10+ for cats) benefit from twice-yearly check-ups to catch age-related issues early."
              },
              {
                q: "Should I register with a vet before I need one?",
                a: "Absolutely. Registering before emergencies arise means your pet's records are ready, and you've established a relationship with the practice. Many vets offer free initial consultations for new clients to discuss preventive care."
              },
              {
                q: "Can I change vets if I'm not happy?",
                a: "Yes, you can change vets at any time. Request your pet's medical records (you're entitled to them) and transfer them to your new practice. Most vets understand changes happen and won't take it personally."
              },
              {
                q: "What's the difference between a vet and a veterinary nurse?",
                a: "Veterinarians have completed a degree in veterinary medicine and can diagnose, prescribe medication, and perform surgery. Veterinary nurses are qualified to assist with treatments, nursing care, and minor procedures under a vet's supervision."
              },
              {
                q: "Is it worth getting pet insurance?",
                a: "Pet insurance can save thousands in unexpected veterinary bills. It's most cost-effective when taken out for young, healthy pets. Ask your vet which insurers they work with and compare policies carefully for coverage, exclusions, and excess fees."
              },
              {
                q: "What should I do in a veterinary emergency?",
                a: "Call your vet immediately—even outside hours, there's usually an emergency number. Explain the situation clearly. If your regular vet doesn't offer emergency care, they'll direct you to the nearest emergency clinic. Keep this number saved in your phone."
              }
            ].map((faq, index) => (
              <details key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 shadow-sm group border border-border dark:border-cpAmber/20">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <CheckCircle2 className="h-5 w-5 text-cpAqua group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-muted-foreground dark:text-cpCream/70 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 bg-gradient-to-r from-cpAqua to-cpCoral rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Find Your Perfect Veterinarian Today
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Explore trusted veterinary practices in your area. Compare services, read reviews, and book appointments with confidence.
          </p>
          <Link
            href="/en/search?category=veterinary"
            className="inline-flex items-center gap-2 bg-white text-cpAqua rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Explore Veterinary Practices
          </Link>
        </section>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Find the Right Vet: Complete Guide",
            "description": "Expert guide to finding the best veterinarian for your pet. Learn what to look for, questions to ask, and how to choose quality veterinary care.",
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
              "@id": "https://cutiepawspedia.com/en/guide/professional-services/finding-vet"
            },
            "inLanguage": "en",
            "keywords": ["find veterinarian", "choosing a vet", "veterinary care", "pet health", "vet checklist"]
          })
        }}
      />
    </main>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { Footprints, CheckCircle2, AlertCircle, Star, MapPin, Clock, Users, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Dog Walking Services: What to Know | CutiePawsPedia",
  description: "Complete guide to choosing professional dog walking services. Learn about costs, what to look for, safety tips, and how to find the best dog walker.",
  alternates: {
    languages: {
      'nl': '/nl/gids/professionele-diensten/hondenuitlaatservice',
      'en': '/en/guide/professional-services/dog-walking-service',
    },
  },
  openGraph: {
    title: "Dog Walking Services: What You Need to Know",
    description: "Expert guide to professional dog walking services. Discover costs, safety tips, and how to choose the right walker for your dog.",
    type: "article",
  },
};

export default function DogWalkingServicePage() {
  return (
    <main className="min-h-screen bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpAqua/10 via-cpAmber/5 to-transparent border-b border-border dark:border-cpAmber/20 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpAqua/10 dark:bg-cpAqua/20 rounded-xl">
              <Footprints className="h-8 w-8 text-cpAqua" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground dark:text-cpCream">
              Dog Walking Services: What to Know
            </h1>
          </div>
          <p className="text-xl text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Professional dog walkers provide exercise, mental stimulation, and socialisation for your dog when you can't. Discover what to look for and how to choose a safe, reliable service.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpAmber/10 dark:bg-cpAmber/5">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground dark:text-cpCream mb-4">
            Find trusted dog walking services in your area
          </p>
          <Link
            href="/en/search?category=dog-walking"
            className="inline-flex items-center gap-2 bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MapPin className="h-5 w-5" />
            Find Dog Walkers Near You
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Why Use a Dog Walker */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Why Use a Professional Dog Walker?
          </h2>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
            Dogs need regular exercise to stay physically and mentally healthy. A professional dog walker ensures your dog gets the activity they need, even when your schedule doesn't allow it.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Consistent Exercise",
                desc: "Dogs thrive on routine. Regular walks at predictable times help maintain physical health, healthy weight, and reduce anxiety-related behaviours."
              },
              {
                title: "Mental Stimulation",
                desc: "Walks provide sensory enrichment through new smells, sights, and sounds. This mental stimulation prevents boredom and destructive behaviours at home."
              },
              {
                title: "Socialisation",
                desc: "Group walks allow your dog to interact with other dogs in a controlled environment, improving social skills and confidence around other animals."
              },
              {
                title: "Toilet Breaks",
                desc: "Regular midday walks prevent accidents at home and support healthy bladder and digestive function, especially important for puppies and senior dogs."
              },
              {
                title: "Peace of Mind",
                desc: "Knowing your dog is getting proper care and exercise while you're at work or travelling reduces guilt and worry about their wellbeing."
              },
              {
                title: "Professional Monitoring",
                desc: "Experienced walkers notice changes in behaviour, mobility, or health and can alert you to potential issues before they become serious."
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

        {/* What to Look For */}
        <section className="mb-12 bg-card dark:bg-cpSurface/50 rounded-2xl p-8 shadow-md border border-border dark:border-cpAmber/20">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Essential Qualities in a Dog Walker
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Insurance and Licensing",
                desc: "The walker must have public liability insurance covering accidents, injuries, or property damage. Check if they're licensed if your area requires it."
              },
              {
                title: "Experience and Training",
                desc: "Look for walkers with pet first aid training, experience with various breeds and temperaments, and knowledge of dog behaviour and body language."
              },
              {
                title: "Clear Communication",
                desc: "Reliable walkers provide regular updates (photos, texts), promptly respond to messages, and clearly communicate any issues or concerns about your dog."
              },
              {
                title: "Professional References",
                desc: "Ask for references from current or previous clients. Check online reviews and testimonials. A reputable walker will happily provide contact information."
              },
              {
                title: "Secure Equipment",
                desc: "They should use quality leads, harnesses, and safety equipment. For group walks, they must have secure transport (crates, seatbelts) for all dogs."
              },
              {
                title: "Understanding of Your Dog",
                desc: "Good walkers take time to understand your dog's personality, energy level, triggers, and special needs. They adapt their approach to each individual dog."
              },
              {
                title: "Emergency Preparedness",
                desc: "They should have a clear emergency protocol, carry a pet first aid kit, know the location of nearby emergency vets, and have your emergency contact details."
              },
              {
                title: "Reliability and Punctuality",
                desc: "Professional walkers arrive on time, stick to agreed schedules, and have backup coverage if they're sick or unavailable."
              },
              {
                title: "Small Group Sizes",
                desc: "For group walks, ask about maximum group size. Smaller groups (4-6 dogs) allow better supervision and control than large packs."
              },
              {
                title: "Background Checks",
                desc: "Reputable services conduct background checks on their walkers. You're trusting them with your home keys and beloved pet."
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

        {/* Types of Dog Walking Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Users className="h-8 w-8 text-cpAmber" />
            Types of Dog Walking Services
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 border border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 text-lg">Solo Walks</h3>
              <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                One-on-one walks where your dog gets the walker's full attention. Best for reactive dogs, puppies in training, senior dogs, or those with special needs.
              </p>
              <p className="text-sm text-cpAmber font-semibold">Typical cost: £12-£20 per 30-minute walk</p>
            </div>

            <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-xl p-6 border border-cpAqua/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 text-lg">Group Walks</h3>
              <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                Small groups of compatible dogs walked together. Provides socialisation and is more affordable. Dogs should be vetted for temperament compatibility.
              </p>
              <p className="text-sm text-cpAqua font-semibold">Typical cost: £10-£15 per 30-minute walk</p>
            </div>

            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-6 border border-cpCoral/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 text-lg">Adventure Walks</h3>
              <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                Longer excursions to parks, trails, or beaches. Usually 1-2 hours with opportunities for off-lead running, swimming, and extensive exploration.
              </p>
              <p className="text-sm text-cpCoral font-semibold">Typical cost: £20-£35 per 60-minute walk</p>
            </div>

            <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-6 border border-cpCoral/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 text-lg">Puppy Visits</h3>
              <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                Short, frequent visits for puppies who can't go on long walks yet. Includes toilet breaks, play, training reinforcement, and socialisation.
              </p>
              <p className="text-sm text-cpCoral font-semibold">Typical cost: £8-£15 per 20-minute visit</p>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="my-16 bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 dark:from-cpAqua/5 dark:to-cpCoral/5 rounded-2xl p-8 text-center border border-border dark:border-cpAmber/20">
          <h3 className="text-2xl font-display font-bold text-foreground dark:text-cpCream mb-4">
            Find Professional Dog Walkers in Your Area
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/70 mb-6 max-w-2xl mx-auto">
            Compare dog walking services, read reviews from other dog owners, and find insured, experienced walkers near you.
          </p>
          <Link
            href="/en/search?category=dog-walking"
            className="inline-flex items-center gap-2 bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Browse Dog Walking Services
          </Link>
        </section>

        {/* Safety Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-cpCoral" />
            Safety Tips and Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Trial Walk Together",
                desc: "Accompany the walker on the first walk to observe how they handle your dog, check routes, and ensure you're comfortable with their methods."
              },
              {
                title: "Update ID Tags",
                desc: "Ensure your dog's collar has current contact information and consider adding the walker's number as a backup contact."
              },
              {
                title: "Share Medical Information",
                desc: "Provide details about medications, allergies, phobias, and any health conditions. Give the walker your vet's contact information."
              },
              {
                title: "Establish Clear Boundaries",
                desc: "Communicate where the walker can go, which dogs your dog can socialise with, and any behaviours or situations to avoid."
              },
              {
                title: "Secure Your Home",
                desc: "Use lockboxes for keys rather than leaving them hidden. Consider security cameras to monitor pickups and drop-offs."
              },
              {
                title: "Check Insurance Coverage",
                desc: "Verify the walker's insurance covers your specific situation. Consider getting additional pet insurance that covers walker-related incidents."
              }
            ].map((tip, index) => (
              <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 shadow-sm border border-border dark:border-cpAmber/20">
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-cpCoral" />
                  {tip.title}
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/70">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Questions to Ask */}
        <section className="mb-12 bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Important Questions to Ask
          </h2>
          <ul className="space-y-3">
            {[
              "Do you have public liability insurance and what does it cover?",
              "What is your training and experience with dogs?",
              "What is your cancellation policy if I don't need a walk?",
              "How do you handle emergencies (injury, escape, aggressive dog encounters)?",
              "What routes do you take and do you vary them?",
              "How many dogs do you walk at once in group walks?",
              "Do you have backup if you're unavailable?",
              "What equipment do you use (leads, harnesses, GPS trackers)?",
              "How do you handle bad weather?",
              "Will you send updates and photos during walks?",
              "Are you pet first aid certified?",
              "What happens if my dog doesn't get along with others in a group?"
            ].map((question, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground dark:text-cpCream/70">{question}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Red Flags */}
        <section className="mb-12 bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
            Red Flags: When to Look Elsewhere
          </h2>
          <ul className="space-y-3">
            {[
              "No insurance or unwilling to provide proof of coverage",
              "Cannot provide references or has consistently negative reviews",
              "Walks excessively large groups (more than 6 dogs)",
              "Allows dogs off-lead in unsafe areas (near roads, unfenced areas)",
              "Doesn't ask about your dog's temperament, health, or training",
              "Uses harsh training methods or punishment-based techniques",
              "Poor communication or frequently unreliable",
              "Won't allow you to accompany them on a trial walk",
              "Charges significantly less than market rate (may indicate lack of insurance or professionalism)",
              "Doesn't have a contract or clear terms of service",
              "Seems rushed or impatient with your dog during meetings",
              "Your dog shows fear or reluctance around them"
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
              <Link href="/en/guide/professional-services/pet-boarding-vs-sitter" className="text-cpCoral hover:text-cpAqua hover:underline">
                → Pet Boarding vs Pet Sitter: Which is Best?
              </Link>
            </li>
            <li>
              <Link href="/en/guide/professional-services/pet-behaviourist" className="text-cpCoral hover:text-cpAqua hover:underline">
                → When to See a Pet Behaviourist
              </Link>
            </li>
            <li>
              <Link href="/en/guide/professional-services/finding-vet" className="text-cpCoral hover:text-cpAqua hover:underline">
                → How to Find the Right Vet for Your Pet
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
                q: "How long should a dog walk be?",
                a: "Most dogs need at least 30-60 minutes of walking daily, split into two walks. High-energy breeds may need 90-120 minutes. Puppies need shorter, more frequent walks (5 minutes per month of age, twice daily). Senior dogs may need shorter, gentler walks."
              },
              {
                q: "Should I choose solo or group walks?",
                a: "Solo walks are best for reactive dogs, those in training, puppies, or dogs with special needs. Group walks work well for social, friendly dogs who enjoy playing with others. Consider your dog's temperament, training level, and socialisation needs."
              },
              {
                q: "How often should my dog be walked?",
                a: "Most adult dogs need at least one walk daily, ideally two. Working breeds and high-energy dogs benefit from twice-daily walks. Puppies need 3-4 short walks or toilet breaks. Consider your dog's breed, age, and energy level."
              },
              {
                q: "What if my dog walker cancels?",
                a: "Professional services should have backup walkers or provide reasonable notice. Establish the cancellation policy upfront. For regular walks, consider having a backup walker or service in case of emergencies."
              },
              {
                q: "Can I track my dog during walks?",
                a: "Many modern dog walkers use GPS tracking apps that let you see your dog's route in real-time. Some provide post-walk reports with distance, duration, and photos. Ask if this service is available."
              },
              {
                q: "What if my dog is aggressive or reactive?",
                a: "Inform potential walkers about any reactivity or aggression. Look for walkers experienced with reactive dogs who use positive reinforcement methods. Solo walks may be necessary. Consider working with a behaviourist alongside walking services."
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
        <section className="mt-16 bg-gradient-to-r from-cpAqua to-cpAmber rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Find Reliable Dog Walkers Today
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Browse professional dog walking services in your area. Compare prices, read reviews, and book trusted walkers with confidence.
          </p>
          <Link
            href="/en/search?category=dog-walking"
            className="inline-flex items-center gap-2 bg-white text-cpAqua rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Explore Dog Walking Services
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
            "headline": "Dog Walking Services: What You Need to Know",
            "description": "Complete guide to choosing professional dog walking services. Learn about costs, what to look for, safety tips, and how to find the best dog walker.",
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
              "@id": "https://cutiepawspedia.com/en/guide/professional-services/dog-walking-service"
            },
            "inLanguage": "en",
            "keywords": ["dog walking", "dog walker", "pet services", "dog exercise", "professional dog walker"]
          })
        }}
      />
    </main>
  );
}

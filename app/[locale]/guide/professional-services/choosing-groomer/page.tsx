import { Metadata } from "next";
import Link from "next/link";
import { Scissors, CheckCircle2, AlertCircle, Star, MapPin, Euro, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Choose a Pet Groomer: Complete Guide | CutiePawsPedia",
  description: "Expert guide to choosing the best pet groomer for your dog or cat. Checklist, pricing, and tips for professional grooming services in your area.",
  alternates: {
    languages: {
      'nl': '/nl/gids/professionele-diensten/trimsalon-kiezen',
      'en': '/en/guide/professional-services/choosing-groomer',
    },
  },
  openGraph: {
    title: "How to Choose a Pet Groomer: Complete Guide",
    description: "Discover what to look for when choosing a pet groomer. Includes checklist, pricing guide and expert tips for the best care.",
    type: "article",
  },
};

export default function ChoosingGroomerPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent border-b border-border dark:border-cpAmber/20 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpCoral/10 dark:bg-cpCoral/20 rounded-xl">
              <Scissors className="h-8 w-8 text-cpCoral" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground dark:text-cpCream">
              How to Choose a Pet Groomer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            A good pet groomer doesn't just make your pet look beautiful—they ensure your pet's wellbeing and comfort. Discover what to look for when making the right choice.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpAmber/10 dark:bg-cpAmber/5">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground dark:text-cpCream mb-4">
            Looking for a trusted pet groomer in your area?
          </p>
          <Link
            href="/en/search?category=grooming"
            className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MapPin className="h-5 w-5" />
            Find Groomers Near You
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Why a good groomer matters */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Award className="h-8 w-8 text-cpAqua" />
            Why Choosing the Right Groomer Matters
          </h2>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
            A grooming salon is more than just a place where your pet gets a haircut. It's an environment where your dog or cat needs to feel safe and comfortable. A professional groomer has knowledge of different breeds, coat types, and animal behaviour.
          </p>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
            A negative grooming experience can lead to fear and stress, making future visits difficult. That's why it's essential to choose a groomer who not only works professionally but also prioritises your pet's welfare.
          </p>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Regular grooming isn't just about aesthetics—it's crucial for your pet's health. Proper grooming prevents matted fur, skin infections, overgrown nails, and ear problems. A skilled groomer can also spot early signs of health issues such as lumps, parasites, or skin conditions.
          </p>
        </section>

        {/* Checklist Section */}
        <section className="mb-12 bg-card dark:bg-cpSurface/50 rounded-2xl p-8 shadow-md border border-border dark:border-cpAmber/20">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Checklist: What to Look For
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Certification and Training",
                desc: "Check if the groomer has completed recognised training and is a member of professional organisations such as the National Dog Groomers Association (NDGA) or similar bodies."
              },
              {
                title: "Hygiene and Safety",
                desc: "Pay attention to the cleanliness of the salon, tidy workspaces, and proper equipment. A good groomer uses disinfected scissors, clippers, and grooming tools between clients."
              },
              {
                title: "Calm and Safe Environment",
                desc: "The salon shouldn't be too busy or noisy. Dogs and cats need to be able to relax during their grooming session. Look for separate areas for anxious pets."
              },
              {
                title: "Transparent Pricing",
                desc: "A trustworthy groomer communicates clearly about costs upfront, including any additional treatments such as de-matting, nail trimming, or specialised shampoos."
              },
              {
                title: "Breed-Specific Experience",
                desc: "Ask if the groomer has experience with your pet's specific breed. Some breeds require specialised grooming techniques, such as hand-stripping for terriers or breed-specific clips for poodles."
              },
              {
                title: "Positive Handling Methods",
                desc: "A good groomer works with positive reinforcement and patience, especially with anxious or young animals. They should never use force or harsh restraints."
              },
              {
                title: "Reviews and Recommendations",
                desc: "Read online reviews from other pet owners and ask for recommendations from your local pet community. Check social media for before-and-after photos showcasing their work."
              },
              {
                title: "Insurance and First Aid",
                desc: "Professional groomers should have liability insurance and basic pet first aid training in case of accidents or medical emergencies."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-background dark:bg-cpCharcoal rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-cpCoral flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">{item.title}</h3>
                  <p className="text-muted-foreground dark:text-cpCream/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Euro className="h-8 w-8 text-cpAmber" />
            What Do Grooming Services Cost?
          </h2>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
            Grooming costs vary widely depending on your pet's size, coat type, and the salon's location. Here are typical UK price ranges you can expect:
          </p>
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 mb-6 border border-cpAmber/20">
            <ul className="space-y-3">
              <li className="flex justify-between items-center py-2 border-b border-border dark:border-cpAmber/20">
                <span className="font-medium text-foreground dark:text-cpCream">Small Dog (e.g. Yorkshire Terrier)</span>
                <span className="text-cpAqua font-semibold">£30 - £45</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-border dark:border-cpAmber/20">
                <span className="font-medium text-foreground dark:text-cpCream">Medium Dog (e.g. Cocker Spaniel)</span>
                <span className="text-cpAqua font-semibold">£45 - £65</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-border dark:border-cpAmber/20">
                <span className="font-medium text-foreground dark:text-cpCream">Large Dog (e.g. Golden Retriever)</span>
                <span className="text-cpAqua font-semibold">£65 - £95</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span className="font-medium text-foreground dark:text-cpCream">Cat (Long Hair)</span>
                <span className="text-cpAqua font-semibold">£35 - £55</span>
              </li>
            </ul>
          </div>
          <p className="text-muted-foreground dark:text-cpCream/70">
            <strong>Note:</strong> Additional services such as de-matting, teeth cleaning, or specialised shampoos can increase the price. Always ask for a quote beforehand and enquire about package deals for regular appointments.
          </p>
        </section>

        {/* Secondary CTA */}
        <section className="my-16 bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 dark:from-cpAqua/5 dark:to-cpCoral/5 rounded-2xl p-8 text-center border border-border dark:border-cpAmber/20">
          <h3 className="text-2xl font-display font-bold text-foreground dark:text-cpCream mb-4">
            Find the Best Groomer in Your City
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/70 mb-6 max-w-2xl mx-auto">
            Compare grooming services, read reviews from other pet owners, and find a certified groomer near you.
          </p>
          <Link
            href="/en/search?category=grooming"
            className="inline-flex items-center gap-2 bg-cpAqua text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Browse Groomers in Your Area
          </Link>
        </section>

        {/* Tips for first visit */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Tips for Your First Grooming Visit
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Book a Meet-and-Greet",
                desc: "Let your pet meet the groomer and familiarise themselves with the environment before the actual grooming session begins. This reduces anxiety significantly."
              },
              {
                title: "Stay Calm and Positive",
                desc: "Your pet picks up on your emotions. Stay relaxed and positive to prevent transferring stress. Consider leaving if your presence makes your pet more anxious."
              },
              {
                title: "Communicate Clearly",
                desc: "Inform the groomer about any fears, health issues, or special needs your pet has. Mention any sensitive areas, previous bad experiences, or medication they're taking."
              },
              {
                title: "Bring Reference Photos",
                desc: "Show example photos of your desired grooming style so the groomer knows exactly what you expect. Be realistic about what's achievable for your pet's coat type."
              },
              {
                title: "Start with Basic Services",
                desc: "For nervous pets, begin with simple services like a bath and brush before progressing to full grooming. This builds positive associations gradually."
              },
              {
                title: "Exercise Beforehand",
                desc: "A tired pet is often calmer. Take your dog for a walk or play with your cat before the appointment to help them relax during grooming."
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

        {/* Red flags */}
        <section className="mb-12 bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
            Red Flags: When to Look Elsewhere
          </h2>
          <ul className="space-y-3">
            {[
              "The salon is unhygienic or cluttered with dirty equipment",
              "You're not allowed to stay with your pet during grooming (without clear explanation)",
              "The groomer handles animals roughly or impatiently",
              "No clear pricing is provided or hidden fees are added later",
              "Negative reviews mentioning injuries or severe stress in pets",
              "The groomer has no certification, insurance, or professional training",
              "Your pet shows extreme fear or reluctance to enter the salon",
              "The groomer refuses to discuss their methods or answer your questions",
              "Animals are kept in cramped cages for extended periods",
              "No emergency procedures or first aid kit is available"
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
                → How to Find the Right Vet: Tips and Checklist
              </Link>
            </li>
            <li>
              <Link href="/en/guide/professional-services/pet-boarding-vs-sitter" className="text-cpAqua hover:text-cpCoral hover:underline">
                → Pet Boarding vs Pet Sitter: Which is Best for You?
              </Link>
            </li>
            <li>
              <Link href="/en/guide/professional-services/pet-behaviourist" className="text-cpAqua hover:text-cpCoral hover:underline">
                → When to See a Pet Behaviourist: Expert Guide
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
                q: "How often should I groom my dog?",
                a: "It depends on the breed and coat type. Dogs with hair that grows continuously, like Poodles and Shih Tzus, need grooming every 6-8 weeks. Dogs with hand-stripped coats like Terriers are typically groomed 3-4 times per year. Consult your groomer for a schedule tailored to your dog's needs."
              },
              {
                q: "Can I stay during the grooming session?",
                a: "This varies by salon. Some groomers are happy for you to watch, while others prefer you wait elsewhere because some pets are calmer without their owner present. Discuss this beforehand, especially if your pet has separation anxiety."
              },
              {
                q: "What should I do if my dog is scared of the groomer?",
                a: "Discuss the fear with the groomer in advance. A good professional will work with positive reinforcement and take their time. Sometimes multiple short introductory visits help before the actual grooming begins. Consider reward-based training to build positive associations."
              },
              {
                q: "What's the difference between clipping, stripping, and scissoring?",
                a: "Hand-stripping involves plucking dead hair by hand (for wire coats). Clipping uses electric clippers and is common for breeds with continuously growing hair. Scissoring uses scissors to shape and style the coat. Your dog's breed determines the most appropriate method."
              },
              {
                q: "Should I tip my pet groomer?",
                a: "Tipping is appreciated but not required in the UK. If you're pleased with the service, a 10-15% tip or a small gift shows your appreciation. Some people prefer to leave positive reviews instead."
              },
              {
                q: "Can I groom my pet at home?",
                a: "Basic maintenance like brushing, nail trimming, and bathing can be done at home with proper tools and training. However, breed-specific cuts, de-matting, and specialised techniques are best left to professionals to avoid injury or poor results."
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
        <section className="mt-16 bg-gradient-to-r from-cpCoral to-cpAmber rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-bold mb-4">
            Find the Perfect Groomer Today
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Discover all pet services in your area, including certified groomers, veterinarians, and pet care professionals.
          </p>
          <Link
            href="/en/search"
            className="inline-flex items-center gap-2 bg-white text-cpCoral rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Explore All Pet Services
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
            "headline": "How to Choose a Pet Groomer: Complete Guide",
            "description": "Expert guide to choosing the best pet groomer for your dog or cat. Checklist, pricing, and tips for professional grooming services in your area.",
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
              "@id": "https://cutiepawspedia.com/en/guide/professional-services/choosing-groomer"
            },
            "inLanguage": "en",
            "keywords": ["pet groomer", "dog grooming", "cat grooming", "groomer checklist", "grooming prices"]
          })
        }}
      />
    </main>
  );
}

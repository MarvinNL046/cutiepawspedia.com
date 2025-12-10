import { Metadata } from "next";
import Link from "next/link";
import { Brain, CheckCircle2, AlertCircle, Star, MapPin, MessageCircle, Award, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "When to See a Pet Behaviourist: Expert Guide | CutiePawsPedia",
  description: "Learn when your pet needs a behaviourist, what they do, how to choose one, and what to expect. Expert guide to solving pet behaviour problems professionally.",
  alternates: {
    languages: {
      'nl': '/nl/gids/professionele-diensten/dierengedragstherapeut',
      'en': '/en/guide/professional-services/pet-behaviourist',
    },
  },
  openGraph: {
    title: "When to See a Pet Behaviourist: Expert Guide",
    description: "Discover when your pet needs professional behaviour help, what behaviourists do, and how to choose the right one for your pet.",
    type: "article",
  },
};

export default function PetBehaviouristPage() {
  return (
    <main className="min-h-screen bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAqua/5 to-transparent border-b border-border dark:border-cpAmber/20 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cpCoral/10 dark:bg-cpCoral/20 rounded-xl">
              <Brain className="h-8 w-8 text-cpCoral" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground dark:text-cpCream">
              When to See a Pet Behaviourist
            </h1>
          </div>
          <p className="text-xl text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Struggling with your pet's behaviour? A certified animal behaviourist can help address aggression, anxiety, destructive habits, and other complex behavioural issues that affect your pet's quality of life.
          </p>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="py-8 bg-cpAqua/10 dark:bg-cpAqua/5">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-lg text-foreground dark:text-cpCream mb-4">
            Find qualified pet behaviourists in your area
          </p>
          <Link
            href="/en/search?category=training"
            className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MapPin className="h-5 w-5" />
            Find Pet Behaviourists Near You
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* What is a Pet Behaviourist */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            What is a Pet Behaviourist?
          </h2>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
            A pet behaviourist is a professional who specialises in understanding and modifying animal behaviour. Unlike trainers who teach specific commands, behaviourists address underlying psychological and emotional issues causing problem behaviours.
          </p>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
            Certified behaviourists typically have degrees in animal behaviour, psychology, or veterinary science, plus extensive practical experience. They use evidence-based methods rooted in learning theory and behavioural science to create customised treatment plans.
          </p>
          <div className="bg-cpAqua/10 dark:bg-cpAqua/5 rounded-xl p-6 border border-cpAqua/20">
            <h3 className="font-semibold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-cpAqua" />
              Difference Between Behaviourists and Trainers
            </h3>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/70">
              <li><strong>Pet Trainers:</strong> Teach obedience, commands, and basic manners. Focus on skills like sit, stay, recall, and loose-lead walking.</li>
              <li><strong>Pet Behaviourists:</strong> Address complex psychological issues like aggression, phobias, separation anxiety, and compulsive behaviours. Work on the root causes.</li>
              <li><strong>When to See Each:</strong> See trainers for obedience and manners. See behaviourists for serious behaviour problems affecting quality of life or safety.</li>
            </ul>
          </div>
        </section>

        {/* When to Seek Help */}
        <section className="mb-12 bg-card dark:bg-cpSurface/50 rounded-2xl p-8 shadow-md border border-border dark:border-cpAmber/20">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Signs You Need a Behaviourist
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Aggression Towards People or Animals",
                desc: "Biting, lunging, growling, or threatening behaviour towards family members, strangers, or other pets. This is a safety concern requiring immediate professional help."
              },
              {
                title: "Severe Separation Anxiety",
                desc: "Destructive behaviour when left alone, excessive barking or howling, house soiling, escape attempts, or self-harm. Signs of genuine distress, not just boredom."
              },
              {
                title: "Extreme Fear or Phobias",
                desc: "Debilitating fear of thunderstorms, fireworks, car rides, or other triggers causing panic attacks, hiding, trembling, or inability to function normally."
              },
              {
                title: "Compulsive Behaviours",
                desc: "Repetitive actions like excessive licking, tail chasing, pacing, or light chasing that interfere with daily life and don't respond to distraction."
              },
              {
                title: "Resource Guarding",
                desc: "Aggressive protection of food, toys, furniture, or people. Growling, snapping, or biting when approached while eating or in possession of items."
              },
              {
                title: "Reactivity on Walks",
                desc: "Intense reactions to other dogs, people, cars, or bikes making walks stressful or impossible. Barking, lunging, or freezing when triggers appear."
              },
              {
                title: "House Soiling Despite Training",
                desc: "Persistent house soiling in adult pets after medical issues are ruled out. May indicate anxiety, marking, or incomplete house training."
              },
              {
                title: "Sudden Behaviour Changes",
                desc: "Abrupt personality shifts, new aggressive behaviours, or unusual fearfulness. Rule out medical causes first, then seek behavioural help."
              },
              {
                title: "Self-Destructive Behaviours",
                desc: "Self-mutilation, excessive scratching, over-grooming causing bald patches or sores, or other behaviours causing physical harm."
              },
              {
                title: "Failed Training Attempts",
                desc: "You've tried multiple trainers or methods without improvement. Complex issues need specialised behavioural intervention, not just more training."
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

        {/* What to Look For */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Award className="h-8 w-8 text-cpAmber" />
            How to Choose a Qualified Behaviourist
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Professional Certification",
                desc: "Look for credentials like ABTC (Animal Behaviour and Training Council), APBC (Association of Pet Behaviour Counsellors), or CCAB (Certified Clinical Animal Behaviourist). These require education and examinations."
              },
              {
                title: "Relevant Education",
                desc: "Ideally a degree in animal behaviour, psychology, zoology, or veterinary science. Advanced degrees (MSc, PhD) in behaviour are even better for complex cases."
              },
              {
                title: "Evidence-Based Methods",
                desc: "They should use scientifically proven techniques based on learning theory and positive reinforcement. Avoid those using outdated dominance-based or punishment methods."
              },
              {
                title: "Veterinary Collaboration",
                desc: "Reputable behaviourists work with vets to rule out medical causes and coordinate treatment. Some require a vet referral before accepting cases."
              },
              {
                title: "Clear Treatment Plans",
                desc: "After assessment, they should provide a written behaviour modification plan with specific goals, timelines, and measurable progress indicators."
              },
              {
                title: "Ongoing Support",
                desc: "Behaviour modification takes time. Good behaviourists offer follow-up sessions, phone support, and adjustments to the plan as needed."
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
        <section className="my-16 bg-gradient-to-br from-cpCoral/10 to-cpAqua/10 dark:from-cpCoral/5 dark:to-cpAqua/5 rounded-2xl p-8 text-center border border-border dark:border-cpAmber/20">
          <h3 className="text-2xl font-display font-bold text-foreground dark:text-cpCream mb-4">
            Get Professional Help for Your Pet
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/70 mb-6 max-w-2xl mx-auto">
            Don't struggle alone with serious behaviour issues. Find certified behaviourists who can create effective treatment plans.
          </p>
          <Link
            href="/en/search?category=training"
            className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Browse Pet Behaviourists
          </Link>
        </section>

        {/* What to Expect */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-cpAqua" />
            What to Expect from Behaviour Therapy
          </h2>
          <div className="space-y-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">1.</span> Initial Consultation
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/70">
                Comprehensive assessment (1-2 hours) including detailed history, observation of your pet, discussion of triggers and patterns. The behaviourist may visit your home to see the environment. Expect questions about diet, exercise, daily routine, and family dynamics.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpAqua">2.</span> Behaviour Modification Plan
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/70">
                Written treatment plan with specific techniques, training exercises, environmental modifications, and management strategies. May include desensitisation, counter-conditioning, or other evidence-based protocols tailored to your pet's specific issues.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpAmber">3.</span> Implementation Period
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/70">
                You'll work on the plan at home with regular follow-up appointments (weekly, fortnightly, or monthly). The behaviourist monitors progress, adjusts the plan, and provides support. Most programmes last 3-6 months, though complex cases may need longer.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                <span className="text-cpCoral">4.</span> Costs and Investment
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/70">
                Initial consultations: £150-£300. Follow-up sessions: £60-£120 per hour. Complete programmes: £500-£2,000 depending on complexity and duration. While expensive, it's often the only effective solution for serious issues and prevents rehoming or euthanasia.
              </p>
            </div>
          </div>
        </section>

        {/* Tips for Success */}
        <section className="mb-12 bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-6 border border-cpAmber/20">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6">
            Tips for Successful Behaviour Modification
          </h2>
          <ul className="space-y-3">
            {[
              "Be patient—behaviour change takes time, often months. Quick fixes rarely work for complex issues.",
              "Consistency is crucial. All family members must follow the same plan and use the same techniques.",
              "Keep detailed records of triggers, incidents, and progress. This helps the behaviourist adjust the plan.",
              "Manage the environment to prevent rehearsal of problem behaviours while working on solutions.",
              "Don't skip follow-up appointments. Regular check-ins are essential for adjusting the approach.",
              "Rule out medical issues first. Pain, hormones, or illness can cause behaviour changes.",
              "Celebrate small wins. Progress may be gradual, but every improvement matters.",
              "Stay committed even when it's challenging. Giving up means the problem will continue or worsen."
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground dark:text-cpCream/70">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Red Flags */}
        <section className="mb-12 bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
            Warning Signs of Unqualified Practitioners
          </h2>
          <ul className="space-y-3">
            {[
              "No recognised qualifications or certifications in animal behaviour",
              "Use of dominance theory, alpha rolls, or punishment-based methods",
              "Guarantees quick fixes or promises immediate results",
              "Refuses to work with your veterinarian or dismisses medical causes",
              "Uses tools like shock collars, prong collars, or choke chains",
              "Blames the owner or pet rather than addressing underlying causes",
              "One-size-fits-all approach without individualised assessment",
              "No written treatment plan or clear goals",
              "Unwilling to explain their methods or provide scientific basis",
              "Charges for unnecessary ongoing sessions without progress",
              "Negative reviews mentioning worsening behaviour or traumatised pets",
              "Defensive or hostile when questioned about their approach"
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
                q: "Can't I just fix behaviour problems myself?",
                a: "Simple issues like basic obedience can often be addressed with training. However, serious problems like aggression, severe anxiety, or compulsive behaviours have complex underlying causes requiring professional expertise. DIY approaches can worsen these issues or create safety risks."
              },
              {
                q: "How long does behaviour therapy take?",
                a: "It varies widely. Simple issues may improve in 4-8 weeks. Complex problems like severe aggression or deep-rooted fears can take 6-12 months or longer. Success depends on consistency, severity, your pet's history, and the entire household's commitment to the programme."
              },
              {
                q: "Will medication be prescribed?",
                a: "Behaviourists who aren't veterinarians cannot prescribe medication. However, they may recommend consulting your vet about anti-anxiety medication or other pharmaceuticals to support behaviour modification. Medication is often used alongside training, not as a replacement."
              },
              {
                q: "What if the behaviourist's methods don't work?",
                a: "Good behaviourists adjust their approach if initial methods aren't effective. If you've given the plan a fair trial (usually several months) without progress, discuss alternative strategies or seek a second opinion from another certified behaviourist."
              },
              {
                q: "Is behaviour modification stressful for my pet?",
                a: "Done correctly using positive, force-free methods, behaviour modification should reduce stress over time. The process involves gradual exposure at levels your pet can handle. Avoid practitioners who cause distress or use intimidation tactics."
              },
              {
                q: "Can old dogs learn new behaviours?",
                a: "Absolutely. The saying 'you can't teach an old dog new tricks' is a myth. Older pets can learn and change behaviour at any age, though it may take longer if the problem behaviour is well-established. Age is not a barrier to successful behaviour modification."
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
            Get Expert Help for Behaviour Problems
          </h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Don't wait for behaviour issues to escalate. Find certified pet behaviourists who can help your pet live a happier, more balanced life.
          </p>
          <Link
            href="/en/search?category=training"
            className="inline-flex items-center gap-2 bg-white text-cpCoral rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Find Pet Behaviourists
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
            "headline": "When to See a Pet Behaviourist: Expert Guide",
            "description": "Learn when your pet needs a behaviourist, what they do, how to choose one, and what to expect. Expert guide to solving pet behaviour problems professionally.",
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
              "@id": "https://cutiepawspedia.com/en/guide/professional-services/pet-behaviourist"
            },
            "inLanguage": "en",
            "keywords": ["pet behaviourist", "animal behaviour", "dog aggression", "pet anxiety", "behaviour modification"]
          })
        }}
      />
    </main>
  );
}

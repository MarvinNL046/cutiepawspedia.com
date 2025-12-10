import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Check, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Trim Your Dog's Nails Safely | Step-by-Step Guide",
  description: "Learn how to trim your dog's nails safely at home with our expert guide. Discover the best tools, techniques, and tips to prevent pain and anxiety.",
  keywords: "trim dog nails, dog nail clipping, cut dog nails safely, dog nail care, dog grooming, nail trimmer for dogs",
  alternates: {
    canonical: "/en/guide/dog-care/trimming-dog-nails",
    languages: {
      en: "/en/guide/dog-care/trimming-dog-nails",
      nl: "/nl/gids/hondenverzorging/hondennagels-knippen",
    },
  },
  openGraph: {
    title: "How to Trim Your Dog's Nails Safely | Step-by-Step Guide",
    description: "Expert advice on trimming dog nails at home. Learn proper techniques, tools, and tips to make nail trimming stress-free.",
    url: "/en/guide/dog-care/trimming-dog-nails",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function TrimmingDogNailsPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How to Trim Your Dog's Nails Safely | Step-by-Step Guide",
            description: "Learn how to trim your dog's nails safely at home with our expert guide. Discover the best tools, techniques, and tips to prevent pain and anxiety.",
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
            publisher: {
              "@type": "Organization",
              name: "CutiePawsPedia",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            datePublished: "2025-01-08",
            dateModified: "2025-01-08",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/30 dark:border-cpCoral/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Essential Dog Care</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight">
            How to Trim Your Dog's Nails Safely
          </h1>
          <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
            Master the art of safe nail trimming with our comprehensive step-by-step guide. Learn the right tools, techniques, and confidence-building tips to make nail care stress-free for you and your dog.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-background dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Introduction */}
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Nail trimming is one of the most important yet often overlooked aspects of dog care. Overgrown nails can cause pain, affect your dog's gait, lead to joint problems, and even result in painful splitting or tearing. However, many dog owners feel anxious about trimming nails themselves, worried about cutting too much and hitting the quick (the blood vessel inside the nail).
            </p>

            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-8">
              The good news is that with the right tools, knowledge, and technique, you can safely trim your dog's nails at home. This guide will walk you through everything you need to know, from understanding nail anatomy to mastering the trimming process and dealing with anxious dogs.
            </p>

            {/* CTA #1 - Primary */}
            <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20 rounded-2xl p-6 border-l-4 border-cpCoral mb-12">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                ✂️ Prefer Professional Nail Trimming?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Find professional groomers and veterinary clinics offering nail trimming services in your area. Quick, stress-free appointments available.
              </p>
              <Link
                href="/en/search?category=grooming"
                className="inline-flex items-center gap-2 bg-cpCoral text-white px-6 py-3 rounded-xl font-semibold hover:bg-cpCoral/90 transition-all"
              >
                Find Nail Trimming Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Why Nail Trimming Matters */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Why Regular Nail Trimming Is Essential
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Many people underestimate the importance of keeping dog nails at the proper length. Here's why regular trimming should be a priority:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🦴</span>
                  Prevents Joint Problems
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Long nails force dogs to walk on the backs of their paws, altering their natural gait. Over time, this can lead to arthritis, joint pain, and skeletal issues as the body compensates for the unnatural posture.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">😣</span>
                  Reduces Pain and Discomfort
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Overgrown nails can curl under and grow into paw pads, causing severe pain and infection. They also put pressure on nail beds and toe joints with every step, making walking uncomfortable.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🩹</span>
                  Prevents Injuries
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Long nails are prone to snagging on carpets, furniture, or outdoor surfaces, which can lead to painful tears. Broken or split nails often require veterinary attention and antibiotics.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
                  <span className="text-2xl">🏠</span>
                  Protects Your Home
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Short, well-maintained nails mean less scratching damage to floors, furniture, and people. They also make that characteristic "clicking" sound on hard floors much quieter.
                </p>
              </div>
            </div>

            {/* Understanding Nail Anatomy */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Understanding Dog Nail Anatomy
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Before you pick up the clippers, it's crucial to understand the structure of your dog's nails. This knowledge will help you trim safely and confidently.
            </p>

            <div className="bg-gradient-to-br from-cpAmber/5 to-cpCoral/5 dark:from-cpAmber/10 dark:to-cpCoral/10 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/30 mb-8">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
                Key Parts of the Nail
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">The Quick</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      The pink area inside the nail containing blood vessels and nerves. Cutting into the quick is painful and causes bleeding. In white/clear nails, it's visible as a pink line. In dark nails, it's hidden and harder to see.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cpAmber flex items-center justify-center text-cpCharcoal font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">The Shell</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      The hard outer casing of the nail that you'll be trimming. This is the insensitive part that's safe to cut. In white nails, it appears white or translucent. In dark nails, it's black or brown.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">The Dewclaw</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      The "thumb" nail located higher up on the inside of the leg. Not all dogs have dewclaws, but those that do need them trimmed regularly as they don't naturally wear down from walking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border-l-4 border-blue-500 mb-12">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Important: The Quick Grows with the Nail
              </h4>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                If your dog's nails have been allowed to grow very long, the quick has likely grown long too. You can't immediately trim nails back to the ideal length in one session. Instead, trim small amounts regularly (every week), which encourages the quick to recede gradually.
              </p>
            </div>

            {/* Essential Tools */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Essential Nail Trimming Tools
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Having the right tools makes nail trimming easier, safer, and more comfortable for your dog. Here's what you need:
            </p>

            <div className="space-y-6 mb-12">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  1. Nail Clippers (Choose One Type)
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Guillotine-Style Clippers</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Single blade that cuts when you squeeze. Insert nail through hole and squeeze handle. Best for small to medium dogs with thinner nails.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground dark:text-cpCream mb-2">Scissor-Style Clippers</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Look like scissors with curved blades. Most popular choice. Works well for all dog sizes. Easier to control and see what you're cutting.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-cpCoral font-medium">
                  💰 Cost: £8-25. Invest in quality clippers with sharp blades for clean cuts.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  2. Nail File or Dremel Tool
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                  Used to smooth sharp edges after clipping. A regular nail file works, but an electric nail grinder (Dremel) provides a smoother finish and allows for very precise trimming. Some dogs tolerate grinding better than clipping.
                </p>
                <p className="text-sm text-cpCoral font-medium">
                  💰 Cost: £3 for file, £20-50 for electric grinder
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  3. Styptic Powder or Cornstarch
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                  Essential for stopping bleeding if you accidentally cut the quick. Styptic powder works faster, but cornstarch or flour from your kitchen also works in a pinch. Apply with firm pressure to the bleeding nail.
                </p>
                <p className="text-sm text-cpCoral font-medium">
                  💰 Cost: £5-10 (keep in your dog first aid kit)
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  4. Good Lighting and Treats
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Work in a well-lit area so you can see what you're doing clearly. Have high-value treats ready to reward your dog's cooperation and create positive associations with nail trimming.
                </p>
              </div>
            </div>

            {/* CTA #2 - Secondary */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-12">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                🛒 Shop for Quality Grooming Supplies
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-4">
                Find pet supply shops offering professional-grade nail clippers, grinders, and grooming tools. Compare options and get expert recommendations.
              </p>
              <Link
                href="/en/search?category=pet-shops"
                className="inline-flex items-center gap-2 text-cpCoral font-semibold hover:text-cpCoral/80 transition-colors"
              >
                Browse Pet Supply Shops
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Step-by-Step Guide */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Step-by-Step Nail Trimming Guide
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Follow these steps for safe, effective nail trimming. Take your time, especially if this is your first attempt or if your dog is nervous.
            </p>

            <div className="space-y-6 mb-12">
              {[
                {
                  step: 1,
                  title: "Get Your Dog Comfortable",
                  content: "Choose a quiet time and place. If your dog is small, sit with them on your lap or on a table. For larger dogs, have them lie down. Practice touching their paws without clipping first, rewarding calm behaviour with treats.",
                },
                {
                  step: 2,
                  title: "Examine the Nails",
                  content: "Hold your dog's paw gently but firmly. Look at each nail to identify where the quick ends (easier with light-colored nails). Check for any damage, infections, or unusual growth patterns.",
                },
                {
                  step: 3,
                  title: "Position the Clippers",
                  content: "Hold the paw steady and position the clippers perpendicular to the nail, not parallel. Cut from underneath the nail at a slight angle, following the natural curve. This prevents splitting and splintering.",
                },
                {
                  step: 4,
                  title: "Make Small Cuts",
                  content: "Trim just a small amount at first - you can always cut more, but you can't put it back! For white nails, stop before the pink quick. For dark nails, look for a small dark circle in the centre of the cut surface (that's the beginning of the quick - stop here).",
                },
                {
                  step: 5,
                  title: "Check Your Progress",
                  content: "After each small cut, look at the nail's cross-section. When you start to see a grey or pink oval in the centre surrounded by white, you're approaching the quick. Stop trimming that nail.",
                },
                {
                  step: 6,
                  title: "File the Edges",
                  content: "Use a nail file or grinder to smooth any sharp edges. This prevents scratching and makes the nail more comfortable for your dog. File in one direction rather than back-and-forth.",
                },
                {
                  step: 7,
                  title: "Don't Forget the Dewclaws",
                  content: "If your dog has dewclaws (the nails higher up on the inside of the legs), trim these too. They can grow into a circle and pierce the skin if neglected.",
                },
                {
                  step: 8,
                  title: "Reward Generously",
                  content: "Give treats and praise throughout the process, especially after completing each paw. End on a positive note to build good associations with nail trimming.",
                },
              ].map((item) => (
                <div key={item.step} className="bg-gradient-to-r from-cpAmber/5 to-transparent dark:from-cpAmber/10 border-l-4 border-cpAmber rounded-r-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cpAmber to-cpCoral flex items-center justify-center text-white font-bold text-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-cpCream/80">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* What If You Cut the Quick */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-2xl p-6 border-l-4 border-red-500 mb-12">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                What to Do If You Cut the Quick
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Don't panic! This happens to most people at some point. Here's what to do:
              </p>
              <ol className="space-y-2 text-muted-foreground dark:text-cpCream/80 mb-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-500">1.</span>
                  <span><strong>Stay calm</strong> - Your dog will pick up on your anxiety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-500">2.</span>
                  <span><strong>Apply styptic powder</strong> or cornstarch to the bleeding nail with firm pressure for 30 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-500">3.</span>
                  <span><strong>Keep your dog calm</strong> and prevent them from licking the nail for a few minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-500">4.</span>
                  <span><strong>Monitor the nail</strong> - If bleeding doesn't stop within 5-10 minutes, contact your vet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-red-500">5.</span>
                  <span><strong>Resume later</strong> - Give treats and try again another day when everyone has calmed down</span>
                </li>
              </ol>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
                Remember: Cutting the quick is painful but not dangerous. The bleeding looks worse than it is. Your dog will forgive you!
              </p>
            </div>

            {/* How Often to Trim */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              How Often Should You Trim Dog Nails?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              The ideal trimming frequency depends on how quickly your dog's nails grow and how much natural wear they experience from walking.
            </p>

            <div className="bg-gradient-to-br from-cpCoral/5 to-cpAmber/5 dark:from-cpCoral/10 dark:to-cpAmber/10 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/30 mb-8">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">General Guidelines:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Most dogs:</strong> Every 3-4 weeks
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Active dogs on hard surfaces:</strong> Every 4-6 weeks (nails wear down naturally)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Less active or small dogs:</strong> Every 2-3 weeks (less natural wear)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cpCoral flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Senior dogs:</strong> More frequent checks (nails often become thicker and grow faster)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border-l-4 border-blue-500 mb-12">
              <h4 className="font-bold text-foreground dark:text-cpCream mb-2">
                💡 The Sound Test
              </h4>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                If you can hear your dog's nails clicking on hard floors, they're too long and need trimming. Ideally, nails should just barely clear the ground when your dog is standing.
              </p>
            </div>

            {/* Tips for Anxious Dogs */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Tips for Anxious or Resistant Dogs
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Many dogs dislike having their nails trimmed, especially if they've had a negative experience. Use these techniques to build positive associations:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: "Desensitisation Training",
                  desc: "Spend a week just touching and holding paws with treats, no clipping. Then a week touching nails with clippers without cutting. Gradually build up tolerance.",
                },
                {
                  title: "One Nail at a Time",
                  desc: "Don't feel pressured to do all four paws in one session. Start with just one nail, reward heavily, and stop. Gradually increase as your dog becomes comfortable.",
                },
                {
                  title: "Use a Helper",
                  desc: "Have someone hold and distract your dog with treats or a licking mat whilst you trim. This makes the process faster and more positive.",
                },
                {
                  title: "Try Different Tools",
                  desc: "Some dogs prefer grinders to clippers or vice versa. Experiment to find what your dog tolerates best.",
                },
                {
                  title: "Tire Them Out First",
                  desc: "Trim nails after a long walk or play session when your dog is naturally calmer and more tired.",
                },
                {
                  title: "Create Positive Associations",
                  desc: "Always follow nail trimming with something your dog loves - a special treat, favourite game, or meal time.",
                },
              ].map((tip, index) => (
                <div key={index} className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA #3 - Bottom */}
            <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Professional Help Is Always Available
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                If nail trimming is too stressful for you or your dog, professional groomers and vets offer quick, affordable nail trimming services. No judgment - just happy, healthy paws!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/en/search?category=grooming"
                  className="inline-flex items-center justify-center gap-2 bg-white text-cpCoral px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg"
                >
                  <TrendingUp className="w-5 h-5" />
                  Find Groomers Near You
                </Link>
                <Link
                  href="/en/guide/dog-care"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all border-2 border-white/40"
                >
                  More Dog Care Tips
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Conclusion */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Final Thoughts
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Trimming your dog's nails safely is a skill that improves with practice. Start slowly, be patient with yourself and your dog, and don't be afraid to seek professional help if needed. Remember that every dog owner has cut the quick at some point - it's a learning experience, not a failure.
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              The most important thing is to maintain regular nail care, whether you do it yourself or use a professional service. Well-maintained nails contribute significantly to your dog's comfort, mobility, and overall quality of life.
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              If your dog becomes extremely stressed despite desensitisation training, or if you notice any signs of nail infection, unusual growth, or persistent bleeding, consult your veterinarian. They can assess for underlying health issues and provide additional guidance.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-border dark:border-cpAmber/20">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
              Related Dog Care Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/en/guide/dog-care/best-dog-brushes" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                  Best Dog Brushes
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Find the perfect brush for your dog's coat type
                </p>
              </Link>
              <Link href="/en/guide/dog-care/bathing-dog-tips" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                  Dog Bathing Tips
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Complete guide to bathing your dog properly
                </p>
              </Link>
              <Link href="/en/guide/dog-care/brushing-dog-teeth" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                  Brushing Dog Teeth
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Essential dental care for your dog's health
                </p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

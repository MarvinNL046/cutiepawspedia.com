import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Dog Brushes for Every Coat Type | Complete Grooming Guide",
  description: "Discover the best dog brushes for short, long, curly, and double coats. Expert recommendations for slicker brushes, pin brushes, deshedding tools, and more.",
  keywords: "best dog brushes, dog grooming brush, slicker brush, pin brush, deshedding tool, dog coat care, grooming tools",
  alternates: {
    canonical: "/en/guide/dog-care/best-dog-brushes",
    languages: {
      en: "/en/guide/dog-care/best-dog-brushes",
      nl: "/nl/gids/hondenverzorging/beste-hondenborstels",
    },
  },
  openGraph: {
    title: "Best Dog Brushes for Every Coat Type | Complete Grooming Guide",
    description: "Expert recommendations for choosing the perfect dog brush based on coat type. Keep your dog's coat healthy and beautiful.",
    url: "/en/guide/dog-care/best-dog-brushes",
    siteName: "CutiePawsPedia",
    type: "article",
  },
};

export default function BestDogBrushesPage() {
  return (
    <>
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Best Dog Brushes for Every Coat Type | Complete Grooming Guide",
            description: "Discover the best dog brushes for short, long, curly, and double coats. Expert recommendations for slicker brushes, pin brushes, deshedding tools, and more.",
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
      <section className="relative bg-gradient-to-br from-cpAmber/10 via-cpCoral/5 to-transparent dark:from-cpAmber/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAmber/10 dark:bg-cpAmber/20 border border-cpAmber/30 dark:border-cpAmber/20 mb-6">
            <Sparkles className="w-4 h-4 text-cpAmber" />
            <span className="text-sm font-medium text-cpAmber">Grooming Essentials</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight">
            Best Dog Brushes for Every Coat Type
          </h1>
          <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
            Expert recommendations for choosing the perfect dog brush based on coat type. Discover slicker brushes, pin brushes, deshedding tools, and more to keep your dog looking and feeling their best.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-background dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Introduction */}
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Regular brushing is one of the most important aspects of dog grooming. It removes loose fur, prevents matting, distributes natural oils, and helps you spot skin issues early. However, not all dog brushes are created equal - the best brush for your dog depends entirely on their coat type.
            </p>

            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-8">
              Using the wrong brush can be ineffective or even uncomfortable for your dog. In this comprehensive guide, we'll explore the different types of dog brushes available and help you choose the perfect grooming tools for your furry friend's specific coat.
            </p>

            {/* CTA #1 - Primary */}
            <div className="bg-gradient-to-br from-cpAmber/10 to-cpCoral/10 dark:from-cpAmber/20 dark:to-cpCoral/20 rounded-2xl p-6 border-l-4 border-cpAmber mb-12">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                ✂️ Need Professional Grooming Services?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Find expert dog groomers in your area. Browse verified reviews, compare prices, and book professional grooming appointments with confidence.
              </p>
              <Link
                href="/en/search?category=grooming"
                className="inline-flex items-center gap-2 bg-cpAmber text-cpCharcoal px-6 py-3 rounded-xl font-semibold hover:bg-cpAmber/90 transition-all"
              >
                Find Groomers Near You
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Understanding Dog Coat Types */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Understanding Dog Coat Types
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Before choosing a brush, it's essential to understand your dog's coat type. Dogs have remarkably diverse coat textures, lengths, and densities, each requiring specific grooming tools.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🐕 Short Smooth Coat
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3 italic">
                  Examples: Beagle, Boxer, Dalmatian, Labrador
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  Short, close-lying hair that sheds moderately year-round. Easy to maintain but still requires regular brushing.
                </p>
                <div className="bg-cpAmber/10 dark:bg-cpAmber/20 rounded-lg p-3 text-sm text-muted-foreground dark:text-cpCream/80">
                  <strong>Best brushes:</strong> Bristle brush, rubber curry brush, grooming mitt
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🦮 Double Coat
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3 italic">
                  Examples: German Shepherd, Husky, Golden Retriever, Corgi
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  Dense undercoat beneath longer guard hairs. Heavy seasonal shedding ("blowing coat"). Requires frequent brushing.
                </p>
                <div className="bg-cpAmber/10 dark:bg-cpAmber/20 rounded-lg p-3 text-sm text-muted-foreground dark:text-cpCream/80">
                  <strong>Best brushes:</strong> Undercoat rake, slicker brush, deshedding tool
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  💇 Long Silky Coat
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3 italic">
                  Examples: Yorkshire Terrier, Maltese, Afghan Hound, Shih Tzu
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  Fine, flowing hair that grows continuously. Prone to tangles and matting. Needs daily brushing.
                </p>
                <div className="bg-cpAmber/10 dark:bg-cpAmber/20 rounded-lg p-3 text-sm text-muted-foreground dark:text-cpCream/80">
                  <strong>Best brushes:</strong> Pin brush, slicker brush, metal comb
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🌀 Curly/Wavy Coat
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3 italic">
                  Examples: Poodle, Bichon Frise, Portuguese Water Dog
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  Tightly curled or wavy hair that doesn't shed much but mats easily. Regular professional grooming recommended.
                </p>
                <div className="bg-cpAmber/10 dark:bg-cpAmber/20 rounded-lg p-3 text-sm text-muted-foreground dark:text-cpCream/80">
                  <strong>Best brushes:</strong> Slicker brush, pin brush, wide-tooth comb
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🔆 Wire/Wiry Coat
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3 italic">
                  Examples: Terriers, Schnauzers, Wire Fox Terrier
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  Coarse, dense outer coat over softer undercoat. May require hand-stripping for show dogs.
                </p>
                <div className="bg-cpAmber/10 dark:bg-cpAmber/20 rounded-lg p-3 text-sm text-muted-foreground dark:text-cpCream/80">
                  <strong>Best brushes:</strong> Slicker brush, bristle brush, stripping knife (for show dogs)
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  🦁 Combination Coat
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3 italic">
                  Examples: Cocker Spaniel, Border Collie, Setter breeds
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  Different hair lengths and textures on various parts of the body. Requires multiple brush types.
                </p>
                <div className="bg-cpAmber/10 dark:bg-cpAmber/20 rounded-lg p-3 text-sm text-muted-foreground dark:text-cpCream/80">
                  <strong>Best brushes:</strong> Pin brush, slicker brush, metal comb combination
                </div>
              </div>
            </div>

            {/* Types of Dog Brushes Explained */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Types of Dog Brushes Explained
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-8">
              Now that you understand coat types, let's explore the different brush varieties and their specific uses. Each type is designed for particular grooming tasks.
            </p>

            {/* Slicker Brush */}
            <div className="bg-gradient-to-r from-cpCoral/5 to-transparent dark:from-cpCoral/10 border-l-4 border-cpCoral rounded-r-xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                1. Slicker Brush
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Fine wire bristles set close together on a flat or slightly curved surface. The most versatile and commonly used brush type.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Best For:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Removing tangles and mats</li>
                    <li>• Long, silky, and curly coats</li>
                    <li>• Double coats (outer layer)</li>
                    <li>• Finishing and fluffing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2">How to Use:</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Use gentle, short strokes in the direction of hair growth. Don't press too hard - let the bristles do the work. Particularly effective after bathing to prevent matting whilst drying.
                  </p>
                </div>
              </div>
            </div>

            {/* Pin Brush */}
            <div className="bg-gradient-to-r from-cpAmber/5 to-transparent dark:from-cpAmber/10 border-l-4 border-cpAmber rounded-r-xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                2. Pin Brush
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Resembles a human hairbrush with metal pins that may have rounded tips. Gentler than a slicker brush.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Best For:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Long, silky coats</li>
                    <li>• Curly and wavy coats</li>
                    <li>• Daily maintenance brushing</li>
                    <li>• Finishing and fluffing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2">How to Use:</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Brush in sections from skin to tip, working through the coat gently. Ideal for daily grooming to prevent tangles before they become mats. Many dogs find pin brushing relaxing.
                  </p>
                </div>
              </div>
            </div>

            {/* Bristle Brush */}
            <div className="bg-gradient-to-r from-cpCoral/5 to-transparent dark:from-cpCoral/10 border-l-4 border-cpCoral rounded-r-xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                3. Bristle Brush
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Natural or synthetic bristles packed closely together. The most basic and gentle brush type.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Best For:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Short, smooth coats</li>
                    <li>• Puppies (gentle introduction)</li>
                    <li>• Finishing all coat types</li>
                    <li>• Distributing natural oils</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2">How to Use:</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Brush in the direction of hair growth with smooth strokes. Perfect for adding shine and removing surface dirt. Use firmer bristles for coarser coats, softer for sensitive skin.
                  </p>
                </div>
              </div>
            </div>

            {/* Undercoat Rake */}
            <div className="bg-gradient-to-r from-cpAmber/5 to-transparent dark:from-cpAmber/10 border-l-4 border-cpAmber rounded-r-xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                4. Undercoat Rake
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Long metal teeth designed to penetrate through the topcoat to remove loose undercoat fur.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Best For:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Double-coated breeds</li>
                    <li>• Seasonal shedding periods</li>
                    <li>• Thick, dense coats</li>
                    <li>• Preventing matting in undercoat</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2">How to Use:</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Work in sections, pulling the rake gently through the coat. Essential during spring and autumn when double-coated breeds "blow" their undercoat. Use 1-2 times weekly during heavy shedding.
                  </p>
                </div>
              </div>
            </div>

            {/* Deshedding Tool */}
            <div className="bg-gradient-to-r from-cpCoral/5 to-transparent dark:from-cpCoral/10 border-l-4 border-cpCoral rounded-r-xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
                5. Deshedding Tool
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Specialised tool with a metal edge that removes loose fur from the undercoat. Very effective but should be used carefully.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Best For:
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/80">
                    <li>• Heavy shedders</li>
                    <li>• Double coats</li>
                    <li>• Reducing indoor shedding</li>
                    <li>• Weekly deep grooming</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground dark:text-cpCream mb-2">How to Use:</h4>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Use once weekly maximum. Brush in the direction of hair growth with light pressure. Avoid sensitive areas and broken skin. Don't use on dogs with single coats, curly coats, or continuously growing hair.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA #2 - Secondary */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-12">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">
                🛍️ Shop for Quality Grooming Tools
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-4">
                Find trusted pet supply shops offering professional-grade grooming tools. Compare prices, read reviews, and get expert recommendations.
              </p>
              <Link
                href="/en/search?category=pet-shops"
                className="inline-flex items-center gap-2 text-cpCoral font-semibold hover:text-cpCoral/80 transition-colors"
              >
                Browse Pet Supply Shops
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Additional Brush Types */}
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Other Useful Grooming Tools
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  Metal Comb
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                  Essential for detailing work, finding hidden mats, and working through tangles. Choose wide teeth for thick coats, fine teeth for facial areas.
                </p>
                <div className="text-xs text-cpCoral font-medium">Perfect for: Finishing touches, face and paws</div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  Rubber Curry Brush
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                  Flexible rubber nubs that massage whilst removing loose hair. Great for bath time and sensitive dogs who dislike metal bristles.
                </p>
                <div className="text-xs text-cpCoral font-medium">Perfect for: Short coats, massage, bathing</div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  Grooming Mitt
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                  Glove with rubber or silicone nubs that lets you brush whilst petting. Perfect for dogs nervous about traditional brushes.
                </p>
                <div className="text-xs text-cpCoral font-medium">Perfect for: Anxious dogs, bonding time, quick touch-ups</div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">
                  Dematting Tool
                </h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                  Specialised blades that cut through mats and tangles without pulling. Use with caution near skin and on severe mats only.
                </p>
                <div className="text-xs text-cpCoral font-medium">Perfect for: Removing stubborn mats, rescue situations</div>
              </div>
            </div>

            {/* Brushing Frequency Guide */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              How Often Should You Brush Your Dog?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Brushing frequency depends on coat type, length, and lifestyle. Here's a general guide to keep your dog's coat in optimal condition.
            </p>

            <div className="bg-gradient-to-br from-cpAmber/5 to-cpCoral/5 dark:from-cpAmber/10 dark:to-cpCoral/10 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/30 mb-12">
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-border dark:border-cpAmber/20">
                  <div className="text-3xl">📅</div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">Daily Brushing</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Long-haired breeds (Yorkshire Terriers, Maltese), curly coats (Poodles, Doodles), and dogs prone to matting. Also during heavy shedding seasons for all breeds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-border dark:border-cpAmber/20">
                  <div className="text-3xl">📅</div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">3-4 Times Per Week</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Medium-length coats (Cocker Spaniels, Setters), double coats during normal seasons (Golden Retrievers, Huskies).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-border dark:border-cpAmber/20">
                  <div className="text-3xl">📅</div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">2-3 Times Per Week</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Short-haired double coats (German Shepherds, Labradors), wire coats (Terriers, Schnauzers).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">📅</div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">Weekly Brushing</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                      Short smooth coats (Beagles, Boxers, Bulldogs) during low-shedding periods. Increase frequency during shedding season.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Brushing Technique Tips */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Professional Brushing Techniques
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Using the right technique is just as important as having the right brush. Follow these expert tips for effective, comfortable grooming sessions.
            </p>

            <div className="space-y-4 mb-12">
              {[
                {
                  num: 1,
                  title: "Always brush before bathing",
                  desc: "Wet mats are nearly impossible to remove and tighten as they dry. Brush thoroughly before any bath.",
                },
                {
                  num: 2,
                  title: "Work in sections",
                  desc: "Part the hair and brush from skin to tip in manageable sections. This ensures you reach all layers of the coat.",
                },
                {
                  num: 3,
                  title: "Be gentle but thorough",
                  desc: "Use firm, controlled strokes without pressing too hard. Brushing should never hurt your dog.",
                },
                {
                  num: 4,
                  title: "Brush in the direction of hair growth",
                  desc: "Generally work from head to tail, following natural hair direction. Some finishing techniques may vary.",
                },
                {
                  num: 5,
                  title: "Pay attention to problem areas",
                  desc: "Focus on areas prone to matting: behind ears, armpits, belly, and rear end. Check these spots daily.",
                },
                {
                  num: 6,
                  title: "Use a detangling spray",
                  desc: "For long or curly coats, a leave-in conditioner or detangling spray makes brushing easier and more comfortable.",
                },
                {
                  num: 7,
                  title: "Make it positive",
                  desc: "Offer treats, use a calm voice, and keep sessions short at first. Build up tolerance gradually.",
                },
                {
                  num: 8,
                  title: "Check for skin issues",
                  desc: "While brushing, look for lumps, redness, parasites, or skin problems. Early detection is key.",
                },
              ].map((tip) => (
                <div key={tip.num} className="flex items-start gap-4 p-4 bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cpAmber to-cpCoral flex items-center justify-center text-white font-bold">
                    {tip.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground dark:text-cpCream mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/80">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Signs You Need Professional Help */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 rounded-2xl p-6 border-l-4 border-red-500 mb-12">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
                ⚠️ When to Seek Professional Grooming
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                Some situations are best handled by professional groomers:
              </p>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Severe matting close to the skin (may require clipping)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Dog shows extreme fear or aggression during brushing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Coat requires specialised techniques (hand-stripping, show cuts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>You're unsure how to properly groom your breed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Dog has skin conditions needing medicated shampoos or special care</span>
                </li>
              </ul>
            </div>

            {/* CTA #3 - Bottom */}
            <div className="bg-gradient-to-br from-cpAmber via-cpAmber/90 to-cpCoral rounded-2xl p-8 text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-cpCharcoal mb-3">
                Keep Your Dog Looking Their Best
              </h3>
              <p className="text-cpCharcoal/80 mb-6 max-w-2xl mx-auto">
                From professional groomers to pet supply shops and veterinary advice, find everything you need for optimal dog care in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/en/search?category=grooming"
                  className="inline-flex items-center justify-center gap-2 bg-cpCharcoal text-cpCream px-8 py-4 rounded-xl font-bold hover:bg-cpCharcoal/90 transition-all shadow-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Find Professional Groomers
                </Link>
                <Link
                  href="/en/guide/dog-care"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 text-cpCharcoal px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all border-2 border-cpCharcoal/20"
                >
                  More Grooming Tips
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Conclusion */}
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4 mt-12">
              Final Thoughts
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Choosing the right brush for your dog's coat type is essential for maintaining a healthy, beautiful coat whilst keeping your dog comfortable. Most dogs benefit from having multiple brush types in their grooming kit - a slicker or pin brush for regular maintenance, a metal comb for detailing, and possibly an undercoat rake or deshedding tool for seasonal shedding.
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-6">
              Remember that regular brushing does more than just keep your dog looking good. It distributes natural oils for skin health, provides bonding time, allows you to check for health issues, and significantly reduces the amount of fur around your home. With the right tools and techniques, grooming can become an enjoyable routine for both you and your furry friend.
            </p>
            <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              If you're ever unsure about the best grooming approach for your dog, consult with a professional groomer or your veterinarian. They can provide personalised recommendations based on your dog's specific coat type, lifestyle, and any skin sensitivities.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-border dark:border-cpAmber/20">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
              Related Dog Care Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/en/guide/dog-care/bathing-dog-tips" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                  Dog Bathing Tips
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Complete guide to bathing your dog properly
                </p>
              </Link>
              <Link href="/en/guide/dog-care/trimming-dog-nails" className="group bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">
                  Trimming Dog Nails
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Learn how to safely trim your dog's nails at home
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

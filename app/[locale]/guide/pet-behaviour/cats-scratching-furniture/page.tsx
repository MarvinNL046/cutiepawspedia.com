import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Stop Cats Scratching Furniture | Effective Solutions",
  description: "Discover why cats scratch furniture and proven methods to redirect this natural behaviour. Expert advice on scratch posts, training techniques, and protecting your home.",
  keywords: "cat scratching furniture, stop cat scratching, scratching post, cat behaviour, furniture protection, cat training, scratching solutions, nail caps",
  alternates: {
    languages: {
      'en': '/en/guide/pet-behaviour/cats-scratching-furniture',
      'nl': '/nl/gids/huisdiergedrag/katten-krabben-meubels',
    },
  },
  openGraph: {
    title: "How to Stop Cats Scratching Furniture",
    description: "Protect your furniture whilst satisfying your cat's scratching needs. Evidence-based solutions that actually work. Find cat behaviourists near you.",
    type: "article",
  },
};

export default function CatsScratchingFurniturePage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpAmber/10 via-cpCoral/10 to-cpAqua/10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-8 md:p-12 border border-border dark:border-cpAmber/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAmber/10 border border-cpAmber/30 mb-6">
              <span className="text-2xl">🪑</span>
              <span className="text-sm font-medium text-foreground">Cat Behaviour Specialist</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              How to Stop Cats Scratching Furniture
            </h1>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
              Save your sofa without declawing! Understand why cats scratch and discover proven methods to redirect this essential behaviour whilst protecting your furniture.
            </p>
            <Button
              size="lg"
              className="bg-cpAmber text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform shadow-lg"
              asChild
            >
              <Link href="/en/united-kingdom">
                Find cat behaviourists near you →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
            That sinking feeling when you hear the tell-tale sound of claws on upholstery. Scratched furniture is one of the most common complaints from cat owners - but it's completely preventable. Scratching is essential cat behaviour with multiple important functions. You cannot and should not stop it entirely, but you can absolutely redirect it away from your furniture. This guide explains why cats scratch and provides proven solutions that work with their natural instincts, not against them.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Why Cats Scratch: Understanding the Behaviour
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            It's Not About Sharpening Claws
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Contrary to popular belief, the primary function of scratching isn't nail maintenance. Cats scratch for multiple biological and psychological reasons:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Territory marking:</strong> Scent glands in paw pads deposit pheromones - "This is mine!"</li>
            <li><strong>Visual markers:</strong> Visible scratch marks communicate territorial claims to other cats</li>
            <li><strong>Muscle stretching:</strong> Full body stretch exercises shoulder, back, and leg muscles</li>
            <li><strong>Emotional regulation:</strong> Stress relief, excitement expression, frustration outlet</li>
            <li><strong>Outer claw removal:</strong> Sheds old claw sheaths to reveal sharp new growth underneath</li>
            <li><strong>Attention-seeking:</strong> "Hey human! Notice me!" (if they've learned it gets a reaction)</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Why They Choose Your Furniture
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Your sofa isn't random - cats are selective about scratching surfaces:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Perfect texture:</strong> Fabric provides resistance and satisfying sensation</li>
            <li><strong>Prominent location:</strong> Furniture in main living areas marks important territory</li>
            <li><strong>Your scent:</strong> Mixing their scent with yours creates shared territory</li>
            <li><strong>Stability:</strong> Heavy furniture doesn't move during scratching (unlike cheap scratching posts)</li>
            <li><strong>Habit:</strong> Once established, cats return to familiar scratching locations</li>
            <li><strong>Attention:</strong> You react when they scratch furniture - reinforces the behaviour</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-6 mb-8">
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-3">Important: Never Declaw</h4>
            <p className="text-blue-800 dark:text-blue-300 mb-3">
              Declawing (onychectomy) is the amputation of the last bone of each toe - equivalent to cutting off human fingers at the last knuckle. It causes:
            </p>
            <ul className="space-y-2 text-blue-800 dark:text-blue-300">
              <li>• Chronic pain and arthritis</li>
              <li>• Behaviour changes (increased biting, litter box avoidance)</li>
              <li>• Permanent disability and psychological trauma</li>
            </ul>
            <p className="text-blue-800 dark:text-blue-300 mt-4 font-medium">
              Declawing is banned in many countries as animal cruelty. Every problem has humane solutions.
            </p>
          </div>

          {/* CTA Middle */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 rounded-2xl p-8 my-12 border border-cpAqua/30">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🐱</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  Persistent Scratching Issues?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  A certified cat behaviourist can identify underlying stress or anxiety causing destructive scratching and create a customised behaviour modification plan.
                </p>
                <Button
                  className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
                  asChild
                >
                  <Link href="/en/united-kingdom">
                    Find cat behaviour experts →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Solution 1: Provide Irresistible Scratching Alternatives
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Choosing the Right Scratching Posts
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Most scratching posts fail because they don't meet cats' needs. Here's what works:
          </p>

          <div className="bg-gradient-to-br from-cpAmber/10 to-cpCoral/10 rounded-2xl p-6 mb-8 border border-cpAmber/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Essential Features:</h4>
            <ul className="space-y-3 text-muted-foreground dark:text-cpCream/80">
              <li>• <strong>Tall enough:</strong> Minimum 75cm (30") so cat can fully stretch - most shop-bought posts are too short!</li>
              <li>• <strong>Stable base:</strong> Heavy, wide base or wall-mounted - must not wobble or tip over</li>
              <li>• <strong>Durable material:</strong> Sisal rope (rough texture cats love) or sisal fabric, NOT carpet (too similar to furniture)</li>
              <li>• <strong>Vertical AND horizontal:</strong> Some cats prefer vertical scratching, others horizontal - provide both</li>
              <li>• <strong>Multiple locations:</strong> Minimum one per cat + one extra, in different rooms</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Strategic Placement is Everything
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Where you put scratching posts matters more than the post itself:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Near furniture they already scratch:</strong> Place immediately next to current scratching spot initially</li>
            <li><strong>High-traffic areas:</strong> Main living room, hallways - prominent territorial marking spots</li>
            <li><strong>Near sleeping areas:</strong> Cats scratch after waking for a full-body stretch</li>
            <li><strong>Entry/exit points:</strong> Doorways and windows where they enter/leave rooms</li>
            <li><strong>Don't hide them:</strong> Scratching posts in corners or spare rooms won't be used - territory marking needs visibility</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Making Scratching Posts Irresistible
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Catnip:</strong> Rub dried catnip into sisal rope to attract cats</li>
            <li><strong>Silvervine:</strong> Alternative to catnip - 80% of cats respond (vs 50-70% for catnip)</li>
            <li><strong>Pheromone spray:</strong> Feliway or similar applied to post encourages use</li>
            <li><strong>Play near the post:</strong> Use feather wands, drag toys across post to engage claws naturally</li>
            <li><strong>Reward use:</strong> Treats, praise, and attention when they use the post (not furniture!)</li>
            <li><strong>Lead by example:</strong> Gently take their paws and simulate scratching motion (some cats respond to this demonstration)</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Solution 2: Furniture Protection Strategies
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Physical Deterrents That Work
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Furniture covers:</strong> Thick blankets, furniture throws, or purpose-made anti-scratch covers</li>
            <li><strong>Double-sided tape:</strong> "Sticky Paws" or similar - cats hate sticky textures on paws</li>
            <li><strong>Aluminium foil:</strong> Temporary measure - cats dislike the texture and sound</li>
            <li><strong>Plastic furniture guards:</strong> Clear vinyl corner guards for vulnerable areas</li>
            <li><strong>Scratching deterrent spray:</strong> Citrus or rosemary scents cats find unpleasant</li>
            <li><strong>Motion-activated deterrents:</strong> Compressed air spray when cat approaches (for persistent cases)</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Texture and Fabric Choices
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            When buying new furniture, consider cat-resistant materials:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Best:</strong> Microfibre, ultrasuede, leather (smooth surfaces cats can't grip)</li>
            <li><strong>Avoid:</strong> Woven fabrics, linen, textured upholstery (perfect scratching texture)</li>
            <li><strong>Tight weave:</strong> Tighter weaves resist claw penetration better</li>
            <li><strong>Wood furniture:</strong> Treated hardwood is more scratch-resistant than soft pine</li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Solution 3: Training and Behaviour Modification
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Positive Reinforcement Method
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Step-by-step training process:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Catch them scratching the post:</strong> Wait and watch - the moment they use it...</li>
            <li><strong>Immediate reward:</strong> High-value treat within 2 seconds + enthusiastic praise</li>
            <li><strong>Consistency:</strong> Reward EVERY time they use the post (first 2 weeks)</li>
            <li><strong>Ignore furniture scratching:</strong> No reaction at all - even "NO!" is attention</li>
            <li><strong>Redirect:</strong> If caught scratching furniture, calmly move them to post, encourage use, reward</li>
            <li><strong>Never punish:</strong> Punishment creates fear and stress, often making scratching worse</li>
          </ol>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Managing Attention-Seeking Scratching
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            If your cat scratches furniture whilst staring at you (attention-seeking):
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Complete non-reaction:</strong> Don't look, don't speak, don't chase - zero acknowledgement</li>
            <li><strong>Leave the room:</strong> Removes the reward (your attention)</li>
            <li><strong>Proactive attention:</strong> Give attention when they're being good, not demanding it</li>
            <li><strong>Scheduled play sessions:</strong> 2-3 times daily prevents attention-seeking behaviours</li>
            <li><strong>Puzzle feeders:</strong> Mental stimulation reduces attention-seeking generally</li>
          </ul>

          {/* Section 5 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Solution 4: Nail Management
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Regular Nail Trimming
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Trimmed nails cause less furniture damage:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Frequency:</strong> Every 2-4 weeks for indoor cats</li>
            <li><strong>Trim just the tip:</strong> Only sharp curved end - avoid the pink quick (blood vessel)</li>
            <li><strong>Desensitisation:</strong> Start young, pair with treats, go slowly</li>
            <li><strong>Professional grooming:</strong> If your cat won't tolerate it, use a professional groomer</li>
            <li><strong>Tip:</strong> Trim after play when cat is tired and relaxed</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Nail Caps (Soft Claws/Soft Paws)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Vinyl caps glued over claws - humane alternative to declawing:
          </p>

          <div className="bg-gradient-to-br from-cpAqua/10 to-cpAmber/10 rounded-2xl p-6 mb-8 border border-cpAqua/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Pros and Cons:</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground dark:text-cpCream mb-2">✅ Advantages:</p>
                <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80 ml-4">
                  <li>• Completely protects furniture</li>
                  <li>• Cat can still scratch (satisfies instinct)</li>
                  <li>• Lasts 4-6 weeks before falling off naturally</li>
                  <li>• Painless application</li>
                  <li>• Available in colours (fun!)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground dark:text-cpCream mb-2">❌ Disadvantages:</p>
                <ul className="space-y-1 text-muted-foreground dark:text-cpCream/80 ml-4">
                  <li>• Need reapplication every 4-6 weeks</li>
                  <li>• Some cats find them initially annoying</li>
                  <li>• Can't defend themselves outdoors (indoor-only cats only!)</li>
                  <li>• Requires cooperative cat or professional application</li>
                  <li>• Ongoing cost</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Addressing Underlying Stress and Anxiety
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Excessive scratching can indicate stress or anxiety. Consider:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Environmental changes:</strong> New pet, new baby, house move, renovation work</li>
            <li><strong>Multi-cat conflict:</strong> Territorial disputes increase scratching (territory marking)</li>
            <li><strong>Insufficient resources:</strong> Not enough litter trays, food bowls, hiding spots</li>
            <li><strong>Boredom:</strong> Under-stimulated cats scratch excessively from frustration</li>
            <li><strong>Medical issues:</strong> Pain or discomfort can change scratching patterns - vet check if sudden increase</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Environmental Enrichment Solutions
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Vertical space:</strong> Cat trees, wall shelves, window perches</li>
            <li><strong>Play therapy:</strong> 15-20 minutes interactive play twice daily</li>
            <li><strong>Puzzle feeders:</strong> Foraging toys, treat balls, snuffle mats</li>
            <li><strong>Pheromone diffusers:</strong> Feliway reduces stress-related scratching</li>
            <li><strong>Outdoor access:</strong> Secure catio or supervised harness walks</li>
          </ul>

          {/* Internal Links */}
          <div className="bg-cpCoral/10 border border-cpCoral/30 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Related cat behaviour topics:
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/en/guide/pet-behaviour/anxiety-pets" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Anxiety in Pets: Signs and Solutions
                </Link>
              </li>
              <li>
                <Link href="/en/guide/pet-behaviour/multiple-pets" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Living with Multiple Pets: Introduction and Harmony
                </Link>
              </li>
              <li>
                <Link href="/en/guide/cat-care/cat-enrichment" className="text-cpAqua hover:text-cpCoral transition-colors font-medium">
                  → Indoor Cat Enrichment: Keeping Your Cat Happy
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Frequently Asked Questions About Cat Scratching
          </h2>

          <div className="space-y-4 mb-12">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How long does it take to redirect scratching to posts?
                <span className="text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                With the right scratching posts in optimal locations and consistent positive reinforcement, most cats will begin using posts within 1-2 weeks. Complete redirection can take 4-8 weeks. The longer furniture scratching has been established, the longer it takes to change. Key factors: post quality, placement near furniture they already scratch, and rewarding every post use whilst making furniture unappealing. Don't give up - persistence pays off!
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My cat ignores the scratching post - what am I doing wrong?
                <span className="text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Common mistakes: (1) Post too short - cats can't fully stretch, (2) Wobbly base - cats avoid unstable posts, (3) Hidden location - needs to be in prominent area they already scratch, (4) Wrong material - carpet-covered posts too similar to furniture, sisal is better, (5) Not enough posts - need multiple locations, (6) Giving up too soon - takes time to change habits. Try multiple post types (vertical, horizontal, angled), different materials (sisal rope vs fabric), and strategic placement. Rub catnip or silvervine into post and reward enthusiastically when they investigate.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Can I train an older cat to stop scratching furniture?
                <span className="text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Absolutely! Whilst it's easier to establish good scratching habits with kittens, adult and senior cats can definitely learn new behaviours. It just requires more patience and consistency. The same principles apply: provide excellent scratching alternatives, make furniture unappealing, and reward post use. Older cats may have more established habits (taking longer to change) but they're perfectly capable of learning. Some older cats actually respond better to training because they're calmer and more food-motivated than young cats.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is it cruel to use spray deterrents on furniture?
                <span className="text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                No, using scent deterrents (citrus, rosemary, purpose-made sprays) is not cruel - it's simply making furniture less appealing. Cats have strong scent preferences and will naturally avoid smells they dislike. This is far more humane than punishment, yelling, or physical deterrents like water spraying. Important: ALWAYS provide acceptable scratching alternatives nearby. Making furniture unappealing only works if you provide something better in its place. Never use anything toxic or irritating - stick to cat-safe commercial products or natural citrus/herbal scents.
              </div>
            </details>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-cpAmber via-cpAmber/90 to-cpCoral py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              🪑 Furniture Protection Guaranteed
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Save Your Sofa with Expert Help
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              A cat behaviourist can identify why your cat prefers furniture and create a customised redirection plan that actually works.
            </p>
            <Button
              size="lg"
              className="bg-white text-cpAmber hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl"
              asChild
            >
              <Link href="/en/united-kingdom">
                Discover all pet services →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Stop Cats Scratching Furniture",
            "description": "Protect your furniture whilst satisfying your cat's scratching needs. Expert advice on scratching posts, training techniques, and humane furniture protection.",
            "image": "https://images.unsplash.com/photo-1573865526739-10c1dd0e9c19?w=1200",
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
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://cutiepawspedia.com/en/guide/pet-behaviour/cats-scratching-furniture"
            }
          })
        }}
      />
    </div>
  );
}

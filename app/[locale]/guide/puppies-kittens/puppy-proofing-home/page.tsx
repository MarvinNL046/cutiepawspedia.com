import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Puppy-Proof Your Home | Complete Safety Guide 2024",
  description: "Essential guide to puppy-proofing your home. Learn how to create a safe environment, eliminate hazards, and protect both your puppy and your belongings.",
  keywords: "puppy proofing, puppy safety, home safety for puppies, puppy hazards, safe home for dogs",
  alternates: {
    languages: {
      "nl": "/nl/gids/puppies-kittens/puppy-proof-huis",
      "en": "/en/guide/puppies-kittens/puppy-proofing-home",
    },
  },
  openGraph: {
    title: "How to Puppy-Proof Your Home | Complete Safety Checklist",
    description: "Protect your curious puppy with our comprehensive home safety guide. Room-by-room checklist included.",
  },
};

export default function PuppyProofingHomePage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpCoral/10 via-cpAmber/10 to-cpAqua/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 border border-cpCoral/30 text-cpCoral text-sm font-medium mb-6">
              <span>🏠</span>
              Safety Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              How to Puppy-Proof Your Home
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              Puppies are curious, energetic, and will chew absolutely everything. Create a safe environment that protects your new companion whilst preserving your sanity and your belongings.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpCoral/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Need puppy supplies and safety equipment?
              </p>
              <Button
                asChild
                className="bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/en/search?category=pet-shops">Find pet shops near you →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "How to Puppy-Proof Your Home | Complete Safety Guide",
              description: "Comprehensive guide to puppy-proofing your home with room-by-room safety checklist and hazard prevention.",
              author: {
                "@type": "Organization",
                name: "CutiePawsPedia",
              },
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString(),
            }),
          }}
        />

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-cpAmber/10 border-l-4 border-cpAmber rounded-r-xl p-6 mb-12">
            <p className="text-lg text-foreground dark:text-cpCream m-0">
              Think of a puppy as a curious toddler with sharp teeth and surprising agility. Puppy-proofing isn't optional - it's essential for your puppy's safety and your peace of mind. This comprehensive guide walks you through every room in your home to eliminate hazards and create a puppy-safe environment.
            </p>
          </div>

          {/* Section 1: Why puppy-proof */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Why Puppy-Proofing Is Critical
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Puppies explore the world with their mouths. They don't understand danger, and their curiosity can lead to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Poisoning</strong> - From plants, chemicals, medications, human food</li>
              <li><strong>Choking</strong> - Small objects, strings, toys that break apart</li>
              <li><strong>Electrocution</strong> - Chewing cables and wires</li>
              <li><strong>Intestinal blockages</strong> - Swallowing socks, toys, fabric</li>
              <li><strong>Injuries</strong> - Falling from heights, cuts from sharp objects</li>
              <li><strong>Costly damage</strong> - To furniture, shoes, electronics, carpets</li>
            </ul>
            <p className="text-muted-foreground dark:text-cpCream/80">
              A few hours of preparation can prevent thousands in vet bills and heartache.
            </p>
          </section>

          {/* Section 2: General principles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Puppy-Proofing Principles
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">👀 Get Down Low</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Crawl around at puppy height. You'll spot hazards you'd miss from standing - dangling cables, loose items, small gaps.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🚪 Create Boundaries</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Use baby gates, closed doors, or playpens to restrict access to dangerous areas initially.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🔝 Elevate Everything</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Move valuable or dangerous items to high shelves, cupboards, or rooms puppy can't access.
                </p>
              </div>
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🔒 Secure & Lock</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Use childproof locks on cupboards containing cleaning products, medications, or food.
                </p>
              </div>
            </div>
          </section>

          {/* Living Room */}
          <section className="mb-12">
            <div className="bg-cpCoral/10 rounded-xl p-6 border border-cpCoral/30 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
                🛋️ Living Room Puppy-Proofing
              </h2>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Hazards to Address:
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Electrical Cables</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Electrocution from chewing<br/>
                    <strong>Solution:</strong> Cable management boxes, cord protectors, secure behind furniture, unplug when not in use
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🌿</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">House Plants</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Many common plants are toxic (lilies, ivy, aloe, philodendron)<br/>
                    <strong>Solution:</strong> Move to high shelves, hang from ceiling, or remove entirely. Check ASPCA toxic plant list
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Remote Controls & Electronics</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Choking on batteries, plastic damage<br/>
                    <strong>Solution:</strong> Keep on high surfaces, store in drawers, use protective cases
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">👟</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Shoes & Clothing</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Intestinal blockage from swallowing, destructive chewing<br/>
                    <strong>Solution:</strong> Store in closed cupboards, use shoe racks out of reach
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🪟</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Window Blind Cords</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Strangulation, entanglement<br/>
                    <strong>Solution:</strong> Tie up cords out of reach, use cord wraps, consider cordless blinds
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Kitchen */}
          <section className="mb-12">
            <div className="bg-cpAmber/10 rounded-xl p-6 border border-cpAmber/30 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
                🍳 Kitchen Puppy-Proofing
              </h2>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Hazards to Address:
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧪</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Cleaning Products</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Severe poisoning, chemical burns<br/>
                    <strong>Solution:</strong> Secure cupboards with childproof locks, store high up, keep in original containers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🗑️</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Rubbish Bin</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Spoiled food, sharp objects (bones, cans), plastic bags<br/>
                    <strong>Solution:</strong> Use lockable bin, store under sink with lock, keep in pantry
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🍫</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Toxic Foods</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Chocolate, grapes, onions, garlic, xylitol, macadamia nuts are toxic<br/>
                    <strong>Solution:</strong> Store all food in sealed containers on high shelves or in locked cupboards
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🔪</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Sharp Objects</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Cuts, punctures from knives, forks, scissors<br/>
                    <strong>Solution:</strong> Store in drawers or knife blocks out of reach, never leave on counters
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Stove & Oven</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Risk:</strong> Burns from hot surfaces<br/>
                    <strong>Solution:</strong> Use stove guards, never leave cooking unattended, teach "stay away" command
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpAmber/20 to-cpAqua/20 rounded-2xl shadow-md p-8 border border-cpAmber/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Puppy emergency? Know where your vet is!
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Register with a local veterinarian before emergencies happen. Find trusted vets near you.
              </p>
              <Button
                asChild
                className="bg-cpAmber text-cpCharcoal rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/en/search?category=veterinary">Find vets nearby →</Link>
              </Button>
            </div>
          </div>

          {/* Bedroom & Bathroom */}
          <section className="mb-12">
            <div className="bg-cpCoral/10 rounded-xl p-6 border border-cpCoral/30 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
                🛏️ Bedroom & 🚿 Bathroom Puppy-Proofing
              </h2>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Bedroom Hazards:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Clothing & Accessories</strong> - Socks, underwear, jewellery can cause blockages. Store in closed drawers/wardrobes</li>
              <li><strong>Medications</strong> - Keep in locked medicine cabinet. Even one pill can be fatal</li>
              <li><strong>Cosmetics</strong> - Many contain toxic ingredients. Store high up or in drawers</li>
              <li><strong>Small Items</strong> - Coins, buttons, hair ties pose choking risks. Keep surfaces clear</li>
              <li><strong>Bedding</strong> - Puppies may chew sheets and blankets. Supervise or restrict access</li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Bathroom Hazards:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li><strong>Toilet</strong> - Keep lid closed (drowning risk, drinking chemical-laden water)</li>
              <li><strong>Cleaning Products</strong> - Bleach, toilet cleaner, drain unblocker are highly toxic. Lock away</li>
              <li><strong>Razors & Sharp Objects</strong> - Store in medicine cabinet or high shelf</li>
              <li><strong>Medications & Supplements</strong> - Human medications can be lethal. Use locked cabinet</li>
              <li><strong>Electrical Appliances</strong> - Hair dryers, straighteners left plugged in pose electrocution risk</li>
            </ul>
          </section>

          {/* Garden/Outdoor */}
          <section className="mb-12">
            <div className="bg-cpAqua/10 rounded-xl p-6 border border-cpAqua/30 mb-6">
              <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
                🌳 Garden & Outdoor Puppy-Proofing
              </h2>
            </div>

            <h3 className="text-2xl font-semibold text-foreground dark:text-cpCream mb-4">
              Outdoor Hazards:
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🪴</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Toxic Garden Plants</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Azaleas, daffodils, foxgloves, yew, rhododendron are highly toxic. Remove or fence off
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🧪</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Garden Chemicals</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Fertilisers, weed killers, slug pellets, antifreeze are deadly. Lock in shed, use pet-safe alternatives
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🚧</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Fencing & Gates</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Check for gaps, weak spots, digging opportunities. Puppies can squeeze through surprisingly small spaces
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">💧</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Water Features & Pools</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Ponds, pools, hot tubs pose drowning risk. Install fencing, cover when not in use, supervise always
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">🔧</span>
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Garden Tools & Equipment</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    Rakes, shears, mowers can cause serious injury. Store in locked shed or garage
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Emergency preparedness */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Emergency Preparedness
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Even with perfect puppy-proofing, accidents can happen. Be prepared:
            </p>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20 mb-6">
              <h3 className="text-xl font-bold text-cpCoral mb-4">Emergency Kit Essentials:</h3>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <li>✓ Vet's phone number (saved in phone)</li>
                <li>✓ Emergency vet clinic details</li>
                <li>✓ Pet poison helpline number</li>
                <li>✓ First aid manual for dogs</li>
                <li>✓ Gauze, bandages, adhesive tape</li>
                <li>✓ Antiseptic wipes</li>
                <li>✓ Tweezers and scissors</li>
                <li>✓ Digital thermometer</li>
                <li>✓ Hydrogen peroxide (only use if vet instructs)</li>
                <li>✓ Muzzle (for emergencies)</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">🚨 Signs of Poisoning - Call Vet Immediately:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-600 dark:text-red-300 m-0">
                <li>Vomiting or diarrhoea</li>
                <li>Excessive drooling or foaming at mouth</li>
                <li>Seizures, tremors, or muscle twitching</li>
                <li>Difficulty breathing or rapid breathing</li>
                <li>Lethargy, weakness, or collapse</li>
                <li>Unusual behaviour or disorientation</li>
              </ul>
            </div>
          </section>

          {/* Puppy-proof checklist */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Complete Puppy-Proofing Checklist
            </h2>
            <div className="bg-cpAmber/10 rounded-xl p-6 border border-cpAmber/30">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Before Puppy Arrives:</h3>
              <div className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Secure all electrical cables and remove dangling cords</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Remove or elevate all toxic plants</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Install baby gates to restrict access to dangerous areas</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Lock away all cleaning products, medications, and chemicals</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Secure rubbish bins with locking lids</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Store all shoes, clothing, and small items out of reach</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Check garden fencing for gaps and weak spots</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Remove garden chemicals or lock in secure shed</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Compile emergency vet contact information</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded border-cpAmber text-cpCoral" />
                  <span>Prepare first aid kit for dogs</span>
                </label>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  How long do I need to maintain puppy-proofing?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Most dogs outgrow destructive chewing by 18-24 months, but some breeds remain curious throughout life. Gradually reintroduce items as your dog matures and demonstrates trustworthy behaviour. However, toxic substances and medications should always remain secured regardless of age.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  What should I do if my puppy swallows something dangerous?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Call your vet immediately - don't wait for symptoms. Time is critical. Never induce vomiting unless specifically instructed by a vet, as some substances cause more damage coming back up. Keep packaging if puppy consumed a product so vet knows exactly what was ingested.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Are there puppy-safe alternatives to toxic plants?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Yes! Safe alternatives include spider plants, Boston ferns, African violets, parlour palms, and most herbs (basil, thyme, rosemary). Always verify against ASPCA's safe plant list before purchasing. Consider artificial plants for complete peace of mind.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Can I use childproofing products for puppies?
                  <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Absolutely! Baby gates, cupboard locks, outlet covers, and corner protectors work excellently for puppies. However, remember that puppies can chew through plastic more easily than toddlers, so opt for metal or heavy-duty options where possible.
                </div>
              </details>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/en/guide/puppies-kittens/buying-puppy-tips"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  Tips for buying a puppy →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Essential guide to choosing and preparing for your new puppy.
                </p>
              </Link>
              <Link
                href="/en/guide/puppies-kittens/first-week-puppy"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral mb-2">
                  First week with your puppy →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Day-by-day guide for your puppy's first week at home.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpCoral/10 rounded-2xl shadow-md p-8 border border-cpAqua/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Need puppy care essentials?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Find pet shops, vets, and puppy training services near you.
            </p>
            <Button
              asChild
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
            >
              <Link href="/en/search">Find pet services →</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { X, AlertTriangle, Phone, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Toxic Foods for Dogs and Cats: Complete Safety List 2024",
  description: "Complete list of dangerous and toxic foods for dogs and cats. Essential safety guide with symptoms of poisoning and emergency procedures.",
  keywords: "toxic foods dogs, toxic foods cats, dangerous foods pets, chocolate poisoning, dog food safety, cat food safety",
  alternates: {
    languages: {
      "nl": "/nl/gids/huisdiervoeding/giftig-voedsel-honden-katten",
      "en": "/en/guide/pet-nutrition/toxic-foods-dogs-cats",
    },
  },
  openGraph: {
    title: "Toxic Foods for Dogs and Cats: Essential Safety Guide",
    description: "Protect your pet! Learn which common foods are dangerous for dogs and cats and what to do in case of poisoning.",
  },
};

export default function ToxicFoodsPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Toxic Foods for Dogs and Cats: Complete Safety List 2024",
            "description": "Essential safety guide listing dangerous and toxic foods for pets with poisoning symptoms and emergency procedures.",
            "author": { "@type": "Organization", "name": "CutiePawsPedia" },
            "publisher": { "@type": "Organization", "name": "CutiePawsPedia", "logo": { "@type": "ImageObject", "url": "https://cutiepawspedia.com/logo.png" } },
            "datePublished": "2024-12-08",
            "dateModified": "2024-12-08"
          })
        }}
      />

      <section className="bg-gradient-to-b from-red-50 via-cpCoral/5 to-transparent dark:from-red-900/10 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800/30 mb-6">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">Critical Safety Information</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Toxic Foods for Dogs and Cats: <span className="text-cpCoral">Complete Safety List</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            What's safe for humans can be deadly for pets. Many common household foods contain compounds that are toxic to dogs and cats, causing symptoms ranging from mild stomach upset to organ failure and death. This comprehensive guide covers the most dangerous foods, symptoms of poisoning, and emergency procedures every pet owner must know.
          </p>

          <div className="bg-red-100 dark:bg-red-900/20 rounded-2xl p-6 border-2 border-red-500 dark:border-red-700 mb-6">
            <div className="flex items-start gap-3">
              <Phone className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 dark:text-red-200 mb-2">Emergency? Call Immediately!</h3>
                <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                  If you suspect poisoning, contact your veterinarian or emergency animal hospital immediately. Do not wait for symptoms to appear.
                </p>
                <p className="text-sm font-bold text-red-900 dark:text-red-200">Pet Poison Helpline: Available 24/7 in most countries</p>
              </div>
            </div>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">Find emergency veterinary care near you</p>
            <Link href="/en/search?category=veterinary" className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md">
              Find a Veterinarian Near You →
            </Link>
          </div>
        </div>
      </section>

      <article className="container mx-auto max-w-4xl px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Top 10 Most Dangerous Foods for Dogs and Cats</h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">1. Chocolate and Cocoa (Both)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Contains theobromine, toxic to dogs and cats. Darker chocolate is more dangerous. Pure cocoa is the most toxic.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Vomiting, diarrhoea, increased heart rate, trembling, seizures, potentially fatal
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Toxic dose:</strong> As little as 20mg/kg can cause symptoms. A single chocolate bar can be fatal for small dogs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">2. Onions, Garlic, Leeks, Chives (Both)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    All allium family vegetables damage red blood cells, causing anaemia. Cats are more susceptible than dogs.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Weakness, pale gums, dark urine, rapid breathing, collapse
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Danger:</strong> All forms toxic (raw, cooked, powdered). Symptoms may not appear for 2-4 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">3. Grapes and Raisins (Dogs)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Cause acute kidney failure in dogs. The toxic compound is unknown, making any amount potentially dangerous.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Vomiting, lethargy, loss of appetite, kidney failure within 24-72 hours
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Warning:</strong> Even small amounts can be fatal. Seek immediate veterinary care.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">4. Xylitol (Artificial Sweetener) (Both)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Found in sugar-free gum, sweets, peanut butter, and baked goods. Causes rapid insulin release and liver failure.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Weakness, collapse, seizures, liver failure within hours
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Critical:</strong> Extremely toxic at very low doses. Can be fatal within 15-30 minutes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">5. Macadamia Nuts (Dogs)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Cause weakness, vomiting, tremors, and hyperthermia in dogs. Mechanism unknown.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Weakness (especially hind legs), vomiting, fever, trembling
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Recovery:</strong> Usually within 48 hours, but veterinary care is essential.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">6. Alcohol (Both)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Even small amounts cause intoxication, respiratory depression, and coma. Pets metabolise alcohol very slowly.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Disorientation, vomiting, difficulty breathing, coma, death
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Hidden sources:</strong> Rum-soaked cake, alcoholic desserts, hand sanitiser.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">7. Caffeine (Both)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    In coffee, tea, energy drinks, and chocolate. Causes hyperactivity, rapid heart rate, and seizures.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Hyperactivity, rapid breathing, heart palpitations, trembling, seizures
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Danger:</strong> Coffee grounds and tea bags are especially concentrated.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">8. Avocado (Both)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Contains persin, toxic to many pets. All parts of the plant are dangerous (fruit, pit, leaves).
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Vomiting, diarrhoea, difficulty breathing, fluid accumulation around heart
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Note:</strong> Birds and rabbits are most susceptible, but dogs and cats can also be affected.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">9. Raw Dough with Yeast (Both)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Expands in stomach causing bloat and alcohol poisoning (yeast produces ethanol as it ferments).
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Bloated abdomen, weakness, vomiting, disorientation, seizures
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Emergency:</strong> Can cause gastric torsion (twisted stomach) - life-threatening.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-red-500">
              <div className="flex items-start gap-3">
                <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-2">10. Cooked Bones (Both)</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80 mb-2">
                    Splinter easily, causing choking, intestinal blockage, or perforation. Especially dangerous: poultry and pork bones.
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                    Symptoms: Choking, vomiting, constipation, bloody stool, abdominal pain
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                    <strong>Safe alternative:</strong> Raw meaty bones (under supervision) or commercial dental chews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Additional Dangerous Foods</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { food: "Salt (Excessive)", danger: "Sodium poisoning, seizures, death" },
              { food: "Nutmeg", danger: "Hallucinations, high heart rate, seizures" },
              { food: "Raw eggs", danger: "Salmonella, biotin deficiency" },
              { food: "Raw meat/fish", danger: "Bacterial contamination, thiamine deficiency" },
              { food: "Fat trimmings", danger: "Pancreatitis, obesity" },
              { food: "Liver (large amounts)", danger: "Vitamin A toxicity" },
              { food: "Mushrooms (wild)", danger: "Organ failure, death" },
              { food: "Apricot/Cherry/Peach pits", danger: "Cyanide poisoning" },
              { food: "Rhubarb", danger: "Kidney failure" },
              { food: "Tomato plant (green parts)", danger: "Digestive upset, weakness" },
              { food: "Milk & dairy (large amounts)", danger: "Diarrhoea (lactose intolerance)" },
              { food: "Sugary foods", danger: "Obesity, diabetes, dental disease" },
            ].map((item, index) => (
              <div key={index} className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-200 dark:border-red-800/30">
                <h4 className="font-bold text-red-900 dark:text-red-200 mb-1">{item.food}</h4>
                <p className="text-sm text-red-800 dark:text-red-300">{item.danger}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">What to Do If Your Pet Eats Something Toxic</h2>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 border border-cpCoral/20 dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">Emergency Action Plan:</h3>
            <ol className="space-y-3 list-decimal list-inside text-muted-foreground dark:text-cpCream/80">
              <li><strong>Stay calm</strong> - Your pet will sense panic</li>
              <li><strong>Remove access</strong> - Take away remaining toxic food</li>
              <li><strong>Identify what and how much</strong> - Note the substance and estimated quantity consumed</li>
              <li><strong>Call your vet immediately</strong> - Even if no symptoms yet</li>
              <li><strong>Do NOT induce vomiting</strong> unless instructed by vet (can cause more harm for some toxins)</li>
              <li><strong>Bring packaging/sample</strong> - If going to vet, bring the food packaging or a sample</li>
              <li><strong>Monitor symptoms</strong> - Note any changes in behaviour or physical symptoms</li>
            </ol>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/30 dark:border-cpAmber/20">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Important:</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Never wait for symptoms to appear. Many toxic substances cause delayed symptoms but immediate internal damage. Contact your veterinarian or emergency clinic immediately after suspected ingestion.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Emergency Veterinary Care?</h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Find 24/7 emergency veterinary services near you. Save precious time in case of poisoning.
              </p>
              <Link href="/en/search?category=veterinary" className="inline-block bg-white text-cpCoral hover:bg-white/90 rounded-2xl px-8 py-4 font-semibold shadow-lg hover:-translate-y-1 transition-transform">
                Find Emergency Vets →
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Prevention: Keeping Your Pet Safe</h2>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Kitchen Safety:</h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li>✓ Store human food in sealed containers out of reach</li>
                <li>✓ Never leave food unattended on counters or tables</li>
                <li>✓ Educate all family members and guests about toxic foods</li>
                <li>✓ Secure rubbish bins with locking lids</li>
                <li>✓ Clean up spills immediately</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Dining Room Safety:</h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li>✓ Don't feed table scraps to pets</li>
                <li>✓ Keep pets in separate room during meals if they beg</li>
                <li>✓ Warn guests not to share their food with pets</li>
                <li>✓ Check floor for dropped food after meals</li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Holiday Safety:</h3>
              <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                <li>✓ Extra vigilant during holidays (chocolate at Easter/Christmas)</li>
                <li>✓ Keep sweets and baked goods out of reach</li>
                <li>✓ Be aware of toxic plants (lilies, poinsettias)</li>
                <li>✓ Inform guests about pet-safe zones and rules</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "Can a small amount of chocolate really harm my dog?",
                a: "Yes. The toxicity depends on the type of chocolate, the amount consumed, and your dog's size. Dark chocolate and cocoa powder are extremely dangerous even in small amounts. As little as 20mg of theobromine per kg of body weight can cause symptoms. A 10kg dog eating 100g of dark chocolate could be fatal."
              },
              {
                q: "My cat licked some onion juice. Is that dangerous?",
                a: "Yes, even small amounts of onion (raw, cooked, or powdered) are toxic to cats. Monitor for symptoms and contact your vet. Cats are more susceptible to onion toxicity than dogs."
              },
              {
                q: "What should I do if my dog ate grapes but seems fine?",
                a: "Contact your vet immediately even if there are no symptoms. Grape toxicity can cause kidney failure within 24-72 hours. Early treatment (inducing vomiting, IV fluids) dramatically improves outcomes."
              },
              {
                q: "Are any human foods safe for pets?",
                a: "Yes! Safe options include: plain cooked chicken/turkey, carrots, green beans, blueberries, apple slices (no seeds), plain rice, plain sweet potato. Always in moderation and as treats only (not meal replacement)."
              },
              {
                q: "Should I make my dog vomit if they ate something toxic?",
                a: "Never induce vomiting without veterinary guidance. For some toxins (like caustic substances or sharp objects), vomiting causes more damage. Always call your vet first."
              },
              {
                q: "How long after eating something toxic do symptoms appear?",
                a: "Varies widely: Xylitol (15-30 mins), Chocolate (6-12 hours), Grapes (12-24 hours), Onions (2-4 days). Never wait for symptoms - contact your vet immediately after suspected ingestion."
              },
            ].map((faq, index) => (
              <details key={index} className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-medium text-foreground dark:text-cpCream">
                  {faq.q}
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground dark:text-slate-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Related Nutrition Guides</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Best Dog Food: Complete Guide", desc: "Choose safe, nutritious food for your dog's health.", href: "/en/guide/pet-nutrition/best-dog-food" },
              { title: "Wet vs Dry Cat Food", desc: "Compare cat food types and find the healthiest option.", href: "/en/guide/pet-nutrition/wet-vs-dry-cat-food" },
              { title: "How to Help Your Pet Lose Weight", desc: "Safe diet strategies and healthy feeding practices.", href: "/en/guide/pet-nutrition/pet-weight-loss" },
              { title: "BARF Diet for Dogs", desc: "Raw feeding safety guidelines and best practices.", href: "/en/guide/pet-nutrition/barf-diet-dogs" },
            ].map((article, index) => (
              <Link key={index} href={article.href}>
                <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-lg hover:border-cpCoral/40 transition-all group">
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">{article.title}</h3>
                  <p className="text-sm text-muted-foreground dark:text-slate-400 mb-3">{article.desc}</p>
                  <span className="text-cpCoral text-sm font-medium">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-8 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">Find Pet Services Near You</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6 max-w-2xl mx-auto">Discover trusted veterinarians, emergency clinics, and pet nutritionists in your area.</p>
            <Link href="/en/search" className="inline-block bg-cpCoral text-white rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-medium shadow-md">
              Browse Pet Services →
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

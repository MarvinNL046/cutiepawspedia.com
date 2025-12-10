import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Info, TrendingUp, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "BARF Diet for Dogs: Complete Raw Feeding Guide 2024",
  description: "Complete guide to BARF (Biologically Appropriate Raw Food) diet for dogs. Benefits, risks, recipes, and how to start raw feeding safely.",
  keywords: "BARF diet dogs, raw dog food, raw feeding, biologically appropriate dog food, raw diet benefits",
  alternates: {
    languages: {
      "nl": "/nl/gids/huisdiervoeding/barf-dieet-honden",
      "en": "/en/guide/pet-nutrition/barf-diet-dogs",
    },
  },
  openGraph: {
    title: "BARF Diet for Dogs: Complete Raw Feeding Guide",
    description: "Everything you need to know about feeding your dog a raw, biologically appropriate diet safely and effectively.",
  },
};

export default function BARFDietDogsPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "BARF Diet for Dogs: Complete Raw Feeding Guide 2024",
            "description": "Comprehensive guide to Biologically Appropriate Raw Food diet for dogs with benefits, risks, recipes, and safety tips.",
            "author": { "@type": "Organization", "name": "CutiePawsPedia" },
            "publisher": { "@type": "Organization", "name": "CutiePawsPedia", "logo": { "@type": "ImageObject", "url": "https://cutiepawspedia.com/logo.png" } },
            "datePublished": "2024-12-08",
            "dateModified": "2024-12-08"
          })
        }}
      />

      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 border border-cpCoral/30 dark:border-cpAmber/20 mb-6">
            <TrendingUp className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">Advanced Dog Nutrition</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            BARF Diet for Dogs: <span className="text-cpCoral">Complete Raw Feeding Guide</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            The BARF (Biologically Appropriate Raw Food or Bones And Raw Food) diet is a raw feeding approach that aims to replicate what dogs would eat in the wild. Proponents claim it improves coat quality, dental health, energy levels, and overall wellbeing. However, raw feeding requires careful planning, knowledge of canine nutrition, and strict hygiene practices. This comprehensive guide covers everything you need to know before transitioning your dog to a BARF diet.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/30 dark:border-cpAmber/20 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-cpAmber flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Consult Your Veterinarian First</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Before starting a BARF diet, consult a veterinarian or veterinary nutritionist. Raw feeding isn't suitable for all dogs, especially those with compromised immune systems, puppies, or senior dogs with dental issues.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">Find veterinary nutritionists who can guide your BARF journey</p>
            <Link href="/en/search?category=veterinary" className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md">
              Find a Veterinarian Near You →
            </Link>
          </div>
        </div>
      </section>

      <article className="container mx-auto max-w-4xl px-4 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">What is the BARF Diet?</h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Created by Australian veterinarian Dr. Ian Billinghurst in 1993, the BARF diet is based on the principle that dogs thrive on the diet their evolutionary ancestors consumed - raw meat, bones, organs, and vegetation. The diet aims to provide biologically appropriate nutrition without the processing, cooking, and additives found in commercial dog food.
          </p>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 border border-cpCoral/20 dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">BARF Diet Components:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground dark:text-cpCream">70% Raw Muscle Meat</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">Beef, lamb, chicken, turkey, rabbit, fish (with bones)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground dark:text-cpCream">10% Raw Edible Bone</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">Chicken necks, wings, turkey necks, lamb ribs (never cooked bones!)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground dark:text-cpCream">10% Organs (5% liver, 5% other)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">Liver, kidney, heart, spleen (nutrient-dense)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground dark:text-cpCream">10% Fruits & Vegetables</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">Leafy greens, carrots, broccoli, apples, berries (puréed or chopped)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cpCoral flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground dark:text-cpCream">Optional Supplements</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">Fish oil, kelp, vitamin E, probiotics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Benefits of BARF Diet</h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Advocates of raw feeding report numerous health benefits. While scientific research is limited, many dog owners observe positive changes:
          </p>

          <div className="space-y-4">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Improved Dental Health</h3>
              <p className="text-muted-foreground dark:text-cpCream/80">
                Chewing raw meaty bones naturally cleans teeth and massages gums, reducing tartar and plaque. Many owners report fresher breath and whiter teeth within weeks.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Shinier Coat and Healthier Skin</h3>
              <p className="text-muted-foreground dark:text-cpCream/80">
                Raw diets rich in omega-3 fatty acids (from fish and organs) promote lustrous coat and reduce skin issues like dryness, itching, and allergies.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Higher Energy Levels</h3>
              <p className="text-muted-foreground dark:text-cpCream/80">
                High-quality, bioavailable protein and nutrients provide sustained energy. Many owners report their dogs are more active and playful.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Better Digestion and Smaller Stools</h3>
              <p className="text-muted-foreground dark:text-cpCream/80">
                Raw food is highly digestible with minimal waste. Owners report smaller, firmer, less odorous stools (60-70% reduction in volume).
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Weight Management</h3>
              <p className="text-muted-foreground dark:text-cpCream/80">
                Lower carbohydrate content helps maintain lean muscle mass and healthy weight. Particularly beneficial for overweight dogs.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Reduced Allergy Symptoms</h3>
              <p className="text-muted-foreground dark:text-cpCream/80">
                Elimination of common allergens (grains, fillers, artificial additives) may reduce food allergy symptoms like itching, ear infections, and digestive upset.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
              <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Stronger Immune System</h3>
              <p className="text-muted-foreground dark:text-cpCream/80">
                Natural enzymes, probiotics, and nutrients remain intact (not destroyed by cooking), potentially supporting immune function.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Risks and Concerns of BARF Diet</h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            While many dogs thrive on BARF, raw feeding carries genuine risks that must be carefully managed:
          </p>

          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border-l-4 border-red-500">
              <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">Bacterial Contamination</h4>
              <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                <strong>Risk:</strong> Raw meat can harbour Salmonella, E. coli, Campylobacter, and Listeria, dangerous to both dogs and humans (especially children, elderly, immunocompromised).
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>Mitigation:</strong> Source from reputable suppliers, freeze for 2 weeks to kill parasites, maintain strict kitchen hygiene, wash hands/surfaces thoroughly, keep children away during feeding.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border-l-4 border-red-500">
              <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">Nutritional Imbalances</h4>
              <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                <strong>Risk:</strong> Homemade BARF diets may lack essential nutrients (calcium, vitamins, minerals) if not properly formulated, leading to deficiencies over time.
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>Mitigation:</strong> Work with veterinary nutritionist to create balanced recipes, use variety of protein sources, include appropriate supplements, test recipes through nutritional analysis software.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border-l-4 border-red-500">
              <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">Choking and Internal Injuries</h4>
              <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                <strong>Risk:</strong> Bones can cause choking, broken teeth, intestinal blockages, or perforations if incorrectly chosen or prepared.
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>Mitigation:</strong> Use appropriate bone sizes for dog's size, only feed raw bones (never cooked), supervise all bone feeding, grind bones if dog gulps food, avoid weight-bearing bones from large animals.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border-l-4 border-red-500">
              <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">Parasite Transmission</h4>
              <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                <strong>Risk:</strong> Raw meat and fish may contain parasites like Toxoplasma, Neospora, or tapeworm larvae.
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>Mitigation:</strong> Freeze meat at -20°C for minimum 2 weeks before feeding, source from inspected suppliers, maintain regular deworming schedule, avoid wild game.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border-l-4 border-red-500">
              <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">Not Suitable for All Dogs</h4>
              <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                <strong>Risk:</strong> Puppies, immunocompromised dogs, dogs with pancreatitis, or those in multi-pet households with vulnerable members may not be suitable candidates.
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>Mitigation:</strong> Veterinary assessment before starting, consider commercial raw (pasteurised) options for high-risk dogs, gradual transition, close monitoring.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">How to Start a BARF Diet Safely</h2>

          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 border border-cpCoral/20 dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">Step-by-Step Transition Plan (2-3 Weeks):</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Week 1: Single Protein Source</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                  Start with one easily digestible protein (chicken or turkey). Feed 25% raw, 75% current food. Monitor stools and energy levels.
                </p>
                <p className="text-sm text-cpCoral font-medium">If digestive upset occurs, slow transition or consult vet.</p>
              </div>

              <div>
                <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Week 2: Increase Raw Percentage</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                  Gradually increase to 50% raw, 50% kibble. Continue single protein source. Add small amounts of organ meat (5% of raw portion).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Week 3: Full Transition</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80 mb-2">
                  Move to 100% raw. Introduce second protein source (beef or lamb). Add vegetables (10%) and bone content (10%). Begin variety rotation.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-foreground dark:text-cpCream mb-2">Week 4 and Beyond: Variety and Balance</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                  Rotate proteins weekly (chicken, beef, lamb, turkey, fish). Ensure 70-10-10-10 ratio is maintained over time. Add supplements as needed.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Essential Equipment and Preparation:</h3>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>✓ Separate cutting boards and utensils for raw meat (never use for human food)</li>
              <li>✓ Kitchen scale for accurate portion measurement</li>
              <li>✓ Large freezer space for bulk meat storage</li>
              <li>✓ Meat grinder (optional, for bones and variety)</li>
              <li>✓ Stainless steel or ceramic feeding bowls (easier to sanitise)</li>
              <li>✓ Antibacterial cleaning supplies (bleach solution for surfaces)</li>
              <li>✓ Portion containers for meal prep</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Sample BARF Meal Plan (for 20kg adult dog)</h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-3">Daily Portion: 400-600g (2-3% of body weight)</h3>

            <div className="space-y-4">
              <div className="border border-border dark:border-cpAmber/20 rounded-xl p-4">
                <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Monday: Chicken Day</h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/80 space-y-1">
                  <li>• 350g chicken thighs with bone (70% meat + 10% bone)</li>
                  <li>• 50g chicken liver (5% organ)</li>
                  <li>• 25g chicken heart (5% organ)</li>
                  <li>• 50g mixed vegetables (spinach, carrot, broccoli - puréed)</li>
                  <li>• 1 tsp fish oil, 1 tsp ground eggshell (calcium supplement)</li>
                </ul>
              </div>

              <div className="border border-border dark:border-cpAmber/20 rounded-xl p-4">
                <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Tuesday: Beef Day</h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/80 space-y-1">
                  <li>• 350g beef muscle meat (chuck or mince)</li>
                  <li>• 50g beef liver</li>
                  <li>• 50g beef kidney</li>
                  <li>• 50g raw meaty bones (lamb ribs or beef tail)</li>
                  <li>• 25g apple (no seeds), 25g kale (puréed)</li>
                  <li>• Probiotic supplement</li>
                </ul>
              </div>

              <div className="border border-border dark:border-cpAmber/20 rounded-xl p-4">
                <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Wednesday: Fish Day</h4>
                <ul className="text-sm text-muted-foreground dark:text-cpCream/80 space-y-1">
                  <li>• 350g whole fish (sardines, mackerel) with bones</li>
                  <li>• 50g salmon or white fish</li>
                  <li>• 50g mixed organs (any source)</li>
                  <li>• 50g sweet potato (raw or lightly steamed), 25g blueberries</li>
                  <li>• Kelp powder (iodine source)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mt-4">
              <strong>Note:</strong> Rotate proteins weekly. Ensure variety over time rather than daily balance. Adjust portions based on dog's activity level, age, and body condition.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Commercial vs Homemade BARF</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">Commercial Raw Food</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-2">Pros:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>✓ Nutritionally balanced by experts</li>
                    <li>✓ Convenient and time-saving</li>
                    <li>✓ Some brands use HPP (high-pressure pasteurisation) to reduce bacteria</li>
                    <li>✓ Quality control and consistency</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400 mb-2">Cons:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>✗ Expensive (£5-10 per day for medium dog)</li>
                    <li>✗ Less control over ingredients</li>
                    <li>✗ Requires freezer space</li>
                    <li>✗ Limited availability in some areas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">Homemade BARF</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-2">Pros:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>✓ Complete control over ingredients</li>
                    <li>✓ More affordable (£2-4 per day)</li>
                    <li>✓ Can source locally and organically</li>
                    <li>✓ Customise for allergies or preferences</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400 mb-2">Cons:</p>
                  <ul className="text-sm text-muted-foreground dark:text-cpCream/70 space-y-1">
                    <li>✗ Time-consuming preparation</li>
                    <li>✗ Risk of nutritional imbalances</li>
                    <li>✗ Requires knowledge and research</li>
                    <li>✗ Higher bacterial contamination risk</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Expert BARF Guidance?</h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Work with veterinary nutritionists who specialise in raw feeding to create a safe, balanced BARF plan for your dog.
              </p>
              <Link href="/en/search?category=veterinary" className="inline-block bg-white text-cpCoral hover:bg-white/90 rounded-2xl px-8 py-4 font-semibold shadow-lg hover:-translate-y-1 transition-transform">
                Find Veterinary Nutritionists →
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "Is BARF safe for puppies?",
                a: "BARF can be safe for puppies if properly formulated with correct calcium-to-phosphorus ratios for bone growth. However, it's more challenging to balance and many vets recommend waiting until 6-12 months. Consult a veterinary nutritionist for puppy-specific recipes."
              },
              {
                q: "How much does BARF feeding cost?",
                a: "Homemade BARF costs £50-120/month for a medium dog (depends on meat quality and sourcing). Commercial raw food costs £150-300/month. Bulk buying and sourcing from wholesalers reduces costs significantly."
              },
              {
                q: "Can I feed BARF if I have young children?",
                a: "Yes, but requires extra hygiene precautions. Feed dog in separate area, wash hands/surfaces thoroughly, supervise children around feeding area, consider HPP commercial raw (reduced bacteria). Discuss with paediatrician if immunocompromised family members."
              },
              {
                q: "What if my dog won't eat raw food?",
                a: "Some dogs are reluctant initially. Try lightly searing the outside, mixing with current food, adding bone broth for flavour, or warming slightly. Ensure meat is fresh and high-quality. Some dogs genuinely prefer cooked food - don't force BARF."
              },
              {
                q: "Do I need supplements with BARF?",
                a: "If properly balanced with variety, minimal supplements needed. Common additions: fish oil (omega-3), vitamin E (antioxidant), kelp (iodine), probiotics (gut health). Avoid over-supplementation - work with nutritionist for specific needs."
              },
              {
                q: "Can I mix BARF with kibble?",
                a: "Generally not recommended as they digest at different rates (raw faster than kibble), potentially causing digestive upset. If mixing, feed separately (morning raw, evening kibble) or choose one feeding method. Consult vet for individual dog's tolerance."
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
              { title: "Best Dog Food: Complete Guide", desc: "Compare BARF with commercial dog foods and find the best option.", href: "/en/guide/pet-nutrition/best-dog-food" },
              { title: "Toxic Foods for Dogs and Cats", desc: "Essential safety guide for raw feeding and avoiding dangerous foods.", href: "/en/guide/pet-nutrition/toxic-foods-dogs-cats" },
              { title: "How to Help Your Pet Lose Weight", desc: "BARF can support healthy weight - learn proper portion control.", href: "/en/guide/pet-nutrition/pet-weight-loss" },
              { title: "Wet vs Dry Cat Food", desc: "Explore different feeding approaches for cats and dogs.", href: "/en/guide/pet-nutrition/wet-vs-dry-cat-food" },
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
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6 max-w-2xl mx-auto">Discover trusted veterinarians, pet nutritionists, and raw food suppliers in your area.</p>
            <Link href="/en/search" className="inline-block bg-cpCoral text-white rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-medium shadow-md">
              Browse Pet Services →
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}

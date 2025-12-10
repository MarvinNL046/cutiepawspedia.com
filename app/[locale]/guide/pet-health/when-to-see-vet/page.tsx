/**
 * SEO Landing Page: When to Take Your Pet to the Vet
 * Pillar: Pet Health (English)
 * Target: Pet owners seeking guidance on veterinary emergencies
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Heart, Clock, Phone, ThermometerIcon, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "When to Take Your Pet to the Vet? 10 Warning Signs 2025",
  description: "Recognise when your pet needs medical attention: 10 warning signs, emergencies, and symptoms you shouldn't ignore. Find a vet quickly when your pet needs help.",
  keywords: [
    "when to see vet",
    "pet emergency symptoms",
    "sick dog signs",
    "sick cat symptoms",
    "emergency vet",
    "pet warning signs",
    "when to call vet",
    "pet health emergency"
  ],
  alternates: {
    languages: {
      'en': '/en/guide/pet-health/when-to-see-vet',
      'nl': '/nl/gids/dierengezondheid/wanneer-naar-dierenarts',
    },
  },
  openGraph: {
    title: "When to Take Your Pet to the Vet? 10 Warning Signs",
    description: "Recognise the signs that your pet needs medical attention. Complete guide with emergencies and symptoms to watch for.",
    type: "article",
  },
};

export default function WhenToSeeVet() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-cpCoral" />
            <span className="text-sm font-medium text-cpCoral">Pet Health</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-4">
            When to Take Your Pet to the Vet? 10 Warning Signs
          </h1>
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
            As a pet owner, it's sometimes difficult to judge when a symptom is serious enough for the vet. Learn the warning signs you should never ignore and when immediate medical attention is needed.
          </p>

          {/* Emergency CTA */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800/50 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-foreground dark:text-cpCream font-bold mb-1">Emergency?</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  For acute emergencies (unconsciousness, severe injury, poisoning): call a vet or emergency clinic immediately.
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/united-kingdom">
                Find emergency vet near you →
              </Link>
            </Button>
          </div>

          {/* Primary CTA */}
          <div className="bg-cpCoral/10 dark:bg-cpCoral/5 border border-cpCoral/30 dark:border-cpCoral/20 rounded-2xl p-6">
            <p className="text-foreground dark:text-cpCream mb-3 font-medium">
              💚 Concerned about your pet's health?
            </p>
            <Button
              asChild
              size="lg"
              className="bg-cpCoral text-white hover:bg-cpCoral/90 rounded-xl w-full md:w-auto"
            >
              <Link href="/en/united-kingdom">
                Find a veterinarian near you →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            Your pet can't tell you in words when they're feeling unwell. As an owner, you need to watch for changes in behaviour, appetite, and physical condition. Some symptoms are harmless and will resolve on their own, but others require prompt medical attention.
          </p>
          <p className="text-foreground dark:text-cpCream/90 mb-4 leading-relaxed">
            In this guide, you'll learn the 10 most important warning signs, when something is urgent, and when you can safely wait. When in doubt: always call your vet for advice.
          </p>
        </section>

        {/* Direct Emergencies */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            Go to the Vet Immediately: Emergencies
          </h2>

          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800/50 rounded-2xl p-6 mb-6">
            <p className="text-foreground dark:text-cpCream font-semibold mb-4">
              For these symptoms, you must call a vet IMMEDIATELY or go to an emergency clinic:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Unconsciousness or Seizures</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Cannot be woken, fainting, epileptic fits</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Severe Breathing Difficulty</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Blue gums, open-mouth breathing (cats), gasping for air</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Poisoning</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Chocolate, grapes, rat poison, toxins, medications—anything potentially poisonous</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Severe Injury or Bleeding</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Car accident, fall from height, deep wounds, broken bones</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Bloat/GDV (especially large dogs)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Distended abdomen, retching without vomiting, restlessness, drooling</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Unable to Urinate (especially cats)</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Urinary blockage is life-threatening within 24-48 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-cpCharcoal/50 rounded-lg p-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground dark:text-cpCream">Heatstroke / Overheating</p>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70">Excessive panting, temperature above 40°C, vomiting, loss of consciousness</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 flex items-start gap-2">
              <Phone className="h-4 w-4 text-cpAmber flex-shrink-0 mt-0.5" />
              <span><strong>Tip:</strong> Always have your vet's phone number and the nearest emergency clinic number handy. Some clinics are open 24/7, others have rotating emergency services.</span>
            </p>
          </div>
        </section>

        {/* 10 Warning Signs */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <Activity className="h-7 w-7 text-cpCoral" />
            10 Warning Signs: Call Your Vet
          </h2>

          <p className="text-foreground dark:text-cpCream/90 mb-6 leading-relaxed">
            These symptoms may not be immediately life-threatening, but do require medical attention within 24-48 hours:
          </p>

          <div className="space-y-6">
            {/* Warning Sign 1 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Refusing Food and Water (more than 24 hours)</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    No interest in eating can indicate pain, fever, poisoning, or organ problems. In young animals and cats, this is especially concerning.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Watch out:</strong> Cats that don't eat for more than 48 hours risk fatty liver disease</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Sign 2 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Repeated Vomiting or Diarrhoea</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Vomiting once is often harmless, but repeated vomiting (more than 3x), diarrhoea with blood, or both together: call your vet.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Emergency if:</strong> Blood in vomit/faeces, dehydration (dry nose, sunken eyes)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Sign 3 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Lethargy and Apathy</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Your pet is unusually quiet, won't play, lies around a lot, barely responds. This is often a sign of pain or illness.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Normal behaviour:</strong> You know your pet best—any change is important</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Sign 4 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">4</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Pain or Lameness</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Yelping when touched, difficulty getting up, limping, unwillingness to move. Pain is often well hidden.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Signs of pain:</strong> Stiff posture, withdrawn behaviour, growling when touched, changed breathing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Sign 5 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">5</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Changes in Urination or Defecation</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    More frequent, less frequent, blood in urine/faeces, straining without result, accidents in the house.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Emergency for cats:</strong> Male cat unable to urinate needs help within 24-48 hours (life-threatening)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Sign 6 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">6</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Coughing, Sneezing, or Breathing Problems</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Persistent coughing (more than 2 days), panting without reason, nasal discharge, or laboured breathing.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Watch out:</strong> Cats breathing with open mouths often have serious respiratory problems (emergency!)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Sign 7 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">7</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Sudden Weight Loss or Gain</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Unexplained weight loss (more than 10% in 1 month) or sudden gain can indicate thyroid, kidney, or liver problems.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Weigh regularly:</strong> Especially for older animals—early detection is crucial</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Sign 8 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">8</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Eye or Ear Problems</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Red eyes, tearing, squinting, ear discharge, scratching at ears, head tilting.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Warning:</strong> Eye problems can worsen quickly and cause permanent damage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Sign 9 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">9</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Skin Problems or Lumps</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Bald patches, itching, red skin, swellings, lumps that grow or don't heal, wounds that stay open.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Check:</strong> Always have lumps in older animals checked (early cancer detection)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Sign 10 */}
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold">10</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground dark:text-cpCream mb-2">Behavioural Changes</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                    Aggression, anxiety, disorientation, confusion, wandering at night, excessive thirst. Especially in older animals, this can indicate cognitive decline.
                  </p>
                  <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-lg p-3">
                    <p className="text-xs text-foreground dark:text-cpCream"><strong>Old age:</strong> Not everything is normal ageing—pain and illness can be well treated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Concerned About Your Pet's Health?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Find a trusted veterinarian in your area for a health check or second opinion.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-cpCoral hover:bg-white/90 rounded-xl"
            >
              <Link href="/en/united-kingdom">
                View veterinary clinics in your city →
              </Link>
            </Button>
          </div>
        </section>

        {/* When Can You Wait */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6 flex items-center gap-3">
            <ThermometerIcon className="h-7 w-7 text-cpCoral" />
            When Can You Wait?
          </h2>

          <div className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-6 mb-6">
            <p className="text-foreground dark:text-cpCream/90 mb-4">
              Some symptoms are less urgent and can be monitored for 24-48 hours before calling the vet:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Vomiting once:</strong> If your pet eats and drinks normally afterwards</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Soft stool once:</strong> Without blood, with otherwise normal behaviour</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Mild sneezing:</strong> Without nasal discharge or fever</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                <span className="text-cpCoral mt-0.5">•</span>
                <span><strong>Small superficial wound:</strong> That you can clean yourself and isn't bleeding</span>
              </li>
            </ul>
          </div>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl border border-cpAmber/30 dark:border-cpAmber/20 p-4">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70">
              <strong>Golden rule:</strong> When in doubt, always call your vet. Better to call once too often than seek help too late. Many vets offer free telephone advice.
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
            More About Pet Health
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/en/guide/pet-health/dog-vaccinations" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Dog Vaccinations</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Schedule, costs, and side effects →</p>
            </Link>
            <Link href="/en/guide/pet-health/fleas-ticks-pets" className="bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 p-5 hover:border-cpCoral/40 transition-all group">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2 group-hover:text-cpCoral transition-colors">Fleas and Ticks</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">Prevention and treatment →</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                How do I measure my pet's temperature?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Use a digital thermometer rectally (in the anus). Normal temperature in dogs and cats is 38-39°C. Above 39.5°C is fever, above 40°C is serious. Below 37.5°C is too low (hypothermia). Have someone help hold your pet and lubricate the thermometer with petroleum jelly.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                My pet ate something potentially poisonous, what now?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Call your vet or the Pet Poison Helpline IMMEDIATELY. State: what, how much, when. DO NOT induce vomiting unless the vet advises it (some substances cause more damage when vomited). Save packaging or plant remains. Many poisonings are more treatable if you act quickly.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                What should I do during a seizure?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Stay calm. Move dangerous objects away. DO NOT touch your pet (risk of being bitten). Dim lights and make it quiet. Film the seizure if possible (helps the vet). If the seizure lasts longer than 5 minutes or multiple seizures occur in succession, call the emergency clinic immediately. After the seizure, your pet may be confused—provide rest and water.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                When is a visit to the emergency clinic necessary?
                <span className="text-cpCoral group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Emergency clinics are for acute life-threatening situations: severe injury, poisoning, unconsciousness, severe breathing problems, bloat, urinary retention. For less urgent matters, it's often better to wait until your own vet is open (continuity of care + costs). When in doubt: call your own vet first for advice; many practices have a telephone emergency line outside opening hours.
              </div>
            </details>
          </div>
        </section>

        {/* Tertiary CTA */}
        <section className="mb-8">
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl border border-cpAmber/30 dark:border-cpAmber/20 p-6 text-center">
            <p className="text-foreground dark:text-cpCream mb-4">
              Looking for more information about pet health and services?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-cpAmber text-cpAmber hover:bg-cpAmber/10 rounded-xl"
            >
              <Link href="/en/united-kingdom">
                Discover all pet services →
              </Link>
            </Button>
          </div>
        </section>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "When to Take Your Pet to the Vet? 10 Warning Signs",
            "description": "Recognise when your pet needs medical attention: 10 warning signs, emergencies, and symptoms you shouldn't ignore.",
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
              "@id": "https://cutiepawspedia.com/en/guide/pet-health/when-to-see-vet"
            }
          })
        }}
      />
    </div>
  );
}

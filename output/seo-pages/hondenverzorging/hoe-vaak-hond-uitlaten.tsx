import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Heart, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Hoe vaak moet je een hond uitlaten? Volledige gids 2024",
  description: "Ontdek hoe vaak je je hond moet uitlaten op basis van ras, leeftijd en gezondheid. Inclusief praktische tips en advies van experts.",
  keywords: "hond uitlaten, hond laten uitlaten, hoe vaak hond uitlaten, hond uitlaatschema, hondenuitlaatservice",
  openGraph: {
    title: "Hoe vaak moet je een hond uitlaten? Volledige gids 2024",
    description: "Praktische richtlijnen voor het uitlaten van je hond. Vind ook professionele hondenuitlaatservices bij jou in de buurt.",
    type: "article",
  },
};

export default function HoeVaakHondUitlatenPage() {
  return (
    <>
      {/* Schema.org Article markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hoe vaak moet je een hond uitlaten? Volledige gids 2024",
            "description": "Ontdek hoe vaak je je hond moet uitlaten op basis van ras, leeftijd en gezondheid.",
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
            "datePublished": "2024-01-15",
            "dateModified": "2024-01-15"
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/20 mb-6">
              <Heart className="w-4 h-4 text-cpCoral" />
              <span className="text-sm font-medium text-cpCoral">Hondenverzorging</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Hoe vaak moet je een hond <span className="gradient-text-coral">uitlaten?</span>
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 max-w-2xl mx-auto">
              Ontdek de perfecte uitlaatfrequentie voor jouw hond, afgestemd op ras, leeftijd en gezondheid. Plus praktische tips voor drukke baasjes.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <Link
              href="/nl/nederland"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
            >
              <MapPin className="w-5 h-5" />
              Vind een hondenuitlaatservice bij jou in de buurt
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-background dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-4xl px-4 py-16">

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Een van de meest gestelde vragen door nieuwe én ervaren hondenbezitters: hoe vaak moet je eigenlijk een hond uitlaten? Het antwoord is niet voor elke hond hetzelfde. De frequentie hangt af van verschillende factoren zoals leeftijd, ras, gezondheid en energieniveau van je hond.
            </p>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              In deze gids leggen we uit welke richtlijnen er zijn, wat experts adviseren en hoe je een perfect uitlaatschema samenstelt dat bij jouw hond én jouw leven past.
            </p>
          </div>

          {/* Quick Answer Box */}
          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 mb-12 border border-cpAmber/30 dark:border-cpAmber/20">
            <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-cpAmber" />
              Korte samenvatting
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                <span><strong>Volwassen honden:</strong> minimaal 3-4 keer per dag (15-30 minuten per wandeling)</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                <span><strong>Puppy's:</strong> 4-6 keer per dag (korte wandelingen van 5-15 minuten)</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                <span><strong>Energieke rassen:</strong> tot 5 keer per dag met langere wandelingen</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                <CheckCircle2 className="w-5 h-5 text-cpCoral flex-shrink-0 mt-1" />
                <span><strong>Oudere honden:</strong> 2-3 rustige wandelingen, aangepast aan conditie</span>
              </li>
            </ul>
          </div>

          {/* General Guidelines */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Algemene richtlijnen per leeftijdsgroep</h2>

            <div className="space-y-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpCoral mb-3">Puppy's (tot 6 maanden)</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Puppy's hebben een kleine blaas en kunnen hun plasje nog niet lang ophouden. Ze moeten daarom vaker naar buiten, maar dan wel voor kortere wandelingen.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>4-6 keer per dag uitlaten</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>5-15 minuten per wandeling (5 minuten per levensmaand is een goede richtlijn)</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>Kort na het eten, slapen en spelen naar buiten</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpCoral mb-3">Jonge honden (6 maanden - 2 jaar)</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Adolescente honden zitten vol energie en hebben voldoende beweging nodig voor hun fysieke en mentale ontwikkeling.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>3-5 keer per dag uitlaten</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>20-60 minuten per wandeling, afhankelijk van ras en energie</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>Combineer met speelsessies en training</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpCoral mb-3">Volwassen honden (2-7 jaar)</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Volwassen honden hebben een stabiele routine nodig met voldoende beweging om gezond te blijven.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>Minimaal 3-4 keer per dag uitlaten</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>15-30 minuten per wandeling voor kalme rassen</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>30-120 minuten voor energieke rassen (Border Collie, Husky, etc.)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpCoral mb-3">Senior honden (7+ jaar)</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Oudere honden hebben minder energie maar blijven baat hebben bij regelmatige beweging voor gewrichtsgezondheid en mentale stimulatie.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>2-3 rustige wandelingen per dag</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>10-20 minuten per wandeling, aangepast aan conditie</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                    <CheckCircle2 className="w-4 h-4 text-cpCoral flex-shrink-0 mt-1" />
                    <span>Let op signalen van vermoeidheid en gewrichtspijn</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 text-center mb-12 border border-cpCoral/20">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
              Geen tijd om je hond genoeg uit te laten?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/70 mb-6">
              Vind betrouwbare hondenuitlaatservices bij jou in de buurt die je hond de beweging geven die hij nodig heeft.
            </p>
            <Link
              href="/nl/nederland"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-all"
            >
              Vind hondenuitlaatservices →
            </Link>
          </div>

          {/* Breed-Specific Needs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Uitlaten per rastype</h2>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6">
              Naast leeftijd speelt het ras een grote rol in hoeveel beweging je hond nodig heeft. Sommige rassen zijn gefokt om de hele dag te werken, terwijl anderen content zijn met een rustige levensstijl.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpCoral mb-3">🏃‍♂️ Zeer energieke rassen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                  Border Collie, Husky, Jack Russell, Vizsla, Australian Shepherd
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>4-5 wandelingen per dag</strong> met minimaal 1-2 uur totale beweging. Denk ook aan mentale uitdaging zoals apporteren, zoekspelletjes of agility.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpCoral mb-3">🚶 Matig energieke rassen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                  Labrador, Golden Retriever, Beagle, Cocker Spaniel, Boxer
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>3-4 wandelingen per dag</strong> van 20-40 minuten. Deze honden zijn vaak blij met een goede mix van wandelen en spelen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpCoral mb-3">🛋️ Kalme rassen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                  Bulldog, Basset Hound, Shih Tzu, Cavalier King Charles, Chihuahua
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>2-3 rustige wandelingen per dag</strong> van 15-20 minuten is vaak voldoende. Let wel op gewicht en conditie.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpCoral mb-3">🐕 Grote rassen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                  Duitse Dog, Berner Sennenhond, Mastiff, Newfoundlander
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80">
                  <strong>3-4 gematigde wandelingen</strong>. Grote honden hebben beweging nodig, maar te veel belasting kan schadelijk zijn voor hun gewrichten.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Praktische tips voor het uitlaten</h2>

            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Maak een vast schema</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Honden zijn gewoontehoeren. Vaste uitlaattijden helpen bij zindelijkheid en geven je hond rust en voorspelbaarheid.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Varieer je routes</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Nieuwe geuren en omgevingen bieden mentale stimulatie. Wissel af tussen rustige wandelingen en interessante routes met veel prikkels.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Let op het weer</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Bij extreme hitte of kou pas je de duur en intensiteit aan. Wandel in de zomer in de ochtend of avond en let op het asfalt (teentjestest!).
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Kwaliteit boven kwantiteit</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Een korte wandeling waar je hond mag snuffelen en ontdekken is vaak waardevoller dan een lange mars zonder interactie.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Combineer met training</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Gebruik wandelingen ook om commando's te oefenen. Dit biedt mentale uitdaging en versterkt jullie band.
                </p>
              </div>
            </div>
          </section>

          {/* Signs Your Dog Needs More/Less */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Signalen dat je hond meer (of minder) beweging nodig heeft</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-cpCoral/5 dark:bg-cpCoral/10 rounded-2xl p-6 border border-cpCoral/20">
                <h3 className="text-xl font-bold text-cpCoral mb-4">Te weinig beweging</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpCoral">•</span>
                    <span>Vernietigend gedrag (kauwen, graven)</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpCoral">•</span>
                    <span>Overmatig blaffen of janken</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpCoral">•</span>
                    <span>Hyperactiviteit en onrust</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpCoral">•</span>
                    <span>Gewichtstoename</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpCoral">•</span>
                    <span>Moeilijker in slaap komen</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cpAmber/5 dark:bg-cpAmber/10 rounded-2xl p-6 border border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpAmber mb-4">Te veel beweging</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpAmber">•</span>
                    <span>Overmatige vermoeidheid</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpAmber">•</span>
                    <span>Mank lopen of stijve bewegingen</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpAmber">•</span>
                    <span>Verminderde eetlust</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpAmber">•</span>
                    <span>Pootjes likken of ontsteking</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/80">
                    <span className="text-cpAmber">•</span>
                    <span>Algemene onwil om te wandelen</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Gerelateerde artikelen</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/nl/hondenverzorging/hond-baden-tips"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Je hond baden: tips & frequentie</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
              <Link
                href="/nl/hondenverzorging/beste-hondenborstels"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">De beste hondenborstels per vachttype</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
              <Link
                href="/nl/hondenverzorging/tanden-poetsen-hond"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Tanden poetsen bij honden</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde vragen</h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Kan je een hond te vaak uitlaten?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Ja, vooral jonge honden en puppy's kunnen overbelast raken. Let op signalen van vermoeidheid zoals mank lopen, hijgen, of weigeren om verder te lopen. Pas de duur en intensiteit aan bij de leeftijd en conditie van je hond.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Hoelang kan een hond zijn plasje ophouden?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Een volwassen hond kan gemiddeld 6-8 uur zijn plasje ophouden, maar dit is niet ideaal voor comfort en gezondheid. Puppy's kunnen ongeveer 1 uur per levensmaand hun blaas ophouden. Een hond van 6 maanden kan dus ongeveer 6 uur wachten, maar liefst wordt dit niet dagelijks zo lang.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Is het erg als ik mijn hond 1 dag niet uitlaat?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Eén dag niet uitlaten is voor de meeste honden geen ramp, maar wel niet ideaal. Zorg dan wel voor alternatieve beweging zoals spelen in de tuin en mentale stimulatie binnen. Als je regelmatig geen tijd hebt, overweeg dan een hondenuitlaatservice.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Moet ik mijn hond ook uitlaten als ik een tuin heb?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Absoluut! Zelfs met een grote tuin hebben honden behoefte aan wandelingen voor mentale stimulatie, socialisatie en nieuwe prikkels. De tuin is handig voor toiletbezoek en spelen, maar vervangt niet de wandeling voor mentale gezondheid.
                </div>
              </details>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vind de perfecte hondenuitlaatservice
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Drukke agenda? Laat je hond uitlaten door betrouwbare professionals bij jou in de buurt.
              </p>
              <Link
                href="/nl/nederland"
                className="inline-flex items-center gap-2 bg-white text-cpCoral rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                Ontdek alle hondenuitlaatservices
              </Link>
            </div>
          </section>

        </div>
      </article>
    </>
  );
}

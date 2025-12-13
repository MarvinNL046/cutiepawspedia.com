import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { CheckCircle2, Heart, ShoppingCart, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Beste Hondenvoer 2024: Complete Vergelijking & Koopgids",
  description: "Ontdek het beste hondenvoer voor jouw hond. Vergelijk top merken, lees expert reviews en vind gezonde voeding bij dierenspeciaalzaken bij jou in de buurt.",
  keywords: "beste hondenvoer, hondenvoer merken, gezonde hondenvoeding, droogvoer hond, natvoer hond",
  openGraph: {
    title: "Beste Hondenvoer Merken in Nederland: Vergelijking 2024",
    description: "Vergelijk de beste hondenvoer merken en vind gezonde voeding voor jouw hond.",
  },
};

export default function BesteHondenvoerPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent dark:to-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCharcoal/60 border border-cpCoral/30 dark:border-cpAmber/20 mb-6">
            <Heart className="h-4 w-4 text-cpCoral" />
            <span className="text-sm font-medium text-foreground dark:text-cpCream">
              Expert Voedingsadvies
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6 tracking-tight">
            Beste Hondenvoer Merken in Nederland: <span className="text-cpCoral">Vergelijking 2024</span>
          </h1>

          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Het kiezen van het juiste hondenvoer is cruciaal voor de gezondheid en het welzijn van jouw trouwe viervoeter. In deze uitgebreide gids vergelijken we de beste hondenvoer merken in Nederland, zodat jij een weloverwogen keuze kunt maken voor jouw hond.
          </p>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 shadow-sm">
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
              Op zoek naar expert voedingsadvies voor jouw hond?
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md"
            >
              Vind een dierenspeciaalzaak bij jou in de buurt →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        {/* Section 1: Waarom het juiste hondenvoer belangrijk is */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Waarom is het Kiezen van het Juiste Hondenvoer zo Belangrijk?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Net als bij mensen heeft voeding een directe impact op de gezondheid van jouw hond. Kwaliteitsvol hondenvoer ondersteunt een gezond immuunsysteem, zorgt voor een glanzende vacht, sterke botten en spieren, en kan zelfs de levensverwachting van je hond verlengen. Slecht voer kan daarentegen leiden tot gezondheidsproblemen zoals obesitas, allergieën, spijsverteringsproblemen en tandproblemen.
          </p>

          <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 border border-cpAmber/20 dark:border-cpAmber/10 my-6">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-cpAmber" />
              Belangrijkste voordelen van kwaliteitsvol hondenvoer:
            </h3>
            <ul className="space-y-2">
              {[
                "Optimale spijsvertering en gezonde stoelgang",
                "Sterker immuunsysteem en betere weerstand tegen ziektes",
                "Glanzende vacht en gezonde huid",
                "Gezond gewicht en energieniveau",
                "Sterke tanden, botten en gewrichten",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-5 w-5 text-cpAmber flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Top Hondenvoer Merken */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Top 5 Beste Hondenvoer Merken in Nederland (2024)
          </h2>

          {/* Brand 1 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">1. Royal Canin</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Royal Canin is wereldwijd erkend voor zijn wetenschappelijk onderbouwde recepturen. Ze bieden specifieke voedingsoplossingen voor verschillende levensfasen, rassenmaten en gezondheidsbehoeften. Hun voer bevat hoogwaardige eiwitten, essentiële vetzuren en een uitgebalanceerde mix van vitamines en mineralen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Specifieke gezondheidsbehoeften, rasspecifiek voer</p>
          </div>

          {/* Brand 2 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">2. Hill's Science Plan</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Hill's Science Plan wordt ontwikkeld door dierenartsen en voedingsdeskundigen. Het merk staat bekend om zijn klinisch geteste recepturen die de algehele gezondheid ondersteunen. Ze gebruiken hoogwaardige ingrediënten en vermijden kunstmatige kleurstoffen en smaakstoffen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Honden met spijsverteringsproblemen, senior honden</p>
          </div>

          {/* Brand 3 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">3. Purina Pro Plan</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Purina Pro Plan combineert wetenschappelijk onderzoek met voedingsexpertise. Hun formules bevatten het probioticum Optidigest voor een gezonde spijsvertering en hoogwaardige eiwitten voor sterke spieren. Ze bieden zowel droog- als natvoer in verschillende smaken.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Actieve honden, sportieve rassen</p>
          </div>

          {/* Brand 4 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">4. Orijen</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Orijen is een premium merk dat zich richt op biologisch verantwoord voer met verse, regionale ingrediënten. Hun formules bevatten 85-90% dierlijke ingrediënten (kip, kalkoen, vis) en zijn graanvrij. Perfect voor baasjes die kiezen voor natuurlijke voeding.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Graanvrije voeding, natuurlijke ingrediënten</p>
          </div>

          {/* Brand 5 */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20 mb-6">
            <h3 className="text-xl font-bold text-cpCoral mb-2">5. Acana</h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
              Acana, van dezelfde makers als Orijen, biedt biologisch verantwoord voer met verse, regionale ingrediënten. Hun formules bevatten 50-75% hoogwaardige vleeseiwitten en zijn graanvrij. Ze gebruiken nooit kunstmatige toevoegingen of conserveringsmiddelen.
            </p>
            <p className="text-sm text-cpCoral font-medium">✓ Perfect voor: Honden met allergieën, graanvrije voeding</p>
          </div>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/5 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-6 border border-cpCoral/20 dark:border-cpAmber/20 my-8">
            <h3 className="font-bold text-foreground dark:text-cpCream mb-2">
              Persoonlijk voedingsadvies nodig?
            </h3>
            <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
              Een dierenarts of diervoedingsspecialist kan je helpen het perfecte voer te kiezen op basis van leeftijd, ras, activiteitsniveau en eventuele gezondheidsproblemen van jouw hond.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-cpCoral text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform font-medium shadow-md text-sm"
            >
              Bekijk dierenartsen voor voedingsadvies →
            </Link>
          </div>
        </section>

        {/* Section 3: Waar op te letten */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Waar Moet je op Letten bij het Kiezen van Hondenvoer?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6 leading-relaxed">
            Niet alle hondenvoer is gelijk. Bij het vergelijken van merken zijn er verschillende factoren waar je op moet letten om de beste keuze te maken voor jouw hond.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Ingrediëntenlijst</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Kies voer waarbij vlees of vis als eerste ingrediënt staat vermeld. Vermijd voer met veel granen, bijproducten of kunstmatige toevoegingen.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Levensfase</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Pups, volwassen honden en senioren hebben verschillende voedingsbehoeften. Kies voer dat past bij de levensfase van jouw hond.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Rassenmaat</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Kleine, middelgrote en grote rassen hebben verschillende voedingsbehoeften qua brokgrootte, energiedichtheid en voedingsstoffen.
              </p>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
              <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Speciale Behoeften</h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                Heeft jouw hond allergieën, spijsverteringsproblemen of overgewicht? Kies dan voor speciaal voer dat hierop is afgestemd.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-4">
            Voor meer informatie over gezonde voeding voor honden, bekijk ook onze gidsen over{" "}
            <Link href="/nl/gids/huisdiervoeding/kattenvoer-nat-vs-droog" className="text-cpCoral hover:underline">
              nat versus droog voer
            </Link>
            {" "}en{" "}
            <Link href="/nl/gids/huisdiervoeding/barf-dieet-honden" className="text-cpCoral hover:underline">
              het BARF dieet voor honden
            </Link>.
          </p>
        </section>

        {/* Section 4: Droog vs Nat voer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-4">
            Droogvoer of Natvoer: Wat is Beter?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-4 leading-relaxed">
            Beide soorten voer hebben hun voor- en nadelen. De beste keuze hangt af van de voorkeuren en behoeften van jouw hond.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Droogvoer (Brokken)</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Betaalbaar en lang houdbaar</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Helpt bij gebitsverzorging</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Gemakkelijk te bewaren</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Hogere energiedichtheid</span>
                </li>
              </ul>
            </div>

            <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border border-border dark:border-cpAmber/20">
              <h3 className="text-xl font-bold text-cpCoral mb-3">Natvoer (Blikjes/Bakjes)</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Smaakvoller voor kieskeurige honden</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Hogere vochtopname</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Makkelijker te verteren</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Geschikt voor oudere honden</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed">
            Veel hondenbaasjes kiezen voor een combinatie van beide: droogvoer als basis en natvoer als toevoeging voor variatie. Dit geeft je hond het beste van beide werelden.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
            Veelgestelde Vragen over Hondenvoer
          </h2>

          <div className="space-y-4">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoeveel kost goed hondenvoer per maand?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                De kosten variëren sterk afhankelijk van het merk, de kwaliteit en de grootte van je hond. Voor een middelgrote hond kun je rekenen op €30-€80 per maand voor premium droogvoer. Natvoer is over het algemeen duurder, tussen €60-€150 per maand. Goedkoper voer kost €20-€40 per maand, maar bevat vaak minder hoogwaardige ingrediënten.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan ik het voer van mijn hond plots veranderen?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Nee, het is belangrijk om geleidelijk over te schakelen naar nieuw voer om maagklachten te voorkomen. Start met 25% nieuw voer gemengd met 75% oud voer gedurende 2-3 dagen. Verhoog daarna naar 50/50 voor 2-3 dagen, vervolgens 75% nieuw en 25% oud, en tenslotte 100% nieuw voer. Dit proces duurt ongeveer 7-10 dagen.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is graanvrij hondenvoer altijd beter?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Niet noodzakelijk. Graanvrij voer is vooral nuttig voor honden met allergie of intolerantie voor granen. Voor de meeste gezonde honden zijn granen zoals rijst, haver en gerst prima voedingsbronnen. Het is belangrijker om te kijken naar de kwaliteit van alle ingrediënten en de samenstelling van het voer. Bespreek met je dierenarts wat het beste is voor jouw hond.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Welk hondenvoer is het beste voor gevoelige magen?
                <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/70">
                Voor honden met een gevoelige maag zijn Hill's Prescription Diet i/d, Royal Canin Digestive Care en Purina Pro Plan Sensitive Skin & Stomach uitstekende keuzes. Deze voedingsmiddelen bevatten gemakkelijk verteerbare ingrediënten, prebiotica en probiotica voor een gezonde darmflora. Kies voer met één eiwitbron en vermijd kunstmatige toevoegingen. Raadpleeg altijd je dierenarts bij aanhoudende spijsverteringsproblemen.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Vind de Beste Voeding voor Jouw Hond
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Ontdek dierenspeciaalzaken, dierenartsen en voedingsexperts bij jou in de buurt die je kunnen helpen met persoonlijk advies over de beste voeding voor jouw hond.
            </p>
            <Link
              href="/nl/netherlands"
              className="inline-block bg-white text-cpCoral rounded-xl px-8 py-4 hover:-translate-y-1 transition-transform font-bold shadow-lg text-lg"
            >
              Ontdek alle huisdierservices →
            </Link>
          </div>
        </section>

        {/* Schema.org Article Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Beste Hondenvoer Merken in Nederland: Vergelijking 2024",
              "description": "Vergelijk de beste hondenvoer merken in Nederland en ontdek welk voer het beste past bij jouw hond. Expert reviews en koopadvies.",
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
      </article>
    </div>
  );
}

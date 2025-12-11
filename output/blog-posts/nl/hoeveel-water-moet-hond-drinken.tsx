import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog/PhotoCredit";
import { BetweenContentAd } from "@/components/ads/AdSlot";
import { BlogSidebarAd } from "@/components/ads/BlogSidebarAd";

export const metadata: Metadata = {
  title: "Hoeveel water moet een hond drinken per dag? + Berekeningtool | CutiePawsPedia",
  description: "Ontdek hoeveel water je hond dagelijks moet drinken op basis van gewicht en activiteit. Inclusief praktische tips en wanneer je je zorgen moet maken.",
  keywords: "hond water, hond drinken, hoeveel water hond, water hond per dag, hond drinkt veel, hond drinkt weinig",
  openGraph: {
    title: "Hoeveel water moet een hond drinken per dag?",
    description: "Ontdek hoeveel water je hond dagelijks moet drinken op basis van gewicht en activiteit. Inclusief praktische tips en wanneer je je zorgen moet maken.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=1200&h=630&fit=crop"],
  },
};

export default function HoeveelWaterMoetHondDrinken() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Hoeveel water moet een hond drinken per dag?",
            "description": "Ontdek hoeveel water je hond dagelijks moet drinken op basis van gewicht en activiteit.",
            "image": "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=1200&h=630&fit=crop",
            "datePublished": "2025-12-11",
            "dateModified": "2025-12-11",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            }
          }),
        }}
      />

      {/* Back Link */}
      <div className="container mx-auto max-w-6xl px-4 pt-8">
        <Link
          href="/nl/blog"
          className="inline-flex items-center gap-2 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="container mx-auto max-w-6xl px-4 py-8">
        <span className="inline-block px-3 py-1 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium rounded-full mb-4">
          Dierengezondheid
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          Hoeveel water moet een hond drinken per dag?
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60 mb-4">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            11 december 2025
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            7 min leestijd
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=1200&h=630&fit=crop"
            alt="Hond drinkt water uit kom"
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="Treddy Chen"
            photographerUrl="https://unsplash.com/@tchen"
            source="unsplash"
          />
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <article className="flex-1 min-w-0">
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
              <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                Water is essentieel voor de gezondheid van je hond. Maar hoeveel moet je viervoeter eigenlijk drinken? Te weinig kan leiden tot uitdroging, te veel kan wijzen op gezondheidsproblemen. In dit artikel leer je precies hoeveel water jouw hond nodig heeft en hoe je dit kunt monitoren.
              </p>

              <h2 id="algemene-richtlijn" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                De algemene richtlijn: 50-70 ml per kg lichaamsgewicht
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Als vuistregel geldt dat een gezonde hond <strong>50-70 ml water per kilogram lichaamsgewicht per dag</strong> moet drinken. Dit is echter een gemiddelde - de exacte hoeveelheid hangt af van verschillende factoren.
              </p>

              <div className="bg-cpCoral/5 dark:bg-cpCoral/10 border-l-4 border-cpCoral rounded-lg p-6 my-6">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-3">Snelle berekening</h3>
                <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
                  <li>• <strong>5 kg hond</strong>: 250-350 ml per dag (1-1,5 kopje)</li>
                  <li>• <strong>10 kg hond</strong>: 500-700 ml per dag (2-3 kopjes)</li>
                  <li>• <strong>20 kg hond</strong>: 1-1,4 liter per dag</li>
                  <li>• <strong>30 kg hond</strong>: 1,5-2,1 liter per dag</li>
                  <li>• <strong>40 kg hond</strong>: 2-2,8 liter per dag</li>
                </ul>
              </div>

              <BetweenContentAd />

              <h2 id="factoren-waterbehoefte" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Factoren die de waterbehoefte beïnvloeden
              </h2>

              <h3 id="factor-voeding" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                1. Type voeding
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Het soort voer dat je hond eet heeft een grote invloed op de waterbehoefte:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Droogvoer (brokken)</strong>: Bevat slechts 10% vocht, dus je hond moet meer water drinken</li>
                <li><strong>Natvoer (blik)</strong>: Bevat 70-80% vocht, vermindert de drinkbehoefte aanzienlijk</li>
                <li><strong>BARF/rauw voer</strong>: Bevat 60-70% vocht, minder extra water nodig</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Een hond die alleen droogvoer eet, drinkt dus aanzienlijk meer dan een hond op natvoer of BARF.
              </p>

              <h3 id="factor-activiteit" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                2. Activiteitsniveau en beweging
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Actieve honden verliezen meer vocht door hijgen en zweten via hun pootjes. Na intensieve beweging, rennen, of spelen kan de waterbehoefte verdubbelen. Zorg altijd voor toegang tot vers water na activiteiten.
              </p>

              <h3 id="factor-weer" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                3. Weer en temperatuur
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Bij warm weer hijgen honden om af te koelen, wat vochtverlies veroorzaakt. In de zomer kan de waterbehoefte met 50-100% toenemen. Ook verwarming binnen in de winter kan leiden tot meer dorst.
              </p>

              <h3 id="factor-leeftijd-gezondheid" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                4. Leeftijd en gezondheidstoestand
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Puppy's</strong>: Drinken relatief meer water per kilo lichaamsgewicht (actieve groei)</li>
                <li><strong>Zwangere/zogende teven</strong>: Tot 50% meer water nodig</li>
                <li><strong>Oudere honden</strong>: Kunnen minder goed dorst reguleren, extra aandacht nodig</li>
                <li><strong>Zieke honden</strong>: Koorts, diarree, of braken verhogen de waterbehoefte drastisch</li>
              </ul>

              <BetweenContentAd />

              <h2 id="tekenen-uitdroging" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Tekenen van uitdroging (te weinig water)
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Uitdroging is gevaarlijk en kan snel ernstig worden. Let op deze signalen:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Droog tandvlees</strong>: Normaal tandvlees is vochtig en glanzend</li>
                <li><strong>Verminderde huidelasticiteit</strong>: Trek voorzichtig de huid op de nek omhoog - deze moet direct terugveren</li>
                <li><strong>Ingezonken ogen</strong></li>
                <li><strong>Lethargie en zwakte</strong></li>
                <li><strong>Donkere urine</strong>: Gezonde urine is lichtgeel</li>
                <li><strong>Hijgen zonder reden</strong></li>
                <li><strong>Droge neus</strong> (let op: een droge neus alleen is geen betrouwbare indicator)</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                <strong>Let op:</strong> Bij ernstige uitdroging (hond weigert te drinken, braakt, extreme lethargie) moet je direct naar de dierenarts. Dit kan levensbedreigend zijn.
              </p>

              <h2 id="te-veel-water" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Waarschuwing: te veel water drinken (polydipsie)
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Als je hond plotseling veel meer drinkt dan normaal (meer dan 100 ml/kg/dag), kan dit wijzen op een medisch probleem:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li><strong>Diabetes mellitus</strong>: overmatige dorst en plassen</li>
                <li><strong>Nierziekte</strong>: de nieren kunnen vocht niet goed vasthouden</li>
                <li><strong>Ziekte van Cushing</strong>: hormonale aandoening</li>
                <li><strong>Infecties</strong>: blaasontsteking of urineweginfectie</li>
                <li><strong>Bijwerkingen van medicijnen</strong>: zoals prednison</li>
              </ul>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Ga naar de dierenarts als je hond plotseling 50% meer drinkt zonder duidelijke reden (zoals warm weer of meer beweging).
              </p>

              <BetweenContentAd />

              <h2 id="tips-waterconsumptie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Praktische tips voor gezonde waterconsumptie
              </h2>

              <h3 id="tip-vers-water" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                1. Zorg voor continu vers water
              </h3>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Vers de waterbak minimaal 1-2 keer per dag</li>
                <li>Reinig de waterbak dagelijks om bacteriegroei te voorkomen</li>
                <li>Plaats meerdere waterbakken in huis, vooral in grote woningen</li>
                <li>Gebruik liever geen plastic bakken (kunnen geurtjes afgeven)</li>
              </ul>

              <h3 id="tip-monitoring" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                2. Monitor de waterinname
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Houd enkele dagen bij hoeveel je hond drinkt om een basislijn te krijgen. Vul de waterbak met een bekende hoeveelheid en meet aan het eind van de dag hoeveel er over is. Dit helpt om veranderingen op te merken.
              </p>

              <h3 id="tip-aanmoedigen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                3. Aanmoedigen om meer te drinken
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Als je hond te weinig drinkt, probeer dan:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                <li>Voeg water toe aan droogvoer (maak een "soepje")</li>
                <li>Geef ijsblokjes als traktatie (vooral bij warm weer)</li>
                <li>Gebruik een drinkfontein - stromend water is aantrekkelijker</li>
                <li>Voeg een klein beetje kippenbouillon toe (zoutvrij!)</li>
                <li>Wissel af met natvoer</li>
              </ul>

              <h3 id="tip-onderweg" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                4. Water onderweg
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Neem altijd water mee tijdens wandelingen, vooral bij warm weer of lange tochten. Er zijn handige draagbare waterbakken of flessen met geïntegreerde drinkbak beschikbaar.
              </p>

              <h2 id="conclusie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                Conclusie: ken het normale patroon van je hond
              </h2>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Elke hond is uniek en heeft een eigen drinkpatroon. De algemene richtlijn van 50-70 ml per kg is een goed uitgangspunt, maar de belangrijkste taak als baasje is om het normale patroon van jouw hond te kennen.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Let op plotselinge veranderingen in drinkgedrag - zowel meer als minder drinken kan een signaal zijn dat er iets aan de hand is. Twijfel je? Neem dan contact op met je dierenarts. Het is beter om te voorzichtig te zijn dan een probleem over het hoofd te zien.
              </p>
              <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                Zorg ervoor dat je hond altijd toegang heeft tot vers, schoon water. Dit is een van de meest fundamentele aspecten van goede hondenzoRg en kan veel gezondheidsproblemen voorkomen.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10 mt-8">
              <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde vragen</h2>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Mag ik mijn hond kraanwater geven?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Ja, in Nederland en België is kraanwater prima voor honden - het is van uitstekende kwaliteit. Je hoeft geen speciaal "hondenwater" te kopen. Let wel op bij het gebruik van heel hard water (veel kalk), dit kan bij gevoelige honden leiden tot blaassteentjes. In dat geval kan gefilterd water helpen.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Mijn hond drinkt uit de wc, is dat gevaarlijk?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Dit is niet ideaal. Toiletwater kan bacteriën, schoonmaakmiddelen, en chloor bevatten. Honden doen dit vaak omdat het water "vers" aanvoelt. Voorkom dit door de wc-deksel dicht te houden en zorg voor aantrekkelijk vers water in meerdere schone bakken door het huis.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Kunnen honden te veel water drinken in één keer?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Ja, bij extreem veel water in korte tijd kan "watervergiftiging" (hyponatriëmie) optreden. Dit gebeurt vooral na intensieve beweging of zwemmen. Symptomen: braken, lethargie, coördinatieproblemen. Voorkom dit door geen onbeperkte toegang te geven direct na intensieve inspanning - geef kleine hoeveelheden verspreid over 30-60 minuten.
                </p>
              </details>

              <details className="mb-4 pb-4 border-b border-border dark:border-cpAmber/10">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Waarom drinkt mijn puppy zo veel water?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Puppy's zijn extreem actief en groeien snel, waardoor ze relatief meer water nodig hebben per kg lichaamsgewicht dan volwassen honden. Dit is normaal. Let wel op dat je puppy niet te veel drinkt vlak voor het slapengaan (moeilijker zindelijk te krijgen). Als je puppy excessief drinkt (meer dan 100ml/kg/dag), laat dit dan checken door de dierenarts.
                </p>
              </details>

              <details className="mb-4">
                <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer hover:text-cpCoral transition-colors">
                  Kan mijn hond van bepaalde materialen van waterbak ziek worden?
                </summary>
                <p className="mt-3 text-muted-foreground dark:text-cpCream/80">
                  Plastic waterbakken kunnen na verloop van tijd krassen en groefjes krijgen waar bacteriën zich ophopen. Ook kunnen goedkope plastic bakken chemische stoffen afgeven. Kies voor roestvrijstaal of keramiek - deze zijn hygiënischer, makkelijker schoon te maken, en duurzamer. Was de bak dagelijks met heet water en zeep.
                </p>
              </details>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond water
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hoeveel water hond
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond drinken
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                dierengezondheid
              </span>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <BlogSidebarAd sponsorAd={null} />
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles */}
      <section className="bg-secondary/50 dark:bg-cpSurface/20 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-8 text-center">
            Lees ook deze artikelen
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/nl/gids/huisdiervoeding/hondenbrokken-kiezen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Het beste hondenvoer kiezen
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/dierengezondheid/ziektes-herkennen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Veelvoorkomende hondenziekte herkennen
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            <Link
              href="/nl/gids/senior-huisdieren/oudere-honden-verzorgen"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                  Zorg voor oudere honden
                </h3>
                <span className="inline-flex items-center gap-1 text-cpCoral text-sm font-medium">
                  Lees meer
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

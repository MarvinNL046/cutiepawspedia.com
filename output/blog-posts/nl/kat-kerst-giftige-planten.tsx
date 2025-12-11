/**
 * Blog Post: Kat en kerst - giftige planten en gevaren
 * Category: dierengezondheid
 * Keywords: kat kerst, giftig voor katten, kerstboom kat
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog";
import { BetweenContentAd } from "@/components/ads";
import { BlogSidebarAd } from "@/components/ads";

export const metadata: Metadata = {
  title: "Kat en Kerst: Giftige Planten en Gevaren | CutiePawsPedia",
  description: "Vier veilig kerst met je kat. Ontdek welke kerstplanten giftig zijn, welke versieringen gevaarlijk zijn en hoe je je kat beschermt tijdens de feestdagen. Complete veiligheidsgids.",
  openGraph: {
    title: "Kat en Kerst: Giftige Planten en Gevaren",
    description: "Complete gids voor een kattenveilige kerst. Van giftige planten tot gevaarlijke versieringen - houd je kat veilig tijdens de feestdagen.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const publishDate = new Date("2025-01-08");
  const readingTime = 11;

  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
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
          Kat en Kerst: Giftige Planten en Gevaren
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60 mb-4">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {publishDate.toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {readingTime} min leestijd
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&h=800&fit=crop"
            alt="Kat bij kerstboom"
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="The Lucky Neko"
            photographerUrl="https://unsplash.com/@theluckyneko"
            source="unsplash"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <article className="flex-1 min-w-0">
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
              {/* Excerpt */}
              <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                De kerstperiode is gezellig en sfeervol, maar voor katten kan het gevaarlijk zijn. Van giftige planten tot glanzende versieringen - veel kerstdecoraties zijn een bedreiging. Deze gids helpt je een veilige en toch feestelijke kerst te vieren met je kat.
              </p>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 id="heading-giftige-kerstplanten" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Giftige Kerstplanten voor Katten
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Veel populaire kerstplanten zijn giftig voor katten. Zelfs kleine hoeveelheden kunnen ernstige symptomen veroorzaken.
                </p>

                <h3 id="heading-kerstster" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  1. Kerstster (Poinsettia) - Matig Giftig
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  De rode, witte of roze kerstster is de meest voorkomende kerstplant. Het witte melksap bevat irriterende stoffen.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Symptomen bij inname:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Kwijlen en irritatie van mond en tong</li>
                  <li>Braken en misselijkheid</li>
                  <li>Diarree (zelden)</li>
                  <li>Huidirritatie bij contact met sap</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Gelukkig is de kerstster minder giftig dan vaak gedacht - grote hoeveelheden zijn nodig voor ernstige symptomen. Toch is het verstandig de plant buiten bereik van je kat te houden.
                </p>

                <h3 id="heading-kerstgroen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  2. Hulst (Holly) - Zeer Giftig
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Hulst met zijn karakteristieke rode bessen en stekelige bladeren is gevaarlijk giftig voor katten.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Symptomen bij inname:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Ernstig braken en diarree</li>
                  <li>Buikpijn en koliek</li>
                  <li>Lethargie en zwakte</li>
                  <li>Overmatig kwijlen</li>
                  <li>Zeldzaam: tremoren en stuipen</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Actie:</strong> Vermijd hulst volledig in huis met katten. Gebruik kunsthulst of andere decoraties.
                </p>

                <BetweenContentAd testMode={true} />

                <h3 id="heading-maretak" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  3. Maretak (Mistletoe) - Zeer Giftig
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Maretak is een van de gevaarlijkste kerstplanten voor katten. Alle delen zijn giftig, vooral de witte bessen.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Symptomen bij inname:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Braken en diarree</li>
                  <li>Laag hartritme (bradycardie)</li>
                  <li>Lage bloeddruk</li>
                  <li>Ademhalingsproblemen</li>
                  <li>Neurologische symptomen: ataxie (wankelen), tremoren</li>
                  <li>In ernstige gevallen: hartstilstand</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Actie:</strong> NOOIT maretak in huis met katten. Bij vermoeden van inname: direct naar de dierenarts!
                </p>

                <h3 id="heading-amaryllis" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  4. Amaryllis - Giftig
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Deze grote, kleurrijke bloemen zijn populair tijdens kerst maar gevaarlijk voor katten. De bollen zijn het meest giftig.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Symptomen bij inname:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Overmatig kwijlen</li>
                  <li>Braken en diarree</li>
                  <li>Buikpijn</li>
                  <li>Lethargie en tremoren</li>
                  <li>Bloeddrukdaling</li>
                </ul>

                <h3 id="heading-kerstcactus" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  5. Kerstcactus - Licht Giftig
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Hoewel minder giftig dan andere kerstplanten, kan de kerstcactus nog steeds maagklachten veroorzaken.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Symptomen:</strong> Lichte braken en diarree. Over het algemeen mild, maar toch vermijden.
                </p>

                <h3 id="heading-andere-giftige-planten" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Andere Giftige Kerstplanten
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Kerstroos (Helleborus):</strong> Zeer giftig - hartproblemen, braken, diarree</li>
                  <li><strong>Narcissen en Hyacinten:</strong> Vooral bollen zijn giftig</li>
                  <li><strong>Klimop (Ivy):</strong> Braken, diarree, buikpijn</li>
                  <li><strong>Lelies:</strong> LEVENSGEVAARLIJK voor katten - kan tot nierfalen leiden</li>
                </ul>

                <BetweenContentAd testMode={true} />

                <h2 id="heading-kerstboom-gevaren" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Kerstboom Gevaren
                </h2>

                <h3 id="heading-kerstboom-klimmen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Klimmen en Omvallen
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Voor katten is een kerstboom een gigantische krabpaal. Klimmen kan leiden tot:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Boom valt om - risico op verwondingen of beklemd raken</li>
                  <li>Glazen ballen breken - snijwonden aan poten</li>
                  <li>Val van grote hoogte - botbreuken of interne verwondingen</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Bevestig de boom stevig aan de muur of plafond met draad of spanlint</li>
                  <li>Gebruik een zware, stabiele boomstandaard</li>
                  <li>Overweeg een kleinere boom die minder aantrekkelijk is om in te klimmen</li>
                  <li>Plaats de boom in een hoek van de kamer voor extra stabiliteit</li>
                </ul>

                <h3 id="heading-naalden-hars" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Dennennaalden en Hars
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Dennennaalden:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Scherpe naalden kunnen mond, keel of maag perforeren</li>
                  <li>Verstopping van darmen mogelijk bij inname van veel naalden</li>
                  <li>Oliën in naalden zijn giftig - symptomen: braken, kwijlen, zwakte</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Boomhars:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Irriteert huid, ogen en spijsverteringssysteem</li>
                  <li>Moeilijk te verwijderen uit vacht - kan leiden tot slikken tijdens wassen</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Stofzuig dagelijks rondom de boom om gevallen naalden te verwijderen</li>
                  <li>Overweeg een kunstboom (maar let op losse onderdelen)</li>
                  <li>Leg een boomrok of laken onder de boom om naalden op te vangen</li>
                </ul>

                <h3 id="heading-kerstboomwater" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Kerstboomwater
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Water in de boomstandaard bevat:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Giftige boomharsen en oliën</li>
                  <li>Conserveringsmiddelen (als toegevoegd)</li>
                  <li>Meststoffen</li>
                  <li>Bacteriën en schimmels</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Symptomen:</strong> Braken, diarree, overmatig kwijlen, lethargie.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Dek de waterbak volledig af met folie of een speciale afdekking</li>
                  <li>Gebruik een boomstandaard met ingebouwde afdekking</li>
                  <li>Zet de boom in een zware pot met verborgen waterbak</li>
                </ul>

                <BetweenContentAd testMode={true} />

                <h2 id="heading-kerstversiering-gevaren" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Gevaarlijke Kerstversieringen
                </h2>

                <h3 id="heading-lametta-slingers" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Lametta en Slingers
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Glanzende, bewegende objecten zijn onweerstaanbaar voor katten. Probleem: lineaire vreemde voorwerpen zijn levensgevaarlijk.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Gevaar:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Ingeslikt lametta/lint kan de darmen 'doorzagen' tijdens peristaltiek</li>
                  <li>Veroorzaakt darmobstructie of -perforatie</li>
                  <li>Symptomen: braken, geen ontlasting, buikpijn, lethargie, eetlustverlies</li>
                  <li>Vaak is spoed chirurgie nodig - levensgevaarlijk!</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>GEEN lametta, lint of slingers in huis met katten</li>
                  <li>Gebruik papieren slingers of houten decoraties</li>
                  <li>Hang versieringen hoog, buiten bereik van springende katten</li>
                </ul>

                <h3 id="heading-kerstballen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Glazen Kerstballen
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Gevaar:</strong> Breken in scherpe scherven - snijwonden aan poten, mond of inwendige verwondingen bij inslikken.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Gebruik onbreekbare plastic of vilten ballen</li>
                  <li>Hang glazen ballen alleen in de top van de boom</li>
                  <li>Bevestig versieringen stevig zodat ze niet makkelijk losraken</li>
                </ul>

                <h3 id="heading-kerstlichtjes" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Kerstverlichting en Snoeren
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Gevaar:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Kauwen op snoeren - elektrische schok, brandwonden in mond, zeldzaam: dood</li>
                  <li>Verstrikken in snoeren</li>
                  <li>Gloeilampen kunnen heet worden en brandwonden veroorzaken</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Gebruik LED-lampjes (koel, energiezuinig)</li>
                  <li>Bescherm snoeren met kabelgoten of plastic slangen</li>
                  <li>Spray bittere anti-kauw spray op snoeren</li>
                  <li>Haal stekkers uit stopcontact wanneer je niet thuis bent</li>
                  <li>Leg snoeren achter meubels of bevestig ze aan de muur</li>
                </ul>

                <h3 id="heading-kaarsen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Kaarsen en Open Vuur
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Gevaar:</strong> Brandwonden, brandgevaar wanneer kat kandelaars omstoot, inhalatie van rook.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Gebruik LED-kaarsen in plaats van echte kaarsen</li>
                  <li>Plaats echte kaarsen in gesloten glazen houders op stabiele ondergrond</li>
                  <li>Laat kaarsen NOOIT onbeheerd branden</li>
                  <li>Houd kaarsen op hoge, niet bereikbare plekken</li>
                </ul>

                <h2 id="heading-kersteten" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Gevaarlijk Kersteten voor Katten
                </h2>

                <h3 id="heading-chocolade" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Chocolade
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Bevat theobromine, giftig voor katten. Symptomen: braken, diarree, verhoogd hartritme, tremoren, stuipen, in extreme gevallen: overlijden.
                </p>

                <h3 id="heading-druiven-rozijnen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Druiven en Rozijnen
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Kunnen acuut nierfalen veroorzaken bij katten. Symptomen verschijnen binnen 24 uur: braken, diarree, lethargie, verminderde urineproductie.
                </p>

                <h3 id="heading-ui-knoflook" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Ui en Knoflook
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Beschadigen rode bloedcellen, leiden tot bloedarmoede. Vaak in vulling, sauzen en stoofschotels.
                </p>

                <h3 id="heading-alcohol" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Alcohol
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Zeer gevaarlijk - zelfs kleine hoeveelheden kunnen leiden tot alcoholvergiftiging. Symptomen: braken, desoriëntatie, ademhalingsproblemen, coma.
                </p>

                <h3 id="heading-botten-vet" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Gekookte Botten en Vet Eten
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Gekookte botten:</strong> Spliteren gemakkelijk - verstikking of interne perforaties</li>
                  <li><strong>Vet vlees/vel:</strong> Kan pancreatitis (alvleesklierontsteking) veroorzaken</li>
                </ul>

                <h2 id="heading-veilig-vieren" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Tips Voor Veilig Kerstvieren met Katten
                </h2>

                <h3 id="heading-kattenveilige-decoraties" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Kies Kattenveilige Decoraties
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Kunstkerstboom of echte boom zonder giftige spray</li>
                  <li>Onbreekbare plastic of vilten versieringen</li>
                  <li>Houten of papieren decoraties</li>
                  <li>LED-verlichting in plaats van gloeilampen</li>
                  <li>Batterij-aangedreven LED-kaarsen</li>
                </ul>

                <h3 id="heading-afleiding-bieden" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Bied Afleiding
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Geef je kat zijn eigen 'kerstboom' - kattengras of kleine kattenboom met speeltjes</li>
                  <li>Verstop snacks in de kamer voor zoekspelletjes</li>
                  <li>Extra speeltijd om energie kwijt te raken</li>
                  <li>Nieuw speelgoed als kerstcadeau voor je kat</li>
                </ul>

                <h3 id="heading-supervisie" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Supervisie en Kamersluiting
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Sluit de kamer met de kerstboom af wanneer je niet thuis bent</li>
                  <li>Houd toezicht op je kat tijdens feesten en bezoek</li>
                  <li>Leer gasten geen eten te geven aan je kat</li>
                  <li>Ruim direct op na kerstdiner - geen restjes op tafel laten</li>
                </ul>

                <h3 id="heading-veilige-plek" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Creëer een Veilige Terugtrekplek
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Drukte en bezoek kunnen stressvol zijn. Zorg voor een rustige kamer met:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Water, voer en kattenbak</li>
                  <li>Favoriete ligplekken en dekens</li>
                  <li>Bekende speeltjes</li>
                  <li>Feromoon spray (Feliway) voor ontspanning</li>
                </ul>

                <h2 id="heading-symptomen-vergiftiging" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Symptomen van Vergiftiging Herkennen
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Let op deze alarmsignalen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Braken of diarree</li>
                  <li>Overmatig kwijlen</li>
                  <li>Lethargie of juist hyperactiviteit</li>
                  <li>Verminderde eetlust</li>
                  <li>Ademhalingsproblemen</li>
                  <li>Tremoren, stuiptrekkingen of wankelen</li>
                  <li>Verwijde of vernauwde pupillen</li>
                  <li>Bloed in urine of ontlasting</li>
                </ul>

                <div className="bg-cpCoral/10 dark:bg-cpCoral/20 border-l-4 border-cpCoral rounded-lg p-6 my-6">
                  <p className="text-foreground dark:text-cpCream font-bold text-lg mb-3">
                    Bij Vermoeden van Vergiftiging:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80">
                    <li>Bel DIRECT je dierenarts of Vergiftigingen Informatie Centrum Dier (070-3111771)</li>
                    <li>Neem indien mogelijk het verpakkingsmateriaal of plantendeel mee</li>
                    <li>Geef GEEN braakmiddelen zonder toestemming van dierenarts</li>
                    <li>Geef GEEN melk (kan opname van giftige stoffen versnellen)</li>
                    <li>Blijf kalm en hou je kat warm en rustig tijdens transport</li>
                  </ul>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-border dark:border-cpAmber/10">
                <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
                  Veelgestelde Vragen
                </h2>

                <div className="space-y-4">
                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Is een kunstkerstboom veiliger dan een echte boom?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Deels wel. Kunstbomen hebben geen giftige naalden of hars, maar let op losse plastic onderdelen die ingeslikt kunnen worden. Ook kunstbomen kunnen omvallen, dus bevestig ze goed. Het grootste voordeel is dat er geen giftig boomwater is.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Wat als mijn kat lametta heeft ingeslikt?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Ga DIRECT naar de dierenarts, ook als je kat nog geen symptomen vertoont. Trek niet aan het lametta als je een stukje uit de mond ziet hangen - dit kan inwendige schade veroorzaken. Lineaire vreemde voorwerpen zijn een spoedsituatie en vereisen vaak chirurgie.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Kan mijn kat een klein beetje kalkoenvet krijgen?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Dit wordt afgeraden. Vet voedsel kan pancreatitis (alvleesklierontsteking) veroorzaken, een ernstige aandoening. Als je je kat wilt trakteren, geef dan een klein stukje puur, gekookt kalkoenborstvlees zonder huid, kruiden of saus. Beter nog: geef speciaal kattensnacks.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Hoe weerhoudt ik mijn kat van de kerstboom?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Sprayi citrusgeur (katten haten dit) rond de boom. Leg aluminiumfolie of dubbelzijdige tape rond de voet - katten mijden deze texturen. Spuit met water wanneer je kat de boom nadert (alleen als je erbij bent). Bied alternatieven: kattengras, speeltjes, extra aandacht.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Zijn kerstrozen veilig voor katten?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Nee! Ondanks de naam zijn kerstrozen (Helleborus) ZEER giftig voor katten. Ze kunnen hartproblemen, ernstig braken en diarree veroorzaken. Vermijd deze plant volledig in huis met katten. Kies voor kattenveilige alternatieven zoals rozen of orchideeën.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kat kerst
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                giftig voor katten
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kerstboom kat
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                kerstplanten giftig
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
            Gerelateerde Artikelen
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/nl/gids/dierengezondheid/giftige-planten-katten"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Complete Lijst Giftige Planten voor Katten
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Alle kamerplanten en tuinplanten die giftig zijn voor katten
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>

            <Link
              href="/nl/gids/dierengezondheid/vergiftiging-kat"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Vergiftiging bij Katten: Herkennen & Handelen
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Symptomen herkennen en eerste hulp bij vergiftiging
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>

            <Link
              href="/nl/gids/kattenverzorging/veilig-huis"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Kattenveilig Huis: Complete Checklist
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Maak je huis veilig voor katten met deze uitgebreide gids
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>
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
            headline: "Kat en Kerst: Giftige Planten en Gevaren",
            description: "Vier veilig kerst met je kat. Complete gids over giftige kerstplanten, gevaarlijke versieringen en hoe je je kat beschermt tijdens de feestdagen.",
            image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&h=630&fit=crop",
            datePublished: publishDate.toISOString(),
            dateModified: publishDate.toISOString(),
            author: {
              "@type": "Organization",
              name: "CutiePawsPedia",
            },
            publisher: {
              "@type": "Organization",
              name: "CutiePawsPedia",
              logo: {
                "@type": "ImageObject",
                url: "https://cutiepawspedia.nl/logo.png",
              },
            },
          }),
        }}
      />
    </div>
  );
}

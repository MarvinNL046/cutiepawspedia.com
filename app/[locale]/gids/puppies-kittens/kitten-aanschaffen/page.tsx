import type { Metadata } from "next";
import { GidsBreadcrumbs } from '@/components/gids';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kitten Aanschaffen: Checklist en Voorbereiding | Gids 2024",
  description: "Wil je een kitten aanschaffen? Ontdek de complete checklist, kosten, voorbereiding en waar je een kitten kunt vinden. Vind dierenartsen bij jou in de buurt.",
  keywords: "kitten aanschaffen, kitten kopen, eerste kitten, kitten checklist, kat aanschaffen",
  openGraph: {
    title: "Kitten Aanschaffen: Complete Checklist en Voorbereiding",
    description: "Alles wat je moet weten voordat je een kitten aanschaft. Van voorbereiding tot de eerste weken thuis.",
  },
};

export default function KittenAanschafenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-cpAqua/10 via-cpYellow/10 to-cpPink/10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAqua/10 border border-cpAqua/30 text-cpAqua text-sm font-medium mb-6">
              <span>🐱</span>
              Complete Gids
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Kitten Aanschaffen: Checklist en Voorbereiding
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 mb-8">
              Een kitten in huis nemen is een grote verantwoordelijkheid. Ontdek wat je moet regelen, welke kosten je kunt verwachten en hoe je je huis voorbereid op je nieuwe viervoeter.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-6 border border-cpAqua/20">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground dark:text-cpCream mb-4">
                Zoek je een dierenarts voor kitten vaccinaties?
              </p>
              <Button
                asChild
                className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/nl/netherlands">Vind een dierenarts bij jou in de buurt →</Link>
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
              headline: "Kitten Aanschaffen: Checklist en Voorbereiding",
              description: "Uitgebreide gids over het aanschaffen van een kitten, inclusief checklist, kosten en voorbereiding.",
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
          <div className="bg-cpPink/10 border-l-4 border-cpPink rounded-r-xl p-6 mb-12">
            <p className="text-lg text-foreground dark:text-cpCream m-0">
              Een kitten brengt vreugde, speelsheid en gezelligheid in huis. Maar voordat je de stap zet, is het belangrijk
              om goed voorbereid te zijn. Van de juiste benodigdheden tot het kiezen van een gezond kitten - deze gids
              helpt je alles op een rijtje te zetten.
            </p>
          </div>

          {/* Section 1: Ben je klaar voor een kitten? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Ben Je Klaar Voor Een Kitten?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Een kat kan wel <strong>15-20 jaar oud worden</strong>. Dat is een lange termijn commitment. Vraag jezelf af:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li>Heb je <strong>tijd</strong> voor dagelijkse verzorging, spelen en aandacht?</li>
              <li>Kun je de <strong>kosten</strong> dragen (voer, dierenarts, speelgoed, verzekering)?</li>
              <li>Is je <strong>woonsituatie</strong> geschikt? (huurtoestemming, veilige omgeving)</li>
              <li>Ben je bereid om je <strong>levensstijl aan te passen</strong>? (vakantie, uitgaan)</li>
              <li>Kun je omgaan met <strong>krabschade</strong> aan meubels en eventuele ongelukjes?</li>
            </ul>

            <div className="bg-cpYellow/10 rounded-xl p-6 border border-cpYellow/30 mb-6">
              <p className="font-semibold text-cpYellow mb-2">💡 Overweeg ook een volwassen kat</p>
              <p className="text-sm text-foreground dark:text-cpCream/80 m-0">
                Een volwassen kat uit het asiel heeft ook liefde nodig en is vaak al gesocialiseerd en zindelijk.
                Kittens zijn schattig, maar vergen meer energie en training.
              </p>
            </div>
          </section>

          {/* Section 2: Waar vind je een kitten? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Waar Vind Je Een Gezond Kitten?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Er zijn verschillende plekken waar je een kitten kunt krijgen. Elk heeft voor- en nadelen:
            </p>

            <div className="space-y-6 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpAqua mb-3">🏠 Erkende Fokker</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Voordelen:</strong> Gezondheidsgarantie, stamboom, kennis over het ras, kittens zijn goed gesocialiseerd.
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Nadelen:</strong> Duurder (€500-€1500), vaak wachtlijst.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
                  Let op: Kies een fokker aangesloten bij een rasvereniging. Je mag altijd op bezoek komen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpAqua mb-3">🐾 Dierenasiel of -opvang</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Voordelen:</strong> Je geeft een katje een tweede kans, lagere kosten (€50-€150), kittens zijn vaak al gevaccineerd en gechipt.
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Nadelen:</strong> Achtergrond soms onbekend, minder keuze in ras.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
                  Asielen screenen goed en geven eerlijk advies over het karakter van het kitten.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-xl font-bold text-cpAqua mb-3">👥 Particulier / onverwacht nestje</h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Voordelen:</strong> Vaak gratis of tegen kleine vergoeding, je ziet de moeder en omgeving.
                </p>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-3">
                  <strong>Nadelen:</strong> Geen gezondheidsgarantie, kittens mogelijk niet gevaccineerd/gechipt, onbekende vader.
                </p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
                  Zorg dat de kittens minimaal 8 weken (liever 12 weken) bij de moeder blijven.
                </p>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-6">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Vermijd online advertenties zonder verificatie</p>
              <p className="text-sm text-red-600 dark:text-red-300 m-0">
                Koop nooit een kitten via dubieuze advertenties, zonder de moeder te zien, of op een parkeerplaats.
                Dit zijn vaak kittens van kittenfarms met gezondheids- en gedragsproblemen.
              </p>
            </div>
          </section>

          {/* Section 3: Checklist benodigdheden */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Complete Checklist: Wat Heb Je Nodig?
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Voordat je kitten thuiskomt, moet je huis volledig zijn ingericht. Hier is de complete lijst:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">🍽️ Eten & Drinken</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>✓ <strong>Voerbakjes</strong> (keramiek of roestvrij staal)</li>
                  <li>✓ <strong>Waterbak</strong> (altijd vers water beschikbaar)</li>
                  <li>✓ <strong>Kittenvoer</strong> (droog en nat, speciaal voor kittens)</li>
                  <li>✓ <strong>Eventueel drinkfontein</strong> (katten drinken graag stromend water)</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">🚽 Toiletbenodigdheden</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>✓ <strong>Kattenbak</strong> (groot genoeg, evt. met deksel)</li>
                  <li>✓ <strong>Kattenbakvulling</strong> (klompend of niet-klompend)</li>
                  <li>✓ <strong>Schepje</strong> voor het verschonen</li>
                  <li>✓ <strong>Onderlegger</strong> tegen rondstrooien</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">😴 Slaap & Rust</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>✓ <strong>Kattenmand of bed</strong> (zacht en warm)</li>
                  <li>✓ <strong>Dekentje</strong> (met geur van moeder mee is ideaal)</li>
                  <li>✓ <strong>Verstopplekjes</strong> (kittens verstoppen zich graag)</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">🎾 Spelen & Klimmen</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>✓ <strong>Speelgoed</strong> (muis, balletje, hengel)</li>
                  <li>✓ <strong>Krabpaal</strong> (essentieel vanaf dag 1!)</li>
                  <li>✓ <strong>Klimrek of kattenboom</strong> (optioneel, maar leuk)</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">🧼 Verzorging</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>✓ <strong>Borstel</strong> (langhaar vs. korthaar)</li>
                  <li>✓ <strong>Nagelknipper</strong> (speciale kattenknipper)</li>
                  <li>✓ <strong>Tandenborstel & tandpasta</strong> (speciaal voor katten)</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-6 border border-border dark:border-cpAmber/20">
                <h3 className="text-lg font-bold text-cpPink mb-4">🏥 Gezondheid</h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/80">
                  <li>✓ <strong>Reismand</strong> (voor dierenarts bezoek)</li>
                  <li>✓ <strong>Contactgegevens dierenarts</strong></li>
                  <li>✓ <strong>Eventueel verzekering</strong> afsluiten</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Secondary CTA */}
          <div className="bg-gradient-to-br from-cpPink/20 to-cpYellow/20 rounded-2xl shadow-md p-8 border border-cpPink/30 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
                Alles geregeld voor je nieuwe kitten?
              </h3>
              <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
                Vind dierenartsen, kattenpensions, trimsalons en meer bij jou in de buurt.
              </p>
              <Button
                asChild
                className="bg-cpPink text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
              >
                <Link href="/nl/netherlands">Bekijk alle kattenservices →</Link>
              </Button>
            </div>
          </div>

          {/* Section 4: Kosten */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Wat Kost Een Kitten? Realistisch Overzicht
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Naast de aanschafprijs zijn er structurele kosten. Hier is een realistisch overzicht voor het eerste jaar:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-card dark:bg-cpSurface/50 rounded-xl overflow-hidden">
                <thead className="bg-cpAqua/20">
                  <tr>
                    <th className="text-left p-4 font-bold text-foreground dark:text-cpCream">Kostenpost</th>
                    <th className="text-right p-4 font-bold text-foreground dark:text-cpCream">Eenmalig</th>
                    <th className="text-right p-4 font-bold text-foreground dark:text-cpCream">Per jaar</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground dark:text-cpCream/80">
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Aanschafprijs kitten</td>
                    <td className="text-right p-4">€0 - €1500</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Eerste benodigdheden (bakken, mand, speelgoed, krabpaal)</td>
                    <td className="text-right p-4">€100 - €250</td>
                    <td className="text-right p-4">-</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Dierenarts (vaccinaties, chip, controles, castratie/sterilisatie)</td>
                    <td className="text-right p-4">€200 - €400</td>
                    <td className="text-right p-4">€100 - €200</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Kattenvoer (nat en droog)</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">€250 - €500</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Kattenbakvulling</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">€100 - €200</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Verzekering (optioneel maar aan te raden)</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">€100 - €250</td>
                  </tr>
                  <tr className="border-t border-border dark:border-cpAmber/20">
                    <td className="p-4">Speelgoed, krabpaal vervangen</td>
                    <td className="text-right p-4">-</td>
                    <td className="text-right p-4">€50 - €150</td>
                  </tr>
                  <tr className="border-t-2 border-cpAqua bg-cpAqua/10 font-bold">
                    <td className="p-4 text-foreground dark:text-cpCream">TOTAAL EERSTE JAAR</td>
                    <td className="text-right p-4 text-foreground dark:text-cpCream" colSpan={2}>€900 - €3.450</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground dark:text-cpCream/70 italic">
              * Dit zijn gemiddelde prijzen. Rashonden en speciale voeding kunnen duurder zijn. Dierenarts kosten kunnen
              sterk variëren bij onverwachte medische problemen.
            </p>
          </section>

          {/* Section 5: Voorbereiding huis */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Maak Je Huis Kitten-Proof
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              Kittens zijn nieuwsgierig en avontuurlijk. Ze klimmen overal op, verstoppen zich in kleine plekjes en kauwen
              op kabels. Maak je huis veilig met deze tips:
            </p>

            <ul className="list-disc list-inside space-y-3 text-muted-foreground dark:text-cpCream/80 mb-6">
              <li>
                <strong>Verwijder giftige planten</strong> - Lelie, ficus, azalea en vele andere planten zijn giftig voor katten
              </li>
              <li>
                <strong>Berg kleine voorwerpen op</strong> - Elastiekjes, paperclips, naalden kunnen ingeslikt worden
              </li>
              <li>
                <strong>Beveilig kabels</strong> - Gebruik kabelgoten of bitter spray tegen kauwen
              </li>
              <li>
                <strong>Sluit gevaarlijke ruimtes af</strong> - Wasmachine, droger, koelkast (kittens kruipen overal in!)
              </li>
              <li>
                <strong>Zet ramen op een kier</strong> - Met kattenraam bescherming om vallen te voorkomen
              </li>
              <li>
                <strong>Ruim schoonmaakmiddelen op</strong> - In afgesloten kasten, weg van nieuwsgierige pootjes
              </li>
            </ul>

            <p className="text-muted-foreground dark:text-cpCream/80">
              <strong>Lees meer:</strong>{" "}
              <Link href="/nl/gids/puppies-kittens/kitten-socialiseren" className="text-cpAqua hover:text-cpAqua/80 underline">
                Kitten socialiseren: tips voor een sociale kat
              </Link>
            </p>
          </section>

          {/* Section 6: Eerste dagen */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              De Eerste Dagen Thuis
            </h2>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
              De eerste dagen zijn cruciaal voor de band met je kitten. Zo maak je de overgang soepel:
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">1️⃣</span>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Geef tijd en ruimte</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Laat je kitten de eerste dagen zijn gang gaan. Dwing geen knuffels af. Laat hem op eigen tempo
                    de nieuwe omgeving verkennen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">2️⃣</span>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Eén kamer tegelijk</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Begin in één kamer met voer, water, kattenbak en bed. Breid pas uit naar andere kamers als het kitten
                    zich comfortabel voelt.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">3️⃣</span>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Stel een routine in</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Vaste tijden voor eten en spelen geven structuur. Katten zijn gewoontedieren en houden van voorspelbaarheid.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">4️⃣</span>
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Gebruik positieve versterking</h3>
                  <p className="text-sm text-muted-foreground dark:text-cpCream/80">
                    Beloon gewenst gedrag (krabpaal gebruiken, kattenbak) met complimentjes en traktaties. Straf niet,
                    maar leid af naar betere alternatieven.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Veelgestelde Vragen
            </h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Vanaf welke leeftijd mag je een kitten meenemen?
                  <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Kittens mogen wettelijk pas vanaf 7 weken van de moeder gescheiden worden, maar <strong>12 weken is beter</strong>.
                  In deze extra weken leren ze belangrijke sociale vaardigheden van moeder en nestgenootjes. Kittens die te jong
                  gescheiden worden, hebben vaak meer gedrags- en gezondheidsproblemen.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Moet ik één of twee kittens nemen?
                  <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Twee kittens tegelijk heeft grote voordelen: ze vermaken elkaar, leren sociaal gedrag en vervelen zich minder.
                  Als je vaak weg bent, is een speelkameraadje ideaal. De kosten zijn natuurlijk wel dubbel, maar de moeite niet per se.
                  Overweeg wel twee kittens uit hetzelfde nest of van dezelfde leeftijd.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Wanneer moet een kitten gecastreerd of gesteriliseerd worden?
                  <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  De meeste dierenartsen adviseren castratie/sterilisatie rond <strong>6 maanden</strong>. Dit voorkomt ongewenste
                  zwangerschappen, vermindert markeergedrag en zwerfgedrag, en heeft gezondheidsvoordelen. Sommige dierenartsen doen
                  het al vanaf 4 maanden. Bespreek met je dierenarts wat het beste moment is voor jouw kitten.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Welk voer is het beste voor een kitten?
                  <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-cpCream/80">
                  Kies <strong>speciaal kittenvoer</strong> dat afgestemd is op hun snelle groei en hoge energiebehoefte. Kittens hebben
                  meer eiwit, calcium en fosfor nodig dan volwassen katten. Combineer droog en nat voer voor optimale vochtinname.
                  Kijk naar de samenstelling: vlees moet hoog op de ingrediëntenlijst staan. Vraag advies aan je dierenarts.
                </div>
              </details>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">
              Lees Ook
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/nl/gids/puppies-kittens/kitten-socialiseren"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpAqua/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpAqua mb-2">
                  Kitten socialiseren →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Tips voor een goed gesocialiseerde, sociale kat die zich prettig voelt in verschillende situaties.
                </p>
              </Link>
              <Link
                href="/nl/gids/puppies-kittens/puppy-kopen-tips"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20 hover:border-cpAqua/40 transition-all group"
              >
                <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpAqua mb-2">
                  Puppy kopen tips →
                </h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Complete gids voor het kopen van een puppy, van fokker selectie tot eerste dagen thuis.
                </p>
              </Link>
            </div>
          </section>

          {/* Tertiary CTA */}
          <div className="bg-gradient-to-br from-cpPink/10 to-cpAqua/10 rounded-2xl shadow-md p-8 border border-cpAqua/30 text-center">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">
              Klaar voor je nieuwe kitten?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
              Ontdek dierenartsen, kattenpensions, trimsalons en meer in jouw buurt.
            </p>
            <Button
              asChild
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
            >
              <Link href="/nl/netherlands">Ontdek alle huisdierservices →</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

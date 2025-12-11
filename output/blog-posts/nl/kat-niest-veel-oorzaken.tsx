import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import PhotoCredit from '@/components/PhotoCredit';
import BetweenContentAd from '@/components/BetweenContentAd';
import BlogSidebarAd from '@/components/BlogSidebarAd';

export const metadata: Metadata = {
  title: 'Kat niest veel: onschuldig of teken van ziekte? Volledige gids | CutiePawsPedia',
  description: 'Niest je kat veel? Ontdek wanneer niezen onschuldig is en wanneer je naar de dierenarts moet. Complete gids over oorzaken, symptomen en behandeling.',
  keywords: 'kat niest, niezen kat, kat verkouden, kattengriep, kat gezondheid',
  openGraph: {
    title: 'Kat niest veel: onschuldig of teken van ziekte? Volledige gids',
    description: 'Ontdek wanneer niezen bij katten onschuldig is en wanneer het een teken van ziekte is. Praktisch advies van experts.',
    images: ['/images/blog/kat-niest-veel-oorzaken.jpg'],
    type: 'article',
  },
};

export default function KatNiestVeelOorzaken() {
  return (
    <div className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-cpCoral text-white px-4 py-1 rounded-full text-sm font-semibold">
                Dierengezondheid
              </span>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Kat niest veel: onschuldig of teken van ziekte?
              </h1>
              <div className="flex items-center text-cpCharcoal/70 dark:text-cpCream/70 text-sm space-x-4">
                <time dateTime="2025-01-15">15 januari 2025</time>
                <span>•</span>
                <span>9 min leestijd</span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=600&fit=crop"
                alt="Kat die niest"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
              <PhotoCredit
                photographerName="Dimitri Houtteman"
                photographerUrl="https://unsplash.com/@dimhou"
                platform="Unsplash"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 mb-6">
                Een enkele nies van je kat is meestal niets om je zorgen over te maken. Maar als je kat vaak of langdurig niest, kan dit wijzen op een onderliggend gezondheidsprobleem. In dit artikel ontdek je alle oorzaken van niezen bij katten, wanneer je je zorgen moet maken, en wat je eraan kunt doen.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Waarom niezen katten?
              </h2>
              <p>
                Niezen is een natuurlijk afweermechanisme waarbij je kat irriterende stoffen uit haar neus en luchtwegen probeert te verwijderen. Net als bij mensen is een enkele nies volkomen normaal. Het kan veroorzaakt worden door:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Stof of stofdeeltjes in de lucht</li>
                <li>Parfum, schoonmaakmiddelen of andere sterke geuren</li>
                <li>Pollen of andere allergenen</li>
                <li>Een kietelend voorwerp in de neus</li>
              </ul>
              <p>
                Als je kat echter <strong>frequent, herhaaldelijk of langdurig</strong> niest, kan dit wijzen op een infectie, allergie of andere medische aandoening die aandacht vereist.
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Onschuldige oorzaken van niezen
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Stof en irriterende deeltjes
              </h3>
              <p>
                De meest voorkomende onschuldige oorzaak is <strong>stof</strong>. Katten hebben een zeer gevoelige neus en kunnen niezen van:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Stoffig kattenbakvulling (vooral klontvormend bentoniet)</li>
                <li>Stof tijdens het schoonmaken</li>
                <li>Nieuwe meubels of tapijten die chemische stoffen afgeven</li>
                <li>Bouwstof of renovaties in huis</li>
              </ul>
              <p>
                <strong>Oplossing:</strong> Wissel naar stofvrij kattenbakvulling, stofzuig regelmatig en ventileer goed na gebruik van schoonmaakmiddelen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Sterke geuren
              </h3>
              <p>
                Katten hebben een uitstekende reukzin en kunnen niezen van:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Parfum, deodorant of aftershave</li>
                <li>Schoonmaakmiddelen met sterke chemische geuren</li>
                <li>Geurkaarsjes of luchtverfrissers</li>
                <li>Sterke kruiden tijdens het koken (peper, knoflook)</li>
              </ul>
              <p>
                <strong>Oplossing:</strong> Gebruik geurvrije producten waar mogelijk en zorg voor goede ventilatie. Vermijd geursprays in de buurt van je kat.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Seizoensgebonden allergenen
              </h3>
              <p>
                Sommige katten hebben last van <strong>seizoensallergieën</strong>, vooral in het voorjaar en de zomer wanneer pollen in de lucht zijn. Dit wordt ook wel 'hooikoorts bij katten' genoemd.
              </p>
              <p>
                <strong>Symptomen:</strong> Periodiek niezen (vooral tijdens bepaalde seizoenen), tranende ogen, soms jeuk.
              </p>
              <p>
                <strong>Oplossing:</strong> Houd ramen gesloten tijdens piekperiodes, veeg de vacht van je kat af na buitenverblijf, en overweeg antihistaminica (alleen onder begeleiding van dierenarts).
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Medische oorzaken van veel niezen
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Bovenste luchtweginfecties (kattengriep)
              </h3>
              <p>
                <strong>Kattengriep</strong> is een van de meest voorkomende oorzaken van herhaaldelijk niezen. Het wordt veroorzaakt door verschillende virussen:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Kattenziektevirus (FHV-1):</strong> Zeer besmettelijk virus dat levenslang in het lichaam blijft</li>
                <li><strong>Calicivirus:</strong> Veroorzaakt bovenste luchtweginfecties en mondproblemen</li>
                <li><strong>Bacteriële infecties:</strong> Zoals Chlamydophila en Bordetella</li>
              </ul>

              <div className="bg-cpCoral/10 border-l-4 border-cpCoral p-6 rounded-r-lg mb-6">
                <h4 className="font-bold text-lg mb-3">Symptomen van kattengriep:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Frequent niezen en neusuitvloeiing (helder of geel/groen)</li>
                  <li>Tranende ogen met oogafscheiding</li>
                  <li>Koorts en lusteloos gedrag</li>
                  <li>Verminderde eetlust</li>
                  <li>Hoesten of moeite met ademhalen</li>
                  <li>Mondproblemen of kwijlen</li>
                </ul>
              </div>

              <p>
                <strong>Behandeling:</strong> Er is geen directe behandeling voor virale infecties, maar de dierenarts kan ondersteunende zorg bieden: antibiotica bij secundaire bacteriële infecties, ontstekingsremmers, oogdruppels, en voedingsondersteuning.
              </p>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Chronische rhinitis en sinusitis
              </h3>
              <p>
                <strong>Chronische ontsteking</strong> van de neusholte (rhinitis) of neusbijholten (sinusitis) kan leiden tot aanhoudend niezen. Dit komt vaak voor bij katten die eerder kattengriep hebben gehad.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Langdurig of chronisch niezen</li>
                <li>Dik, gekleurd neusslijm</li>
                <li>Verstopte neus en snurkgeluiden</li>
                <li>Verminderde reukzin en slechte eetlust</li>
                <li>Gezichtspijn (kat wrijft veel over gezicht)</li>
              </ul>
              <p>
                <strong>Behandeling:</strong> Langdurige antibiotica, ontstekingsremmers, luchtwegverdampers, en soms chirurgische spoeling van de neusbijholten.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Tandproblemen en mondinfecties
              </h3>
              <p>
                Verrassend genoeg kunnen <strong>tandproblemen</strong> ook niezen veroorzaken. Infecties aan de wortels van de boventanden kunnen zich verspreiden naar de neusholte.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Niezen gepaard met bloederige neusuitvloeiing</li>
                <li>Slechte adem</li>
                <li>Moeite met eten of eenzijdig kauwen</li>
                <li>Kwijlen</li>
                <li>Zwelling in het gezicht</li>
              </ul>
              <p>
                <strong>Behandeling:</strong> Tandextractie, antibiotica, en pijnstillers. Regelmatige tandencontroles bij de dierenarts zijn belangrijk voor preventie.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Neus- of luchtwegkanker
              </h3>
              <p>
                Hoewel zeldzaam, kunnen <strong>tumoren</strong> in de neus of luchtwegen niezen veroorzaken, vooral bij oudere katten.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Langdurig eenzijdig niezen</li>
                <li>Bloedige of bruinige neusuitvloeiing</li>
                <li>Zwelling of misvormingen in het gezicht</li>
                <li>Moeite met ademhalen</li>
                <li>Gewichtsverlies en algemene malaise</li>
              </ul>
              <p>
                <strong>Diagnose en behandeling:</strong> CT-scan, biopsie. Behandeling kan bestaan uit chirurgie, bestraling of chemotherapie, afhankelijk van type en locatie.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Vreemd voorwerp in de neus
              </h3>
              <p>
                Katten (vooral jonge, nieuwsgierige katten) kunnen soms een <strong>grasspriertje, zaadje of klein voorwerp</strong> in hun neus krijgen.
              </p>
              <p>
                <strong>Symptomen:</strong>
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Plotseling, hevig en aanhoudend niezen</li>
                <li>Vaak eenzijdig (uit één neusgat)</li>
                <li>Poot tegen neus wrijven</li>
                <li>Bloederige neusuitvloeiing</li>
              </ul>
              <p>
                <strong>Behandeling:</strong> De dierenarts verwijdert het voorwerp, vaak onder sedatie. Probeer dit nooit zelf te doen!
              </p>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Wanneer moet je naar de dierenarts?
              </h2>
              <div className="bg-cpAmber/10 border-l-4 border-cpAmber p-6 rounded-r-lg mb-6">
                <h3 className="font-bold text-lg mb-3">Ga direct naar de dierenarts als je kat:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Meer dan 2-3 dagen achter elkaar niest</strong></li>
                  <li><strong>Bloedige neusuitvloeiing heeft</strong> (rood, roze of bruin)</li>
                  <li><strong>Gele of groene neusafscheiding heeft</strong> (teken van infectie)</li>
                  <li><strong>Moeite heeft met ademhalen</strong> of met open mond ademt</li>
                  <li><strong>Niet wil eten of drinken</strong></li>
                  <li><strong>Koorts heeft</strong> (lusteloos, warme oren)</li>
                  <li><strong>Oogproblemen heeft</strong> (oogafscheiding, roodheid, dichtgeknepen ogen)</li>
                  <li><strong>Gezichtszwelling vertoont</strong></li>
                  <li><strong>Gewicht verliest</strong> of algemeen ziek lijkt</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Diagnose: Wat doet de dierenarts?
              </h2>
              <p>
                Om de oorzaak van het niezen te achterhalen, kan de dierenarts verschillende onderzoeken doen:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Lichamelijk onderzoek:</strong> Controle van neus, mond, ogen, lymfeklieren en algemene conditie</li>
                <li><strong>Neusuitstrijkje:</strong> Om bacteriële of virale infecties aan te tonen</li>
                <li><strong>Bloedonderzoek:</strong> Om systemische ziekten uit te sluiten</li>
                <li><strong>Röntgenfoto's:</strong> Van neus, bek en longen om structurele problemen te zien</li>
                <li><strong>CT-scan of MRI:</strong> Voor gedetailleerde beelden bij chronische problemen of verdenking op tumoren</li>
                <li><strong>Rhinoscopie:</strong> Een camera in de neus om vreemde voorwerpen, tumoren of polypen te zien</li>
                <li><strong>Biopsie:</strong> Bij verdenking op tumoren of chronische ontsteking</li>
              </ul>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Thuiszorg voor een niezende kat
              </h2>
              <p>
                Als je kat milde symptomen heeft en je de dierenarts nog niet hebt geraadpleegd (of als ondersteunende zorg na behandeling), kun je deze stappen proberen:
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Stoom en vochtigheid
              </h3>
              <p>
                Laat je kat 10-15 minuten in een badkamer zitten waar je de douche op warm water hebt laten lopen (zonder de kat nat te maken). De stoom helpt verstopte luchtwegen te openen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Neus schoonmaken
              </h3>
              <p>
                Veeg voorzichtig neusafscheiding weg met een vochtige, warme doek. Dit voorkomt verstopping en helpt je kat beter te ademen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Luchtverfrisser of luchtreiniger
              </h3>
              <p>
                Een luchtbevochtiger kan helpen, vooral in droge maanden. Zorg voor schone filters om nieuwe irritatie te voorkomen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Aanmoedigen om te eten
              </h3>
              <p>
                Katten met verstopte neuzen verliezen hun eetlust omdat ze niet kunnen ruiken. Warm het eten op om de geur te versterken, en bied zeer smakelijk voer aan (zoals tonijn of kippenborst).
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                5. Isolatie van andere huisdieren
              </h3>
              <p>
                Als je vermoedt dat je kat kattengriep heeft, houd haar dan gescheiden van andere katten om besmetting te voorkomen.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Preventie: Hoe voorkom je niezen bij katten?
              </h2>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                1. Vaccinaties up-to-date houden
              </h3>
              <p>
                Zorg dat je kat gevaccineerd is tegen kattengriep (FHV-1, Calicivirus, Chlamydophila). Dit voorkomt ernstige infecties of verzacht de symptomen.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                2. Schone leefomgeving
              </h3>
              <p>
                Houd de leefruimte van je kat schoon en stofvrij. Gebruik stofvrij kattenbakvulling en vermijd sterke chemische geuren.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                3. Stress verminderen
              </h3>
              <p>
                Stress verzwakt het immuunsysteem. Zorg voor een rustige, stabiele omgeving en voorkom plotselinge veranderingen waar mogelijk.
              </p>

              <h3 className="text-2xl font-semibold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
                4. Regelmatige tandencontroles
              </h3>
              <p>
                Preventieve tandverzorging helpt tandinfecties te voorkomen die kunnen leiden tot neusproblemen.
              </p>

              <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mt-12 mb-6">
                Conclusie: Luister naar je kat
              </h2>
              <p>
                Een enkele nies is niets om je zorgen over te maken, maar herhaaldelijk of chronisch niezen vereist aandacht. Door de symptomen goed te observeren en tijdig hulp te zoeken, kun je je kat helpen gezond en comfortabel te blijven.
              </p>
              <p>
                Als je twijfelt, is het altijd beter om voorzichtig te zijn en contact op te nemen met je dierenarts. Vroege interventie kan het verschil maken tussen een snelle genezing en chronische problemen.
              </p>

              {/* FAQ Section */}
              <div className="mt-12 bg-cpSurface dark:bg-cpCharcoal/50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                  Veelgestelde vragen
                </h2>
                <div className="space-y-4">
                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Is niezen bij katten besmettelijk voor andere huisdieren of mensen?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Kattengriep is zeer besmettelijk voor andere katten, maar niet voor mensen of honden. Als je meerdere katten hebt, isoleer dan een niezende kat totdat de oorzaak bekend is. Mensen kunnen wel het virus overdragen tussen katten via handen en kleding.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Kan ik mijn kat menselijke neusspray of medicijnen geven?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Nee, geef nooit menselijke medicijnen aan je kat zonder overleg met de dierenarts. Veel menselijke medicijnen zijn giftig voor katten. De dierenarts kan veilige alternatieven voorschrijven.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Hoe lang duurt kattengriep normaal?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Acute kattengriep duurt meestal 7-14 dagen. Sommige katten blijven chronische dragers van het virus en kunnen terugkerende symptomen hebben, vooral tijdens stressvolle periodes. Met goede ondersteunende zorg herstellen de meeste katten volledig.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Zijn bepaalde kattenrassen gevoeliger voor niezen?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Ja, platte (brachycephale) rassen zoals Perzen en Himalaya's hebben een verhoogd risico op luchtwegproblemen door hun korte neus en afwijkende neusstructuur. Deze katten vereisen extra aandacht en preventieve zorg.
                    </p>
                  </details>

                  <details className="group">
                    <summary className="font-semibold text-lg cursor-pointer text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Wat is het verschil tussen helder en gekleurd neusslijm?
                    </summary>
                    <p className="mt-3 text-cpCharcoal/80 dark:text-cpCream/80 pl-4">
                      Helder slijm duidt meestal op een virale infectie, allergie of irritatie. Geel of groen slijm wijst op een bacteriële infectie en vereist antibiotica. Bloederig slijm kan wijzen op een ernstig probleem zoals een vreemd voorwerp, trauma of tumor.
                    </p>
                  </details>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-12 bg-cpAmber/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                  Gerelateerde artikelen
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/gids/kattengezondheid/kattengriep-symptomen-behandeling"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Kattengriep: symptomen en behandeling
                    </h3>
                  </Link>
                  <Link
                    href="/gids/kattengezondheid/kat-eet-niet-drinkt-wel"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Kat eet niet maar drinkt wel: wat te doen?
                    </h3>
                  </Link>
                  <Link
                    href="/gids/kattenverzorging/kat-vaccinaties-schema"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Vaccinatieschema voor katten: complete gids
                    </h3>
                  </Link>
                  <Link
                    href="/gids/kattengezondheid/tandverzorging-kat"
                    className="p-4 bg-white dark:bg-cpCharcoal/30 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-cpCharcoal dark:text-cpCream hover:text-cpCoral transition-colors">
                      Tandverzorging bij katten: preventie en tips
                    </h3>
                  </Link>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    kat niest
                  </span>
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    kattengezondheid
                  </span>
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    kattengriep
                  </span>
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    luchtweginfectie
                  </span>
                  <span className="px-4 py-2 bg-cpCoral/10 text-cpCoral rounded-full text-sm font-medium">
                    dierenarts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BlogSidebarAd />

              {/* Warning Box */}
              <div className="bg-cpCoral/10 border border-cpCoral rounded-2xl p-6">
                <h3 className="font-bold text-lg text-cpCharcoal dark:text-cpCream mb-3">
                  ⚠️ Let op!
                </h3>
                <p className="text-sm text-cpCharcoal/80 dark:text-cpCream/80">
                  Neem altijd contact op met je dierenarts bij aanhoudend niezen, bloederige neusuitvloeiing, of als je kat niet wil eten.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Kat niest veel: onschuldig of teken van ziekte?",
            "description": "Niest je kat veel? Ontdek wanneer niezen onschuldig is en wanneer je naar de dierenarts moet. Complete gids over oorzaken, symptomen en behandeling.",
            "image": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=600&fit=crop",
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "author": {
              "@type": "Organization",
              "name": "CutiePawsPedia"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CutiePawsPedia",
              "logo": {
                "@type": "ImageObject",
                "url": "https://cutiepawspedia.nl/logo.png"
              }
            }
          })
        }}
      />
    </div>
  );
}

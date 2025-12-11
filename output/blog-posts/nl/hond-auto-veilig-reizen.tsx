import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BetweenContentAd } from '@/components/ads/BetweenContentAd';
import { BlogSidebarAd } from '@/components/ads/BlogSidebarAd';
import { PhotoCredit } from '@/components/PhotoCredit';

export const metadata: Metadata = {
  title: 'Hond in de Auto: Veilig en Comfortabel Reizen | CutiePawsPedia',
  description: 'Ontdek hoe je veilig en comfortabel met je hond in de auto reist. Tips voor veiligheid, training, anti-wagenziekte en de juiste bevestigingsmiddelen.',
  keywords: 'hond auto, hond vervoeren, autoreizen hond, hond gordel, hond bench auto, wagenziekte hond',
  openGraph: {
    title: 'Hond in de Auto: Veilig en Comfortabel Reizen',
    description: 'Complete gids voor veilig autoreizen met je hond.',
    type: 'article',
    publishedTime: '2025-01-15T14:00:00Z',
    authors: ['CutiePawsPedia'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Hond in auto'
      }
    ]
  }
};

export default function HondAutoPage() {
  return (
    <article className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Hond in de auto: veilig en comfortabel reizen',
            description: 'Complete gids voor veilig en comfortabel autoreizen met je hond',
            image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=630&fit=crop',
            datePublished: '2025-01-15T14:00:00Z',
            dateModified: '2025-01-15T14:00:00Z',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia'
            },
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cutiepawspedia.nl/logo.png'
              }
            }
          })
        }}
      />

      {/* Hero Section */}
      <header className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600&h=900&fit=crop"
          alt="Hond kijkt uit autoraam tijdens een autorit"
          fill
          className="object-cover"
          priority
        />
        <PhotoCredit
          photographerName="Karsten Winegeart"
          photographerUrl="https://unsplash.com/@karsten116"
          platform="Unsplash"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cpCharcoal/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 bg-cpCoral text-white text-sm font-semibold rounded-full mb-4">
              Reizen met Huisdieren
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Hond in de auto: veilig en comfortabel reizen
            </h1>
            <div className="flex items-center text-cpCream/80 text-sm">
              <time dateTime="2025-01-15">15 januari 2025</time>
              <span className="mx-3">•</span>
              <span>10 minuten leestijd</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:flex md:gap-8">
        {/* Article Content */}
        <main className="md:w-2/3">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl text-cpCharcoal/80 dark:text-cpCream/80 leading-relaxed">
              Of het nu gaat om een bezoek aan de dierenarts, een dagje strand of een lange vakantiereis: vroeg of laat moet je met je hond in de auto. Veilig en comfortabel reizen met je hond vraagt om voorbereiding, de juiste uitrusting en kennis van de regels. In deze complete gids leer je alles over autoreizen met je viervoeter.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Waarom is veilig vervoer zo belangrijk?
            </h2>
            <p>
              Het veilig vervoeren van je hond in de auto is niet alleen verstandig, maar ook wettelijk verplicht. Een onbeveiligde hond kan bij een ongeval of plotselinge remming:
            </p>
            <ul className="space-y-2">
              <li><strong>Zichzelf ernstig verwonden:</strong> Bij een botsing bij 50 km/u wordt een hond van 20 kg een projectiel van 500 kg</li>
              <li><strong>Inzittenden verwonden:</strong> Een loslopende hond kan door de auto slingeren en anderen raken</li>
              <li><strong>De bestuurder afleiden:</strong> Een hond op schoot of tussen de pedalen is levensgevaarlijk</li>
              <li><strong>Bij een ongeval ontsnappen:</strong> Een geschrokken hond kan de weg oplopen en aangereden worden</li>
            </ul>
            <p>
              Daarnaast ben je wettelijk aansprakelijk voor schade die een onbeveiligde lading (inclusief je hond) veroorzaakt. Verzekeraars kunnen bij een ongeval weigeren uit te keren als je hond niet goed vastgezet was.
            </p>

            <BetweenContentAd />

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Wetgeving in Nederland: wat zijn de regels?
            </h2>
            <p>
              In Nederland staat in artikel 5.19 van het Reglement verkeersregels en verkeerstekens (RVV 1990) dat lading deugdelijk moet zijn vastgemaakt. Je hond wordt juridisch gezien als lading beschouwd. Dit betekat:
            </p>
            <ul className="space-y-2">
              <li>Je hond moet goed vastgezet of afgeschermd zijn tijdens het rijden</li>
              <li>Een loslopende hond in de auto is verboden</li>
              <li>Bij overtreding kun je een boete krijgen van €140</li>
              <li>Bij een ongeval ben je aansprakelijk voor schade aan anderen</li>
            </ul>
            <p>
              Goede bevestiging betekent: veiligheidsgordelharnas, reisbench, of afscheiding tussen kofferbak en passagiersruimte. Een hond op schoot, loslopend in de auto of alleen vastgehouden voldoet NIET aan de wet.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Veilige manieren om je hond te vervoeren
            </h2>
            <p>
              Er zijn verschillende goedgekeurde methoden om je hond veilig te vervoeren. De beste keuze hangt af van je auto, de grootte van je hond en jullie reisgewoonten.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              1. Veiligheidsgordelharnas (voor kleine tot middelgrote honden)
            </h3>
            <p>
              Een gecertificeerd gordelharnas zet je vast aan het gordeloprolsysteem van de auto.
            </p>
            <p>
              <strong>Voordelen:</strong>
            </p>
            <ul className="space-y-2">
              <li>Relatief goedkoop (€30-€80)</li>
              <li>Past in elke auto</li>
              <li>Makkelijk aan en uit te doen</li>
              <li>Je hond kan uit het raam kijken</li>
            </ul>
            <p>
              <strong>Nadelen:</strong>
            </p>
            <ul className="space-y-2">
              <li>Minder veilig bij zware botsingen dan een bench</li>
              <li>Niet geschikt voor grote, zware honden (risico op verwondingen)</li>
              <li>Je hond moet gewend zijn aan het harnas</li>
            </ul>
            <p>
              <strong>Let op:</strong> Kies een crash-tested harnas met brede stroken die druk verdelen. Goede merken: Sleepypod, Kurgo, Ruffwear. Gebruik NOOIT een normale wandeltuig - deze zijn niet ontworpen voor autoveiligheid en kunnen bij een botsing ernstige inwendige verwondingen veroorzaken.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              2. Reisbench (veiligste optie)
            </h3>
            <p>
              Een stevige bench die vastzet aan de autogordels of vast gemonteerd wordt.
            </p>
            <p>
              <strong>Voordelen:</strong>
            </p>
            <ul className="space-y-2">
              <li>Meest veilige optie bij een ongeval</li>
              <li>Beschermt je hond tegen vliegende objecten</li>
              <li>Biedt een eigen, rustgevende ruimte</li>
              <li>Voorkomt dat je hond rondloopt in de auto</li>
              <li>Geschikt voor alle maten honden</li>
            </ul>
            <p>
              <strong>Nadelen:</strong>
            </p>
            <ul className="space-y-2">
              <li>Duurder (€80-€300+)</li>
              <li>Neemt ruimte in (vooral voor grote honden)</li>
              <li>Zwaar om in en uit de auto te tillen</li>
              <li>Je hond moet gewend zijn aan bench-gebruik</li>
            </ul>
            <p>
              <strong>Kies voor:</strong> Een crash-tested bench (zoek naar TÜV of Variocage certificering). Zorg dat de bench groot genoeg is: je hond moet kunnen staan, liggen en omdraaien.
            </p>

            <BetweenContentAd />

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              3. Hondenscheidingsnet of -hek (voor kofferbak)
            </h3>
            <p>
              Een stevig hek tussen de kofferbak en de passagiersruimte.
            </p>
            <p>
              <strong>Voordelen:</strong>
            </p>
            <ul className="space-y-2">
              <li>Geschikt voor grote honden</li>
              <li>Relatief betaalbaar (€50-€150)</li>
              <li>Je hond heeft veel bewegingsruimte</li>
              <li>Eenvoudig te monteren</li>
            </ul>
            <p>
              <strong>Nadelen:</strong>
            </p>
            <ul className="space-y-2">
              <li>Je hond is niet individueel vastgezet (kan slingeren in de kofferruimte)</li>
              <li>Bij frontale botsing kan je hond toch tegen het hek botsen</li>
              <li>Alleen geschikt voor auto's met aparte kofferbak</li>
              <li>Minder bescherming dan een bench</li>
            </ul>
            <p>
              <strong>Tip:</strong> Combineer een scheidingsnet met een speciale autogordel in de kofferruimte voor extra veiligheid. Zorg dat het net stevig geïnstalleerd is volgens fabrikant-instructies.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              4. Autostoelhoes met gordel (voor kleine honden)
            </h3>
            <p>
              Een hoes die de achterbank beschermt, vaak met geïntegreerde bevestigingspunten.
            </p>
            <p>
              <strong>Voordelen:</strong>
            </p>
            <ul className="space-y-2">
              <li>Beschermt je autobekleding</li>
              <li>Comfortabel voor je hond</li>
              <li>Makkelijk schoon te maken</li>
              <li>Betaalbaar (€30-€70)</li>
            </ul>
            <p>
              <strong>Nadelen:</strong>
            </p>
            <ul className="space-y-2">
              <li>Moet altijd gecombineerd worden met een gordelharnas</li>
              <li>Hoes alleen biedt GEEN veiligheid</li>
              <li>Niet voor zware honden</li>
            </ul>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Je hond leren van autorijden genieten
            </h2>
            <p>
              Niet alle honden zijn natuurlijke autofans. Met positieve training kun je autorijden een fijne ervaring maken:
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Stap 1: Maak de auto positief
            </h3>
            <ul className="space-y-2">
              <li>Laat je hond de auto verkennen terwijl deze stilstaat</li>
              <li>Geef snoepjes en speelgoed in de auto</li>
              <li>Voer maaltijden in de auto (motor uit)</li>
              <li>Maak zijn bench of zitplek extra comfortabel met een dekentje</li>
            </ul>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Stap 2: Korte ritjes maken
            </h3>
            <ul className="space-y-2">
              <li>Begin met de motor starten zonder te rijden</li>
              <li>Maak ritjes van 5 minuten naar leuke plekken (park, niet de dierenarts!)</li>
              <li>Bouw de duur geleidelijk op</li>
              <li>Beloon rustig gedrag tijdens en na de rit</li>
            </ul>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Stap 3: Varieer bestemmingen
            </h3>
            <ul className="space-y-2">
              <li>Rijd niet alleen naar nare plekken (dierenarts, trimsalon)</li>
              <li>Afwisseling voorkomt negatieve associaties</li>
              <li>Maak 80% van de autoritten positief (strand, bos, speelafspraak)</li>
            </ul>

            <BetweenContentAd />

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Wagenziekte bij honden
            </h2>
            <p>
              Net als mensen kunnen honden last hebben van wagenziekte. Puppy's zijn extra gevoelig omdat hun evenwichtsorgaan nog niet volledig ontwikkeld is.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Symptomen van wagenziekte:
            </h3>
            <ul className="space-y-2">
              <li>Overmatig kwijlen</li>
              <li>Gapen en likken</li>
              <li>Onrust en jengelen</li>
              <li>Braken (vaak geel schuim)</li>
              <li>Uitputting na de rit</li>
            </ul>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tips tegen wagenziekte:
            </h3>
            <ul className="space-y-2">
              <li><strong>Niet eten voor de rit:</strong> Geef minimaal 2 uur voor vertrek geen voer meer</li>
              <li><strong>Frisse lucht:</strong> Open een raampje een klein stukje voor ventilatie</li>
              <li><strong>Zicht naar buiten:</strong> Help je hond de horizon te zien (vermindert misselijkheid)</li>
              <li><strong>Rustig rijden:</strong> Vermijd hard remmen en scherpe bochten</li>
              <li><strong>Frequente pauzes:</strong> Stop elke 1-2 uur voor een korte wandeling</li>
              <li><strong>Gember:</strong> Natuurlijk middel tegen misselijkheid (vraag dierenarts om dosering)</li>
              <li><strong>Medicatie:</strong> Bij ernstige wagenziekte kan de dierenarts anti-misselijkheidsmiddelen voorschrijven</li>
            </ul>
            <p>
              De meeste honden groeien over wagenziekte heen naarmate hun evenwichtsorgaan ontwikkelt. Met geduld en positieve training wordt het vaak beter.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Praktische tips voor lange autoritten
            </h2>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Voor vertrek:
            </h3>
            <ul className="space-y-2">
              <li><strong>Goede wandeling:</strong> Laat je hond voor de rit uitgebreid bewegen en zijn behoefte doen</li>
              <li><strong>Identificatie check:</strong> Controleer of chip geregistreerd is en je hond een tag draagt</li>
              <li><strong>Reismand klaar:</strong> Dekentje, favoriete speeltje voor troost</li>
              <li><strong>Handige tas pakken:</strong> Water, voerbak, handdoeken, poepzakjes, speelgoed</li>
              <li><strong>Medicatie:</strong> Als je hond medicijnen nodig heeft, neem voldoende mee</li>
            </ul>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tijdens de rit:
            </h3>
            <ul className="space-y-2">
              <li><strong>Regelmatig pauzeren:</strong> Elke 2 uur stoppen voor toiletpauze en beweging</li>
              <li><strong>Water aanbieden:</strong> Zorg dat je hond genoeg drinkt, vooral bij warm weer</li>
              <li><strong>Nooit alleen laten:</strong> Laat je hond nooit alleen in de auto, zelfs niet "even"</li>
              <li><strong>Temperatuur monitoren:</strong> Auto's warmen snel op - ook in de schaduw!</li>
              <li><strong>Rustige muziek:</strong> Klassieke muziek of speciale hondenmuziek kan kalmeren</li>
            </ul>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Bij warm weer:
            </h3>
            <ul className="space-y-2">
              <li>Airco aan of ramen op een kier (veilig voor je hond)</li>
              <li>Rijd in de ochtend of avond als het kan</li>
              <li>Koelmat of natte handdoek voor verkoeling</li>
              <li>Extra frequent water aanbieden</li>
              <li>Let op tekenen van oververhitting (hijgen, rode tong, lethargie)</li>
            </ul>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber p-6 my-8 rounded-r-lg">
              <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                Levensgevaar: hond alleen in de auto
              </h3>
              <p className="text-cpCharcoal/80 dark:text-cpCream/80">
                Bij 20°C buitentemperatuur kan een auto binnen 10 minuten oplopen tot 30°C en na 30 minuten tot 40°C. Dit is dodelijk voor honden! Zelfs met ramen op een kier of in de schaduw is dit levensgevaarlijk. Laat je hond NOOIT alleen in de auto, ook niet "even snel".
              </p>
            </div>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Checklist voor autoreizen met je hond
            </h2>
            <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 my-8">
              <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mb-4">
                Veiligheid
              </h3>
              <ul className="space-y-2 text-cpCharcoal/80 dark:text-cpCream/80">
                <li>☐ Crash-tested gordelharnas, bench of scheidingsnet</li>
                <li>☐ Bench of harnas correct geïnstalleerd en vastgemaakt</li>
                <li>☐ Identificatie: chip, tag met contactgegevens</li>
                <li>☐ EHBO-kit voor honden in de auto</li>
              </ul>

              <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mb-4 mt-6">
                Comfort
              </h3>
              <ul className="space-y-2 text-cpCharcoal/80 dark:text-cpCream/80">
                <li>☐ Zacht dekentje of kussen</li>
                <li>☐ Favoriete speeltje voor geruststelling</li>
                <li>☐ Koelmat of handdoek (warm weer)</li>
                <li>☐ Autostoelhoes (optioneel, voor bescherming interieur)</li>
              </ul>

              <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mb-4 mt-6">
                Verzorging
              </h3>
              <ul className="space-y-2 text-cpCharcoal/80 dark:text-cpCream/80">
                <li>☐ Voldoende water en reisdrinkbak</li>
                <li>☐ Voer voor lange reizen</li>
                <li>☐ Poepzakjes en keukenpapier</li>
                <li>☐ Handdoeken (voor modder, braaksel, etc.)</li>
                <li>☐ Medicatie indien nodig</li>
                <li>☐ Lijn voor pauzes</li>
              </ul>

              <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mb-4 mt-6">
                Documenten
              </h3>
              <ul className="space-y-2 text-cpCharcoal/80 dark:text-cpCream/80">
                <li>☐ Vaccinatieboekje of EU-huisdierpaspoort</li>
                <li>☐ Contactgegevens dierenarts</li>
                <li>☐ Verzekeringspapieren (indien van toepassing)</li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 my-12">
              <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Veelgestelde vragen
              </h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Mag mijn hond met zijn kop uit het raam?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Hoewel honden dit leuk vinden, is het niet verstandig. Vliegende objecten kunnen hun ogen beschadigen, insecten kunnen in hun keel terechtkomen, en bij hogere snelheden kan de luchtstroom pijnlijk zijn voor oren. Als je het raam open wilt, doe dit dan maximaal 5-10 cm zodat je hond niet zijn kop naar buiten kan steken.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Welke zitplaats is het veiligst voor mijn hond?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    De kofferbak of de vloer achter de voorstoelen zijn het veiligst. De achterbank is ook goed als je hond met een crash-tested harnas is vastgemaakt. De passagiersstoel voorin is het minst veilig vanwege de airbag. Zet de airbag uit als je hond voorin zit en gebruik altijd een goed harnas.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoe vaak moet ik pauzeren op lange ritten?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Minimaal elke 2 uur voor een toiletpauze, drinkpauze en korte wandeling (10-15 minuten). Jonge honden, oudere honden en honden met kleine blaazen hebben frequentere pauzes nodig (elke 1-1,5 uur). Plan je route met hondvriendelijke rustplaatsen of parkeerplaatsen met grasvelden.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan ik mijn hond anti-stressmedicatie geven voor autoritten?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Dit moet altijd in overleg met je dierenarts. Sedatiegeven zonder medisch advies is gevaarlijk en illegaal. Probeer eerst natuurlijke methoden: training, feromonen (Adaptil), Rescue Remedy, en geleidelijke gewenning. Bij ernstige stress of wagenziekte kan de dierenarts medicatie voorschrijven. Geef NOOIT menselijke medicijnen aan je hond.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Wat moet ik doen als mijn hond braakt in de auto?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Stop zo snel mogelijk veilig en laat je hond uitstappen voor frisse lucht. Reinig het braaksel met handdoeken en water. Bied na 30 minuten kleine hoeveelheden water aan, maar geen voer tot je op de bestemming bent. Als braken herhaaldelijk voorkomt, overleg dan met de dierenarts over anti-misselijkheidsmedicatie. Neem altijd extra handdoeken en keukenpapier mee voor noodgevallen.
                  </p>
                </details>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-cpCoral/5 dark:bg-cpCoral/10 rounded-lg p-6 my-12">
              <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Gerelateerde artikelen
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/gids/reizen-met-huisdieren/vakantie-hond"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Op vakantie met je hond: complete checklist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gids/huisdiertraining/puppytraining-basis"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Puppytraining: gewennen aan nieuwe situaties
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gids/dierengezondheid/hond-stress-herkennen"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Stress bij honden herkennen en verminderen
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                hond auto
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                hond vervoeren
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                autoreizen
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                veiligheid
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                reizen met huisdieren
              </span>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="md:w-1/3 mt-12 md:mt-0">
          <div className="sticky top-8">
            <BlogSidebarAd />
          </div>
        </aside>
      </div>
    </article>
  );
}

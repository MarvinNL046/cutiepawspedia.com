import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BetweenContentAd } from '@/components/ads/BetweenContentAd';
import { BlogSidebarAd } from '@/components/ads/BlogSidebarAd';
import { PhotoCredit } from '@/components/PhotoCredit';

export const metadata: Metadata = {
  title: 'Kattenoppas Vinden: 7 Tips voor de Perfecte Match | CutiePawsPedia',
  description: 'Op zoek naar een betrouwbare kattenoppas? Ontdek waar je een goede kattensitter vindt, wat je moet checken en hoe je de perfecte match vindt voor je kat.',
  keywords: 'kattenoppas, kattensitter, oppas kat, kattenoppas vinden, betrouwbare kattenoppas, kattenoppas tips',
  openGraph: {
    title: 'Kattenoppas Vinden: Tips voor de Perfecte Match',
    description: 'Vind de ideale kattenoppas met deze praktische tips en checklist.',
    type: 'article',
    publishedTime: '2025-01-15T11:00:00Z',
    authors: ['CutiePawsPedia'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Kat met kattenoppas'
      }
    ]
  }
};

export default function KattenoppasVindenPage() {
  return (
    <article className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      {/* Schema.org Article Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Kattenoppas vinden: tips voor de perfecte match',
            description: 'Uitgebreide gids over het vinden van een betrouwbare kattenoppas voor jouw kat',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=630&fit=crop',
            datePublished: '2025-01-15T11:00:00Z',
            dateModified: '2025-01-15T11:00:00Z',
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
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1600&h=900&fit=crop"
          alt="Tevreden kat wordt geaaid door kattenoppas"
          fill
          className="object-cover"
          priority
        />
        <PhotoCredit
          photographerName="Ludemeula Fernandes"
          photographerUrl="https://unsplash.com/@ludemeula"
          platform="Unsplash"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cpCharcoal/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 bg-cpCoral text-white text-sm font-semibold rounded-full mb-4">
              Professionele Diensten
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Kattenoppas vinden: tips voor de perfecte match
            </h1>
            <div className="flex items-center text-cpCream/80 text-sm">
              <time dateTime="2025-01-15">15 januari 2025</time>
              <span className="mx-3">•</span>
              <span>7 minuten leestijd</span>
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
              Ga je op vakantie of ben je een paar dagen van huis? Dan wil je natuurlijk dat je kat in goede handen is. Een betrouwbare kattenoppas kan het verschil maken tussen een zorgeloze vakantie en continu gepieker over je huisdier. In deze gids help ik je om de perfecte kattenoppas te vinden voor jouw eigenzinnige viervoeter.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Waarom een kattenoppas?
            </h2>
            <p>
              Katten zijn territoriumdieren die het liefst in hun eigen vertrouwde omgeving blijven. In tegenstelling tot honden, die vaak meegaan naar familie of een pension, zijn katten meestal gelukkiger als ze thuis kunnen blijven. Een kattenoppas komt dan naar jouw huis om je kat te verzorgen, te voeren en gezelschap te houden.
            </p>
            <p>
              De voordelen van een kattenoppas thuis:
            </p>
            <ul className="space-y-2">
              <li>Je kat blijft in zijn vertrouwde omgeving</li>
              <li>Minder stress dan vervoer naar een pension</li>
              <li>Persoonlijke aandacht en verzorging</li>
              <li>Je huis wordt in de gaten gehouden (post, planten, inbraakpreventie)</li>
              <li>Flexibele afspraken mogelijk</li>
            </ul>

            <BetweenContentAd />

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Waar vind je een goede kattenoppas?
            </h2>
            <p>
              Er zijn verschillende manieren om een kattenoppas te vinden. Elk heeft zijn voor- en nadelen:
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              1. Online platforms en apps
            </h3>
            <p>
              Websites en apps zoals Pawshake, Rover, en Care.com bieden een overzicht van kattenoppassen in jouw regio. Deze platforms hebben vaak:
            </p>
            <ul className="space-y-2">
              <li><strong>Profielen met reviews:</strong> Lees ervaringen van andere katteneigenaren</li>
              <li><strong>Achtergrondchecks:</strong> Sommige platforms verifiëren identiteit en doen VOG-checks</li>
              <li><strong>Verzekering:</strong> Bescherming bij schade of ongevallen</li>
              <li><strong>Gemakkelijke communicatie:</strong> Berichten, foto-updates en betalingen via het platform</li>
              <li><strong>Transparante prijzen:</strong> Duidelijk overzicht van tarieven</li>
            </ul>
            <p>
              <strong>Let op:</strong> Platforms rekenen vaak een commissie (10-25%). Controleer ook altijd zelf of de oppas echt betrouwbaar is, ondanks goede reviews.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              2. Professionele kattenoppasdiensten
            </h3>
            <p>
              Dit zijn gespecialiseerde bedrijven met opgeleide medewerkers. Ze bieden vaak aanvullende diensten zoals medicatie toedienen, EHBO-kennis en 24/7 bereikbaarheid. De kosten zijn hoger dan particuliere oppassen, maar je krijgt wel professionele service en verzekering.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              3. Familie, vrienden en buren
            </h3>
            <p>
              De meest voor de hand liggende optie, maar niet altijd beschikbaar. Voordelen zijn dat je deze mensen al kent en vertrouwt. Nadeel kan zijn dat ze minder ervaring hebben met katten of zich verplicht voelen om het te doen.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              4. Lokale Facebook-groepen en buurtapps
            </h3>
            <p>
              Via Nextdoor, lokale Facebook-groepen of de buurt-app kun je vragen naar aanbevelingen. Vaak zijn er buurtgenoten die graag katten oppassen. Let wel op dat je geen achtergrondcheck hebt, dus neem de tijd om elkaar goed te leren kennen.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              5. Dierenarts of dierenwinkel
            </h3>
            <p>
              Vraag bij je dierenarts of lokale dierenspeciaalzaak naar aanbevelingen. Zij kennen vaak betrouwbare oppassen in de buurt die klanten helpen.
            </p>

            <BetweenContentAd />

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              7 tips om de perfecte kattenoppas te vinden
            </h2>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tip 1: Start op tijd met zoeken
            </h3>
            <p>
              Begin minstens 4-6 weken voor je vertrek met zoeken. Zo heb je tijd om meerdere kandidaten te ontmoeten, referenties te checken en een proefbezoek in te plannen. Tijdens vakantieperiodes zijn goede oppassen snel volgeboekt.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tip 2: Doe een kennismakingsgesprek
            </h3>
            <p>
              Nodig potentiële oppassen uit voor een kennismaking bij jou thuis. Let op:
            </p>
            <ul className="space-y-2">
              <li>Hoe reageert de oppas op je kat? Is er direct een klik?</li>
              <li>Hoe reageert je kat op de oppas? Katten voelen intuïtief aan of iemand te vertrouwen is</li>
              <li>Stelt de oppas de juiste vragen? (over karakter, gewoontes, medische geschiedenis)</li>
              <li>Heeft de oppas ervaring met katten, vooral met het gedrag en karakter van jouw kat?</li>
              <li>Voelt de communicatie prettig en betrouwbaar aan?</li>
            </ul>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tip 3: Check referenties en reviews
            </h3>
            <p>
              Vraag om contactgegevens van eerdere klanten en neem de tijd om hen te bellen. Specifieke vragen die je kunt stellen:
            </p>
            <ul className="space-y-2">
              <li>Was de oppas betrouwbaar en kwam hij/zij altijd op tijd?</li>
              <li>Hoe was de communicatie tijdens de oppasperiode?</li>
              <li>Hoe reageerde hun kat op de oppas?</li>
              <li>Zouden ze de oppas opnieuw inhuren?</li>
              <li>Waren er problemen en hoe werden die opgelost?</li>
            </ul>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tip 4: Plan een proefbezoek
            </h3>
            <p>
              Vraag de oppas om een proefbezoek te doen terwijl jij er nog bent. Zo kun je laten zien waar alles staat, de routine uitleggen en zien hoe de oppas met je kat omgaat. Dit geeft ook je kat de kans om aan de oppas te wennen.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tip 5: Bespreek alle praktische zaken
            </h3>
            <p>
              Maak duidelijke afspraken over:
            </p>
            <ul className="space-y-2">
              <li><strong>Frequentie:</strong> Hoeveel keer per dag komt de oppas langs?</li>
              <li><strong>Duur van bezoek:</strong> Minimaal 30 minuten is aan te raden voor sociale katten</li>
              <li><strong>Voeding:</strong> Hoeveel, hoe vaak en welk voer?</li>
              <li><strong>Kattenbak:</strong> Hoe vaak moet deze verschoond worden?</li>
              <li><strong>Spelen en aandacht:</strong> Hoeveel interactie heeft je kat nodig?</li>
              <li><strong>Medicatie:</strong> Als je kat medicijnen nodig heeft, kan de oppas dit toedienen?</li>
              <li><strong>Noodcontact:</strong> Wie moet gebeld worden bij problemen? Wat is het nummer van de dierenarts?</li>
              <li><strong>Updates:</strong> Hoe vaak wil je foto's of berichten ontvangen?</li>
            </ul>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tip 6: Check verzekering en verantwoordelijkheid
            </h3>
            <p>
              Belangrijke vragen om te stellen:
            </p>
            <ul className="space-y-2">
              <li>Heeft de oppas een aansprakelijkheidsverzekering?</li>
              <li>Wat gebeurt er bij schade aan je huis of bezittingen?</li>
              <li>Wat als je kat ziek wordt of ontsnapt?</li>
              <li>Wie betaalt de dierenarts bij spoedgevallen?</li>
            </ul>
            <p>
              Bij professionele diensten is dit vaak goed geregeld. Bij particuliere oppassen is het verstandig om afspraken schriftelijk vast te leggen.
            </p>

            <h3 className="text-xl font-semibold text-cpCharcoal dark:text-cpCream mt-6 mb-3">
              Tip 7: Vertrouw op je gevoel
            </h3>
            <p>
              Als er iets niet klopt of je voelt je ongemakkelijk, zoek dan verder. Je kat is een belangrijk gezinslid en je moet volledig vertrouwen hebben in degene die voor hem zorgt. Een goede oppas begrijpt dit en zal er alles aan doen om dat vertrouwen te verdienen.
            </p>

            <BetweenContentAd />

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Wat kost een kattenoppas?
            </h2>
            <p>
              De tarieven voor kattenoppas variëren sterk afhankelijk van de regio, ervaring en type dienst:
            </p>
            <ul className="space-y-2">
              <li><strong>Particuliere oppas via platforms:</strong> €8-€15 per bezoek (30-60 minuten)</li>
              <li><strong>Professionele oppasdiensten:</strong> €15-€25 per bezoek</li>
              <li><strong>Toeslag voor feestdagen:</strong> Vaak 50-100% extra</li>
              <li><strong>Meerdere katten:</strong> Vaak €2-€5 extra per extra kat</li>
              <li><strong>Extra diensten:</strong> Planten water geven, post binnen halen meestal gratis</li>
            </ul>
            <p>
              Let op dat sommige platforms commissie inhouden, waardoor de oppas minder ontvangt dan jij betaalt.
            </p>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Wat moet je klaarleggen voor de oppas?
            </h2>
            <p>
              Maak het de oppas gemakkelijk door alles overzichtelijk klaar te leggen:
            </p>
            <ul className="space-y-2">
              <li><strong>Geschreven instructies:</strong> Voeding, medicatie, gewoontes van je kat</li>
              <li><strong>Contactgegevens:</strong> Jouw nummer, noodcontact, dierenarts</li>
              <li><strong>Sleutels:</strong> Eventueel alarm- of toegangscode</li>
              <li><strong>Voorraden:</strong> Voldoende voer, kattenbakkorrels, medicijnen</li>
              <li><strong>Speelgoed en krabpaal:</strong> Waar vindt de oppas dit?</li>
              <li><strong>Reismand:</strong> Voor het geval van spoed naar de dierenarts</li>
              <li><strong>Paspoort en vaccinatieboekje:</strong> Op een toegankelijke plek</li>
              <li><strong>Geld of creditcard:</strong> Voor onvoorziene kosten</li>
            </ul>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 border-l-4 border-cpAmber p-6 my-8 rounded-r-lg">
              <h3 className="text-lg font-semibold text-cpCharcoal dark:text-cpCream mb-2">
                Pro tip: maak een kattenprofiel
              </h3>
              <p className="text-cpCharcoal/80 dark:text-cpCream/80">
                Maak een document met alle belangrijke informatie over je kat: karakter, lievelingsplekjes, eigenaardigheden, medische geschiedenis, en wat te doen bij problemen. Dit geeft de oppas houvast en voorkomt misverstanden.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mt-8 mb-4">
              Red flags: wanneer is een oppas niet geschikt?
            </h2>
            <p>
              Vertrouw op je intuïtie en let op deze waarschuwingssignalen:
            </p>
            <ul className="space-y-2">
              <li>De oppas stelt geen of nauwelijks vragen over je kat</li>
              <li>Er is geen interesse om je kat te ontmoeten voor je weggaat</li>
              <li>De oppas kan geen referenties geven</li>
              <li>Communicatie verloopt moeizaam of reacties zijn vaag</li>
              <li>De oppas heeft geen ervaring met katten maar verzekert dat het geen probleem is</li>
              <li>Er is geen duidelijkheid over verzekering of verantwoordelijkheid</li>
              <li>Je kat reageert extreem angstig of agressief op de oppas (katten voelen goed aan!)</li>
              <li>De oppas wil geen schriftelijke afspraken maken</li>
            </ul>

            {/* FAQ Section */}
            <div className="bg-cpSurface dark:bg-cpCharcoal/50 rounded-lg p-6 my-12">
              <h2 className="text-2xl font-bold text-cpCharcoal dark:text-cpCream mb-6">
                Veelgestelde vragen
              </h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoeveel keer per dag moet een kattenoppas langskomen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Voor een gezonde volwassen kat is één keer per dag vaak voldoende voor korte periodes (maximaal 3-4 dagen). Voor langere periodes, jonge katten, oude katten of katten die veel aandacht nodig hebben, is twee keer per dag aan te raden. Katten met medische problemen hebben soms meerdere bezoeken per dag nodig.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Is een kattenoppas beter dan een kattenpension?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Voor de meeste katten is thuisopvang met een oppas de beste keuze omdat ze territoriumdieren zijn en graag in hun eigen omgeving blijven. Een pension kan echter geschikt zijn voor zeer sociale katten die goed met verandering omgaan, of als er geen betrouwbare oppas beschikbaar is. Katten die stress ervaren bij vervoer of nieuwe omgevingen zijn beter af met een oppas thuis.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Wat als mijn kat zich verstopt voor de oppas?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Dit is normaal gedrag voor veel katten, vooral bij de eerste bezoeken. Zorg dat de oppas weet waar je kat zich kan verstoppen en instrueer om de kat niet te forceren. De oppas moet wel checken of de kat gezond is (door te kijken of er gegeten is, de kattenbak gebruikt wordt). De meeste katten komen na een paar dagen uit zichzelf tevoorschijn als ze merken dat de oppas geen bedreiging vormt.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Moet ik de oppas een sleutel geven of zijn er alternatieven?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Een reservesleutel geven is de meest praktische oplossing. Alternatieven zijn een sleutelkluis aan de buitenkant, een smart lock met tijdelijke toegangscode, of de sleutel bij een vertrouwde buurman/vriendin achterlaten. Zorg dat je na afloop de sleutel terugkrijgt of de code wijzigt. Bij professionele diensten worden sleutels vaak beveiligd opgeslagen in een kluis.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-white dark:bg-cpCharcoal rounded-lg hover:bg-cpCream/50 dark:hover:bg-cpCharcoal/80 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan een kattenoppas ook medicijnen toedienen?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-cpCharcoal/70 dark:text-cpCream/70">
                    Dat hangt af van de ervaring van de oppas en het type medicatie. Veel ervaren oppassen kunnen eenvoudige medicijnen toedienen zoals tabletten in voer of vloeistoffen. Complexere handelingen zoals injecties zijn meestal voorbehouden aan professionele diensten of de dierenarts. Bespreek dit altijd vooraf en laat de oppas tijdens het proefbezoek oefenen onder jouw begeleiding.
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
                    href="/gids/kattengedrag/kat-alleen-thuis"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Hoelang kan een kat alleen thuisblijven?
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gids/reizen-met-huisdieren/vakantie-voorbereiden"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Vakantie met huisdieren: complete checklist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gids/professionele-diensten/kattenpension-kiezen"
                    className="text-cpCoral hover:text-cpCoral/80 dark:text-cpCoral dark:hover:text-cpCoral/80 font-medium transition-colors flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Het juiste kattenpension kiezen
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-cpCharcoal/10 dark:border-cpCream/10">
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                kattenoppas
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                kattensitter
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                oppas kat
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                professionele diensten
              </span>
              <span className="px-3 py-1 bg-cpAmber/20 dark:bg-cpAmber/10 text-cpCharcoal dark:text-cpCream text-sm rounded-full">
                vakantie
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

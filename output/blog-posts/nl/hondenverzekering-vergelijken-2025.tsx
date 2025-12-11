import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Tag, Calendar, CheckCircle } from 'lucide-react';
import BetweenContentAd from '@/components/ads/BetweenContentAd';
import BlogSidebarAd from '@/components/ads/BlogSidebarAd';
import PhotoCredit from '@/components/PhotoCredit';

export const metadata: Metadata = {
  title: 'Hondenverzekering Vergelijken 2025: Waar Let Je Op? | CutiePawsPedia',
  description: 'Vergelijk de beste hondenverzekeringen van 2025. Ontdek waar je op moet letten bij premie, dekking en voorwaarden voor jouw hond.',
  keywords: 'hondenverzekering, huisdierverzekering, dierenverzekering, hondenverzekering vergelijken, beste hondenverzekering',
  openGraph: {
    title: 'Hondenverzekering Vergelijken 2025: Complete Gids',
    description: 'Alles wat je moet weten over hondenverzekeringen in 2025. Vergelijk, bespaar en kies de beste dekking.',
    type: 'article',
    publishedTime: '2025-01-12T14:00:00Z',
    authors: ['CutiePawsPedia Team'],
    images: [{ url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1200&h=630&fit=crop' }],
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-cpCream dark:bg-cpCharcoal">
      <article className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <Link
              href="/blog/categorie/professionele-diensten"
              className="inline-block mb-4 px-4 py-2 bg-cpAmber text-cpCharcoal rounded-full text-sm font-medium hover:bg-opacity-80 transition-colors"
            >
              Professionele Diensten
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-cpCharcoal dark:text-cpCream mb-4">
                Hondenverzekering Vergelijken 2025: Waar Let Je Op?
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-cpCharcoal/70 dark:text-cpCream/70 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2025-01-12">12 januari 2025</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>12 min leestijd</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-6 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1200&h=800&fit=crop"
                alt="Hond bij dierenarts voor controle"
                fill
                className="object-cover"
                priority
              />
            </div>
            <PhotoCredit
              photographerName="Pranidchakan Boonrom"
              photographerUrl="https://unsplash.com/@avivintagewonderphoto"
              platform="Unsplash"
            />

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8 text-cpCharcoal dark:text-cpCream">
              <p className="lead text-xl mb-6">
                Een bezoek aan de dierenarts kan snel oplopen tot honderden of zelfs duizenden euro's. Een gebroken poot, een
                ernstige ziekte of een noodoperatie - de kosten kunnen verrassend hoog zijn. Een hondenverzekering kan je
                beschermen tegen onverwachte dierenarts kosten, maar met tientallen aanbieders en pakketten is het kiezen niet
                makkelijk. In deze uitgebreide gids van 2025 helpen we je de juiste hondenverzekering te kiezen voor jouw
                situatie en budget.
              </p>
            </div>

            {/* Main Content Sections */}
            <div className="prose prose-lg max-w-none text-cpCharcoal dark:text-cpCream">
              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Waarom een hondenverzekering?
              </h2>
              <p>
                Dierenarts kosten zijn de afgelopen jaren flink gestegen. Een simpele controle kost al snel €40-60, maar
                complexere behandelingen kunnen veel duurder uitvallen:
              </p>
              <ul className="space-y-2 mb-6">
                <li><strong>Gebroken poot:</strong> €800-2500 (operatie, röntgen, gips, nazorg)</li>
                <li><strong>Kruisbandoperatie:</strong> €1500-3500</li>
                <li><strong>Kankerbehandeling:</strong> €2000-10.000+</li>
                <li><strong>Maagdraaiing (spoed):</strong> €1500-3000</li>
                <li><strong>Tandextractie:</strong> €300-800</li>
                <li><strong>Chronische aandoening (bijv. diabetes):</strong> €100-200 per maand</li>
              </ul>
              <p>
                Een hondenverzekering helpt deze kosten te spreiden en beschermt je tegen financiële verrassingen. Voor een
                vaste maandpremie ben je verzekerd tegen onverwachte dierenarts kosten.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Soorten hondenverzekeringen
              </h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                1. Basis hondenverzekering
              </h3>
              <p>
                De meest eenvoudige en goedkoopste optie. Dekt meestal alleen behandeling na een ongeluk.
              </p>
              <p><strong>Wat is gedekt:</strong></p>
              <ul className="space-y-2 mb-4">
                <li>✓ Behandeling na ongevallen (bijv. aangereden, val, beet)</li>
                <li>✓ Noodoperaties na ongeluk</li>
                <li>✓ Röntgenfoto's en diagnostiek na ongeluk</li>
              </ul>
              <p><strong>Wat is NIET gedekt:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>✗ Ziektes en chronische aandoeningen</li>
                <li>✗ Preventieve zorg (vaccinaties, wormen)</li>
                <li>✗ Periodieke controles</li>
              </ul>
              <p><strong>Geschikt voor:</strong> Hondeneigenaren met beperkt budget die alleen bescherming willen tegen grote ongelukskosten.</p>
              <p><strong>Gemiddelde premie:</strong> €8-15 per maand</p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                2. Standaard hondenverzekering
              </h3>
              <p>
                De meest gekozen optie. Dekt zowel ongevallen als ziektes.
              </p>
              <p><strong>Wat is gedekt:</strong></p>
              <ul className="space-y-2 mb-4">
                <li>✓ Alle basis dekkingen</li>
                <li>✓ Behandeling van ziektes</li>
                <li>✓ Operaties (gepland en spoed)</li>
                <li>✓ Medicijnen en therapieën</li>
                <li>✓ Diagnostiek (bloedonderzoek, echo's, scans)</li>
                <li>✓ Opname in dierenkliniek</li>
              </ul>
              <p><strong>Wat is NIET gedekt:</strong></p>
              <ul className="space-y-2 mb-6">
                <li>✗ Preventieve zorg (vaccinaties, wormen, vlooien)</li>
                <li>✗ Aangeboren en erfelijke aandoeningen (vaak uitgesloten)</li>
                <li>✗ Tandverzorging (tenzij door ongeluk)</li>
              </ul>
              <p><strong>Geschikt voor:</strong> Meeste hondeneigenaren die volledige bescherming willen tegen onverwachte kosten.</p>
              <p><strong>Gemiddelde premie:</strong> €25-45 per maand</p>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                3. Uitgebreide/Premium hondenverzekering
              </h3>
              <p>
                De meest complete dekking met hoogste vergoedingen en extra's.
              </p>
              <p><strong>Wat is gedekt:</strong></p>
              <ul className="space-y-2 mb-4">
                <li>✓ Alle standaard dekkingen</li>
                <li>✓ Preventieve zorg (vaccinaties, ontworming, vlooienbehandeling)</li>
                <li>✓ Jaarlijkse gezondheidscheck</li>
                <li>✓ Alternatieve therapieën (fysiotherapie, acupunctuur, homeopathie)</li>
                <li>✓ Gedragstherapie</li>
                <li>✓ Tandverzorging en gebitsreiniging</li>
                <li>✓ Aangeboren en erfelijke aandoeningen (soms met voorwaarden)</li>
                <li>✓ Hogere maximum vergoeding (vaak €5000-7000 per jaar)</li>
                <li>✓ Opvang/hotel kosten bij ziekenhuisopname eigenaar</li>
              </ul>
              <p><strong>Geschikt voor:</strong> Eigenaren die complete zorgeloosheid willen en alles gedekt willen hebben.</p>
              <p><strong>Gemiddelde premie:</strong> €45-75 per maand</p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Waar moet je op letten bij het kiezen?
              </h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                1. Maximum vergoeding per jaar
              </h3>
              <p>
                De meeste verzekeringen hebben een jaarlijks maximum dat ze vergoeden. Dit varieert van €1500 tot €7000+.
                Let op: bij chronische aandoeningen die jaren duren, kan je tegen dit limiet aanlopen.
              </p>
              <p><strong>Advies:</strong> Kies minimaal €3000-4000 per jaar voor standaard dekking, of onbeperkt indien mogelijk.</p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                2. Eigen risico
              </h3>
              <p>
                Het bedrag dat je zelf betaalt voordat de verzekering vergoedt. Dit kan per behandeling of per jaar zijn.
              </p>
              <ul className="space-y-2 mb-6">
                <li><strong>Geen eigen risico:</strong> Premie is hoger, maar alles wordt direct vergoed</li>
                <li><strong>€50-100 per behandeling:</strong> Betaal de eerste €50-100 zelf, rest wordt vergoed</li>
                <li><strong>€100-250 per jaar:</strong> Betaal eerste behandeling(en) zelf tot dit bedrag, daarna volledige vergoeding</li>
              </ul>
              <p>
                <strong>Tip:</strong> Hoger eigen risico = lagere maandpremie, maar meer uit eigen zak bij behandeling. Bereken wat
                voor jou voordeliger is.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                3. Wachttijd
              </h3>
              <p>
                De periode na afsluiten waarin je nog niet gedekt bent. Dit voorkomt dat mensen pas verzekeren als hun hond al
                ziek is.
              </p>
              <ul className="space-y-2 mb-6">
                <li><strong>Ongevallen:</strong> Vaak geen wachttijd of 1-7 dagen</li>
                <li><strong>Ziektes:</strong> Meestal 30 dagen wachttijd</li>
                <li><strong>Specifieke aandoeningen:</strong> Soms langere wachttijd (bijv. 6 maanden voor kruisband)</li>
              </ul>

              <BetweenContentAd />

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                4. Leeftijdsgrens en toetredingsleeftijd
              </h3>
              <p>
                De meeste verzekeraars hebben voorwaarden rondom leeftijd:
              </p>
              <ul className="space-y-2 mb-6">
                <li><strong>Minimumleeftijd:</strong> Meestal 8 weken (na vaccinaties)</li>
                <li><strong>Maximale toetredingsleeftijd:</strong> Vaak 7-9 jaar (daarna kun je niet meer verzekeren)</li>
                <li><strong>Premie stijgt met leeftijd:</strong> Oudere honden betalen hogere premie</li>
                <li><strong>Dekking kan stoppen:</strong> Sommige verzekeraars stoppen dekking op 10-12 jaar</li>
              </ul>
              <p><strong>Advies:</strong> Sluit verzekering af als je hond nog jong is (1-3 jaar) voor beste tarief en dekking.</p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                5. Uitsluitingen en voorwaarden
              </h3>
              <p>
                Lees de kleine lettertjes! Deze dingen zijn vaak uitgesloten:
              </p>
              <ul className="space-y-2 mb-6">
                <li>✗ Aangeboren en erfelijke aandoeningen (behalve bij premium pakketten)</li>
                <li>✗ Bestaande aandoeningen (voor afsluiting vastgesteld)</li>
                <li>✗ Preventieve zorg (vaccinaties, wormen) bij basis/standaard pakket</li>
                <li>✗ Zwangerschap en bevalling</li>
                <li>✗ Euthanasie (soms wel gedekt bij onvermijdbare ziekte)</li>
                <li>✗ Cosmetische ingrepen (couperen, stompje)</li>
                <li>✗ Gedragsproblemen (behalve bij premium)</li>
                <li>✗ Tandverzorging (behalve door ongeluk of premium)</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                6. Ras-specifieke risico's
              </h3>
              <p>
                Sommige rassen hebben hogere premies door verhoogd risico op bepaalde aandoeningen:
              </p>
              <ul className="space-y-2 mb-6">
                <li><strong>Grote rassen (Labrador, Duitse Dog):</strong> Heup- en gewrichtsproblemen, maagdraaiing</li>
                <li><strong>Kortsnuitige rassen (Bulldog, Mops):</strong> Ademhalingsproblemen, oogproblemen</li>
                <li><strong>Langharige rassen:</strong> Huidproblemen, oorinfecties</li>
                <li><strong>Kruisingen:</strong> Vaak goedkoper omdat minder erfelijke problemen</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                7. Vergoedingspercentage
              </h3>
              <p>
                Niet alle verzekeraars vergoeden 100%. Sommige vergoeden 80-90% van de kosten. Check dit altijd!
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Top 6 hondenverzekeraars in Nederland (2025)
              </h2>
              <p>
                Hier is een overzicht van de populairste aanbieders. Let op: premies zijn indicatief en afhankelijk van ras,
                leeftijd en gekozen pakket.
              </p>

              <div className="space-y-6 mb-8">
                <div className="bg-white dark:bg-cpSurface p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-3 text-cpCharcoal dark:text-cpCream">1. Petplan</h4>
                  <p className="mb-3"><strong>Sterke punten:</strong> Hoge vergoedingslimiet (tot €7000), dekt aangeboren aandoeningen na 12 maanden, goede klantenservice</p>
                  <p className="mb-3"><strong>Zwakke punten:</strong> Relatief duur, geen preventieve zorg in standaard pakket</p>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70"><strong>Premie:</strong> €30-60/maand | <strong>Max vergoeding:</strong> €7000/jaar</p>
                </div>

                <div className="bg-white dark:bg-cpSurface p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-3 text-cpCharcoal dark:text-cpCream">2. Animalcare</h4>
                  <p className="mb-3"><strong>Sterke punten:</strong> Gratis preventieve zorg module, flexibele pakketten, korte wachttijden</p>
                  <p className="mb-3"><strong>Zwakke punten:</strong> Lagere max vergoeding bij basis pakket</p>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70"><strong>Premie:</strong> €20-50/maand | <strong>Max vergoeding:</strong> €3000-5000/jaar</p>
                </div>

                <div className="bg-white dark:bg-cpSurface p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-3 text-cpCharcoal dark:text-cpCream">3. Dier&Recht</h4>
                  <p className="mb-3"><strong>Sterke punten:</strong> Betaalbaar, dekt ook gedragstherapie, onbeperkte vergoeding in premium</p>
                  <p className="mb-3"><strong>Zwakke punten:</strong> Eigen risico verplicht, hogere premie voor oude honden</p>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70"><strong>Premie:</strong> €18-45/maand | <strong>Max vergoeding:</strong> €4000-onbeperkt</p>
                </div>

                <div className="bg-white dark:bg-cpSurface p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-3 text-cpCharcoal dark:text-cpCream">4. OHRA</h4>
                  <p className="mb-3"><strong>Sterke punten:</strong> Goede prijs-kwaliteit, bekende naam, dekt alternatieve therapieën</p>
                  <p className="mb-3"><strong>Zwakke punten:</strong> Geen dekking boven 10 jaar, wachttijd 60 dagen voor bepaalde aandoeningen</p>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70"><strong>Premie:</strong> €22-48/maand | <strong>Max vergoeding:</strong> €4000/jaar</p>
                </div>

                <div className="bg-white dark:bg-cpSurface p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-3 text-cpCharcoal dark:text-cpCream">5. Dierenverzekering.nl</h4>
                  <p className="mb-3"><strong>Sterke punten:</strong> Zeer betaalbaar, geen maximum leeftijd, snelle schadeclaims</p>
                  <p className="mb-3"><strong>Zwakke punten:</strong> Beperktere dekking, geen preventieve zorg</p>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70"><strong>Premie:</strong> €15-35/maand | <strong>Max vergoeding:</strong> €2500-3500/jaar</p>
                </div>

                <div className="bg-white dark:bg-cpSurface p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-3 text-cpCharcoal dark:text-cpCream">6. Univé</h4>
                  <p className="mb-3"><strong>Sterke punten:</strong> Inclusief preventieve zorg, geen eigen risico optie, dekt tot 12 jaar</p>
                  <p className="mb-3"><strong>Zwakke punten:</strong> Hogere premie, beperkt aantal rassen geaccepteerd</p>
                  <p className="text-sm text-cpCharcoal/70 dark:text-cpCream/70"><strong>Premie:</strong> €28-55/maand | <strong>Max vergoeding:</strong> €5000/jaar</p>
                </div>
              </div>

              <BetweenContentAd />

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Stap-voor-stap: Hoe vergelijk je?
              </h2>
              <ol className="space-y-4 mb-6 list-decimal list-inside">
                <li>
                  <strong>Bepaal je budget:</strong> Hoeveel kun je maandelijks missen? Houd rekening met premie + eigen risico.
                </li>
                <li>
                  <strong>Analyseer je hond:</strong> Ras, leeftijd, bekende erfelijke problemen? Dit bepaalt je risico en premie.
                </li>
                <li>
                  <strong>Kies dekkingsniveau:</strong> Basis (ongevallen), Standaard (alles), of Premium (inclusief preventief)?
                </li>
                <li>
                  <strong>Gebruik vergelijkers:</strong> Ga naar Independer.nl, Pricewise.nl of Totaal-vergelijken.nl om prijzen te vergelijken.
                </li>
                <li>
                  <strong>Lees voorwaarden:</strong> Check uitsluitingen, maximum vergoeding, eigen risico, en wachttijden.
                </li>
                <li>
                  <strong>Lees reviews:</strong> Controleer Trustpilot en andere reviewsites voor klantervaringen.
                </li>
                <li>
                  <strong>Sluit af:</strong> Verzeker zo vroeg mogelijk (jonge hond = lagere premie en geen bestaande aandoeningen).
                </li>
              </ol>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Is een hondenverzekering de moeite waard?
              </h2>
              <p>
                Of een hondenverzekering de moeite waard is, hangt af van je financiële situatie en risicotolerantie:
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                ✅ Een verzekering is zinvol als:
              </h3>
              <ul className="space-y-2 mb-6">
                <li>Je geen buffer hebt van €2000-5000 voor noodkosten</li>
                <li>Je hond een ras is met verhoogd risico op erfelijke aandoeningen</li>
                <li>Je financiële zekerheid belangrijk vindt</li>
                <li>Je hond vaak naar buiten gaat en actief is (hoger ongevalsrisico)</li>
                <li>Je hond nog jong is (lagere premie, geen bestaande aandoeningen)</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-cpCharcoal dark:text-cpCream">
                ⚠️ Overweeg zelf sparen als:
              </h3>
              <ul className="space-y-2 mb-6">
                <li>Je hond al oud is (>7 jaar) - premie is hoog en dekking beperkt</li>
                <li>Je een gezonde spaarbuffer hebt van €5000+</li>
                <li>Je hond een kruising is zonder bekende gezondheidsproblemen</li>
                <li>Je bereid bent risico te nemen op hoge kosten</li>
              </ul>

              <p>
                <strong>Rekenvoorbeeld:</strong> Gemiddelde premie €35/maand = €420/jaar. Over 10 jaar betaal je €4200. Als je in
                die periode geen grote behandelingen hebt, had je beter zelf kunnen sparen. Echter, één ernstige ziekte of ongeluk
                kan €3000-10.000 kosten. De verzekering geeft je financiële zekerheid en gemoedsrust.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Tips om te besparen op je premie
              </h2>
              <ul className="space-y-3 mb-6">
                <li><strong>Verzeker jong:</strong> Premie is lager en je voorkomt uitsluitingen voor bestaande aandoeningen</li>
                <li><strong>Hoger eigen risico:</strong> Kies €150-250 eigen risico voor lagere maandpremie</li>
                <li><strong>Vergelijk jaarlijks:</strong> Premies kunnen stijgen, check of je kunt overstappen</li>
                <li><strong>Kortingen:</strong> Sommige verzekeraars geven korting bij meerdere huisdieren</li>
                <li><strong>Pas dekking aan:</strong> Als je hond ouder wordt, overweeg downgraden naar basis</li>
                <li><strong>Chip/tattoo korting:</strong> Sommige verzekeraars geven korting als je hond gechipt is</li>
                <li><strong>Betaal jaarlijks:</strong> Vaak 5-10% korting bij vooruitbetalen hele jaar</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-cpCharcoal dark:text-cpCream">
                Conclusie
              </h2>
              <p>
                Een hondenverzekering kan je beschermen tegen onverwachte, hoge dierenarts kosten en geeft financiële zekerheid.
                De beste keuze hangt af van je budget, de leeftijd en het ras van je hond, en hoeveel risico je wilt nemen.
              </p>
              <p>
                Voor de meeste hondeneigenaren is een standaard verzekering (ongevallen + ziektes) de beste optie. Verzeker je
                hond het liefst jong (1-3 jaar) voor de beste premie en volledige dekking. Vergelijk altijd meerdere aanbieders,
                lees de voorwaarden zorgvuldig, en kies een verzekering die past bij jouw specifieke situatie.
              </p>
              <p>
                In 2025 zijn er uitstekende opties beschikbaar voor elk budget - van €15 tot €75 per maand. Neem de tijd om te
                vergelijken en kies een verzekering waar je vertrouwen in hebt. Je toekomstige zelf (en portemonnee) zal je dankbaar zijn!
              </p>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white dark:bg-cpSurface rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-cpCharcoal dark:text-cpCream">
                Veelgestelde vragen
              </h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Wat kost een hondenverzekering gemiddeld per maand?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    De kosten variëren sterk afhankelijk van het ras, de leeftijd en het gekozen pakket. Een basis verzekering
                    (alleen ongevallen) kost gemiddeld €8-15 per maand. Een standaard verzekering (ongevallen + ziektes) kost
                    €25-45 per maand. Een premium verzekering met alle extra's kan €45-75 per maand kosten. Grote en kortsnuitige
                    rassen betalen vaak hogere premies.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan ik mijn oude hond (8+ jaar) nog verzekeren?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    De meeste verzekeraars hebben een maximale toetredingsleeftijd van 7-9 jaar. Sommige aanbieders accepteren
                    nog honden tot 10 jaar, maar met hogere premies en mogelijk uitsluitingen voor bestaande aandoeningen. Als je
                    hond ouder is dan de toetredingsleeftijd, kun je vaak niet meer verzekeren. Daarom is het belangrijk om tijdig
                    te verzekeren, het liefst als je hond nog jong is.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Worden erfelijke aandoeningen gedekt?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Dit hangt af van de verzekeraar en het pakket. Bij basis en standaard pakketten zijn erfelijke en aangeboren
                    aandoeningen vaak uitgesloten. Sommige premium pakketten dekken erfelijke aandoeningen wel, maar vaak met een
                    langere wachttijd (bijv. 12 maanden) en soms met beperkingen. Lees altijd de voorwaarden zorgvuldig om te weten
                    wat wel en niet gedekt is voor jouw specifieke hondenras.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Hoe werk ik een claim in bij mijn hondenverzekering?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Het proces verschilt per verzekeraar, maar de standaard stappen zijn: (1) Betaal de dierenarts rekening zelf,
                    (2) Vraag een gedetailleerde factuur met diagnose en behandeling codes, (3) Log in op je online account of app,
                    (4) Upload de factuur en eventuele ondersteunende documenten, (5) Wacht op goedkeuring (meestal 5-14 dagen),
                    (6) Ontvang vergoeding op je bankrekening. Sommige verzekeraars bieden directe afrekening met de dierenarts,
                    zodat je alleen het eigen risico hoeft te betalen.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-cpCream dark:bg-cpCharcoal rounded-lg hover:bg-cpAmber/20 transition-colors">
                    <span className="font-semibold text-cpCharcoal dark:text-cpCream">
                      Kan ik overstappen naar een andere hondenverzekering?
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="mt-4 px-4 text-cpCharcoal/80 dark:text-cpCream/80">
                    Ja, je kunt overstappen, maar let op: nieuwe verzekeraars kunnen bestaande aandoeningen uitsluiten. Als je hond
                    inmiddels gezondheidsproblemen heeft ontwikkeld, kunnen deze niet gedekt worden bij de nieuwe verzekering. Ook
                    moet je vaak de wachttijden opnieuw doorlopen. Vergelijk jaarlijks de premies en voorwaarden, maar stap alleen
                    over als de voordelen opwegen tegen mogelijke uitsluitingen. Het is vaak voordeliger om bij je huidige
                    verzekering te blijven als je hond ouder wordt en gezondheidsproblemen krijgt.
                  </p>
                </details>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-cpCharcoal dark:text-cpCream">
                Gerelateerde artikelen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/nl/gids/dierenarts/eerste-bezoek-dierenarts"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Eerste Bezoek Dierenarts: Complete Checklist
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Alles wat je moet weten voor het eerste dierenarts bezoek met je puppy of hond.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/hondengezondheid/jaarlijkse-check-up"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Jaarlijkse Check-up Hond: Wat Wordt Er Onderzocht?
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Ontdek wat er gebeurt tijdens een jaarlijkse gezondheidscontrole bij de dierenarts.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/hondenras/ras-specifieke-gezondheidsproblemen"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Ras-Specifieke Gezondheidsproblemen: Complete Gids
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Leer welke gezondheidsproblemen veel voorkomen bij jouw hondenras.
                  </p>
                </Link>

                <Link
                  href="/nl/gids/budgettering/kosten-hond-per-jaar"
                  className="block p-6 bg-white dark:bg-cpSurface rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2 text-cpCharcoal dark:text-cpCream">
                    Wat Kost een Hond Per Jaar? Complete Kostenoverzicht
                  </h3>
                  <p className="text-cpCharcoal/70 dark:text-cpCream/70">
                    Bereken alle kosten van het hebben van een hond, van voer tot verzekering.
                  </p>
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 text-sm text-cpCharcoal/70 dark:text-cpCream/70">
                <Tag className="w-4 h-4" />
                Tags:
              </span>
              <Link href="/blog/tag/hondenverzekering" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                hondenverzekering
              </Link>
              <Link href="/blog/tag/huisdierverzekering" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                huisdierverzekering
              </Link>
              <Link href="/blog/tag/dierenarts-kosten" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                dierenarts kosten
              </Link>
              <Link href="/blog/tag/verzekering-vergelijken" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                verzekering vergelijken
              </Link>
              <Link href="/blog/tag/financieel" className="px-3 py-1 bg-cpCream dark:bg-cpSurface rounded-full text-sm hover:bg-cpAmber transition-colors">
                financieel
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <BlogSidebarAd />

              {/* Quick Navigation */}
              <div className="bg-white dark:bg-cpSurface rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-cpCharcoal dark:text-cpCream">
                  Op deze pagina
                </h3>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Waarom een verzekering?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Soorten verzekeringen
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Waar op letten?
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Top 6 verzekeraars
                  </a>
                  <a href="#" className="block text-cpCharcoal/70 dark:text-cpCream/70 hover:text-cpCoral transition-colors">
                    Vergelijken stappenplan
                  </a>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Hondenverzekering Vergelijken 2025: Waar Let Je Op?',
            description: 'Vergelijk de beste hondenverzekeringen van 2025. Ontdek waar je op moet letten bij premie, dekking en voorwaarden.',
            image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1200&h=630&fit=crop',
            datePublished: '2025-01-12T14:00:00Z',
            dateModified: '2025-01-12T14:00:00Z',
            author: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CutiePawsPedia',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cutiepawspedia.nl/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://cutiepawspedia.nl/blog/hondenverzekering-vergelijken-2025',
            },
          }),
        }}
      />
    </div>
  );
}

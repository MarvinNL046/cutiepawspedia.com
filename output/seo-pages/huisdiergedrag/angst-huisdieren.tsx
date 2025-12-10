import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Angst bij huisdieren: herkennen en behandelen",
  description: "Leer de signalen van angst bij honden en katten herkennen. Ontdek effectieve methoden om je angstige huisdier te helpen. Vind een gedragstherapeut.",
  keywords: "angst huisdieren, angstige hond, angstige kat, scheidingsangst hond, bang huisdier, angst behandelen, gedragstherapie",
  openGraph: {
    title: "Angst bij huisdieren: herkennen en behandelen",
    description: "Herken signalen van angst bij je huisdier en leer effectieve behandelmethoden. Vind professionele hulp bij jou in de buurt.",
    type: "article",
  },
};

export default function AngstHuisdierenPage() {
  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cpAqua/10 via-cpPink/10 to-cpYellow/10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card dark:bg-cpSurface/50 rounded-2xl shadow-md p-8 md:p-12 border border-border dark:border-cpAmber/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpAqua/10 border border-cpAqua/30 mb-6">
              <span className="text-2xl">💙</span>
              <span className="text-sm font-medium text-foreground">Gedragsspecialist</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Angst bij huisdieren: herkennen en behandelen
            </h1>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
              Angst komt vaak voor bij honden en katten, maar wordt niet altijd herkend. Leer de signalen herkennen en ontdek hoe je je huisdier kunt helpen een rustiger en gelukkiger leven te leiden.
            </p>
            <Button
              size="lg"
              className="bg-cpAqua text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform shadow-lg"
              asChild
            >
              <Link href="/nl/nederland">
                Vind een gedragstherapeut bij jou in de buurt →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground dark:text-cpCream/80 mb-8">
            Angst bij huisdieren is een serieus welzijnsprobleem dat vaak onopgemerkt blijft. Eigenaren interpreteren angstsignalen soms als "ongehoorzaamheid" of "karakter", terwijl het huisdier eigenlijk lijdt onder chronische stress. Gelukkig is angst goed te behandelen met de juiste aanpak. In dit artikel leer je angst herkennen, begrijpen en effectief aanpakken bij zowel honden als katten.
          </p>

          {/* Section 1 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Hoe herken je angst bij je huisdier?
          </h2>

          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Huisdieren communiceren angst door hun lichaamstaal en gedrag. Het herkennen van deze signalen is de eerste stap naar het helpen van je angstige vriend.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Angstsignalen bij honden
          </h3>
          <div className="bg-gradient-to-br from-cpPink/10 to-cpYellow/10 rounded-2xl p-6 mb-6 border border-cpPink/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Lichaamstaal:</h4>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>• Staart tussen de benen of laag tegen het lichaam</li>
              <li>• Oren plat tegen het hoofd</li>
              <li>• Lichaam laag bij de grond of ineengedoken houding</li>
              <li>• Vermijden van oogcontact of "walvisoog" (wit van ogen zichtbaar)</li>
              <li>• Hijgen zonder inspanning of hoge temperatuur</li>
              <li>• Trillen of beven</li>
              <li>• Overmatig kwijlen</li>
            </ul>
            <h4 className="font-bold text-foreground dark:text-cpCream mt-4 mb-3">Gedrag:</h4>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>• Weigeren te eten of interesse in speelgoed verliezen</li>
              <li>• Vernielingsdrang (vooral bij scheidingsangst)</li>
              <li>• Excessief blaffen, janken of huilen</li>
              <li>• Ongelukjes in huis (urineren/defeceren)</li>
              <li>• Obsessief zichzelf likken of bijten</li>
              <li>• Proberen te vluchten of zich te verstoppen</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            Angstsignalen bij katten
          </h3>
          <div className="bg-gradient-to-br from-cpAqua/10 to-cpPink/10 rounded-2xl p-6 mb-6 border border-cpAqua/30">
            <h4 className="font-bold text-foreground dark:text-cpCream mb-3">Lichaamstaal:</h4>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>• Pupillen verwijdt (grote zwarte ogen)</li>
              <li>• Oren plat of naar opzij gericht ("vliegtuigoren")</li>
              <li>• Lichaam laag of ineengedoken</li>
              <li>• Staart om het lichaam geslagen</li>
              <li>• Snelle, oppervlakkige ademhaling</li>
              <li>• Vacht opgezet ("bokkepoot")</li>
            </ul>
            <h4 className="font-bold text-foreground dark:text-cpCream mt-4 mb-3">Gedrag:</h4>
            <ul className="space-y-2 text-muted-foreground dark:text-cpCream/80">
              <li>• Verstoppen en lang wegblijven</li>
              <li>• Weigeren te eten of plotseling veel eten</li>
              <li>• Buiten de kattenbak plassen of poepen</li>
              <li>• Overmatig poetsen (kale plekken)</li>
              <li>• Vermijden van interactie of hele familie</li>
              <li>• Agressief reageren wanneer benaderd</li>
              <li>• Vocaliseren (mauwen, grommen)</li>
            </ul>
          </div>

          {/* CTA Middle */}
          <div className="bg-gradient-to-br from-cpPink/10 to-cpYellow/10 rounded-2xl p-8 my-12 border border-cpPink/30">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🎯</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-3">
                  Is je huisdier angstig?
                </h3>
                <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
                  Een gedragstherapeut kan de oorzaak van de angst identificeren en een op maat gemaakt behandelplan opstellen om je huisdier te helpen.
                </p>
                <Button
                  className="bg-cpPink text-white rounded-xl px-6 py-3 hover:-translate-y-1 transition-transform"
                  asChild
                >
                  <Link href="/nl/nederland">
                    Bekijk gedragstherapeuten in jouw stad →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Veelvoorkomende angsten bij huisdieren
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Scheidingsangst
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            De meest voorkomende angst bij honden. Je hond raakt in paniek wanneer je weggaat of zelfs al voordat je vertrekt (bijvoorbeeld wanneer je je schoenen aantrekt). Symptomen: vernielingsdrang, huilen, blaffen, ongelukjes in huis, hypersalivatie. Bij katten uit scheidingsangst zich vaker in excessief vocaliseren en onreinheid.
          </p>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            <strong>Oorzaken:</strong> Plotselinge verandering in routine (thuiswerken → kantoor), traumatische ervaring alleen, te vroeg van moeder gescheiden, of genetische aanleg. Verergerd door COVID-19 situatie waarbij huisdieren gewend raakten aan constante aanwezigheid.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Geluidsangst (fobieën)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Angst voor vuurwerk, onweer, stofzuigers, of andere luide geluiden. Bij honden vaak erg uitgesproken - sommigen kunnen uren tot dagen van tevoren onweer "voelen" en al angstig worden. Katten verstoppen zich meestal en kunnen dagenlang gestrest blijven na een eng incident.
          </p>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            <strong>Symptomen:</strong> Trillen, hijgen, proberen te vluchten, vernielingsdrang (vooral bij deuren/ramen), weigeren naar buiten te gaan. In ernstige gevallen kan geluidsangst escaleren en zich uitbreiden naar steeds meer geluiden.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Sociale angst
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Angst voor vreemde mensen, kinderen, andere honden of katten. Vaak het gevolg van slechte socialisatie tijdens de kritische periode (3-14 weken bij honden, 2-7 weken bij katten). Een gebrek aan positieve ervaringen met verschillende mensen/dieren in deze periode kan leiden tot levenslange angst.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Omgevingsangst
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Angst voor specifieke locaties: de dierenarts, trimsalon, auto, of bepaalde kamers in huis. Vaak ontstaan door nare ervaringen op die locatie. Een enkele traumatische gebeurtenis (pijnlijke behandeling bij dierenarts) kan levenslange angst veroorzaken.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            5. Algemene angststoornis
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Sommige huisdieren zijn voortdurend angstig zonder duidelijke trigger. Ze zijn nerveus, hyperalert en hebben moeite te ontspannen. Dit kan genetisch zijn of het gevolg van chronische stress in het verleden. Deze huisdieren leven in constante "vecht-vlucht" modus, wat hun welzijn ernstig beïnvloedt.
          </p>

          {/* Section 3 */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Effectieve behandelmethoden voor angst
          </h2>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            1. Systematische desensibilisatie
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            De gouden standaard voor angstbehandeling. Het proces:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Identificeer de trigger:</strong> Wat veroorzaakt precies de angst?</li>
            <li><strong>Vind het drempelniveau:</strong> Op welke afstand/intensiteit reageert je huisdier?</li>
            <li><strong>Begin onder de drempel:</strong> Zo dichtbij dat je huisdier de trigger opmerkt maar niet angstig reageert</li>
            <li><strong>Gradueel verhogen:</strong> Zeer langzaam de intensiteit verhogen over weken/maanden</li>
            <li><strong>Nooit forceren:</strong> Als je huisdier angstig wordt, ga je te snel - stap terug</li>
          </ul>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            <strong>Voorbeeld:</strong> Bij geluidsangst begin je met geluid van onweer op zeer laag volume terwijl je huisdier speelt/eet. Over weken bouw je het volume op tot realistisch niveau.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            2. Tegenkonditionering (counter-conditioning)
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Verander de emotionele respons naar de trigger van negatief naar positief. Elk contact met de trigger wordt gekoppeld aan iets geweldigs (favoriete snack, speeltijd). Het doel: je huisdier moet de trigger gaan associëren met goede dingen in plaats van angst.
          </p>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            <strong>Voorbeeld:</strong> Bij scheidingsangst: pak je sleutels → geef direct super lekkere snack. Herhaal tot je huisdier blij wordt van het zien van sleutels in plaats van angstig.
          </p>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            3. Creëer een veilige ruimte
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Zowel honden als katten hebben baat bij een veilige plek waar ze zich kunnen terug trekken:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Honden:</strong> Bench met deken erover (hol-gevoel), rustige kamer, comfortabel kussen</li>
            <li><strong>Katten:</strong> Hoge krabpaal met platform, afgesloten kattenbak, rustige kamer met verstopplekken</li>
            <li>Gebruik geur: Adaptil voor honden, Feliway voor katten (feromonen die rust brengen)</li>
            <li>Nooit forceren - laat je huisdier vrijwillig de veilige plek kiezen</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            4. Verrijking en mentale stimulatie
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Angstige huisdieren hebben vaak baat bij meer structuur en mentale uitdaging:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li>Puzzel feeders en snuffelmatten (zoeken naar voer = natuurlijk gedrag)</li>
            <li>Regelmatige speeltijd op vaste tijden (voorspelbaarheid = veiligheid)</li>
            <li>Training met positieve bekrachtiging (controle hebben verlaagt angst)</li>
            <li>Afwisselende wandelroutes voor honden (nieuwe geuren = mentale stimulatie)</li>
            <li>Voor katten: interactief speelgoed, "jagen" op speelgoedmuizen</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            5. Medicatie en supplementen
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-4">
            Bij ernstige angst kan medicatie helpen:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-cpCream/80 mb-6 ml-4">
            <li><strong>Anti-angstmedicatie:</strong> Verlaagt angst zodat je huisdier kan leren (gedragstherapie blijft nodig)</li>
            <li><strong>Natuurlijke supplementen:</strong> L-theanine, CBD olie (bespreek altijd eerst met dierenarts)</li>
            <li><strong>Feromonen:</strong> Adaptil (honden) en Feliway (katten) kunnen helpen</li>
            <li><strong>Belangrijk:</strong> Medicatie is hulpmiddel, geen oplossing. Combineer altijd met gedragstherapie</li>
          </ul>

          <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4">
            6. Professionele gedragstherapie
          </h3>
          <p className="text-muted-foreground dark:text-cpCream/80 mb-6">
            Bij ernstige of chronische angst is professionele hulp essentieel. Een gecertificeerde gedragstherapeut kan de specifieke oorzaken identificeren, een behandelplan opstellen, en je begeleiden in de uitvoering. Ze kunnen ook beoordelen of medicatie zinvol is en samenwerken met je dierenarts.
          </p>

          {/* Warning Box */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/40 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-4">⚠️ Wat NIET te doen:</h3>
            <ul className="space-y-3 text-yellow-800 dark:text-yellow-300">
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Flooding:</strong> Je huisdier forceren om de angst onder ogen te zien (overspoelen met de trigger) kan trauma veroorzaken</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Straffen:</strong> Straffen van angstig gedrag verhoogt de angst en vernietigt het vertrouwen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Overdreven troosten:</strong> "Het is al goed" zeggen en intensief aaien kan angst bevestigen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl mt-1">❌</span>
                <span><strong>Negeren:</strong> Angst gaat niet "vanzelf over" - het kan escaleren zonder behandeling</span>
              </li>
            </ul>
          </div>

          {/* Internal Links */}
          <div className="bg-cpYellow/10 border border-cpYellow/30 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground dark:text-cpCream mb-4">
              Meer over gedragsproblemen bij huisdieren:
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/agressie-honden" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Agressie bij honden: oorzaken, signalen en aanpak
                </Link>
              </li>
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/hond-blaft-veel" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Waarom blaft mijn hond zoveel? Oorzaken en oplossingen
                </Link>
              </li>
              <li>
                <Link href="/output/seo-pages/huisdiergedrag/meerdere-huisdieren" className="text-cpAqua hover:text-cpPink transition-colors font-medium">
                  → Meerdere huisdieren in één huis: tips voor harmonie
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mt-12 mb-6">
            Veelgestelde vragen over angst bij huisdieren
          </h2>

          <div className="space-y-4 mb-12">
            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan angst volledig genezen?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Dit hangt af van de oorzaak en ernst. Sommige huisdieren kunnen volledig herstellen met de juiste behandeling, vooral als de angst vroeg aangepakt wordt. Bij genetische aanleg of ernstige trauma's is het doel vaak symptoommanagement en kwaliteit van leven verbeteren in plaats van complete "genezing". Met geduld, consistentie en professionele begeleiding is significante verbetering bijna altijd mogelijk.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Hoelang duurt het om angst te behandelen?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Gedragsverandering is een langzaam proces. Milde angst kan binnen enkele weken tot maanden verbeteren, maar ernstige of langdurige angst kan 6-12 maanden of langer nodig hebben. Sleutel is geduld en consistentie. Verwacht geen wonderen - geleidelijke vooruitgang is normaal. Sommige huisdieren zullen altijd enig management nodig hebben, maar hun kwaliteit van leven kan dramatisch verbeteren.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Is CBD olie veilig voor angstige huisdieren?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                CBD olie kan bij sommige huisdieren angst verminderen, maar de effectiviteit varieert en wetenschappelijk onderzoek is nog beperkt. Belangrijk: gebruik alleen CBD producten specifiek voor huisdieren (geen THC!), kies kwaliteitsmerken, en bespreek het altijd eerst met je dierenarts. CBD kan interacties hebben met medicatie en is niet geschikt voor alle huisdieren. Het is geen wondermiddel en moet gecombineerd worden met gedragstherapie.
              </div>
            </details>

            <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                Kan een thundershirt helpen bij angst?
                <span className="text-cpAqua group-open:rotate-90 transition-transform">→</span>
              </summary>
              <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                Thundershirts (compressievestjes) kunnen bij sommige honden angst verminderen door constante, zachte druk te bieden (vergelijkbaar met inbakeren bij baby's). De effectiviteit varieert - sommige honden ervaren duidelijke rust, andere merken geen verschil. Het is veilig om te proberen, maar geen wonderoplossing. Gebruik het als onderdeel van een breder behandelplan. Let op: het moet comfortabel zitten, niet te strak. Voor katten zijn er speciale kattenvarianten beschikbaar.
              </div>
            </details>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-cpAqua via-cpAqua/90 to-cpPink py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              💙 Help je angstige huisdier
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Samen naar een rustiger leven
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Een gedragstherapeut kan je huisdier helpen angst te overwinnen en een gelukkiger, ontspannen leven te leiden. Professionele begeleiding maakt het verschil.
            </p>
            <Button
              size="lg"
              className="bg-white text-cpAqua hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-8 py-6 text-lg font-semibold rounded-2xl"
              asChild
            >
              <Link href="/nl/nederland">
                Ontdek alle huisdierservices →
              </Link>
            </Button>
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
            "headline": "Angst bij huisdieren: herkennen en behandelen",
            "description": "Leer de signalen van angst bij honden en katten herkennen en ontdek effectieve behandelmethoden om je angstige huisdier te helpen.",
            "image": "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200",
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
              "@id": "https://cutiepawspedia.com/nl/huisdiergedrag/angst-huisdieren"
            }
          })
        }}
      />
    </div>
  );
}

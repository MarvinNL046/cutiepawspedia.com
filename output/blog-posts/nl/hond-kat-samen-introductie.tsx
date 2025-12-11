/**
 * Blog Post: Hond en kat samen in huis: tips voor een goede introductie
 * Category: huisdiergedrag
 * Keywords: hond en kat, huisdieren introduceren, kat bij hond
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Hond en Kat Samen: Tips voor een Succesvolle Introductie | CutiePawsPedia",
  description: "Leer hond en kat op de juiste manier introduceren. Stappenplan, veelgemaakte fouten en tips voor een harmonieus samenlevingsverband tussen hond en kat.",
  openGraph: {
    title: "Hond en Kat Samen: Tips voor een Succesvolle Introductie",
    description: "Leer hond en kat op de juiste manier introduceren. Stappenplan, veelgemaakte fouten en tips voor harmonieus samenleven.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const publishDate = "11 december 2024";
  const readingTime = 12;

  return (
    <div className="bg-background dark:bg-cpCharcoal min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 pt-8">
        <Link href="/nl/blog" className="inline-flex items-center gap-2 text-muted-foreground dark:text-cpCream/70 hover:text-cpCoral dark:hover:text-cpCoral transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Terug naar blog
        </Link>
      </div>

      <header className="container mx-auto max-w-6xl px-4 py-8">
        <span className="inline-block px-3 py-1 bg-cpCoral/10 dark:bg-cpCoral/20 text-cpCoral text-sm font-medium rounded-full mb-4">
          Huisdiergedrag
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          Hond en Kat Samen in Huis: Tips voor een Goede Introductie
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground dark:text-cpCream/60">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {publishDate}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {readingTime} min leestijd
          </span>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <div className="relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=1200&h=800&fit=crop"
            alt="Hond en kat liggen vredig samen op de bank"
            fill
            className="object-cover"
            priority
          />
          <a
            href="https://unsplash.com/@schmidy"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white/80 text-xs bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 hover:bg-black/60 hover:text-white transition-all"
          >
            <span>📷</span>
            <span>Ryan Stone</span>
            <span className="opacity-50">•</span>
            <span className="opacity-75">Unsplash</span>
          </a>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 min-w-0">
            <div className="bg-card dark:bg-cpSurface/30 rounded-3xl p-6 md:p-10 border border-border dark:border-cpAmber/10">
              <p className="text-lg text-foreground dark:text-cpCream font-medium mb-6 pb-6 border-b border-border dark:border-cpAmber/10">
                "Vechten als kat en hond" – het spreekwoord suggereert dat deze twee niet samen kunnen leven. Maar niets is minder waar! Met de juiste introductie en aanpak kunnen honden en katten beste vrienden worden. Deze complete gids vertelt je precies hoe.
              </p>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 id="heading-mythes-feiten" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Mythes en Feiten Over Honden en Katten
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Mythe:</strong> "Honden en katten zijn natuurlijke vijanden"
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Feit:</strong> Ze hebben verschillende communicatiestijlen, maar kunnen uitstekend samenleven. Veel honden en katten worden zelfs hechte vriendjes die samen spelen, slapen en elkaar verzorgen.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Mythe:</strong> "Je moet ze gewoon bij elkaar zetten, dan komen ze er wel uit"
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Feit:</strong> Een slechte eerste ontmoeting kan traumatisch zijn en leidt tot langdurige problemen. Een geleidelijke, gecontroleerde introductie is cruciaal voor succes.
                </p>

                <h2 id="heading-voor-je-begint" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Voor je Begint: Belangrijke Overwegingen
                </h2>

                <h3 id="heading-persoonlijkheid-hond" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  De Persoonlijkheid van je Hond
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Ideale hond voor katten:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Kalm en rustig temperament</li>
                  <li>Lage prooiaandrift (niet achter alles aanrennen)</li>
                  <li>Goed getraind en luistert naar commando's</li>
                  <li>Eerder ervaring met katten</li>
                  <li>Niet te energiek of grof</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Let op bij:</strong> Jachthonden, terriërs, en honden met een sterke prooiaandrift. Dit betekent niet dat het onmogelijk is, maar het vraagt meer tijd en training.
                </p>

                <h3 id="heading-persoonlijkheid-kat" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  De Persoonlijkheid van je Kat
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Ideale kat voor honden:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Zelfverzekerd en niet te angstig</li>
                  <li>Eerder ervaring met honden</li>
                  <li>Nog relatief jong (maar niet te jong – zie leeftijdsoverwegingen)</li>
                  <li>Nieuwsgierig en avontuurlijk</li>
                </ul>

                <div className="my-8 p-6 bg-cpAmber/5 dark:bg-cpAmber/10 border-2 border-dashed border-cpAmber/30 dark:border-cpAmber/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                  <p className="text-cpCoral font-medium">🏠 Multi-pet huishoudens? Speciale producten voor harmonie</p>
                </div>

                <h3 id="heading-leeftijd-overwegingen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Leeftijd Overwegingen
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Makkelijkste combinaties:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Puppy + jonge kat:</strong> Groeien samen op, leren elkaars communicatie</li>
                  <li><strong>Jonge hond + volwassen kat:</strong> Kat kan grenzen stellen, hond leert respect</li>
                  <li><strong>Kitten + rustige volwassen hond:</strong> Hond speelt 'ouder' rol</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Moeilijkere combinaties:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Oudere hond + eerste kat:</strong> Hond is gewend aan alleen zijn</li>
                  <li><strong>Oudere kat + eerste hond:</strong> Kat vindt verandering stressvol</li>
                  <li><strong>Energieke volwassen hond + angstige kat:</strong> Kat kan overweldigd raken</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <em>Let op: "Moeilijker" betekent niet onmogelijk – het vraagt alleen meer tijd en geduld!</em>
                </p>

                <h2 id="heading-voorbereiding" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Voorbereiding: Voor de Introductie
                </h2>

                <h3 id="heading-aparte-zones" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Aparte Zones Inrichten
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Voor de kat:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Een eigen kamer met voer, water, kattenbak, en verstopplekken</li>
                  <li>Hoge plekken om naartoe te vluchten (kattenboom, planken)</li>
                  <li>Kattendeur indien mogelijk (hond kan er niet doorheen)</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Voor de hond:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Eigen mand in een rustige hoek</li>
                  <li>Traphekken indien nodig om zones te scheiden</li>
                  <li>Speelgoed en kluifbotten voor afleiding</li>
                </ul>

                <h3 id="heading-basistraining" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Basistraining Opfrissen
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Je hond moet deze commando's beheersen voordat je begint:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>"Zit"</strong> en <strong>"Blijf":</strong> Essentieel voor controle</li>
                  <li><strong>"Afblijven":</strong> Om de kat met rust te laten</li>
                  <li><strong>"Hier":</strong> Om je hond weg te roepen</li>
                  <li><strong>"Rustig":</strong> Om opwinding te kalmeren</li>
                </ul>

                <div className="my-8 p-6 bg-cpAmber/5 dark:bg-cpAmber/10 border-2 border-dashed border-cpAmber/30 dark:border-cpAmber/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                  <p className="text-cpCoral font-medium">🎓 Hondentraining voor multi-pet huishoudens</p>
                </div>

                <h2 id="heading-introductiefases" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Het Introductiestappenplan (4 Fases)
                </h2>

                <h3 id="heading-fase-1-geur" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Fase 1: Geuruitwisseling (Dag 1-3)
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Dieren communiceren veel via geur. Begin hiermee:
                </p>

                <ol className="list-decimal list-inside space-y-3 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Houd hond en kat volledig gescheiden</li>
                  <li>Wrijf een doek over de kat en leg deze bij de hond (en vice versa)</li>
                  <li>Wissel beddengoed uit tussen de dieren</li>
                  <li>Laat ze eten aan weerszijden van een gesloten deur</li>
                  <li>Beloon rustig gedrag bij beide dieren</li>
                </ol>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Doel:</strong> Ze raken gewend aan elkaars geur in een veilige context.
                </p>

                <h3 id="heading-fase-2-zicht" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Fase 2: Visueel Contact (Dag 4-7)
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Nu kunnen ze elkaar zien, maar nog niet bij elkaar:
                </p>

                <ol className="list-decimal list-inside space-y-3 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Gebruik een traphekje of babyhekje</li>
                  <li>Laat ze elkaar zien op afstand (5-10 meter)</li>
                  <li>Geef beide dieren hun favoriete snoepjes wanneer ze rustig blijven</li>
                  <li>Houd sessies kort (5-10 minuten)</li>
                  <li>Eindig altijd positief voordat er stress ontstaat</li>
                </ol>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Let op:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Blaffen, grommen, blazen = te snel. Ga terug naar fase 1</li>
                  <li>Nieuwsgierigheid, rustig kijken = goed teken!</li>
                  <li>Onverschilligheid = perfect, ga door naar de volgende stap</li>
                </ul>

                <h3 id="heading-fase-3-geleid-contact" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Fase 3: Geleid Contact (Dag 8-14)
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Nu mogen ze in dezelfde ruimte, maar met strikte supervisie:
                </p>

                <ol className="list-decimal list-inside space-y-3 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Hond aan de lijn:</strong> Volledige controle is cruciaal</li>
                  <li><strong>Kat heeft vluchtroutes:</strong> Deur open, hoge plekken beschikbaar</li>
                  <li><strong>Korte sessies:</strong> 10-15 minuten, meerdere keren per dag</li>
                  <li><strong>Positieve associaties:</strong> Spel, eten, snoepjes tijdens rustig gedrag</li>
                  <li><strong>Afstand bewaren:</strong> Begin met 3-4 meter tussen hen</li>
                </ol>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Belangrijk:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>NOOIT de kat in de armen houden – ze moet kunnen ontsnappen</li>
                  <li>Richt je aandacht op de hond – hij moet rustig blijven</li>
                  <li>Gebruik "afblijven" commando als hond te geïnteresseerd wordt</li>
                  <li>Beloon BEIDE dieren voor rustig gedrag</li>
                </ul>

                <h3 id="heading-fase-4-vrije-interactie" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Fase 4: Vrije Interactie Onder Toezicht (Dag 15+)
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Als fase 3 succesvol verloopt, kun je voorzichtig de lijn verwijderen:
                </p>

                <ol className="list-decimal list-inside space-y-3 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Begin met korte momenten zonder lijn (5 minuten)</li>
                  <li>Blijf altijd in de buurt om in te grijpen</li>
                  <li>Kat heeft nog steeds vluchtroutes</li>
                  <li>Bouw langzaam op naar langere perioden</li>
                  <li>Na 2-4 weken kunnen ze samen zijn als jij thuis bent</li>
                </ol>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Wanneer mag je ze alleen laten?</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Pas na minimaal 4-6 weken succesvolle interacties</li>
                  <li>Begin met korte periodes (30 minuten)</li>
                  <li>Zorg dat kat toegang heeft tot hoge, veilige plekken</li>
                  <li>Kattenbak, voer en water in hondenvrije zone</li>
                  <li>Overweeg een camera om gedrag te monitoren</li>
                </ul>

                <div className="my-8 p-6 bg-cpAmber/5 dark:bg-cpAmber/10 border-2 border-dashed border-cpAmber/30 dark:border-cpAmber/40 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                  <p className="text-cpCoral font-medium">📹 Huisdiercamera met treat dispenser - Volg ze op afstand</p>
                </div>

                <h2 id="heading-lichaamstaal" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Lichaamstaal Herkennen
                </h2>

                <h3 id="heading-positieve-signalen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Positieve Signalen
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Hond:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Ontspannen lichaam, wiebelende staart</li>
                  <li>Speelse buiging (kont omhoog, borst naar beneden)</li>
                  <li>Langzaam, rustig bewegen</li>
                  <li>Hoofd afwenden (respectvolle ruimte geven)</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Kat:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Rechte, ontspannen staart (misschien met gebogen punt)</li>
                  <li>Oren naar voren of naar opzij</li>
                  <li>Langzaam knipperen naar de hond</li>
                  <li>Rustig snuffelen of naderen</li>
                </ul>

                <h3 id="heading-waarschuwingssignalen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Waarschuwingssignalen (Grijp In!)
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Hond:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Stijf lichaam, staartstijl omhoog</li>
                  <li>Intense fixatie op de kat</li>
                  <li>Grommen, blaften</li>
                  <li>Sluipende bewegingen (jachtgedrag)</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Kat:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Opgeblazen vacht, gebogen rug</li>
                  <li>Oren plat naar achteren</li>
                  <li>Blazen, grommen, spugen</li>
                  <li>Grote pupillen en stijve houding</li>
                </ul>

                <h2 id="heading-veelgemaakte-fouten" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  7 Veelgemaakte Fouten
                </h2>

                <ol className="list-decimal list-inside space-y-3 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Te snel gaan:</strong> Haast leidt tot trauma. Neem de tijd!</li>
                  <li><strong>Geen vluchtroutes voor de kat:</strong> Kat moet altijd kunnen ontsnappen</li>
                  <li><strong>Kat vasthouden tijdens ontmoetingen:</strong> Dit maakt de kat hulpeloos en bang</li>
                  <li><strong>Hond niet trainen vooraf:</strong> Basisgehoorzaamheid is essentieel</li>
                  <li><strong>Geen aparte zones:</strong> Beide dieren hebben hun eigen plek nodig</li>
                  <li><strong>Ongelijke aandacht:</strong> Beide dieren moeten zich geliefd voelen</li>
                  <li><strong>Te vroeg alleen laten:</strong> Dit kan leiden tot gevaarlijke situaties</li>
                </ol>

                <h2 id="heading-langetermijn-harmonie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Langetermijn Harmonie Behouden
                </h2>

                <h3 id="heading-dagelijkse-routine" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Dagelijkse Routine
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Gescheiden voertijden:</strong> Voorkomt voedselagressie</li>
                  <li><strong>Individuele aandacht:</strong> Elke dag quality time met elk dier apart</li>
                  <li><strong>Aparte kattenbak locaties:</strong> Niet toegankelijk voor de hond</li>
                  <li><strong>Hoge rustplekken voor kat:</strong> Waar hond niet kan komen</li>
                </ul>

                <h3 id="heading-mentale-fysieke-stimulatie" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Mentale en Fysieke Stimulatie
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Verveelde huisdieren veroorzaken problemen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Hond:</strong> Dagelijkse wandelingen, training, speeltijd</li>
                  <li><strong>Kat:</strong> Interactief speelgoed, klim-mogelijkheden, jachtspellen</li>
                  <li><strong>Samen:</strong> Soms kunnen ze samen spelen (onder toezicht)</li>
                </ul>

                <h2 id="heading-probleemoplossing" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Probleemoplossing: Veelvoorkomende Issues
                </h2>

                <h3 id="heading-hond-blijft-achtervolgen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Probleem 1: Hond Blijft Achtervolgen
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Ga terug naar fase 3 (aan de lijn)</li>
                  <li>Train "afblijven" commando intensiever</li>
                  <li>Beloon rustig gedrag VOORDAT achtervolgen begint</li>
                  <li>Overweeg professionele training voor prooiaandrift</li>
                </ul>

                <h3 id="heading-kat-blijft-agressief" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Probleem 2: Kat Blijft Agressief
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Vertraag het proces – ga terug naar fase 1 of 2</li>
                  <li>Gebruik Feliway (katten-geruststelling feromonen)</li>
                  <li>Zorg voor meer hoge vluchtplekken</li>
                  <li>Geef kat meer eigen ruimte en tijd</li>
                  <li>Overweeg gedragstherapie voor katten</li>
                </ul>

                <h3 id="heading-hond-bang-kat" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  Probleem 3: Hond is Bang voor de Kat
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Oplossing:</strong>
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Laat kat nagels knippen voor minder pijn bij uithal</li>
                  <li>Train hond met positieve bekrachtiging</li>
                  <li>Beloon rustig gedrag wanneer kat in de buurt is</li>
                  <li>Geef hond eigen veilige zone</li>
                </ul>

                <h2 id="heading-wanneer-professional" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Wanneer Professionele Hulp Inschakelen?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Zoek hulp van een gedragstherapeut als:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Na 8+ weken geen vooruitgang</li>
                  <li>Agressief gedrag toeneemt</li>
                  <li>Één van de dieren stopt met eten of wordt ziek van stress</li>
                  <li>Je hond intense jachtimpulsen heeft die niet te controleren zijn</li>
                  <li>Er is al een fysiek incident geweest</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  <strong>Onthoud:</strong> Sommige honden en katten worden nooit beste vrienden, en dat is oké. Het doel is vreedzaam samenleven, niet per se vriendschap. Zolang ze elkaar respecteren en niet stressvol of agressief zijn, is de introductie geslaagd!
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Met geduld, consistentie en de juiste aanpak kunnen de meeste honden en katten leren om samen te leven. Sommige worden zelfs onafscheidelijke vrienden die samen knuffelen en spelen. Het is de tijd en moeite meer dan waard! 🐶❤️🐱
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-border dark:border-cpAmber/10">
                <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde Vragen</h2>

                <div className="space-y-4">
                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Hoe lang duurt het introductieproces gemiddeld?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Dit varieert enorm – van 2 weken tot 3 maanden, afhankelijk van de persoonlijkheden. Puppy's en kittens wennen meestal binnen 2-4 weken. Oudere dieren met sterke persoonlijkheden kunnen 2-3 maanden nodig hebben. Haast nooit – geduld is cruciaal!
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Kan elke hond leren samenleven met een kat?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      De meeste kunnen, maar sommige honden met extreme prooiaandrift (bijv. windhonden met jachtverleden) zijn niet geschikt. Ook zeer dominante of agressieve honden vereisen intensieve professionele training. Laat een gedragstherapeut beoordelen in moeilijke gevallen.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Mijn kat slaat naar mijn hond, is dit normaal?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Een enkele waarschuwing uithal is normaal – zo stelt een kat grenzen. Dit is zelfs goed! Je hond leert: "Te dichtbij = onprettig." Problematisch wordt het als de kat actief de hond opzoekt om te slaan, of als uithalen veel voorkomt. Dan is de kat te gestrest.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Moet ik ingrijpen als ze samen spelen?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Alleen bij echte agressie! Speels gedrag kan er ruw uitzien maar is normaal als: beide dieren vrijwillig meedoen, er pauzes zijn, niemand jankt/mauwt van angst, en rollen worden gewisseld. Grijp in bij: één dier probeert te ontsnappen, grommen/blazen, of opgeblazen vacht.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-xl p-4">
                    <summary className="font-semibold text-foreground dark:text-cpCream cursor-pointer list-none flex justify-between items-center">
                      Mijn hond eet het kattenvoer, wat nu?
                      <span className="text-cpCoral">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 leading-relaxed">
                      Heel normaal – kattenvoer is rijk aan eiwitten en vet. Oplossingen: voer de kat op een hoog oppervlak (aanrecht, kat-boom), gebruik een kattendeur naar de voederkamer, of voer op vaste tijden en haal het weg na 30 minuten. Train ook "afblijven" commando.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">hond en kat</span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">huisdieren introduceren</span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">kat bij hond</span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">multi-pet huishouden</span>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-6">
              <div className="bg-card dark:bg-cpSurface/30 rounded-2xl p-6 border border-border dark:border-cpAmber/10">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-4">Gerelateerde Artikelen</h3>
                <div className="space-y-3">
                  <Link href="/nl/gids/huisdiergedrag/honden" className="block text-sm text-cpCoral hover:underline">
                    → Hondengedrag Begrijpen
                  </Link>
                  <Link href="/nl/gids/huisdiergedrag/katten" className="block text-sm text-cpCoral hover:underline">
                    → Kattengedrag Ontcijferd
                  </Link>
                  <Link href="/nl/gids/huisdiertraining/basiscommandos" className="block text-sm text-cpCoral hover:underline">
                    → Essentiële Hondencommando's
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/20 dark:to-cpAmber/20 rounded-2xl p-6 border-2 border-dashed border-cpCoral/30 dark:border-cpCoral/40">
                <p className="text-xs text-muted-foreground dark:text-cpCream/60 mb-2">Advertentie</p>
                <p className="font-bold text-foreground dark:text-cpCream mb-2">Multi-Pet Training</p>
                <p className="text-sm text-muted-foreground dark:text-cpCream/80">Expert begeleiding • Hond & kat harmonie</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Hond en Kat Samen in Huis: Tips voor een Goede Introductie",
            description: "Leer hond en kat op de juiste manier introduceren. Stappenplan, veelgemaakte fouten en tips voor een harmonieus samenlevingsverband tussen hond en kat.",
            image: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=1200&h=630&fit=crop",
            datePublished: "2024-12-11",
            author: { "@type": "Organization", name: "CutiePawsPedia" },
          }),
        }}
      />
    </div>
  );
}

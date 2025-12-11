/**
 * Blog Post: Waarom graaft mijn hond gaten in de tuin?
 * Category: huisdiergedrag
 * Keywords: hond graaft, graven hond, hond tuin
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { PhotoCredit } from "@/components/blog";
import { BetweenContentAd } from "@/components/ads";
import { BlogSidebarAd } from "@/components/ads";

export const metadata: Metadata = {
  title: "Waarom Graaft Mijn Hond Gaten in de Tuin? | Oorzaken & Oplossingen",
  description: "Ontdek waarom je hond gaten graaft en hoe je dit gedrag kunt stoppen. Praktische tips van hondengedragsexperts om je tuin te redden zonder je hond te frustreren.",
  openGraph: {
    title: "Waarom Graaft Mijn Hond Gaten? Oorzaken & Oplossingen",
    description: "Complete gids om graafgedrag te begrijpen en aan te pakken. Van verveling tot instinct - alle oorzaken en oplossingen.",
    type: "article",
    images: ["https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=630&fit=crop"],
  },
};

export default function BlogPost() {
  const publishDate = new Date("2025-01-08");
  const readingTime = 9;

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
          Huisdiergedrag
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-cpCream mb-6 leading-tight max-w-4xl">
          Waarom Graaft Mijn Hond Gaten in de Tuin?
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
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=800&fit=crop"
            alt="Hond graaft gat in de tuin"
            fill
            className="object-cover"
            priority
          />
          <PhotoCredit
            photographerName="Jamie Street"
            photographerUrl="https://unsplash.com/@jamie452"
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
                Je mooie tuin verandert in een maanlandschap door de graafpartijen van je hond. Maar voor je boos wordt, is het belangrijk te begrijpen waarom honden graven. Dit natuurlijke gedrag heeft vaak een duidelijke oorzaak en gelukkig ook een oplossing.
              </p>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 id="heading-waarom-graven-honden" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Waarom Graven Honden? De 8 Belangrijkste Redenen
                </h2>

                <h3 id="heading-instinct" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  1. Instinctief Gedrag
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Graven zit in het DNA van honden. Hun voorouders groeven holen voor beschutting, om voedsel te begraven en om een koele plek te creëren. Sommige rassen hebben een sterkere graafinstinct dan andere:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Terriërs:</strong> Oorspronkelijk gefokt om ratten en vossen uit holen te graven</li>
                  <li><strong>Teckels:</strong> Gefokt voor het jagen op dassen in ondergrondse holen</li>
                  <li><strong>Siberische Husky's:</strong> Graven gaten in de sneeuw voor warmte</li>
                  <li><strong>Beagles:</strong> Jachthonden die prooien opsporen onder de grond</li>
                  <li><strong>Shar Peis:</strong> Oorspronkelijk gefokt als waakhonden die grenzen afpatrouilleerden</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Bij deze rassen is graven niet 'fout' gedrag - het is hun natuurlijke aanleg. Het volledig stoppen is vaak onrealistisch, maar omleiden naar een toegestane plek is wel mogelijk.
                </p>

                <h3 id="heading-verveling" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  2. Verveling en Overtollige Energie
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Een verveelde hond is een destructieve hond. Als je hond te weinig mentale en fysieke stimulatie krijgt, zoekt hij zelf vermaak - en graven is geweldig entertainment! Signalen van verveling:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Graven gebeurt vooral wanneer je hond alleen in de tuin is</li>
                  <li>Je hond heeft weinig speelgoed of interactie</li>
                  <li>Wandelingen zijn kort of niet uitdagend genoeg</li>
                  <li>Naast graven vertoont je hond ook ander destructief gedrag (kauwen, blaffen)</li>
                </ul>

                <BetweenContentAd testMode={true} />

                <h3 id="heading-afkoelen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  3. Afkoelen bij Warm Weer
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Honden kunnen niet zweten zoals mensen en zoeken bij hitte naar verkoeling. De grond onder het oppervlak is koeler, en door een gat te graven creëert je hond een comfortabele, koele 'bed'. Dit gedrag komt vooral voor:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Op warme zomerdagen</li>
                  <li>Bij honden met dik of donker vachtkleur</li>
                  <li>Wanneer er geen schaduw of koele plekken beschikbaar zijn</li>
                  <li>Bij rassen die gevoelig zijn voor hitte (zoals Bulldogs en Mopshonden)</li>
                </ul>

                <h3 id="heading-jagen-begraven" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  4. Jagen op Prooien of Begraven van Schatten
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Je tuin zit vol interessante geuren en geluiden. Honden graven om:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Mollen, muizen of insecten op te sporen</li>
                  <li>Botten, speelgoed of snacks te begraven voor later</li>
                  <li>Eerder begraven 'schatten' terug te vinden</li>
                  <li>Wortels of bollen te onderzoeken (vooral bij jonge honden)</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Als je hond graaft op specifieke plekken en zijn neus diep in het gat steekt, is hij waarschijnlijk op jacht.
                </p>

                <h3 id="heading-angst-stress" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  5. Angst en Stress
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Sommige honden graven als copingmechanisme voor stress. Graven kan kalmering bieden, vergelijkbaar met nagelbijten bij mensen. Oorzaken kunnen zijn:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Scheidingsangst wanneer je weg bent</li>
                  <li>Angst voor geluiden zoals onweer of vuurwerk</li>
                  <li>Territoriumgedrag (bijvoorbeeld bij ongecastreerde reuen)</li>
                  <li>Nieuwe situaties of veranderingen in het huishouden</li>
                </ul>

                <BetweenContentAd testMode={true} />

                <h3 id="heading-ontsnappen" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  6. Ontsnappingspoging
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Als je hond graaft bij hekken of muren, probeert hij mogelijk te ontsnappen. Dit kan verschillende redenen hebben:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Een loops teefje in de buurt (bij ongecastreerde reuen)</li>
                  <li>Andere honden horen of ruiken</li>
                  <li>De tuin is te saai vergeleken met de buitenwereld</li>
                  <li>Scheidingsangst - je hond wil bij jou zijn</li>
                </ul>

                <h3 id="heading-aandacht" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  7. Aandacht Zoeken
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Honden zijn slim. Als graven ervoor zorgt dat jij naar buiten rent en (zelfs boos) aandacht geeft, heeft je hond bereikt wat hij wilde. Negatieve aandacht is nog steeds aandacht. Als je hond naar je kijkt tijdens het graven of meteen stopt wanneer je komt kijken, is dit waarschijnlijk het probleem.
                </p>

                <h3 id="heading-zwangerschap" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  8. Nesteldrang bij Zwangerschap
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Zwangere teven graven instinctief een 'nest' voor hun puppies. Dit is normaal gedrag in de laatste weken van de zwangerschap. Ook schijnzwangere teven kunnen dit gedrag vertonen.
                </p>

                <h2 id="heading-gedrag-stoppen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Hoe Stop Je Graafgedrag?
                </h2>

                <h3 id="heading-verhoog-beweging" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  1. Verhoog Lichaamsbeweging en Mentale Stimulatie
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Een vermoeide hond is een tevreden hond:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Verleng wandelingen met 15-30 minuten</li>
                  <li>Voeg uitdagende activiteiten toe zoals apporteren, agility of zoekspelletjes</li>
                  <li>Gebruik puzzelspeelgoed en snuffelmatten voor mentale uitdaging</li>
                  <li>Plan sociale momenten met andere honden (hondenpark, speelafspraakjes)</li>
                  <li>Wissel routes af voor nieuwe geuren en prikkels</li>
                </ul>

                <h3 id="heading-graafzone" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  2. Creëer een Toegestane Graafzone
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Voor honden met een sterke graafdrang: geef ze een plek waar het mag!
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Maak een zandbak of graafgebied (2x2 meter is ideaal)</li>
                  <li>Gebruik los zand of zachte aarde</li>
                  <li>Begraaf speelgoed en snacks om je hond te lokken</li>
                  <li>Leid je hond actief naar deze plek wanneer hij elders begint te graven</li>
                  <li>Beloon uitbundig wanneer je hond op de juiste plek graaft</li>
                  <li>Maak andere delen van de tuin minder aantrekkelijk (zie hieronder)</li>
                </ul>

                <BetweenContentAd testMode={true} />

                <h3 id="heading-maak-onaantrekkelijk" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  3. Maak Graafplekken Onaantrekkelijk
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Ontmoedig graven op verkeerde plekken:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Leg gaas of kippengaas onder een dunne laag grond</li>
                  <li>Plaats grote stenen in favoriete graafplekken</li>
                  <li>Vul gaten met hondenvriendelijke afweermiddelen (citrusgeur, cayennepeper)</li>
                  <li>Leg planken of tegels over probleemgebieden</li>
                  <li>Plant prikelige struiken (zoals rozenbottels) op strategische plekken</li>
                  <li>Sproei groen bittere spray (verkrijgbaar bij dierenwinkel) op graafplekken</li>
                </ul>

                <h3 id="heading-koelte-bieden" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  4. Bied Koelte en Schaduw
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Als afkoelen de reden is:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Plaats een hondenzwembad in de tuin</li>
                  <li>Zorg voor voldoende schaduwplekken (parasol, afdak)</li>
                  <li>Leg koelmatten neer waar je hond kan liggen</li>
                  <li>Houd je hond binnen tijdens de heetste uren (12:00-16:00)</li>
                  <li>Bied altijd vers, koel water aan</li>
                </ul>

                <h3 id="heading-bestrijding-prooien" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  5. Bestrijding van Prooien
                </h3>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Als je hond graaft om dieren op te sporen:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Verwijder mollenhopen en mollenactiviteit (mollenval, ultrasone afschrikker)</li>
                  <li>Houd de tuin schoon - geen voedselresten die muizen aantrekken</li>
                  <li>Gebruik natuurlijke afweermiddelen voor ongedierte</li>
                  <li>Begraaf geen botten of snacks in de tuin (ook niet als beloning)</li>
                </ul>

                <h3 id="heading-supervisie-training" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  6. Supervisie en Training
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Houd toezicht:</strong> Laat je hond niet onbeheerd in de tuin wanneer graven een probleem is</li>
                  <li><strong>Onderbreek direct:</strong> Zeg "Nee" of "Stop" en leid je hond weg zodra hij begint te graven</li>
                  <li><strong>Redirect:</strong> Geef een alternatief (speelgoed, graafzone, apporteer spelletje)</li>
                  <li><strong>Beloon goed gedrag:</strong> Geef snacks en aandacht wanneer je hond rustig in de tuin is zonder te graven</li>
                  <li><strong>Train commando's:</strong> Leer "Kom" en "Laat" om je hond weg te roepen van graafplekken</li>
                </ul>

                <h3 id="heading-pak-onderliggende-oorzaak-aan" className="text-xl font-bold text-foreground dark:text-cpCream mt-6 mb-3 scroll-mt-24">
                  7. Pak de Onderliggende Oorzaak Aan
                </h3>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Bij angst:</strong> Werk aan desensitisatie en counter-conditioning (mogelijk met hulp van gedragsdeskundige)</li>
                  <li><strong>Bij scheidingsangst:</strong> Oefen met korte afwezigheden en bouw langzaam op</li>
                  <li><strong>Bij ontsnappingspogingen:</strong> Versterk hekken met fundering of betonnen platen</li>
                  <li><strong>Bij aandachtzoekend gedrag:</strong> Negeer het gedrag en beloon rustig gedrag</li>
                  <li><strong>Overweeg castratie:</strong> Bij ongecastreerde reuen die ontsnappen om loopse teven te zoeken</li>
                </ul>

                <h2 id="heading-wat-niet-te-doen" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Wat Je NIET Moet Doen
                </h2>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li><strong>Bestraffen achteraf:</strong> Je hond begrijpt niet waarom je boos bent als het graven al gebeurd is</li>
                  <li><strong>Schreeuwen of fysieke straf:</strong> Dit vergroot angst en kan het gedrag verergeren</li>
                  <li><strong>Neus in het gat duwen:</strong> Dit is wreed en ineffectief</li>
                  <li><strong>Hond opsluiten zonder oplossing:</strong> Graven is een symptoom, niet het probleem zelf</li>
                  <li><strong>Te snel opgeven:</strong> Gedragsverandering kost tijd en consistentie</li>
                </ul>

                <h2 id="heading-wanneer-professional" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Wanneer Professional Hulp Inschakelen?
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Overweeg een hondengedragsdeskundige of trainer als:
                </p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground dark:text-cpCream/80">
                  <li>Het gedrag verergert ondanks je pogingen</li>
                  <li>Graven gepaard gaat met agressie of extreme angst</li>
                  <li>Je hond zichzelf verwondt tijdens het graven</li>
                  <li>Het gedrag plotseling is begonnen (kan medische oorzaak hebben)</li>
                  <li>Graven onderdeel is van breder destructief gedrag</li>
                </ul>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Een professional kan de specifieke oorzaak identificeren en een op maat gemaakt trainingsplan opstellen.
                </p>

                <h2 id="heading-geduld-consistentie" className="text-2xl font-bold text-foreground dark:text-cpCream mt-8 mb-4 scroll-mt-24">
                  Geduld en Consistentie Zijn Sleutels
                </h2>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Het stoppen van graafgedrag gebeurt niet van de ene op de andere dag. Het kan weken tot maanden duren voordat je duidelijke verbetering ziet. Blijf consistent in je aanpak, vier kleine successen, en onthoud dat graven een natuurlijk hondengedrag is. Het doel is niet om het volledig te elimineren, maar om het om te leiden naar acceptabel gedrag.
                </p>

                <p className="text-muted-foreground dark:text-cpCream/80 leading-relaxed mb-4">
                  Je hond graaft niet om je te pesten - hij volgt instincten of communiceert een behoefte. Door de onderliggende oorzaak te begrijpen en aan te pakken, kun je samen met je hond naar een oplossing werken die zowel je tuin als jullie band ten goede komt.
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-border dark:border-cpAmber/10">
                <h2 className="text-2xl font-bold text-foreground dark:text-cpCream mb-6">
                  Veelgestelde Vragen
                </h2>

                <div className="space-y-4">
                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Waarom graaft mijn hond alleen als ik weg ben?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Dit duidt vaak op scheidingsangst of verveling. Je hond mist je aanwezigheid en gebruikt graven als copingmechanisme of om de tijd te doden. Werk aan het opbouwen van zelfvertrouwen en overweeg een hondenuitlaatservice of dagopvang voor gezelschap.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Helpt castratie tegen graafgedrag?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Castratie kan helpen als het graven hormoongedreven is (ontsnappen om loopse teven te zoeken, territoriumgedrag). Bij graven door verveling, instinct of afkoeling maakt castratie geen verschil. Bespreek met je dierenarts of castratie in jouw situatie kan helpen.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Mag ik mijn hond bestraffen als ik hem betrap op graven?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Bestraffen werkt zelden en kan de band met je hond beschadigen. Beter is om het gedrag direct te onderbreken met een neutraal "Nee" en je hond dan om te leiden naar een acceptabel alternatief (speelgoed, graafzone, andere activiteit). Beloon het alternatieve gedrag uitbundig.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Kan graven wijzen op een medisch probleem?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Ja, plotseling graafgedrag kan soms duiden op pijn, ongemak of neurologische problemen. Als het gedrag plotseling is begonnen of gepaard gaat met andere symptomen (lethargie, verminderde eetlust, veranderde gang), laat je hond dan nakijken door een dierenarts.
                    </p>
                  </details>

                  <details className="group bg-secondary/50 dark:bg-cpSurface/50 rounded-lg p-4">
                    <summary className="font-medium text-foreground dark:text-cpCream cursor-pointer list-none flex items-center justify-between">
                      Hoe lang duurt het om graafgedrag te stoppen?
                      <span className="ml-4 text-cpCoral group-open:rotate-90 transition-transform">›</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground dark:text-cpCream/80 text-sm">
                      Dit hangt af van de oorzaak, de leeftijd van je hond en hoe lang het gedrag al bestaat. Bij verveling kan je binnen enkele weken verbetering zien. Bij diepgeworteld instinctief gedrag (terriërs, teckels) is volledige eliminatie vaak niet realistisch - omleiden naar een graafzone is dan de beste oplossing.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-muted-foreground dark:text-cpCream/60" />
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond graaft
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                graven hond
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hond tuin
              </span>
              <span className="px-3 py-1 bg-secondary dark:bg-cpSurface text-muted-foreground dark:text-cpCream/80 text-sm rounded-full">
                hondengedrag
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
              href="/nl/gids/huisdiergedrag/destructief-gedrag"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Destructief Gedrag bij Honden Stoppen
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Oorzaken en oplossingen voor kauwen, graven en ander destructief gedrag
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>

            <Link
              href="/nl/gids/huisdiergedrag/verveling"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Verveelde Hond: Herkennen en Oplossen
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Signalen van verveling en hoe je je hond mentaal stimuleert
              </p>
              <span className="text-cpCoral text-sm font-medium">Lees meer →</span>
            </Link>

            <Link
              href="/nl/gids/hondenrassen/terriers"
              className="group bg-card dark:bg-cpSurface/50 rounded-2xl overflow-hidden border border-border dark:border-cpAmber/20 shadow-sm hover:shadow-md transition-all p-6"
            >
              <h3 className="font-bold text-foreground dark:text-cpCream group-hover:text-cpCoral transition-colors mb-2">
                Terriërs: Alles Over Deze Graafexperts
              </h3>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                Karaktereigenschappen en opvoedingstips voor terriërrassen
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
            headline: "Waarom Graaft Mijn Hond Gaten in de Tuin?",
            description: "Ontdek waarom je hond gaten graaft en hoe je dit gedrag kunt stoppen. Praktische tips om je tuin te redden zonder je hond te frustreren.",
            image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=630&fit=crop",
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

import type { Metadata } from "next";
import Link from "next/link";
import { Droplet, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Je hond baden: tips, frequentie en producten | Gids 2024",
  description: "Ontdek hoe vaak je je hond moet baden, welke producten je nodig hebt en hoe je het stap voor stap doet. Voor alle vachttypen.",
  keywords: "hond baden, hond wassen, hond badderen, hondenshampoo, hoe vaak hond baden",
  openGraph: {
    title: "Je hond baden: tips, frequentie en producten | Gids 2024",
    description: "Leer hoe je je hond goed baadt met onze complete gids. Vind ook professionele trimsalons.",
    type: "article",
  },
};

export default function HondBadenTipsPage() {
  return (
    <>
      {/* Schema.org Article markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Je hond baden: tips, frequentie en producten | Gids 2024",
            "description": "Ontdek hoe vaak je je hond moet baden en hoe je het goed doet.",
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
            "datePublished": "2024-01-15",
            "dateModified": "2024-01-15"
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cpCoral/10 via-cpAmber/5 to-transparent dark:from-cpCoral/5 dark:via-transparent border-b border-border dark:border-cpAmber/20">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cpCoral/10 dark:bg-cpCoral/20 border border-cpCoral/20 mb-6">
              <Droplet className="w-4 h-4 text-cpCoral" />
              <span className="text-sm font-medium text-cpCoral">Hondenverzorging</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-cpCream mb-6">
              Je hond <span className="gradient-text-coral">baden</span>: tips, frequentie en producten
            </h1>
            <p className="text-xl text-muted-foreground dark:text-cpCream/80 max-w-2xl mx-auto">
              Leer hoe vaak je je hond moet baden, welke shampoo je moet gebruiken en hoe je het stap voor stap doet voor een schone, gezonde vacht.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <Link
              href="/nl/nederland"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
            >
              <Droplet className="w-5 h-5" />
              Vind een trimsalon bij jou in de buurt
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-background dark:bg-cpCharcoal">
        <div className="container mx-auto max-w-4xl px-4 py-16">

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Baden is een belangrijk onderdeel van de verzorging van je hond, maar hoe vaak moet het eigenlijk? En kun je je hond te vaak wassen? In deze gids beantwoorden we alle vragen over het baden van je hond: van de juiste frequentie tot de beste producten en technieken.
            </p>
            <p className="text-lg text-muted-foreground dark:text-cpCream/80 leading-relaxed">
              Met de juiste aanpak wordt badderen een aangename ervaring voor jullie beiden, en houd je de vacht en huid van je hond gezond en glanzend.
            </p>
          </div>

          {/* How Often */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Hoe vaak moet je een hond baden?</h2>

            <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-2xl p-6 mb-8 border border-cpAmber/30 dark:border-cpAmber/20">
              <div className="flex items-start gap-3 mb-4">
                <Calendar className="w-6 h-6 text-cpAmber flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Algemene richtlijn</h3>
                  <p className="text-muted-foreground dark:text-cpCream/80">
                    <strong>Elke 4-8 weken</strong> voor de meeste honden. Maar dit varieert sterk per hond, ras en levensstijl.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                💡 <strong>Gouden regel:</strong> Baden als je hond vuil is of stinkt, maar niet vaker dan nodig. Te vaak baden kan de natuurlijke huidoliën verstoren.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-4">Baadfrequentie per vachttype</h3>

            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🐕 Korte gladde vacht (Boxer, Beagle, Labrador)</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  <strong>Elke 8-12 weken</strong> of als ze echt vies zijn. Deze honden hebben weinig ondervacht en blijven relatief schoon.
                </p>
                <p className="text-xs text-muted-foreground dark:text-cpCream/60 italic">
                  💡 Regelmatig borstelen + afvegen met een vochtige doek is vaak genoeg tussen badbeurten.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🐕 Middellange vacht (Golden Retriever, Border Collie)</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  <strong>Elke 6-8 weken</strong>. Deze vachten houden meer vuil vast en kunnen sneller gaan ruiken.
                </p>
                <p className="text-xs text-muted-foreground dark:text-cpCream/60 italic">
                  💡 Borstel eerst goed uit om klitten te voorkomen voordat je gaat baden.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🐩 Lange vacht & krullen (Poedel, Shih Tzu, Bichon)</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  <strong>Elke 4-6 weken</strong>. Deze vachttypen hebben intensieve verzorging nodig en profiteren van regelmatig baden met conditioner.
                </p>
                <p className="text-xs text-muted-foreground dark:text-cpCream/60 italic">
                  💡 Veel eigenaren laten dit doen door een professionele trimmer.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🐺 Dikke dubbele vacht (Husky, Malamute, Samojeed)</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  <strong>Elke 3-4 maanden</strong>, of alleen als echt nodig. Te vaak baden kan de natuurlijke waterafstotende laag aantasten.
                </p>
                <p className="text-xs text-muted-foreground dark:text-cpCream/60 italic">
                  💡 Focus op regelmatig borstelen om losse ondervacht te verwijderen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h4 className="font-bold text-cpCoral mb-2">🦴 Gevoelige huid (Bulldog, Shar-Pei, Franse Bulldog)</h4>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-2">
                  <strong>Elke 4-6 weken</strong> met milde, hypoallergene shampoo. Extra aandacht voor huidplooien.
                </p>
                <p className="text-xs text-muted-foreground dark:text-cpCream/60 italic">
                  💡 Overleg met je dierenarts over de beste producten bij huidproblemen.
                </p>
              </div>
            </div>
          </section>

          {/* Signs They Need a Bath */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Wanneer is het tijd voor een bad?</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpCoral mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Tijd voor een bad
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <li>• Duidelijk zichtbaar vuil of modder</li>
                  <li>• Onaangename geur, zelfs na borstelen</li>
                  <li>• Vacht voelt vettig of plakkerig aan</li>
                  <li>• Na zwemmen in vervuild water</li>
                  <li>• Contact met iets vies (dode vis, uitwerpselen, etc.)</li>
                  <li>• Meer dan 2 maanden geleden voor meeste rassen</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-cpAmber mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Wacht nog even
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground dark:text-cpCream/70">
                  <li>• Je hond is recent (< 2 weken geleden) gebaad</li>
                  <li>• Alleen oppervlakkig stof (borstelen is genoeg)</li>
                  <li>• Hond heeft een wond of huidirritatie</li>
                  <li>• Tijdens ziekteperiode (overleg met dierenarts)</li>
                  <li>• Kort na vaccinatie (wacht 48 uur)</li>
                  <li>• Bij extreem koud weer zonder verwarmde ruimte</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Middle CTA */}
          <div className="bg-gradient-to-br from-cpCoral/10 to-cpAmber/10 dark:from-cpCoral/5 dark:to-cpAmber/5 rounded-2xl p-8 text-center mb-12 border border-cpCoral/20">
            <h3 className="text-2xl font-bold text-foreground dark:text-cpCream mb-3">
              Professionele wasbeurten nodig?
            </h3>
            <p className="text-muted-foreground dark:text-cpCream/70 mb-6">
              Vind trimsalons met professionele wasfaciliteiten die perfect weten hoe ze met het vachttype van jouw hond moeten omgaan.
            </p>
            <Link
              href="/nl/nederland"
              className="inline-flex items-center gap-2 bg-cpCoral text-white rounded-xl px-6 py-3 font-semibold hover:-translate-y-1 transition-all"
            >
              Vind trimsalons in jouw stad →
            </Link>
          </div>

          {/* What You Need */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Wat heb je nodig?</h2>

            <div className="space-y-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Hondenshampoo (NOOIT mensenshampoo!)</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70 mb-3">
                  Mensenshampoo heeft een verkeerde pH-waarde (te zuur) en kan de huid van je hond irriteren. Kies voor:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/60">
                  <li>• <strong>Algemeen:</strong> Milde hondenshampoo voor normaal gebruik</li>
                  <li>• <strong>Gevoelige huid:</strong> Hypoallergeen, zonder parfum en kleurstoffen</li>
                  <li>• <strong>Witte vacht:</strong> Whitening shampoo tegen gele verkleuring</li>
                  <li>• <strong>Jeuk/huidproblemen:</strong> Medicinale shampoo (overleg dierenarts)</li>
                  <li>• <strong>Lange vacht:</strong> Shampoo + conditioner voor makkelijk doorkammen</li>
                </ul>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Handdoeken (meerdere!)</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Oude handdoeken zijn prima. Zorg dat je er minstens 2-3 hebt voor grotere honden.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Anti-slip mat</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Voor in bad of douche. Voorkomt uitglijden en geeft je hond een veilig gevoel.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Borstel (voor én na het bad)</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Essentieel om klitten te verwijderen vóór het baden en de vacht te ontwarren ná het drogen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Watten (optioneel)</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Om in de oren te stoppen en water eruit te houden. Vooral handig bij honden met oorproblemen.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-foreground dark:text-cpCream mb-2">✓ Snoepjes voor beloning</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Maak het een positieve ervaring! Geef tijdens en na het bad veel complimentjes en snoepjes.
                </p>
              </div>
            </div>
          </section>

          {/* Step by Step Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Stappenplan: je hond baden</h2>

            <div className="space-y-6">
              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Borstel eerst grondig</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-2">
                      Verwijder alle klitten en losse haren. <strong className="text-cpCoral">Klitten worden veel erger als ze nat worden!</strong> Vooral bij lange vachten is dit cruciaal.
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/60 italic">
                      💡 Dit bespaart je later veel werk en voorkomt pijnlijke klitten.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Maak de vacht nat</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-2">
                      Gebruik <strong>lauw water</strong> (niet te warm, niet te koud - test op je pols). Begin bij de poten en werk naar boven. Vermijd water in de oren en ogen.
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/60">
                      ⏱️ Bij dikke ondervacht kan dit 5-10 minuten duren - de vacht moet echt doorweekt zijn.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Breng shampoo aan</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                      Verdun de shampoo eerst in je hand met wat water (dit schuimt beter). Masseer het schuim goed in de vacht, vanaf de nek naar de staart. Vergeet niet:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground dark:text-cpCream/60">
                      <li>• Buik en binnenkant poten</li>
                      <li>• Onder de staart</li>
                      <li>• Poten en tussen de tenen</li>
                      <li>• Kop (voorzichtig, vermijd ogen en oren)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Goed spoelen (dit is de belangrijkste stap!)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-2">
                      Spoel <strong>alle shampoo eruit</strong>. Achterblijvende shampoo kan jeuk, roos en huidirritatie veroorzaken. Blijf spoelen tot het water helder is en de vacht "piept" als je erover wrijft.
                    </p>
                    <p className="text-sm text-cpCoral">
                      ⚠️ Deze stap duurt langer dan je denkt - neem de tijd!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Conditioner (optioneel, voor lange vachten)</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-2">
                      Voor lange vachten: breng conditioner aan, laat 2-3 minuten intrekken, spoel grondig uit. Dit voorkomt klitten en maakt de vacht zachter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Droog je hond</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                      <strong>In het bad:</strong> Laat je hond eerst schudden (dit verwijdert 70% van het water!). Knijp daarna voorzichtig overtollig water uit de vacht.
                    </p>
                    <p className="text-muted-foreground dark:text-cpCream/70 mb-3">
                      <strong>Met handdoeken:</strong> Dep (niet wrijven!) de vacht droog. Gebruik meerdere handdoeken. Begin bij de kop en werk naar de staart.
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-cpCream/60">
                      💡 <strong>Fohn (optioneel):</strong> Gebruik een fohn op lage temperatuur en houd 30cm afstand. Veel honden vinden dit eng - wen er langzaam aan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpCoral">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpCoral text-white flex items-center justify-center font-bold flex-shrink-0">
                    7
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Borstel nog een keer</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70">
                      Als de vacht bijna droog is, borstel dan nog een keer om losse haren te verwijderen en klitten te voorkomen. Dit geeft ook een mooie glans!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-2xl p-6 border-l-4 border-cpAmber">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cpAmber text-cpCharcoal flex items-center justify-center font-bold flex-shrink-0">
                    8
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-cpCream mb-2">Beloon je hond!</h3>
                    <p className="text-muted-foreground dark:text-cpCream/70">
                      Geef veel complimentjes en een paar extra snoepjes. Maak er een feestje van zodat je hond de volgende keer minder angstig is!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Important Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Belangrijke badtips</h2>

            <div className="space-y-4">
              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-5 border-l-4 border-cpCoral">
                <h3 className="font-bold text-cpCoral mb-2">⚠️ Watertemperatuur</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Test altijd op je pols - het moet lauw aanvoelen. Te warm water is oncomfortabel en kan de huid irriteren. Te koud water is ook vervelend en kan hypothermie veroorzaken bij kleine of oude honden.
                </p>
              </div>

              <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-5 border-l-4 border-cpAmber">
                <h3 className="font-bold text-cpAmber mb-2">💧 Oren beschermen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Water in de oren kan oorontstekingen veroorzaken. Plaats watten in de oren (niet te diep!) of houd je hand over de oorgangen bij het wassen van de kop. Droog de oren na afloop goed.
                </p>
              </div>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-5 border-l-4 border-cpCoral">
                <h3 className="font-bold text-cpCoral mb-2">👁️ Ogen vermijden</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Shampoo in de ogen is pijnlijk. Was de kop als laatste en gebruik je hand als "vizier" boven de ogen. Gebruik een vochtige doek voor het gezicht in plaats van direct water.
                </p>
              </div>

              <div className="bg-cpAmber/10 dark:bg-cpAmber/5 rounded-xl p-5 border-l-4 border-cpAmber">
                <h3 className="font-bold text-cpAmber mb-2">🌡️ Zorg voor warmte na het bad</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Vooral bij koud weer: zorg dat je hond binnen blijft tot hij helemaal droog is. Natte honden kunnen snel afkoelen. Vermijd tocht.
                </p>
              </div>

              <div className="bg-cpCoral/10 dark:bg-cpCoral/5 rounded-xl p-5 border-l-4 border-cpCoral">
                <h3 className="font-bold text-cpCoral mb-2">⏰ Timing</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Baden na een lange wandeling is ideaal - je hond is moe en rustiger. Vermijd baden vlak voor het slapen gaan als je hond hyperactief wordt na het bad.
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Veelgemaakte fouten</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Te vaak baden</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Verstoort natuurlijke huidoliën → droge huid, roos, jeuk. Wekelijks baden is te vaak, tenzij medisch geadviseerd.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Mensenshampoo gebruiken</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Verkeerde pH-waarde, te agressief voor hondenhuid. Kan ernstige huidirritatie veroorzaken.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Niet goed spoelen</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Shampooresten = jeuk, roos en dof haar. Spoel minstens 2x zo lang als je denkt nodig te hebben.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Baden met klitten in de vacht</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Klitten worden veel erger als ze nat worden en zijn daarna bijna niet meer uit te kammen. Altijd eerst borstelen!
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Te heet water</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Honden hebben een andere temperatuurgevoeligheid. Wat lauw voor jou is, kan te warm zijn voor je hond.
                </p>
              </div>

              <div className="bg-card dark:bg-cpSurface/50 rounded-xl p-5 border border-border dark:border-cpAmber/20">
                <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Nat naar buiten laten</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">
                  Natte honden koelen snel af en rollen vaak in vuil om de "shampoogeur" kwijt te raken. Laat volledig drogen!
                </p>
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Gerelateerde artikelen</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/nl/hondenverzorging/beste-hondenborstels"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">De beste hondenborstels per vachttype</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
              <Link
                href="/nl/hondenverzorging/hondennagels-knippen"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Hondennagels knippen: stappenplan</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
              <Link
                href="/nl/hondenverzorging/tanden-poetsen-hond"
                className="bg-card dark:bg-cpSurface/50 rounded-xl p-4 border border-border dark:border-cpAmber/20 hover:border-cpCoral/40 transition-all"
              >
                <h3 className="font-semibold text-foreground dark:text-cpCream mb-2">Tanden poetsen bij honden</h3>
                <p className="text-sm text-muted-foreground dark:text-cpCream/70">Lees meer →</p>
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-cpCream mb-6">Veelgestelde vragen</h2>
            <div className="space-y-4">
              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Kan ik mijn puppy baden?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Ja, maar wacht tot je puppy minstens 8 weken oud is en de eerste vaccinatie heeft gehad. Gebruik extra milde puppy shampoo en lauw water. Houd het kort en positief - dit bepaalt hoe je puppy later tegen baden aankijkt!
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mijn hond is bang voor water, wat nu?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Bouw het langzaam op: begin met alleen pootjes natmaken + snoepjes. Gebruik een leckermat met pindakaas als afleiding. Maak het altijd positief en forceer nooit. Bij extreme angst kun je droogshampoo gebruiken of een professionele trimmer inschakelen die ervaring heeft met angstige honden.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Kan ik babys hampoo gebruiken?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  In noodgevallen (bijv. tijdens vakantie zonder hondenshampoo) kan milde babyshampoo één keer, maar dit is niet ideaal. Babyshampoo heeft nog steeds een andere pH-waarde dan hondenshampoo. Gebruik het niet regelmatig.
                </div>
              </details>

              <details className="group bg-card dark:bg-cpSurface/50 rounded-2xl border border-border dark:border-cpAmber/20 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground dark:text-cpCream">
                  Mijn hond ruikt snel weer na het baden, wat kan ik doen?
                  <span className="text-cpCoral dark:text-cpAmber group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground dark:text-slate-400">
                  Dit kan verschillende oorzaken hebben: oorontsteking, tandproblemen, anaalklieren die geledigd moeten worden, of een huidaandoening. Als je hond binnen een week na het baden alweer stinkt, ga dan naar de dierenarts om de oorzaak te vinden. Regelmatig borstelen tussen badbeurten door helpt ook.
                </div>
              </details>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-gradient-to-br from-cpCoral via-cpCoral/90 to-cpAmber rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Professionele wasbeurten voor je hond
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Vind trimsalons met professionele wasfaciliteiten die jouw hond vakkundig wassen en verzorgen.
              </p>
              <Link
                href="/nl/nederland"
                className="inline-flex items-center gap-2 bg-white text-cpCoral rounded-xl px-8 py-4 font-semibold hover:-translate-y-1 transition-all shadow-lg"
              >
                <Droplet className="w-5 h-5" />
                Ontdek alle trimsalons
              </Link>
            </div>
          </section>

        </div>
      </article>
    </>
  );
}

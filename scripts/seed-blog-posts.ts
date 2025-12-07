#!/usr/bin/env npx tsx
/**
 * Seed Blog Posts Script
 *
 * Creates sample blog posts with categories and tags
 * with full i18n support (English + Dutch content)
 */
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL as string);

async function main() {
  console.log("🌱 Seeding blog data...\n");

  // =========================================================================
  // CATEGORIES
  // =========================================================================
  console.log("Creating blog categories...");

  const categories = [
    {
      slug: "pet-care",
      nameEn: "Pet Care",
      nameNl: "Huisdierverzorging",
      descriptionEn: "Tips and advice for taking care of your beloved pets",
      descriptionNl: "Tips en advies voor de verzorging van je geliefde huisdieren",
      icon: "🐾",
      color: "coral",
      sortOrder: 1,
    },
    {
      slug: "health",
      nameEn: "Health",
      nameNl: "Gezondheid",
      descriptionEn: "Health advice and medical information for pets",
      descriptionNl: "Gezondheidsadvies en medische informatie voor huisdieren",
      icon: "🩺",
      color: "green",
      sortOrder: 2,
    },
    {
      slug: "training",
      nameEn: "Training",
      nameNl: "Training",
      descriptionEn: "Training tips and behavioral guidance",
      descriptionNl: "Trainingstips en gedragsadvies",
      icon: "🎓",
      color: "blue",
      sortOrder: 3,
    },
    {
      slug: "nutrition",
      nameEn: "Nutrition",
      nameNl: "Voeding",
      descriptionEn: "Food and nutrition guides for healthy pets",
      descriptionNl: "Voedsel- en voedingsgidsen voor gezonde huisdieren",
      icon: "🥗",
      color: "amber",
      sortOrder: 4,
    },
    {
      slug: "grooming",
      nameEn: "Grooming",
      nameNl: "Verzorging",
      descriptionEn: "Grooming tips and coat care advice",
      descriptionNl: "Trimmertips en vachtverzorgingsadvies",
      icon: "✂️",
      color: "pink",
      sortOrder: 5,
    },
  ];

  for (const cat of categories) {
    await sql`
      INSERT INTO blog_categories (slug, name_en, name_nl, description_en, description_nl, icon, color, sort_order)
      VALUES (${cat.slug}, ${cat.nameEn}, ${cat.nameNl}, ${cat.descriptionEn}, ${cat.descriptionNl}, ${cat.icon}, ${cat.color}, ${cat.sortOrder})
      ON CONFLICT (slug) DO UPDATE SET
        name_en = EXCLUDED.name_en,
        name_nl = EXCLUDED.name_nl,
        description_en = EXCLUDED.description_en,
        description_nl = EXCLUDED.description_nl,
        icon = EXCLUDED.icon,
        color = EXCLUDED.color
    `;
  }
  console.log(`  ✅ Created ${categories.length} categories`);

  // =========================================================================
  // TAGS
  // =========================================================================
  console.log("Creating blog tags...");

  const tags = [
    { slug: "dogs", nameEn: "Dogs", nameNl: "Honden" },
    { slug: "cats", nameEn: "Cats", nameNl: "Katten" },
    { slug: "puppies", nameEn: "Puppies", nameNl: "Puppy's" },
    { slug: "kittens", nameEn: "Kittens", nameNl: "Kittens" },
    { slug: "senior-pets", nameEn: "Senior Pets", nameNl: "Oudere Huisdieren" },
    { slug: "first-time-owners", nameEn: "First-Time Owners", nameNl: "Nieuwe Baasjes" },
    { slug: "summer", nameEn: "Summer", nameNl: "Zomer" },
    { slug: "winter", nameEn: "Winter", nameNl: "Winter" },
    { slug: "vet-visits", nameEn: "Vet Visits", nameNl: "Dierenarts Bezoeken" },
    { slug: "pet-insurance", nameEn: "Pet Insurance", nameNl: "Dierenverzekering" },
  ];

  for (const tag of tags) {
    await sql`
      INSERT INTO blog_tags (slug, name_en, name_nl)
      VALUES (${tag.slug}, ${tag.nameEn}, ${tag.nameNl})
      ON CONFLICT (slug) DO UPDATE SET
        name_en = EXCLUDED.name_en,
        name_nl = EXCLUDED.name_nl
    `;
  }
  console.log(`  ✅ Created ${tags.length} tags`);

  // Get category IDs
  const categoryIds = await sql`SELECT id, slug FROM blog_categories`;
  const catMap = new Map(categoryIds.map((c: { id: number; slug: string }) => [c.slug, c.id]));

  // Get tag IDs
  const tagIds = await sql`SELECT id, slug FROM blog_tags`;
  const tagMap = new Map(tagIds.map((t: { id: number; slug: string }) => [t.slug, t.id]));

  // =========================================================================
  // BLOG POSTS
  // =========================================================================
  console.log("Creating blog posts...");

  const posts = [
    {
      slug: "5-tips-for-a-healthy-puppy",
      categorySlug: "pet-care",
      tags: ["dogs", "puppies", "first-time-owners"],
      authorName: "Dr. Emma Huisman",
      featuredImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=500&fit=crop",
      titleEn: "5 Tips for a Healthy and Happy Puppy",
      titleNl: "5 Tips voor een Gezonde en Gelukkige Puppy",
      excerptEn: "Bringing home a new puppy is exciting! Learn how to keep your new furry friend healthy and happy with these essential tips.",
      excerptNl: "Een nieuwe puppy thuisbrengen is spannend! Leer hoe je je nieuwe harige vriend gezond en gelukkig houdt met deze essentiële tips.",
      contentEn: `Bringing a new puppy home is one of life's greatest joys. But with this joy comes responsibility. Here are five essential tips to ensure your puppy grows up healthy and happy.

## 1. Establish a Routine Early

Puppies thrive on routine. Set regular times for feeding, walks, play, and sleep. This helps with house training and gives your puppy a sense of security.

## 2. Proper Nutrition is Key

Feed your puppy high-quality puppy food appropriate for their size and breed. Puppies have different nutritional needs than adult dogs. Consult your vet for specific recommendations.

## 3. Socialization is Crucial

Expose your puppy to different people, animals, sounds, and environments during their critical socialization period (3-14 weeks). This helps prevent behavioral issues later in life.

## 4. Start Training Early

Begin basic training as soon as your puppy comes home. Use positive reinforcement methods. Focus on:
- Sit and stay commands
- House training
- Leash walking
- Name recognition

## 5. Regular Vet Check-ups

Schedule regular veterinary visits for vaccinations, deworming, and health checks. Your vet can catch potential issues early and provide guidance on your puppy's development.

Remember, patience and consistency are your best tools. Your puppy wants to please you – make learning fun and rewarding for both of you!`,
      contentNl: `Een nieuwe puppy thuisbrengen is een van de grootste genoegens van het leven. Maar met deze vreugde komt verantwoordelijkheid. Hier zijn vijf essentiële tips om ervoor te zorgen dat je puppy gezond en gelukkig opgroeit.

## 1. Stel Vroeg een Routine In

Puppy's gedijen bij routine. Stel vaste tijden in voor voeding, wandelingen, spelen en slapen. Dit helpt bij zindelijkheidstraining en geeft je puppy een gevoel van veiligheid.

## 2. Goede Voeding is Essentieel

Geef je puppy hoogwaardige puppyvoeding die geschikt is voor hun grootte en ras. Puppy's hebben andere voedingsbehoeften dan volwassen honden. Raadpleeg je dierenarts voor specifieke aanbevelingen.

## 3. Socialisatie is Cruciaal

Stel je puppy bloot aan verschillende mensen, dieren, geluiden en omgevingen tijdens hun kritieke socialisatieperiode (3-14 weken). Dit helpt gedragsproblemen later in het leven te voorkomen.

## 4. Begin Vroeg met Training

Begin met basistraining zodra je puppy thuiskomt. Gebruik positieve bekrachtigingsmethoden. Focus op:
- Zit en blijf commando's
- Zindelijkheidstraining
- Aan de lijn lopen
- Naamsherkenning

## 5. Regelmatige Dierenarts Controles

Plan regelmatige dierenarts bezoeken voor vaccinaties, ontworming en gezondheidscontroles. Je dierenarts kan mogelijke problemen vroeg opsporen en advies geven over de ontwikkeling van je puppy.

Onthoud, geduld en consistentie zijn je beste gereedschappen. Je puppy wil je blij maken – maak leren leuk en lonend voor jullie beiden!`,
      readingTimeMinutes: 5,
      metaTitleEn: "5 Essential Tips for Healthy Puppies | CutiePawsPedia",
      metaTitleNl: "5 Essentiële Tips voor Gezonde Puppy's | CutiePawsPedia",
      metaDescriptionEn: "Learn the 5 essential tips every new puppy owner needs to know for raising a healthy, happy dog. Expert advice from veterinarians.",
      metaDescriptionNl: "Leer de 5 essentiële tips die elke nieuwe puppy-eigenaar moet weten voor het opvoeden van een gezonde, gelukkige hond.",
    },
    {
      slug: "how-to-choose-the-best-groomer",
      categorySlug: "grooming",
      tags: ["dogs", "cats"],
      authorName: "Sophie van der Berg",
      featuredImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=500&fit=crop",
      titleEn: "How to Choose the Best Groomer for Your Pet",
      titleNl: "Hoe Kies je de Beste Trimmer voor je Huisdier",
      excerptEn: "Finding the right groomer is essential for your pet's well-being. Learn what to look for and questions to ask.",
      excerptNl: "Het vinden van de juiste trimmer is essentieel voor het welzijn van je huisdier. Leer waar je op moet letten en welke vragen je moet stellen.",
      contentEn: `Choosing the right groomer for your pet is more important than many pet owners realize. A good groomer does more than just make your pet look good – they contribute to your pet's overall health and well-being.

## What to Look For in a Groomer

### Certification and Experience
Look for groomers who have professional certifications. Ask about their experience with your specific breed.

### Clean and Safe Facility
The grooming salon should be clean, well-ventilated, and have secure areas. Check if they separate small and large dogs.

### Handling Approach
Watch how they interact with animals. A good groomer is patient, gentle, and uses positive handling techniques.

### Reviews and Recommendations
Check online reviews and ask for recommendations from your vet, friends, or local pet community.

## Questions to Ask

- How long have you been grooming?
- Are you experienced with my pet's breed?
- What products do you use?
- How do you handle anxious or difficult pets?
- What's included in the grooming package?
- Do you check for health issues (ear infections, skin problems)?

## Red Flags to Watch For

- Unwillingness to let you see the grooming area
- Rushed or rough handling of animals
- Use of sedation without veterinary oversight
- Lack of cleanliness
- No questions about your pet's health or behavior

Remember, the cheapest option isn't always the best. Your pet deserves a groomer who treats them with care and respect.`,
      contentNl: `Het kiezen van de juiste trimmer voor je huisdier is belangrijker dan veel eigenaren beseffen. Een goede trimmer doet meer dan alleen je huisdier er goed uit laten zien – ze dragen bij aan de algehele gezondheid en het welzijn van je huisdier.

## Waar te Letten bij een Trimmer

### Certificering en Ervaring
Zoek naar trimmers die professionele certificeringen hebben. Vraag naar hun ervaring met jouw specifieke ras.

### Schone en Veilige Faciliteit
De trimsalon moet schoon, goed geventileerd en veilige ruimtes hebben. Check of ze kleine en grote honden scheiden.

### Behandelaanpak
Kijk hoe ze omgaan met dieren. Een goede trimmer is geduldig, zachtaardig en gebruikt positieve behandeltechnieken.

### Reviews en Aanbevelingen
Bekijk online reviews en vraag om aanbevelingen van je dierenarts, vrienden of lokale huisdierengemeenschap.

## Vragen om te Stellen

- Hoe lang trim je al?
- Heb je ervaring met mijn huisdierenras?
- Welke producten gebruik je?
- Hoe ga je om met angstige of moeilijke huisdieren?
- Wat is inbegrepen in het trimpakket?
- Controleer je op gezondheidsproblemen (oorinfecties, huidproblemen)?

## Rode Vlaggen om op te Letten

- Onwilligheid om je de trimruimte te laten zien
- Gehaaste of ruwe behandeling van dieren
- Gebruik van kalmerende middelen zonder toezicht van een dierenarts
- Gebrek aan hygiëne
- Geen vragen over de gezondheid of het gedrag van je huisdier

Onthoud, de goedkoopste optie is niet altijd de beste. Je huisdier verdient een trimmer die hen met zorg en respect behandelt.`,
      readingTimeMinutes: 4,
      metaTitleEn: "How to Choose the Best Pet Groomer | CutiePawsPedia",
      metaTitleNl: "Hoe Kies je de Beste Trimmer | CutiePawsPedia",
      metaDescriptionEn: "Expert guide on choosing the perfect groomer for your pet. Learn what questions to ask and red flags to avoid.",
      metaDescriptionNl: "Expertgids voor het kiezen van de perfecte trimmer voor je huisdier. Leer welke vragen je moet stellen.",
    },
    {
      slug: "summer-safety-tips-for-dogs",
      categorySlug: "health",
      tags: ["dogs", "summer"],
      authorName: "Dr. Jan de Vries",
      featuredImage: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&h=500&fit=crop",
      titleEn: "Summer Safety Tips: Keeping Your Dog Cool and Safe",
      titleNl: "Zomerveiligheidstips: Houd je Hond Koel en Veilig",
      excerptEn: "Hot summer days can be dangerous for dogs. Learn how to protect your furry friend from heatstroke and other summer hazards.",
      excerptNl: "Hete zomerdagen kunnen gevaarlijk zijn voor honden. Leer hoe je je harige vriend beschermt tegen hitteberoerte en andere zomergevaren.",
      contentEn: `Summer is a wonderful time to enjoy the outdoors with your dog, but hot weather brings unique challenges. Here's how to keep your four-legged friend safe during the warm months.

## Recognizing Heat Stroke

Signs of heat stroke in dogs include:
- Excessive panting
- Drooling
- Lethargy or weakness
- Vomiting
- Bright red tongue
- Collapse

If you notice these signs, move your dog to a cool area immediately and contact your vet.

## Prevention Tips

### Never Leave Your Dog in a Car
Even with windows cracked, cars can reach deadly temperatures within minutes. Leave your dog at home if you can't bring them inside with you.

### Adjust Exercise Schedules
Walk your dog in the early morning or late evening when temperatures are cooler. Avoid hot pavement that can burn paw pads.

### Provide Plenty of Water and Shade
Always have fresh, cool water available. Create shaded areas in your yard or bring a portable shade when outdoors.

### Consider Cooling Products
- Cooling mats
- Wet towels
- Kiddie pools for splashing
- Frozen treats

### Know Your Dog's Limits
Some dogs are more susceptible to heat:
- Brachycephalic breeds (pugs, bulldogs)
- Senior dogs
- Puppies
- Overweight dogs
- Dogs with thick coats

## Fun Summer Activities

- Swimming (with supervision)
- Early morning hikes
- Indoor play on hot days
- Frozen Kong toys
- Sprinkler play

Stay safe and enjoy the summer with your best friend!`,
      contentNl: `De zomer is een prachtige tijd om buiten te genieten met je hond, maar warm weer brengt unieke uitdagingen met zich mee. Hier lees je hoe je je viervoeter veilig houdt tijdens de warme maanden.

## Hitteberoerte Herkennen

Tekenen van hitteberoerte bij honden zijn:
- Overmatig hijgen
- Kwijlen
- Lusteloosheid of zwakte
- Braken
- Felrode tong
- In elkaar zakken

Als je deze tekenen opmerkt, breng je hond onmiddellijk naar een koele plek en neem contact op met je dierenarts.

## Preventietips

### Laat je Hond Nooit in een Auto
Zelfs met de ramen op een kiertje kunnen auto's binnen enkele minuten dodelijke temperaturen bereiken. Laat je hond thuis als je hem niet mee naar binnen kunt nemen.

### Pas je Bewegingsschema Aan
Wandel met je hond in de vroege ochtend of late avond wanneer de temperaturen koeler zijn. Vermijd heet asfalt dat pootkussentjes kan verbranden.

### Zorg voor Voldoende Water en Schaduw
Zorg altijd voor vers, koel water. Creëer schaduwrijke plekken in je tuin of neem een draagbare schaduw mee als je buiten bent.

### Overweeg Koelproducten
- Koelmatten
- Natte handdoeken
- Kinderbadje om in te plonzen
- Bevroren traktaties

### Ken de Grenzen van je Hond
Sommige honden zijn gevoeliger voor warmte:
- Brachycefale rassen (mopshonden, bulldogs)
- Oudere honden
- Puppy's
- Honden met overgewicht
- Honden met dikke vacht

## Leuke Zomeractiviteiten

- Zwemmen (onder toezicht)
- Wandelingen in de vroege ochtend
- Binnen spelen op hete dagen
- Bevroren Kong speeltjes
- Spelen met de tuinsproeier

Blijf veilig en geniet van de zomer met je beste vriend!`,
      readingTimeMinutes: 5,
      metaTitleEn: "Summer Safety Tips for Dogs | CutiePawsPedia",
      metaTitleNl: "Zomerveiligheidstips voor Honden | CutiePawsPedia",
      metaDescriptionEn: "Essential summer safety tips to protect your dog from heatstroke and keep them cool during hot weather.",
      metaDescriptionNl: "Essentiële zomerveiligheidstips om je hond te beschermen tegen hitteberoerte en koel te houden bij warm weer.",
    },
    {
      slug: "cat-nutrition-basics",
      categorySlug: "nutrition",
      tags: ["cats", "first-time-owners"],
      authorName: "Dr. Lisa Jansen",
      featuredImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=500&fit=crop",
      titleEn: "Cat Nutrition 101: What Your Feline Really Needs",
      titleNl: "Kattenvoeding 101: Wat je Kat Echt Nodig Heeft",
      excerptEn: "Understanding your cat's nutritional needs is key to their health. Learn what to feed and what to avoid.",
      excerptNl: "Het begrijpen van de voedingsbehoeften van je kat is essentieel voor hun gezondheid. Leer wat te voeren en wat te vermijden.",
      contentEn: `Cats are obligate carnivores, meaning they need nutrients found only in animal products. Understanding their unique nutritional requirements is essential for their health and longevity.

## Essential Nutrients for Cats

### Protein
Cats need high-quality animal protein. Look for foods with meat, fish, or poultry as the first ingredient.

### Taurine
This amino acid is essential for cats and only found in animal tissue. Deficiency can lead to heart problems and blindness.

### Fatty Acids
Omega-3 and omega-6 fatty acids support healthy skin, coat, and brain function.

### Water
Cats have a low thirst drive. Wet food can help ensure adequate hydration.

## Wet Food vs. Dry Food

Both have advantages:

Wet Food:
- Higher moisture content
- More appealing taste for picky eaters
- Easier for older cats to eat

Dry Food:
- Convenient and cost-effective
- Can help with dental health
- Longer shelf life

Many vets recommend a combination of both.

## Foods to Avoid

Never feed your cat:
- Onions and garlic
- Chocolate
- Grapes and raisins
- Raw eggs
- Caffeine
- Alcohol
- Xylitol (artificial sweetener)

## Feeding Tips

- Establish regular feeding times
- Measure portions to prevent obesity
- Use puzzle feeders for mental stimulation
- Provide fresh water daily
- Consider your cat's age, size, and activity level

Consult your veterinarian for personalized nutrition advice for your feline friend.`,
      contentNl: `Katten zijn obligate carnivoren, wat betekent dat ze voedingsstoffen nodig hebben die alleen in dierlijke producten voorkomen. Het begrijpen van hun unieke voedingsbehoeften is essentieel voor hun gezondheid en levensduur.

## Essentiële Voedingsstoffen voor Katten

### Eiwitten
Katten hebben hoogwaardige dierlijke eiwitten nodig. Zoek naar voedsel met vlees, vis of gevogelte als eerste ingrediënt.

### Taurine
Dit aminozuur is essentieel voor katten en komt alleen voor in dierlijk weefsel. Tekort kan leiden tot hartproblemen en blindheid.

### Vetzuren
Omega-3 en omega-6 vetzuren ondersteunen een gezonde huid, vacht en hersenfunctie.

### Water
Katten hebben een lage dorstdrift. Natvoer kan helpen zorgen voor voldoende hydratatie.

## Natvoer vs. Droogvoer

Beide hebben voordelen:

Natvoer:
- Hoger vochtgehalte
- Aantrekkelijkere smaak voor kieskeurige eters
- Makkelijker te eten voor oudere katten

Droogvoer:
- Handig en kosteneffectief
- Kan helpen bij tandgezondheid
- Langere houdbaarheid

Veel dierenartsen bevelen een combinatie van beide aan.

## Voedsel om te Vermijden

Geef je kat nooit:
- Uien en knoflook
- Chocolade
- Druiven en rozijnen
- Rauwe eieren
- Cafeïne
- Alcohol
- Xylitol (kunstmatige zoetstof)

## Voedingstips

- Stel vaste voedertijden in
- Meet porties om obesitas te voorkomen
- Gebruik puzzelvoeders voor mentale stimulatie
- Zorg dagelijks voor vers water
- Houd rekening met de leeftijd, grootte en activiteitsniveau van je kat

Raadpleeg je dierenarts voor persoonlijk voedingsadvies voor je kattenvriendje.`,
      readingTimeMinutes: 4,
      metaTitleEn: "Cat Nutrition Guide: What to Feed Your Cat | CutiePawsPedia",
      metaTitleNl: "Kattenvoedingsgids: Wat te Voeren | CutiePawsPedia",
      metaDescriptionEn: "Complete guide to cat nutrition. Learn about essential nutrients, wet vs dry food, and foods to avoid.",
      metaDescriptionNl: "Complete gids voor kattenvoeding. Leer over essentiële voedingsstoffen, nat vs droogvoer, en te vermijden voedsel.",
    },
    {
      slug: "training-your-dog-basic-commands",
      categorySlug: "training",
      tags: ["dogs", "puppies", "first-time-owners"],
      authorName: "Mark de Groot",
      featuredImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=500&fit=crop",
      titleEn: "Dog Training 101: Essential Commands Every Dog Should Know",
      titleNl: "Hondentraining 101: Essentiële Commando's die Elke Hond Moet Kennen",
      excerptEn: "Master the basics of dog training with these essential commands. Build a strong foundation for a well-behaved companion.",
      excerptNl: "Beheers de basis van hondentraining met deze essentiële commando's. Bouw een sterke basis voor een braaf maatje.",
      contentEn: `Training your dog is one of the most rewarding experiences you can share. Not only does it create a well-behaved companion, but it also strengthens your bond.

## The Golden Rules of Training

- Be consistent with commands and rewards
- Keep training sessions short (5-10 minutes)
- Always end on a positive note
- Use high-value treats
- Practice patience – every dog learns at their own pace

## Essential Commands

### 1. Sit
The foundation of all training:
- Hold a treat above your dog's nose
- Move it back over their head
- As they look up, their bottom naturally lowers
- Say "sit" and give the treat

### 2. Stay
Builds impulse control:
- Have your dog sit
- Open your palm and say "stay"
- Take one step back
- Return and reward if they stayed
- Gradually increase distance and duration

### 3. Come (Recall)
The most important safety command:
- Start in a small, enclosed area
- Say your dog's name followed by "come"
- Reward enthusiastically when they arrive
- Never punish a dog for coming to you

### 4. Down
Teaches calm behavior:
- Start from a sitting position
- Hold a treat in front of their nose
- Lower it to the ground
- Say "down" when they lie down

### 5. Leave It
Prevents picking up dangerous items:
- Show your dog a treat in your closed hand
- Say "leave it"
- Wait until they stop trying to get it
- Reward with a different treat from your other hand

## Common Mistakes to Avoid

- Repeating commands multiple times
- Training when frustrated
- Inconsistent rules
- Punishing instead of redirecting
- Skipping socialization

Remember, positive reinforcement is the most effective training method. Celebrate small victories and enjoy the journey!`,
      contentNl: `Je hond trainen is een van de meest lonende ervaringen die je kunt delen. Het creëert niet alleen een braaf maatje, maar versterkt ook jullie band.

## De Gouden Regels van Training

- Wees consistent met commando's en beloningen
- Houd trainingssessies kort (5-10 minuten)
- Eindig altijd positief
- Gebruik waardevolle snoepjes
- Oefen geduld – elke hond leert in zijn eigen tempo

## Essentiële Commando's

### 1. Zit
De basis van alle training:
- Houd een snoepje boven de neus van je hond
- Beweeg het naar achteren over zijn hoofd
- Als ze omhoog kijken, zakt hun achterwerk vanzelf
- Zeg "zit" en geef het snoepje

### 2. Blijf
Bouwt impulscontrole:
- Laat je hond zitten
- Open je handpalm en zeg "blijf"
- Neem één stap naar achteren
- Keer terug en beloon als ze bleven zitten
- Verhoog geleidelijk afstand en duur

### 3. Hier (Terugroepen)
Het belangrijkste veiligheidscommando:
- Begin in een kleine, afgesloten ruimte
- Zeg de naam van je hond gevolgd door "hier"
- Beloon enthousiast wanneer ze aankomen
- Straf nooit een hond die naar je toekomt

### 4. Af/Liggen
Leert rustig gedrag:
- Begin vanuit een zittende positie
- Houd een snoepje voor hun neus
- Laat het zakken naar de grond
- Zeg "af" wanneer ze gaan liggen

### 5. Laat Liggen/Afblijven
Voorkomt het oppakken van gevaarlijke voorwerpen:
- Laat je hond een snoepje zien in je gesloten hand
- Zeg "afblijven"
- Wacht tot ze stoppen met proberen het te pakken
- Beloon met een ander snoepje uit je andere hand

## Veelvoorkomende Fouten om te Vermijden

- Commando's meerdere keren herhalen
- Trainen wanneer je gefrustreerd bent
- Inconsistente regels
- Straffen in plaats van omleiden
- Socialisatie overslaan

Onthoud, positieve bekrachtiging is de meest effectieve trainingsmethode. Vier kleine overwinningen en geniet van de reis!`,
      readingTimeMinutes: 6,
      metaTitleEn: "Dog Training 101: Basic Commands Guide | CutiePawsPedia",
      metaTitleNl: "Hondentraining 101: Basis Commando's Gids | CutiePawsPedia",
      metaDescriptionEn: "Learn essential dog training commands with our step-by-step guide. Master sit, stay, come, and more.",
      metaDescriptionNl: "Leer essentiële hondentrainingscommando's met onze stapsgewijze gids. Beheers zit, blijf, hier en meer.",
    },
  ];

  for (const post of posts) {
    const categoryId = catMap.get(post.categorySlug);

    // Insert or update the post
    const insertedPost = await sql`
      INSERT INTO blog_posts (
        slug, category_id, author_name, featured_image,
        title_en, title_nl, excerpt_en, excerpt_nl, content_en, content_nl,
        meta_title_en, meta_title_nl, meta_description_en, meta_description_nl,
        reading_time_minutes, status, published_at
      )
      VALUES (
        ${post.slug}, ${categoryId}, ${post.authorName}, ${post.featuredImage},
        ${post.titleEn}, ${post.titleNl}, ${post.excerptEn}, ${post.excerptNl},
        ${post.contentEn}, ${post.contentNl},
        ${post.metaTitleEn}, ${post.metaTitleNl}, ${post.metaDescriptionEn}, ${post.metaDescriptionNl},
        ${post.readingTimeMinutes}, 'published', NOW()
      )
      ON CONFLICT (slug) DO UPDATE SET
        category_id = EXCLUDED.category_id,
        author_name = EXCLUDED.author_name,
        featured_image = EXCLUDED.featured_image,
        title_en = EXCLUDED.title_en,
        title_nl = EXCLUDED.title_nl,
        excerpt_en = EXCLUDED.excerpt_en,
        excerpt_nl = EXCLUDED.excerpt_nl,
        content_en = EXCLUDED.content_en,
        content_nl = EXCLUDED.content_nl,
        meta_title_en = EXCLUDED.meta_title_en,
        meta_title_nl = EXCLUDED.meta_title_nl,
        meta_description_en = EXCLUDED.meta_description_en,
        meta_description_nl = EXCLUDED.meta_description_nl,
        reading_time_minutes = EXCLUDED.reading_time_minutes,
        updated_at = NOW()
      RETURNING id
    `;

    const postId = insertedPost[0]?.id;

    // Add tags
    if (postId) {
      // Remove existing tags
      await sql`DELETE FROM blog_post_tags WHERE post_id = ${postId}`;

      // Add new tags
      for (const tagSlug of post.tags) {
        const tagId = tagMap.get(tagSlug);
        if (tagId) {
          await sql`
            INSERT INTO blog_post_tags (post_id, tag_id)
            VALUES (${postId}, ${tagId})
            ON CONFLICT DO NOTHING
          `;
        }
      }
    }

    console.log(`  ✅ Created post: "${post.titleEn}"`);
  }

  // Update tag post counts
  console.log("Updating tag post counts...");
  await sql`
    UPDATE blog_tags
    SET post_count = (
      SELECT COUNT(*) FROM blog_post_tags WHERE blog_post_tags.tag_id = blog_tags.id
    )
  `;

  console.log("\n🎉 Blog seeding complete!");
  console.log(`   - ${categories.length} categories`);
  console.log(`   - ${tags.length} tags`);
  console.log(`   - ${posts.length} blog posts`);
}

main().catch(console.error);

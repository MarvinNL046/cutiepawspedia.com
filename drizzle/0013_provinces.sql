-- Migration: Add provinces/states/regions table
-- This adds an administrative level between countries and cities

-- Create provinces table
CREATE TABLE IF NOT EXISTS "provinces" (
  "id" serial PRIMARY KEY NOT NULL,
  "country_id" integer NOT NULL,
  "slug" varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL,
  "code" varchar(10),
  "lat" numeric(10, 7),
  "lng" numeric(10, 7),
  "description" text,
  "city_count" integer DEFAULT 0 NOT NULL,
  "place_count" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "provinces_country_fk" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE
);

-- Add indexes
CREATE INDEX IF NOT EXISTS "provinces_country_id_idx" ON "provinces" ("country_id");
CREATE INDEX IF NOT EXISTS "provinces_slug_country_idx" ON "provinces" ("slug", "country_id");

-- Add province_id to cities table (optional foreign key)
ALTER TABLE "cities" ADD COLUMN IF NOT EXISTS "province_id" integer;
ALTER TABLE "cities" ADD CONSTRAINT "cities_province_fk" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS "cities_province_id_idx" ON "cities" ("province_id");

-- Insert Netherlands provinces
INSERT INTO "provinces" ("country_id", "slug", "name", "code", "lat", "lng") VALUES
  ((SELECT id FROM countries WHERE code = 'NL'), 'noord-holland', 'Noord-Holland', 'NH', 52.5206, 4.7885),
  ((SELECT id FROM countries WHERE code = 'NL'), 'zuid-holland', 'Zuid-Holland', 'ZH', 51.9851, 4.4966),
  ((SELECT id FROM countries WHERE code = 'NL'), 'utrecht', 'Utrecht', 'UT', 52.0907, 5.1214),
  ((SELECT id FROM countries WHERE code = 'NL'), 'noord-brabant', 'Noord-Brabant', 'NB', 51.5719, 5.0913),
  ((SELECT id FROM countries WHERE code = 'NL'), 'gelderland', 'Gelderland', 'GE', 52.0450, 5.8719),
  ((SELECT id FROM countries WHERE code = 'NL'), 'overijssel', 'Overijssel', 'OV', 52.4388, 6.5016),
  ((SELECT id FROM countries WHERE code = 'NL'), 'limburg', 'Limburg', 'LI', 51.4427, 6.0609),
  ((SELECT id FROM countries WHERE code = 'NL'), 'friesland', 'Friesland', 'FR', 53.1642, 5.7817),
  ((SELECT id FROM countries WHERE code = 'NL'), 'groningen', 'Groningen', 'GR', 53.2194, 6.5665),
  ((SELECT id FROM countries WHERE code = 'NL'), 'drenthe', 'Drenthe', 'DR', 52.9476, 6.6231),
  ((SELECT id FROM countries WHERE code = 'NL'), 'flevoland', 'Flevoland', 'FL', 52.5271, 5.5953),
  ((SELECT id FROM countries WHERE code = 'NL'), 'zeeland', 'Zeeland', 'ZE', 51.4940, 3.8497)
ON CONFLICT DO NOTHING;

-- Insert Belgium provinces
INSERT INTO "provinces" ("country_id", "slug", "name", "code", "lat", "lng") VALUES
  ((SELECT id FROM countries WHERE code = 'BE'), 'antwerpen', 'Antwerpen', 'VAN', 51.2194, 4.4025),
  ((SELECT id FROM countries WHERE code = 'BE'), 'oost-vlaanderen', 'Oost-Vlaanderen', 'VOV', 51.0543, 3.7174),
  ((SELECT id FROM countries WHERE code = 'BE'), 'west-vlaanderen', 'West-Vlaanderen', 'VWV', 51.0536, 3.0822),
  ((SELECT id FROM countries WHERE code = 'BE'), 'limburg', 'Limburg', 'VLI', 50.9305, 5.3325),
  ((SELECT id FROM countries WHERE code = 'BE'), 'vlaams-brabant', 'Vlaams-Brabant', 'VBR', 50.8878, 4.5624),
  ((SELECT id FROM countries WHERE code = 'BE'), 'brussels', 'Brussels', 'BRU', 50.8503, 4.3517),
  ((SELECT id FROM countries WHERE code = 'BE'), 'brabant-wallon', 'Brabant Wallon', 'WBR', 50.6330, 4.5303),
  ((SELECT id FROM countries WHERE code = 'BE'), 'hainaut', 'Hainaut', 'WHT', 50.4542, 4.0521),
  ((SELECT id FROM countries WHERE code = 'BE'), 'liege', 'Liège', 'WLG', 50.6326, 5.5797),
  ((SELECT id FROM countries WHERE code = 'BE'), 'luxembourg', 'Luxembourg', 'WLX', 49.8153, 5.4189),
  ((SELECT id FROM countries WHERE code = 'BE'), 'namur', 'Namur', 'WNA', 50.4673, 4.8719)
ON CONFLICT DO NOTHING;

-- Insert Germany states (Bundesländer)
INSERT INTO "provinces" ("country_id", "slug", "name", "code", "lat", "lng") VALUES
  ((SELECT id FROM countries WHERE code = 'DE'), 'bayern', 'Bayern', 'BY', 48.7904, 11.4979),
  ((SELECT id FROM countries WHERE code = 'DE'), 'baden-wurttemberg', 'Baden-Württemberg', 'BW', 48.6616, 9.3501),
  ((SELECT id FROM countries WHERE code = 'DE'), 'berlin', 'Berlin', 'BE', 52.5200, 13.4050),
  ((SELECT id FROM countries WHERE code = 'DE'), 'brandenburg', 'Brandenburg', 'BB', 52.4125, 12.5316),
  ((SELECT id FROM countries WHERE code = 'DE'), 'bremen', 'Bremen', 'HB', 53.0793, 8.8017),
  ((SELECT id FROM countries WHERE code = 'DE'), 'hamburg', 'Hamburg', 'HH', 53.5511, 9.9937),
  ((SELECT id FROM countries WHERE code = 'DE'), 'hessen', 'Hessen', 'HE', 50.6521, 9.1624),
  ((SELECT id FROM countries WHERE code = 'DE'), 'mecklenburg-vorpommern', 'Mecklenburg-Vorpommern', 'MV', 53.6127, 12.4296),
  ((SELECT id FROM countries WHERE code = 'DE'), 'niedersachsen', 'Niedersachsen', 'NI', 52.6367, 9.8451),
  ((SELECT id FROM countries WHERE code = 'DE'), 'nordrhein-westfalen', 'Nordrhein-Westfalen', 'NW', 51.4332, 7.6616),
  ((SELECT id FROM countries WHERE code = 'DE'), 'rheinland-pfalz', 'Rheinland-Pfalz', 'RP', 49.9129, 7.4500),
  ((SELECT id FROM countries WHERE code = 'DE'), 'saarland', 'Saarland', 'SL', 49.3964, 7.0230),
  ((SELECT id FROM countries WHERE code = 'DE'), 'sachsen', 'Sachsen', 'SN', 51.1045, 13.2017),
  ((SELECT id FROM countries WHERE code = 'DE'), 'sachsen-anhalt', 'Sachsen-Anhalt', 'ST', 51.9503, 11.6923),
  ((SELECT id FROM countries WHERE code = 'DE'), 'schleswig-holstein', 'Schleswig-Holstein', 'SH', 54.2194, 9.6961),
  ((SELECT id FROM countries WHERE code = 'DE'), 'thuringen', 'Thüringen', 'TH', 50.9848, 11.0299)
ON CONFLICT DO NOTHING;

-- Update existing cities with their province_id
-- Netherlands
UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'noord-holland' AND country_id = cities.country_id)
WHERE slug IN ('amsterdam', 'haarlem', 'zaandam', 'hilversum', 'alkmaar') AND country_id = (SELECT id FROM countries WHERE code = 'NL');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'zuid-holland' AND country_id = cities.country_id)
WHERE slug IN ('rotterdam', 'den-haag', 'leiden', 'delft', 'dordrecht', 'gouda', 'zoetermeer') AND country_id = (SELECT id FROM countries WHERE code = 'NL');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'utrecht' AND country_id = cities.country_id)
WHERE slug IN ('utrecht', 'amersfoort', 'zeist', 'nieuwegein') AND country_id = (SELECT id FROM countries WHERE code = 'NL');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'noord-brabant' AND country_id = cities.country_id)
WHERE slug IN ('eindhoven', 'tilburg', 'breda', 'den-bosch', 's-hertogenbosch', 'helmond') AND country_id = (SELECT id FROM countries WHERE code = 'NL');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'gelderland' AND country_id = cities.country_id)
WHERE slug IN ('arnhem', 'nijmegen', 'apeldoorn', 'ede') AND country_id = (SELECT id FROM countries WHERE code = 'NL');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'overijssel' AND country_id = cities.country_id)
WHERE slug IN ('zwolle', 'enschede', 'almelo', 'deventer') AND country_id = (SELECT id FROM countries WHERE code = 'NL');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'limburg' AND country_id = cities.country_id)
WHERE slug IN ('maastricht', 'venlo', 'heerlen', 'roermond', 'sittard') AND country_id = (SELECT id FROM countries WHERE code = 'NL');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'friesland' AND country_id = cities.country_id)
WHERE slug IN ('leeuwarden', 'sneek', 'drachten') AND country_id = (SELECT id FROM countries WHERE code = 'NL');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'groningen' AND country_id = cities.country_id)
WHERE slug IN ('groningen') AND country_id = (SELECT id FROM countries WHERE code = 'NL');

-- Belgium
UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'antwerpen' AND country_id = cities.country_id)
WHERE slug IN ('antwerpen', 'mechelen', 'turnhout') AND country_id = (SELECT id FROM countries WHERE code = 'BE');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'oost-vlaanderen' AND country_id = cities.country_id)
WHERE slug IN ('gent', 'aalst', 'dendermonde') AND country_id = (SELECT id FROM countries WHERE code = 'BE');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'brussels' AND country_id = cities.country_id)
WHERE slug IN ('brussel', 'brussels', 'bruxelles') AND country_id = (SELECT id FROM countries WHERE code = 'BE');

-- Germany
UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'bayern' AND country_id = cities.country_id)
WHERE slug IN ('munchen', 'muenchen', 'munich', 'nurnberg', 'nuernberg', 'augsburg', 'regensburg') AND country_id = (SELECT id FROM countries WHERE code = 'DE');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'berlin' AND country_id = cities.country_id)
WHERE slug IN ('berlin') AND country_id = (SELECT id FROM countries WHERE code = 'DE');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'hamburg' AND country_id = cities.country_id)
WHERE slug IN ('hamburg') AND country_id = (SELECT id FROM countries WHERE code = 'DE');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'nordrhein-westfalen' AND country_id = cities.country_id)
WHERE slug IN ('koln', 'koeln', 'cologne', 'dusseldorf', 'duesseldorf', 'dortmund', 'essen', 'duisburg', 'bochum', 'wuppertal', 'bonn', 'munster', 'muenster') AND country_id = (SELECT id FROM countries WHERE code = 'DE');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'baden-wurttemberg' AND country_id = cities.country_id)
WHERE slug IN ('stuttgart', 'mannheim', 'karlsruhe', 'freiburg', 'heidelberg', 'ulm') AND country_id = (SELECT id FROM countries WHERE code = 'DE');

UPDATE cities SET province_id = (SELECT id FROM provinces WHERE slug = 'hessen' AND country_id = cities.country_id)
WHERE slug IN ('frankfurt', 'wiesbaden', 'kassel', 'darmstadt') AND country_id = (SELECT id FROM countries WHERE code = 'DE');

-- Update province city/place counts
UPDATE provinces SET
  city_count = (SELECT COUNT(*) FROM cities WHERE cities.province_id = provinces.id),
  place_count = (SELECT COUNT(*) FROM places JOIN cities ON places.city_id = cities.id WHERE cities.province_id = provinces.id);

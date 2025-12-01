-- Add full-text search capabilities to the database
-- Run this migration manually: psql $DATABASE_URL -f db/migrations/001_add_search_indexes.sql

-- Enable pg_trgm extension for trigram similarity search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add search_vector column to places table
ALTER TABLE places ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create function to update search vector
CREATE OR REPLACE FUNCTION places_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.address, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update search vector
DROP TRIGGER IF EXISTS places_search_vector_trigger ON places;
CREATE TRIGGER places_search_vector_trigger
  BEFORE INSERT OR UPDATE ON places
  FOR EACH ROW
  EXECUTE FUNCTION places_search_vector_update();

-- Update existing rows
UPDATE places SET search_vector =
  setweight(to_tsvector('english', COALESCE(name, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(description, '')), 'B') ||
  setweight(to_tsvector('english', COALESCE(address, '')), 'C');

-- Create GIN index on search_vector for fast full-text search
CREATE INDEX IF NOT EXISTS idx_places_search_vector ON places USING GIN(search_vector);

-- Create trigram indexes for fuzzy search / autocomplete
CREATE INDEX IF NOT EXISTS idx_places_name_trgm ON places USING GIN(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_cities_name_trgm ON cities USING GIN(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_categories_label_trgm ON categories USING GIN(label_key gin_trgm_ops);

-- Create composite index for common query patterns
CREATE INDEX IF NOT EXISTS idx_places_city_rating ON places(city_id, avg_rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_places_city_premium ON places(city_id, is_premium DESC, avg_rating DESC NULLS LAST);

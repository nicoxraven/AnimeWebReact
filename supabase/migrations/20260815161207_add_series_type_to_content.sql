ALTER TABLE content DROP CONSTRAINT IF EXISTS content_type_check;
ALTER TABLE content ADD CONSTRAINT content_type_check CHECK (type IN ('movie', 'series', 'manga', 'news'));

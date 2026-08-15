/*
# Create profiles and content tables for KamiStream

## Overview
Sets up the database schema for user profiles (with roles and subscription status)
and content created in the Creator Studio. Seeds default admin and creator accounts.

## New Tables

### 1. profiles
Stores user profile information for the KamiStream community.
- `id` (uuid, primary key) — unique user identifier
- `name` (text, not null) — display name
- `handle` (text, not null, unique) — username handle
- `email` (text, not null, unique) — email address
- `phone` (text) — KPay phone number
- `avatar` (text) — avatar image path
- `role` (text, not null, default 'free') — one of: free, premium, creator, admin
- `subscription` (text, not null, default 'inactive') — one of: active, inactive, pending
- `joined` (text) — join date label
- `created_at` (timestamptz, default now())

### 2. content
Stores content created in the Creator Studio (movies, manga, news).
- `id` (uuid, primary key)
- `title` (text, not null) — content title
- `type` (text, not null) — movie, manga, or news
- `synopsis` (text) — description/synopsis
- `cover` (text) — cover image path
- `genres` (text[]) — genre tags
- `author_id` (uuid, references profiles) — creator who made it
- `author_name` (text) — denormalized author name
- `status` (text, not null, default 'draft') — draft, published, archived
- `source` (text, not null, default 'ai') — ai or editor
- `premium` (boolean, default false) — is this premium content
- `created_at` (timestamptz, default now())

## Security
- RLS enabled on both tables.
- Both tables allow anon + authenticated CRUD since this is a prototype
  with simulated social auth (Google/TikTok). The admin page manages
  profiles directly through the anon-key client.

## Seeded Data
- 1 admin account: Aya Kurosawa (admin role)
- 1 creator account: Kenji Aoi (creator role)
- 4 additional sample users (premium, free, etc.)
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  handle text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  phone text DEFAULT '—',
  avatar text DEFAULT '/placeholder.svg',
  role text NOT NULL DEFAULT 'free' CHECK (role IN ('free', 'premium', 'creator', 'admin')),
  subscription text NOT NULL DEFAULT 'inactive' CHECK (subscription IN ('active', 'inactive', 'pending')),
  joined text DEFAULT 'Just now',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_profiles" ON profiles;
CREATE POLICY "anon_select_profiles" ON profiles FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_profiles" ON profiles;
CREATE POLICY "anon_insert_profiles" ON profiles FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_profiles" ON profiles;
CREATE POLICY "anon_update_profiles" ON profiles FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_profiles" ON profiles;
CREATE POLICY "anon_delete_profiles" ON profiles FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('movie', 'manga', 'news')),
  synopsis text,
  cover text DEFAULT '/placeholder.svg',
  genres text[] DEFAULT '{}',
  author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  author_name text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  source text NOT NULL DEFAULT 'ai' CHECK (source IN ('ai', 'editor')),
  premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_content" ON content;
CREATE POLICY "anon_select_content" ON content FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_content" ON content;
CREATE POLICY "anon_insert_content" ON content FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_content" ON content;
CREATE POLICY "anon_update_content" ON content FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_content" ON content;
CREATE POLICY "anon_delete_content" ON content FOR DELETE
  TO anon, authenticated USING (true);

INSERT INTO profiles (name, handle, email, phone, avatar, role, subscription, joined)
VALUES
  ('Aya Kurosawa', 'aya.k', 'aya@kamistream.io', '09-7712-4408', '/anime/cover-spirit.png', 'admin', 'active', 'Jan 2024'),
  ('Kenji Aoi', 'kenji.creates', 'kenji@kamistream.io', '09-4420-1187', '/anime/cover-blade.png', 'creator', 'active', 'Mar 2024'),
  ('Yuki Tanaka', 'Yuki_92', 'yuki92@mail.com', '09-9981-3320', '/anime/cover-academy.png', 'premium', 'active', 'Jun 2024'),
  ('Min Thura', 'ramen_lord', 'ramen@mail.com', '09-2245-6690', '/anime/cover-mecha.png', 'free', 'inactive', 'Nov 2024'),
  ('Su Su Hlaing', 'prism.fan', 'susu@mail.com', '09-6634-0091', '/anime/cover-void.png', 'premium', 'pending', 'Feb 2026'),
  ('Zaw Lin', 'mechahead', 'zaw@mail.com', '09-3390-7745', '/anime/cover-celestial.png', 'free', 'inactive', 'Apr 2026')
ON CONFLICT (email) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_content_author ON content(author_id);
CREATE INDEX IF NOT EXISTS idx_content_status ON content(status);

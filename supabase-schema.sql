-- ============================================
-- International Eye Hospital - Supabase Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- EYE CONDITIONS
-- ============================================
CREATE TABLE IF NOT EXISTS eye_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  overview TEXT NOT NULL,
  symptoms TEXT[] NOT NULL DEFAULT '{}',
  causes TEXT[] NOT NULL DEFAULT '{}',
  treatments TEXT[] NOT NULL DEFAULT '{}',
  when_to_see_doctor TEXT NOT NULL,
  swahili_overview TEXT NOT NULL DEFAULT '',
  swahili_symptoms TEXT[] NOT NULL DEFAULT '{}',
  swahili_causes TEXT[] NOT NULL DEFAULT '{}',
  swahili_treatments TEXT[] NOT NULL DEFAULT '{}',
  swahili_when_to_see_doctor TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  read_time TEXT,
  published_date DATE,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DOCTORS
-- ============================================
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialty TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  education TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SERVICES
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  full_content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GALLERY IMAGES
-- ============================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SITE SETTINGS
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE eye_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read published content
CREATE POLICY "Allow public read eye_conditions" ON eye_conditions
  FOR SELECT USING (is_published = true);

CREATE POLICY "Allow public read blog_posts" ON blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Allow public read doctors" ON doctors
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read services" ON services
  FOR SELECT USING (is_published = true);

CREATE POLICY "Allow public read testimonials" ON testimonials
  FOR SELECT USING (is_published = true);

CREATE POLICY "Allow public read gallery_images" ON gallery_images
  FOR SELECT USING (is_published = true);

CREATE POLICY "Allow public read site_settings" ON site_settings
  FOR SELECT TO authenticated, anon USING (true);

-- Only authenticated admin users can modify (we'll check admin role in app logic)
CREATE POLICY "Allow admin all eye_conditions" ON eye_conditions
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin all blog_posts" ON blog_posts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin all doctors" ON doctors
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin all services" ON services
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin all testimonials" ON testimonials
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin all gallery_images" ON gallery_images
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin all site_settings" ON site_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================
-- FUNCTIONS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DO $$
BEGIN
  CREATE TRIGGER update_eye_conditions_updated_at BEFORE UPDATE ON eye_conditions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- SEED DEFAULT SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value, description) VALUES
  ('site_name', 'International Eye Hospital', 'Website name'),
  ('site_phone', '+255 784 104 300', 'Primary contact phone'),
  ('site_email', 'info@eye.co.tz', 'Primary contact email'),
  ('site_address', 'Tropical Center, New Bagamoyo Road, Dar es Salaam, Tanzania', 'Physical address'),
  ('working_hours_weekday', '8:30 AM – 5:30 PM', 'Weekday working hours'),
  ('working_hours_saturday', '8:30 AM – 5:30 PM', 'Saturday working hours'),
  ('working_hours_sunday', 'Closed', 'Sunday working hours')
ON CONFLICT (key) DO NOTHING;

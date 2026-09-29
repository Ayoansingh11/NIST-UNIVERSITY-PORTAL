-- ==========================================================
-- NIST UNIVERSITY DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ==========================================================

-- Enable pgcrypto for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. ADMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  dob TEXT NOT NULL,
  gender TEXT NOT NULL,
  course TEXT NOT NULL,
  qualification TEXT NOT NULL,
  percentage TEXT NOT NULL,
  passing_year TEXT NOT NULL,
  hobbies TEXT[] DEFAULT '{}',
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  photo_url TEXT,
  document_url TEXT,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admissions_course ON public.admissions(course);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON public.admissions(status);
CREATE INDEX IF NOT EXISTS idx_admissions_app_num ON public.admissions(application_number);

-- 2. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Read', 'Replied', 'Closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_messages(status);

-- 3. CAREER JOBS TABLE
CREATE TABLE IF NOT EXISTS public.career_jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'NIST Campus',
  employment_type TEXT NOT NULL DEFAULT 'Full-Time',
  experience TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT[] DEFAULT '{}',
  requirements TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. CAREER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id TEXT NOT NULL,
  job_title TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  qualification TEXT NOT NULL,
  experience TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Reviewing', 'Shortlisted', 'Interview', 'Selected', 'Rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_career_apps_job_id ON public.career_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_career_apps_status ON public.career_applications(status);

-- 5. NOTICES TABLE
CREATE TABLE IF NOT EXISTS public.notices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('General', 'Admissions', 'Examination', 'Events', 'Recruitment')),
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  attachment TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notices_category ON public.notices(category);
CREATE INDEX IF NOT EXISTS idx_notices_published ON public.notices(published);

-- 6. FACULTY TABLE
CREATE TABLE IF NOT EXISTS public.faculty (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  designation TEXT NOT NULL,
  experience TEXT NOT NULL,
  email TEXT,
  specialization TEXT,
  image_url TEXT
);

-- 7. FACILITIES TABLE
CREATE TABLE IF NOT EXISTS public.facilities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  features TEXT[] DEFAULT '{}'
);

-- 8. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Campus', 'Events', 'Students', 'Laboratories', 'Sports', 'Cultural Events')),
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Admin data is accessed only through the server-side service-role client after session checks.
-- Public roles may submit forms, but cannot read or modify existing submissions.
DROP POLICY IF EXISTS "Allow public insert to admissions" ON public.admissions;
DROP POLICY IF EXISTS "Allow authenticated full access to admissions" ON public.admissions;
CREATE POLICY "Allow public insert to admissions" ON public.admissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Contact messages: Anyone can insert. Only authenticated admins can select/update/delete.
DROP POLICY IF EXISTS "Allow public insert to contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated full access to contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert to contact_messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Career applications: Anyone can insert. Only authenticated admins can select/update/delete.
DROP POLICY IF EXISTS "Allow public insert to career_applications" ON public.career_applications;
DROP POLICY IF EXISTS "Allow authenticated full access to career_applications" ON public.career_applications;
CREATE POLICY "Allow public insert to career_applications" ON public.career_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Public readable tables:
DROP POLICY IF EXISTS "Allow authenticated full access to jobs" ON public.career_jobs;
DROP POLICY IF EXISTS "Allow public select active jobs" ON public.career_jobs;
CREATE POLICY "Allow public select active jobs" ON public.career_jobs FOR SELECT TO anon, authenticated USING (active = true);

DROP POLICY IF EXISTS "Allow authenticated full access to notices" ON public.notices;
DROP POLICY IF EXISTS "Allow public select published notices" ON public.notices;
CREATE POLICY "Allow public select published notices" ON public.notices FOR SELECT TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "Allow authenticated full access to faculty" ON public.faculty;
DROP POLICY IF EXISTS "Allow public select faculty" ON public.faculty;
CREATE POLICY "Allow public select faculty" ON public.faculty FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated full access to facilities" ON public.facilities;
DROP POLICY IF EXISTS "Allow public select facilities" ON public.facilities;
CREATE POLICY "Allow public select facilities" ON public.facilities FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated full access to gallery" ON public.gallery_items;
DROP POLICY IF EXISTS "Allow public select gallery" ON public.gallery_items;
CREATE POLICY "Allow public select gallery" ON public.gallery_items FOR SELECT TO anon, authenticated USING (true);

-- ==========================================================
-- STORAGE BUCKETS SETUP
-- ==========================================================
-- Insert buckets into storage.buckets if using Supabase Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('admissions', 'admissions', false)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

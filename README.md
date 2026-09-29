# NIST UNIVERSITY — Official Web Portal

> **"Engineering Excellence. Inspiring Innovation. Shaping the Future."**

A Next.js university portal with admissions and inquiry workflows, academic program pages, faculty and facilities directories, careers, gallery, notices, and an administration console. University facts and contact details still require official verification before launch.

---

## 🏛️ Project Information & Credits

* **Designed & Developed by:** **Aradhana Satapathy**
* **Roll No:** **202321248**

---

## 🚀 Tech Stack

* **Frontend & Server Framework:** Next.js (App Router, Turbopack, React 19)
* **Language:** TypeScript
* **Styling & Design System:** Tailwind CSS v4, Glassmorphism, CSS Custom Properties
* **Iconography:** Lucide Icons
* **Database & Auth:**
  * **Primary:** Supabase (PostgreSQL, Row Level Security, Supabase Storage)
  * **Local development only:** persistent JSON datastore (`.data/db.json`)
* **File Uploads:** Supabase Storage in production; local files in `.data/uploads/` during development. Applicant files are private and admin-gated.

---

## 📁 Folder Structure

```
aradhna dii/
├── app/
│   ├── page.tsx                      # Homepage with cinematic hero & campus showcases
│   ├── layout.tsx                    # Root Layout with SEO metadata, Navbar & Footer
│   ├── globals.css                   # Theme variables, glassmorphism, animations
│   ├── about/page.tsx                # History, Mission, Vision, Core Values, Leadership
│   ├── academics/
│   │   ├── page.tsx                  # Academic programs overview
│   │   ├── cse/page.tsx              # B.Tech Computer Science & Engineering
│   │   ├── ece/page.tsx              # B.Tech Electronics & Communication Engineering
│   │   ├── eee/page.tsx              # B.Tech Electrical & Electronics Engineering
│   │   └── mca/page.tsx              # Master of Computer Applications
│   ├── faculty/page.tsx              # Faculty directory (Card View + Table View)
│   ├── facilities/page.tsx           # Campus facilities (Labs, Library, Smart Class, Hostel, Sports)
│   ├── admissions/
│   │   ├── page.tsx                  # Admissions guidance, dates, FAQs
│   │   ├── apply/page.tsx            # Full functional Online Admission Application Form
│   │   └── success/page.tsx          # Submission acknowledgment, unique application ID, print slip
│   ├── careers/
│   │   ├── page.tsx                  # Faculty & staff vacancies listing
│   │   └── [id]/apply/page.tsx       # Job application with CV/Resume upload
│   ├── contact/page.tsx              # Official contact details, map embed, and message form
│   ├── gallery/page.tsx              # Categorized photo gallery with lightbox modal viewer
│   ├── notices/page.tsx              # University announcements & circulars
│   ├── admin/
│   │   ├── page.tsx                  # Protected Administration Dashboard
│   │   └── login/page.tsx            # Secure Admin Sign-in
│   └── api/                          # Next.js Server API route handlers
│       ├── admissions/apply/         # Student admission processing & storage
│       ├── contact/                  # Contact messages pipeline
│       ├── careers/apply/            # Career application & CV upload
│       ├── faculty/                  # Public faculty endpoint
│       ├── jobs/                     # Public job postings endpoint
│       ├── notices/                  # Public notices endpoint
│       ├── gallery/                  # Public gallery endpoint
│       └── admin/                    # Admin authenticated CRUD & stats routes
├── components/
│   ├── Navbar.tsx                    # Sticky glass navbar with desktop & mobile menu
│   ├── Footer.tsx                    # Multi-column footer with mandatory author attribution
│   ├── CoursePageView.tsx            # Reusable rich curriculum & syllabus template
│   ├── FacultyDirectory.tsx          # Filterable faculty grid & table view
│   ├── NoticesView.tsx               # Filterable circulars & announcement browser
│   ├── GalleryView.tsx               # Categorized gallery with lightbox modal
│   └── AdminDashboard.tsx            # Comprehensive administrative management system
├── lib/
│   ├── db.ts                         # Resilient data layer (Supabase + local store)
│   ├── supabase.ts                   # Supabase client configuration
│   ├── auth.ts                       # Secure admin session cookies & verification
│   ├── storage.ts                    # File upload handler (Supabase Storage / local fallback)
│   ├── types.ts                      # TypeScript models for the entire system
│   ├── courses-data.ts               # Complete curricula for CSE, ECE, EEE, and MCA
│   └── seed-data.ts                  # Seed data for faculty, facilities, jobs, notices, gallery
├── supabase/
│   └── schema.sql                    # Production PostgreSQL migration script with RLS policies
├── public/
│   ├── images/                       # High-resolution generated campus imagery
│   └── uploads/                      # Uploaded admissions photos, docs & resumes
├── .env.example                      # Environment variables documentation
└── .env.local                        # Development configuration
```

---

## ⚙️ Environment Variables

Create `.env.local` based on `.env.example`:

```bash
# Supabase Cloud Configuration (required in production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Portal Credentials (never commit real values)
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-unique-strong-password
ADMIN_SESSION_SECRET=at-least-32-random-bytes
ADMISSION_RECEIPT_SECRET=another-at-least-32-random-bytes

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🗄️ Supabase Database & Storage Setup

1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Open the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` from this repository, copy its contents, and execute them in the SQL editor.
4. The script creates the `admissions`, `contact_messages`, `career_jobs`, `career_applications`, `notices`, `faculty`, `facilities`, and `gallery_items` tables with **Row Level Security (RLS)**. Public access is limited to form inserts and published/public content reads. Admin CRUD is handled by server routes after signed-session checks.
5. Under **Storage**, ensure the following buckets are present:
  * `admissions` (Private applicant photos & documents)
   * `resumes` (Private bucket for job seeker CVs)
   * `gallery` (Public bucket for campus images)
6. Copy the **Project URL** and **service-role key** into `.env.local`. The service-role key is server-only and must never use a `NEXT_PUBLIC_` prefix.
7. Configure all admin and receipt secrets. Use unique values of at least 32 random bytes for the two signing secrets. Admin login is disabled when credentials or a valid session secret are missing.

---

## 💻 Local Development

Install dependencies and start Turbopack development server:

```bash
# 1. Install dependencies
npm install

# 2. Start local server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## 🛡️ Admin Portal Access

* Route: `http://localhost:3000/admin/login`
* There are no default admin credentials. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` in the private environment.
* Features available in Admin Console:
  * View total application metrics, pending reviews, unread inquiries.
  * Search, filter, inspect, and update student admission application statuses (`Pending`, `Under Review`, `Shortlisted`, `Accepted`, `Rejected`).
  * Review contact messages and mark them as `New`, `Read`, `Replied`, or `Closed`.
  * Review job applicants and view uploaded resumes.
  * Publish, edit, and delete campus notices and circulars.
  * Add and remove faculty members.
  * Add and remove photos from the campus gallery.

---

## 📝 How to Replace University Content & Official Information

Any placeholder marked with `[EDITABLE CONTENT]` or `[OFFICIAL INFORMATION REQUIRED]` can be adjusted:
* **Academic Curricula & Syllabi:** Edit `lib/courses-data.ts`.
* **Campus Facilities:** Edit `lib/seed-data.ts` or add dynamically via database.
* **Campus Images:** Replace files in `public/images/` (`hero.jpg`, `computer_lab.jpg`, `library.jpg`, `smart_classroom.jpg`, `sports_complex.jpg`, `hostel.jpg`).
* **Official address, phone, email, office hours, and map embed:** replace the clearly marked placeholders in `components/Footer.tsx` and `app/contact/page.tsx` after verification.
* **Faculty, jobs, and notices:** add verified records in the admin dashboard; no demo people, vacancies, or announcements are pre-published.

---

## 🎓 Website Design & Credit

**Designed & Developed by Aradhana Satapathy**
**Roll No: 202321248**
*NIST UNIVERSITY Project*

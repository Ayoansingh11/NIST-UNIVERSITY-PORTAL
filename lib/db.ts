import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import {
  Admission,
  ContactMessage,
  CareerJob,
  CareerApplication,
  Notice,
  Faculty,
  Facility,
  GalleryItem,
  AdmissionStatus,
  ContactStatus,
  CareerAppStatus
} from './types';
import {
  SEED_FACULTY,
  SEED_FACILITIES,
  SEED_JOBS,
  SEED_NOTICES,
  SEED_GALLERY
} from './seed-data';
import { isSupabaseConfigured, supabaseAdmin } from './supabase';

interface DatabaseSchema {
  admissions: Admission[];
  contact_messages: ContactMessage[];
  career_jobs: CareerJob[];
  career_applications: CareerApplication[];
  notices: Notice[];
  faculty: Faculty[];
  facilities: Facility[];
  gallery_items: GalleryItem[];
}

const DB_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DB_DIR, 'db.json');
const EMPTY_LOCAL_DB: DatabaseSchema = {
  admissions: [],
  contact_messages: [],
  career_jobs: SEED_JOBS,
  career_applications: [],
  notices: SEED_NOTICES,
  faculty: SEED_FACULTY,
  facilities: SEED_FACILITIES,
  gallery_items: SEED_GALLERY
};

function getLocalDb(): DatabaseSchema {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Local JSON storage is development-only. Configure Supabase before production use.');
  }
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = EMPTY_LOCAL_DB;
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading local db:', err);
    throw err;
  }
}

function saveLocalDb(data: DatabaseSchema): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Local JSON storage is development-only. Configure Supabase before production use.');
  }
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local db:', err);
  }
}

// ==========================================
// ADMISSIONS OPERATIONS
// ==========================================
export async function getAdmissions(): Promise<Admission[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data as Admission[];
  }
  return getLocalDb().admissions;
}

export async function getAdmissionByNumber(appNumber: string): Promise<Admission | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('admissions')
      .select('*')
      .eq('application_number', appNumber)
      .maybeSingle();
    if (!error && data) return data as Admission;
  }
  const db = getLocalDb();
  return db.admissions.find((a) => a.application_number === appNumber) || null;
}

export async function createAdmission(payload: Omit<Admission, 'id' | 'application_number' | 'created_at' | 'status'>): Promise<Admission> {
  const application_number = `NIST-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const record: Admission = {
    ...payload,
    id: randomUUID(),
    application_number,
    status: 'Pending',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('admissions')
      .insert([record])
      .select()
      .single();
    if (!error && data) return data as Admission;
    console.warn('Supabase insert failed, persisting to local store:', error);
  }

  const db = getLocalDb();
  db.admissions.unshift(record);
  saveLocalDb(db);
  return record;
}

export async function updateAdmissionStatus(id: string, status: AdmissionStatus): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin
      .from('admissions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  const item = db.admissions.find((a) => a.id === id);
  if (item) {
    item.status = status;
    item.updated_at = new Date().toISOString();
    saveLocalDb(db);
    return true;
  }
  return false;
}

export async function deleteAdmission(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from('admissions').delete().eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  db.admissions = db.admissions.filter((a) => a.id !== id);
  saveLocalDb(db);
  return true;
}

// ==========================================
// CONTACT MESSAGES OPERATIONS
// ==========================================
export async function getContactMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data as ContactMessage[];
  }
  return getLocalDb().contact_messages;
}

export async function createContactMessage(payload: Omit<ContactMessage, 'id' | 'created_at' | 'status'>): Promise<ContactMessage> {
  const record: ContactMessage = {
    ...payload,
    id: randomUUID(),
    status: 'New',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert([record])
      .select()
      .single();
    if (!error && data) return data as ContactMessage;
  }

  const db = getLocalDb();
  db.contact_messages.unshift(record);
  saveLocalDb(db);
  return record;
}

export async function updateContactStatus(id: string, status: ContactStatus): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin
      .from('contact_messages')
      .update({ status })
      .eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  const item = db.contact_messages.find((m) => m.id === id);
  if (item) {
    item.status = status;
    saveLocalDb(db);
    return true;
  }
  return false;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from('contact_messages').delete().eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  db.contact_messages = db.contact_messages.filter((m) => m.id !== id);
  saveLocalDb(db);
  return true;
}

// ==========================================
// CAREER JOBS OPERATIONS
// ==========================================
export async function getCareerJobs(): Promise<CareerJob[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('career_jobs')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data as CareerJob[];
  }
  return getLocalDb().career_jobs;
}

export async function getCareerJobById(id: string): Promise<CareerJob | null> {
  const jobs = await getCareerJobs();
  return jobs.find((j) => j.id === id) || null;
}

export async function saveCareerJob(job: CareerJob): Promise<CareerJob> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('career_jobs')
      .upsert([job])
      .select()
      .single();
    if (!error && data) return data as CareerJob;
  }
  const db = getLocalDb();
  const idx = db.career_jobs.findIndex((j) => j.id === job.id);
  if (idx >= 0) {
    db.career_jobs[idx] = job;
  } else {
    db.career_jobs.unshift(job);
  }
  saveLocalDb(db);
  return job;
}

export async function deleteCareerJob(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from('career_jobs').delete().eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  db.career_jobs = db.career_jobs.filter((j) => j.id !== id);
  saveLocalDb(db);
  return true;
}

// ==========================================
// CAREER APPLICATIONS OPERATIONS
// ==========================================
export async function getCareerApplications(): Promise<CareerApplication[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('career_applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data as CareerApplication[];
  }
  return getLocalDb().career_applications;
}

export async function createCareerApplication(payload: Omit<CareerApplication, 'id' | 'created_at' | 'status'>): Promise<CareerApplication> {
  const record: CareerApplication = {
    ...payload,
    id: randomUUID(),
    status: 'New',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('career_applications')
      .insert([record])
      .select()
      .single();
    if (!error && data) return data as CareerApplication;
  }

  const db = getLocalDb();
  db.career_applications.unshift(record);
  saveLocalDb(db);
  return record;
}

export async function updateCareerAppStatus(id: string, status: CareerAppStatus): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin
      .from('career_applications')
      .update({ status })
      .eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  const item = db.career_applications.find((a) => a.id === id);
  if (item) {
    item.status = status;
    saveLocalDb(db);
    return true;
  }
  return false;
}

export async function deleteCareerApp(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from('career_applications').delete().eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  db.career_applications = db.career_applications.filter((a) => a.id !== id);
  saveLocalDb(db);
  return true;
}

// ==========================================
// NOTICES OPERATIONS
// ==========================================
export async function getNotices(): Promise<Notice[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('notices')
      .select('*')
      .order('date', { ascending: false });
    if (!error && data) return data as Notice[];
  }
  return getLocalDb().notices;
}

export async function saveNotice(notice: Notice): Promise<Notice> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('notices')
      .upsert([notice])
      .select()
      .single();
    if (!error && data) return data as Notice;
  }
  const db = getLocalDb();
  const idx = db.notices.findIndex((n) => n.id === notice.id);
  if (idx >= 0) {
    db.notices[idx] = notice;
  } else {
    db.notices.unshift(notice);
  }
  saveLocalDb(db);
  return notice;
}

export async function deleteNotice(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from('notices').delete().eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  db.notices = db.notices.filter((n) => n.id !== id);
  saveLocalDb(db);
  return true;
}

// ==========================================
// FACULTY OPERATIONS
// ==========================================
export async function getFaculty(): Promise<Faculty[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from('faculty').select('*');
    if (!error && data) return data as Faculty[];
  }
  return getLocalDb().faculty;
}

export async function saveFaculty(faculty: Faculty): Promise<Faculty> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('faculty')
      .upsert([faculty])
      .select()
      .single();
    if (!error && data) return data as Faculty;
  }
  const db = getLocalDb();
  const idx = db.faculty.findIndex((f) => f.id === faculty.id);
  if (idx >= 0) {
    db.faculty[idx] = faculty;
  } else {
    db.faculty.unshift(faculty);
  }
  saveLocalDb(db);
  return faculty;
}

export async function deleteFaculty(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from('faculty').delete().eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  db.faculty = db.faculty.filter((f) => f.id !== id);
  saveLocalDb(db);
  return true;
}

// ==========================================
// FACILITIES OPERATIONS
// ==========================================
export async function getFacilities(): Promise<Facility[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from('facilities').select('*');
    if (!error && data) return data as Facility[];
  }
  return getLocalDb().facilities;
}

// ==========================================
// GALLERY OPERATIONS
// ==========================================
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data as GalleryItem[];
  }
  return getLocalDb().gallery_items;
}

export async function saveGalleryItem(item: GalleryItem): Promise<GalleryItem> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('gallery_items')
      .upsert([item])
      .select()
      .single();
    if (!error && data) return data as GalleryItem;
  }
  const db = getLocalDb();
  const idx = db.gallery_items.findIndex((g) => g.id === item.id);
  if (idx >= 0) {
    db.gallery_items[idx] = item;
  } else {
    db.gallery_items.unshift(item);
  }
  saveLocalDb(db);
  return item;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from('gallery_items').delete().eq('id', id);
    if (!error) return true;
  }
  const db = getLocalDb();
  db.gallery_items = db.gallery_items.filter((g) => g.id !== id);
  saveLocalDb(db);
  return true;
}

// ==========================================
// DASHBOARD STATS
// ==========================================
export async function getDashboardStats() {
  const admissions = await getAdmissions();
  const contacts = await getContactMessages();
  const careerApps = await getCareerApplications();
  const jobs = await getCareerJobs();
  const notices = await getNotices();

  return {
    totalApplications: admissions.length,
    pendingApplications: admissions.filter((a) => a.status === 'Pending').length,
    contactMessages: contacts.length,
    newContactMessages: contacts.filter((c) => c.status === 'New').length,
    careerApplications: careerApps.length,
    activeJobs: jobs.filter((j) => j.active).length,
    publishedNotices: notices.filter((n) => n.published).length
  };
}

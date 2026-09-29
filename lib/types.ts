export type CourseType = 'B.Tech CSE' | 'B.Tech ECE' | 'B.Tech EEE' | 'MCA';

export type AdmissionStatus = 'Pending' | 'Under Review' | 'Shortlisted' | 'Accepted' | 'Rejected';

export interface Admission {
  id: string;
  application_number: string;
  student_name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  course: CourseType;
  qualification: string;
  percentage: string;
  passing_year: string;
  hobbies: string[];
  address: string;
  city: string;
  state: string;
  pincode: string;
  photo_url?: string;
  document_url?: string;
  status: AdmissionStatus;
  created_at: string;
  updated_at?: string;
}

export type ContactStatus = 'New' | 'Read' | 'Replied' | 'Closed';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactStatus;
  created_at: string;
}

export type JobType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Adjunct';

export interface CareerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: JobType;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  active: boolean;
  created_at: string;
}

export type CareerAppStatus = 'New' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';

export interface CareerApplication {
  id: string;
  job_id: string;
  job_title: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  cover_letter: string;
  resume_url?: string;
  status: CareerAppStatus;
  created_at: string;
}

export type NoticeCategory = 'General' | 'Admissions' | 'Examination' | 'Events' | 'Recruitment';

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  content: string;
  date: string;
  attachment?: string;
  published: boolean;
  created_at: string;
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  experience: string;
  email?: string;
  specialization?: string;
  image_url?: string;
}

export interface Facility {
  id: string;
  title: string;
  icon: string;
  description: string;
  image_url: string;
  features: string[];
}

export type GalleryCategory = 'Campus' | 'Events' | 'Students' | 'Laboratories' | 'Sports' | 'Cultural Events';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image_url: string;
  caption?: string;
  created_at: string;
}

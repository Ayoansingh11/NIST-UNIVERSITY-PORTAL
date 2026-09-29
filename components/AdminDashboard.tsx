'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Admission,
  ContactMessage,
  CareerApplication,
  CareerJob,
  Notice,
  Faculty,
  GalleryItem,
  AdmissionStatus,
  ContactStatus,
  CareerAppStatus,
  CourseType
} from '@/lib/types';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Briefcase,
  Bell,
  GraduationCap,
  Image as ImageIcon,
  Settings,
  LogOut,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Eye,
  Trash2,
  Plus,
  ExternalLink,
  ChevronRight,
  Database,
  ShieldCheck,
  FileText,
  X
} from 'lucide-react';

type Tab =
  | 'dashboard'
  | 'admissions'
  | 'contacts'
  | 'careers'
  | 'faculty'
  | 'notices'
  | 'gallery'
  | 'settings';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // Stats
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    contactMessages: 0,
    newContactMessages: 0,
    careerApplications: 0,
    activeJobs: 0,
    publishedNotices: 0
  });

  // Data sets
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [careerApps, setCareerApps] = useState<CareerApplication[]>([]);
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // Filtering states
  const [admissionSearch, setAdmissionSearch] = useState('');
  const [admissionCourse, setAdmissionCourse] = useState('ALL');
  const [admissionStatus, setAdmissionStatus] = useState('ALL');
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);

  const [contactStatusFilter, setContactStatusFilter] = useState('ALL');
  const [careerStatusFilter, setCareerStatusFilter] = useState('ALL');

  // Modals for adding items
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'General' as const,
    content: '',
    attachment: ''
  });

  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    department: 'CSE',
    designation: 'Assistant Professor',
    experience: '5 Years',
    email: '',
    specialization: '',
    image_url: ''
  });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    category: 'Campus' as const,
    image_url: '',
    caption: ''
  });

  const [loading, setLoading] = useState(true);

  // Load all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Check auth first
      const authRes = await fetch('/api/admin/auth');
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.push('/admin/login');
        return;
      }

      // Fetch stats
      const statsRes = await fetch('/api/admin/stats');
      if (statsRes.ok) {
        const s = await statsRes.json();
        setStats(s.data);
      }

      // Fetch admissions
      const admRes = await fetch('/api/admin/admissions');
      if (admRes.ok) {
        const a = await admRes.json();
        setAdmissions(a.data || []);
      }

      // Fetch contacts
      const cntRes = await fetch('/api/admin/contacts');
      if (cntRes.ok) {
        const c = await cntRes.json();
        setContacts(c.data || []);
      }

      // Fetch careers
      const carRes = await fetch('/api/admin/careers');
      if (carRes.ok) {
        const ca = await carRes.json();
        setCareerApps(ca.data || []);
      }

      // Fetch notices
      const notRes = await fetch('/api/admin/notices');
      if (notRes.ok) {
        const n = await notRes.json();
        setNotices(n.data || []);
      }

      // Fetch faculty
      const facRes = await fetch('/api/admin/faculty');
      if (facRes.ok) {
        const f = await facRes.json();
        setFaculty(f.data || []);
      }

      // Fetch gallery
      const galRes = await fetch('/api/admin/gallery');
      if (galRes.ok) {
        const g = await galRes.json();
        setGallery(g.data || []);
      }

      // Fetch jobs
      const jobRes = await fetch('/api/admin/jobs');
      if (jobRes.ok) {
        const j = await jobRes.json();
        setJobs(j.data || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  // Admission Status Handler
  const handleUpdateAdmissionStatus = async (id: string, status: AdmissionStatus) => {
    try {
      const res = await fetch(`/api/admin/admissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setAdmissions((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status, updated_at: new Date().toISOString() } : a))
        );
        if (selectedAdmission?.id === id) {
          setSelectedAdmission((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAdmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admission record?')) return;
    try {
      const res = await fetch(`/api/admin/admissions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAdmissions((prev) => prev.filter((a) => a.id !== id));
        if (selectedAdmission?.id === id) setSelectedAdmission(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Contact Status Handler
  const handleUpdateContactStatus = async (id: string, status: ContactStatus) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Career Application Handler
  const handleUpdateCareerStatus = async (id: string, status: CareerAppStatus) => {
    try {
      const res = await fetch(`/api/admin/careers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setCareerApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCareerApp = async (id: string) => {
    if (!confirm('Delete this career application?')) return;
    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCareerApps((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Notice
  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newNotice, published: true })
      });
      const data = await res.json();
      if (data.success) {
        setNotices((prev) => [data.data, ...prev]);
        setShowNoticeModal(false);
        setNewNotice({ title: '', category: 'General', content: '', attachment: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm('Delete this notice?')) return;
    try {
      const res = await fetch(`/api/admin/notices/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotices((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Faculty
  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFaculty)
      });
      const data = await res.json();
      if (data.success) {
        setFaculty((prev) => [...prev, data.data]);
        setShowFacultyModal(false);
        setNewFaculty({
          name: '',
          department: 'CSE',
          designation: 'Assistant Professor',
          experience: '5 Years',
          email: '',
          specialization: '',
          image_url: ''
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    if (!confirm('Delete faculty member?')) return;
    try {
      const res = await fetch(`/api/admin/faculty/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFaculty((prev) => prev.filter((f) => f.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Gallery Item
  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGalleryItem)
      });
      const data = await res.json();
      if (data.success) {
        setGallery((prev) => [data.data, ...prev]);
        setShowGalleryModal(false);
        setNewGalleryItem({ title: '', category: 'Campus', image_url: '', caption: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Delete this gallery item?')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGallery((prev) => prev.filter((g) => g.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Admissions Filtering
  const filteredAdmissions = admissions.filter((adm) => {
    const matchesCourse = admissionCourse === 'ALL' || adm.course === admissionCourse;
    const matchesStatus = admissionStatus === 'ALL' || adm.status === admissionStatus;
    const q = admissionSearch.toLowerCase();
    const matchesSearch =
      adm.student_name.toLowerCase().includes(q) ||
      adm.email.toLowerCase().includes(q) ||
      adm.application_number.toLowerCase().includes(q) ||
      adm.city.toLowerCase().includes(q);
    return matchesCourse && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#0b132b] text-white flex-shrink-0 flex flex-col justify-between border-r border-white/10">
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0b132b] rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight text-white block">
                  NIST ADMIN
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">Control Panel</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'admissions', label: 'Admissions', icon: Users, badge: admissions.length },
              { id: 'contacts', label: 'Contact Inquiries', icon: MessageSquare, badge: contacts.length },
              { id: 'careers', label: 'Job Applications', icon: Briefcase, badge: careerApps.length },
              { id: 'faculty', label: 'Manage Faculty', icon: GraduationCap },
              { id: 'notices', label: 'Manage Notices', icon: Bell },
              { id: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
              { id: 'settings', label: 'DB / Supabase Status', icon: Database }
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        active ? 'bg-white text-cyan-800' : 'bg-white/10 text-cyan-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="px-3 py-2 rounded-xl bg-white/5 text-[11px] text-slate-400">
            <span className="block font-medium text-slate-200">Admin Session Active</span>
            <span className="text-[10px] font-mono text-cyan-400">admin@nist.edu</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-300 hover:text-red-200 hover:bg-red-950/40 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                University Dashboard Overview
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time operational metrics across candidate admissions, career recruitment, and inquiries.
              </p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Total Admissions
                  </span>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono block mt-1">
                    {admissions.length}
                  </span>
                  <span className="text-xs text-amber-600 font-medium block mt-1">
                    {admissions.filter((a) => a.status === 'Pending').length} Pending Review
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Contact Messages
                  </span>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono block mt-1">
                    {contacts.length}
                  </span>
                  <span className="text-xs text-blue-600 font-medium block mt-1">
                    {contacts.filter((c) => c.status === 'New').length} New Unread Inquiries
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Job Applications
                  </span>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono block mt-1">
                    {careerApps.length}
                  </span>
                  <span className="text-xs text-purple-600 font-medium block mt-1">
                    {jobs.filter((j) => j.active).length} Active Job Postings
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Admissions */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Recent Admission Candidates</h3>
                  <button
                    onClick={() => setActiveTab('admissions')}
                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-800"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {admissions.slice(0, 4).map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{a.student_name}</span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          {a.application_number} • {a.course}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Contact Messages */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Recent Inquiry Messages</h3>
                  <button
                    onClick={() => setActiveTab('contacts')}
                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-800"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {contacts.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">{c.name}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[10px]">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-slate-600 font-medium line-clamp-1">{c.subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ADMISSIONS MANAGEMENT */}
        {activeTab === 'admissions' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Admission Applications ({filteredAdmissions.length})
                </h1>
                <p className="text-xs text-slate-500">
                  Manage candidate dossiers, change verification statuses, and inspect academic qualifications.
                </p>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, application number or city..."
                  value={admissionSearch}
                  onChange={(e) => setAdmissionSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <select
                value={admissionCourse}
                onChange={(e) => setAdmissionCourse(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
              >
                <option value="ALL">All Programs</option>
                <option value="B.Tech CSE">B.Tech CSE</option>
                <option value="B.Tech ECE">B.Tech ECE</option>
                <option value="B.Tech EEE">B.Tech EEE</option>
                <option value="MCA">MCA</option>
              </select>

              <select
                value={admissionStatus}
                onChange={(e) => setAdmissionStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
              >
                <option value="ALL">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Admissions Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600 uppercase tracking-wider">
                      <th className="py-3 px-4">Application No</th>
                      <th className="py-3 px-4">Candidate</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Percentage</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAdmissions.map((adm) => (
                      <tr key={adm.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-mono font-bold text-cyan-700">
                          {adm.application_number}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900 block">{adm.student_name}</span>
                          <span className="text-slate-400 text-[11px]">{adm.email} • {adm.phone}</span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-700">{adm.course}</td>
                        <td className="py-3 px-4 font-mono">{adm.percentage}</td>
                        <td className="py-3 px-4">
                          <select
                            value={adm.status}
                            onChange={(e) =>
                              handleUpdateAdmissionStatus(adm.id, e.target.value as AdmissionStatus)
                            }
                            className="px-2 py-1 rounded-md text-[11px] font-bold border border-slate-200 bg-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 space-x-2">
                          <button
                            onClick={() => setSelectedAdmission(adm)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="View Full Application Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAdmission(adm.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Individual Admission Details Modal */}
            {selectedAdmission && (
              <div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setSelectedAdmission(null)}
              >
                <div
                  className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedAdmission(null)}
                    className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <span className="text-xs font-mono font-bold text-cyan-600 block">
                      {selectedAdmission.application_number}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                      {selectedAdmission.student_name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Applied for {selectedAdmission.course} on{' '}
                      {new Date(selectedAdmission.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl">
                      <div>
                        <span className="text-slate-400 block">Email Address:</span>
                        <span className="font-semibold text-slate-900">{selectedAdmission.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Phone Number:</span>
                        <span className="font-semibold text-slate-900">{selectedAdmission.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Date of Birth:</span>
                        <span className="font-semibold text-slate-900">{selectedAdmission.dob}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Gender:</span>
                        <span className="font-semibold text-slate-900">{selectedAdmission.gender}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl">
                      <div>
                        <span className="text-slate-400 block">Previous Qualification:</span>
                        <span className="font-semibold text-slate-900">{selectedAdmission.qualification}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Marks / Percentage:</span>
                        <span className="font-semibold text-slate-900">{selectedAdmission.percentage}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Passing Year:</span>
                        <span className="font-semibold text-slate-900">{selectedAdmission.passing_year}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <span className="text-slate-400 block mb-1">Permanent Postal Address:</span>
                      <p className="font-medium text-slate-800">
                        {selectedAdmission.address}, {selectedAdmission.city}, {selectedAdmission.state} – {selectedAdmission.pincode}
                      </p>
                    </div>

                    {selectedAdmission.hobbies && selectedAdmission.hobbies.length > 0 && (
                      <div className="bg-slate-50 p-4 rounded-2xl">
                        <span className="text-slate-400 block mb-1">Extracurricular Activities:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {selectedAdmission.hobbies.map((h) => (
                            <span key={h} className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 text-[10px] font-semibold">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 pt-2">
                      {selectedAdmission.photo_url && (
                        <a
                          href={selectedAdmission.photo_url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-cyan-50 text-cyan-700 font-semibold border border-cyan-200 flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Photo</span>
                        </a>
                      )}
                      {selectedAdmission.document_url && (
                        <a
                          href={selectedAdmission.document_url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-semibold border border-blue-200 flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Academic Document</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES */}
        {activeTab === 'contacts' && (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Inquiry &amp; Contact Messages ({contacts.length})
            </h1>

            <div className="space-y-4">
              {contacts.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">{msg.name}</h3>
                        <span className="text-xs text-slate-400">• {new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-500">{msg.email} {msg.phone ? `• ${msg.phone}` : ''}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={msg.status}
                        onChange={(e) => handleUpdateContactStatus(msg.id, e.target.value as ContactStatus)}
                        className="px-2 py-1 rounded-md text-xs font-semibold border border-slate-200 bg-white"
                      >
                        <option value="New">New</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <button
                        onClick={() => handleDeleteContact(msg.id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-800 mb-1">Subject: {msg.subject}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CAREERS MANAGEMENT */}
        {activeTab === 'careers' && (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Faculty &amp; Staff Job Applications ({careerApps.length})
            </h1>

            <div className="space-y-4">
              {careerApps.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block">
                        Position: {app.job_title}
                      </span>
                      <h3 className="font-bold text-slate-900 text-lg">{app.name}</h3>
                      <p className="text-xs text-slate-500">{app.email} • {app.phone}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateCareerStatus(app.id, e.target.value as CareerAppStatus)}
                        className="px-2 py-1 rounded-md text-xs font-semibold border border-slate-200 bg-white"
                      >
                        <option value="New">New</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <button
                        onClick={() => handleDeleteCareerApp(app.id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-400 block">Qualification:</span>
                      <span className="font-medium text-slate-800">{app.qualification}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Experience:</span>
                      <span className="font-medium text-slate-800">{app.experience}</span>
                    </div>
                  </div>

                  {app.cover_letter && (
                    <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                      <span className="font-bold text-slate-700 block mb-0.5">Cover Letter:</span>
                      <p className="leading-relaxed">{app.cover_letter}</p>
                    </div>
                  )}

                  {app.resume_url && (
                    <div>
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Download Applicant CV</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FACULTY MANAGEMENT */}
        {activeTab === 'faculty' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Faculty Management ({faculty.length})
                </h1>
                <p className="text-xs text-slate-500">Add or remove university professors and lecturers.</p>
              </div>
              <button
                onClick={() => setShowFacultyModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-cyan-700 transition flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Faculty Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.map((f) => (
                <div
                  key={f.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={f.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={f.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-100">
                        {f.department}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{f.name}</h4>
                      <p className="text-xs text-slate-500">{f.designation} • {f.experience}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">{f.email || '—'}</span>
                    <button
                      onClick={() => handleDeleteFaculty(f.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Faculty Modal */}
            {showFacultyModal && (
              <div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setShowFacultyModal(false)}
              >
                <div
                  className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-bold text-lg text-slate-900 mb-4">Add Faculty Member</h3>
                  <form onSubmit={handleAddFaculty} className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. John Doe"
                        value={newFaculty.name}
                        onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold block text-slate-700 mb-1">Department</label>
                        <select
                          value={newFaculty.department}
                          onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300"
                        >
                          <option value="CSE">CSE</option>
                          <option value="ECE">ECE</option>
                          <option value="EEE">EEE</option>
                          <option value="MCA">MCA</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold block text-slate-700 mb-1">Designation</label>
                        <input
                          type="text"
                          required
                          value={newFaculty.designation}
                          onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="faculty@nist.edu"
                        value={newFaculty.email}
                        onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Research Specialization</label>
                      <input
                        type="text"
                        placeholder="e.g. Distributed Systems"
                        value={newFaculty.specialization}
                        onChange={(e) => setNewFaculty({ ...newFaculty, specialization: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowFacultyModal(false)}
                        className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold"
                      >
                        Save Faculty
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: NOTICES MANAGEMENT */}
        {activeTab === 'notices' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  University Circulars &amp; Notices ({notices.length})
                </h1>
                <p className="text-xs text-slate-500">Publish, edit, or archive university notices.</p>
              </div>
              <button
                onClick={() => setShowNoticeModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-cyan-700 transition flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Create Notice</span>
              </button>
            </div>

            <div className="space-y-4">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800">
                        {n.category}
                      </span>
                      <span className="text-xs text-slate-400">{n.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">{n.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{n.content}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteNotice(n.id)}
                    className="p-1.5 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Notice Modal */}
            {showNoticeModal && (
              <div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setShowNoticeModal(false)}
              >
                <div
                  className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-bold text-lg text-slate-900 mb-4">Post New University Notice</h3>
                  <form onSubmit={handleAddNotice} className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Notice Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Schedule for Autumn Semester Evaluations"
                        value={newNotice.title}
                        onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Category</label>
                      <select
                        value={newNotice.category}
                        onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      >
                        <option value="General">General</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Examination">Examination</option>
                        <option value="Events">Events</option>
                        <option value="Recruitment">Recruitment</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Notice Content</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detailed body text of the circular..."
                        value={newNotice.content}
                        onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowNoticeModal(false)}
                        className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold"
                      >
                        Publish Notice
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Campus Photo Gallery ({gallery.length})
                </h1>
                <p className="text-xs text-slate-500">Manage photographs shown across public gallery categories.</p>
              </div>
              <button
                onClick={() => setShowGalleryModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-cyan-700 transition flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div
                  key={g.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group"
                >
                  <img src={g.image_url} alt={g.title} className="w-full h-36 object-cover" />
                  <div className="p-3">
                    <span className="text-[10px] font-bold text-cyan-600 block">{g.category}</span>
                    <h5 className="font-bold text-slate-900 text-xs line-clamp-1 mt-0.5">{g.title}</h5>
                  </div>
                  <button
                    onClick={() => handleDeleteGalleryItem(g.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Gallery Modal */}
            {showGalleryModal && (
              <div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setShowGalleryModal(false)}
              >
                <div
                  className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-bold text-lg text-slate-900 mb-4">Add Gallery Photograph</h3>
                  <form onSubmit={handleAddGalleryItem} className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Image Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Annual Sports Stadium Action"
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Category</label>
                      <select
                        value={newGalleryItem.category}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      >
                        <option value="Campus">Campus</option>
                        <option value="Events">Events</option>
                        <option value="Students">Students</option>
                        <option value="Laboratories">Laboratories</option>
                        <option value="Sports">Sports</option>
                        <option value="Cultural Events">Cultural Events</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        required
                        placeholder="https://... or /images/..."
                        value={newGalleryItem.image_url}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, image_url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block text-slate-700 mb-1">Caption</label>
                      <input
                        type="text"
                        placeholder="Short description..."
                        value={newGalleryItem.caption}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowGalleryModal(false)}
                        className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold"
                      >
                        Add to Gallery
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: SETTINGS & DATABASE STATUS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Database &amp; Supabase Integration Status
            </h1>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Database Configuration</h3>
                  <p className="text-xs text-slate-500">
                    Verify database and storage connectivity in the deployment environment; no fallback guarantees data durability.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">PostgreSQL Schema:</span>
                  <span className="font-mono font-semibold text-slate-700">Run schema.sql in Supabase SQL Editor</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">Storage Buckets:</span>
                  <span className="font-mono font-semibold text-slate-800">admissions, resumes, gallery</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">Local Persistent Fallback:</span>
                  <span className="font-mono font-semibold text-slate-700">Development only (.data/db.json)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Admin Authentication:</span>
                  <span className="font-mono font-semibold text-slate-700">Signed HTTP-only session cookie</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-white/10 text-xs space-y-2">
              <p className="font-bold text-cyan-400">To connect your live Supabase cloud project:</p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                <li>Create a project in your Supabase dashboard (<a href="https://supabase.com" target="_blank" className="text-cyan-300 underline">supabase.com</a>).</li>
                <li>Go to the SQL Editor in Supabase and paste the contents of <code className="text-cyan-200">supabase/schema.sql</code>.</li>
                <li>Add <code className="text-cyan-200">NEXT_PUBLIC_SUPABASE_URL</code> and the server-only <code className="text-cyan-200">SUPABASE_SERVICE_ROLE_KEY</code> in <code className="text-cyan-200">.env.local</code>.</li>
                <li>Restart the server. All operations automatically sync to your cloud Supabase database.</li>
              </ol>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

import React from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  Cpu,
  Zap,
  Code,
  ShieldCheck,
  Award,
  Users,
  Compass,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Globe2
} from 'lucide-react';
import { getNotices } from '@/lib/db';

export const revalidate = 60; // Refresh dynamic notices every 60s

export default async function HomePage() {
  const notices = await getNotices();
  const latestNotices = notices.filter((n) => n.published).slice(0, 3);

  const programs = [
    {
      title: 'B.Tech Computer Science & Engineering',
      code: 'CSE',
      duration: '4 Years (8 Semesters)',
      description:
        'Focus on Artificial Intelligence, Machine Learning, Cloud Architecture, and Software Systems with intensive lab training.',
      href: '/academics/cse',
      icon: Cpu,
      color: 'from-blue-600 to-cyan-500'
    },
    {
      title: 'B.Tech Electronics & Communication Engineering',
      code: 'ECE',
      duration: '4 Years (8 Semesters)',
      description:
        'Specializations in VLSI Design, Embedded Systems, IoT, Robotics, and high-frequency wireless communications.',
      href: '/academics/ece',
      icon: Zap,
      color: 'from-cyan-600 to-teal-500'
    },
    {
      title: 'B.Tech Electrical & Electronics Engineering',
      code: 'EEE',
      duration: '4 Years (8 Semesters)',
      description:
        'Advanced training in Smart Grids, Electric Vehicle powertrains, Renewable Energy Systems, and Industrial Automation.',
      href: '/academics/eee',
      icon: Sparkles,
      color: 'from-indigo-600 to-blue-500'
    },
    {
      title: 'Master of Computer Applications',
      code: 'MCA',
      duration: '2 Years (4 Semesters)',
      description:
        'Postgraduate degree in Advanced Full-Stack Architecture, Enterprise Database Systems, Big Data, and Cloud DevOps.',
      href: '/academics/mca',
      icon: Code,
      color: 'from-sky-600 to-indigo-500'
    }
  ];

  const highlights = [
    {
      title: 'Academic Programs',
      desc: '[EDITABLE CONTENT — add verified information about academic programs.]',
      icon: Globe2
    },
    {
      title: 'Research & Innovation',
      desc: '[EDITABLE CONTENT — add verified research and innovation information.]',
      icon: Award
    },
    {
      title: 'Campus Learning',
      desc: '[EDITABLE CONTENT — add verified campus learning information.]',
      icon: Cpu
    },
    {
      title: 'Student Experience',
      desc: '[EDITABLE CONTENT — add verified information about student life.]',
      icon: Compass
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center bg-[#070d1e] overflow-hidden">
        {/* Background Image with subtle zoom & cinematic gradient */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: "url('/images/hero.jpg')"
            }}
          />
          <div className="absolute inset-0 gradient-hero-overlay" />
          {/* Subtle mesh background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-dark text-cyan-300 text-xs sm:text-sm font-medium mb-8 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>NIST UNIVERSITY</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl">
            Empowering Minds.{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Creating Futures.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
            Discover an environment where knowledge, innovation and opportunity come together to
            shape the leaders of tomorrow.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="/admissions/apply"
              id="hero-apply-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="/about"
              id="hero-explore-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-slate-200 hover:text-white glass-panel-dark hover:bg-white/10 border border-white/20 transition duration-200"
            >
              <span>Explore NIST</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </a>
          </div>

          {/* Floating Key Metrics */}
          <div className="mt-16 w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/10">
            <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 block font-mono">
                [OFFICIAL INFORMATION REQUIRED]
              </span>
              <span className="text-xs sm:text-sm text-slate-300 mt-1 block">
                Institutional History
              </span>
            </div>
            <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-sky-400 block font-mono">
                [OFFICIAL INFORMATION REQUIRED]
              </span>
              <span className="text-xs sm:text-sm text-slate-300 mt-1 block">
                Student Outcomes
              </span>
            </div>
            <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-400 block font-mono">
                [OFFICIAL INFORMATION REQUIRED]
              </span>
              <span className="text-xs sm:text-sm text-slate-300 mt-1 block">
                Campus
              </span>
            </div>
            <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 block font-mono">
                [OFFICIAL INFORMATION REQUIRED]
              </span>
              <span className="text-xs sm:text-sm text-slate-300 mt-1 block">
                Accreditation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REPUTATION & HIGHLIGHTS STRIP */}
      <section className="bg-slate-900 text-white py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{h.title}</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-snug">{h.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ACADEMIC OFFERINGS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block mb-2">
              Future-Ready Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Undergraduate &amp; Postgraduate Programs
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              NIST University offers accredited curricula engineered to deliver foundational depth,
              practical laboratory competence, and career-defining research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((prog) => {
              const Icon = prog.icon;
              return (
                <div
                  key={prog.code}
                  className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        {prog.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition">
                      {prog.title}
                    </h3>
                    <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={prog.href}
                      className="text-sm font-semibold text-cyan-600 hover:text-cyan-800 flex items-center gap-1 group-hover:translate-x-0.5 transition"
                    >
                      <span>Explore Curriculum</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/admissions/apply"
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-cyan-700 transition shadow-sm"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/academics"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-cyan-600 transition"
            >
              <span>View Full Academic Structure &amp; Regulations</span>
              <ArrowRight className="w-4 h-4 text-cyan-600" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. CAMPUS FACILITIES SHOWCASE */}
      <section className="py-20 bg-[#0b132b] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2">
                World-Class Infrastructure
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Designed for Discovery &amp; Growth
              </h2>
            </div>
            <a
              href="/facilities"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-cyan-500/40 transition duration-300">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="/images/computer_lab.jpg"
                  alt="High Tech Computing Lab"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold px-2.5 py-1 rounded bg-cyan-600 text-white">
                  Advanced Computing &amp; AI
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">High-Performance Computing Lab</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Dual-monitor AI stations with dedicated GPU clusters for deep learning, algorithm
                  benchmarking, and competitive coding.
                </p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-cyan-500/40 transition duration-300">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="/images/library.jpg"
                  alt="Central University Library"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold px-2.5 py-1 rounded bg-cyan-600 text-white">
                  Research &amp; Learning
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">Central Architectural Library</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Over 75,000 reference volumes, international journal digital terminals, and
                  acoustic study pods under natural geometric skylight.
                </p>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-cyan-500/40 transition duration-300">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="/images/smart_classroom.jpg"
                  alt="Smart Classroom Amphitheater"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold px-2.5 py-1 rounded bg-cyan-600 text-white">
                  Interactive Pedagogy
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">Smart Classroom Amphitheater</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Panoramic digital presentation screens, automated lecture capture, stepped acoustic
                  sightlines, and interactive digital interfaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST NOTICES & ANNOUNCEMENTS PREVIEW */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block mb-2">
                University Bulletins
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Notices &amp; Announcements
              </h2>
            </div>
            <a
              href="/notices"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
            >
              <span>View All Official Circulars</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 font-semibold border border-cyan-100">
                      {notice.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {notice.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base line-clamp-2 mt-2">
                    {notice.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {notice.content}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="/notices"
                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-800 flex items-center gap-1"
                  >
                    <span>Read circular</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                  {notice.attachment && (
                    <span className="text-[11px] text-slate-400">PDF Document</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-br from-[#0b132b] via-[#1c2541] to-[#070d1e] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            Your Future Starts Here
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Take the First Step Towards Excellence
          </h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Apply online for B.Tech CSE, ECE, EEE, and MCA programs for the 2026 academic session.
            Admissions counseling is now active.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/admissions/apply"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-xl shadow-cyan-500/30 transition duration-200"
            >
              Fill Online Admission Form
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition duration-200"
            >
              Contact Admissions Helpdesk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

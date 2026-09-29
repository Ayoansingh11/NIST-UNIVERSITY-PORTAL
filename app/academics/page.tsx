import React from 'react';
import type { Metadata } from 'next';
import { COURSES } from '@/lib/courses-data';
import {
  GraduationCap,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Zap,
  Sparkles,
  Code,
  Award,
  Users,
  Compass
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Programs | NIST University',
  description:
    'Explore undergraduate and postgraduate engineering and computing programs: B.Tech in CSE, ECE, EEE, and Master of Computer Applications (MCA) at NIST University.'
};

export default function AcademicsPage() {
  const iconMap: Record<string, any> = {
    cse: Cpu,
    ece: Zap,
    eee: Sparkles,
    mca: Code
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-[#0b132b] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            Academic Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Academic Programs &amp; Degrees
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Engineered to bridge scientific principles with transformative industrial practice.
            Discover our outcome-based curricula designed for next-generation technology leaders.
          </p>
        </div>
      </section>

      {/* Philosophy & Structure */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <Award className="w-8 h-8 text-cyan-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-lg">Autonomous Rigor</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Autonomous status grants NIST the agility to update course syllabi continuously to incorporate emerging tech like Generative AI, Quantum Computing basics, and Edge Devices.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-lg">Choice-Based Credit System</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Students can tailor their academic pathway with interdisciplinary electives, honors minors, and specialized certification credits from global partners.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <Users className="w-8 h-8 text-teal-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-lg">Mentorship &amp; Labs</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Every undergraduate works closely with senior faculty mentors, participating in funded research projects, hackathons, and national competitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block mb-2">
              Explore Our Degrees
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Degree Programs Offered
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Select a program below to review its comprehensive semester curriculum, eligibility criteria, and career pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(COURSES).map((course) => {
              const Icon = iconMap[course.slug] || GraduationCap;
              return (
                <div
                  key={course.slug}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {course.duration}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block mb-1">
                      {course.department}
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900">{course.name}</h3>

                    <p className="text-slate-600 mt-4 text-sm leading-relaxed">
                      {course.overview}
                    </p>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Key Career Outcomes:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {course.careerOpportunities.slice(0, 3).map((job) => (
                          <span
                            key={job}
                            className="text-xs px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-100 font-medium"
                          >
                            {job}
                          </span>
                        ))}
                        <span className="text-xs px-2 py-1 text-slate-400">+ more</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`/academics/${course.slug}`}
                      className="text-sm font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1.5 transition"
                    >
                      <span>Detailed Syllabus &amp; Labs</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/admissions/apply"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-cyan-700 transition shadow-sm"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

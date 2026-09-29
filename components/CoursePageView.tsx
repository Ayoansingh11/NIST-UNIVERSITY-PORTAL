import React from 'react';
import { CourseDetail } from '@/lib/courses-data';
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
  Briefcase,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Layers,
  Sparkle
} from 'lucide-react';

export default function CoursePageView({ course }: { course: CourseDetail }) {
  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="bg-[#0b132b] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-4 uppercase tracking-wider">
            <a href="/academics" className="hover:underline">Academics</a>
            <span>/</span>
            <span>{course.code}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-300 mb-3 border border-white/10">
                {course.degree}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                {course.name}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {course.overview}
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="glass-panel-dark p-6 rounded-2xl border border-white/15 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                Program Snapshot
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Duration</span>
                  <span className="text-white font-medium">{course.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Annual Intake</span>
                  <span className="text-cyan-400 font-medium">{course.intake}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Department</span>
                  <span className="text-white font-medium">{course.department}</span>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="/admissions/apply"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-lg shadow-cyan-500/25 transition"
                >
                  <span>Apply for This Program</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Curriculum */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Eligibility */}
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <FileCheck className="w-6 h-6 text-cyan-600" />
                  <h2 className="text-xl font-bold text-slate-900">Eligibility Criteria</h2>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{course.eligibility}</p>
              </div>

              {/* Semester Curriculum */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="w-6 h-6 text-cyan-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Curriculum &amp; Key Subjects</h2>
                    <p className="text-xs text-slate-500">{course.curriculumHighlight}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {course.keySubjects.map((sem) => (
                    <div
                      key={sem.semester}
                      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-cyan-400 transition"
                    >
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base border-b border-slate-100 pb-2 mb-3 text-cyan-800">
                        {sem.semester}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600">
                        {sem.subjects.map((sub) => (
                          <div key={sub} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                            <span>{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialized Labs */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Dedicated Laboratories &amp; Research Centers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.labs.map((lab) => (
                    <div
                      key={lab}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                    >
                      <Cpu className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800">{lab}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Career Opportunities & Admission Process */}
            <div className="space-y-8">
              {/* Career Opportunities */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-cyan-600" />
                  <h3 className="font-bold text-slate-900 text-base">Career Opportunities</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {course.careerOpportunities.map((career) => (
                    <li key={career} className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Admission Steps */}
              <div className="bg-[#0b132b] text-white rounded-2xl p-6 border border-white/10 shadow-lg">
                <h3 className="font-bold text-base text-white mb-3">Admission Process</h3>
                <ol className="space-y-3 text-xs text-slate-300">
                  {course.admissionProcess.map((step, idx) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <a
                    href="/admissions/apply"
                    className="w-full inline-block py-2.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition shadow"
                  >
                    Start Online Application
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { getCareerJobs } from '@/lib/db';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building,
  GraduationCap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers at NIST University | Faculty & Staff Openings',
  description:
    'Explore academic, research, laboratory, and administrative job opportunities at NIST University. Apply online to join our teaching community.'
};

export const revalidate = 60;

export default async function CareersPage() {
  const jobs = await getCareerJobs();
  const activeJobs = jobs.filter((j) => j.active);

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-[#0b132b] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            Join Our Academic Community
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Careers at NIST University
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Inspire the next generation of engineers, researchers, and innovators.
            We invite distinguished professors, researchers, and dedicated staff to join our ranks.
          </p>
        </div>
      </section>

      {/* Notice Banner regarding seed data */}
      <div className="bg-cyan-50 border-b border-cyan-100 py-3 px-4 text-center text-xs text-cyan-900 font-medium">
        <span>Current vacancies listed below reflect our active recruitment circulars for 2026.</span>
      </div>

      {/* Job Listings */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Current Openings ({activeJobs.length})
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Browse positions across academic, research, and administrative departments.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-100">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {job.employment_type}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {job.location}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-cyan-700 transition">
                      {job.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-mono">
                      Experience: {job.experience}
                    </p>

                    <p className="text-slate-600 text-sm leading-relaxed pt-1">
                      {job.description}
                    </p>

                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div className="pt-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Key Responsibilities:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          {job.responsibilities.slice(0, 4).map((r) => (
                            <div key={r} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 mt-0.5 flex-shrink-0" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-48 flex lg:flex-col justify-end lg:justify-start gap-3 flex-shrink-0 pt-2">
                    <a
                      href={`/careers/${job.id}/apply`}
                      className="w-full text-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-cyan-700 transition flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

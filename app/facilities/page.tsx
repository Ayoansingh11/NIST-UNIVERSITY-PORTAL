import React from 'react';
import type { Metadata } from 'next';
import { getFacilities } from '@/lib/db';
import {
  Monitor,
  BookOpen,
  Presentation,
  Home,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Campus Facilities & Infrastructure | NIST University',
  description:
    'Explore NIST University’s advanced infrastructure: High-Performance Computing Labs, Central Library, Smart Classrooms, Student Hostels, and Olympic Sports Complex.'
};

export const revalidate = 60;

export default async function FacilitiesPage() {
  const facilities = await getFacilities();

  const iconMap: Record<string, any> = {
    Monitor,
    BookOpen,
    Presentation,
    Home,
    Trophy
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-[#0b132b] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            Campus Infrastructure
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            World-Class University Facilities
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Spanning over 65 manicured acres, NIST University integrates cutting-edge computing
            clusters, quiet research atriums, smart auditoriums, and Olympic athletic grounds.
          </p>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {facilities.map((facility, index) => {
            const Icon = iconMap[facility.icon] || Sparkles;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={facility.id}
                className={`bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group`}
              >
                {/* Image Container with zoom and overlay */}
                <div
                  className={`lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] overflow-hidden ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={facility.image_url}
                    alt={facility.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{facility.title}</span>
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div
                  className={`lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-6 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-cyan-700 transition">
                      {facility.title}
                    </h2>

                    <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                      {facility.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                        Key Amenities &amp; Specifications:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {facility.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">
                      [EDITABLE CONTENT — confirm facility hours]
                    </span>
                    <a
                      href="/admissions/apply"
                      className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:text-cyan-800"
                    >
                      <span>Join NIST</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

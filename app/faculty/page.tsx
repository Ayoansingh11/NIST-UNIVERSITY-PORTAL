import React from 'react';
import type { Metadata } from 'next';
import { getFaculty } from '@/lib/db';
import FacultyDirectory from '@/components/FacultyDirectory';

export const metadata: Metadata = {
  title: 'Distinguished Faculty | NIST University',
  description:
    'Meet the accomplished professors, researchers, and mentors leading undergraduate and postgraduate teaching across CSE, ECE, EEE, and MCA at NIST University.'
};

export const revalidate = 60;

export default async function FacultyPage() {
  const faculty = await getFaculty();

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-[#0b132b] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            Academic Leadership
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Distinguished Faculty
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Scholars, researchers, and industry veterans committed to mentoring curious minds,
            spearheading high-impact publications, and shaping ethical engineering leadership.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FacultyDirectory initialFaculty={faculty} />
        </div>
      </section>
    </div>
  );
}

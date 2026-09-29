import React from 'react';
import type { Metadata } from 'next';
import { getNotices } from '@/lib/db';
import NoticesView from '@/components/NoticesView';

export const metadata: Metadata = {
  title: 'Notices & Circulars | NIST University',
  description:
    'Official academic announcements, admissions circulars, examination timetables, recruitment notifications, and event updates from NIST University.'
};

export const revalidate = 60;

export default async function NoticesPage() {
  const notices = await getNotices();
  const published = notices.filter((n) => n.published);

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-[#0b132b] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            Official Bulletin
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Notices &amp; Announcements
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Stay informed with verified notifications, examination timetables, admissions
            announcements, and event circulars from NIST University.
          </p>
        </div>
      </section>

      {/* Notices Content */}
      <section className="py-16 bg-slate-50 min-h-[500px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <NoticesView initialNotices={published} />
        </div>
      </section>
    </div>
  );
}

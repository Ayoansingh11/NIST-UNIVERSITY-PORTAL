'use client';

import React, { useState } from 'react';
import { Notice, NoticeCategory } from '@/lib/types';
import {
  Bell,
  Calendar,
  FileText,
  Search,
  Filter,
  Download,
  ExternalLink,
  Tag
} from 'lucide-react';

const CATEGORIES: ('ALL' | NoticeCategory)[] = [
  'ALL',
  'General',
  'Admissions',
  'Examination',
  'Events',
  'Recruitment'
];

export default function NoticesView({ initialNotices }: { initialNotices: Notice[] }) {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | NoticeCategory>('ALL');
  const [search, setSearch] = useState('');

  const filtered = notices.filter((n) => {
    const matchesCat = selectedCategory === 'ALL' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Search and Category Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars and announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Notices' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No circulars found</h3>
          <p className="text-xs text-slate-500 mt-1">Try selecting another category or clear the search query.</p>
        </div>
      )}

      {/* Notice List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-0.5 rounded-full font-bold bg-cyan-50 text-cyan-800 border border-cyan-100">
                  {item.category}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">{item.content}</p>
            </div>

            {item.attachment ? (
              <div className="flex-shrink-0 pt-2">
                <a
                  href={item.attachment}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 transition"
                >
                  <FileText className="w-4 h-4 text-cyan-600" />
                  <span>Download Circular</span>
                </a>
              </div>
            ) : (
              <div className="flex-shrink-0 pt-2 text-[11px] text-slate-400 font-mono">
                Official Web Circular
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Faculty } from '@/lib/types';
import {
  Search,
  LayoutGrid,
  Table as TableIcon,
  Mail,
  GraduationCap,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function FacultyDirectory({ initialFaculty }: { initialFaculty: Faculty[] }) {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const departments = ['ALL', 'CSE', 'ECE', 'EEE', 'MCA'];

  const filteredFaculty = faculty.filter((f) => {
    const matchesDept = selectedDept === 'ALL' || f.department.toUpperCase() === selectedDept;
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.specialization && f.specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      f.designation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Controls: Search, Filter, View Mode Toggle */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by faculty name or research domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500"
          />
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedDept === dept
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept === 'ALL' ? 'All Departments' : dept}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            title="Grid Card View"
            className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            title="Table View"
            className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredFaculty.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No faculty members found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your department filter or search keyword.</p>
        </div>
      )}

      {/* Grid Mode */}
      {viewMode === 'grid' && filteredFaculty.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="p-6 flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-slate-200/80 group-hover:border-cyan-500 transition">
                    <img
                      src={member.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-100 mb-1">
                      {member.department}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">{member.designation}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-cyan-600" />
                      <span>{member.experience} Experience</span>
                    </p>
                  </div>
                </div>

                {member.specialization && (
                  <div className="px-6 pb-4">
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider mb-0.5">
                        Domain &amp; Research:
                      </span>
                      {member.specialization}
                    </p>
                  </div>
                )}
              </div>

              {member.email && (
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-cyan-600 hover:text-cyan-800 flex items-center gap-1 font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{member.email}</span>
                  </a>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                    Faculty
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Table Mode */}
      {viewMode === 'table' && filteredFaculty.length > 0 && (
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Faculty Member</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Designation</th>
                  <th className="py-3.5 px-4">Experience</th>
                  <th className="py-3.5 px-4">Research Specialization</th>
                  <th className="py-3.5 px-4">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFaculty.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-3">
                      <img
                        src={member.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={member.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <span>{member.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 font-semibold text-xs">
                        {member.department}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{member.designation}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-xs">{member.experience}</td>
                    <td className="py-3 px-4 text-slate-600 text-xs max-w-xs">{member.specialization || '—'}</td>
                    <td className="py-3 px-4 text-xs">
                      {member.email ? (
                        <a href={`mailto:${member.email}`} className="text-cyan-600 hover:underline">
                          {member.email}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

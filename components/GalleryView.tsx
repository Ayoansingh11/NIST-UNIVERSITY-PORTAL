'use client';

import React, { useState } from 'react';
import { GalleryItem, GalleryCategory } from '@/lib/types';
import { Image as ImageIcon, X, Maximize2, Tag, Calendar } from 'lucide-react';

const CATEGORIES: ('ALL' | GalleryCategory)[] = [
  'ALL',
  'Campus',
  'Events',
  'Students',
  'Laboratories',
  'Sports',
  'Cultural Events'
];

export default function GalleryView({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [selectedCat, setSelectedCat] = useState<'ALL' | GalleryCategory>('ALL');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filtered = items.filter((item) => {
    return selectedCat === 'ALL' || item.category === selectedCat;
  });

  return (
    <div className="w-full">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCat === cat
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'ALL' ? 'All Photographs' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer h-72"
          >
            <img
              src={item.image_url}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition" />

            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-white/20">
                {item.category}
              </span>
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition p-1.5 rounded-full bg-black/50 text-white">
              <Maximize2 className="w-4 h-4" />
            </div>

            <div className="absolute bottom-4 inset-x-4">
              <h3 className="text-white font-bold text-base leading-snug drop-shadow-sm">
                {item.title}
              </h3>
              {item.caption && (
                <p className="text-slate-300 text-xs mt-1 line-clamp-2 leading-relaxed opacity-90">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/15 shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeModalItem.image_url}
                alt={activeModalItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-6 text-white bg-slate-900">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                  {activeModalItem.category}
                </span>
              </div>
              <h3 className="text-xl font-bold">{activeModalItem.title}</h3>
              {activeModalItem.caption && (
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  {activeModalItem.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

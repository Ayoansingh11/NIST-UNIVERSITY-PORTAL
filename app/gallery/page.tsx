import React from 'react';
import type { Metadata } from 'next';
import { getGalleryItems } from '@/lib/db';
import GalleryView from '@/components/GalleryView';

export const metadata: Metadata = {
  title: 'Campus Photo Gallery | NIST University',
  description:
    'Experience life at NIST University: campus architecture, laboratories, athletic facilities, tech hackathons, and cultural festivities in photos.'
};

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-[#0b132b] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            Visual Experience
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            NIST Campus Gallery
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Take a visual tour through our architectural landmarks, high-tech research clusters,
            student techfests, athletic events, and cultural moments.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-slate-50 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryView initialItems={items} />
        </div>
      </section>
    </div>
  );
}

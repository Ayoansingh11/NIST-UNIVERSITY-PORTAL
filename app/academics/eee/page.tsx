import React from 'react';
import type { Metadata } from 'next';
import { COURSES } from '@/lib/courses-data';
import CoursePageView from '@/components/CoursePageView';

export const metadata: Metadata = {
  title: 'B.Tech in Electrical & Electronics Engineering (EEE) | NIST University',
  description:
    'Power systems, smart grids, electric vehicle powertrains, curriculum and admissions for B.Tech EEE at NIST University.'
};

export default function EeePage() {
  return <CoursePageView course={COURSES.eee} />;
}

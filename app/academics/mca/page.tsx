import React from 'react';
import type { Metadata } from 'next';
import { COURSES } from '@/lib/courses-data';
import CoursePageView from '@/components/CoursePageView';

export const metadata: Metadata = {
  title: 'Master of Computer Applications (MCA) | NIST University',
  description:
    'Postgraduate 2-year Master of Computer Applications (MCA) program: enterprise software engineering, cloud computing, and big data.'
};

export default function McaPage() {
  return <CoursePageView course={COURSES.mca} />;
}

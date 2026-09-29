import React from 'react';
import type { Metadata } from 'next';
import { COURSES } from '@/lib/courses-data';
import CoursePageView from '@/components/CoursePageView';

export const metadata: Metadata = {
  title: 'B.Tech in Computer Science & Engineering (CSE) | NIST University',
  description:
    'Comprehensive curriculum, labs, career opportunities, and admission process for B.Tech Computer Science & Engineering at NIST University.'
};

export default function CsePage() {
  return <CoursePageView course={COURSES.cse} />;
}

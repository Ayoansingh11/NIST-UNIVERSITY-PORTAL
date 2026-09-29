import React from 'react';
import type { Metadata } from 'next';
import { COURSES } from '@/lib/courses-data';
import CoursePageView from '@/components/CoursePageView';

export const metadata: Metadata = {
  title: 'B.Tech in Electronics & Communication Engineering (ECE) | NIST University',
  description:
    'Comprehensive curriculum, VLSI labs, career pathways, and admission details for B.Tech Electronics & Communication at NIST University.'
};

export default function EcePage() {
  return <CoursePageView course={COURSES.ece} />;
}

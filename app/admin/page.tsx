import React from 'react';
import type { Metadata } from 'next';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Console | NIST University',
  description: 'Protected Administration and Admissions Control Panel for NIST University.'
};

export default function AdminPage() {
  return <AdminDashboard />;
}

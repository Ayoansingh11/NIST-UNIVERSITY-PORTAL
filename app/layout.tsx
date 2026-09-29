import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'NIST UNIVERSITY | Engineering Excellence & Innovation',
  description:
    'NIST University is a premier autonomous institution shaping leaders of tomorrow through world-class B.Tech, MCA programs, cutting-edge AI laboratories, and innovative research.',
  keywords: [
    'NIST University',
    'NIST Berhampur',
    'Engineering College',
    'B.Tech CSE',
    'B.Tech ECE',
    'B.Tech EEE',
    'MCA',
    'University Admissions 2026',
    'Autonomous University'
  ],
  authors: [{ name: 'NIST University' }],
  openGraph: {
    title: 'NIST UNIVERSITY — Engineering Excellence & Innovation',
    description:
      'Discover an environment where knowledge, innovation and opportunity come together to shape the leaders of tomorrow.',
    url: 'https://nist.edu',
    siteName: 'NIST University',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'NIST University Campus'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-[#fcfdfd] text-[#0f172a]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

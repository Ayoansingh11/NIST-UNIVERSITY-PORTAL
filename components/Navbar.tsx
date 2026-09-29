'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Phone,
  Mail
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Careers', href: '/careers' },
  { name: 'Notices', href: '/notices' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Notification / Quick Contact Bar */}
      <div className="bg-[#070d1e] text-slate-300 text-xs py-1.5 px-4 border-b border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Engineering Excellence. Inspiring Innovation. Shaping the Future.
            </span>
            <span className="text-slate-400">|</span>
            <span className="flex items-center gap-1 text-slate-300 hover:text-white transition">
              <Phone className="w-3 h-3 text-cyan-400" />
              <a href="tel:+916802492421">[OFFICIAL PHONE: +91 680 249 2421]</a>
            </span>
            <span className="flex items-center gap-1 text-slate-300 hover:text-white transition">
              <Mail className="w-3 h-3 text-cyan-400" />
              <a href="mailto:admissions@nist.edu">[OFFICIAL EMAIL: admissions@nist.edu]</a>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/notices"
              className="hover:text-cyan-400 transition text-[11px] uppercase tracking-wider"
            >
              Announcements
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="/admin/login"
              className="flex items-center gap-1 hover:text-cyan-400 transition text-[11px] uppercase tracking-wider text-slate-400"
            >
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              Admin Portal
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-xl shadow-black/20' : 'bg-[#0b132b]/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
                <div className="w-full h-full bg-[#0b132b] rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition duration-200" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-xl tracking-tight leading-none group-hover:text-cyan-300 transition">
                  NIST <span className="text-cyan-400 font-light">UNIVERSITY</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-medium">
                  Engineering • Innovation • Excellence
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 relative ${
                      active
                        ? 'text-cyan-400 font-semibold bg-white/5'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="/admissions/apply"
                id="navbar-apply-btn"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Apply Now</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="/admissions/apply"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-md shadow-sm"
              >
                Apply
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle Navigation Menu"
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#070d1e] border-b border-white/10 px-4 pt-3 pb-6 space-y-1 animate-fade-in shadow-2xl">
            <div className="grid grid-cols-1 gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`block px-3 py-2.5 rounded-lg text-base font-medium transition ${
                      active
                        ? 'text-cyan-400 bg-white/10 font-semibold'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="/admissions/apply"
                className="w-full text-center py-3 rounded-lg text-base font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-600 shadow-md shadow-cyan-500/25"
              >
                Online Admission 2026-27
              </a>
              <div className="flex justify-between items-center px-2 text-xs text-slate-400">
                <a href="/admin/login" className="hover:text-cyan-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Admin Login
                </a>
                <a href="/contact" className="hover:text-cyan-300">
                  Campus Helpdesk
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

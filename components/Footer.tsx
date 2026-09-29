import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Heart,
  ShieldCheck,
  Award,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070d1e] text-slate-300 border-t border-white/10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#070d1e] rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">
                  NIST <span className="text-cyan-400 font-light">UNIVERSITY</span>
                </span>
                <p className="text-[11px] text-slate-400 tracking-wider uppercase">
                  [EDITABLE CONTENT — approved institution descriptor]
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              "Engineering Excellence. Inspiring Innovation. Shaping the Future."
              [EDITABLE CONTENT — replace with an approved university introduction.]
            </p>

          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'About NIST', href: '/about' },
                { name: 'Academic Programs', href: '/academics' },
                { name: 'Distinguished Faculty', href: '/faculty' },
                { name: 'Campus Facilities', href: '/facilities' },
                { name: 'Admissions', href: '/admissions' },
                { name: 'Careers at NIST', href: '/careers' },
                { name: 'Campus Notices', href: '/notices' },
                { name: 'Photo Gallery', href: '/gallery' },
                { name: 'Contact Us', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-cyan-400 transition flex items-center gap-1.5 group text-slate-300"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic Programs */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Academic Programs
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/academics/cse" className="hover:text-cyan-400 transition block">
                  <span className="font-medium text-slate-200 block">B.Tech CSE</span>
                  <span className="text-xs text-slate-400">Computer Science &amp; Engineering</span>
                </a>
              </li>
              <li>
                <a href="/academics/ece" className="hover:text-cyan-400 transition block">
                  <span className="font-medium text-slate-200 block">B.Tech ECE</span>
                  <span className="text-xs text-slate-400">Electronics &amp; Communication</span>
                </a>
              </li>
              <li>
                <a href="/academics/eee" className="hover:text-cyan-400 transition block">
                  <span className="font-medium text-slate-200 block">B.Tech EEE</span>
                  <span className="text-xs text-slate-400">Electrical &amp; Electronics</span>
                </a>
              </li>
              <li>
                <a href="/academics/mca" className="hover:text-cyan-400 transition block">
                  <span className="font-medium text-slate-200 block">MCA</span>
                  <span className="text-xs text-slate-400">Master of Computer Applications</span>
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="/admissions/apply"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <span>Apply for 2026 Admission</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Admin */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Campus Location
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                <span className="text-xs leading-relaxed text-slate-400">
                  [OFFICIAL ADDRESS REQUIRED]
                  <br />
                  <span className="text-[10px] text-slate-500">Replace with a verified campus address.</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-xs text-slate-300">[OFFICIAL PHONE REQUIRED]</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-xs text-slate-300">[OFFICIAL EMAIL REQUIRED]</span>
              </div>
              <div className="pt-2">
                <a
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs text-cyan-300 border border-white/10 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Staff &amp; Admin Login
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Mandatory Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>
              &copy; {new Date().getFullYear()} NIST UNIVERSITY. All rights reserved.
            </p>
          </div>

          {/* CRITICAL EXACT REQUIREMENT */}
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-center">
            <span className="text-slate-300 font-medium">
              Designed &amp; Developed by Aradhana Satapathy
            </span>
            <span className="text-cyan-400 ml-2 font-mono">
              (Roll No: 202321248)
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] text-slate-500">
            <a href="/about" className="hover:text-slate-300 transition">Privacy Policy</a>
            <span>•</span>
            <a href="/about" className="hover:text-slate-300 transition">Terms &amp; Conditions</a>
            <span>•</span>
            <a href="/contact" className="hover:text-slate-300 transition">Helpdesk</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

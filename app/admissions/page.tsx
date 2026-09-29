import React from 'react';
import type { Metadata } from 'next';
import {
  FileText,
  Calendar,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admissions 2026–27 | NIST University',
  description:
    'Join NIST University. Discover eligibility, counseling schedule, required documents, fee guidance, and start your online application for B.Tech & MCA programs.'
};

export default function AdmissionsPage() {
  const steps = [
    {
      step: '01',
      title: 'Online Application',
      description: 'Fill out the digital admission form with personal, academic, and contact details.'
    },
    {
      step: '02',
      title: 'Document Upload',
      description: 'Upload the requested photograph and any applicable academic documents.'
    },
    {
      step: '03',
      title: 'Counseling & Scrutiny',
      description: 'Submitted applications are subject to review by the university.'
    },
    {
      step: '04',
      title: 'Next Steps',
      description: 'Follow up using your application number and await official communication.'
    }
  ];

  const faqs = [
    {
      q: 'What are the minimum eligibility criteria for B.Tech admissions?',
      a: '[OFFICIAL INFORMATION REQUIRED — confirm eligibility rules for this program.]'
    },
    {
      q: 'How will I receive confirmation after applying online?',
      a: 'After successful submission, the confirmation page displays your application number. No email confirmation is sent by this website.'
    },
    {
      q: 'Are hostel facilities available for outstation first-year students?',
      a: '[OFFICIAL INFORMATION REQUIRED — confirm accommodation availability and features.]'
    },
    {
      q: 'Can I apply for multiple engineering branches?',
      a: 'The online form accepts one course selection. Contact the university using verified contact details for questions about changing or adding a preference.'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-[#0b132b] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            [EDITABLE CONTENT — confirm the active academic session]
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Admissions at NIST University
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Review the program information and submit an application for university review. Replace this copy with verified admission-cycle details before launch.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="/admissions/apply"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 hover:from-sky-500 hover:to-cyan-500 shadow-xl shadow-cyan-500/30 hover:-translate-y-0.5 transition duration-200"
            >
              <span>Start Online Application</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Steps to Apply */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 block mb-2">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How to Apply for Admission
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              [EDITABLE CONTENT — add the university-approved admissions procedure.]
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st) => (
              <div
                key={st.step}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-cyan-500 transition duration-200 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-extrabold text-cyan-600/30 font-mono block mb-3">
                    {st.step}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/admissions/apply"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-800"
            >
              <span>Proceed to Application Portal</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Important Dates & Eligibility Overview */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Dates */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-cyan-600" />
                <h3 className="text-xl font-bold text-slate-900">Admissions Timeline (2026–27)</h3>
              </div>
              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="font-medium">Online Portal Opens</span>
                  <span className="font-semibold text-cyan-700">[OFFICIAL DATE: CURRENTLY ACTIVE]</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="font-medium">Priority Phase Application Deadline</span>
                  <span className="font-semibold text-slate-900">[OFFICIAL DEADLINE REQUIRED]</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="font-medium">Merit List Announcement</span>
                  <span className="font-semibold text-slate-900">[OFFICIAL SCHEDULE REQUIRED]</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="font-medium">Academic Session Orientation</span>
                  <span className="font-semibold text-slate-900">[OFFICIAL SCHEDULE REQUIRED]</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 italic">
                * Note: Specific counseling dates are updated in accordance with university academic notifications.
              </p>
            </div>

            {/* Helpline & Quick Contact */}
            <div className="bg-[#0b132b] text-white p-8 rounded-3xl border border-white/10 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2">
                Admissions Cell
              </span>
              <h3 className="text-2xl font-bold tracking-tight">Need Guidance with Your Application?</h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Our admissions counselors are on campus to assist with program options, scholarships,
                fee schedules, and residential accommodations.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-slate-400 block">Admissions Inquiry Hotline</span>
                  <span className="text-cyan-300 font-mono font-semibold text-base block mt-0.5">
                    +91 680 249 2421 / 2422
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-slate-400 block">Official Admissions Email</span>
                  <span className="text-white font-medium block mt-0.5">admissions@nist.edu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-cyan-600 mx-auto mb-2" />
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-base">{f.q}</h4>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

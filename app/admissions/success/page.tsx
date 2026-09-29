'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Printer,
  Home,
  FileText,
  AlertCircle,
  GraduationCap,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const receiptToken = searchParams.get('receipt') || '';
  const [receipt, setReceipt] = useState<{
    application_number: string;
    student_name: string;
    course: string;
    created_at: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!receiptToken) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    fetch('/api/admissions/receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receipt: receiptToken })
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Receipt verification failed.');
        if (!cancelled) setReceipt(result.data);
      })
      .catch(() => {
        if (!cancelled) setReceipt(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [receiptToken]);

  if (loading) {
    return <div className="p-12 text-center text-slate-500">Verifying your submitted application…</div>;
  }

  if (!receipt) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">No verified application receipt</h1>
        <p className="mt-3 text-slate-600">Submit the admission form to receive a verifiable acknowledgment.</p>
        <a href="/admissions/apply" className="inline-flex mt-6 px-5 py-3 rounded-xl bg-slate-900 text-white">Go to application form</a>
      </div>
    );
  }

  const today = new Date(receipt.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20 w-full">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center print:border-none print:shadow-none">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
          Submission Acknowledged
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Application Submitted Successfully
        </h1>

        {/* Application Number Box */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-center">
          <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
            Your Application Number
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-700 block mt-1 tracking-wide">
            {receipt.application_number}
          </span>
          <p className="text-[11px] text-slate-400 mt-1">
            Please retain this number for all future counseling and admission correspondence.
          </p>
        </div>

        {/* Candidate & Course Summary */}
        <div className="mt-8 text-left border-y border-slate-100 py-6 space-y-3 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-medium">Candidate Name:</span>
            <span className="font-semibold text-slate-900">{receipt.student_name}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-medium">Selected Program:</span>
            <span className="font-semibold text-cyan-800">{receipt.course}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-medium">Submission Date:</span>
            <span className="font-semibold text-slate-900">{today}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-medium">Current Status:</span>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              Pending Review
            </span>
          </div>
        </div>

        {/* Mandatory Policy Notice */}
        <div className="mt-6 p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 text-left flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-cyan-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-cyan-900 leading-relaxed">
            <p className="font-bold">Important Notice:</p>
            <p className="mt-0.5">
              Your application has been received and is subject to review by the university.
              This acknowledgment certifies receipt of your dossier and does not constitute a final
              confirmation of admission. The Admissions Board will verify eligibility and contact you for counseling.
            </p>
          </div>
        </div>

        {/* Actions (Hidden during print) */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print Application Slip</span>
          </button>

          <a
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-cyan-700 transition flex items-center justify-center gap-2 shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdmissionSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-slate-500">
          Loading admission confirmation...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

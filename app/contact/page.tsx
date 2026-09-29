'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Building
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to send message.');
      }

      setSuccessMsg(result.message || 'Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error sending message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-[#0b132b] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
            Inquiries &amp; Admissions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact NIST University
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about academic curricula, admission counseling, campus tours, or
            industry collaborations? Our administrative and admissions team is here to assist.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Campus Address &amp; Info
                </h2>

                <div className="space-y-5 text-sm text-slate-700">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">University Campus</strong>
                      <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                        [OFFICIAL ADDRESS REQUIRED]
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">[OFFICIAL ADDRESS]</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Telephone / Fax</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        [OFFICIAL PHONE REQUIRED]
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">[OFFICIAL PHONE]</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Official Electronic Mail</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        [OFFICIAL EMAIL REQUIRED]
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">[OFFICIAL EMAIL]</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900">Working Office Hours</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        [OFFICIAL OFFICE HOURS REQUIRED]
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Map Placeholder / Embed */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 px-3 py-1 block">
                  Campus Location Map
                </span>
                <div className="h-64 w-full rounded-2xl overflow-hidden mt-2 bg-slate-100 relative">
                  <div className="w-full h-full flex items-center justify-center px-6 text-center text-sm text-slate-500">
                    [OFFICIAL GOOGLE MAPS EMBED URL REQUIRED]
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 px-2 text-center">
                  Replace this placeholder with the university-approved map embed URL.
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900">Send an Official Message</h2>
                <p className="text-slate-600 text-sm mt-1 mb-8">
                  Your inquiry will be logged directly into the university communications database
                  and routed to the relevant academic or administrative officer.
                </p>

                {successMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Message Delivered</p>
                      <p className="text-xs text-emerald-700 mt-0.5">{successMsg}</p>
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Transmission Error</p>
                      <p className="text-xs text-red-700 mt-0.5">{errorMsg}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Alok Tripathy"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="alok@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder="e.g. B.Tech Admissions / Hostel Query"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Message / Inquiry <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Please write your detailed inquiry here..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    id="submit-contact-btn"
                    className="w-full py-4 rounded-xl text-base font-bold text-white bg-slate-900 hover:bg-cyan-700 disabled:opacity-60 transition duration-200 flex items-center justify-center gap-2 shadow-lg"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Official Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

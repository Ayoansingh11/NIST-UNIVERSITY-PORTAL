'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Briefcase,
  User,
  Mail,
  Phone,
  GraduationCap,
  Clock,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function CareerApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = String(params.id || '');

  const [jobTitle, setJobTitle] = useState('NIST Faculty / Staff Position');
  const [loadingJob, setLoadingJob] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    cover_letter: ''
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Fetch jobs to get job title
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const match = data.data.find((j: any) => j.id === jobId);
          if (match) {
            setJobTitle(match.title);
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingJob(false));
  }, [jobId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.phone || !formData.qualification) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!resumeFile) {
      setErrorMsg('Please upload your CV / Resume.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('job_id', jobId);
      payload.append('job_title', jobTitle);
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('qualification', formData.qualification);
      payload.append('experience', formData.experience);
      payload.append('cover_letter', formData.cover_letter);
      payload.append('resume', resumeFile);

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: payload
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit application.');
      }

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error submitting application.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Application Received</h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Thank you for applying for <span className="font-semibold text-slate-900">{jobTitle}</span>.
            Our Human Resources and Academic Selection Board will review your credentials and contact shortlisted applicants.
          </p>
          <div className="mt-8">
            <a
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-cyan-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Career Openings</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Back Link */}
        <div className="mb-6">
          <a
            href="/careers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Openings</span>
          </a>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block mb-1">
            Faculty &amp; Staff Recruitment
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Application: {jobTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Job Reference Code: <span className="font-mono text-slate-700">{jobId}</span>
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Submission Incomplete</p>
              <p className="text-xs text-red-700 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Dr. / Prof. / Mr. / Ms."
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
                placeholder="candidate@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Highest Qualification <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="qualification"
                required
                placeholder="e.g. Ph.D. / M.Tech / M.Sc."
                value={formData.qualification}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Total Relevant Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="experience"
                required
                placeholder="e.g. 5 Years Teaching / 2 Years Industry"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Statement of Purpose / Cover Letter
            </label>
            <textarea
              name="cover_letter"
              rows={4}
              placeholder="Outline your research focus, teaching pedagogy, or professional competencies..."
              value={formData.cover_letter}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Resume Upload */}
          <div className="border border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50/50">
            <Upload className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
            <label className="block text-xs font-bold text-slate-800 mb-1 cursor-pointer">
              Upload Detailed Curriculum Vitae (CV) <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500 mb-3">PDF, DOC, DOCX format (Max 10MB)</p>
            <input
              type="file"
              required
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
            />
            {resumeFile && (
              <p className="text-xs text-cyan-700 font-semibold mt-2">Selected: {resumeFile.name}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            id="submit-career-btn"
            className="w-full py-4 rounded-xl text-base font-bold text-white bg-slate-900 hover:bg-cyan-700 disabled:opacity-60 transition duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Uploading Dossier &amp; Registering Application...</span>
              </>
            ) : (
              <>
                <span>Submit Job Application</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  User,
  BookOpen,
  MapPin,
  Upload,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Camera
} from 'lucide-react';
import { CourseType } from '@/lib/types';

const HOBBIES_LIST = ['Reading', 'Coding', 'Sports', 'Music', 'Photography'];

export default function AdmissionApplyPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    student_name: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
    course: 'B.Tech CSE' as CourseType,
    qualification: '',
    percentage: '',
    passing_year: '2025',
    hobbies: [] as string[],
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHobbyToggle = (hobby: string) => {
    setFormData((prev) => {
      const exists = prev.hobbies.includes(hobby);
      if (exists) {
        return { ...prev, hobbies: prev.hobbies.filter((h) => h !== hobby) };
      } else {
        return { ...prev, hobbies: [...prev.hobbies, hobby] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side required checks
    if (
      !formData.student_name ||
      !formData.email ||
      !formData.phone ||
      !formData.dob ||
      !formData.course ||
      !formData.qualification ||
      !formData.percentage ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setErrorMsg('Please fill in all mandatory fields before submitting.');
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('student_name', formData.student_name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('dob', formData.dob);
      payload.append('gender', formData.gender);
      payload.append('course', formData.course);
      payload.append('qualification', formData.qualification);
      payload.append('percentage', formData.percentage);
      payload.append('passing_year', formData.passing_year);
      payload.append('hobbies', JSON.stringify(formData.hobbies));
      payload.append('address', formData.address);
      payload.append('city', formData.city);
      payload.append('state', formData.state);
      payload.append('pincode', formData.pincode);

      if (photoFile) {
        payload.append('photo', photoFile);
      }
      if (docFile) {
        payload.append('document', docFile);
      }

      const res = await fetch('/api/admissions/apply', {
        method: 'POST',
        body: payload
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit application.');
      }

      // Successful submission -> redirect to success page
      router.push(
        `/admissions/success?receipt=${encodeURIComponent(result.receipt)}`
      );
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during submission. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Form Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>[EDITABLE CONTENT — confirm active academic session]</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            NIST University Admission Form
          </h1>
          <p className="text-slate-600 mt-2 text-sm max-w-xl mx-auto">
            Complete the required fields accurately. Submission acknowledges receipt only and does not confirm admission.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Application Submission Error</p>
              <p className="text-xs text-red-700 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Main Application Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-10"
        >
          {/* SECTION 1: PERSONAL INFORMATION */}
          <div>
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-200">
              <User className="w-5 h-5 text-cyan-600" />
              <h2 className="text-lg font-bold text-slate-900">1. Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="student_name"
                  required
                  placeholder="e.g. Priyanshu Mohanty"
                  value={formData.student_name}
                  onChange={handleInputChange}
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
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: ACADEMIC INFORMATION */}
          <div>
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-200">
              <BookOpen className="w-5 h-5 text-cyan-600" />
              <h2 className="text-lg font-bold text-slate-900">2. Academic Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Course Selection <span className="text-red-500">*</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                >
                  <option value="B.Tech CSE">B.Tech Computer Science &amp; Engineering</option>
                  <option value="B.Tech ECE">B.Tech Electronics &amp; Communication Engineering</option>
                  <option value="B.Tech EEE">B.Tech Electrical &amp; Electronics Engineering</option>
                  <option value="MCA">Master of Computer Applications (MCA)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Previous Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="qualification"
                  required
                  placeholder="e.g. 10+2 Science / Diploma / BCA"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Percentage/CGPA <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="percentage"
                    required
                    placeholder="e.g. 88.5%"
                    value={formData.percentage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Passing Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="passing_year"
                    required
                    placeholder="2025"
                    value={formData.passing_year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: HOBBIES */}
          <div>
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-200">
              <Sparkles className="w-5 h-5 text-cyan-600" />
              <h2 className="text-lg font-bold text-slate-900">3. Co-Curricular Interests &amp; Hobbies</h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Select hobbies and areas of active extracurricular participation:
            </p>

            <div className="flex flex-wrap gap-3">
              {HOBBIES_LIST.map((hobby) => {
                const selected = formData.hobbies.includes(hobby);
                return (
                  <button
                    type="button"
                    key={hobby}
                    onClick={() => handleHobbyToggle(hobby)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                      selected
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}
                    {hobby}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: ADDRESS */}
          <div>
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-200">
              <MapPin className="w-5 h-5 text-cyan-600" />
              <h2 className="text-lg font-bold text-slate-900">4. Permanent / Postal Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Residential Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  placeholder="House/Flat number, Street name, Locality..."
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Bhubaneswar"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="e.g. Odisha"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  placeholder="760002"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: UPLOADS */}
          <div>
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-200">
              <Upload className="w-5 h-5 text-cyan-600" />
              <h2 className="text-lg font-bold text-slate-900">5. Supporting Documents Upload</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Photo */}
              <div className="border border-dashed border-slate-300 rounded-2xl p-5 text-center bg-slate-50/50">
                <Camera className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                <label className="block text-xs font-bold text-slate-800 mb-1 cursor-pointer">
                  Student Passport Photograph
                </label>
                <p className="text-[11px] text-slate-500 mb-3">JPG, PNG format (Max 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  className="text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                />
                {photoFile && (
                  <p className="text-xs text-cyan-700 font-medium mt-2">Selected: {photoFile.name}</p>
                )}
              </div>

              {/* Academic Marksheet */}
              <div className="border border-dashed border-slate-300 rounded-2xl p-5 text-center bg-slate-50/50">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <label className="block text-xs font-bold text-slate-800 mb-1 cursor-pointer">
                  Academic Marksheet / Certificate
                </label>
                <p className="text-[11px] text-slate-500 mb-3">PDF, JPG, PNG format (Max 10MB)</p>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                  className="text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {docFile && (
                  <p className="text-xs text-blue-700 font-medium mt-2">Selected: {docFile.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submission Notice & Submit Button */}
          <div className="pt-6 border-t border-slate-200">
            <div className="bg-slate-50 rounded-xl p-4 mb-6 text-xs text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
              <span>
                By clicking Submit Application, you certify that all information supplied is truthful
                and accurate. Submitted dossiers undergo verification by the NIST University Admissions Board.
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              id="submit-admission-btn"
              className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 hover:from-sky-500 hover:to-cyan-500 disabled:opacity-60 shadow-xl shadow-cyan-500/25 transition duration-200 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Application to University Database...</span>
                </>
              ) : (
                <>
                  <span>Submit Online Application</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

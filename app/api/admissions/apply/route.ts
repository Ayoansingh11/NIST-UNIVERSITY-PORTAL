import { NextRequest, NextResponse } from 'next/server';
import { createAdmission } from '@/lib/db';
import { uploadFile } from '@/lib/storage';
import { CourseType } from '@/lib/types';
import { createAdmissionReceipt } from '@/lib/receipt';

export async function POST(req: NextRequest) {
  if (!process.env.ADMISSION_RECEIPT_SECRET || Buffer.byteLength(process.env.ADMISSION_RECEIPT_SECRET) < 32) {
    return NextResponse.json({ error: 'Admission receipt signing is not configured.' }, { status: 503 });
  }

  try {
    const contentType = req.headers.get('content-type') || '';

    let student_name = '';
    let email = '';
    let phone = '';
    let dob = '';
    let gender = '';
    let course: CourseType = 'B.Tech CSE';
    let qualification = '';
    let percentage = '';
    let passing_year = '';
    let hobbies: string[] = [];
    let address = '';
    let city = '';
    let state = '';
    let pincode = '';
    let photo_url = '';
    let document_url = '';
    let photoFile: File | null = null;
    let docFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      student_name = String(formData.get('student_name') || '').trim();
      email = String(formData.get('email') || '').trim();
      phone = String(formData.get('phone') || '').trim();
      dob = String(formData.get('dob') || '').trim();
      gender = String(formData.get('gender') || '').trim();
      course = (formData.get('course') as CourseType) || 'B.Tech CSE';
      qualification = String(formData.get('qualification') || '').trim();
      percentage = String(formData.get('percentage') || '').trim();
      passing_year = String(formData.get('passing_year') || '').trim();
      address = String(formData.get('address') || '').trim();
      city = String(formData.get('city') || '').trim();
      state = String(formData.get('state') || '').trim();
      pincode = String(formData.get('pincode') || '').trim();

      const hobbiesRaw = formData.get('hobbies');
      if (typeof hobbiesRaw === 'string') {
        try {
          hobbies = JSON.parse(hobbiesRaw);
        } catch {
          hobbies = hobbiesRaw.split(',').map((h) => h.trim()).filter(Boolean);
        }
      }

      const uploadedPhoto = formData.get('photo');
      photoFile = uploadedPhoto && typeof uploadedPhoto !== 'string' ? uploadedPhoto : null;
      const uploadedDocument = formData.get('document');
      docFile = uploadedDocument && typeof uploadedDocument !== 'string' ? uploadedDocument : null;
    } else {
      const body = await req.json();
      student_name = String(body.student_name || '').trim();
      email = String(body.email || '').trim();
      phone = String(body.phone || '').trim();
      dob = String(body.dob || '').trim();
      gender = String(body.gender || '').trim();
      course = body.course || 'B.Tech CSE';
      qualification = String(body.qualification || '').trim();
      percentage = String(body.percentage || '').trim();
      passing_year = String(body.passing_year || '').trim();
      hobbies = Array.isArray(body.hobbies) ? body.hobbies : [];
      address = String(body.address || '').trim();
      city = String(body.city || '').trim();
      state = String(body.state || '').trim();
      pincode = String(body.pincode || '').trim();
      photo_url = body.photo_url || '';
      document_url = body.document_url || '';
    }

    // Validation
    const validCourses: CourseType[] = ['B.Tech CSE', 'B.Tech ECE', 'B.Tech EEE', 'MCA'];
    if (
      !student_name || student_name.length > 120 ||
      !email || email.length > 254 ||
      !phone || phone.length > 24 ||
      !dob || Number.isNaN(Date.parse(dob)) || Date.parse(dob) >= Date.now() ||
      !['Male', 'Female', 'Other'].includes(gender) ||
      !validCourses.includes(course) ||
      !qualification || qualification.length > 120 ||
      !percentage || percentage.length > 30 ||
      !passing_year || !/^\d{4}$/.test(passing_year) ||
      !address || address.length > 500 ||
      !city || city.length > 120 || !state || state.length > 120 ||
      !/^\d{4,10}$/.test(pincode)
    ) {
      return NextResponse.json(
        { error: 'Please provide valid values for all required personal, academic, and address fields.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!/^\+?[\d\s().-]{7,24}$/.test(phone)) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }
    if (hobbies.length > 10 || hobbies.some((hobby) => typeof hobby !== 'string' || hobby.length > 40)) {
      return NextResponse.json({ error: 'Please select valid hobbies.' }, { status: 400 });
    }
    if (photoFile && (!photoFile.type.startsWith('image/') || photoFile.size > 5 * 1024 * 1024)) {
      return NextResponse.json({ error: 'Student photos must be JPG, PNG, or WebP and no larger than 5 MB.' }, { status: 400 });
    }
    if (docFile && docFile.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Academic documents must be PDF files.' }, { status: 400 });
    }
    if (photoFile) photo_url = await uploadFile(photoFile, 'admissions');
    if (docFile) document_url = await uploadFile(docFile, 'admissions');

    const admission = await createAdmission({
      student_name,
      email,
      phone,
      dob,
      gender,
      course,
      qualification,
      percentage,
      passing_year,
      hobbies,
      address,
      city,
      state,
      pincode,
      photo_url,
      document_url
    });

    return NextResponse.json({
      success: true,
      message: 'Admission application submitted successfully',
      receipt: createAdmissionReceipt(admission.application_number)
    });
  } catch (error) {
    console.error('Admission submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process admission application. Please check details and try again.' },
      { status: 500 }
    );
  }
}

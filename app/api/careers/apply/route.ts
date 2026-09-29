import { NextRequest, NextResponse } from 'next/server';
import { createCareerApplication, getCareerJobById } from '@/lib/db';
import { uploadFile } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let job_id = '';
    let job_title = '';
    let name = '';
    let email = '';
    let phone = '';
    let qualification = '';
    let experience = '';
    let cover_letter = '';
    let resume_url = '';
    let resumeFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      job_id = String(formData.get('job_id') || '').trim();
      job_title = String(formData.get('job_title') || '').trim();
      name = String(formData.get('name') || '').trim();
      email = String(formData.get('email') || '').trim();
      phone = String(formData.get('phone') || '').trim();
      qualification = String(formData.get('qualification') || '').trim();
      experience = String(formData.get('experience') || '').trim();
      cover_letter = String(formData.get('cover_letter') || '').trim();

      const uploadedResume = formData.get('resume');
      resumeFile = uploadedResume && typeof uploadedResume !== 'string' ? uploadedResume : null;
    } else {
      const body = await req.json();
      job_id = String(body.job_id || '').trim();
      job_title = String(body.job_title || '').trim();
      name = String(body.name || '').trim();
      email = String(body.email || '').trim();
      phone = String(body.phone || '').trim();
      qualification = String(body.qualification || '').trim();
      experience = String(body.experience || '').trim();
      cover_letter = String(body.cover_letter || '').trim();
      resume_url = body.resume_url || '';
    }

    if (!job_id || !name || name.length > 120 || !email || email.length > 254 || !phone || phone.length > 24 || !qualification || qualification.length > 160 || experience.length > 120 || cover_letter.length > 5000) {
      return NextResponse.json(
        { error: 'Please provide valid values for all required application fields.' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+?[\d\s().-]{7,24}$/.test(phone)) {
      return NextResponse.json({ error: 'Please enter a valid email address and phone number.' }, { status: 400 });
    }
    const job = await getCareerJobById(job_id);
    if (!job || !job.active) {
      return NextResponse.json({ error: 'This job opening is no longer available.' }, { status: 404 });
    }
    if (!resumeFile || !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(resumeFile.type)) {
      return NextResponse.json({ error: 'Please attach your resume as a PDF, DOC, or DOCX file.' }, { status: 400 });
    }
    resume_url = await uploadFile(resumeFile, 'resumes');

    const application = await createCareerApplication({
      job_id,
      job_title: job.title,
      name,
      email,
      phone,
      qualification,
      experience,
      cover_letter,
      resume_url
    });

    return NextResponse.json({
      success: true,
      message: 'Career application submitted successfully',
      data: application
    });
  } catch (error) {
    console.error('Career application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit career application. Please check your submission and try again.' },
      { status: 500 }
    );
  }
}

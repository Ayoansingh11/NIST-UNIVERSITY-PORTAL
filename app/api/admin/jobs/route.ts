import { NextRequest, NextResponse } from 'next/server';
import { getCareerJobs, saveCareerJob } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { CareerJob } from '@/lib/types';

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobs = await getCareerJobs();
  return NextResponse.json({ success: true, data: jobs });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const title = String(body.title || '').trim();
  const department = String(body.department || '').trim();
  const description = String(body.description || '').trim();

  if (!title || !department || !description) {
    return NextResponse.json({ error: 'Title, department, and description are required' }, { status: 400 });
  }

  const job: CareerJob = {
    id: body.id || `job-${Date.now()}`,
    title,
    department,
    location: body.location || 'NIST Campus',
    employment_type: body.employment_type || 'Full-Time',
    experience: body.experience || '2+ Years',
    description,
    responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
    requirements: Array.isArray(body.requirements) ? body.requirements : [],
    active: body.active !== undefined ? Boolean(body.active) : true,
    created_at: body.created_at || new Date().toISOString()
  };

  const saved = await saveCareerJob(job);
  return NextResponse.json({ success: true, data: saved });
}

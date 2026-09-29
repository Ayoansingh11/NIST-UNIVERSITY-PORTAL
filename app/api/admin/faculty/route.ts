import { NextRequest, NextResponse } from 'next/server';
import { getFaculty, saveFaculty } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { Faculty } from '@/lib/types';

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const faculty = await getFaculty();
  return NextResponse.json({ success: true, data: faculty });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const name = String(body.name || '').trim();
  const department = String(body.department || '').trim();
  const designation = String(body.designation || '').trim();
  const experience = String(body.experience || '').trim();

  if (!name || !department || !designation) {
    return NextResponse.json({ error: 'Name, department, and designation are required' }, { status: 400 });
  }

  const faculty: Faculty = {
    id: body.id || `fac-${Date.now()}`,
    name,
    department,
    designation,
    experience: experience || '5+ Years',
    email: body.email || '',
    specialization: body.specialization || '',
    image_url: body.image_url || ''
  };

  const saved = await saveFaculty(faculty);
  return NextResponse.json({ success: true, data: saved });
}

import { NextResponse } from 'next/server';
import { getCareerApplications } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const applications = await getCareerApplications();
  return NextResponse.json({ success: true, data: applications });
}

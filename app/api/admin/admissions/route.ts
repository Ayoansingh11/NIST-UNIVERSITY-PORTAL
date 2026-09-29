import { NextResponse } from 'next/server';
import { getAdmissions } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const admissions = await getAdmissions();
  return NextResponse.json({ success: true, data: admissions });
}

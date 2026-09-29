import { NextResponse } from 'next/server';
import { getCareerJobs } from '@/lib/db';

export async function GET() {
  const jobs = await getCareerJobs();
  const activeJobs = jobs.filter((j) => j.active);
  return NextResponse.json({ success: true, data: activeJobs });
}

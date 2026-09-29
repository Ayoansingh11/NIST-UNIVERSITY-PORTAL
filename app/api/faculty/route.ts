import { NextResponse } from 'next/server';
import { getFaculty } from '@/lib/db';

export async function GET() {
  const faculty = await getFaculty();
  return NextResponse.json({ success: true, data: faculty });
}

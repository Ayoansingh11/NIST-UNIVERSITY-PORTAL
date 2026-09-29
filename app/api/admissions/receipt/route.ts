import { NextRequest, NextResponse } from 'next/server';
import { getAdmissionByNumber } from '@/lib/db';
import { verifyAdmissionReceipt } from '@/lib/receipt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const applicationNumber = typeof body.receipt === 'string'
      ? verifyAdmissionReceipt(body.receipt)
      : null;
    if (!applicationNumber) {
      return NextResponse.json({ error: 'This application receipt is invalid or has expired.' }, { status: 401 });
    }

    const admission = await getAdmissionByNumber(applicationNumber);
    if (!admission) return NextResponse.json({ error: 'Application receipt not found.' }, { status: 404 });

    return NextResponse.json({
      success: true,
      data: {
        application_number: admission.application_number,
        student_name: admission.student_name,
        course: admission.course,
        created_at: admission.created_at
      }
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Admission receipt lookup error:', error);
    return NextResponse.json({ error: 'Unable to verify the application receipt.' }, { status: 500 });
  }
}

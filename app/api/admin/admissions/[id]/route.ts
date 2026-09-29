import { NextRequest, NextResponse } from 'next/server';
import { updateAdmissionStatus, deleteAdmission } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { AdmissionStatus } from '@/lib/types';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const status = body.status as AdmissionStatus;

  if (!status) {
    return NextResponse.json({ error: 'Status is required' }, { status: 400 });
  }

  const updated = await updateAdmissionStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: 'Record not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: `Status updated to ${status}` });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await deleteAdmission(id);
  return NextResponse.json({ success: true, message: 'Admission record deleted' });
}

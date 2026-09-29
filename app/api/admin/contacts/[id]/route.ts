import { NextRequest, NextResponse } from 'next/server';
import { updateContactStatus, deleteContactMessage } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { ContactStatus } from '@/lib/types';

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
  const status = body.status as ContactStatus;

  if (!status) {
    return NextResponse.json({ error: 'Status is required' }, { status: 400 });
  }

  const updated = await updateContactStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
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
  await deleteContactMessage(id);
  return NextResponse.json({ success: true, message: 'Message deleted' });
}

import { NextRequest, NextResponse } from 'next/server';
import { deleteNotice } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await deleteNotice(id);
  return NextResponse.json({ success: true, message: 'Notice deleted successfully' });
}

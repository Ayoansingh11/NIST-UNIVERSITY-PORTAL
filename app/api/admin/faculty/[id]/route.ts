import { NextRequest, NextResponse } from 'next/server';
import { deleteFaculty } from '@/lib/db';
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
  await deleteFaculty(id);
  return NextResponse.json({ success: true, message: 'Faculty member removed' });
}

import { NextResponse } from 'next/server';
import { getContactMessages } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const messages = await getContactMessages();
  return NextResponse.json({ success: true, data: messages });
}

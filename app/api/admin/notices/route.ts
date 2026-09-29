import { NextRequest, NextResponse } from 'next/server';
import { getNotices, saveNotice } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { Notice } from '@/lib/types';

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const notices = await getNotices();
  return NextResponse.json({ success: true, data: notices });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const title = String(body.title || '').trim();
  const category = body.category || 'General';
  const content = String(body.content || '').trim();
  const date = String(body.date || new Date().toISOString().split('T')[0]);
  const published = body.published !== undefined ? Boolean(body.published) : true;
  const attachment = body.attachment || '';

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  const notice: Notice = {
    id: body.id || `not-${Date.now()}`,
    title,
    category,
    content,
    date,
    attachment,
    published,
    created_at: body.created_at || new Date().toISOString()
  };

  const saved = await saveNotice(notice);
  return NextResponse.json({ success: true, data: saved });
}

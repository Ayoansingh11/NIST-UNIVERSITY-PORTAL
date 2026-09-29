import { NextResponse } from 'next/server';
import { getNotices } from '@/lib/db';

export async function GET() {
  const notices = await getNotices();
  // Filter for published notices on public API
  const published = notices.filter((n) => n.published);
  return NextResponse.json({ success: true, data: published });
}

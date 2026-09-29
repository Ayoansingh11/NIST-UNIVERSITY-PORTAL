import { NextResponse } from 'next/server';
import { getGalleryItems } from '@/lib/db';

export async function GET() {
  const items = await getGalleryItems();
  return NextResponse.json({ success: true, data: items });
}

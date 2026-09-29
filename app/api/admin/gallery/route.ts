import { NextRequest, NextResponse } from 'next/server';
import { getGalleryItems, saveGalleryItem } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { GalleryItem } from '@/lib/types';

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const items = await getGalleryItems();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const title = String(body.title || '').trim();
  const image_url = String(body.image_url || '').trim();
  const category = body.category || 'Campus';

  if (!title || !image_url) {
    return NextResponse.json({ error: 'Title and Image URL are required' }, { status: 400 });
  }

  const item: GalleryItem = {
    id: body.id || `gal-${Date.now()}`,
    title,
    category,
    image_url,
    caption: body.caption || '',
    created_at: body.created_at || new Date().toISOString()
  };

  const saved = await saveGalleryItem(item);
  return NextResponse.json({ success: true, data: saved });
}

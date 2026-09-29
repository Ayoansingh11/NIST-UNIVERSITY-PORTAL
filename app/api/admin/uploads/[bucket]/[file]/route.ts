import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';

type PrivateBucket = 'admissions' | 'resumes';
const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bucket: string; file: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { bucket, file } = await params;
  if ((bucket !== 'admissions' && bucket !== 'resumes') || !/^[\da-f-]{36}\.(jpg|png|webp|pdf|doc|docx)$/.test(file)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const contentType = MIME_TYPES[path.extname(file)];
  try {
    let bytes: Uint8Array;
    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin.storage.from(bucket as PrivateBucket).download(file);
      if (error || !data) return NextResponse.json({ error: 'File not found' }, { status: 404 });
      bytes = new Uint8Array(await data.arrayBuffer());
    } else {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Private file storage is not configured' }, { status: 503 });
      }
      const localPath = path.join(process.cwd(), '.data', 'uploads', bucket, file);
      bytes = await fs.readFile(localPath);
    }

    return new Response(bytes, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentType.startsWith('image/') ? 'inline' : 'attachment',
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

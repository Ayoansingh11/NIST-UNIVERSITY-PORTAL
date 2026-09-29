import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { isSupabaseConfigured, supabaseAdmin } from './supabase';

const FILE_RULES = {
  admissions: {
    maxBytes: 10 * 1024 * 1024,
    types: new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
  },
  resumes: {
    maxBytes: 10 * 1024 * 1024,
    types: new Set([
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ])
  },
  gallery: {
    maxBytes: 10 * 1024 * 1024,
    types: new Set(['image/jpeg', 'image/png', 'image/webp'])
  }
} as const;

const EXTENSIONS: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
};

export async function uploadFile(
  file: File,
  bucket: 'admissions' | 'resumes' | 'gallery'
): Promise<string> {
  const rule = FILE_RULES[bucket];
  if (!file.size || file.size > rule.maxBytes || !rule.types.has(file.type as never)) {
    throw new Error(`Unsupported file. Check the accepted file types and ${rule.maxBytes / 1024 / 1024} MB size limit.`);
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = EXTENSIONS[file.type];
  const fileName = `${randomUUID()}${ext}`;

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });
    if (error || !data) {
      throw new Error(`File storage failed: ${error?.message || 'No storage result was returned.'}`);
    }

    if (bucket === 'gallery') {
      return supabaseAdmin.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
    }
    return `/api/admin/uploads/${bucket}/${fileName}`;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Supabase Storage must be configured before accepting uploads in production.');
  }

  const isPublic = bucket === 'gallery';
  const uploadsDir = isPublic
    ? path.join(process.cwd(), 'public', 'uploads', bucket)
    : path.join(process.cwd(), '.data', 'uploads', bucket);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, fileName);
  fs.writeFileSync(filePath, buffer);

  return isPublic ? `/uploads/${bucket}/${fileName}` : `/api/admin/uploads/${bucket}/${fileName}`;
}

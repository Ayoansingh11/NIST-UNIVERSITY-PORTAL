import { cookies } from 'next/headers';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const SESSION_COOKIE_NAME = 'nist_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && Buffer.byteLength(secret) >= 32 ? secret : null;
}

function sign(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export async function verifyAdminCredentials(email: string, pass: string): Promise<boolean> {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword || !sessionSecret()) return false;
  return safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase()) &&
    safeEqual(pass, expectedPassword);
}

export async function setAdminSession(): Promise<void> {
  const secret = sessionSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET must contain at least 32 bytes.');

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${expiresAt}.${randomBytes(32).toString('base64url')}`;
  const token = `${payload}.${sign(payload, secret)}`;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = sessionSecret();
  if (!secret) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;

  const [expiresAt, nonce, signature, extra] = token.split('.');
  if (!expiresAt || !nonce || !signature || extra !== undefined) return false;
  const payload = `${expiresAt}.${nonce}`;
  const expiry = Number(expiresAt);
  return Number.isSafeInteger(expiry) && expiry > Math.floor(Date.now() / 1000) &&
    safeEqual(signature, sign(payload, secret));
}

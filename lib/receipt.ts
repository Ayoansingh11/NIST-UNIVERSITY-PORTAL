import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const RECEIPT_TTL_SECONDS = 60 * 60;

function getReceiptSecret(): string {
  const secret = process.env.ADMISSION_RECEIPT_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error('ADMISSION_RECEIPT_SECRET must contain at least 32 bytes.');
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac('sha256', getReceiptSecret()).update(payload).digest('base64url');
}

export function createAdmissionReceipt(applicationNumber: string): string {
  const expiresAt = Math.floor(Date.now() / 1000) + RECEIPT_TTL_SECONDS;
  const payload = `${applicationNumber}.${expiresAt}.${randomBytes(16).toString('base64url')}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdmissionReceipt(token: string): string | null {
  try {
    const [applicationNumber, expiresAtText, nonce, signature, extra] = token.split('.');
    if (!applicationNumber || !expiresAtText || !nonce || !signature || extra !== undefined) return null;
    const expiresAt = Number(expiresAtText);
    if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return null;

    const payload = `${applicationNumber}.${expiresAtText}.${nonce}`;
    const expected = Buffer.from(sign(payload));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
    return applicationNumber;
  } catch {
    return null;
  }
}

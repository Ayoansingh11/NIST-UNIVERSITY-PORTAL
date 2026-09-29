import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, setAdminSession, clearAdminSession, isAdminAuthenticated } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const isValid = await verifyAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid admin credentials. Please verify your email and password.' },
        { status: 401 }
      );
    }

    await setAdminSession();
    return NextResponse.json({ success: true, message: 'Admin authentication successful' });
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}

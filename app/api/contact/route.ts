import { NextRequest, NextResponse } from 'next/server';
import { createContactMessage } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const subject = String(body.subject || '').trim();
    const message = String(body.message || '').trim();

    if (!name || name.length > 120 || !email || email.length > 254 || !subject || subject.length > 180 || !message || message.length > 5000 || phone.length > 24) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required fields.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (phone && !/^\+?[\d\s().-]{7,24}$/.test(phone)) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    const newMsg = await createContactMessage({
      name,
      email,
      phone,
      subject,
      message
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been received and recorded. It has not been marked as replied.',
      data: newMsg
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

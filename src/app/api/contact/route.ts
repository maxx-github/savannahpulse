import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, createContactFormEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.fullName || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await sendEmail(createContactFormEmail(body));
    
    await sendEmail({
      to: body.email,
      subject: 'Thank you for contacting SavannahPulse',
      html: `<p>Dear ${body.fullName}, we received your message and will respond within 24 hours.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
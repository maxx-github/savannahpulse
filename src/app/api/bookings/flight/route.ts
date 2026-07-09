import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, createBookingConfirmationEmail, createAdminNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.from || !body.to || !body.departureDate || !body.fullName || !body.email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const bookingId = body.ticketId || `FL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    await sendEmail(createBookingConfirmationEmail('flight', body, bookingId));
    await sendEmail(createAdminNotification('Flight Booking', body));

    return NextResponse.json({ success: true, bookingId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
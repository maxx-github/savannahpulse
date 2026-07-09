import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, createBookingConfirmationEmail, createAdminNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.hotelName || !body.checkIn || !body.checkOut || !body.fullName || !body.email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const bookingId = `HT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    await sendEmail(createBookingConfirmationEmail('hotel', body, bookingId));
    await sendEmail(createAdminNotification('Hotel Reservation', body));

    return NextResponse.json({ success: true, bookingId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendDigitalTicket } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    await sendDigitalTicket(booking);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend ticket error:', error);
    return NextResponse.json({ error: 'Failed to resend ticket' }, { status: 500 });
  }
}

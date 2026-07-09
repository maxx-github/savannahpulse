import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { ticketId, email } = await request.json();

    if (!ticketId && !email) {
      return NextResponse.json({ error: 'Please provide either a ticket ID or email' }, { status: 400 });
    }

    let bookings;

    if (ticketId) {
      bookings = await prisma.booking.findMany({
        where: { ticketId: { contains: ticketId } },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      bookings = await prisma.booking.findMany({
        where: { email: { equals: email, mode: 'insensitive' } },
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Track booking error:', error);
    return NextResponse.json({ error: 'Failed to find bookings' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketId, email } = body;

    if (!ticketId && !email) {
      return NextResponse.json(
        { error: 'Please provide either a ticket ID or email address' },
        { status: 400 }
      );
    }

    let bookings;

    if (ticketId) {
      bookings = await prisma.booking.findMany({
        where: {
          ticketId: {
            contains: ticketId.trim(),
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // SQLite doesn't support mode: 'insensitive', so we fetch all and filter
      const emailLower = email.trim().toLowerCase();
      
      const allBookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
      });
      
      // Filter in memory for case-insensitive match
      bookings = allBookings.filter(
        b => b.email.toLowerCase() === emailLower
      );
    }

    return NextResponse.json({ 
      success: true, 
      bookings,
      count: bookings.length,
    });
  } catch (error) {
    console.error('Track booking error:', error);
    return NextResponse.json(
      { error: 'Failed to find bookings. Please try again.' },
      { status: 500 }
    );
  }
}
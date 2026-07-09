import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketId, email } = body;

    // Validate input
    if (!ticketId && !email) {
      return NextResponse.json(
        { error: 'Please provide either a ticket ID or email address' },
        { status: 400 }
      );
    }

    let bookings;

    if (ticketId) {
      // Search by ticket ID (partial match supported)
      bookings = await prisma.booking.findMany({
        where: {
          ticketId: {
            contains: ticketId.trim(),
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // Search by email - SQLite compatible (case-insensitive)
      // Since SQLite doesn't support mode: 'insensitive', we search with lowercase
      const emailLower = email.trim().toLowerCase();
      
      bookings = await prisma.booking.findMany({
        where: {
          email: emailLower,
        },
        orderBy: { createdAt: 'desc' },
      });

      // If no exact match, try case-insensitive search
      if (bookings.length === 0) {
        bookings = await prisma.booking.findMany({
          orderBy: { createdAt: 'desc' },
        });
        
        // Filter in memory for case-insensitive match
        bookings = bookings.filter(
          b => b.email.toLowerCase() === emailLower
        );
      }
    }

    // Remove sensitive data before sending to client
    const sanitizedBookings = bookings.map(booking => ({
      id: booking.id,
      ticketId: booking.ticketId,
      type: booking.type,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      createdAt: booking.createdAt,
      from: booking.from,
      to: booking.to,
      departureDate: booking.departureDate,
      returnDate: booking.returnDate,
      passengers: booking.passengers,
      class: booking.class,
      fullName: booking.fullName,
      email: booking.email,
      phone: booking.phone,
      whatsapp: booking.whatsapp,
      specialRequests: booking.specialRequests,
    }));

    return NextResponse.json({ 
      success: true, 
      bookings: sanitizedBookings,
      count: sanitizedBookings.length,
    });
  } catch (error) {
    console.error('Track booking error:', error);
    return NextResponse.json(
      { error: 'Failed to find bookings. Please try again.' },
      { status: 500 }
    );
  }
}
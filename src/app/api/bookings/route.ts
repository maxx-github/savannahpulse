import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { sendDigitalTicket } from '@/lib/email';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { 
        OR: [
          { userId: (session.user as any).id },
          { email: session.user.email }
        ]
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    let userId: string | null = null;
    try {
      const session = await auth();
      if (session?.user) {
        userId = (session.user as any).id;
      }
    } catch (error) {
      console.log('Guest booking - no user session');
    }

    const booking = await prisma.booking.create({
      data: {
        ticketId,
        type: body.type || 'destination',
        status: 'pending',
        paymentStatus: 'unpaid',
        from: body.from || body.pickupLocation,
        to: body.to || body.dropoffLocation,
        departureDate: body.departureDate || body.pickupDate,
        returnDate: body.returnDate || body.dropoffDate,
        passengers: body.passengers,
        class: body.class || body.vehicleCategory,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        whatsapp: body.whatsapp,
        specialRequests: body.specialRequests,
        userId: userId,
      },
    });

    await sendDigitalTicket(booking);

    return NextResponse.json({ success: true, ticketId: booking.ticketId });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

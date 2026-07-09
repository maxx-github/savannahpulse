import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    return NextResponse.json({ 
      authenticated: !!session,
      user: session?.user || null 
    });
  } catch (error) {
    console.error('Test auth error:', error);
    return NextResponse.json({ 
      authenticated: false,
      error: 'Auth system error'
    }, { status: 500 });
  }
}

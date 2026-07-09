const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log(' Setting up SavannahPulse...\n');

// 1. Create Next.js app
console.log('📦 Creating Next.js app...');
try {
  execSync('npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"', { stdio: 'inherit' });
} catch (e) {
  console.log('App might already exist, continuing...');
}

// 2. Install dependencies
console.log('\n📥 Installing dependencies...');
try {
  execSync('npm install framer-motion react-icons nodemailer zod', { stdio: 'inherit' });
  execSync('npm install -D @types/nodemailer', { stdio: 'inherit' });
} catch (e) {
  console.error('Failed to install dependencies. Please run: npm install framer-motion react-icons nodemailer zod @types/nodemailer');
}

// 3. Create folder structure
console.log('\n📁 Creating folder structure...');
const dirs = [
  'src/app/destinations/diani-beach',
  'src/app/destinations/maasai-mara',
  'src/app/destinations/mount-kenya',
  'src/app/destinations/lamu-old-town',
  'src/app/flights',
  'src/app/hotels',
  'src/app/culture',
  'src/app/contact',
  'src/app/api/bookings/flight',
  'src/app/api/bookings/hotel',
  'src/app/api/bookings/destination',
  'src/app/api/contact',
  'src/components',
  'src/lib',
  'src/types'
];

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// 4. Write simple config files
console.log('📝 Writing configuration files...');

fs.writeFileSync('.env.local', `# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=SavannahPulse <your-email@gmail.com>

# Admin Email
ADMIN_EMAIL=admin@savannahpulse.co.ke
`);

fs.writeFileSync('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
`);

fs.writeFileSync('src/middleware.ts', `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto');
    if (proto === 'http') {
      return NextResponse.redirect(request.url.replace('http://', 'https://'), 301);
    }
  }

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
`);

fs.writeFileSync('src/types/index.ts', `export interface FlightBooking {
  from: string;
  to: string;
  departureDate: string;
  passengers: number;
  class: 'economy' | 'business' | 'first';
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface HotelReservation {
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface DestinationBooking {
  destination: string;
  travelDate: string;
  travelers: number;
  packageType: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface ContactForm {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}
`);

console.log('\n✅ Project structure created successfully!');
console.log('\n📋 Next steps:');
console.log('1. Copy the code for the main pages (Navbar, Footer, page.tsx, etc.) from the previous messages.');
console.log('2. Update .env.local with your email credentials.');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000\n');
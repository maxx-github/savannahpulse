import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/bookings', '/api/'], // Keep private pages hidden from Google
    },
    sitemap: 'https://savannahpulse.co.ke/sitemap.xml', // Replace with your domain
  }
}
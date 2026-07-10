import nodemailer from 'nodemailer';
import { EmailTemplate } from '@/types';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendEmail = async (template: EmailTemplate) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: template.to,
      subject: template.subject,
      html: template.html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: 'Failed to send email' };
  }
};

export const createBookingConfirmationEmail = (
  type: 'flight' | 'hotel' | 'destination' | 'car-hire',
  data: any,
  bookingId: string
): EmailTemplate => {
  const subjects = {
    flight: `✈️ Flight Booking Confirmation - ${bookingId}`,
    hotel: `🏨 Hotel Reservation - ${bookingId}`,
    destination: `🌍 Trip Booking - ${bookingId}`,
    'car-hire': `🚗 Car Hire Request - ${bookingId}`,
  };

  return {
    to: data.email,
    subject: subjects[type] || 'Booking Confirmation',
    html: `
      <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #2a2520; padding: 30px; border-radius: 10px; color: white;">
          <h1 style="color: #f4a940;">SavannahPulse</h1>
          <h2>Booking Confirmation</h2>
          <p>Reference: <strong style="color: #f4a940;">${bookingId}</strong></p>
          <p>Thank you, ${data.fullName}! We'll contact you within 24 hours.</p>
        </div>
      </div>
    `,
  };
};

export const createContactFormEmail = (data: any): EmailTemplate => ({
  to: process.env.ADMIN_EMAIL || 'admin@hospitalityarc.com',
  subject: `📩 Contact Form: ${data.subject}`,
  html: `
    <div style="font-family: Arial; padding: 20px;">
      <h1 style="color: #f4a940;">New Contact Message</h1>
      <p><strong>From:</strong> ${data.fullName} (${data.email})</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    </div>
  `,
});

export const createAdminNotification = (type: string, data: any): EmailTemplate => ({
  to: process.env.ADMIN_EMAIL || 'admin@hospitalityarc.com',
  subject: `🔔 New ${type} Submission`,
  html: `<p>New ${type} from ${data.fullName || data.email}</p>`,
});

export const sendDigitalTicket = async (booking: any) => {
  const typeLabel = booking.type === 'car-hire' ? 'Car Hire' : 
                    booking.type.charAt(0).toUpperCase() + booking.type.slice(1);
  
  const ticketHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Digital Ticket - ${booking.ticketId}</title>
</head>
<body style="margin: 0; padding: 0; background: #1f1b18; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #1f1b18; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="text-align: center; padding: 30px 0;">
              <h1 style="color: #f4a940; margin: 0; font-size: 32px; font-family: Georgia, serif;">
                Savannah<span style="color: white;">Pulse</span>
              </h1>
              <p style="color: #a8a098; margin: 8px 0 0 0; font-size: 12px; letter-spacing: 3px;">
                DISCOVER THE HEART OF KENYA
              </p>
            </td>
          </tr>

          <!-- Ticket Card -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #2a2520; border-radius: 16px; overflow: hidden; border: 1px solid #4a4239;">
                
                <!-- Ticket Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #f4a940 0%, #e09530 100%); padding: 24px; text-align: center;">
                    <div style="color: #2a2520; font-size: 11px; letter-spacing: 3px; margin-bottom: 8px;">
                      DIGITAL ${typeLabel.toUpperCase()} TICKET
                    </div>
                    <div style="color: #2a2520; font-size: 24px; font-weight: bold; font-family: Georgia, serif;">
                      ${booking.ticketId}
                    </div>
                  </td>
                </tr>

                <!-- Status Bar -->
                <tr>
                  <td style="background: #352f2a; padding: 16px 24px; text-align: center;">
                    <span style="display: inline-block; padding: 6px 16px; border-radius: 20px; background: rgba(244, 169, 64, 0.2); color: #f4a940; font-size: 12px; font-weight: bold; letter-spacing: 1px;">
                      ● STATUS: ${booking.status.toUpperCase()}
                    </span>
                  </td>
                </tr>

                <!-- Route / Details Section -->
                <tr>
                  <td style="padding: 32px 24px;">
                    ${booking.from && booking.to ? `
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="40%" style="text-align: center; vertical-align: top;">
                            <div style="color: #a8a098; font-size: 11px; letter-spacing: 2px; margin-bottom: 8px;">FROM</div>
                            <div style="color: white; font-size: 24px; font-weight: bold; font-family: Georgia, serif;">
                              ${booking.from}
                            </div>
                            ${booking.departureDate ? `<div style="color: #a8a098; font-size: 12px; margin-top: 4px;">${booking.departureDate}</div>` : ''}
                          </td>
                          <td width="20%" style="text-align: center; vertical-align: middle;">
                            <div style="color: #f4a940; font-size: 24px;">✈</div>
                          </td>
                          <td width="40%" style="text-align: center; vertical-align: top;">
                            <div style="color: #a8a098; font-size: 11px; letter-spacing: 2px; margin-bottom: 8px;">TO</div>
                            <div style="color: white; font-size: 24px; font-weight: bold; font-family: Georgia, serif;">
                              ${booking.to}
                            </div>
                            ${booking.returnDate ? `<div style="color: #a8a098; font-size: 12px; margin-top: 4px;">${booking.returnDate}</div>` : ''}
                          </td>
                        </tr>
                      </table>
                      <div style="border-top: 1px dashed #4a4239; margin: 24px 0;"></div>
                    ` : ''}

                    <!-- Passenger Info -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                      <tr>
                        <td width="50%" style="padding: 8px 0;">
                          <div style="color: #a8a098; font-size: 10px; letter-spacing: 2px;">PASSENGER</div>
                          <div style="color: white; font-size: 14px; font-weight: bold; margin-top: 4px;">${booking.fullName}</div>
                        </td>
                        <td width="50%" style="padding: 8px 0; text-align: right;">
                          <div style="color: #a8a098; font-size: 10px; letter-spacing: 2px;">BOOKED ON</div>
                          <div style="color: white; font-size: 14px; font-weight: bold; margin-top: 4px;">${new Date(booking.createdAt).toLocaleDateString()}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <div style="color: #a8a098; font-size: 10px; letter-spacing: 2px;">EMAIL</div>
                          <div style="color: white; font-size: 14px; margin-top: 4px;">${booking.email}</div>
                        </td>
                        <td style="padding: 8px 0; text-align: right;">
                          <div style="color: #a8a098; font-size: 10px; letter-spacing: 2px;">PHONE</div>
                          <div style="color: white; font-size: 14px; margin-top: 4px;">${booking.phone || '—'}</div>
                        </td>
                      </tr>
                    </table>

                    ${booking.specialRequests ? `
                      <div style="background: #1f1b18; border-radius: 8px; padding: 16px; margin-top: 16px;">
                        <div style="color: #a8a098; font-size: 10px; letter-spacing: 2px; margin-bottom: 8px;">SPECIAL REQUESTS</div>
                        <div style="color: white; font-size: 13px; line-height: 1.5;">${booking.specialRequests}</div>
                      </div>
                    ` : ''}
                  </td>
                </tr>

                <!-- Tear Line -->
                <tr>
                  <td style="padding: 0 24px;">
                    <div style="border-top: 2px dashed #4a4239; position: relative;">
                      <div style="position: absolute; left: -12px; top: -12px; width: 24px; height: 24px; background: #1f1b18; border-radius: 50%;"></div>
                      <div style="position: absolute; right: -12px; top: -12px; width: 24px; height: 24px; background: #1f1b18; border-radius: 50%;"></div>
                    </div>
                  </td>
                </tr>

                <!-- Barcode Section -->
                <tr>
                  <td style="padding: 24px; text-align: center; background: #1f1b18;">
                    <div style="font-family: monospace; font-size: 14px; letter-spacing: 4px; color: #f4a940; margin-bottom: 8px;">
                      ||||| ${booking.ticketId} |||||
                    </div>
                    <div style="color: #a8a098; font-size: 11px;">
                      Present this ticket ID when checking in
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Track Booking Button -->
          <tr>
            <td style="padding: 32px 0; text-align: center;">
              <a href="http://localhost:3000/track-booking" style="display: inline-block; background: #f4a940; color: #2a2520; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Track Your Booking →
              </a>
            </td>
          </tr>

          <!-- What's Next -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #2a2520; border-radius: 12px; padding: 24px; border: 1px solid #4a4239;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="color: #f4a940; margin: 0 0 16px 0; font-family: Georgia, serif;">What happens next?</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: white; font-size: 13px;">
                          <span style="color: #f4a940; font-weight: bold;">1.</span> Our team reviews your request within 24 hours
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: white; font-size: 13px;">
                          <span style="color: #f4a940; font-weight: bold;">2.</span> We contact you with confirmation & payment details
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: white; font-size: 13px;">
                          <span style="color: #f4a940; font-weight: bold;">3.</span> After payment, your booking is finalized
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: white; font-size: 13px;">
                          <span style="color: #f4a940; font-weight: bold;">4.</span> You receive your final ticket & travel documents
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 32px 0; text-align: center;">
              <p style="color: #a8a098; font-size: 13px; margin: 0 0 8px 0;">
                Need help? Contact us:
              </p>
              <p style="color: white; font-size: 13px; margin: 0;">
                📧 hello@hospitalityarc.com &nbsp;&nbsp;|&nbsp;&nbsp; 📱 +254 700 000 000
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align: center; padding: 24px 0; border-top: 1px solid #4a4239;">
              <p style="color: #a8a098; font-size: 11px; margin: 0;">
                © 2026 SavannahPulse. All rights reserved.<br>
                Crafted with ❤ in Nairobi, Kenya
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Send to customer
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: booking.email,
      subject: `🎫 Your Digital Ticket - ${booking.ticketId}`,
      html: ticketHtml,
    });

    // Send copy to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL || 'admin@hospitalityarc.com',
      subject: `📋 New Booking: ${booking.ticketId} (${booking.fullName})`,
      html: ticketHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('Digital ticket email error:', error);
    return { success: false, error: 'Failed to send ticket' };
  }
};
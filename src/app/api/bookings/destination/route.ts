import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const HOST_EMAIL = "info@hospitalityarc.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      destination,
      travelDate,
      travelers,
      packageType,
      fullName,
      email,
      phone,
      specialRequests,
    } = body;

    if (!destination || !travelDate || !fullName || !email) {
      return NextResponse.json(
        { success: false, message: "Missing required booking fields." },
        { status: 400 }
      );
    }

    const bookingId = `HB-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#1a1a1a;">Booking Confirmation</h2>
        <p>Hi ${fullName},</p>
        <p>Thank you for your enquiry. We have received your booking request for <strong>${destination}</strong>.</p>

        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Travel Date:</strong> ${travelDate}</p>
        <p><strong>Travelers:</strong> ${travelers}</p>
        <p><strong>Package:</strong> ${packageType || "Standard"}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Special Requests:</strong> ${specialRequests || "None"}</p>

        <p>Our team will contact you shortly to confirm availability and finalise the itinerary.</p>
        <p>Warm regards,<br />HospitalityArc</p>
      </div>
    `;

    const hostHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#1a1a1a;">New Destination Booking</h2>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Customer Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Travel Date:</strong> ${travelDate}</p>
        <p><strong>Travelers:</strong> ${travelers}</p>
        <p><strong>Package:</strong> ${packageType || "Standard"}</p>
        <p><strong>Special Requests:</strong> ${specialRequests || "None"}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"HospitalityArc" <${process.env.SMTP_FROM || HOST_EMAIL}>`,
      to: HOST_EMAIL,
      replyTo: email,
      subject: `New booking: ${destination} - ${bookingId}`,
      html: hostHtml,
    });

    await transporter.sendMail({
      from: `"HospitalityArc" <${process.env.SMTP_FROM || HOST_EMAIL}>`,
      to: email,
      subject: `Your booking confirmation - ${bookingId}`,
      html: customerHtml,
    });

    return NextResponse.json({
      success: true,
      bookingId,
      message: "Booking submitted successfully.",
    });
  } catch (error: any) {
    console.error("Booking submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unable to submit booking.",
      },
      { status: 500 }
    );
  }
}
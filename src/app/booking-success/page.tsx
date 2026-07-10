"use client";
export const dynamic = 'force-dynamic';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTicketAlt, FaWhatsapp, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { getTicketById, BookingTicket } from "@/lib/tickets";
import Link from "next/link";

export default function BookingSuccessPage() {
  const [ticket, setTicket] = useState<BookingTicket | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get('ticketId');
    if (ticketId) {
      const t = getTicketById(ticketId);
      setTicket(t);
    }
  }, []);

  if (!ticket) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-card-border rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-500" size={48} />
          </div>

          <h1 className="font-serif text-4xl font-bold mb-4">Booking Request Submitted!</h1>
          <p className="text-gray-300 mb-8">
            Thank you, {ticket.fullName}. Your booking request has been received and logged as ticket <strong className="text-accent">{ticket.id}</strong>.
          </p>

          <div className="bg-darker border border-card-border rounded-xl p-6 mb-8 text-left">
            <h3 className="font-serif text-xl font-bold mb-4">What happens next?</h3>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">1.</span>
                <span>Our team will review your request within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">2.</span>
                <span>We'll contact you via email or WhatsApp with flight options</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">3.</span>
                <span>Once confirmed, you'll receive payment instructions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">4.</span>
                <span>After deposit/full payment, your ticket status will be "Resolved"</span>
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <a
              href={`mailto:info@hospitalityarc.com?subject=Ticket ${ticket.id}&body=Hi, I have a question about my booking request ${ticket.id}`}
              className="bg-card border border-card-border rounded-xl p-4 hover:border-accent transition-all flex items-center gap-3"
            >
              <FaEnvelope className="text-accent" size={24} />
              <div className="text-left">
                <div className="font-semibold">Email Us</div>
                <div className="text-xs text-muted">hello@savannahpulse.co.ke</div>
              </div>
            </a>
            <a
              href={`https://wa.me/971527433747?text=Hi, I have a question about my booking request ${ticket.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-card-border rounded-xl p-4 hover:border-green-500 transition-all flex items-center gap-3"
            >
              <FaWhatsapp className="text-green-500" size={24} />
              <div className="text-left">
                <div className="font-semibold">WhatsApp Us</div>
                <div className="text-xs text-muted">Quick response</div>
              </div>
            </a>
          </div>

          <div className="flex gap-4">
            <Link
              href="/bookings"
              className="flex-1 bg-accent text-dark font-semibold py-3 rounded-xl hover:bg-accent-hover transition-all flex items-center justify-center gap-2"
            >
              <FaTicketAlt /> View My Bookings
            </Link>
            <Link
              href="/"
              className="flex-1 bg-card border border-card-border text-white font-semibold py-3 rounded-xl hover:bg-card-border transition-all flex items-center justify-center gap-2"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
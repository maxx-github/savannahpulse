"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { 
  FaSearch, FaTicketAlt, FaPlane, FaHotel, FaCar, FaMapMarkerAlt,
  FaCheckCircle, FaClock, FaTimesCircle, FaUser, FaEnvelope,
  FaPhone, FaWhatsapp, FaDownload, FaArrowRight, FaSpinner
} from "react-icons/fa";

interface BookingDetails {
  id: string;
  ticketId: string;
  type: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
  class?: string;
  fullName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  specialRequests?: string;
}

const statusConfig: Record<string, { icon: any; color: string; label: string; message: string }> = {
  pending: { icon: FaClock, color: "text-yellow-400", label: "Pending Review", message: "Your booking request has been received and is being reviewed by our team." },
  confirmed: { icon: FaCheckCircle, color: "text-blue-400", label: "Confirmed", message: "Great news! Your booking has been confirmed. Payment details will follow shortly." },
  paid: { icon: FaCheckCircle, color: "text-green-400", label: "Paid", message: "Payment received! Your booking is being finalized." },
  resolved: { icon: FaCheckCircle, color: "text-green-500", label: "Completed", message: "Your booking is complete. Enjoy your experience!" },
  cancelled: { icon: FaTimesCircle, color: "text-red-400", label: "Cancelled", message: "This booking has been cancelled. Please contact us for assistance." },
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "flight": return FaPlane;
    case "hotel": return FaHotel;
    case "car-hire": return FaCar;
    case "destination": return FaMapMarkerAlt;
    default: return FaTicketAlt;
  }
};

export default function TrackBookingPage() {
  const [searchMethod, setSearchMethod] = useState<"ticket" | "email">("ticket");
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await fetch("/api/track-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: searchMethod === "ticket" ? ticketId : undefined,
          email: searchMethod === "email" ? email : undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
        if (data.bookings.length === 0) {
          setError("No bookings found. Please check your details and try again.");
        }
      } else {
        setError(data.error || "Failed to find bookings.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendTicket = async (bookingId: string) => {
    try {
      const response = await fetch("/api/resend-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Digital ticket has been resent to your email!");
      } else {
        alert("Failed to resend ticket. Please try again.");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">TRACK YOUR BOOKING</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Manage Your <span className="text-accent">Reservation</span></h1>
          <p className="text-muted max-w-2xl mx-auto">Enter your ticket ID or email address to view your booking status. No account required.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-card-border rounded-2xl p-8 mb-8">
          <div className="flex gap-2 mb-6 bg-darker p-1 rounded-xl">
            <button onClick={() => setSearchMethod("ticket")} className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${searchMethod === "ticket" ? "bg-accent text-dark" : "text-white hover:text-accent"}`}>
              <FaTicketAlt className="inline mr-2" />By Ticket ID
            </button>
            <button onClick={() => setSearchMethod("email")} className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${searchMethod === "email" ? "bg-accent text-dark" : "text-white hover:text-accent"}`}>
              <FaEnvelope className="inline mr-2" />By Email
            </button>
          </div>

          <form onSubmit={handleSearch}>
            {searchMethod === "ticket" ? (
              <div className="relative">
                <FaTicketAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input type="text" value={ticketId} onChange={(e) => setTicketId(e.target.value)} placeholder="e.g., TKT-1234567890-ABC123" className="w-full bg-darker border border-card-border rounded-lg pl-12 pr-4 py-4 text-white placeholder-muted focus:border-accent focus:outline-none" required />
              </div>
            ) : (
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter the email used for booking" className="w-full bg-darker border border-card-border rounded-lg pl-12 pr-4 py-4 text-white placeholder-muted focus:border-accent focus:outline-none" required />
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full mt-4 bg-accent text-dark font-bold py-4 rounded-xl hover:bg-accent-hover transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? (<><FaSpinner className="animate-spin" />Searching...</>) : (<><FaSearch /> Find My Booking</>)}
            </button>
          </form>

          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center mt-4">{error}</motion.p>}
        </motion.div>

        <AnimatePresence>
          {searched && bookings.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="font-serif text-2xl font-bold">Found {bookings.length} {bookings.length === 1 ? "Booking" : "Bookings"}</h2>

              {bookings.map((booking, i) => {
                const TypeIcon = getTypeIcon(booking.type);
                const status = statusConfig[booking.status] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <motion.div key={booking.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card border border-card-border rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-accent/20 to-accent/5 p-6 border-b border-card-border">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                            <TypeIcon size={24} />
                          </div>
                          <div>
                            <div className="text-xs text-muted uppercase tracking-wider">{booking.type === "car-hire" ? "Car Hire" : booking.type} Booking</div>
                            <div className="font-serif text-2xl font-bold text-accent">{booking.ticketId}</div>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border ${status.color}`}>
                          <StatusIcon />
                          <span className="font-semibold text-sm">{status.label}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-300 mb-6 italic border-l-4 border-accent pl-4">{status.message}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {(booking.from || booking.to) && (
                          <div className="bg-darker rounded-xl p-4 border border-card-border">
                            <div className="text-xs text-muted uppercase tracking-wider mb-2">Route</div>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-bold text-lg">{booking.from || "—"}</div>
                                {booking.departureDate && <div className="text-xs text-muted">{booking.departureDate}</div>}
                              </div>
                              <FaArrowRight className="text-accent" />
                              <div>
                                <div className="font-bold text-lg">{booking.to || "—"}</div>
                                {booking.returnDate && <div className="text-xs text-muted">{booking.returnDate}</div>}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="bg-darker rounded-xl p-4 border border-card-border">
                          <div className="text-xs text-muted uppercase tracking-wider mb-2">Contact Details</div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2"><FaUser className="text-accent" size={12} /><span>{booking.fullName}</span></div>
                            <div className="flex items-center gap-2"><FaEnvelope className="text-accent" size={12} /><span>{booking.email}</span></div>
                            {booking.phone && <div className="flex items-center gap-2"><FaPhone className="text-accent" size={12} /><span>{booking.phone}</span></div>}
                            {booking.whatsapp && <div className="flex items-center gap-2"><FaWhatsapp className="text-green-400" size={12} /><span>{booking.whatsapp}</span></div>}
                          </div>
                        </div>
                      </div>

                      <div className="bg-darker rounded-xl p-4 border border-card-border mb-6">
                        <div className="text-xs text-muted uppercase tracking-wider mb-4">Booking Timeline</div>
                        <div className="flex items-center justify-between">
                          {["Request", "Review", "Confirmed", "Completed"].map((step, idx) => {
                            const statusOrder = ["pending", "confirmed", "paid", "resolved"];
                            const currentIdx = statusOrder.indexOf(booking.status);
                            const isComplete = idx <= currentIdx;
                            
                            return (
                              <div key={step} className="flex-1 flex flex-col items-center relative">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${isComplete ? "bg-accent text-dark" : "bg-card-border text-muted"}`}>
                                  {isComplete ? <FaCheckCircle size={14} /> : <span className="text-xs">{idx + 1}</span>}
                                </div>
                                <div className={`text-xs text-center ${isComplete ? "text-white" : "text-muted"}`}>{step}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button onClick={() => handleResendTicket(booking.id)} className="flex-1 min-w-[200px] bg-accent text-dark font-semibold py-3 rounded-xl hover:bg-accent-hover transition-all flex items-center justify-center gap-2">
                          <FaDownload /> Resend Digital Ticket
                        </button>
                        <a href={`https://wa.me/254700000000?text=Hi, I have a question about my booking ${booking.ticketId}`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px] bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                          <FaWhatsapp /> Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12 bg-card/50 border border-card-border rounded-2xl p-8 text-center">
          <h3 className="font-serif text-xl font-bold mb-3">Can't find your booking?</h3>
          <p className="text-muted mb-6">Our team is here to help. Contact us directly and we'll locate your reservation.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:hello@hospitalityarc.com" className="bg-card border border-card-border px-6 py-3 rounded-xl hover:border-accent transition-all flex items-center gap-2">
              <FaEnvelope className="text-accent" /> Email Support
            </a>
            <Link href="/contact" className="bg-card border border-card-border px-6 py-3 rounded-xl hover:border-accent transition-all flex items-center gap-2">
              <FaPhone className="text-accent" /> Contact Page
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

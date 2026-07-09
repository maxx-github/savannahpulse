"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FaTicketAlt, FaPlane, FaHotel, FaMapMarkerAlt, FaCar, FaClock, 
  FaCheckCircle, FaTimesCircle, FaEnvelope, FaSpinner, FaArrowRight
} from "react-icons/fa";

interface Booking {
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

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/track-booking");
      return;
    }

    if (status === "authenticated") {
      fetchBookings();
    }
  }, [status]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-500";
      case "confirmed": return "bg-blue-500/20 text-blue-500";
      case "paid": return "bg-green-500/20 text-green-500";
      case "resolved": return "bg-green-500/20 text-green-500";
      case "cancelled": return "bg-red-500/20 text-red-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <FaClock />;
      case "confirmed": return <FaCheckCircle />;
      case "paid": return <FaCheckCircle />;
      case "resolved": return <FaCheckCircle />;
      case "cancelled": return <FaTimesCircle />;
      default: return <FaTicketAlt />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight": return <FaPlane />;
      case "hotel": return <FaHotel />;
      case "car-hire": return <FaCar />;
      case "destination": return <FaMapMarkerAlt />;
      default: return <FaTicketAlt />;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-accent">Bookings</span>
          </h1>
          <p className="text-muted">Track the status of your booking requests</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", "pending", "confirmed", "paid", "resolved", "cancelled"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                filter === status
                  ? "bg-accent text-dark"
                  : "bg-card border border-card-border text-white hover:border-accent"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-card border border-card-border rounded-2xl"
          >
            <FaTicketAlt className="text-muted mx-auto mb-4" size={48} />
            <p className="text-muted text-lg mb-6">No bookings found</p>
            <Link 
              href="/track-booking" 
              className="inline-flex items-center gap-2 bg-accent text-dark px-6 py-3 rounded-xl font-semibold hover:bg-accent-hover transition-all"
            >
              Track a Booking <FaArrowRight />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-card-border rounded-2xl p-6 hover:border-accent/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                      {getTypeIcon(booking.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-serif text-xl font-bold">{booking.ticketId}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-muted text-sm mb-2">
                        {booking.type === "flight" && booking.from && booking.to && `${booking.from} → ${booking.to}`}
                        {booking.type === "hotel" && booking.to && `Hotel: ${booking.to}`}
                        {booking.type === "car-hire" && booking.from && `Pickup: ${booking.from}`}
                        {booking.type === "destination" && booking.to && `Destination: ${booking.to}`}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span>Created: {new Date(booking.createdAt).toLocaleDateString()}</span>
                        {booking.departureDate && <span>• Departure: {booking.departureDate}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-muted mb-1">Payment</div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                        booking.paymentStatus === "paid" ? "bg-green-500/20 text-green-500" :
                        booking.paymentStatus === "partial" ? "bg-blue-500/20 text-blue-500" :
                        "bg-red-500/20 text-red-500"
                      }`}>
                        {booking.paymentStatus.toUpperCase()}
                      </div>
                    </div>
                    <Link 
                      href={`/track-booking?ticketId=${booking.ticketId}`}
                      className="bg-accent text-dark px-4 py-2 rounded-lg font-semibold hover:bg-accent-hover transition-all flex items-center gap-2"
                    >
                      View Details <FaArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-card/50 border border-card-border rounded-2xl p-8 text-center"
        >
          <h3 className="font-serif text-xl font-bold mb-3">Need help with your bookings?</h3>
          <p className="text-muted mb-6">
            Contact our support team or track your bookings using your email address.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/track-booking"
              className="bg-card border border-card-border px-6 py-3 rounded-xl hover:border-accent transition-all flex items-center gap-2"
            >
              <FaEnvelope className="text-accent" /> Track by Email
            </Link>
            <Link 
              href="/contact"
              className="bg-card border border-card-border px-6 py-3 rounded-xl hover:border-accent transition-all flex items-center gap-2"
            >
              <FaTicketAlt className="text-accent" /> Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
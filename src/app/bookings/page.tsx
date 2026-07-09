"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTicketAlt, FaPlane, FaHotel, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimesCircle, FaDollarSign } from "react-icons/fa";
import { getAllTickets, BookingTicket } from "@/lib/tickets";

export default function BookingsPage() {
  const [tickets, setTickets] = useState<BookingTicket[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setTickets(getAllTickets());
  }, []);

  const filteredTickets = tickets.filter(t => {
    if (filter === "all") return true;
    return t.status === filter;
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight": return <FaPlane />;
      case "hotel": return <FaHotel />;
      case "destination": return <FaMapMarkerAlt />;
      default: return <FaTicketAlt />;
    }
  };

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

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="text-center py-20">
            <FaTicketAlt className="text-muted mx-auto mb-4" size={48} />
            <p className="text-muted text-lg">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket, i) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-card-border rounded-2xl p-6 hover:border-accent/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                      {getTypeIcon(ticket.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-xl font-bold">{ticket.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                          {ticket.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-muted text-sm mb-2">
                        {ticket.type === "flight" && `${ticket.from} → ${ticket.to}`}
                        {ticket.type === "hotel" && `Hotel: ${ticket.to}`}
                        {ticket.type === "destination" && `Destination: ${ticket.to}`}
                      </p>
                      <p className="text-xs text-muted">
                        Created: {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-muted mb-1">Payment</div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                        ticket.paymentStatus === "full" ? "bg-green-500/20 text-green-500" :
                        ticket.paymentStatus === "partial" ? "bg-blue-500/20 text-blue-500" :
                        "bg-red-500/20 text-red-500"
                      }`}>
                        {ticket.paymentStatus.toUpperCase()}
                      </div>
                    </div>
                    <button className="bg-accent text-dark px-4 py-2 rounded-lg font-semibold hover:bg-accent-hover transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
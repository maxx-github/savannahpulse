"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlane, FaUser, FaEnvelope, FaWhatsapp, FaPhone, FaCalendar, FaUsers, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { createTicket } from "@/lib/tickets";

export default function BookFlightPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Flight details
  const [flightData, setFlightData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    class: "economy",
  });
  
  // Personal details
  const [personalData, setPersonalData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    specialRequests: "",
  });

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create ticket
      const ticket = createTicket({
        type: "flight",
        from: flightData.from,
        to: flightData.to,
        departureDate: flightData.departureDate,
        returnDate: flightData.returnDate,
        passengers: flightData.passengers,
        class: flightData.class,
        fullName: personalData.fullName,
        email: personalData.email,
        phone: personalData.phone,
        whatsapp: personalData.whatsapp,
        specialRequests: personalData.specialRequests,
      });

      // Send email notification
      await fetch("/api/bookings/flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...flightData,
          ...personalData,
          ticketId: ticket.id,
        }),
      });

      // Redirect to success page
      router.push(`/booking-success?ticketId=${ticket.id}`);
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-accent" : "text-muted"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-accent text-dark" : "bg-card border border-card-border"}`}>
                <FaPlane />
              </div>
              <span className="font-semibold">Flight Details</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-card-border">
              <div className={`h-full bg-accent transition-all ${step >= 2 ? "w-full" : "w-0"}`}></div>
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-accent" : "text-muted"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-accent text-dark" : "bg-card border border-card-border"}`}>
                <FaUser />
              </div>
              <span className="font-semibold">Personal Info</span>
            </div>
          </div>
        </div>

        {/* Step 1: Flight Details */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-card-border rounded-2xl p-8"
          >
            <h2 className="font-serif text-3xl font-bold mb-6">Flight Details</h2>
            <form onSubmit={handleFlightSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">From *</label>
                  <input
                    type="text"
                    required
                    value={flightData.from}
                    onChange={(e) => setFlightData({ ...flightData, from: e.target.value })}
                    placeholder="e.g., London (LHR)"
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">To *</label>
                  <input
                    type="text"
                    required
                    value={flightData.to}
                    onChange={(e) => setFlightData({ ...flightData, to: e.target.value })}
                    placeholder="e.g., Nairobi (NBO)"
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Departure Date *</label>
                  <input
                    type="date"
                    required
                    value={flightData.departureDate}
                    onChange={(e) => setFlightData({ ...flightData, departureDate: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Return Date</label>
                  <input
                    type="date"
                    value={flightData.returnDate}
                    onChange={(e) => setFlightData({ ...flightData, returnDate: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Passengers *</label>
                  <select
                    value={flightData.passengers}
                    onChange={(e) => setFlightData({ ...flightData, passengers: parseInt(e.target.value) })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Class *</label>
                  <select
                    value={flightData.class}
                    onChange={(e) => setFlightData({ ...flightData, class: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-dark font-semibold py-4 rounded-xl hover:bg-accent-hover transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Continue <FaArrowRight />
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-card-border rounded-2xl p-8"
          >
            <h2 className="font-serif text-3xl font-bold mb-6">Personal Information</h2>
            <form onSubmit={handlePersonalSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-semibold mb-2 block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={personalData.fullName}
                  onChange={(e) => setPersonalData({ ...personalData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Email *</label>
                  <input
                    type="email"
                    required
                    value={personalData.email}
                    onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Phone</label>
                  <input
                    type="tel"
                    value={personalData.phone}
                    onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
                    placeholder="+254..."
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">WhatsApp (for quick updates)</label>
                <input
                  type="tel"
                  value={personalData.whatsapp}
                  onChange={(e) => setPersonalData({ ...personalData, whatsapp: e.target.value })}
                  placeholder="+254..."
                  className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                />
                <p className="text-xs text-muted mt-1">We'll send booking confirmations here</p>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Special Requests</label>
                <textarea
                  rows={4}
                  value={personalData.specialRequests}
                  onChange={(e) => setPersonalData({ ...personalData, specialRequests: e.target.value })}
                  placeholder="Dietary requirements, accessibility needs, etc."
                  className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted resize-none"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-card border border-card-border text-white font-semibold py-4 rounded-xl hover:bg-card-border transition-all flex items-center justify-center gap-2"
                >
                  <FaArrowLeft /> Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-accent text-dark font-semibold py-4 rounded-xl hover:bg-accent-hover transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
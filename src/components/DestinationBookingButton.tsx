"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  destinationName: string;
};

export default function DestinationBookingButton({ destinationName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    travelers: "",
    specialRequests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const travelers = Number(formData.travelers);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.date ||
      !formData.travelers
    ) {
      alert("Please complete the required fields.");
      return;
    }

    if (!Number.isFinite(travelers) || travelers < 1) {
      alert("Please enter a valid number of travelers.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings/destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: destinationName,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          travelDate: formData.date,
          travelers,
          specialRequests: formData.specialRequests,
          packageType: "Standard",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      alert(
        `Booking submitted successfully! Your booking ID is: ${data.bookingId}`
      );

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        travelers: "",
        specialRequests: "",
      });

      setIsOpen(false);
    } catch (error: any) {
      console.error("Booking failed:", error);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-accent text-dark font-semibold py-3 rounded-xl hover:bg-accent-hover transition-all hover:scale-105"
      >
        Book This Experience
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-card-border rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="font-serif text-2xl font-bold mb-6">
              Book {destinationName}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                required
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
              />

              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
              />

              <input
                type="number"
                name="travelers"
                required
                min={1}
                placeholder="Travelers"
                value={formData.travelers}
                onChange={handleChange}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
              />

              <textarea
                name="specialRequests"
                rows={3}
                placeholder="Special Requests (optional)"
                value={formData.specialRequests}
                onChange={handleChange}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-dark font-semibold py-3 rounded-xl hover:bg-accent-hover transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Confirm Booking"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
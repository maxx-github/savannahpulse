"use client";
import CheckoutWizard from "@/components/CheckoutWizard";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const hotels = [
  {
    tag: "Boutique",
    rating: 4.9,
    name: "Giraffe Manor",
    location: "Nairobi",
    amenities: ["Wifi", "Breakfast", "Airport Transfer"],
    price: "$320",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  },
  {
    tag: "Safari Lodge",
    rating: 5,
    name: "Angama Mara",
    location: "Maasai Mara",
    amenities: ["Wifi", "All-Inclusive", "Game Drives"],
    price: "$580",
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
  },
  {
    tag: "Beach Resort",
    rating: 4.8,
    name: "Hemingways Watamu",
    location: "Watamu Coast",
    amenities: ["Pool", "Spa", "Diving"],
    price: "$250",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  },
];

export default function HotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings/hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelName: selectedHotel,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: parseInt(formData.guests),
          roomType: "Standard",
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Reservation submitted successfully! Your booking ID is: ${data.bookingId}`);
        setSelectedHotel(null);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          checkIn: "",
          checkOut: "",
          guests: "2",
        });
      } else {
        alert("Failed to submit reservation. Please try again.");
      }
    } catch (error) {
      console.error("Reservation error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
            REST & REJUVENATE
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Where Luxury Meets the Wild
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            From tented camps beneath the stars to oceanfront villas — find your perfect sanctuary in Kenya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-card border border-card-border rounded-2xl overflow-hidden group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full">
                    {hotel.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl font-bold">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-accent">
                    <FaStar size={14} />
                    <span className="text-sm font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted text-sm mb-4">
                  <FaMapMarkerAlt size={12} />
                  {hotel.location}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.amenities.map((a) => (
                    <span
                      key={a}
                      className="bg-darker border border-card-border text-xs px-3 py-1 rounded-full text-muted"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-card-border">
                  <div>
                    <span className="font-serif text-2xl font-bold text-accent">{hotel.price}</span>
                    <span className="text-muted text-sm"> /night</span>
                  </div>
                  <button
                    onClick={() => setSelectedHotel(hotel.name)}
                    className="text-accent text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Reserve <FaArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedHotel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedHotel(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-card-border rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="font-serif text-2xl font-bold mb-2">Reserve {selectedHotel}</h3>
            <p className="text-muted text-sm mb-6">Complete your reservation details</p>
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted mb-1 block">Check-in</label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Check-out</label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-dark font-semibold py-3 rounded-xl hover:bg-accent-hover transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Confirm Reservation"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaCalendar, FaClock, FaUsers, FaArrowLeft, FaShip } from "react-icons/fa";
import { useState } from "react";

const highlights = [
  "Lake Victoria excursions",
  "Birdwatching and wetlands",
  "Fishing villages and local culture",
  "Historic riverfront experiences",
  "Luo community and cuisine",
  "Sunset views over the lake",
];

const hiddenGems = [
  {
    title: "Lake Victoria Waterfront",
    desc: "Kisumu brings the beauty of Africa's largest lake into a lived-in, vibrant cityscape. Sunset by the lakefront is one of the most memorable experiences in western Kenya.",
  },
  {
    title: "Birding at the Papyrus Wetlands",
    desc: "The city is a gateway to extraordinary birdlife, especially around the wetlands and marsh areas where many native and migratory species can be seen.",
  },
  {
    title: "Luo Culture and Storytelling",
    desc: "Kisumu offers a rich cultural experience shaped by Luo traditions, language, music, and cuisine, giving visitors a deeper understanding of the region beyond the shoreline.",
  },
];

export default function KisumuPage() {
  const [showBooking, setShowBooking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    travelers: "2",
    specialRequests: "",
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings/destination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: "Kisumu",
          travelDate: formData.date,
          travelers: parseInt(formData.travelers),
          packageType: "Standard",
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Booking submitted successfully! Your booking ID is: ${data.bookingId}`);
        setShowBooking(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          date: "",
          travelers: "2",
          specialRequests: "",
        });
      } else {
        alert("Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 bg-dark min-h-screen">
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop&q=80"
          alt="Kisumu Lake Victoria"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-white hover:text-accent mb-4 transition-colors"
          >
            <FaArrowLeft size={14} />
            Back to Destinations
          </Link>
          <span className="inline-block bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Lakeside Heritage
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-2">Kisumu</h1>
          <p className="text-accent text-lg">Lake Victoria&apos;s Gem</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-serif text-3xl font-bold mb-6">About This Destination</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Kisumu is Kenya&apos;s third-largest city and the gateway to Lake Victoria, the
                largest lake in Africa by surface area. It is a lively city with a relaxed pace,
                deep cultural roots, and scenic shoreline views.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Known for its warm people, lakeside sunsets, and rich Luo heritage, Kisumu offers
                visitors an authentic western Kenya experience with a blend of nature, culture, and
                local flavor. It is ideal for travelers seeking a slower and more intimate
                destination.
              </p>

              <h3 className="font-serif text-2xl font-bold mb-6">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3"
                  >
                    <FaShip className="text-accent flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <h3 className="font-serif text-2xl font-bold mb-6 text-accent">
                Hidden Gems & Local Secrets
              </h3>
              <div className="space-y-6 mb-8">
                {hiddenGems.map((gem, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-card to-card/50 border-l-4 border-accent p-6 rounded-r-xl"
                  >
                    <h4 className="font-serif text-xl font-bold mb-2 text-white">{gem.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{gem.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-card-border rounded-2xl p-6 h-fit sticky top-24"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaStar className="text-accent" />
              <span className="font-bold">4.7</span>
              <span className="text-muted text-sm">Excellent</span>
            </div>
            <div className="mb-6">
              <span className="font-serif text-4xl font-bold text-accent">$360</span>
              <span className="text-muted text-sm"> / person</span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <FaCalendar className="text-accent" />
                <span className="text-muted">Best between June and October</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaClock className="text-accent" />
                <span className="text-muted">2–4 days recommended</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaUsers className="text-accent" />
                <span className="text-muted">2–8 travelers</span>
              </div>
            </div>
            <button
              onClick={() => setShowBooking(true)}
              className="w-full bg-accent text-dark font-semibold py-3 rounded-xl hover:bg-accent-hover transition-all hover:scale-105"
            >
              Book This Experience
            </button>
          </motion.div>
        </div>
      </section>

      {showBooking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setShowBooking(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-card-border rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="font-serif text-2xl font-bold mb-6">Book Kisumu Experience</h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
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
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
              />
              <select
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
              >
                <option value="2">2 Travelers</option>
                <option value="4">4 Travelers</option>
                <option value="6">6 Travelers</option>
                <option value="8">8 Travelers</option>
              </select>
              <textarea
                placeholder="Special Requests (optional)"
                rows={3}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
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
    </div>
  );
}
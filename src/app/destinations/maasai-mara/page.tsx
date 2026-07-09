"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaCalendar, FaClock, FaUsers, FaArrowLeft, FaPaw } from "react-icons/fa";
import { useState } from "react";

const highlights = [
  "Big Five game drives",
  "Great Migration (July-October)",
  "Hot air balloon safaris",
  "Maasai village visits",
  "Sundowner experiences",
  "Photography workshops",
];

const hiddenGems = [
  {
    title: "The Ancient Mara River",
    desc: "Home to Nile crocodiles that have lived for over 100 years, witnessing countless migrations. These ancient reptiles are the true guardians of the river."
  },
  {
    title: "Mara Triangle",
    desc: "A lesser-known western section managed by the Mara Conservancy, offering exclusive game viewing with fewer vehicles and pristine wilderness."
  },
  {
    title: "Moran Culture",
    desc: "The Maasai warrior (Moran) age-set system has remained unchanged for centuries. Young warriors live in remote manyattas, protecting the community and livestock."
  }
];

export default function MaasaiMaraPage() {
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
          destination: "Maasai Mara",
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
        <Image src="/images/heroes/maasai-mara.jpg" alt="Maasai Mara" fill className="object-cover" priority />
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
            Wildlife Safari
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-2">Maasai Mara</h1>
          <p className="text-accent text-lg">The Great Migration</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-serif text-3xl font-bold mb-6">About This Destination</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                The Maasai Mara National Reserve is Kenya's most celebrated wildlife sanctuary. Spanning 1,510 square kilometers of open grassland, it hosts the annual Great Migration — one of the most spectacular natural events on earth, where over two million wildebeest, zebra, and gazelle thunder across the Mara River.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Home to the Big Five (lion, leopard, elephant, buffalo, and rhino), the Mara offers unparalleled game viewing year-round. The reserve's rolling savannah plains dotted with acacia trees create the iconic African landscape that has captivated travelers for generations.
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
                    <FaPaw className="text-accent flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <h3 className="font-serif text-2xl font-bold mb-6 text-accent">Hidden Gems & Cultural Secrets</h3>
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
              <span className="font-bold">4.9</span>
              <span className="text-muted text-sm">Exceptional</span>
            </div>
            <div className="mb-6">
              <span className="font-serif text-4xl font-bold text-accent">$850</span>
              <span className="text-muted text-sm"> / person</span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <FaCalendar className="text-accent" />
                <span className="text-muted">July to October for the Migration, year-round for wildlife</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaClock className="text-accent" />
                <span className="text-muted">3–5 days recommended</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FaUsers className="text-accent" />
                <span className="text-muted">2–12 travelers</span>
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
            <h3 className="font-serif text-2xl font-bold mb-6">Book Maasai Mara Safari</h3>
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
	  
	  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": "Maasai Mara National Reserve",
      "description": "Witness millions of wildebeest crossing the Mara River in one of nature's most spectacular events. Home to the Big Five.",
      "url": "https://hospitalityarc.com/destinations/maasai-mara",
      "touristType": ["Wildlife Enthusiasts", "Photographers", "Safari Lovers", "Adventure Seekers"],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-1.4061",
        "longitude": "35.0061"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Kenya",
        "addressRegion": "Narok County"
      },
      "offers": {
        "@type": "Offer",
        "price": "850",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "2847"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Best Time to Visit",
          "value": "July to October (Great Migration)"
        },
        {
          "@type": "PropertyValue",
          "name": "Recommended Duration",
          "value": "3-5 days"
        },
        {
          "@type": "PropertyValue",
          "name": "Highlights",
          "value": "Big Five, Great Migration, Hot Air Balloon Safaris"
        }
      ]
    })
  }}
/>
    </div>
  );
}
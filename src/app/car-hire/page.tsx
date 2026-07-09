"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FaCar, FaMapMarkerAlt, FaCalendar, FaUsers, FaCog, FaCheck,
  FaShieldAlt, FaGasPump, FaSuitcase, FaArrowRight, FaWhatsapp
} from "react-icons/fa";

// Kenyan Towns where we operate
const towns = [
  { name: "Nairobi", code: "NBO", image: "/images/towns/nairobi.jpg" },
  { name: "Mombasa", code: "MBA", image: "/images/towns/mombasa.jpg" },
  { name: "Kisumu", code: "KIS", image: "/images/towns/kisumu.jpg" },
  { name: "Eldoret", code: "ELD", image: "/images/towns/eldoret.jpg" },
  { name: "Nakuru", code: "NKU", image: "/images/towns/nakuru.jpg" },
  { name: "Malindi", code: "MLD", image: "/images/towns/malindi.jpg" },
  { name: "Diani Beach", code: "Diani", image: "/images/towns/diani.jpg" },
  { name: "Maasai Mara", code: "MARA", image: "/images/towns/mara.jpg" },
  { name: "Nanyuki", code: "NYK", image: "/images/towns/nanyuki.jpg" },
  { name: "Lamu", code: "LAU", image: "/images/towns/lamu.jpg" },
];

// Vehicle Categories with real Kenyan models
const vehicles = [
  {
    category: "Economy",
    icon: FaCar,
    models: ["Toyota Vitz", "Suzuki Alto", "Nissan Note"],
    pricePerDay: 3500,
    priceUSD: 25,
    passengers: 4,
    luggage: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    features: ["Air Conditioning", "Bluetooth Audio", "Power Steering"],
    bestFor: "City driving, airport transfers",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
  },
  {
    category: "SUV",
    icon: FaCar,
    models: ["Toyota RAV4", "Subaru Forester", "Mazda CX-5"],
    pricePerDay: 7500,
    priceUSD: 55,
    passengers: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    features: ["Air Conditioning", "4WD", "Roof Rack", "Reverse Camera"],
    bestFor: "Family trips, upcountry travel",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
  },
  {
    category: "4x4 Safari",
    icon: FaCar,
    models: ["Toyota Land Cruiser", "Land Cruiser Prado", "Nissan Patrol"],
    pricePerDay: 18000,
    priceUSD: 130,
    passengers: 6,
    luggage: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    features: ["Pop-up Roof", "4WD Low Range", "Cooler Box", "HF Radio"],
    bestFor: "Safari, rough terrain, Maasai Mara",
    image: "https://images.unsplash.com/photo-1519657337289-3b3a2552f6d7?w=800",
  },
  {
    category: "Minivan",
    icon: FaCar,
    models: ["Toyota Hiace", "Nissan Caravan", "Toyota Noah"],
    pricePerDay: 9500,
    priceUSD: 70,
    passengers: 7,
    luggage: 6,
    transmission: "Manual/Auto",
    fuel: "Diesel",
    features: ["Air Conditioning", "Sliding Doors", "Extra Luggage Space"],
    bestFor: "Group travel, family safaris",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800",
  },
  {
    category: "Luxury",
    icon: FaCar,
    models: ["Mercedes E-Class", "BMW 5 Series", "Range Rover Sport"],
    pricePerDay: 25000,
    priceUSD: 180,
    passengers: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    features: ["Leather Interior", "Premium Sound", "Sunroof", "GPS"],
    bestFor: "Business travel, special occasions",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
  },
  {
    category: "Double Cabin",
    icon: FaCar,
    models: ["Toyota Hilux", "Ford Ranger", "Isuzu D-Max"],
    pricePerDay: 12000,
    priceUSD: 85,
    passengers: 5,
    luggage: 8,
    transmission: "Manual/Auto",
    fuel: "Diesel",
    features: ["4WD", "Roll Bar", "Canopy", "Heavy Duty Suspension"],
    bestFor: "Remote areas, heavy luggage, long trips",
    image: "https://images.unsplash.com/photo-1595953854408-c9d5ad40f5c8?w=800",
  },
];

export default function CarHirePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    whatsapp: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    vehicleCategory: "",
    specialRequests: "",
  });

  const handleBookClick = (category: string) => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/car-hire");
      return;
    }
    setSelectedVehicle(category);
    setFormData({ ...formData, vehicleCategory: category });
    setShowBooking(true);
  };

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.dropoffDate) return 0;
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.dropoffDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const getTotalPrice = () => {
    const vehicle = vehicles.find(v => v.category === formData.vehicleCategory);
    if (!vehicle) return 0;
    const days = calculateDays();
    return vehicle.pricePerDay * days;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "car-hire",
          vehicleCategory: formData.vehicleCategory,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          departureDate: formData.pickupDate,
          returnDate: formData.dropoffDate,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          specialRequests: formData.specialRequests,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Car hire request submitted! Your ticket ID is: ${data.ticketId}`);
        setShowBooking(false);
        setFormData({
          fullName: session?.user?.name || "",
          email: session?.user?.email || "",
          phone: "",
          whatsapp: "",
          pickupLocation: "",
          dropoffLocation: "",
          pickupDate: "",
          dropoffDate: "",
          vehicleCategory: "",
          specialRequests: "",
        });
        router.push("/bookings");
      } else {
        alert("Failed to submit request. Please try again.");
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
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920"
          alt="Car Hire Kenya"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
              DRIVE KENYA YOUR WAY
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
              Premium <span className="text-accent">Car Hire</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              From compact city cars to rugged 4x4 safari vehicles — explore Kenya at your own pace with our trusted fleet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Operating Towns */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
              WHERE WE OPERATE
            </p>
            <h2 className="font-serif text-4xl font-bold mb-4">
              Available Across <span className="text-accent">Kenya</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Pick up and drop off at major towns, airports, and safari destinations nationwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {towns.map((town, i) => (
              <motion.div
                key={town.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-card border border-card-border rounded-xl p-4 text-center hover:border-accent transition-all cursor-pointer group"
                onClick={() => setFormData({ ...formData, pickupLocation: town.name })}
              >
                <FaMapMarkerAlt className="text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-semibold">{town.name}</div>
                <div className="text-xs text-muted">{town.code}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section className="py-16 bg-darker">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
              OUR FLEET
            </p>
            <h2 className="font-serif text-4xl font-bold mb-4">
              Choose Your <span className="text-accent">Vehicle</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              All vehicles are well-maintained, fully insured, and come with 24/7 roadside assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, i) => (
              <motion.div
                key={vehicle.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-card-border rounded-2xl overflow-hidden group hover:border-accent/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.category}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full">
                      {vehicle.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold mb-2">{vehicle.category}</h3>
                  <p className="text-muted text-sm mb-4">{vehicle.models.join(", ")}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaUsers className="text-accent" size={14} />
                      <span>{vehicle.passengers} pax</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaSuitcase className="text-accent" size={14} />
                      <span>{vehicle.luggage} bags</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaCog className="text-accent" size={14} />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaGasPump className="text-accent" size={14} />
                      <span>{vehicle.fuel}</span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-4">
                    {vehicle.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs text-gray-300">
                        <FaCheck className="text-accent" size={10} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-card-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-serif text-3xl font-bold text-accent">
                          KES {vehicle.pricePerDay.toLocaleString()}
                        </span>
                        <span className="text-muted text-sm"> / day</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted">Approx.</div>
                        <div className="text-sm font-semibold">${vehicle.priceUSD}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted mb-4">
                      <span className="text-accent font-semibold">Best for:</span> {vehicle.bestFor}
                    </p>
                    <button
                      onClick={() => handleBookClick(vehicle.category)}
                      className="w-full bg-accent text-dark font-semibold py-3 rounded-xl hover:bg-accent-hover transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      View Details <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaShieldAlt, title: "Fully Insured", desc: "Comprehensive insurance on all vehicles" },
              { icon: FaCar, title: "24/7 Support", desc: "Roadside assistance anywhere in Kenya" },
              { icon: FaMapMarkerAlt, title: "Flexible Pickup", desc: "Airport, hotel, or office delivery" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-accent" size={28} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBooking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 overflow-y-auto"
          onClick={() => setShowBooking(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-card-border rounded-2xl p-8 max-w-2xl w-full my-8"
          >
            <h3 className="font-serif text-3xl font-bold mb-2">Book {formData.vehicleCategory}</h3>
            <p className="text-muted text-sm mb-6">Fill in your details to reserve your vehicle</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254..."
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+254..."
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Pickup Location *</label>
                  <select
                    required
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  >
                    <option value="">Select town</option>
                    {towns.map(t => <option key={t.code} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Drop-off Location</label>
                  <select
                    value={formData.dropoffLocation}
                    onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  >
                    <option value="">Same as pickup</option>
                    {towns.map(t => <option key={t.code} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Pickup Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Drop-off Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.dropoffDate}
                    onChange={(e) => setFormData({ ...formData, dropoffDate: e.target.value })}
                    className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              {calculateDays() > 0 && (
                <div className="bg-darker border border-accent/30 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Duration:</span>
                    <span className="font-bold">{calculateDays()} days</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-muted">Estimated Total:</span>
                    <span className="font-serif text-2xl font-bold text-accent">
                      KES {getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold mb-2 block">Special Requests</label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Child seat, GPS, extra driver, airport pickup..."
                  className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white placeholder-muted resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBooking(false)}
                  className="flex-1 bg-card border border-card-border text-white font-semibold py-3 rounded-xl hover:bg-card-border transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-accent text-dark font-semibold py-3 rounded-xl hover:bg-accent-hover transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CarRental",
            "name": "SavannahPulse Car Hire",
            "description": "Premium car hire services across Kenya with economy, SUV, 4x4 safari, and luxury vehicles.",
            "url": "https://savannahpulse.co.ke/car-hire",
            "areaServed": {
              "@type": "Country",
              "name": "Kenya"
            },
            "makesOffered": [
              { "@type": "Brand", "name": "Toyota" },
              { "@type": "Brand", "name": "Nissan" },
              { "@type": "Brand", "name": "Subaru" },
              { "@type": "Brand", "name": "Mercedes-Benz" }
            ],
            "priceRange": "KES 3,500 - 25,000 per day",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "847"
            }
          })
        }}
      />
    </div>
  );
}
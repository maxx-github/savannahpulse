"use client";
import CheckoutWizard from "@/components/CheckoutWizard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaUtensils, FaCar, 
  FaSpa, FaPaw, FaCheck, FaArrowLeft, FaCalendar, FaUsers, FaBed 
} from "react-icons/fa";

// Mock Data for Angama Mara
const hotelData = {
  name: "Angama Mara",
  location: "Maasai Mara, Kenya",
  rating: 5.0,
  reviews: 1284,
  description: "Perched high on the Oloololo Escarpment, Angama Mara offers breathtaking 180-degree views of the Maasai Mara. This luxury tented camp redefines the safari experience with unparalleled comfort, gourmet dining, and intimate access to the Great Migration.",
  images: [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600",
  ],
  amenities: [
    { icon: FaWifi, name: "Free Wi-Fi" },
    { icon: FaSwimmingPool, name: "Infinity Pool" },
    { icon: FaUtensils, name: "Gourmet Dining" },
    { icon: FaSpa, name: "Luxury Spa" },
    { icon: FaCar, name: "Airport Transfer" },
    { icon: FaPaw, name: "Game Drives" },
  ],
  rooms: [
    {
      id: "tent-suite",
      name: "Luxury Tent Suite",
      size: "65m²",
      guests: 2,
      bed: "1 King Bed",
      price: 1200,
      features: ["Private deck", "Mara views", "Indoor/outdoor shower", "Fireplace"],
      cancellation: "Free cancellation until Jul 10"
    },
    {
      id: "family-tent",
      name: "Family Tent",
      size: "95m²",
      guests: 4,
      bed: "1 King + 2 Singles",
      price: 1800,
      features: ["Separate living area", "Panoramic views", "Bathtub", "Kids amenities"],
      cancellation: "Free cancellation until Jul 5"
    },
    {
      id: "private-house",
      name: "Private House",
      size: "220m²",
      guests: 6,
      bed: "3 King Beds",
      price: 3500,
      features: ["Private pool", "Dedicated chef", "Butler service", "Exclusive vehicle"],
      cancellation: "Non-refundable"
    }
  ]
};

export default function HotelDetailsPage() {
  const [selectedRoom, setSelectedRoom] = useState(hotelData.rooms[0]);
  const [checkIn, setCheckIn] = useState("2026-08-01");
  const [checkOut, setCheckOut] = useState("2026-08-05");
  const [guests, setGuests] = useState(2);
  const [showCheckout, setShowCheckout] = useState(false);

  // Calculate nights and total price
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const subtotal = selectedRoom.price * nights;
  const taxes = Math.round(subtotal * 0.16);
  const total = subtotal + taxes;

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/hotels" className="inline-flex items-center gap-2 text-muted hover:text-accent mb-6 transition-colors">
          <FaArrowLeft size={14} /> Back to Hotels
        </Link>

        {/* Image Gallery Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] mb-10 rounded-2xl overflow-hidden"
        >
          <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer">
            <Image src={hotelData.images[0]} alt="Main" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          {hotelData.images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative group cursor-pointer hidden md:block">
              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">{hotelData.name}</h1>
                  <div className="flex items-center gap-2 text-muted">
                    <FaMapMarkerAlt className="text-accent" />
                    <span>{hotelData.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    <FaStar className="text-accent" />
                    <span className="font-bold text-xl">{hotelData.rating}</span>
                  </div>
                  <div className="text-xs text-muted">{hotelData.reviews} reviews</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{hotelData.description}</p>
            </motion.div>

            {/* Amenities */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Popular Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotelData.amenities.map((amenity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3"
                  >
                    <amenity.icon className="text-accent" size={20} />
                    <span className="font-medium">{amenity.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Room Selection */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Select Your Room</h2>
              <div className="space-y-4">
                {hotelData.rooms.map((room) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedRoom(room)}
                    className={`bg-card border rounded-2xl p-6 cursor-pointer transition-all ${
                      selectedRoom.id === room.id 
                        ? 'border-accent shadow-lg shadow-accent/10' 
                        : 'border-card-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FaBed className="text-accent" />
                          <h3 className="font-serif text-xl font-bold">{room.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
                          <span>{room.size}</span>
                          <span>•</span>
                          <span>Max {room.guests} guests</span>
                          <span>•</span>
                          <span>{room.bed}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {room.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                              <FaCheck className="text-accent text-xs" /> {feature}
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-green-400 flex items-center gap-1">
                          <FaCheck /> {room.cancellation}
                        </div>
                      </div>
                      <div className="text-right md:w-48 flex flex-col justify-between border-t md:border-t-0 md:border-l border-card-border pt-4 md:pt-0 md:pl-6">
                        <div>
                          <div className="text-xs text-muted">From</div>
                          <div className="font-serif text-3xl font-bold text-accent">${room.price}</div>
                          <div className="text-xs text-muted">per night</div>
                        </div>
                        <button className={`mt-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                          selectedRoom.id === room.id 
                            ? 'bg-accent text-dark' 
                            : 'bg-card-border text-white hover:bg-accent hover:text-dark'
                        }`}>
                          {selectedRoom.id === room.id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-card-border rounded-2xl p-6 sticky top-24 shadow-2xl"
            >
              <div className="mb-6">
                <div className="text-sm text-muted mb-1">Best Price Guarantee</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-accent">${selectedRoom.price}</span>
                  <span className="text-muted">/ night</span>
                </div>
              </div>

              {/* Date & Guest Inputs */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted mb-1 block">Check-in</label>
                    <div className="relative">
                      <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
                      <input 
                        type="date" 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-darker border border-card-border rounded-lg pl-10 pr-3 py-3 text-sm text-white" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted mb-1 block">Check-out</label>
                    <div className="relative">
                      <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
                      <input 
                        type="date" 
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-darker border border-card-border rounded-lg pl-10 pr-3 py-3 text-sm text-white" 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Guests</label>
                  <div className="relative">
                    <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full bg-darker border border-card-border rounded-lg pl-10 pr-3 py-3 text-sm text-white appearance-none"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              {nights > 0 && (
                <div className="space-y-2 text-sm mb-6 pb-6 border-b border-card-border">
                  <div className="flex justify-between">
                    <span className="text-muted">${selectedRoom.price} x {nights} nights</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Taxes & fees (16%)</span>
                    <span>${taxes}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span className="text-accent">${total}</span>
                  </div>
                </div>
              )}

              <button className="w-full bg-accent text-dark font-bold py-4 rounded-xl hover:bg-accent-hover transition-all hover:scale-105 mb-3">
                Reserve Now
				onClick={() => setShowCheckout(true)}
              </button>
              <p className="text-xs text-muted text-center">You won't be charged yet</p>
            </motion.div>
          </div>
        </div>
      </div>
	        <CheckoutWizard 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        type="hotel"
        summary={{
          title: `Angama Mara - ${selectedRoom.name}`,
          subtitle: `Max ${selectedRoom.guests} Guests • ${selectedRoom.bed}`,
          dates: `${checkIn} to ${checkOut} (${nights} nights)`,
          price: subtotal,
          taxes: taxes,
          total: total
        }}
      />
    </div>
  );
}
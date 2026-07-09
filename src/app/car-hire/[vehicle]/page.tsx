"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  FaStar, FaMapMarkerAlt, FaCog, FaGasPump, FaUsers, FaSuitcase, 
  FaShieldAlt, FaCheck, FaArrowLeft, FaCalendar, FaWhatsapp, FaArrowRight,
  FaRoad, FaSnowflake, FaCamera, FaMusic
} from "react-icons/fa";
import CheckoutWizard from "@/components/CheckoutWizard";

const vehicleDatabase: Record<string, any> = {
  economy: {
    slug: "economy",
    category: "Economy",
    tagline: "Smart City Driving",
    models: ["Toyota Vitz", "Suzuki Alto", "Nissan Note"],
    pricePerDay: 3500,
    priceUSD: 25,
    rating: 4.6,
    reviews: 432,
    description: "Perfect for navigating Nairobi's bustling streets or zipping between coastal towns. Our economy fleet is fuel-efficient, easy to park, and ideal for solo travelers or couples looking for affordable, reliable transport.",
    specs: { passengers: 4, luggage: 2, transmission: "Automatic", fuel: "Petrol", engine: "1.0L - 1.3L", mileage: "18km/L" },
    features: [
      { icon: FaSnowflake, name: "Air Conditioning" },
      { icon: FaMusic, name: "Bluetooth Audio" },
      { icon: FaCamera, name: "Reverse Camera" },
      { icon: FaShieldAlt, name: "Full Insurance" },
      { icon: FaRoad, name: "Unlimited Mileage" },
      { icon: FaMapMarkerAlt, name: "GPS Navigation" },
    ],
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
    ],
    bestFor: ["City driving", "Airport transfers", "Short trips", "Budget travelers"],
    includes: ["Comprehensive insurance", "24/7 roadside assistance", "Free cancellation up to 24h", "Airport pickup & drop-off"],
  },
  suv: {
    slug: "suv",
    category: "SUV",
    tagline: "Comfort Meets Capability",
    models: ["Toyota RAV4", "Subaru Forester", "Mazda CX-5"],
    pricePerDay: 7500,
    priceUSD: 55,
    rating: 4.8,
    reviews: 687,
    description: "Our SUV fleet offers the perfect balance of comfort and rugged capability. Whether you're driving upcountry to visit family or heading out on a weekend safari, these vehicles handle Kenya's diverse roads with ease.",
    specs: { passengers: 5, luggage: 4, transmission: "Automatic", fuel: "Petrol", engine: "2.0L - 2.5L", mileage: "12km/L" },
    features: [
      { icon: FaSnowflake, name: "Climate Control" },
      { icon: FaMusic, name: "Premium Sound" },
      { icon: FaCamera, name: "360° Camera" },
      { icon: FaShieldAlt, name: "Full Insurance" },
      { icon: FaRoad, name: "4WD Available" },
      { icon: FaSuitcase, name: "Roof Rack" },
    ],
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200",
      "https://images.unsplash.com/photo-1519657337289-3b3a2552f6d7?w=600",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
    ],
    bestFor: ["Family trips", "Upcountry travel", "Weekend getaways", "Mixed terrain"],
    includes: ["Comprehensive insurance", "24/7 roadside assistance", "Free cancellation up to 24h", "Child seat available"],
  },
  "4x4-safari": {
    slug: "4x4-safari",
    category: "4x4 Safari",
    tagline: "Built for the Wild",
    models: ["Toyota Land Cruiser", "Land Cruiser Prado", "Nissan Patrol"],
    pricePerDay: 18000,
    priceUSD: 130,
    rating: 4.9,
    reviews: 1203,
    description: "The ultimate safari machine. Our 4x4 fleet is purpose-built for Kenya's toughest terrain — from the dusty plains of Maasai Mara to the rocky trails of Mount Kenya. Pop-up roofs, HF radios, and cooler boxes come standard.",
    specs: { passengers: 6, luggage: 5, transmission: "Automatic", fuel: "Diesel", engine: "4.5L V8", mileage: "8km/L" },
    features: [
      { icon: FaRoad, name: "4WD Low Range" },
      { icon: FaCamera, name: "Pop-up Roof" },
      { icon: FaSnowflake, name: "Dual A/C" },
      { icon: FaShieldAlt, name: "Bush Insurance" },
      { icon: FaSuitcase, name: "Cooler Box" },
      { icon: FaMusic, name: "HF Radio" },
    ],
    images: [
      "https://images.unsplash.com/photo-1519657337289-3b3a2552f6d7?w=1200",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
    ],
    bestFor: ["Safari game drives", "Rough terrain", "Remote areas", "Photography tours"],
    includes: ["Comprehensive bush insurance", "24/7 satellite support", "Free cancellation up to 48h", "Driver-guide available"],
  },
  minivan: {
    slug: "minivan",
    category: "Minivan",
    tagline: "Travel Together",
    models: ["Toyota Hiace", "Nissan Caravan", "Toyota Noah"],
    pricePerDay: 9500,
    priceUSD: 70,
    rating: 4.7,
    reviews: 534,
    description: "Ideal for group travel and family adventures. Our minivans offer generous space for passengers and luggage, making them perfect for airport runs, family safaris, or group excursions along the coast.",
    specs: { passengers: 7, luggage: 6, transmission: "Manual/Auto", fuel: "Diesel", engine: "2.8L", mileage: "10km/L" },
    features: [
      { icon: FaSnowflake, name: "Rear A/C" },
      { icon: FaUsers, name: "7 Seats" },
      { icon: FaSuitcase, name: "Extra Luggage" },
      { icon: FaShieldAlt, name: "Full Insurance" },
      { icon: FaRoad, name: "Sliding Doors" },
      { icon: FaMusic, name: "Entertainment System" },
    ],
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
    ],
    bestFor: ["Group travel", "Family safaris", "Airport transfers", "Corporate events"],
    includes: ["Comprehensive insurance", "24/7 roadside assistance", "Free cancellation up to 24h", "Driver available"],
  },
  luxury: {
    slug: "luxury",
    category: "Luxury",
    tagline: "Arrive in Style",
    models: ["Mercedes E-Class", "BMW 5 Series", "Range Rover Sport"],
    pricePerDay: 25000,
    priceUSD: 180,
    rating: 5.0,
    reviews: 298,
    description: "For those who demand the finest. Our luxury fleet turns heads on Nairobi's streets and delivers supreme comfort on long drives. Perfect for business travel, VIP transfers, and special celebrations.",
    specs: { passengers: 5, luggage: 4, transmission: "Automatic", fuel: "Petrol", engine: "3.0L+", mileage: "10km/L" },
    features: [
      { icon: FaSnowflake, name: "4-Zone Climate" },
      { icon: FaMusic, name: "Burmester Sound" },
      { icon: FaCamera, name: "Night Vision" },
      { icon: FaShieldAlt, name: "Premium Insurance" },
      { icon: FaRoad, name: "Air Suspension" },
      { icon: FaMapMarkerAlt, name: "Live GPS Tracking" },
    ],
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
    ],
    bestFor: ["Business travel", "VIP transfers", "Weddings", "Special occasions"],
    includes: ["Premium insurance", "Chauffeur service", "Complimentary water & snacks", "Priority 24/7 concierge"],
  },
  "double-cabin": {
    slug: "double-cabin",
    category: "Double Cabin",
    tagline: "Workhorse of Kenya",
    models: ["Toyota Hilux", "Ford Ranger", "Isuzu D-Max"],
    pricePerDay: 12000,
    priceUSD: 85,
    rating: 4.7,
    reviews: 412,
    description: "The backbone of Kenyan adventure. Double cabins handle heavy loads, rough roads, and long distances with ease. Perfect for expeditions, fieldwork, or anyone who needs serious cargo space without sacrificing comfort.",
    specs: { passengers: 5, luggage: 8, transmission: "Manual/Auto", fuel: "Diesel", engine: "2.4L - 2.8L", mileage: "11km/L" },
    features: [
      { icon: FaRoad, name: "4WD" },
      { icon: FaSuitcase, name: "Canopy/Bed" },
      { icon: FaShieldAlt, name: "Heavy Duty" },
      { icon: FaSnowflake, name: "Air Conditioning" },
      { icon: FaCamera, name: "Dash Cam" },
      { icon: FaMapMarkerAlt, name: "GPS Tracking" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595953854408-c9d5ad40f5c8?w=1200",
      "https://images.unsplash.com/photo-1519657337289-3b3a2552f6d7?w=600",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
    ],
    bestFor: ["Remote areas", "Heavy luggage", "Fieldwork", "Long-distance travel"],
    includes: ["Comprehensive insurance", "24/7 roadside assistance", "Free cancellation up to 24h", "Snorkel available"],
  },
};

const towns = [
  "Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru",
  "Malindi", "Diani Beach", "Maasai Mara", "Nanyuki", "Lamu",
];

export default function VehicleDetailPage({ params }: { params: Promise<{ vehicle: string }> }) {
  const { vehicle } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const vehicleData = vehicleDatabase[vehicle];

  const [showCheckout, setShowCheckout] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  if (!vehicleData) {
    return (
      <div className="pt-32 pb-20 bg-dark min-h-screen text-center">
        <h1 className="font-serif text-4xl font-bold mb-4">Vehicle Not Found</h1>
        <Link href="/car-hire" className="text-accent hover:underline">← Back to Car Hire</Link>
      </div>
    );
  }

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();
  const subtotal = vehicleData.pricePerDay * days;
  const insurance = Math.round(subtotal * 0.05);
  const total = subtotal + insurance;

  const handleCheckout = () => {
    if (!pickupLocation || !pickupDate || !dropoffDate) {
      alert("Please select pickup location and dates first.");
      return;
    }
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/car-hire/" + vehicle);
      return;
    }
    setShowCheckout(true);
  };

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/car-hire" className="inline-flex items-center gap-2 text-muted hover:text-accent mb-6 transition-colors">
          <FaArrowLeft size={14} /> Back to Car Hire
        </Link>

        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] mb-10 rounded-2xl overflow-hidden"
        >
          <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer">
            <Image src={vehicleData.images[0]} alt={vehicleData.category} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          {vehicleData.images.slice(1, 5).map((img: string, i: number) => (
            <div key={i} className="relative group cursor-pointer hidden md:block">
              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="inline-block bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">{vehicleData.category}</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">{vehicleData.tagline}</h1>
              <div className="flex items-center gap-4 text-muted mb-4">
                <div className="flex items-center gap-1">
                  <FaStar className="text-accent" />
                  <span className="font-bold text-white">{vehicleData.rating}</span>
                  <span>({vehicleData.reviews} reviews)</span>
                </div>
                <span>•</span>
                <span>{vehicleData.models.join(", ")}</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{vehicleData.description}</p>
            </motion.div>

            {/* Vehicle Specs */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Vehicle Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: FaUsers, label: "Passengers", value: vehicleData.specs.passengers },
                  { icon: FaSuitcase, label: "Luggage", value: `${vehicleData.specs.luggage} bags` },
                  { icon: FaCog, label: "Transmission", value: vehicleData.specs.transmission },
                  { icon: FaGasPump, label: "Fuel Type", value: vehicleData.specs.fuel },
                  { icon: FaRoad, label: "Engine", value: vehicleData.specs.engine },
                  { icon: FaMapMarkerAlt, label: "Mileage", value: vehicleData.specs.mileage },
                ].map((spec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3"
                  >
                    <spec.icon className="text-accent flex-shrink-0" size={18} />
                    <div>
                      <div className="text-xs text-muted">{spec.label}</div>
                      <div className="font-semibold text-sm">{spec.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Features & Equipment</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vehicleData.features.map((feature: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3"
                  >
                    <feature.icon className="text-accent flex-shrink-0" size={18} />
                    <span className="font-medium text-sm">{feature.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Best For */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Perfect For</h2>
              <div className="flex flex-wrap gap-3">
                {vehicleData.bestFor.map((item: string, i: number) => (
                  <span key={i} className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium border border-accent/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">What's Included</h2>
              <div className="bg-card border border-card-border rounded-2xl p-6 space-y-3">
                {vehicleData.includes.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheck className="text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-card-border rounded-2xl p-6 sticky top-24 shadow-2xl"
            >
              <div className="mb-6">
                <div className="text-sm text-muted mb-1">Starting from</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-accent">KES {vehicleData.pricePerDay.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted">≈ ${vehicleData.priceUSD} / day</div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-xs text-muted mb-1 block">Pickup Location *</label>
                  <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-sm text-white">
                    <option value="">Select town</option>
                    {towns.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block">Drop-off Location</label>
                  <select value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-sm text-white">
                    <option value="">Same as pickup</option>
                    {towns.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted mb-1 block">Pickup Date *</label>
                    <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full bg-darker border border-card-border rounded-lg px-3 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-muted mb-1 block">Return Date *</label>
                    <input type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} className="w-full bg-darker border border-card-border rounded-lg px-3 py-3 text-sm text-white" />
                  </div>
                </div>
              </div>

              {days > 0 && (
                <div className="space-y-2 text-sm mb-6 pb-6 border-b border-card-border">
                  <div className="flex justify-between">
                    <span className="text-muted">KES {vehicleData.pricePerDay.toLocaleString()} × {days} days</span>
                    <span>KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Insurance (5%)</span>
                    <span>KES {insurance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span className="text-accent">KES {total.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full bg-accent text-dark font-bold py-4 rounded-xl hover:bg-accent-hover transition-all hover:scale-105 mb-3 flex items-center justify-center gap-2"
              >
                {status === "authenticated" ? "Proceed to Checkout" : "Check Availability"} <FaArrowRight />
              </button>
              <p className="text-xs text-muted text-center">Free cancellation up to 24h before pickup</p>
            </motion.div>
          </div>
        </div>

        {/* Checkout Wizard - Properly placed after the grid closes */}
        <CheckoutWizard
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          type="car-hire"
          summary={{
            title: `${vehicleData.category} Rental`,
            subtitle: `${pickupLocation} to ${dropoffLocation || pickupLocation}`,
            dates: `${pickupDate} to ${dropoffDate} (${days} days)`,
            price: subtotal,
            taxes: insurance,
            total: total
          }}
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRental",
              "name": `SavannahPulse ${vehicleData.category} Car Hire`,
              "description": vehicleData.description,
              "url": `https://savannahpulse.co.ke/car-hire/${vehicle}`,
              "priceRange": `KES ${vehicleData.pricePerDay} per day`,
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": vehicleData.rating.toString(), "reviewCount": vehicleData.reviews.toString() }
            })
          }}
        />
      </div>
    </div>
  );
}
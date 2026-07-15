"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FaMapMarkerAlt, FaStar, FaArrowRight, FaUmbrellaBeach, FaTree, 
  FaCity, FaMountain, FaHistory, FaCar, FaHotel, FaPlane,
  FaShieldAlt, FaClock, FaAward, FaUsers
} from "react-icons/fa";

const destinations = [
  {
    name: "Maasai Mara",
    slug: "maasai-mara",
    tagline: "The Great Migration",
    description: "Witness the world's greatest wildlife spectacle in Kenya's premier safari destination.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200",
    icon: FaTree,
    category: "Safari",
  },
  {
    name: "Diani Beach",
    slug: "diani-beach",
    tagline: "Paradise Found",
    description: "Pristine white sands and turquoise waters along Kenya's stunning Indian Ocean coast.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    icon: FaUmbrellaBeach,
    category: "Beach",
  },
  {
    name: "Lamu",
    slug: "lamu",
    tagline: "Timeless Culture",
    description: "Step back in time in this UNESCO World Heritage Site with rich Swahili heritage.",
    image: "https://images.unsplash.com/photo-151870976631-a6a7f45921c3?w=1200",
    icon: FaHistory,
    category: "Culture",
  },
  {
    name: "Nairobi",
    slug: "nairobi",
    tagline: "The Green City in the Sun",
    description: "Kenya's vibrant capital where modern luxury meets wildlife and culture.",
    image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200",
    icon: FaCity,
    category: "City",
  },
  {
    name: "Kisumu",
    slug: "kisumu",
    tagline: "Lake Victoria's Gem",
    description: "Discover historical sites and the beauty of Africa's largest lake.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200",
    icon: FaHistory,
    category: "Historical",
  },
  {
    name: "Mount Kenya",
    slug: "mount-kenya",
    tagline: "Peak Adventure",
    description: "Conquer Africa's second-highest peak through breathtaking alpine landscapes.",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200",
    icon: FaMountain,
    category: "Adventure",
  },
];

const featuredHotels = [
  {
    name: "Angama Mara",
    location: "Maasai Mara",
    rating: 5.0,
    price: "$580",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    slug: "angama-mara",
  },
  {
    name: "Giraffe Manor",
    location: "Nairobi",
    rating: 4.9,
    price: "$320",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    slug: "giraffe-manor",
  },
  {
    name: "Hemingways Watamu",
    location: "Watamu Coast",
    rating: 4.8,
    price: "$250",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    slug: "hemingways-watamu",
  },
];

const featuredVehicles = [
  {
    category: "4x4 Safari",
    tagline: "Built for the Wild",
    price: 18000,
    image: "https://images.unsplash.com/photo-1519657337289-3b3a2552f6d7?w=800",
    slug: "4x4-safari",
  },
  {
    category: "Luxury SUV",
    tagline: "Comfort Meets Capability",
    price: 7500,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
    slug: "suv",
  },
  {
    category: "Economy",
    tagline: "Smart City Driving",
    price: 3500,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
    slug: "economy",
  },
];

export default function HomePage() {
  return (
    <div className="bg-dark">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920"
        >
          <source src="https://cdn.coverr.co/videos/coverr-african-sunset-1573/1080p.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-6">
              WELCOME TO HOSPITALITY ARC
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Experience the Heartbeat of Africa
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Your Kenyan Journey Starts Here
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/destinations"
                className="bg-accent text-dark px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-hover transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Explore Destinations <FaArrowRight />
              </Link>
              <Link
                href="/hotels"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
              >
                View Hotels <FaHotel />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
              DISCOVER KENYA
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Featured Destinations
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              From the vast savannahs to pristine beaches, explore Kenya's most iconic destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/destinations/${dest.slug}`} className="group block">
                  <div className="relative h-80 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <dest.icon size={12} /> {dest.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-2xl font-bold text-white mb-1">{dest.name}</h3>
                      <p className="text-gray-300 text-sm">{dest.tagline}</p>
                    </div>
                  </div>
                  <p className="text-muted text-sm group-hover:text-accent transition-colors flex items-center gap-2">
                    Explore {dest.name} <FaArrowRight size={12} />
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              View All Destinations <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 px-6 bg-darker">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
              LUXURY STAYS
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Featured Hotels
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Handpicked luxury accommodations for an unforgettable Kenyan experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredHotels.map((hotel, i) => (
              <motion.div
                key={hotel.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/hotels/${hotel.slug}`} className="group block">
                  <div className="bg-card border border-card-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
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
                      <div className="flex items-center justify-between pt-4 border-t border-card-border">
                        <div>
                          <span className="font-serif text-2xl font-bold text-accent">{hotel.price}</span>
                          <span className="text-muted text-sm"> /night</span>
                        </div>
                        <span className="text-accent text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          View <FaArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              View All Hotels <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Car Hire Showcase */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
              GET AROUND
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Car Hire Fleet
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Reliable vehicles for every adventure, from city driving to safari expeditions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle, i) => (
              <motion.div
                key={vehicle.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/car-hire/${vehicle.slug}`} className="group block">
                  <div className="bg-card border border-card-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.category}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold mb-1">{vehicle.category}</h3>
                      <p className="text-muted text-sm mb-4">{vehicle.tagline}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-card-border">
                        <div>
                          <span className="font-serif text-2xl font-bold text-accent">KES {vehicle.price.toLocaleString()}</span>
                          <span className="text-muted text-sm"> /day</span>
                        </div>
                        <span className="text-accent text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Book <FaArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/car-hire"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              View All Vehicles <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-darker">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
              WHY HOSPITALITY ARC
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Your Trusted Travel Partner
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaShieldAlt, title: "Best Price Guarantee", desc: "We match or beat any comparable price" },
              { icon: FaClock, title: "24/7 Support", desc: "Round-the-clock assistance for travelers" },
              { icon: FaAward, title: "Verified Properties", desc: "Handpicked and quality-checked accommodations" },
              { icon: FaUsers, title: "Local Experts", desc: "Kenyan travel specialists who know the destination" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-card-border rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-accent" size={28} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ready for Your Kenyan Adventure?
            </h2>
            <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
              Let us help you plan the perfect trip. From safaris to beach getaways, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-dark px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-hover transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Contact Us <FaArrowRight />
              </Link>
              <Link
                href="/destinations"
                className="bg-card border border-card-border text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-accent transition-all inline-flex items-center justify-center gap-2"
              >
                Browse Destinations <FaMapMarkerAlt />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
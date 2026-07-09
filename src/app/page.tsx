"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineSearch, HiOutlineOfficeBuilding, HiOutlineLocationMarker } from "react-icons/hi";
import { FaPlane, FaStar } from "react-icons/fa";
import Link from "next/link";
import AirportSearch from "@/components/AirportSearch";

const majorAirports = [
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
  { code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
  { code: "DOH", name: "Hamad International Airport", city: "Doha", country: "Qatar" },
  { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
  { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "Hong Kong" },
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" },
  { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia" },
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
  { code: "JNB", name: "O.R. Tambo International Airport", city: "Johannesburg", country: "South Africa" },
  { code: "CAI", name: "Cairo International Airport", city: "Cairo", country: "Egypt" },
  { code: "ADD", name: "Addis Ababa Bole International Airport", city: "Addis Ababa", country: "Ethiopia" },
  { code: "DEL", name: "Indira Gandhi International Airport", city: "New Delhi", country: "India" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
];

const kenyanAirports = [
  { code: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi" },
  { code: "MBA", name: "Moi International Airport", city: "Mombasa" },
  { code: "KIS", name: "Kisumu International Airport", city: "Kisumu" },
  { code: "WIL", name: "Wilson Airport", city: "Nairobi" },
  { code: "EDL", name: "Eldoret International Airport", city: "Eldoret" },
  { code: "LAU", name: "Lamu Airport (Manda)", city: "Lamu" },
  { code: "UKA", name: "Ukunda Airport", city: "Diani Beach" },
  { code: "MRE", name: "Mara Serena Airport", city: "Maasai Mara" },
  { code: "NYK", name: "Nanyuki Airport", city: "Nanyuki" },
];

const tabs = [
  { id: "flights", label: "Flights", icon: FaPlane },
  { id: "hotels", label: "Hotels", icon: HiOutlineOfficeBuilding },
  { id: "tours", label: "Tours", icon: HiOutlineLocationMarker },
];

const stats = [
  { value: "50+", label: "Destinations" },
  { value: "10K+", label: "Happy Travelers" },
  { value: "200+", label: "Cultural Experiences" },
  { value: "4.9", label: "Average Rating" },
];

const destinations = [
  {
    tag: "Wildlife Safari",
    rating: 4.9,
    title: "Maasai Mara",
    desc: "Witness millions of wildebeest crossing the Mara River in one of nature's most spectacular events.",
    price: "$850",
    img: "/images/destinations/card-maasai-mara.jpg",
    href: "/destinations/maasai-mara",
  },
  {
    tag: "Beach Escape",
    rating: 4.8,
    title: "Diani Beach",
    desc: "Pristine white sands meet turquoise waters along Kenya's stunning coastline.",
    price: "$620",
    img: "/images/destinations/card-diani-beach.png",
    href: "/destinations/diani-beach",
  },
  {
    tag: "Mountain Trek",
    rating: 4.7,
    title: "Mount Kenya",
    desc: "Trek through bamboo forests and alpine meadows to the snow-capped summit.",
    price: "$720",
    img: "/images/destinations/card-mount-kenya.jpg",
    href: "/destinations/mount-kenya",
  },
  {
    tag: "Cultural Immersion",
    rating: 4.9,
    title: "Lamu Old Town",
    desc: "Wander through centuries-old Swahili architecture and hidden courtyards.",
    price: "$480",
    img: "/images/destinations/card-lamu.jpg",
    href: "/destinations/lamu-old-town",
  },
];

export default function Home() {
const router = useRouter();

  const [activeTab, setActiveTab] = useState("flights");
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  // Parallax & Fade Logic
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="pt-20">
      {/* HERO SECTION WITH PARALLAX & BLENDING */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <img
            src="/images/heroes/savannah-hero.jpg"
            alt="Savannah"
            className="w-full h-full object-cover"
          />
          {/* This gradient blends the image into the dark background below */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark"></div>
        </motion.div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent tracking-[0.3em] text-sm font-semibold mb-4"
          >
            THE PULSE OF THE SAVANNAH
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            Discover the<br />
            <span className="text-accent">Heart of Kenya</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-12"
          >
            From the golden plains of Maasai Mara to the ancient streets of Lamu — book flights, find your perfect stay, and immerse yourself in a culture that will change you forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card/95 backdrop-blur-md rounded-2xl p-6 max-w-4xl mx-auto border border-card-border shadow-2xl"
          >
            <div className="flex gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-accent text-dark shadow-lg shadow-accent/20"
                      : "text-white hover:bg-card-border"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <AirportSearch
                label="From"
                placeholder="Select city or airport"
                airports={majorAirports}
                value={fromAirport}
                onChange={setFromAirport}
                showCustomInput={true}
              />
              <AirportSearch
                label="To"
                placeholder="Select Kenyan airport"
                airports={kenyanAirports}
                value={toAirport}
                onChange={setToAirport}
              />
              <div>
                <label className="text-xs text-muted mb-1 block">Departure</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-darker border border-card-border rounded-lg px-4 py-3 text-white"
                />
              </div>
            <button 
				onClick={() => router.push('/book-flight')}
				className="bg-accent text-dark font-semibold rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:bg-accent-hover transition-all hover:scale-105 mt-5 md:mt-0"
				>
				<HiOutlineSearch size={20} />
				Search
			</button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-serif text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS WITH ENHANCED HOVER EFFECTS */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
              EXPLORE KENYA
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Iconic Destinations
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href={dest.href}>
                  {/* Enhanced Hover: Lift, Glow, and Border Color Change */}
                  <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-80 md:h-96 border border-card-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
                    <img
                      src={dest.img}
                      alt={dest.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent group-hover:via-dark/40 transition-all duration-500"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        {dest.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-1 text-accent mb-2">
                        <FaStar size={14} />
                        <span className="text-sm font-semibold">{dest.rating}</span>
                      </div>
                      <h3 className="font-serif text-3xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">{dest.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{dest.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-semibold text-lg">From {dest.price}</span>
                        <span className="text-white text-sm flex items-center gap-1 group-hover:gap-2 group-hover:text-accent transition-all duration-300">
                          Discover →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
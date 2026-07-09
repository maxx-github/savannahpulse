"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const hotels = [
  {
    tag: "Boutique",
    rating: 4.9,
    name: "Giraffe Manor",
    location: "Nairobi",
    slug: "giraffe-manor",
    amenities: ["Wifi", "Breakfast", "Airport Transfer"],
    price: "$320",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  },
  {
    tag: "Safari Lodge",
    rating: 5.0,
    name: "Angama Mara",
    location: "Maasai Mara",
    slug: "angama-mara",
    amenities: ["Wifi", "All-Inclusive", "Game Drives"],
    price: "$580",
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
  },
  {
    tag: "Beach Resort",
    rating: 4.8,
    name: "Hemingways Watamu",
    location: "Watamu Coast",
    slug: "hemingways-watamu",
    amenities: ["Pool", "Spa", "Diving"],
    price: "$250",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  },
];

export default function HotelsPage() {
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
                  <Link
                    href={`/hotels/${hotel.slug}`}
                    className="text-accent text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Details <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
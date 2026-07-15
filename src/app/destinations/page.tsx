"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaArrowRight, FaUmbrellaBeach, FaTree, FaCity, FaMountain, FaHistory } from "react-icons/fa";

const destinations = [
  {
    name: "Maasai Mara",
    slug: "maasai-mara",
    tagline: "The Great Migration",
    description: "Witness the world's greatest wildlife spectacle in Kenya's premier safari destination. Home to the Big Five and the annual wildebeest migration, Maasai Mara offers unparalleled game viewing experiences.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200",
    icon: FaTree,
    category: "Safari",
    highlights: ["Big Five", "Great Migration", "Hot Air Balloons", "Maasai Culture"],
  },
  {
    name: "Diani Beach",
    slug: "diani-beach",
    tagline: "Paradise Found",
    description: "Pristine white sands and turquoise waters along Kenya's stunning Indian Ocean coast. Diani offers world-class beaches, water sports, and tropical relaxation.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    icon: FaUmbrellaBeach,
    category: "Beach",
    highlights: ["White Sand Beaches", "Snorkeling", "Kite Surfing", "Beach Resorts"],
  },
  {
    name: "Lamu",
    slug: "lamu",
    tagline: "Timeless Culture",
    description: "Step back in time in this UNESCO World Heritage Site with rich Swahili heritage. Explore ancient stone towns, dhow sailing, and pristine beaches.",
    image: "https://images.unsplash.com/photo-151870976631-a6a7f45921c3?w=1200",
    icon: FaHistory,
    category: "Culture",
    highlights: ["UNESCO Site", "Dhow Sailing", "Swahili Culture", "Ancient Architecture"],
  },
  {
    name: "Nairobi",
    slug: "nairobi",
    tagline: "The Green City in the Sun",
    description: "Kenya's vibrant capital where modern luxury meets wildlife and culture. Visit giraffe centers, national parks, and world-class restaurants.",
    image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200",
    icon: FaCity,
    category: "City",
    highlights: ["Giraffe Centre", "National Park", "Fine Dining", "Shopping"],
  },
  {
    name: "Kisumu",
    slug: "kisumu",
    tagline: "Lake Victoria's Gem",
    description: "Discover historical sites and the beauty of Africa's largest lake. Explore fishing villages, bird sanctuaries, and rich Luo culture.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200",
    icon: FaHistory,
    category: "Historical",
    highlights: ["Lake Victoria", "Bird Sanctuaries", "Historical Sites", "Local Culture"],
  },
  {
    name: "Mount Kenya",
    slug: "mount-kenya",
    tagline: "Peak Adventure",
    description: "Conquer Africa's second-highest peak through breathtaking alpine landscapes. Trek through diverse ecosystems from rainforest to glaciers.",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200",
    icon: FaMountain,
    category: "Adventure",
    highlights: ["Peak Climbing", "Alpine Trekking", "Glaciers", "Mountain Lodges"],
  },
];

export default function DestinationsPage() {
  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent tracking-[0.3em] text-sm font-semibold mb-4">
            EXPLORE KENYA
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Discover Our Destinations
          </h1>
          <p className="text-muted max-w-3xl mx-auto text-lg">
            From the vast savannahs of Maasai Mara to the pristine beaches of Diani, 
            explore Kenya's most iconic destinations and find your perfect adventure.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="space-y-20">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
            >
              {/* Image */}
              <div className={`relative h-96 rounded-2xl overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-accent text-dark text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <dest.icon size={12} /> {dest.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="font-serif text-4xl font-bold mb-2">{dest.name}</h2>
                <p className="text-accent text-lg mb-4">{dest.tagline}</p>
                <p className="text-gray-300 leading-relaxed mb-6">{dest.description}</p>
                
                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="font-semibold text-white mb-3">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {dest.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-card border border-card-border text-sm px-3 py-1 rounded-full text-muted"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="inline-flex items-center gap-2 bg-accent text-dark px-6 py-3 rounded-xl font-semibold hover:bg-accent-hover transition-all hover:scale-105"
                >
                  Explore {dest.name} <FaArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}